# ContaTrilha: atualização de aprendizagem

## Conteúdo

O currículo agora tem **5 áreas**, **12 trilhas** e **97 lições**: 85 essenciais e 12 oficinas complementares. Os 45 desafios de etapa combinam questões do banco das respectivas lições; não são 45 lições adicionais.

A nova trilha **Rotina Contábil Digital** tem seis lições essenciais: documento eletrônico, regras no ERP, conciliação bancária, cadastro de arrendamento, fechamento/ECD e controles de acesso. Cada lição alterna explicação, exemplo, conferência rápida e exercícios.

| Trilha | Oficina nova |
| --- | --- |
| Antes de Tudo | Descontos que enganam |
| Primeiros Passos | Uma empresa com lucro e pouco caixa |
| Débito e Crédito | Detetive dos lançamentos |
| Lançamentos do Dia a Dia | Fechamento e conciliação do banco |
| Imobilizado e Intangíveis | Quanto custa usar uma máquina? |
| Imobilizado e Intangíveis | Leasing no ERP: do contrato aos lançamentos |
| Estoques e Custo de Mercadorias | Inventário: faltou mercadoria |
| Demonstrações Financeiras | Leia os números e faça perguntas |
| Custos e Gerencial | Pedido extra: vale a pena? |
| Tributos no Brasil | Conferência de uma apuração |
| Auditoria | Que evidência responde à pergunta? |
| Contabilidade para a Vida | Um orçamento que enxerga o ano |

## Como funciona

- As trilhas apresentam objetivos, estimativa de tempo e etapas que podem ser abertas individualmente.
- Cada área tem sua própria sequência de trilhas. A escolha aparece na entrada e pode ser trocada pelo topo ou perfil; o progresso de cada lição permanece salvo. XP e sequência diária são compartilhados.
- As oficinas seguem exemplo, tentativa breve, explicação, resumo e exercícios.
- Lições e desafios permitem errar e tentar novamente sem esgotar corações. O teste final continua com três corações.
- O selo de etapa exige pelo menos 80% de acertos na primeira tentativa e sem dicas. Com seis perguntas, são necessários cinco acertos. O resultado sugere as lições a retomar.
- A revisão diária reúne até três lições vencidas, com duas perguntas de cada. Lições concluídas anteriormente entram na fila mesmo sem histórico de revisão.
- Os intervalos são de 1, 3, 7, 14 e 30 dias. Erros ou dicas reiniciam o intervalo; acertos em revisões previstas o ampliam. Praticar antecipadamente não acelera a agenda. Esses intervalos são uma escolha inicial de produto, não uma fórmula cientificamente validada para este público.
- Oficinas e desafios não bloqueiam as próximas trilhas nem os testes finais. Os identificadores das lições antigas foram preservados.

## Referências usadas

- [IES — Organizing Instruction and Study to Improve Student Learning](https://ies.ed.gov/ncee/wwc/PracticeGuide/1): exemplos resolvidos alternados com problemas, recuperação ativa e distribuição do estudo no tempo.
- [IFRS — IAS 2 Inventories](https://www.ifrs.org/issued-standards/list-of-standards/ias-2-inventories/): custo e valor realizável líquido na oficina de estoques.
- [IFRS — IAS 16 Property, Plant and Equipment](https://www.ifrs.org/issued-standards/list-of-standards/ias-16-property-plant-and-equipment/): custos diretamente atribuíveis ao ativo.
- [CPC 00 (R2) — Estrutura Conceitual](https://www.cpc.org.br/CPC/Documentos-Emitidos/Pronunciamentos/Pronunciamento?Id=80): referência conceitual contábil.
- [CPC 06 (R2) — Arrendamentos](https://www.cpc.org.br/CPC/Documentos-Emitidos/Pronunciamentos/Pronunciamento?Id=37): ativo de direito de uso, passivo e mensuração subsequente nos exemplos de leasing.
- [SPED — O que é a ECD](https://sped.rfb.gov.br/pagina/show/499): definição e escopo da escrituração contábil digital.

Os casos são didáticos e simplificados. A oficina tributária usa uma alíquota expressamente fictícia; não é um simulador de apuração real. Esta atualização não constitui revisão normativa completa de todas as lições antigas.

## Arquivos principais

- `src/content/workshops.js`: conteúdo novo e objetivos das trilhas.
- `src/content/areas.js`: áreas e ordem das trilhas; `src/content/trilhas/digital.js`: seis lições da área digital.
- `src/engine/learning.js`: seleção dos desafios e agenda de revisão.
- `src/ui/screens/path.js`: mapa das trilhas.
- `src/ui/screens/learn.js`: leitura guiada e perguntas rápidas.
- `src/ui/screens/quiz.js`: tentativas, resultados e persistência.
- `src/styles/learning.css`: apresentação dos componentes de aprendizagem.

As alterações estão no projeto local. Publicar a versão exige o fluxo de implantação do projeto.

## Área Carreiras (setembro de 2026)

Quatro trilhas novas para a vaga de Analista Administrativo Financeiro Jr: Excel (22 lições), Orçamento e indicadores (13), Notas, compras e contratos (16) e Entrevista (15). Todas ficam liberadas desde o início.

Fontes consultadas em 25/09/2026 e citadas nos cartões: anúncio da vaga; site oficial do Grupo Massa; CF/88, art. 7º; CLT, art. 71; Lei 7.418/1985, art. 4º; Lei 8.036/1990, art. 15; Lei 4.749/1965; Lei 10.192/2001, art. 2º; Lei 10.833/2003, arts. 30 a 32; RIR/2018, arts. 714 e 716; Lei 8.212/1991, art. 31; LC 116/2003; LC 214/2025, arts. 62 e 343 a 348 (com a LC 227/2026); Ajuste SINIEF 07/2005 (com os Ajustes 44/20 e 14/26); Manual de Orientação do Contribuinte da NF-e. Empresas, CNPJs e valores de exemplo são fictícios.

Largura: fórmulas longas quebram a linha, e até 360 px tabelas e cartões ficam mais compactos. Todas as 2.741 telas (teoria e exercícios) foram medidas a 320 e 375 px sem vazar a página.

## Treino de revisão (setembro de 2026)

Cada trilha ganhou **treinos de revisão**, marcados com um halter no caminho. Eles olham para trás: revisam as
etapas anteriores da trilha e, na primeira etapa, a trilha anterior da área. São opcionais, sem tempo, sem perder
corações e com dicas. Um treino sorteia de 5 a 10 questões de lições já concluídas, começando pelas que a pessoa
mais errou e pelas com revisão vencida, uma de cada lição antes de repetir. Até 40% da rodada vem da **revisão
integrada**, perguntas novas que misturam lições diferentes.

Ao terminar, as revisões espaçadas das lições treinadas são reagendadas (1, 3, 7, 14 e 30 dias) conforme os acertos
de primeira, e o resultado indica as lições a reforçar. A aba Praticar tem o hub "Trilhas de treino" com um treino
por trilha e um misto da área.

Fundamentos: recuperação ativa, distribuição do estudo no tempo e mistura de assuntos (prática intercalada), as
mesmas ideias do guia do IES citado acima.

Arquivos: `src/engine/training.js`, `src/ui/screens/training.js`, `src/content/revisao.js` e `tests/training.test.js`.
