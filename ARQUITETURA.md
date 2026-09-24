# Estrutura do ContaTrilha

## Onde cada parte mora

| Pasta/arquivo | Responsabilidade |
|---|---|
| `src/content/areas.js` | Nomes, descrições e ordem de trilhas de cada área. É o catálogo leve do seletor. |
| `src/content/layout.js` | Ordem das lições dentro das unidades e apresentação das trilhas. |
| `src/content/trilhas/*.js` | Explicações e exercícios de cada matéria. A trilha digital está em `digital.js`. |
| `src/content/workshops.js` | Oficinas complementares e objetivos. Oficinas são opcionais para a conclusão. |
| `src/content/index.js` | Monta o currículo, atribui índices e cria o índice de exercícios para revisão. |
| `src/engine/state.js` | Progresso, área ativa, desbloqueio, XP e sequência. IDs de lição são as chaves duráveis do progresso. |
| `src/engine/storage.js` | Salvamento local e envio opcional da cópia para a nuvem. |
| `src/engine/sync-supabase.js` | Login e sincronização. O SDK é importado dinamicamente quando configurado. |
| `src/ui/screens/*.js` | Telas e suas interações. Telas secundárias e quiz são importados por demanda. |
| `src/ui/router.js` | Ativação de tela, barra superior, missões e modais. |
| `src/main.js` | Inicialização, navegação global, carregamento das telas e registro do PWA. |
| `src/styles/main.css`, `learning.css` | Identidade visual, layout responsivo e componentes de aprendizagem. |

## Como acrescentar uma área

1. Cadastre um `id` estável, texto e `courseIds` em `src/content/areas.js`.
2. Crie as trilhas e lições em `src/content/trilhas/`.
3. Importe as lições em `src/content/index.js` e descreva sua ordem em `src/content/layout.js`.
4. Defina objetivos em `src/content/workshops.js`. Cada `courseId` usado por uma trilha precisa ter objetivos.
5. Confira o percurso na entrada, no seletor, na página inicial, nos desafios e na prática da área.

## Como acrescentar lições sem perder progresso

- Use um `id` de lição novo e permanente. Não reutilize IDs antigos nem renomeie IDs já publicados.
- Inclua a lição em uma unidade do `LAYOUT` e no arquivo da trilha correspondente.
- Descreva objetivo, explicação, exemplo, exercícios e feedback; evite uma lista de perguntas sem ensino.
- Para temas normativos, cite a fonte oficial e identifique hipóteses simplificadas no exemplo.
- Mantenha oficinas novas como opcionais se forem acrescentadas a uma trilha que alunos já concluíram.

## Carregamento e PWA

A tela inicial e o índice do currículo são carregados na entrada. Loja, perfil, prática, glossário, entrada e motor de quiz chegam quando a pessoa os abre. O SDK do Supabase fica em arquivo separado. O service worker inclui os arquivos gerados no precache para estudo depois do primeiro carregamento conectado. Login e sincronização requerem rede.

O próximo passo de desempenho é dividir o próprio catálogo de conteúdo por área. Isso exige retirar a dependência síncrona de `COURSES` em `state.js` e carregar cada currículo com um índice leve de IDs; deve ser feito junto com uma migração cuidadosa do progresso salvo.
