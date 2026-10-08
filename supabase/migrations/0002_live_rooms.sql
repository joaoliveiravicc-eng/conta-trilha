-- ContaTrilha Live — P1, entrega 1: salas formativas com correção protegida no servidor.
--
-- ESTADO: escrita e testada SOMENTE em PostgreSQL local. NÃO foi aplicada em nenhum projeto Supabase.
-- Aplicar em produção exige autorização explícita do proprietário.
--
-- Modelo de segurança
--   * Nenhuma escrita direta: `authenticated` só tem SELECT (sob RLS). Toda escrita passa por funções
--     `security definer` com search_path fixo, que validam identidade, papel, estado e tempo no servidor.
--   * Quem é professor vem de `live_teacher_grants` (inserida só por quem administra o banco), nunca de
--     JWT/user_metadata, e ninguém se auto-promove.
--   * O gabarito mora em `live_activity_item_keys`, que só o dono da atividade lê. O aluno recebe o enunciado
--     pela função `live_room_snapshot` e o gabarito só depois da revelação (ou do envio, se o professor
--     escolheu feedback imediato).
--   * Atividade `formative`: usa exercícios que já são públicos no catálogo do app. Não promete sigilo nem
--     nota oficial. `protected` existe como valor reservado e é recusado por enquanto.
--   * Nada aqui toca em `public.progress` nem em auth.*.

-- ---------------------------------------------------------------------------------------------
-- Tabelas
-- ---------------------------------------------------------------------------------------------

create table public.live_teacher_grants (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  granted_by uuid references auth.users(id) on delete set null,
  granted_at timestamptz not null default now(),
  revoked_at timestamptz
);

create table public.live_activities (
  id         uuid primary key default gen_random_uuid(),
  owner_id   uuid not null references auth.users(id) on delete cascade,
  title      text not null check (char_length(title) between 1 and 120),
  kind       text not null default 'formative' check (kind in ('formative', 'protected')),
  settings   jsonb not null default '{}'::jsonb,
  status     text not null default 'published' check (status in ('published', 'archived')),
  revision   int  not null default 1,
  created_at timestamptz not null default now()
);
create index live_activities_owner_idx on public.live_activities(owner_id);

-- Enunciado (público para quem está na sala) e gabarito (privado) ficam em tabelas separadas.
create table public.live_activity_items (
  id          uuid primary key default gen_random_uuid(),
  activity_id uuid not null references public.live_activities(id) on delete cascade,
  position    int  not null check (position between 1 and 40),
  item_type   text not null check (item_type in ('mc', 'tf', 'num')),
  source_key  text check (char_length(source_key) <= 80),
  public      jsonb not null,
  unique (activity_id, position)
);

create table public.live_activity_item_keys (
  item_id     uuid primary key references public.live_activity_items(id) on delete cascade,
  key         jsonb not null,
  explanation text check (char_length(explanation) <= 2000)
);

create table public.live_rooms (
  id          uuid primary key default gen_random_uuid(),
  activity_id uuid not null references public.live_activities(id) on delete cascade,
  host_id     uuid not null references auth.users(id) on delete cascade,
  code        text not null check (code ~ '^[A-HJ-NP-Z2-9]{6}$'),
  mode        text not null check (mode in ('teacher_paced', 'self_paced')),
  feedback    text not null check (feedback in ('after_reveal', 'immediate')),
  status      text not null default 'lobby' check (status in ('lobby', 'running', 'closed')),
  max_members int  not null default 40 check (max_members between 1 and 60),
  revision    int  not null default 1,
  created_at  timestamptz not null default now(),
  started_at  timestamptz,
  closed_at   timestamptz,
  expires_at  timestamptz not null
);
-- Um código só é único enquanto a sala está ativa; depois pode ser reaproveitado.
create unique index live_rooms_active_code on public.live_rooms(code) where status in ('lobby', 'running');
create index live_rooms_host_idx on public.live_rooms(host_id);

create table public.live_room_items (
  room_id    uuid not null references public.live_rooms(id) on delete cascade,
  position   int  not null,
  item_id    uuid not null references public.live_activity_items(id),
  status     text not null default 'pending' check (status in ('pending', 'open', 'closed', 'revealed')),
  opened_at  timestamptz,
  closes_at  timestamptz,
  closed_at  timestamptz,
  revealed_at timestamptz,
  primary key (room_id, position)
);

create table public.live_room_members (
  room_id      uuid not null references public.live_rooms(id) on delete cascade,
  user_id      uuid not null references auth.users(id) on delete cascade,
  display_name text not null check (char_length(display_name) between 1 and 24),
  joined_at    timestamptz not null default now(),
  primary key (room_id, user_id)
);

-- Uma resposta por aluno e questão: a primeira vence; reenvio com o mesmo nonce devolve o mesmo resultado.
create table public.live_answers (
  room_id      uuid not null,
  position     int  not null,
  user_id      uuid not null,
  payload      jsonb not null,
  is_correct   boolean not null,
  nonce        text not null check (char_length(nonce) between 8 and 64),
  submitted_at timestamptz not null default clock_timestamp(),
  primary key (room_id, position, user_id),
  foreign key (room_id, position) references public.live_room_items(room_id, position) on delete cascade,
  foreign key (room_id, user_id)  references public.live_room_members(room_id, user_id) on delete cascade
);

