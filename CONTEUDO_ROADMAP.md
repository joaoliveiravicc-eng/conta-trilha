# Roadmap de conteúdo

Registro do que veio de um briefing externo (pacote "ContaCastor", recebido
em 2026-09-23) e o que foi feito com ele, para quem for continuar o currículo.

## O que o briefing trazia

Um plano curricular de 16 trilhas / 111 unidades (T00–T15) e um documento de
design de telas/experiência. O próprio pacote avisa: é uma **especificação**,
não indica que algo já foi implementado, e conteúdo de tributos/folha/normas
precisa de fonte oficial e revisão antes de publicar — não é para copiar
número de imposto ou tabela de INSS/FGTS de lá.

## O que já existia e foi descartado (não precisou refazer)

Quase todo o documento de design já está implementado neste projeto: mapa
vertical com estados bloqueado/disponível/concluído (`src/ui/screens/path.js`),
motivo do bloqueio explicado por texto (não só cor), tela de aula com
teoria+exercício+barra de progresso, tela de feedback com explicação e nova
tentativa, revisão personalizada dos erros (`practice.js`), glossário
pesquisável, "laboratório" com lançamentos/razonete/balancete/DRE/Balanço
(os 3 estudos de caso em `src/ui/screens/cases.js`), perfil com conquistas e
configurações, mascote com identidade própria (Bento, proporções e cauda
constantes, dois dentes — `src/ui/components/bento.js`), continuar de onde
parou, persistência de progresso. Os 9 nomes de trilha do briefing também já
mapeavam quase 1:1 para as trilhas que já existiam aqui.

## O que foi aproveitado

- **`src/content/trilhas/estoq.js`** (trilha "Estoques e Custo de
  Mercadorias", 5 lições): não existia neste projeto — o briefing tinha uma
  trilha T07 dedicada a estoques/CMV que a gente só tocava de raspão em
  `lanc1`. Conteúdo evergreen (PEPS, custo médio, fórmula do CMV, perdas),
  sem números de lei ou tabela que mudam com o tempo, então seguro de
  escrever sem revisão especializada. Verificado lição por lição no
  navegador, incluindo os cálculos de PEPS/custo médio.

## Atualização 2026-09-23: expansão "estilo Duolingo" (mais lições por trilha)

O usuário pediu para aumentar a quantidade de lições por curso, no espírito do
Duolingo (mais unidades curtas por trilha). Foram adicionadas 18 lições novas
distribuídas pelas 10 trilhas já existentes, mais uma trilha nova completa:

- **`src/content/trilhas/imob.js`** (trilha "Imobilizado e Intangíveis", 5
  lições: `imob1`–`imob5`) — é exatamente a ideia nº 1 abaixo, agora
  implementada. Aprofunda `lanc4` com métodos de depreciação (linear, soma
  dos dígitos, unidades produzidas), baixa/venda de bens, ativos intangíveis
  (goodwill, critérios de reconhecimento) e valor recuperável (impairment).
  Registrada em `rawCourses` (não `newLessons`) em `src/content/index.js`,
  porque exporta `{id,title,icon,color,desc,lessons}` como `base.js`/`dc.js`.
- Lições novas nas trilhas existentes, todas com conteúdo evergreen (sem
  data de vigência ou alíquota que muda com o tempo): `antes9`-`antes10`
  (variação percentual, médias), `base6` (competência x caixa aprofundado),
  `dc6` (encerramento das contas de resultado / ARE), `lanc8`-`lanc9`
  (devoluções e abatimentos, provisão para devedores duvidosos), `estoq6`
  (estoque na indústria: MP/PE/PA), `demo6` (ciclo operacional e
  financeiro), `cust5`-`cust6` (custeio por absorção x variável, formação
  de preço/mark-up), `aud6` (fraude x erro), `vida4` (renda fixa x
  variável, diversificação — sem citar produtos ou taxas específicas).
- **`trib4`** (elisão x evasão fiscal) foi a única adição à trilha de
  tributos, e é deliberadamente livre de números/datas regulatórias (é só o
  critério lícito x ilícito) — para não esbarrar no aviso do item 5 abaixo.
- Total: **68 lições em 11 trilhas** (era 50 em 10). Cada lição nova foi
  verificada estruturalmente (script no console checando índices de resposta,
  contas de lançamento, etc. — zero problemas) e pelo menos uma (`imob1`) foi
  jogada ponta a ponta no navegador, testando os tipos `mc`, `num`, `class`,
  `tf` e `entry`.

## Ideias para trilhas futuras (do briefing, ainda não escritas)

Sequência sugerida por menor risco regulatório primeiro (item 1 já foi
escrito, ver seção acima):

1. ~~**Ativo Imobilizado e Intangíveis** (inspirado em T13)~~ — feito,
   ver `imob.js` acima.
2. **Análise das Demonstrações** (T11): `demo4`/`demo6` já cobrem bastante
   (liquidez, endividamento, rentabilidade, análise vertical/horizontal,
   ciclo operacional/financeiro); ainda dava pra virar trilha própria se
   quiser mais profundidade (ex: análise de fluxo de caixa livre).
3. **Contabilidade Gerencial** (T12): `cust4`-`cust6` já aprofundaram
   orçamento, custeio por absorção x variável e formação de preço; resta
   principalmente análise custo-volume-lucro mais avançada (alavancagem
   operacional).
4. **Departamento Pessoal** (T10): férias/13º já aparecem em `lanc7`, mas
   uma folha de pagamento completa (admissão, rescisão) esbarra em
   percentuais de INSS/FGTS que mudam — **precisa de fonte oficial e data
   de vigência antes de escrever**, como o briefing avisa.
5. **Tributária expandida** (T09): `trib` tem 4 lições (a 4ª, elisão x
   evasão, é evergreen); Simples Nacional, Lucro Presumido/Real e retenções
   em mais detalhe são regulatórios de verdade — mesma ressalva do item
   anterior.

O briefing completo (`trilhas.json`, `DESIGN_E_TELAS.md`, etc.) não foi
copiado para o repositório — só esta síntese. Peça ao usuário se precisar
consultar os arquivos originais de novo.
