# Auditoria do ContaTrilha, setembro de 2026

Escopo: conteúdo (17 trilhas, 283 lições, 1.934 exercícios), motor de exercícios, estado e sincronização,
banco de dados, PWA, acessibilidade e desempenho. Método: scripts que carregam o currículo real e testam cada
exercício, leitura do código, testes automáticos e navegação no app em tela de celular (320 a 375 px), claro e escuro.

## Achados e situação

| # | Gravidade | Achado | Onde | Situação |
|---|---|---|---|---|
| 1 | Alta | `=SE(E2<HOJE(); ...)` virava uma tag HTML e **cortava** a pergunta ("A fórmula =SE(E2") e o cartão | `fj12` | Corrigido (`&lt;`) e protegido por teste |
| 2 | Alta | Perguntas geradas nas lições "Na prática" (resultado do episódio, caixa, fechamento do mês) dependiam do que estava na teoria. Em desafio, selo, teste final e revisão eram **impossíveis de responder**. ~70 perguntas em 18 lições | `scenarios.js` | Corrigido: os fatos e o balancete vão no enunciado; o teste confere |
| 3 | Alta | 26 perguntas escritas como "no caso anterior", "no mesmo exemplo" ou "exercício anterior" | `antes`, `lanc`, `estoq`, `imob`, `cust`, `trib`, `demo`, `digital`, `car_excel` | Corrigidas com os dados; o teste impede novas |
| 4 | Média | Viés de tamanho: em **66% das múltiplas escolhas (305 de 462) a certa é a mais longa**, e em 102 delas por mais de 2 vezes. Quem escolhe a mais longa acerta sem saber | todas as trilhas, pior em `imob` (85%), `car_orcamento` (84%), `car_entrevista` (79%) | Ver "Estado atual" abaixo |
| 5 | Média | Vieses de verdadeiro/falso: 58% verdadeiro (dc 14 x 5, demo 13 x 3, excel 21 x 8) | várias | Ver "Estado atual" |
| 6 | Média | 205 de 283 lições sem `recap`: o "Leve com você" cai nos títulos dos cartões | todas menos orçamento, rotina e entrevista | Ver "Estado atual" |
| 7 | Baixa | 33 de 61 respostas escritas aceitam uma só forma; explicações de 3 palavras em respostas escritas | várias | Uma corrigida (FGTS); resto na lista de melhorias |
| 8 | Baixa | O bundle principal tem 738 kB (todo o currículo carrega junto) e o Vite avisa de import misto em `learning.js` | build | Recomendação abaixo |
| 9 | Baixa | Ao juntar dois aparelhos, um erro já resolvido num deles volta (a união de `mistakes` não sabe apagar) | `merge.js` | Documentado; a correção exige registrar remoções |
| 10 | Baixa | Barra inferior sem `aria-current`; folha de confirmação sem armadilha de foco | `index.html`, `router.js` | Ver "Estado atual" |

## O que estava certo

- Segurança do banco: a tabela `progress` tem RLS ligada, com políticas de leitura, inserção e atualização só da
  própria linha. `.env` está no `.gitignore` e nenhum segredo está versionado.
- Estrutura: nenhuma lição órfã, nenhuma referência quebrada, chaves de exercício únicas, glossário de 96 termos sem repetição.
- Fatos datados coerentes entre trilhas: Reforma Tributária de 2026 a 2033 (CBS 0,9% e IBS 0,1% em 2026),
  MEI de R$ 81 mil, Simples de R$ 4,8 milhões.
- Ficam de fora desta auditoria: revisão normativa linha a linha por um contador e teste em aparelhos físicos.

## Estado atual

Atualizado no fim da rodada. Números medidos pelo mesmo script antes e depois.

(preenchido ao final)

## Novo nesta rodada

- **Treino de revisão (halter)**: 75 treinos no caminho das 17 trilhas, hub "Trilhas de treino" em Praticar,
  revisão integrada com 100+ perguntas novas que misturam lições. Ver o README.
- **Testes**: de 11 para mais de 30, incluindo `tests/content-audit.test.js` e `tests/training.test.js`.