-- Controle de tentativas de código (só falhas contam). Sem política: ninguém lê pela API.
create table public.live_join_attempts (
  id           bigint generated always as identity primary key,
  user_id      uuid not null references auth.users(id) on delete cascade,
  ok           boolean not null,
  attempted_at timestamptz not null default clock_timestamp()
);
create index live_join_attempts_user_idx on public.live_join_attempts(user_id, attempted_at);

create table public.live_audit_events (
  id          bigint generated always as identity primary key,
  at          timestamptz not null default clock_timestamp(),
  actor_id    uuid references auth.users(id) on delete set null,
  room_id     uuid,
  activity_id uuid,
  event       text not null,
  detail      jsonb not null default '{}'::jsonb
);
create index live_audit_actor_idx on public.live_audit_events(actor_id, at);

-- ---------------------------------------------------------------------------------------------
-- RLS: leitura restrita; nenhuma política de escrita (a escrita é só pelas funções abaixo).
-- ---------------------------------------------------------------------------------------------

alter table public.live_teacher_grants   enable row level security;
alter table public.live_activities       enable row level security;
alter table public.live_activity_items   enable row level security;
alter table public.live_activity_item_keys enable row level security;
alter table public.live_rooms            enable row level security;
alter table public.live_room_items       enable row level security;
alter table public.live_room_members     enable row level security;
alter table public.live_answers          enable row level security;
alter table public.live_join_attempts    enable row level security;
alter table public.live_audit_events     enable row level security;

revoke all on table
  public.live_teacher_grants, public.live_activities, public.live_activity_items, public.live_activity_item_keys,
  public.live_rooms, public.live_room_items, public.live_room_members, public.live_answers,
  public.live_join_attempts, public.live_audit_events
from public, anon, authenticated;

grant select on table
  public.live_activities, public.live_activity_items, public.live_activity_item_keys,
  public.live_rooms, public.live_room_items, public.live_room_members, public.live_answers,
  public.live_audit_events
to authenticated;

create policy "live: dono lê a atividade" on public.live_activities
  for select to authenticated using (owner_id = auth.uid());

create policy "live: dono lê os itens" on public.live_activity_items
  for select to authenticated using (exists (
    select 1 from public.live_activities a where a.id = activity_id and a.owner_id = auth.uid()));

create policy "live: dono lê o gabarito" on public.live_activity_item_keys
  for select to authenticated using (exists (
    select 1 from public.live_activity_items i join public.live_activities a on a.id = i.activity_id
    where i.id = item_id and a.owner_id = auth.uid()));

create policy "live: anfitrião lê a sala" on public.live_rooms
  for select to authenticated using (host_id = auth.uid());

create policy "live: anfitrião lê o estado das questões" on public.live_room_items
  for select to authenticated using (exists (
    select 1 from public.live_rooms r where r.id = room_id and r.host_id = auth.uid()));

create policy "live: própria entrada ou participantes do anfitrião" on public.live_room_members
  for select to authenticated using (user_id = auth.uid() or exists (
    select 1 from public.live_rooms r where r.id = room_id and r.host_id = auth.uid()));

create policy "live: só o anfitrião lê respostas" on public.live_answers
  for select to authenticated using (exists (
    select 1 from public.live_rooms r where r.id = room_id and r.host_id = auth.uid()));

create policy "live: lê os próprios eventos de auditoria" on public.live_audit_events
  for select to authenticated using (actor_id = auth.uid());

-- ---------------------------------------------------------------------------------------------
-- Funções internas (não executáveis pela API)
-- ---------------------------------------------------------------------------------------------

-- Alfabeto de 32 símbolos (sem I e O). Cada byte aleatório vira um símbolo com `& 31`, sem viés.
-- gen_random_uuid() usa gerador criptográfico; os bytes 6 e 8 têm bits fixos de versão e são pulados.
create function public.live_gen_code() returns text
language plpgsql volatile set search_path = public, pg_temp as $$
declare
  v_alphabet constant text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  v_bytes bytea := uuid_send(gen_random_uuid());
  v_idx int[] := array[0, 1, 2, 3, 4, 5];
  v_code text := '';
  i int;
begin
  foreach i in array v_idx loop
    v_code := v_code || substr(v_alphabet, (get_byte(v_bytes, i) & 31) + 1, 1);
  end loop;
  return v_code;
end $$;

create function public.live_audit(p_event text, p_room uuid, p_activity uuid, p_detail jsonb default '{}'::jsonb)
returns void language sql volatile security definer set search_path = public, pg_temp as $$
  insert into public.live_audit_events(actor_id, room_id, activity_id, event, detail)
  values (auth.uid(), p_room, p_activity, p_event, coalesce(p_detail, '{}'::jsonb));
$$;

-- Valida a forma do enunciado (público) e do gabarito (privado). Chaves desconhecidas são recusadas:
-- é isso que impede esconder a resposta dentro do enunciado ou o contrário.
create function public.live_validate_item(p_type text, p_public jsonb, p_key jsonb)
returns void language plpgsql immutable set search_path = public, pg_temp as $$
declare
  v_n int; v_ans numeric; v_tol numeric;
