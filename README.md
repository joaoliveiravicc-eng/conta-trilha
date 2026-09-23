# ContaTrilha

**Ao vivo:** [conta-trilha.vercel.app](https://conta-trilha.vercel.app) — instalável
como app (PWA) no celular ou no computador direto pelo navegador.

App no estilo Duolingo para aprender Contabilidade do zero, em português. 10 trilhas,
50 lições, motor de exercícios com ~10 tipos de questão, gamificação (XP, moedas,
corações, sequência, níveis, badges, missões diárias), 3 estudos de caso completos e
um glossário de termos contábeis. Mascote: Bento, o castor contador.

## Rodando localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`. `npm run build` gera a versão de produção em `dist/`.

## Estrutura do projeto

```
src/
  content/     Só dados: as 9 trilhas (src/content/trilhas/*.js), glossário, casos
               práticos, dicas, badges, missões, itens da loja, plano de contas.
               Nenhum arquivo aqui deveria importar do engine/ ou do ui/ (exceto os
               helpers de renderização de texto em content/render-helpers.js e as
               funções-fábrica de exercício em engine/exercises/factories.js).
  engine/      Lógica sem conteúdo hardcoded: estado do jogador (state.js),
               persistência (storage.js + sync-supabase.js), gamificação
               (gamification.js) e o corretor de exercícios (exercises/grading.js).
  ui/          Telas e componentes: cada tela em ui/screens/, componentes reusáveis
               (mascote, som, toast, confete) em ui/components/, roteamento e topbar
               em ui/router.js.
  main.js      Ponto de entrada: liga os eventos globais e inicializa o app.
supabase/      Migration SQL da tabela de progresso (ver "Sync com Supabase" abaixo).
```

### Como adicionar ou editar uma lição

1. Ache a trilha em `src/content/trilhas/<id>.js` (ids: `antes`, `base`, `dc`, `lanc`,
   `demo`, `cust`, `trib`, `aud`) ou `vida.js` para "Contabilidade para a Vida".
2. Cada lição é um objeto `{ id, title, icon, learn:[...], ex:[...] }`. `learn` são os
   cartões de teoria (use os helpers `T`, `box`, `eq`, `tbl`, `lanc`, `ul`, `ol` de
   `content/render-helpers.js` para formatar). `ex` são os exercícios — use as
   funções-fábrica de `engine/exercises/factories.js` (`mc`, `tf`, `fl`, `mt`, `en`,
   `cl`, `nu`, `wr`, `ew`, `od`, `ep`, `ts`), documentadas ali mesmo.
3. Para adicionar uma lição totalmente nova a uma trilha, dá pra colocá-la direto no
   array `lessons` do arquivo da trilha (trilhas `base` a `aud`), ou seguir o padrão
   de `antes.js`/`vida.js` e depois referenciar o id da lição em `src/content/layout.js`
   (array `LAYOUT`, dentro de `units`).
4. Bônus de exercícios para uma lição já existente vão em `src/content/extra.js`.

Nenhuma mudança de conteúdo deveria exigir tocar em `engine/` ou `ui/`.

## Sync com Supabase

Já está configurado (projeto `conta-trilha` na conta Supabase de
joaovitor.s.oliveira@hotmail.com, org "ContaTrilha") e com as chaves
carregadas no Vercel (Production e Preview). Sem login, o app funciona
100% só com `localStorage`, igual ao app original.

Para rodar localmente com sync, ou para apontar pra outro projeto Supabase:

1. Crie um projeto no [Supabase](https://supabase.com) e rode a migration em
   `supabase/migrations/0001_progress.sql` (cria a tabela `progress` com RLS).
2. Copie `.env.example` para `.env` e preencha `VITE_SUPABASE_URL` e
   `VITE_SUPABASE_ANON_KEY` (Project Settings → API no painel do Supabase).
3. Habilite o provedor de e-mail (magic link) em Authentication → Providers.

Sem essas variáveis configuradas, `src/engine/sync-supabase.js` vira no-op e o app
funciona normalmente só com `localStorage`.

## Publicando

Deploy automático: todo push em `master` no [repositório no
GitHub](https://github.com/joaoliveiravicc-eng/conta-trilha) gera um novo deploy em
produção no Vercel (projeto `conta-trilha`, conta `joao`).

`npm run build` gera o site estático em `dist/` caso queira publicar em outro lugar
(Netlify, GitHub Pages, qualquer host de arquivos estáticos).
