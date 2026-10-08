# ContaTrilha — P0: relatório de auditoria e proposta de MVP (P1)

**Data:** 08/10/2026 · **Escopo:** somente leitura. Nenhum arquivo do projeto foi alterado, nenhum commit, PR, migration ou deploy foi feito. Este arquivo é o único acréscimo (não versionado).
**Parada obrigatória:** nada de P1 começa sem a sua resposta às decisões da seção 9.

---

## 1. Estado verificado

| Item | Resultado | Como verifiquei |
|---|---|---|
| `git rev-parse HEAD` | `051fa4f2630a4820cdee6056c730de44709293fd` | local |
| `origin/master` | igual ao HEAD (`051fa4f`) | `git fetch` + `rev-parse` |
| `git status` | limpo, branch `claude/new-session-6d8k1d` no mesmo SHA do `master` | local |
| `npm test` | **34/34 passam** | executado |
| `npm run build` | passa, sem avisos; `curriculo` 781 kB (254 kB gzip), app 36 kB; precache 23 arquivos, 1.064 KiB | executado |
| Currículo em execução | 17 trilhas, 283 lições, **1.934 exercícios** (num 549, mc 462, tf 339, entry 133, class 130, ord 78, fill 70, wr 61, match 52, expl 43, ew 13, tsal 4) | script que carrega `COURSES` |
| PR #2 | **ABERTO**, 4 commits, 32 arquivos (+1.857/−67), base `ca79cd4` (10 commits atrás do `master`), `mergeable_state: dirty` | GitHub |
| Deploy de produção (SHA/estado) | **INDETERMINADO** | esta sessão não tem ferramenta da Vercel. O README afirma deploy automático a cada push em `master`; o único check no PR #2 é "Vercel Preview Comments". Preciso que você confirme o SHA do deploy de produção no painel da Vercel. |
| Banco Supabase real | **INDETERMINADO — não consultado** | ver 1.1 |

### 1.1 Supabase: projeto errado visível
O README diz que o projeto é `conta-trilha`, org "ContaTrilha". A conexão Supabase desta sessão lista apenas **`bpo-financeiro-prod`** e **`perenne-demo`** (org `tbclkcpwljwfutfohvrb`). Nenhum é o ContaTrilha, então **não li, nem consultei nem toquei em nenhum dos dois**. Consequência: não sei se a migration `0001_progress.sql` foi aplicada, quais políticas existem de fato nem quantas linhas há em `progress`. Para auditar, preciso só do **ref do projeto** (e que ele esteja numa org acessível a esta conexão). Credenciais não são necessárias.

### 1.2 PR #2 (corretor com IA local + perguntas rápidas)
- Não tem CI de testes; o relato "28/28" é de antes dos 6 testes que entraram no `master`.
- **Conflitos reais com o `master`** (simulado com `git merge-tree`, sem alterar nada): `glossary.js`, `trilhas/financeirojr.js`, `engine/state.js`, `styles/learning.css`, `ui/screens/path.js`, `ui/screens/quiz.js`, `tests/learning.test.js`.
- Mexe em `engine/exercises/grading.js`, `quiz.js` e `quiz-renderers.js`, exatamente os arquivos que o P1 precisaria tocar para reaproveitar os exercícios. Isso gera dependência de ordem.
- Conteúdo útil: `teach.js` (perguntas rápidas), `theory.js`, glossário (+26 termos), `stem.js`. Conteúdo que **não serve** para notas oficiais: a camada `ai/review.js` "aceita/sugere" respostas escritas por heurística; é boa para estudo individual, mas não é auditável para atividade avaliada.
- **Recomendação:** não fazer merge automático. Decidir separadamente (decisão D1).

---

## 2. Mapa real do código (o que o P1 toca ou preserva)