begin
  if p_public is null or jsonb_typeof(p_public) <> 'object' or p_key is null or jsonb_typeof(p_key) <> 'object' then
    raise exception 'invalid_item: enunciado e gabarito devem ser objetos';
  end if;
  if jsonb_typeof(p_public -> 'q') is distinct from 'string' or char_length(p_public ->> 'q') not between 1 and 4000 then
    raise exception 'invalid_item: enunciado (q) ausente ou fora do limite';
  end if;

  if p_type = 'mc' then
    if exists (select 1 from jsonb_object_keys(p_public) k where k not in ('q', 'options'))
       or exists (select 1 from jsonb_object_keys(p_key) k where k <> 'answer') then
      raise exception 'invalid_item: chaves inesperadas em mc';
    end if;
    if jsonb_typeof(p_public -> 'options') is distinct from 'array' then raise exception 'invalid_item: options deve ser lista'; end if;
    v_n := jsonb_array_length(p_public -> 'options');
    if v_n not between 2 and 8 then raise exception 'invalid_item: mc precisa de 2 a 8 alternativas'; end if;
    if exists (select 1 from jsonb_array_elements(p_public -> 'options') o
               where jsonb_typeof(o) <> 'string' or char_length(o #>> '{}') not between 1 and 400) then
      raise exception 'invalid_item: alternativa inválida';
    end if;
    if (select count(distinct o #>> '{}') from jsonb_array_elements(p_public -> 'options') o) <> v_n then
      raise exception 'invalid_item: alternativas repetidas';
    end if;
    if jsonb_typeof(p_key -> 'answer') is distinct from 'number' then raise exception 'invalid_item: answer deve ser número'; end if;
    v_ans := (p_key ->> 'answer')::numeric;
    if v_ans <> trunc(v_ans) or v_ans not between 0 and v_n - 1 then raise exception 'invalid_item: answer fora das alternativas'; end if;

  elsif p_type = 'tf' then
    if exists (select 1 from jsonb_object_keys(p_public) k where k <> 'q')
       or exists (select 1 from jsonb_object_keys(p_key) k where k <> 'answer') then
      raise exception 'invalid_item: chaves inesperadas em tf';
    end if;
    if jsonb_typeof(p_key -> 'answer') is distinct from 'boolean' then raise exception 'invalid_item: answer deve ser booleano'; end if;

  elsif p_type = 'num' then
    if exists (select 1 from jsonb_object_keys(p_public) k where k not in ('q', 'prefix', 'suffix'))
       or exists (select 1 from jsonb_object_keys(p_key) k where k not in ('answer', 'tol')) then
      raise exception 'invalid_item: chaves inesperadas em num';
    end if;
    if exists (select 1 from jsonb_each(p_public) e
               where e.key in ('prefix', 'suffix') and (jsonb_typeof(e.value) <> 'string' or char_length(e.value #>> '{}') > 24)) then
      raise exception 'invalid_item: prefixo/sufixo inválido';
    end if;
    if jsonb_typeof(p_key -> 'answer') is distinct from 'number' or jsonb_typeof(p_key -> 'tol') is distinct from 'number' then
      raise exception 'invalid_item: num precisa de answer e tol numéricos';
    end if;
    v_ans := (p_key ->> 'answer')::numeric; v_tol := (p_key ->> 'tol')::numeric;
    if abs(v_ans) >= 1e12 or v_tol < 0 or v_tol >= 1e12 then raise exception 'invalid_item: answer/tol fora do intervalo'; end if;

  else
    raise exception 'invalid_item: tipo não suportado (%)', p_type;
  end if;
end $$;

-- Forma da resposta enviada pelo aluno, conferida contra o enunciado publicado.
create function public.live_payload_ok(p_type text, p_public jsonb, p_payload jsonb)
returns boolean language plpgsql immutable set search_path = public, pg_temp as $$
declare v_v numeric;
begin
  if p_payload is null or jsonb_typeof(p_payload) <> 'object' then return false; end if;
  if p_type = 'mc' then
    if exists (select 1 from jsonb_object_keys(p_payload) k where k <> 'choice') then return false; end if;
    if jsonb_typeof(p_payload -> 'choice') is distinct from 'number' then return false; end if;
    v_v := (p_payload ->> 'choice')::numeric;
    return v_v = trunc(v_v) and v_v between 0 and jsonb_array_length(p_public -> 'options') - 1;
  elsif p_type = 'tf' then
    if exists (select 1 from jsonb_object_keys(p_payload) k where k <> 'value') then return false; end if;
    return jsonb_typeof(p_payload -> 'value') = 'boolean';
  elsif p_type = 'num' then
    if exists (select 1 from jsonb_object_keys(p_payload) k where k <> 'value') then return false; end if;
    if jsonb_typeof(p_payload -> 'value') is distinct from 'number' then return false; end if;
    return abs((p_payload ->> 'value')::numeric) < 1e12;
  end if;
  return false;
end $$;

-- A correção em si. Mantida mínima de propósito: as regras de tolerância são resolvidas ao publicar
-- (o cliente grava `tol` já calculado), então aqui só há comparação exata. Equivalência com o app
-- verificada por tests/live-db/equivalence.test.js sobre todo o catálogo.
create function public.live_grade(p_type text, p_key jsonb, p_payload jsonb)
returns boolean language plpgsql immutable set search_path = public, pg_temp as $$
begin
  if p_type = 'mc' then
    return (p_payload ->> 'choice')::int = (p_key ->> 'answer')::int;
  elsif p_type = 'tf' then
    return (p_payload -> 'value') = (p_key -> 'answer');
  elsif p_type = 'num' then
    -- float8 (IEEE 754), igual ao Number do JavaScript, para que a borda da tolerância não divirja.
    return abs((p_payload ->> 'value')::float8 - (p_key ->> 'answer')::float8) <= (p_key ->> 'tol')::float8;
  end if;
  return false;
end $$;

-- ---------------------------------------------------------------------------------------------
-- API (executável por usuários autenticados)
-- ---------------------------------------------------------------------------------------------

create function public.live_is_teacher() returns boolean
language sql stable security definer set search_path = public, pg_temp as $$
  select exists (select 1 from public.live_teacher_grants g where g.user_id = auth.uid() and g.revoked_at is null);
$$;

-- Cria uma atividade formativa a partir de itens já projetados (enunciado separado do gabarito).
-- p_items: [{ source_key, type, public:{...}, key:{...}, explanation }]
create function public.live_create_activity(p_title text, p_kind text, p_settings jsonb, p_items jsonb)
returns uuid language plpgsql volatile security definer set search_path = public, pg_temp as $$
declare
  v_uid uuid := auth.uid();
  v_id uuid; v_item jsonb; v_item_id uuid; v_pos int := 0;
  v_mode text; v_feedback text; v_materials jsonb;
begin
  if v_uid is null then raise exception 'not_authenticated' using errcode = '42501'; end if;
  if not public.live_is_teacher() then raise exception 'not_teacher' using errcode = '42501'; end if;
  p_title := btrim(coalesce(p_title, ''));
  if char_length(p_title) not between 1 and 120 then raise exception 'invalid_title'; end if;
  if p_kind is distinct from 'formative' then
    -- 'protected' fica reservado: exige questões e gabaritos fora do app público e controles próprios.
    raise exception 'protected_not_enabled';
  end if;
  if p_items is null or jsonb_typeof(p_items) <> 'array' or jsonb_array_length(p_items) not between 1 and 40 then
    raise exception 'invalid_items: de 1 a 40 itens';
  end if;
  p_settings := coalesce(p_settings, '{}'::jsonb);
  if jsonb_typeof(p_settings) <> 'object' then raise exception 'invalid_settings'; end if;
  v_mode := coalesce(p_settings ->> 'mode', 'teacher_paced');
  v_feedback := coalesce(p_settings ->> 'feedback', 'after_reveal');
  if v_mode not in ('teacher_paced', 'self_paced') or v_feedback not in ('after_reveal', 'immediate') then
    raise exception 'invalid_settings';
  end if;
  v_materials := coalesce(p_settings -> 'materials', '[]'::jsonb);
  if jsonb_typeof(v_materials) <> 'array' or jsonb_array_length(v_materials) > 10
     or exists (select 1 from jsonb_array_elements(v_materials) m where jsonb_typeof(m) <> 'string' or char_length(m #>> '{}') > 80) then
    raise exception 'invalid_settings: materials';
  end if;

  insert into public.live_activities(owner_id, title, kind, settings)
  values (v_uid, p_title, 'formative',
          jsonb_build_object('mode', v_mode, 'feedback', v_feedback, 'materials', v_materials,
                             'official_grade', false, 'ranking', false, 'hints', false))
  returning id into v_id;

  for v_item in select * from jsonb_array_elements(p_items) loop
    v_pos := v_pos + 1;
    if jsonb_typeof(v_item) <> 'object' then raise exception 'invalid_item'; end if;
    perform public.live_validate_item(v_item ->> 'type', v_item -> 'public', v_item -> 'key');
    if char_length(coalesce(v_item ->> 'explanation', '')) > 2000 then raise exception 'invalid_item: explicação longa'; end if;
    insert into public.live_activity_items(activity_id, position, item_type, source_key, public)
    values (v_id, v_pos, v_item ->> 'type', nullif(left(v_item ->> 'source_key', 80), ''), v_item -> 'public')
    returning id into v_item_id;
    insert into public.live_activity_item_keys(item_id, key, explanation)
    values (v_item_id, v_item -> 'key', nullif(v_item ->> 'explanation', ''));
  end loop;

  perform public.live_audit('activity_created', null, v_id, jsonb_build_object('items', v_pos));
  return v_id;
end $$;

create function public.live_create_room(p_activity_id uuid, p_ttl_minutes int default 240, p_max_members int default 40)
returns jsonb language plpgsql volatile security definer set search_path = public, pg_temp as $$
declare
  v_uid uuid := auth.uid();
  v_act public.live_activities; v_room_id uuid; v_code text; v_try int := 0; v_expires timestamptz;
begin
  if v_uid is null then raise exception 'not_authenticated' using errcode = '42501'; end if;
  if not public.live_is_teacher() then raise exception 'not_teacher' using errcode = '42501'; end if;
  select * into v_act from public.live_activities where id = p_activity_id and owner_id = v_uid and status = 'published';
  if not found then raise exception 'not_owner' using errcode = '42501'; end if;
  if v_act.kind <> 'formative' then raise exception 'protected_not_enabled'; end if;
  if p_ttl_minutes is null or p_ttl_minutes not between 5 and 1440 then raise exception 'invalid_ttl'; end if;
  if p_max_members is null or p_max_members not between 1 and 60 then raise exception 'invalid_max_members'; end if;
  if (select count(*) from public.live_rooms r
      where r.host_id = v_uid and r.status in ('lobby', 'running') and r.expires_at > clock_timestamp()) >= 5 then
    raise exception 'too_many_open_rooms';
  end if;

  -- Sala expirada que ainda ocupa o código é encerrada antes de tentar reutilizá-lo.
  update public.live_rooms set status = 'closed', closed_at = clock_timestamp()
  where status in ('lobby', 'running') and expires_at <= clock_timestamp();

  v_expires := clock_timestamp() + make_interval(mins => p_ttl_minutes);
  loop
    v_try := v_try + 1;
    v_code := public.live_gen_code();
    begin
      insert into public.live_rooms(activity_id, host_id, code, mode, feedback, max_members, expires_at)
      values (v_act.id, v_uid, v_code, v_act.settings ->> 'mode', v_act.settings ->> 'feedback', p_max_members, v_expires)
      returning id into v_room_id;
      exit;
    exception when unique_violation then
      if v_try >= 20 then raise exception 'code_generation_failed'; end if;
    end;
  end loop;

  insert into public.live_room_items(room_id, position, item_id)
  select v_room_id, i.position, i.id from public.live_activity_items i where i.activity_id = v_act.id;

  perform public.live_audit('room_created', v_room_id, v_act.id, jsonb_build_object('mode', v_act.settings ->> 'mode'));
  return jsonb_build_object('room_id', v_room_id, 'code', v_code, 'expires_at', v_expires);
end $$;

-- Entrada na sala. Falhas NÃO levantam exceção (a exceção desfaria o registro da tentativa);
-- voltam como { ok:false, error }. A mensagem não diferencia código inexistente de expirado.
create function public.live_join_room(p_code text, p_display_name text default null)
returns jsonb language plpgsql volatile security definer set search_path = public, pg_temp as $$
declare
  v_uid uuid := auth.uid();
  v_code text; v_room public.live_rooms; v_name text; v_title text; v_settings jsonb;
begin
  if v_uid is null then raise exception 'not_authenticated' using errcode = '42501'; end if;
  delete from public.live_join_attempts where user_id = v_uid and attempted_at < clock_timestamp() - interval '1 day';
  if (select count(*) from public.live_join_attempts
      where user_id = v_uid and not ok and attempted_at > clock_timestamp() - interval '10 minutes') >= 8 then
    return jsonb_build_object('ok', false, 'error', 'too_many_attempts');
  end if;

  v_code := upper(regexp_replace(coalesce(p_code, ''), '[\s-]', '', 'g'));
  select * into v_room from public.live_rooms
  where code = v_code and status in ('lobby', 'running') for update;

  if not found or v_code !~ '^[A-HJ-NP-Z2-9]{6}$' then
    insert into public.live_join_attempts(user_id, ok) values (v_uid, false);
    return jsonb_build_object('ok', false, 'error', 'invalid_code');
  end if;
  if v_room.expires_at <= clock_timestamp() then
    update public.live_rooms set status = 'closed', closed_at = clock_timestamp() where id = v_room.id;
    insert into public.live_join_attempts(user_id, ok) values (v_uid, false);
    return jsonb_build_object('ok', false, 'error', 'invalid_code');
  end if;
  if v_room.host_id = v_uid then
    return jsonb_build_object('ok', false, 'error', 'host_cannot_join');
  end if;

  if not exists (select 1 from public.live_room_members where room_id = v_room.id and user_id = v_uid) then
    if (select count(*) from public.live_room_members where room_id = v_room.id) >= v_room.max_members then
      return jsonb_build_object('ok', false, 'error', 'room_full');
    end if;
    v_name := left(btrim(regexp_replace(coalesce(p_display_name, ''), '[[:cntrl:]]', '', 'g')), 24);
    if v_name = '' then v_name := 'Aluno ' || lpad((floor(random() * 10000))::int::text, 4, '0'); end if;
    insert into public.live_room_members(room_id, user_id, display_name) values (v_room.id, v_uid, v_name);
  end if;
  insert into public.live_join_attempts(user_id, ok) values (v_uid, true);

  select a.title, a.settings into v_title, v_settings from public.live_activities a where a.id = v_room.activity_id;
  return jsonb_build_object('ok', true, 'room_id', v_room.id, 'status', v_room.status, 'mode', v_room.mode,
                            'title', v_title, 'materials', v_settings -> 'materials');
end $$;

-- Fotografia do estado da sala para quem participa dela. É a fonte da verdade para reentrada:
-- o Realtime (quando existir) só avisa "mudou, busque de novo".
create function public.live_room_snapshot(p_room_id uuid)
returns jsonb language plpgsql volatile security definer set search_path = public, pg_temp as $$
declare
  v_uid uuid := auth.uid();
  v_room public.live_rooms; v_act public.live_activities;
  v_is_host boolean; v_items jsonb; v_members jsonb; v_status text;
begin
  if v_uid is null then raise exception 'not_authenticated' using errcode = '42501'; end if;
  select * into v_room from public.live_rooms where id = p_room_id;
  v_is_host := found and v_room.host_id = v_uid;
  if not found or not (v_is_host or exists (select 1 from public.live_room_members m where m.room_id = p_room_id and m.user_id = v_uid)) then
    raise exception 'not_member' using errcode = '42501';
  end if;
  select * into v_act from public.live_activities where id = v_room.activity_id;
  v_status := case when v_room.status in ('lobby', 'running') and v_room.expires_at <= clock_timestamp() then 'expired' else v_room.status end;

  select coalesce(jsonb_agg(s.row_json order by s.pos), '[]'::jsonb) into v_items from (
    select ri.position as pos,
      jsonb_build_object('position', ri.position, 'status', ri.status, 'type', ai.item_type,
                         'opened_at', ri.opened_at, 'closes_at', ri.closes_at,
                         'public', case when v_is_host or ri.status <> 'pending' then ai.public else null end)
      || case when v_is_host then jsonb_build_object('answered_count',
           (select count(*) from public.live_answers a where a.room_id = ri.room_id and a.position = ri.position)) else '{}'::jsonb end
      || case when not v_is_host and ma.user_id is not null then jsonb_build_object('my_answer',
           jsonb_build_object('payload', ma.payload, 'submitted_at', ma.submitted_at)
           || case when ri.status = 'revealed' or v_room.feedback = 'immediate'
                   then jsonb_build_object('is_correct', ma.is_correct) else '{}'::jsonb end) else '{}'::jsonb end
      || case when v_is_host or ri.status = 'revealed' or (v_room.feedback = 'immediate' and ma.user_id is not null)
              then jsonb_build_object('answer', k.key -> 'answer', 'explanation', k.explanation) else '{}'::jsonb end
      as row_json
    from public.live_room_items ri
    join public.live_activity_items ai on ai.id = ri.item_id
    join public.live_activity_item_keys k on k.item_id = ai.id
    left join public.live_answers ma on ma.room_id = ri.room_id and ma.position = ri.position and ma.user_id = v_uid
    where ri.room_id = p_room_id
  ) s;

  if v_is_host then
    select coalesce(jsonb_agg(jsonb_build_object('display_name', m.display_name, 'joined_at', m.joined_at,
             'answered', (select count(*) from public.live_answers a where a.room_id = m.room_id and a.user_id = m.user_id))
             order by m.joined_at), '[]'::jsonb)
    into v_members from public.live_room_members m where m.room_id = p_room_id;
  end if;

  return jsonb_build_object(
    'room', jsonb_build_object('id', v_room.id, 'status', v_status, 'mode', v_room.mode, 'feedback', v_room.feedback,
              'revision', v_room.revision, 'expires_at', v_room.expires_at, 'server_now', clock_timestamp(),
              'title', v_act.title, 'materials', v_act.settings -> 'materials')
            || case when v_is_host then jsonb_build_object('code', v_room.code) else '{}'::jsonb end,
    'is_host', v_is_host,
    'members_count', (select count(*) from public.live_room_members where room_id = p_room_id),
    'members', case when v_is_host then v_members else null end,
    'items', v_items);
end $$;

-- Envio de resposta. Idempotente e seguro sob concorrência:
--   mesmo nonce  -> 'replayed'        (devolve o resultado já gravado)
--   outro nonce  -> 'already_answered' (a primeira resposta vence; nada é sobrescrito)
-- A janela de tempo é decidida pelo relógio do servidor. O lock em live_room_items serializa o envio
-- com o fechamento da questão pelo professor.
create function public.live_submit_answer(p_room_id uuid, p_position int, p_payload jsonb, p_nonce text)
returns jsonb language plpgsql volatile security definer set search_path = public, pg_temp as $$
declare
  v_uid uuid := auth.uid();
  v_room public.live_rooms; v_ri public.live_room_items; v_item public.live_activity_items; v_key public.live_activity_item_keys;
  v_old public.live_answers; v_ok boolean; v_new public.live_answers; v_status text;
begin
  if v_uid is null then raise exception 'not_authenticated' using errcode = '42501'; end if;
  if p_nonce is null or char_length(p_nonce) not between 8 and 64 then raise exception 'invalid_nonce'; end if;
  if not exists (select 1 from public.live_room_members m where m.room_id = p_room_id and m.user_id = v_uid) then
    raise exception 'not_member' using errcode = '42501';
  end if;

  -- Reenvio de algo já gravado responde mesmo depois do fechamento (a resposta pode ter se perdido na rede).
  select * into v_old from public.live_answers where room_id = p_room_id and position = p_position and user_id = v_uid;
  if v_old.user_id is not null then
    select * into v_room from public.live_rooms where id = p_room_id;
    return public.live__answer_result(v_old, v_room.feedback, p_nonce, false);
  end if;

  select * into v_ri from public.live_room_items where room_id = p_room_id and position = p_position for share;
  if not found then raise exception 'invalid_position'; end if;
  select * into v_room from public.live_rooms where id = p_room_id;
  if v_room.status <> 'running' then raise exception 'room_not_running'; end if;
  if v_room.expires_at <= clock_timestamp() then raise exception 'room_expired'; end if;
  if v_ri.status <> 'open' then raise exception 'item_not_open'; end if;
  if v_ri.closes_at is not null and v_ri.closes_at <= clock_timestamp() then raise exception 'item_closed'; end if;

  select * into v_item from public.live_activity_items where id = v_ri.item_id;
  select * into v_key from public.live_activity_item_keys where item_id = v_item.id;
  if not public.live_payload_ok(v_item.item_type, v_item.public, p_payload) then raise exception 'invalid_payload'; end if;
  v_ok := public.live_grade(v_item.item_type, v_key.key, p_payload);

  insert into public.live_answers(room_id, position, user_id, payload, is_correct, nonce)
  values (p_room_id, p_position, v_uid, p_payload, v_ok, p_nonce)
  on conflict (room_id, position, user_id) do nothing
  returning * into v_new;

  if v_new.user_id is null then
    -- Perdeu a corrida contra outro envio do mesmo aluno: devolve o que ficou gravado.
    select * into v_old from public.live_answers where room_id = p_room_id and position = p_position and user_id = v_uid;
    return public.live__answer_result(v_old, v_room.feedback, p_nonce, false);
  end if;
  return public.live__answer_result(v_new, v_room.feedback, p_nonce, true);
end $$;

-- Monta a resposta do envio; só inclui acerto/gabarito quando o professor escolheu feedback imediato.
create function public.live__answer_result(p_ans public.live_answers, p_feedback text, p_nonce text, p_fresh boolean)
returns jsonb language plpgsql stable security definer set search_path = public, pg_temp as $$
declare v_res jsonb; v_status text; v_key public.live_activity_item_keys;
begin
  v_status := case when p_fresh then 'accepted' when p_ans.nonce = p_nonce then 'replayed' else 'already_answered' end;
  v_res := jsonb_build_object('ok', true, 'status', v_status, 'submitted_at', p_ans.submitted_at, 'payload', p_ans.payload);
  if p_feedback = 'immediate' then
    select k.* into v_key from public.live_room_items ri
      join public.live_activity_item_keys k on k.item_id = ri.item_id
      where ri.room_id = p_ans.room_id and ri.position = p_ans.position;
    v_res := v_res || jsonb_build_object('is_correct', p_ans.is_correct, 'answer', v_key.key -> 'answer', 'explanation', v_key.explanation);
  end if;
  return v_res;
end $$;

-- ---- Controle do professor (anfitrião) ----

create function public.live__host_room(p_room_id uuid) returns public.live_rooms
language plpgsql volatile security definer set search_path = public, pg_temp as $$
declare v_room public.live_rooms;
begin
  if auth.uid() is null then raise exception 'not_authenticated' using errcode = '42501'; end if;
  select * into v_room from public.live_rooms where id = p_room_id for update;
  if not found or v_room.host_id is distinct from auth.uid() then raise exception 'not_host' using errcode = '42501'; end if;
  if not public.live_is_teacher() then raise exception 'not_teacher' using errcode = '42501'; end if;
  return v_room;
end $$;

create function public.live_start_room(p_room_id uuid) returns jsonb
language plpgsql volatile security definer set search_path = public, pg_temp as $$
declare v_room public.live_rooms;
begin
  v_room := public.live__host_room(p_room_id);
  if v_room.status <> 'lobby' then raise exception 'invalid_state'; end if;
  if v_room.expires_at <= clock_timestamp() then raise exception 'room_expired'; end if;
  update public.live_rooms set status = 'running', started_at = clock_timestamp(), revision = revision + 1 where id = p_room_id;
  if v_room.mode = 'self_paced' then
    update public.live_room_items set status = 'open', opened_at = clock_timestamp() where room_id = p_room_id;
  end if;
  perform public.live_audit('room_started', p_room_id, v_room.activity_id);
  return jsonb_build_object('ok', true);
end $$;

create function public.live_open_item(p_room_id uuid, p_position int, p_seconds int default null) returns jsonb
language plpgsql volatile security definer set search_path = public, pg_temp as $$
declare v_room public.live_rooms; v_n int;
begin
  v_room := public.live__host_room(p_room_id);
  if v_room.status <> 'running' or v_room.mode <> 'teacher_paced' then raise exception 'invalid_state'; end if;
  if v_room.expires_at <= clock_timestamp() then raise exception 'room_expired'; end if;
  if p_seconds is not null and p_seconds not between 5 and 3600 then raise exception 'invalid_seconds'; end if;
  if exists (select 1 from public.live_room_items where room_id = p_room_id and status = 'open') then raise exception 'another_item_open'; end if;
  update public.live_room_items
     set status = 'open', opened_at = clock_timestamp(),
         closes_at = case when p_seconds is null then null else clock_timestamp() + make_interval(secs => p_seconds) end
   where room_id = p_room_id and position = p_position and status = 'pending';
  get diagnostics v_n = row_count;
  if v_n = 0 then raise exception 'invalid_state'; end if;
  update public.live_rooms set revision = revision + 1 where id = p_room_id;
  perform public.live_audit('item_opened', p_room_id, v_room.activity_id, jsonb_build_object('position', p_position));
  return jsonb_build_object('ok', true);
end $$;

create function public.live_extend_item(p_room_id uuid, p_position int, p_add_seconds int) returns jsonb
language plpgsql volatile security definer set search_path = public, pg_temp as $$
declare v_room public.live_rooms; v_n int;
begin
  v_room := public.live__host_room(p_room_id);
  if v_room.status <> 'running' then raise exception 'invalid_state'; end if;
  if p_add_seconds is null or p_add_seconds not between 1 and 600 then raise exception 'invalid_seconds'; end if;
  update public.live_room_items
     set closes_at = greatest(closes_at, clock_timestamp()) + make_interval(secs => p_add_seconds)
   where room_id = p_room_id and position = p_position and status = 'open' and closes_at is not null;
  get diagnostics v_n = row_count;
  if v_n = 0 then raise exception 'invalid_state'; end if;
  update public.live_rooms set revision = revision + 1 where id = p_room_id;
  perform public.live_audit('item_extended', p_room_id, v_room.activity_id, jsonb_build_object('position', p_position, 'seconds', p_add_seconds));
  return jsonb_build_object('ok', true);
end $$;

create function public.live_close_item(p_room_id uuid, p_position int) returns jsonb
language plpgsql volatile security definer set search_path = public, pg_temp as $$
declare v_room public.live_rooms; v_n int;
begin
  v_room := public.live__host_room(p_room_id);
  update public.live_room_items set status = 'closed', closed_at = clock_timestamp()
   where room_id = p_room_id and position = p_position and status = 'open';
  get diagnostics v_n = row_count;
  if v_n = 0 then raise exception 'invalid_state'; end if;
  update public.live_rooms set revision = revision + 1 where id = p_room_id;
  perform public.live_audit('item_closed', p_room_id, v_room.activity_id, jsonb_build_object('position', p_position));
  return jsonb_build_object('ok', true);
end $$;

create function public.live_reveal_item(p_room_id uuid, p_position int) returns jsonb
language plpgsql volatile security definer set search_path = public, pg_temp as $$
declare v_room public.live_rooms; v_n int;
begin
  v_room := public.live__host_room(p_room_id);
  update public.live_room_items set status = 'revealed', revealed_at = clock_timestamp()
   where room_id = p_room_id and position = p_position and status = 'closed';
  get diagnostics v_n = row_count;
  if v_n = 0 then raise exception 'invalid_state'; end if;
  update public.live_rooms set revision = revision + 1 where id = p_room_id;
  perform public.live_audit('item_revealed', p_room_id, v_room.activity_id, jsonb_build_object('position', p_position));
  return jsonb_build_object('ok', true);
end $$;

create function public.live_close_room(p_room_id uuid) returns jsonb
language plpgsql volatile security definer set search_path = public, pg_temp as $$
declare v_room public.live_rooms;
begin
  v_room := public.live__host_room(p_room_id);
  if v_room.status = 'closed' then return jsonb_build_object('ok', true); end if;
  update public.live_room_items set status = 'closed', closed_at = clock_timestamp() where room_id = p_room_id and status = 'open';
  update public.live_rooms set status = 'closed', closed_at = clock_timestamp(), revision = revision + 1 where id = p_room_id;
  perform public.live_audit('room_closed', p_room_id, v_room.activity_id);
  return jsonb_build_object('ok', true);
end $$;

-- Resultado agregado para o professor: contagens e distribuição de alternativas, sem listar alunos.
create function public.live_room_results(p_room_id uuid) returns jsonb
language plpgsql volatile security definer set search_path = public, pg_temp as $$
declare v_room public.live_rooms; v_items jsonb;
begin
  v_room := public.live__host_room(p_room_id);
  select coalesce(jsonb_agg(jsonb_build_object(
      'position', ri.position, 'status', ri.status, 'type', ai.item_type,
      'answered', coalesce(c.answered, 0), 'correct', coalesce(c.correct, 0),
      'distribution', case when ai.item_type in ('mc', 'tf') then coalesce(d.dist, '{}'::jsonb) else '{}'::jsonb end)
      order by ri.position), '[]'::jsonb)
  into v_items
  from public.live_room_items ri
  join public.live_activity_items ai on ai.id = ri.item_id
  left join (select position, count(*) as answered, count(*) filter (where is_correct) as correct
             from public.live_answers where room_id = p_room_id group by position) c on c.position = ri.position
  left join (select position, jsonb_object_agg(k, n) as dist
             from (select position, coalesce(payload ->> 'choice', payload ->> 'value') as k, count(*) as n
                   from public.live_answers where room_id = p_room_id group by 1, 2) x group by position) d on d.position = ri.position
  where ri.room_id = p_room_id;
  return jsonb_build_object('members', (select count(*) from public.live_room_members where room_id = p_room_id),
                            'official_grade', false, 'items', v_items);
end $$;

-- ---------------------------------------------------------------------------------------------
-- Permissões de execução: nada é público; só a API listada chega a `authenticated`.
-- ---------------------------------------------------------------------------------------------

do $$
declare f record;
begin
  for f in select p.oid::regprocedure as sig from pg_proc p join pg_namespace n on n.oid = p.pronamespace
           where n.nspname = 'public' and p.proname like 'live\_%' loop
    execute format('revoke all on function %s from public, anon, authenticated', f.sig);
  end loop;
end $$;

grant execute on function
  public.live_is_teacher(),
  public.live_create_activity(text, text, jsonb, jsonb),
  public.live_create_room(uuid, int, int),
  public.live_join_room(text, text),
  public.live_room_snapshot(uuid),
  public.live_submit_answer(uuid, int, jsonb, text),
  public.live_start_room(uuid),
  public.live_open_item(uuid, int, int),
  public.live_extend_item(uuid, int, int),
  public.live_close_item(uuid, int),
  public.live_reveal_item(uuid, int),
  public.live_close_room(uuid),
  public.live_room_results(uuid)
to authenticated;
