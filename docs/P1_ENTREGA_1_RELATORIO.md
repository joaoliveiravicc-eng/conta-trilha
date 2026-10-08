# ContaTrilha Live — P1, entrega 1: relatório técnico

**Data:** 08/10/2026 · **Branch:** `claude/new-session-6d8k1d` (sem PR, sem merge) · **Base:** `master` `051fa4f`
**Estado:** desenvolvimento local concluído; **parado aguardando sua autorização**.
Nada foi aplicado em Supabase, Vercel ou produção. Os projetos Perenne e BPO não foram tocados.

## 1. O que foi entregue (resposta aos 7 itens da primeira entrega)

| # | Pedido | Resultado |
|---|---|---|
| 1 | Confirmar ambiente local | PostgreSQL 16.15 nativo e isolado (127.0.0.1:54329). Docker: o daemon sobe, mas o download das imagens do Supabase falha na rede deste ambiente; a Supabase CLI (2.120.0, via npx) existe, mas depende de Docker. Por isso o ambiente é **PostgreSQL + shim do Supabase** (`supabase/dev/`). |
| 2 | Tabelas e políticas | `supabase/migrations/0002_live_rooms.sql` (seção 3). **Não aplicada em nenhum projeto remoto.** |
| 3 | Protótipo de correção protegida | Função SQL `live_submit_answer` + `live_grade`; projeção JS `src/live/projection.js` (seção 4). Tipos: `mc`, `tf`, `num`. |
| 4 | Aluno não acessa respostas privadas | Provado por 12 testes de segurança (seção 5), mais 7 mutações que quebram a segurança de propósito e são detectadas. |
| 5 | Duplicidade, concorrência, expiração, reconexão | 13 testes de fluxo, incluindo 40 envios simultâneos, corrida entre fechamento e envio, relógio do servidor e reentrada. |
| 6 | Progresso atual intacto | Tabela `progress`, políticas, privilégios e dados idênticos antes/depois da `0002` (hash); nenhum arquivo de `src/content`, `src/engine`, `src/ui`, `main.js` mudou; pacote do app idêntico (seção 7). |
| 7 | Demonstração local | `npm run live:demo`; transcrição em `docs/P1_ENTREGA_1_DEMO.txt`. 1 professora e 5 alunos fictícios, 6 questões reais de "Primeiros Passos"/"Débito e Crédito". |

## 2. Arquitetura implementada

- **Toda escrita passa por funções `security definer`** com `search_path` fixo. `authenticated` só tem `SELECT` e sob RLS; `anon` não tem nada.
- **Papel de professor** = linha em `live_teacher_grants`, que só quem administra o banco insere. Nada vem de JWT/`user_metadata`; ninguém se promove.
- **Enunciado e gabarito em tabelas separadas.** O aluno recebe o enunciado pela função `live_room_snapshot` somente quando a questão deixa de estar pendente, e o gabarito só após a revelação (ou após o próprio envio, se o professor escolheu feedback imediato).
- **Estado da sala no banco.** O snapshot é a fonte da verdade para reentrada. O Realtime ainda não foi usado; quando entrar, só avisará "mudou, busque de novo".
- **Relógio do servidor** decide prazos (`clock_timestamp()`); o do aluno não importa.
- **Classificação (correção obrigatória 1).** `kind = 'formative'` é o único aceito. `'protected'` existe como valor reservado e é recusado (`protected_not_enabled`) ao criar atividade e sala. Toda atividade grava `official_grade: false` e `ranking: false`, e o resultado devolve `official_grade: false`. Como o catálogo inteiro está no JavaScript público do app, **esta entrega não promete sigilo nem nota oficial.** Uma avaliação protegida exigirá questões e gabaritos que nunca estejam no pacote público.
- **Lançamentos (correção obrigatória 2).** O tipo `entry` **não faz parte desta entrega** e o código o recusa. Nenhuma tela ou texto deve apresentá-lo como validação de Diário, Razão, valores, DRE ou balancete; isso é da P2.
- **Turmas/instituições (D7).** Sem matrícula. Atividades e salas são ligadas a `owner_id`/`host_id` genéricos, sem suposição de professor único, então `org_id` ou turmas podem entrar depois sem refazer o modelo.

## 3. Tabelas, políticas e funções

| Tabela | Leitura pela API (RLS) | Escrita |
|---|---|---|
| `live_teacher_grants` | ninguém | só administrador do banco |
| `live_activities` | dono | `live_create_activity` |
| `live_activity_items` (enunciado) | dono | idem |
| `live_activity_item_keys` (gabarito) | **só dono** | idem |
| `live_rooms`, `live_room_items` | anfitrião | funções do anfitrião |
| `live_room_members` | a própria linha; anfitrião vê todas | `live_join_room` |
| `live_answers` | **só anfitrião** | `live_submit_answer` |
| `live_join_attempts` | ninguém | `live_join_room` |
| `live_audit_events` | o próprio autor | funções internas |

