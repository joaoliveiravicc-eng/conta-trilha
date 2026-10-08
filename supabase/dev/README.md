# Desenvolvimento local do ContaTrilha Live

Nada aqui é aplicado em produção. `00_supabase_shim.sql` só existe para testar num PostgreSQL comum
o que o Supabase já fornece (papéis `anon`/`authenticated`, `auth.uid()`, privilégios padrão).

```bash
# 1. Um PostgreSQL local (qualquer 15+), em 127.0.0.1:54329 por padrão (LIVE_PGHOST/PORT/USER/DATABASE mudam isso).
#    Os scripts RECUSAM host que não seja local e banco cujo nome não termine em _test, _dev ou _demo.
# 2. Recriar o banco de testes (shim + 0001 + 0002):
npm run live:db
# 3. Testes do app (sem banco) e do Live (com banco):
npm test
npm run test:live
# 4. Demonstração com 1 professora e 5 alunos fictícios:
npm run live:demo
```

Limite conhecido: isto não sobe GoTrue, PostgREST nem Realtime. As regras de RLS e as funções são provadas no
nível do SQL; falta repetir a bateria num Supabase real (CLI com Docker ou projeto de desenvolvimento) antes de produção.
