# Auditoria do ContaTrilha — design, aprendizagem e PWA

## O que foi ajustado

- **Identidade visual:** verde vivo como acento de progresso e ação, floresta escura para títulos, superfícies mais claras, ouro para XP e paleta escura com contraste. A referência foi a clareza, a energia de cor e o caminho de aprendizagem do Duolingo; a identidade continua própria do ContaTrilha.
- **Desktop:** navegação lateral persistente, trilhas em colunas, largura e espaços de leitura ampliados e cartões com hierarquia mais clara.
- **Celular:** navegação inferior com ícones vetoriais coerentes, áreas de toque maiores, respeito à área segura do aparelho e adaptação para telas estreitas.
- **Acessibilidade:** foco de teclado visível e respeito à preferência do sistema por movimento reduzido.
- **PWA:** o app deixa de apagar o service worker e o Cache Storage na inicialização. O build emite `manifest.webmanifest` e service worker; o shell, assets e imagens ficam em precache. Há aviso de atualização e botão de instalação quando o navegador disponibilizar o evento. Fontes Google usam cache de runtime.
- **Offline:** telas e conteúdo empacotados podem abrir após o primeiro carregamento online. Progresso local usa armazenamento do navegador. Login e sincronização Supabase ainda dependem de rede; cache offline não substitui backup/sincronização.
- **Conteúdo:** nova oficina complementar de leasing na trilha de Imobilizado: análise do contrato, dados do ERP, valor presente, reconhecimento inicial, juros, baixa do passivo, depreciação e reconciliação. Há oito exercícios com cálculo, classificação e controle documental. A oficina não bloqueia lições essenciais nem o teste final.
- **Dados do curso:** oficinas são contabilizadas dinamicamente nos cartões. A etapa de leasing tem desbloqueio independente das outras oficinas opcionais, após as lições essenciais anteriores.
- **Áreas de estudo:** seletor acessível na entrada, no topo e no perfil. As cinco áreas têm sequências próprias, com progresso por lição preservado ao trocar e XP/sequência diária compartilhados.
- **Conteúdo digital:** seis lições essenciais de documentos, ERP, conciliação, arrendamento, ECD e controles, com exemplos e exercícios próprios.
- **Carregamento:** prática, loja, glossário, perfil, entrada e motor de quiz carregam por demanda. O SDK do Supabase fica em um arquivo separado e só é carregado quando a configuração de nuvem está presente.

## Próximas melhorias recomendadas

| Prioridade | Melhoria | Motivo |
|---|---|---|
| Alta | Validar instalação, atualização e estudo offline num build servido por HTTPS em Android e iOS | A disponibilidade de instalação e de prompts varia por navegador/plataforma; o botão só aparece quando a plataforma oferece instalação customizada. |
| Alta | Criar sincronização offline-first com fila de eventos e resolução de conflito | A cópia local permite estudar offline, mas não sincroniza automaticamente o progresso durante a desconexão. |
| Alta | Revisar cada lição com professores e manter um processo de atualização normativa | Conteúdo fiscal/contábil muda; a oficina de leasing usa CPC 06 (R2) e um exemplo explicitamente didático. |
| Média | Carregar o conteúdo de cada área sob demanda | O bundle de telas foi dividido, mas o catálogo completo de lições ainda chega no carregamento inicial porque o estado compartilha o índice de cursos. |
| Média | Fazer revisão de contraste e navegação por leitor de tela em fluxos de exercício, loja e perfil | Foco visível foi adicionado, mas revisão assistiva completa ainda requer percorrer os estados interativos. |
| Média | Medir desempenho e legibilidade em aparelhos reais, incluindo zoom e landscape | As regras responsivas foram aprimoradas; teste físico revela diferenças de teclado virtual, safe area e tamanho de fonte. |
| Baixa | Expandir ilustrações, estados vazios e microanimações orientadas por ação | A interface já tem feedback e o castor usa animação por quadros no lugar; novas poses devem reforçar o significado sem distrair. |

## Referências

- Duolingo Design System, cores: https://design.duolingo.com/identity/color/1000
- Duolingo, redesign das abas principais: https://blog.duolingo.com/core-tabs-redesign/
- Duolingo, tela inicial e caminho guiado: https://blog.duolingo.com/new-duolingo-home-screen-design/
- Duolingo, escolha e troca de curso: https://blog.duolingo.com/add-new-course/
- MDN, critérios e instalação de PWAs: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_Installable
- vite-plugin-pwa, registro e atualização: https://github.com/vite-pwa/vite-plugin-pwa/blob/main/docs/frameworks/index.md
- CPC 06 (R2) — Arrendamentos: https://www.cpc.org.br/CPC/Documentos-Emitidos/Pronunciamentos/Pronunciamento?Id=37
- IFRS 16 — Leases: https://www.ifrs.org/issued-standards/list-of-standards/ifrs-16-leases/
- SPED, Escrituração Contábil Digital: https://sped.rfb.gov.br/pagina/show/499