```
index.html                 seções #s-* (SPA), barra inferior com 5 abas (Aprender, Praticar, Loja, Glossário, Perfil)
src/main.js                boot, SW (autoUpdate), eventos globais, merge local↔nuvem
src/ui/router.js           go(nome) alterna seções; SEM History API / URLs profundas; sheet() recebe HTML
src/engine/state.js        S (localStorage 'contatrilha_v2'); normalize() só mantém chaves de fresh()
src/engine/merge.js        união de dois aparelhos (soma, nunca apaga)
src/engine/storage.js      localStorage sempre + syncUp debounced
src/engine/sync-supabase.js  Auth e-mail/senha + upsert da linha única de `progress`
src/engine/exercises/      factories.js (mc, tf, fl, mt, en, cl, nu, wr, ew, od, ep, ts) + grading.js (texto)
src/ui/screens/quiz*.js    sessão de quiz acoplada a S (corações, XP, erros); renderizadores por tipo
src/content/cases.js       3 casos, valores em reais (number), 32 lançamentos
src/ui/screens/cases.js    startCase → quiz tipo 'entry'; caseBalanceteHTML (soma em float)
src/content/scenarios.js   "Na prática": cenários com invariantes (sum d == sum c, balanço fecha), inteiros em reais
src/content/chart-of-accounts.js  CHART (conta→grupo), ALIASES, ENTRY_TPL
supabase/migrations/0001_progress.sql   única migration versionada
```

### Achados relevantes para o plano
1. **Sem URLs profundas e sem `vercel.json`.** `/sala/ABC123` ou `/professor` retornariam 404 num refresh em produção (projeto Vite estático, sem rewrite). Não consegui verificar a configuração do projeto na Vercel; **precisa de teste**. O SW tem `navigateFallback`, mas só depois da primeira instalação.
2. **Os renderizadores corrigem no cliente usando a resposta dentro do próprio objeto** (`x.a`, `x.d/x.c`, `x.model`). Para sala ao vivo isso é incompatível com "gabarito não sai antes da hora". O P1 precisa de (a) projeção pública/privada de cada exercício e (b) correção no servidor. É a peça técnica central do P1.
3. **`entry` (lançamento) hoje confere só o conjunto de contas em débito/crédito; valores não são avaliados** e não há crédito parcial. `caseBalanceteHTML` soma em ponto flutuante (tolerância 0,004) e os valores são reais inteiros, sem centavos. Aceitável para o que existe; **não é** o motor do P2.
4. **Duas taxonomias de contas já coexistem:** `CHART` (chart-of-accounts.js) e `GROUP` (scenarios.js, com redutoras `RANC`/`RREC` que o CHART não tem). O P2 deve unificar em vez de criar uma terceira.
5. **`syncUp` ignora o `{ error }` devolvido pelo supabase-js** (o `try/catch` só pega exceções; o `upsert` normalmente devolve o erro em vez de lançar). Um backup pode falhar em silêncio. Para o Live isso é inaceitável: a entrega de resposta precisa de confirmação explícita do servidor. Não vou copiar esse padrão.
6. **`normalize()` descarta chaves que não estão em `fresh()`**, e o `progress.data` é um JSON inteiro sem limite de tamanho. XP, bolotas e `perfect` ficam no cliente, portanto são editáveis. Notas oficiais e dados de sala **não** podem entrar em `S`.
7. **`innerHTML` em ~30 pontos e `sheet(html)`** — hoje o conteúdo é estático e confiável. Títulos de atividade, nomes e textos de professor/aluno **não** são; o código novo usa `textContent`/escape.
8. **Auth:** e-mail+senha, sem `profiles`, sem papéis, sem uso de `user_metadata` (bom). Chave pública `VITE_SUPABASE_ANON_KEY` no bundle é esperada.
9. **RLS de `progress`** (no repositório): select/insert/update só da própria linha; sem `delete`; sem `to authenticated` explícito (inócuo, pois `auth.uid()` é nulo para anon). Sem problema funcional; sem limite de tamanho do JSON (baixo risco, só da própria linha).
10. **Offline:** o precache cobre JS/CSS/HTML/imagens; chamadas ao Supabase não são cacheadas. Bom: respostas privadas não vão para o cache, desde que o P1 não as sirva como arquivo estático.

---

## 3. Matriz de sobreposição (EXISTE / PARCIAL / NÃO EXISTE / INDETERMINADO)

