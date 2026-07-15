# Auditoria visual e estrutural — Editorial V2

Data da auditoria: 14/07/2026  
Branch de segurança: `visual-editorial-v2`  
Commit-base: `15461a0` (`feat: adiciona entregavel completo do garcom profissional`)

## 1. Estado registrado antes da auditoria

- `git status`: árvore limpa em `main`, sincronizada com `origin/main`.
- Branch criada antes de qualquer alteração de arquivo: `visual-editorial-v2`.
- Build de referência: aprovada com Vite 6.4.3.
- Resultado da build: 35 módulos transformados; `dist/index.html` 0,93 kB; CSS 40,73 kB; JavaScript 256,75 kB.
- Nenhuma alteração de design, conteúdo ou funcionalidade foi realizada nesta etapa.

## 2. Arquitetura ativa

O ponto de entrada é `src/main.jsx`. Ele monta somente `DocumentApp`, portanto a experiência atualmente publicada é o leitor editorial A4, e não o componente antigo `StudentArea`.

Fluxo ativo:

1. `src/main.jsx` monta `src/document/DocumentApp.jsx`.
2. `DocumentApp` chama `buildDocumentManifest()` em `src/document/documentManifest.js`.
3. O manifesto gera e ordena as 287 páginas do material.
4. `DocumentApp` seleciona a página corrente pelo hash da URL e entrega seus dados a `DocumentPage`.
5. `src/document/DocumentPages.jsx` escolhe o componente de página conforme `page.type`.
6. Páginas de técnica usam `TechniqueVisual`, de `src/document/PageVisuals.jsx`, para gerar os diagramas SVG.
7. `src/hooks/useStudentProgress.js` fornece o progresso persistido no navegador.

Total de páginas geradas:

- Biblioteca, capa, instruções, sumário e progresso: 5.
- Aberturas de 10 capítulos: 10.
- Técnicas: 200.
- Capa e 30 roteiros: 31.
- Capa e 12 treinos de memorização: 13.
- Capa e 15 checklists: 16.
- Capa e 10 aulas de postura: 11.
- Certificado: 1.
- Total: 287 folhas A4.

## 3. Mapa dos elementos solicitados

### Área de membros

- Experiência ativa: `src/document/DocumentApp.jsx`.
- Estrutura alternativa/legada: `src/StudentArea.jsx`.
- Atenção: `StudentArea.jsx` não é importado por `src/main.jsx` e, no estado atual, não aparece na aplicação publicada.
- `src/styles/student-area.css`, `src/components/TechniqueViewer.jsx` e `src/components/VisualDemo.jsx` pertencem a essa experiência alternativa e não controlam o leitor A4 atual.

### Páginas A4

- Orquestração: `src/document/DocumentApp.jsx`.
- Renderização por tipo: `src/document/DocumentPages.jsx`.
- Moldura compartilhada de todas as folhas: `PageShell`, dentro de `DocumentPages.jsx`.
- Proporção, área segura, tipografia, layouts e impressão: `src/document/document.css`.
- Diagramas SVG: `src/document/PageVisuals.jsx`.
- Ordem, IDs, tipos, imagens e dados: `src/document/documentManifest.js`.

### Arquivos das 200 técnicas

- Fonte principal: `src/data/techniques.js`.
- O arquivo possui 10 blocos, 200 títulos e guias compartilhados por bloco.
- O array `techniques` é montado por `blockDefinitions.flatMap(...)`.
- Cada item recebe ID, número, bloco, objetivo, ambiente, explicação, passos, acertos/erros, resultado, dica, segurança e tipo visual.
- `src/utils/validateData.js` valida a quantidade e os campos, mas hoje a validação é acionada apenas por `StudentArea.jsx`, que não está montado no fluxo ativo.

### Impressão e PDF

- Controle: `requestPrint()` em `src/document/DocumentApp.jsx`.
- Escopos: página atual (`current`) ou documento completo (`all`).
- Antes de abrir a caixa de impressão, o sistema espera dois frames, fontes e imagens.
- O PDF é gerado pelo diálogo nativo do navegador através de `window.print()`; não existe biblioteca de PDF externa.
- `afterprint` limpa o estado temporário.
- O conteúdo para impressão é duplicado em `.print-document` com `printMode` ativo.
- As regras `@media print` em `src/document/document.css` escondem o leitor, exibem somente o documento e fixam cada folha em 210 mm × 297 mm, com quebra após cada página.

### Capa

- Componente ativo: `CoverPage` em `src/document/DocumentPages.jsx`.
- Cadastro da página: item `cover` em `src/document/documentManifest.js`.
- Imagem: `public/assets/editorial/cover.webp`.
- Estilo: classes `.cover-*` em `src/document/document.css`.

### Dashboard

- Dashboard ativo da experiência publicada: `ModulesPage` em `src/document/DocumentPages.jsx`, acessível pelo hash `#modules`.
- Ele mostra os cinco módulos, o módulo principal em destaque, a imagem `module-principal.webp` e o comando de imprimir tudo.
- Existe também um componente `Dashboard` em `src/StudentArea.jsx`, mas ele pertence à experiência alternativa não montada.

