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

## Ideias para trilhas futuras (do briefing, ainda não escritas)

Nada abaixo foi implementado — são só ideias mapeadas para a estrutura deste
projeto, para quando fizer sentido escrever mais conteúdo. Sequência sugerida
por menor risco regulatório primeiro:

1. **Ativo Imobilizado e Intangíveis** (inspirado em T13): aprofundar
   `lanc4` (hoje só tem depreciação básica) com métodos de depreciação,
   amortização, baixa de bens, avaliação — evergreen, baixo risco.
2. **Análise das Demonstrações** (T11): `demo4`/`demo5` já tocam em
   liquidez/análise horizontal; dava pra virar trilha própria com mais
   indicadores (rentabilidade, endividamento, geração de caixa).
3. **Contabilidade Gerencial** (T12): `cust4` já tem orçamento básico;
   dava pra aprofundar formação de preço, análise custo-volume-lucro.
4. **Departamento Pessoal** (T10): férias/13º já aparecem em `lanc7`, mas
   uma folha de pagamento completa (admissão, rescisão) esbarra em
   percentuais de INSS/FGTS que mudam — **precisa de fonte oficial e data
   de vigência antes de escrever**, como o briefing avisa.
5. **Tributária expandida** (T09): `trib` hoje tem 3 lições; Simples
   Nacional, Lucro Presumido/Real e retenções são regulatórios de verdade —
   mesma ressalva do item anterior.

O briefing completo (`trilhas.json`, `DESIGN_E_TELAS.md`, etc.) não foi
copiado para o repositório — só esta síntese. Peça ao usuário se precisar
consultar os arquivos originais de novo.
