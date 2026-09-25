# Auditoria do ContaTrilha, setembro de 2026

Escopo: conteúdo (17 trilhas, 283 lições, 1.934 exercícios), motor de exercícios, estado e sincronização,
banco de dados, PWA, acessibilidade e desempenho. Método: scripts que carregam o currículo real e testam cada
exercício, leitura do código, testes automáticos e navegação no app em tela de celular (320 a 375 px), claro e escuro.

## Achados e situação

| # | Gravidade | Achado | Onde | Situação |
|---|---|---|---|---|
| 1 | Alta | `=SE(E2<HOJE(); ...)` virava uma tag HTML e **cortava** a pergunta ("A fórmula =SE(E2") e o cartão | `fj12` | **Corrigido** (`&lt;`); teste de HTML impede novas |
| 2 | Alta | Perguntas geradas nas lições "Na prática" (resultado do episódio, caixa, fechamento do mês) dependiam do que estava na teoria. Em desafio, selo, teste final e revisão eram **impossíveis de responder**. ~70 perguntas em 18 lições | `scenarios.js` | **Corrigido**: os fatos e o balancete vão no enunciado; teste confere |
| 3 | Alta | 26 perguntas escritas como "no caso anterior", "no mesmo exemplo" ou "exercício anterior" | 10 trilhas | **Corrigido** com os dados no enunciado; teste impede novas |
| 4 | Média | **Viés de tamanho**: em 66% das múltiplas escolhas (305 de 462) a certa era a mais longa, e em 102 delas mais de 2 vezes maior. Quem escolhe a mais longa acerta sem saber | todas as trilhas (imob 85%, orçamento 84%, entrevista 79%) | **Corrigido**: ~270 alternativas reescritas. Agora 26% (o acaso é ~25%), mediana 1,05 e nenhuma passa de 1,6x. Teste permanente |
| 5 | Média | Vieses de verdadeiro/falso: 58% verdadeiro (dc 14 x 5, demo 13 x 3, excel 21 x 8) | várias | **Corrigido**: 16 afirmações trocadas; agora 53% verdadeiro. Teste permanente |
| 6 | Média | 205 de 283 lições sem `recap`: o "Leve com você" cai nos títulos dos cartões | todas menos orçamento, rotina e entrevista | **Corrigido**: as 205 lições ganharam um resumo próprio de 2 a 4 itens, escrito a partir do texto de cada lição (as dos negócios são montadas dos próprios fatos). Teste permanente |
| 7 | Baixa | 33 de 61 respostas escritas aceitam uma só forma; explicações de 3 palavras em respostas escritas | várias | Uma corrigida (FGTS); o resto na lista de melhorias |
| 8 | Baixa | Bundle principal de 738 kB e aviso do Vite de import misto em `learning.js` | build | **Corrigido**: currículo em arquivo próprio (`curriculo`, 730 kB), app em 38 kB, sem avisos |
| 9 | Baixa | Ao juntar dois aparelhos, um erro já resolvido num deles volta (a união de `mistakes` não sabe apagar) | `merge.js` | Documentado; a correção exige registrar remoções |
| 10 | Baixa | Barra inferior sem nome e sem `aria-current`; folha de confirmação sem título ligado nem armadilha de foco | `index.html`, `router.js` | **Corrigido** |

## O que estava certo

- Segurança do banco: a tabela `progress` tem RLS ligada, com políticas de leitura, inserção e atualização só da
  própria linha. `.env` está no `.gitignore` e nenhum segredo está versionado.
- Estrutura: nenhuma lição órfã, nenhuma referência quebrada, chaves de exercício únicas, glossário de 96 termos sem repetição.
- Fatos datados coerentes entre trilhas: Reforma Tributária de 2026 a 2033 (CBS 0,9% e IBS 0,1% em 2026),
  MEI de R$ 81 mil, Simples de R$ 4,8 milhões.
- **Varredura de execução**: os 2.047 exercícios (as 1.934 questões das lições e as 113 da revisão integrada)
  foram renderizados e respondidos com a própria resposta cadastrada pelos renderizadores reais, no navegador.
  Todos são resolvíveis.

## Números, antes e depois

| Medida | Antes | Depois |
|---|---|---|
| Múltipla escolha com a certa mais longa | 66% | 26% |
| Certa mais de 2x maior que as outras | 102 | 0 |
| Verdadeiro/falso: parte de verdadeiras | 58% | 53% |
| Perguntas que dependem de outra | ~96 | 0 |
| Lições com resumo próprio ("Leve com você") | 78 de 283 | 283 de 283 |
| Testes automáticos | 11 | 34 |
| Avisos do build | 2 | 0 |

## Próximas melhorias recomendadas

| Prioridade | Melhoria | Motivo |
|---|---|---|
| Média | Aceitar mais formas nas respostas escritas (33 aceitam uma só) e explicar o porquê da resposta | Menos frustração por diferença de escrita, e mais ensino no erro |
| Média | Revisão normativa por um contador e conferência periódica de fatos datados (Reforma Tributária, retenções) | O conteúdo fiscal muda |
| Baixa | Carregar o currículo por área sob demanda | Reduz o primeiro carregamento; hoje tudo vem junto por causa das conquistas e da liberação de trilhas |
| Baixa | Registrar remoções na sincronização (erros resolvidos, itens desfeitos) | A união de dois aparelhos só soma |
| Baixa | Testar em aparelhos físicos (iOS e Android): instalação, offline, teclado virtual e leitor de tela | O que foi testado foi o navegador emulado |

## Novo nesta rodada

- **Treino de revisão (halter)**: 75 treinos no caminho das 17 trilhas, hub "Trilhas de treino" em Praticar,
  revisão integrada com 113 perguntas novas que misturam lições. Ver o README.
- **Testes**: `tests/content-audit.test.js` (HTML, texto, autonomia das perguntas, estrutura por tipo, viés de tamanho,
  equilíbrio de V/F) e `tests/training.test.js` (engine do treino, revisão integrada e sincronização).