### Sidebar

- Sidebar ativa: markup `<aside className="document-sidebar">` dentro de `src/document/DocumentApp.jsx`.
- Itens: `navigationSections` de `src/document/documentManifest.js`.
- Estilos: `.document-sidebar`, `.sidebar-progress`, `.library-home` e navegação em `src/document/document.css`.
- Ela ainda não é um componente isolado; está acoplada ao `DocumentApp`.
- A sidebar de `src/StudentArea.jsx` também está inativa no fluxo publicado.

### Sistema de progresso

- Hook: `src/hooks/useStudentProgress.js`.
- Persistência: `localStorage`, chave `garcom-profissional:student-progress:v1`.
- Registra técnicas, favoritos, próximo turno, roteiros, checklists, memorização, postura, nome e avaliação.
- Calcula percentuais e os requisitos para desbloquear o certificado.
- É consumido por `DocumentApp` e também pela experiência alternativa `StudentArea`.

### Rotas e navegação

- Não existe React Router.
- O leitor ativo usa hashes (`#modules`, `#cover`, `#tech-001`, etc.).
- `DocumentApp` lê `window.location.hash`, resolve o ID no manifesto e usa `history.replaceState` ao trocar de folha.
- As setas do teclado e os botões anterior/próxima alteram o índice da página.
- `vercel.json` reescreve qualquer caminho para `index.html`.
- `StudentArea.jsx` possui uma segunda estratégia por query string (`?pagina=...`), mas ela não participa do bundle ativo porque o componente não é importado.

## 4. Arquivos que controlam o visual atual

### Controle direto do leitor publicado

- `src/document/document.css`: sistema visual principal, leitor, A4, módulos, capa, técnicas, bônus, certificado, responsividade e impressão.
- `src/document/DocumentPages.jsx`: composição e hierarquia visual de cada tipo de página.
- `src/document/PageVisuals.jsx`: cenas e diagramas SVG.
- `src/document/documentManifest.js`: associação entre página, conteúdo, imagem, capítulo e tipo de layout.
- `src/document/DocumentApp.jsx`: chrome do leitor, sidebar, toolbar, navegação e documento de impressão.
- `public/assets/editorial/*.webp`: imagens editoriais.
- `index.html`: carregamento da fonte Poppins e metadados globais.

### Controle da experiência alternativa, atualmente inativa

- `src/StudentArea.jsx`.
- `src/styles/student-area.css`.
- `src/components/TechniqueViewer.jsx`.
- `src/components/VisualDemo.jsx`.

Alterar somente esses arquivos alternativos não modifica o leitor A4 publicado.

## 5. Como uma técnica é renderizada

1. `src/data/techniques.js` gera o objeto da técnica.
2. `buildDocumentManifest()` cria uma página `type: 'technique'`, mantém o objeto em `page.data` e associa a imagem do capítulo.
3. `DocumentApp` seleciona a página pelo hash.
4. O dispatcher `DocumentPage` envia páginas `type: 'technique'` para `TechniquePage`.
5. `TechniquePage` usa sempre a mesma sequência: cabeçalho, diagrama, passo a passo, notas, faixa de resultado e ação de conclusão.
6. `TechniqueVisual` escolhe uma cena pelo `blockId` e uma variação de moldura por `item.number % 6`.
7. Ao marcar a folha, `toggleInList('completedTechniques', id)` atualiza o hook e o `localStorage`.

O conteúdo e o layout estão separados o suficiente para uma repaginação: os dados podem continuar intactos enquanto a composição visual muda.

## 6. Por que as páginas parecem repetitivas

### Repetição estrutural

Todas as 200 técnicas passam por um único `TechniquePage`. A ordem, as proporções e os blocos informativos são iguais em todas as folhas. Título, texto e diagrama mudam, mas a arquitetura visual permanece constante.

### Variação visual limitada

`TechniqueVisual` possui cenas diferentes por bloco, porém cada bloco reutiliza a mesma família de SVG. As classes `variant-0` a `variant-5` alteram principalmente fundo, bordas e pequenos posicionamentos; elas não criam composições editoriais realmente diferentes.

### Imagem compartilhada por capítulo

O manifesto associa uma única imagem a todas as técnicas de cada capítulo. A abertura e os materiais ligados ao mesmo tema reutilizam o mesmo ativo editorial quando uma imagem é necessária.

### Conteúdo gerado por fórmulas comuns

Os 200 títulos são distintos, porém explicação, passos, erro, resultado, dica e segurança derivam de guias compartilhados por bloco. Isso reforça a sensação de ritmo repetido. Esse conteúdo não deve ser reescrito na fase visual; a solução deve vir primeiro da hierarquia, dos componentes e das variações de composição.

### Um único sistema de densidade

