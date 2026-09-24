import test from 'node:test';
import assert from 'node:assert/strict';
import { COURSES, EX, TOTAL_LESSONS } from '../src/content/index.js';
import { fresh, normalize, setState, S, courseComplete, courseUnlocked, lessonUnlocked, nextLesson } from '../src/engine/state.js';
import { checkpointId, unitComplete, checkpointItems, checkpointRecord, reviewRecord, dueLessons, spacedItems } from '../src/engine/learning.js';

test('currículo: referências, chaves persistidas e respostas válidas',()=>{
  assert.equal(COURSES.length,12);
  assert.equal(TOTAL_LESSONS,97);
  const ids=new Set(), keys=new Set(); let workshops=0, questions=0;
  for(const c of COURSES){
    assert.ok(c.goals.length>=2);
    assert.deepEqual(c.units.flatMap(u=>u.lessons),c.lessons);
    for(const l of c.lessons){
      assert.ok(!ids.has(l.id)); ids.add(l.id);
      assert.equal(l.course,c); assert.ok(l.unit.lessons.includes(l));
      assert.ok(l.minutes>0); assert.ok(l.learn.length>0);
      if(l.workshop){ workshops++; questions+=l.ex.length; assert.equal(l.optional,true); assert.equal(l.learn.length,4); }
      for(const [i,x] of l.ex.entries()){
        assert.equal(x.key,`${l.id}#${i}`); assert.ok(!keys.has(x.key)); keys.add(x.key);
        assert.equal(EX[x.key].l,l); assert.ok(x.e);
        if(x.t==='mc'){assert.ok(Number.isInteger(x.a)&&x.a>=0&&x.a<x.o.length);}
        if(x.t==='num') assert.ok(Number.isFinite(x.a));
        if(x.t==='tf') assert.equal(typeof x.a,'boolean');
      }
      for(const card of l.learn){if(card.check) assert.ok(card.check.a>=0 && card.check.a<card.check.o.length);}
    }
  }
  assert.equal(workshops,12); assert.equal(questions,74);
});

test('oficinas não bloqueiam a progressão dos alunos existentes',()=>{
  const legacy=fresh();
  const c=COURSES[0]; c.lessons.filter(l=>!l.optional).forEach(l=>legacy.done[l.id]=true);
  delete legacy.checkpoints; delete legacy.repetition;
  setState(normalize(legacy));
  assert.deepEqual(S.checkpoints,{}); assert.deepEqual(S.repetition,{});
  assert.equal(courseComplete(c),true);
  assert.equal(courseUnlocked(COURSES[1]),true);
  assert.equal(lessonUnlocked(c.lessons.at(-1)),true);
  assert.equal(nextLesson().id,COURSES[1].lessons[0].id);
  assert.equal(S.done[c.lessons.at(-1).id],undefined);
});

test('desafios cobrem as lições da etapa, sem perguntas duplicadas ou dissertativas',()=>{
  const ids=new Set();
  for(const c of COURSES) for(const u of c.units){
    const id=checkpointId(u); assert.ok(!ids.has(id)); ids.add(id);
    assert.equal(unitComplete(u,{}),false);
    assert.equal(unitComplete(u,Object.fromEntries(u.lessons.map(l=>[l.id,true]))),true);
    const selected=checkpointItems(u);
    assert.ok(selected.length>0&&selected.length<=6);
    assert.equal(new Set(selected.map(it=>it.key)).size,selected.length);
    selected.forEach(it=>{assert.notEqual(it.x.t,'expl');assert.ok(u.lessons.includes(EX[it.key].l));});
    for(const l of u.lessons) assert.ok(selected.some(it=>EX[it.key].l===l));
  }
});

test('selo exige 80% reais; tentativa posterior não apaga o melhor resultado',()=>{
  const missed=checkpointRecord(undefined,4,6,'2026-09-23');
  assert.equal(missed.passed,false); assert.equal(missed.accuracy,67);
  const pass=checkpointRecord(missed,5,6,'2026-09-24');
  assert.equal(pass.passed,true); assert.equal(pass.best,83);
  const retry=checkpointRecord(pass,2,6,'2026-09-25');
  assert.equal(retry.passed,true); assert.equal(retry.best,83); assert.equal(retry.attempts,3);
  assert.equal(checkpointRecord(undefined,0,0,'2026-09-23').passed,false);
});

test('agenda espaçada respeita dias, mês e retorno após erro',()=>{
  const first=reviewRecord(undefined,true,'2026-09-30');
  assert.equal(first.due,'2026-10-01'); assert.equal(first.stage,0);
  assert.equal(reviewRecord(first,true,'2026-09-30'),first);
  const next=reviewRecord(first,true,'2026-10-01');
  assert.equal(next.due,'2026-10-04'); assert.equal(next.stage,1);
  const error=reviewRecord(next,false,'2026-10-04');
  assert.equal(error.due,'2026-10-05'); assert.equal(error.stage,0);
  assert.equal(reviewRecord({stage:4,last:'2026-12-01'},true,'2026-12-31').due,'2027-01-30');
});

test('revisão diária só seleciona conteúdo concluído e vencido',()=>{
  const state=fresh(); const [a,b,c]=COURSES[0].lessons;
  state.done[a.id]=true; state.done[b.id]=true;
  state.repetition[b.id]={due:'2026-09-25'};
  state.repetition[c.id]={due:'2026-09-20'};
  const due=dueLessons(COURSES,state,'2026-09-23');
  assert.deepEqual(due.map(l=>l.id),[a.id]);
  const items=spacedItems(due);
  assert.equal(items.length,2);
  items.forEach(it=>assert.equal(EX[it.key].l,a));
});

test('juntar progresso de dois aparelhos não perde lições nem compras',async()=>{
  const { mergeProgress } = await import('../src/engine/merge.js');
  const a={xp:120,coins:30,done:{l1:true,l2:true},owned:{bone:true},checkpoints:{u1:{best:.5,passed:false}},repetition:{l1:{stage:1,last:'2026-09-01',due:'2026-09-04'}},days:{'2026-09-20':30},area:'fundamentos',onboarded:true,equip:{head:'bone'}};
  const b={xp:80,coins:90,done:{l3:true},owned:{blazer:true},checkpoints:{u1:{best:.9,passed:true}},repetition:{l1:{stage:2,last:'2026-09-05',due:'2026-09-12'}},days:{'2026-09-20':10,'2026-09-21':40},area:'gestao',onboarded:true};
  const m=mergeProgress(a,b);
  assert.deepEqual(Object.keys(m.done).sort(),['l1','l2','l3']);
  assert.equal(m.xp,120); assert.equal(m.coins,90);
  assert.ok(m.owned.bone && m.owned.blazer);
  assert.deepEqual(m.checkpoints.u1,{best:.9,passed:true});
  assert.equal(m.repetition.l1.stage,2);
  assert.deepEqual(m.days,{'2026-09-20':30,'2026-09-21':40});
  assert.equal(m.area,'fundamentos'); assert.equal(m.equip.head,'bone');
  assert.equal(mergeProgress(a,null),a);
});