API (`authenticated`): `live_is_teacher`, `live_create_activity`, `live_create_room`, `live_join_room`, `live_room_snapshot`, `live_submit_answer`, `live_start_room`, `live_open_item`, `live_extend_item`, `live_close_item`, `live_reveal_item`, `live_close_room`, `live_room_results`. As funções internas (`live_grade`, `live_validate_item`, `live_payload_ok`, `live_gen_code`, `live_audit`, `live__*`) não são executáveis por `anon` nem `authenticated` (testado).

**Regras de sala (D5):** código de 6 símbolos (alfabeto de 32, sem I/O, gerador criptográfico), único enquanto a sala está ativa (índice parcial), expira com a sala (TTL de 5 min a 24 h), erro único para código inexistente/vencido/encerrado, no máximo 8 falhas por usuário em 10 min (as falhas ficam registradas porque a função **devolve** o erro em vez de levantar exceção que desfaria o registro), entrada confirmada pelo servidor e idempotente, lotação máxima configurável (até 60), no máximo 5 salas abertas por professor.

**Envio de resposta:** uma resposta por aluno e questão; a primeira vence. Mesmo `nonce` → `replayed` (mesmo resultado); outro `nonce` → `already_answered` (nada é sobrescrito). Reenvio de algo já gravado é respondido mesmo após o fechamento, para o caso de a confirmação se perder na rede. O fechamento da questão e o envio são serializados por lock de linha.

## 4. Correção protegida e contrato dos exercícios

`src/live/projection.js` converte um exercício do catálogo em `{ public, key, explanation }`:

- `mc`: alternativas embaralhadas; o gabarito é o índice na ordem publicada. Alternativas repetidas são recusadas.
- `tf`: gabarito booleano.
- `num`: o gabarito leva `answer` e `tol` **já resolvidos** (tolerância do app: `0,015 + |a|·0,002`, ou a `tol` do exercício). O SQL só compara; não repete regra.
- Dicas e explicações nunca vão no enunciado. Dicas não são suportadas nesta entrega.