Cabeçalho, diagrama, passo a passo, notas e faixa inferior ocupam praticamente as mesmas áreas em toda técnica. Não existe hoje uma escolha de layout baseada no tipo de aprendizado, quantidade de texto, objetivo ou natureza da técnica.

## 7. Partes que podem mudar sem quebrar o conteúdo

Podem ser alteradas com baixo risco, desde que as props e os IDs sejam preservados:

- Estrutura interna e classes visuais de `TechniquePage`.
- Componentes SVG de `PageVisuals.jsx`.
- CSS das páginas A4, respeitando a área segura e a impressão.
- Layout de capa, capítulos, módulos e bônus.
- Associação de layout visual por `blockId`, `visualType`, objetivo ou número.
- Imagens em `public/assets/editorial`, mantendo caminhos atualizados no manifesto.
- Separação da sidebar e toolbar em componentes menores.

Contratos que devem permanecer estáveis:

- Conteúdo de `src/data/techniques.js` e `src/data/content.js`.
- IDs `tech-001` a `tech-200` e IDs dos bônus.
- Ordem e tipos fundamentais do manifesto.
- Chave e formato do progresso no `localStorage`.
- Chamadas `toggleInList` e `update`.
- Fluxo `printMode`, `.print-document` e `requestPrint()`.
- Dimensão A4 de 210 mm × 297 mm, quebras de página e ausência de overflow.
- Botões de navegação, impressão e PDF.

## 8. Componentes recomendados para a próxima etapa

Os nomes abaixo são recomendações de arquitetura; nenhum deles foi criado nesta auditoria.

1. `DocumentSidebar.jsx` — extrair a sidebar do `DocumentApp` sem mudar a navegação.
2. `ReaderToolbar.jsx` — isolar toolbar, título atual e comandos de impressão.
3. `TechniquePageRouter.jsx` — escolher deterministicamente uma composição conforme bloco, objetivo, tipo visual e densidade do conteúdo.
4. `layouts/TechniqueEditorialLayout.jsx` — composição com grande cena visual e resumo lateral.
5. `layouts/TechniqueStepsLayout.jsx` — composição focada em sequência e movimento.
6. `layouts/TechniqueComparisonLayout.jsx` — composição focada em “faça/evite”.
7. `layouts/TechniqueFieldCardLayout.jsx` — composição de consulta rápida para uso no turno.
8. `TechniqueHeader.jsx` — número, capítulo, título e objetivo com variações controladas.
9. `TechniqueSteps.jsx` — passo a passo reutilizável sem duplicar conteúdo.
10. `TechniqueComparison.jsx` — blocos de acerto, erro e segurança.
11. `TechniqueOutcome.jsx` — resultado e dica rápida.
12. `visualRegistry.js` — mapa explícito entre `blockId`/`visualType` e a cena visual apropriada.

Recomendação: começar com quatro layouts editoriais realmente distintos e distribuí-los por intenção pedagógica. Isso cria variedade perceptível sem alterar uma única técnica.

## 9. Arquivos previstos para a repaginação visual

### Afetados diretamente

- `src/document/DocumentPages.jsx`
- `src/document/PageVisuals.jsx`
- `src/document/document.css`
- `src/document/DocumentApp.jsx` — apenas se sidebar e toolbar forem extraídas.
- `src/document/documentManifest.js` — somente para registrar variantes, sem mudar IDs ou conteúdo.
- Novos componentes em `src/document/components/` e `src/document/layouts/`.
- Eventuais novos ativos em `public/assets/editorial/`.

### Preservados

- `src/data/techniques.js`
- `src/data/content.js`
- `src/hooks/useStudentProgress.js`
- `src/utils/validateData.js`
- `vercel.json`
- `package.json`, salvo se uma dependência visual for deliberadamente aprovada.

### Fora do escopo inicial

- `src/StudentArea.jsx`
- `src/styles/student-area.css`
- `src/components/TechniqueViewer.jsx`
- `src/components/VisualDemo.jsx`

Esses quatro arquivos pertencem à experiência alternativa não montada. Eles só devem entrar no escopo se houver uma decisão explícita de reativar ou unificar essa área com o leitor A4.

## 10. Riscos e critérios de validação da próxima etapa

- Renderizar as 287 folhas sem overflow vertical ou horizontal.
- Confirmar que cada hash continua abrindo a página correta.
- Confirmar progresso, favoritos e certificado após a mudança visual.
- Testar impressão de uma folha e das 287 folhas.
- Garantir carregamento completo de fontes e imagens antes de `window.print()`.
- Verificar que o layout impresso mantém 210 mm × 297 mm e uma folha por página.
- Executar `npm run build` após cada lote estrutural.
- Não alterar nem regenerar as 200 técnicas durante a repaginação.

## Conclusão

O projeto tem uma base funcional sólida e uma separação razoável entre dados, manifesto, progresso e apresentação. A repetição visual não vem de falta de conteúdo, mas da concentração das 200 técnicas em um único template e de variações SVG pequenas. A próxima etapa pode criar diversidade editorial mantendo intactos conteúdo, IDs, progresso, navegação e impressão.