| Recurso do briefing | Situação | Evidência |
|---|---|---|
| 6 áreas, 17 trilhas, 283 lições | **EXISTE** (17/283 confirmados por execução; "6 áreas" só do README) | script de contagem; `src/content/areas.js` |
| PWA offline, progresso local, login e sync | **EXISTE** | `vite.config.js`, `state.js`, `sync-supabase.js`; build gera `sw.js` |
| Mascote, XP, bolotas, corações, streak, conquistas, missões | **EXISTE** | `gamification.js`, `bento.js`, `badges.js`, `missions.js` |
| Revisão espaçada 1/3/7/14/30, revisão de erros, treinos, relâmpago | **EXISTE** | `learning.js`, `training.js`, `blitz.js`, `tests/learning.test.js` |
| 12 tipos de exercício | **EXISTE** | factories.js, `quiz-renderers.js` |
| Casos práticos e cenários interligados | **EXISTE** (3 casos; cenários com invariantes) | `cases.js`, `scenarios.js` |
| Corretor textual com tolerância/aliases | **EXISTE** | `grading.js` |
| Plano de contas | **PARCIAL** (2 mapas sobrepostos, sem versão/vigência/natureza formal) | `chart-of-accounts.js`, `scenarios.js` |
| Corretor com IA local (PR #2) | **PARCIAL — só em PR, com conflitos** | PR #2 |
| Salas ao vivo, código, lobby | **NÃO EXISTE** | busca no repositório |
| Papéis professor/aluno/admin, turmas | **NÃO EXISTE** no repositório; banco real **INDETERMINADO** | só `0001_progress.sql` |
| Painel docente, atividades, gabarito revisável | **NÃO EXISTE** | — |
| Editor de lançamentos com valores em centavos, múltiplas linhas | **NÃO EXISTE** (hoje só seleção de contas) | `rEntry` |
| Razão/balancete/DRE/BP derivados de eventos | **PARCIAL** (balancete/BP calculados no fim de caso/cenário; sem razão nem DRE reutilizável, sem livro de eventos) | `caseBalanceteHTML`, `closingLesson` |
| IA por foto/PDF | **NÃO EXISTE** | — |
| Competências e dependências | **NÃO EXISTE** (existe trilha → etapa → lição) | — |
| Eventos granulares de aprendizagem | **PARCIAL** (`mistakes`, `repetition`, `training`; sem tentativa-a-tentativa) | `state.js` |
| URLs profundas / rotas | **NÃO EXISTE** | `router.js`; sem `vercel.json` |
| Acessibilidade | **PARCIAL** (aria-current, trap de foco em modal, labels na navegação; sem auditoria WCAG 2.2, leitor de tela não testado) | `AUDITORIA_2026-09.md` #10 |
| Deploy Vercel `master` | **INDETERMINADO** (README + check do PR) | — |
| Estado do Supabase implantado | **INDETERMINADO** | seção 1.1 |

---

## 4. Escopo exato do P1 (salas manuais, sem IA)

**Entra**
- Professores autorizados por concessão manual (você insere no banco; ninguém se auto-promove).
- Atividade criada por **seleção de exercícios já existentes** (copiados como *snapshot* imutável ao publicar). Sem editor de enunciado livre no P1.
- Sala com código curto, lobby, pré-aula (materiais), início/fechamento, **6 questões** ao vivo e modo no próprio ritmo.
- Tipos de exercício aceitos no P1: **`mc`, `tf`, `fill`, `num`, `class`, `match`, `ord`, `entry`**. Ficam de fora `wr`, `expl`, `ew` (correção por palavras-chave/heurística não é auditável para nota) e `tsal` (4 exercícios).
- Respostas persistidas com envio idempotente; reentrada por snapshot; painel agregado por questão; export CSV com proteção a injeção de fórmula.

**Fica fora:** IA, laboratório contábil, competências, ranking público, entrada sem conta, grupos, turmas com matrícula.

**Como o motor existente é preservado**
- Nenhum arquivo de `src/content/` ou de `engine/exercises/` muda. Trilhas, corações, XP e merge seguem iguais.
- Código novo em pastas novas: `src/live/*` (cliente), `supabase/migrations/0002…` (banco). Único toque em arquivo existente: um CTA em Praticar/Home e o registro de rota — e só se D3 for aprovada.
- Modo Live **não grava em `S`** (nada de XP/bolotas por sala). Sala exige conexão; offline mostra aviso e preserva o rascunho local da resposta, dizendo claramente que "ainda não foi entregue".

---

## 5. Telas (desenho simplificado)

**Aluno (celular)**
1. Entrar por código → 2. **Antes de começar** (tema, nº de questões, tempo, materiais: calculadora/rascunho/plano de contas, se há cronômetro/ranking, aviso de que precisa de internet) → 3. Lobby ("Aguardando o professor", contagem de participantes, sem e-mails) → 4. Questão (um renderizador existente, em modo "captura": sem gabarito, sem dica se desligada; botão Enviar → "Entregue ✓" só após confirmação do servidor; estado "reconectando") → 5. Resultado/explicação liberados pelo professor.
- Acessibilidade: foco gerenciado a cada questão, `aria-live` educado e **desligável** para mudanças de estado, tempo ajustável, sem cor como única pista, alvos ≥ 44 px, sem animação obrigatória.

**Professor (desktop, layout próprio, fora da barra inferior)**
Início → Atividades (lista, duplicar) → Nova atividade (título, materiais, modo, tempo, visibilidade do ranking = desligado por padrão, escolher 6 exercícios da biblioteca com pré-visualização) → Publicar → **Sala**: código grande, lobby, Iniciar, controle por questão (abrir/fechar/estender tempo/revelar explicação), % de envio em tempo real → **Resultado**: acerto inicial por questão, distratores mais escolhidos, ação sugerida em texto simples, CSV.

---

## 6. Banco: permissões, RLS e migrations propostas (NADA aplicado)

**Tabelas mínimas do P1** (prefixo `live_` evita colidir com o que já exista no projeto real):

| Tabela | Finalidade | Acesso |
|---|---|---|
| `profiles(user_id pk, display_name)` | apelido mostrado na sala | cada um lê/edita o seu; professor da sala lê apenas membros da sua sala |
| `teacher_grants(user_id pk, granted_by, granted_at, revoked_at)` | quem é professor | **nenhuma política para `authenticated`**; escrita só por você (SQL/painel) |
| `activities(id, owner_id, title, settings jsonb, status, revision)` | rascunho/publicada | só o dono |
| `activity_items(activity_id, position, source_key, public jsonb, answer_key jsonb, explanation)` | snapshot imutável após publicar | dono lê tudo; **aluno nunca lê `answer_key`** (coluna em tabela separada `activity_item_keys`, sem política para alunos) |
| `rooms(id, activity_id, host_id, code, status, current_position, opens_at, closes_at, revision)` | sala | dono escreve; membro lê via função de snapshot |
| `room_members(room_id, user_id, joined_at)` | participantes | entrada **só por RPC** `join_room(code)` |
| `answers(room_id, item_id, user_id, payload jsonb, is_correct, submitted_at, client_nonce)` | resposta | unique `(room_id,item_id,user_id)`; escrita **só por RPC** `submit_answer(...)`; aluno lê só a própria linha; professor lê agregados da própria sala |
| `audit_events(...)` | início/fechamento, concessões, mudanças | só leitura do dono |

**Funções `security definer` (com `search_path` fixo):** `is_teacher()`, `join_room(code)`, `room_snapshot(room_id)` (devolve só o que o aluno pode ver naquele estado), `submit_answer(room, item, payload, nonce)` (valida membro, sala aberta, janela de tempo no relógio do servidor, idempotência por `nonce`, corrige contra `answer_key`), `close_item`, `reveal_item`.

**Regras de segurança:** nenhuma checagem de papel vem do cliente nem de `user_metadata`; `service_role` jamais no bundle; `live_*` com RLS ligada em todas; Realtime só como aviso ("mudou, rebusque o snapshot"); Realtime **privado** com política em `realtime.messages` (a doc pede `private: true` e política `select`/`insert`; **atenção:** políticas ficam em cache por conexão, então revogar acesso não é imediato — manter JWT curto e usar o banco como fonte de verdade). **Não usarei Presence** (limite de 20 msgs/s e 5 chamadas por cliente a cada 30 s no plano gratuito); contagem do lobby sai de `room_members`.

**Código da sala:** 6 caracteres de alfabeto sem ambiguidade, válido só enquanto a sala está aberta, entrada exige login. Espaço ≈ 10⁹; um *hash* do código não ajuda de fato (o professor precisa exibi-lo), então proponho guardar em texto com índice único parcial. Sem rate-limit nativo nas RPCs; mitigação: registrar tentativas inválidas e limitar por usuário na função (decisão D5).

**Correção no servidor sem duplicar o motor em dois lugares:** para os 8 tipos do P1 a comparação é exata (índice, booleano, listas, conjuntos, número inteiro/centavos com tolerância declarada). Proponho implementá-la em `plpgsql` dentro de `submit_answer`, e proteger a equivalência com **vetores de teste compartilhados** (os mesmos casos rodados no JS e no SQL). A alternativa (Edge Function chamando o JS puro) reaproveita código, mas adiciona infraestrutura e latência — decisão D4.

---

## 7. Contrato dos exercícios e integração incremental

Cada exercício existente ganha uma **projeção** (função pura, nova, testada contra os 1.934 exercícios):
- `toPublic(x)`: remove `a`, `model`, `e`, `h` conforme o tipo; para `mc` embaralha as opções com semente do servidor e devolve ordem fixa; para `ord` embaralha `items`.
- `toKey(x)`: só o necessário para corrigir.
- `answerPayload(tipo)`: forma serializável da resposta (mc→índice, tf→bool, fill→[…], entry→{D:[…],C:[…]}, num→número, class/match/ord→mapa/lista).

O cliente reaproveita os renderizadores existentes em modo captura (ponto de atenção: eles hoje chamam `check()` com `x.a`; no modo captura usarei apenas `ready()` e a leitura do estado, e o resultado só vem do servidor). **Isso exige tocar `quiz-renderers.js` com um adaptador mínimo — e é aí que o PR #2 conflita (D1).**

O corretor atual (`grading.js`/`acctMatch`) continua intacto; o futuro motor do P2 (centavos, razão) entra ao lado, não por cima.

---

## 8. Testes, bloqueios, orçamento e dependências

**Bloqueiam a entrega do P1 (gate)**
- **Autorização (SQL, contra um banco de testes):** aluno não vira professor; professor A não vê sala/atividade/respostas do professor B; aluno não lê `answer_key` nem resposta de colega; código expirado/sala fechada não admite; resposta após `closes_at` rejeitada; duplo envio e envio concorrente → uma linha só e mesma nota; membro removido perde acesso.
- **Projeção:** para os 1.934 exercícios, `toPublic` nunca contém campos de resposta (teste por tipo) e `toKey` + `answerPayload` reproduzem `check()` do JS.
- **Equivalência JS↔SQL:** vetores compartilhados por tipo (inclui `num` com tolerância e `entry` com ordem trocada).
- **Reconexão:** abrir em outro aparelho, perder rede no envio, Realtime perdido (o snapshot do banco basta).
- **Regressão:** `npm test` (34) + build; progresso local e merge intactos; trilhas offline como antes; SW não pré-cacheia nada privado.
- **UI:** 320–390 px, teclado, zoom 200%, leitor de tela (checagem manual), deep link e refresh de `/sala/:codigo`.
- **Carga do piloto:** 1 professor + 5 contas, depois 20–30 aparelhos; registrar P95 de envio/reconexão e uso de Realtime. Limites Free confirmados hoje na doc: **200 conexões, 100 msgs/s, 100 joins/s**, broadcast 256 KB.

**Orçamento:** P1 não usa modelo de IA, logo custo variável = 0 além do plano atual. A confirmar: limites de banco/armazenamento e a pausa por inatividade do plano gratuito do Supabase (não verifiquei hoje; relevante para um piloto).

**Dependências:** (1) acesso ao projeto Supabase correto; (2) um banco de **desenvolvimento** separado do de produção para rodar as migrations de teste — Supabase Branching é recurso pago, então a opção é um segundo projeto gratuito ou Postgres local (D6); (3) decisão sobre o PR #2; (4) um professor-parceiro para validar a atividade piloto.

---

## 9. Riscos críticos e decisões que dependem de você

**Riscos (ordem de gravidade)**
1. Vazamento de gabarito ou de dados entre turmas por RLS/funções mal escritas → mitigado pelos testes de autorização como gate.
2. Mexer em banco de produção sem saber o estado dele → **não aplicar nada até auditar o projeto certo**.
3. Perda de progresso dos alunos atuais por colisão de sync/`normalize` → o Live não usa `S`.
4. Conflito PR #2 × P1 em `quiz.js`/`quiz-renderers.js`.
5. 404 em deep links na Vercel.
6. Entrega "fantasma" (aluno acha que enviou) → só confirmação do servidor conta.
7. Conteúdo existente não foi desenhado para avaliação; revisão pedagógica das 6 questões do piloto com o professor.
8. Normas/tributos: o piloto usa só conteúdo de contabilidade básica, sem tributos.

**Decisões (preciso da sua resposta)**
- **D1 — PR #2:** (a) resolver os conflitos e integrar antes do P1; (b) manter fora e fazer o P1 com adaptador mínimo e depois reconciliar; (c) aproveitar só `teach.js`/glossário e fechar o PR. *Minha recomendação: (b) ou (c); a camada de "IA" heurística não serve para nota.*
- **D2 — Supabase:** informe o **ref do projeto** `conta-trilha` (ou conecte a org "ContaTrilha") e confirme se posso fazer somente leituras de auditoria.
- **D3 — Navegação:** (a) manter `go()` e adicionar apenas `vercel.json` com rewrite SPA + roteador mínimo por `location.pathname` só para `/sala/*`, `/professor/*`; (b) só `?sala=CODIGO`, sem `vercel.json`. *Recomendo (a).*
- **D4 — Correção no servidor:** `plpgsql` com vetores compartilhados (recomendado) ou Edge Function com o JS.
- **D5 — Código da sala:** texto com índice parcial + limite por usuário (recomendado) ou hash.
- **D6 — Banco de desenvolvimento:** segundo projeto gratuito ou Postgres local (preciso saber se tenho Docker/psql no ambiente — não verifiquei).
- **D7 — Escopo de turma:** deixar `classes`/matrícula para depois do piloto (recomendado) ou incluir já.
- **D8 — Piloto:** quem é o professor e qual disciplina; sem isso não valido a rubrica nem as 6 questões.

---

## 10. Cronograma relativo (por entregas, sem datas)

| Entrega | Conteúdo | Porte |
|---|---|---|
| E0 | Decisões D1–D8, acesso ao Supabase correto, banco de desenvolvimento | pequeno (depende de você) |
| E1 | Migration `0002` + funções + **suíte de testes de autorização** | médio |
| E2 | Projeção pública/privada, `answerPayload`, vetores JS↔SQL sobre os 8 tipos | médio |
| E3 | Rotas/`vercel.json` + área do professor (criar, publicar, abrir sala) | médio–grande |
| E4 | Fluxo do aluno (código, pré-aula, lobby, resposta, reentrada, offline) | médio–grande |
| E5 | Painel agregado + CSV seguro | pequeno–médio |
| E6 | Carga (20–30), acessibilidade manual, PR com capturas e testes | médio |

Cada entrega termina em commit na branch designada; **PR único do P1 só depois de E6, e sem merge, migration em produção ou deploy sem sua autorização.**

---

## 11. Fontes consultadas por mim (08/10/2026)

- Supabase, *Realtime Limits* — https://supabase.com/docs/guides/realtime/limits (Free: 200 conexões, 100 msgs/s, 100 joins/s, Presence 20 msgs/s e 5 chamadas/30 s por cliente, payload broadcast 256 KB).
- Supabase, *Realtime Authorization* — https://supabase.com/docs/guides/realtime/authorization (canais privados, políticas em `realtime.messages`, cache de política por conexão; não executar `ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY`).
- Repositório (código, README, ARQUITETURA.md, AUDITORIA_2026-09.md), PR #2 e PR #1 via GitHub; execução local de testes, build e contagem do currículo.

As demais referências do briefing (Dunlosky, WWC, EEF, CFC/CPC, WCAG, ANPD, Vercel, concorrentes) **não foram reconsultadas nesta rodada**; só entram no P1 como princípios de projeto já descritos no seu documento. Preços, cotas e normas devem ser reconfirmados antes de implementar.