**Equivalência (D4).** `src/live/reference-grader.js` copia as expressões de correção do app; um teste falha se o renderizador mudar (alarme de deriva; verifiquei que o PR #2 não as altera). O teste compara `live_grade` com esse corretor em **12.794 casos** gerados dos 1.350 exercícios `mc/tf/num` do catálogo (inclui bordas da tolerância ±tol, ±tol·(1+1e-9)): **0 divergências**. O SQL usa `float8` (IEEE 754), como o `Number` do JS. Também confirmei que o servidor aceita todo o catálogo projetado. Não há motor contábil duplicado; a reavaliação por código compartilhado só se justificará quando entrarem tipos mais complexos.

## 5. Testes aprovados

| Suíte | Resultado |
|---|---|
| `npm test` (app + projeção sem banco) | **43/43** (eram 34; +9 novos) |
| `npm run test:live` (banco local) | **29/29** — segurança 12, fluxo 13, equivalência 2, progresso 2 |
| `npm run build` | passa; 23 arquivos / 1.064,24 KiB, igual ao `master` |

**Segurança (12):** SELECT direto em gabarito/itens/salas/respostas devolve 0 linhas; snapshot do aluno sem `answer/tol/explanation`/respostas de colegas; gabarito só após revelação; feedback imediato só para quem já enviou; estranhos e professor de outra sala barrados; professor B não controla nem lê a sala do A; sem concessão não há professor, revogar tira o controle; nenhuma escrita direta (insert/update/delete negados) para aluno e professor; `anon` sem acesso; meta-teste (toda tabela com RLS, privilégios mínimos, funções internas inacessíveis, `search_path` fixo); atividade `protected`, chaves extras e tipos fora do escopo recusados.

**Fluxo (13):** ciclo completo com auditoria; duplicidade por nonce; 40 envios simultâneos do mesmo aluno → exatamente 1 aceito; 20 alunos × 3 reenvios → 20 respostas; 25 alunos enviando enquanto o professor fecha (≈ metade aceita, metade recusada em cada rodada, nenhuma gravada após o fechamento); expiração por tempo (espera real de 5 s), extensão, sala vencida; reconexão e reenvio após fechamento; ritmo do aluno; código (normalização, bloqueio por tentativas, sala cheia, unicidade); 3.000 códigos sem colisão e distribuição uniforme; payloads malformados; remoção de conta em cascata (LGPD); lock determinístico do fechamento.

**Os testes têm dentes.** Mutei a migration de 7 formas e todas foram detectadas: política do gabarito aberta; execução pública das funções; snapshot vazando gabarito; resposta sobrescrevendo; aluno lendo respostas; join levantando exceção; e a remoção do `FOR SHARE`. Esta última **passou despercebida na primeira versão**, pois a janela da corrida é de microssegundos; por isso acrescentei o teste determinístico do lock.

## 6. Demonstração

`npm run live:demo` (transcrição em `docs/P1_ENTREGA_1_DEMO.txt`): cria a atividade com 6 questões reais; abre a sala (código gerado); cinco alunos entram (um digita em minúsculas e com hífen); lobby (professora vê nomes, aluno só a contagem); uma questão por vez; Diego perde a confirmação e reenvia (`accepted/replayed`, uma só gravada); Elisa tenta responder depois do fechamento (`item_not_open`); Bruno tenta ler respostas, gabaritos e inserir direto (0 linhas / `permission denied`); intruso pede o snapshot (`not_member`); Diego "troca de aparelho" e recupera suas 6 respostas; resultado agregado com distribuição de alternativas e `official_grade: false`; conferência no banco (29 respostas, 21 corretas, nenhuma duplicada); trilha de auditoria.

## 7. Impacto no aplicativo existente

- **Nenhuma alteração** em `src/content`, `src/engine`, `src/ui`, `main.js`, `index.html`, `vite.config.js`. XP, corações, streak, merge e sync: intactos.
- `src/live/*` é código novo que **ninguém importa ainda**: o pacote publicado do app é byte a byte do mesmo tamanho (23 entradas, 1.064,24 KiB). Um teste impede esse código de importar estado, armazenamento, merge ou sync, ou de usar `localStorage`.
- `package.json`: +1 devDependency (`pg`, só para os testes e a demo) e 3 scripts (`live:db`, `test:live`, `live:demo`). Sem custo, sem serviço novo, sem GitHub Actions.
- `public.progress`: comprovadamente inalterada pela `0002`, e o upsert/leitura da própria linha segue funcionando e isolado entre usuários.

## 8. Limitações conhecidas e pontos de atenção

1. **Não foi testado em um Supabase real.** O ambiente local usa PostgreSQL 16 (a produção é 17) e um shim; não há PostgREST, GoTrue nem Realtime. As regras de RLS e as funções estão provadas no nível do SQL. **Antes de qualquer produção é preciso repetir a bateria** num Supabase local com Docker ou num projeto de desenvolvimento (D6).
2. **Risco de aplicação acidental:** a `0002` está em `supabase/migrations/`. Se o projeto real tiver a integração GitHub do Supabase com aplicação automática de migrations, **um merge na `master` a aplicaria**. Não fazer merge sem decidir isso. (D2 ainda pendente: não consegui identificar o projeto `conta-trilha`; não fiz nenhuma consulta remota.)
3. **Tolerância numérica herdada do app é generosa** (±0,2% do valor): num exercício de R$ 1.000.000 aceita ±R$ 2.000. Para o Live recomendo `tol` explícita nas questões numéricas escolhidas.
4. **Enunciados contêm HTML do catálogo.** A interface do Live terá de renderizá-los com lista de tags permitidas (nunca `innerHTML` cru), porque o servidor armazena texto fornecido pelo professor sem sanitizá-lo.
5. **Adivinhação de código:** o limite é por usuário (8 falhas/10 min). Quem criar muitas contas pode tentar mais; o espaço é ~10⁹ e a sala dura horas. O que um intruso obtém é entrar no lobby de uma atividade formativa cujo conteúdo é público; **nunca** gabarito. Rate limit por IP/conta precisaria de camada fora do banco.
6. **Dados pessoais:** o professor vê nome de exibição e respostas individuais da própria sala (necessário para apoiar alunos). Sem e-mails nas respostas da API. Falta política de retenção/limpeza de salas e respostas antigas (apagar a conta já apaga os dados em cascata).
7. **Concorrência foi exercitada com até 40 conexões locais**, não com o pooler do Supabase nem com 20–30 aparelhos reais; latência e custo do snapshot sob polling não foram medidos.
8. **Uma resposta por questão** (sem nova tentativa) e feedback imediato permite que um aluno repasse o gabarito a outro: aceitável em atividade formativa, inadequado para avaliação.
9. **Concessão de professor** é manual, via SQL. Professor revogado perde o controle, mas continua lendo os dados antigos da própria atividade.
10. **Ainda não existe:** interface do Live, rotas e `vercel.json` (D3), Realtime, tipos além de `mc/tf/num`, acessibilidade da UI, benchmark de carga. O conteúdo-piloto (Contabilidade Introdutória) **não é pedagogicamente homologado**; falta o professor definido (D8).

## 9. Próxima etapa recomendada (aguardando sua autorização)

1. Repetir a bateria completa num Supabase real de **desenvolvimento** (CLI+Docker onde houver, ou projeto gratuito separado), e só então rever a `0002`. Identificar o projeto `conta-trilha` para a auditoria de leitura (D2).
2. Revisão da `0002` por você (ou por quem você indicar) antes de qualquer aplicação.
3. Com o contrato validado, expandir para `fill`, `class`, `match` e `ord`, um tipo por vez, com os mesmos testes de equivalência.
4. Só depois a interface (professor em desktop, aluno em celular) com `vercel.json` + rotas mínimas, renderização segura de HTML e teste de acessibilidade, e então o teste de carga com 20–30 usuários.

Reconciliação com o PR #2 (D1-B): nada dele foi tocado. Os pontos de contato futuros são `quiz.js`/`quiz-renderers.js` (adaptador do modo captura) e, se o PR for integrado, a camada de "IA" não será usada para correção do Live.
