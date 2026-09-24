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
