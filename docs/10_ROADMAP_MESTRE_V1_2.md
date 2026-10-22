# ATLAS DAS IDEIAS POLÍTICAS — ROADMAP MESTRE V1.2

**Situação:** planejamento, conteúdo e referência visual consolidados para execução futura no ChatGPT Work. **Não há aplicativo publicado, repositório criado ou build validado.**

**Objetivo do produto:** página web pública, responsiva, leve, de código aberto e com funcionamento local no navegador, contendo um atlas educativo de correntes políticas + questionário exploratório de 20 perguntas + resultados descritivos + gráficos interativos + biblioteca de fontes + exportação PDF. O site não tenta dizer em quem a pessoa deve votar, não tem propaganda eleitoral, não classifica pessoas como extremistas com base em poucas respostas e não apresenta o questionário como instrumento psicométrico validado.

**Referência de visual:** `referencias/mockup_dashboard_aprovado.png` (dashboard dark de múltiplos painéis, mapa central, radar, barras e espectro horizontal). Trata-se de referência **estética e hierárquica**, não de especificação factual; corrigir os indicadores numéricos artificiais, taxonomias equivocadas e erros de texto da imagem.

## I. Decisões imutáveis da V1

1. **Uma única V1 pública pronta**, precedida por etapas internas de revisão, testes e QA; não há promessa de software literalmente livre de qualquer erro.
2. **Marca:** Atlas das Ideias Políticas (nome provisório exibido). Sem logomarca partidária.
3. **Repositório:** `atlas-ideias-politicas`, projeto isolado. GitHub Pages como hospedagem e GitHub Actions como CI/CD; verificar conta, permissões e branch antes de criar.
4. **Sem backend, login, analytics, telemetria, cookies de rastreamento, banco de dados ou envio de respostas.** Todos os cálculos ocorrem localmente no navegador. Sem integrações remotas desnecessárias.
5. **Idioma:** pt-BR revisado, com arquitetura preparada para traduções futuras (não exibir idioma não implementado). Textos sem erros ortográficos.
6. **20 perguntas**, revisadas editorialmente e com IDs estáveis, opção de incerteza quando aplicável e explicação para conceitos difíceis.
7. **Seis módulos gráficos reais** com pan/zoom e equivalentes acessíveis. O espectro horizontal é prioritário e visível na home.
8. **Dois temas completos**, claro/escuro, e preferência Sistema, respeitando contraste e redução de movimento.
9. **PDF resumido e completo**, geração client-side com visualizações vetoriais ou alta resolução, fonte e metodologia; exportar SVG/PNG dos gráficos quando tecnicamente adequado.
10. **Nome de exibição opcional**; sem cadastro; cache apenas por opt-in separado de dados sensíveis; teste refazível indefinidamente.
11. **Biblioteca editorial rigorosa** com fonte verificável em cada conceito/afirmação substantiva; diferenciação entre posições de correntes, atos de partidos e projetos de governo.
12. **Ícones históricos contextualizados**, sem suástica e sem propaganda. Símbolos de correntes visíveis em escala educativa, não símbolos oficiais falsamente atribuídos.

## II. Jornada do visitante

### Home / entrada
- Topbar sticky: marca, `Explorar`, `Fazer o teste`, `Resultados` (desabilitado se não houver respostas, com explicação), `Biblioteca`, `Fontes`, `Metodologia`, alternar tema.
- Hero com título curto e texto sobre 20 perguntas / sem login / privacidade; CTA `Começar teste` e `Explorar espectro`.
- **Gráfico 01, `Linha das correntes`**, ocupa largura central. Seu zoom acontece de verdade na página inicial, antes do questionário.
- Logo abaixo, cartões de correntes com filtros `esquerda`, `centro`, `direita`, `autoritarismo histórico`, `indeterminados`, com listagem claramente temática, não sentença sobre usuários.
- Campo não obrigatório `Como quer aparecer no relatório?` + checkbox inicialmente desligada `Lembrar este nome no dispositivo`; pode ser preenchido depois, antes do PDF.
- CTA secundária para `Como funciona` e `Bibliografia`.

### Teste
- Q01/Q20 -> Q20/Q20; uma pergunta por tela. Barra de progresso, botão voltar, avançar, `não sei` somente quando opção genuína. Respostas não são selecionadas por padrão.
- Ao sair da pergunta, persistência apenas na memória da aba; aviso discreto `se recarregar, poderá perder seu progresso`. Não guardar respostas em localStorage, sessionStorage ou URL.
- Revisão final: lista de respostas e ausências; poder voltar a Q específica. Resultado sem atribuir posição a perguntas omitidas.
- Botão `Refazer teste` sempre com confirmação; descarta respostas, limpezas e gráficos anteriores. Nome fica somente conforme consentimento.

### Resultados
- Cabeçalho `Relatório de [apelido ou Visitante]` e aviso de interpretação: descritivo, exploratório, não diagnóstico.
- Navegação por abas (`Visão geral`, `Economia`, `Direitos e democracia`, `Todas as respostas`, `Correntes`, `Fontes`).
- Gráfico horizontal também pode exibir **regiões conceituais sustentadas pelas respostas**, como anotação qualitativa e **não um número pontual exato** nem classificação extremista.
- Módulos gráficos 02–06, tabelas equivalentes, resumos com `o que suas respostas apoiam`, `o que contradizem`, `evidência insuficiente`.
- Botões `Editar respostas`, `Refazer teste`, `PDF resumido`, `PDF completo`, `Exportar gráfico`, `Apagar dados`.

### Biblioteca e fontes
- Pesquisa textual por conceito; verbetes de cada corrente com definição, variantes internas, divergências entre pesquisadores, contexto histórico, fontes com autor/instituição/título/ano/link, notas de limitações e data de revisão.
- Partidos brasileiros em seção **separada** e apenas com material oficial (TSE, programas, estatutos, documentos assinados), sem `partido parecido com seu perfil` ou ranking de votos.
- Emblemas históricos sempre acompanhados de nomes e contexto (nunca cor ou símbolo como único meio de interpretação).

## III. Os seis módulos gráficos (contrato do produto)

| ID | Nome | Onde aparece | O que representa | Interação |
|---|---|---|---|---|
| G01 | **Linha das correntes** | Home, Biblioteca, Resultado | Espectro **didático e segmentado**, expandindo microrregiões e subcorrentes, sem régua psicométrica objetiva | Mouse wheel, drag, pinch, zoom +/−, reset, seletores por tema, detalhes e fontes |
| G02 | **Mapa de eixos econômicos e institucionais** | Home/Resultados em abas | Dois eixos de conceitos explicitamente definidos, p.ex. propriedade privada↔social e coordenação mercados↔planejamento; direitos/liberdades em separação, não eixo autoritarismo forçado | zoom/pan, troca de combinação, legenda, fonte por nó |
| G03 | **Barras de evidências por dimensão** | Resultado | `evidências declaradas`, `tensões` e `não determinado` por tema; contagens rastreáveis para QIDs, **sem 78% socialista** | filtros, toque, navegação por dimensão |
| G04 | **Radar de cobertura editorial** | Resultado | Número de perguntas que cobrem cada dimensão ou proporção respondida por tema, NÃO intensidade de posição nem `média global` inventada | foco em legenda, disclosure de contagens, tabela |
| G05 | **Matriz de questões × temas** | Resultado | 20 perguntas versus temas/posições; respondida, incerta, ausente; ligação com leitura | seleção, ordenação, zoom em mobile, tabela |
| G06 | **Rede de relações conceituais** | Resultado | Convergências e tensões **predefinidas e justificadas** entre respostas comparáveis, nós clicáveis | pan/zoom, filtro, leitura em lista acessível |

**Tela de comparação de correntes:** cartões sem ranking numérico automático, sem `% de afinidade`, sem top-10 partidário; cada cartão pode dizer `pontos compartilhados`, `pontos em tensão` e `sem informação`. Não contar como sétimo gráfico.

**Proibido:** curva `evolução das respostas` apresentada como evolução no tempo, pois não existem medidas longitudinais; se desejar uma visualização do progresso pelas Q01–Q20, usar somente progresso de preenchimento ou contagem cumulativa de respostas (rotulado corretamente) e não fazer disso sétimo gráfico obrigatório.

**Visão G01 detalhada:** bandas `extrema esquerda (correntes históricas) | esquerda socialista | esquerda democrática | centro-esquerda | centro | centro-direita | direita | extrema direita (correntes históricas)`; cada zona admite varias correntes sem pressupor que sejam equivalentes entre si. Exemplos de aprofundamento: social-democracia, socialismo democrático, socialismo de mercado, ecossocialismo, marxismo-leninismo, trotskismo, comunismo conselhista, anarquismos, trabalhismo, liberalismo político/econômico, democracia-cristã, conservadorismo, libertarianismo, fascismo, nazismo. Subcorrentes posicionadas **como organização editorial** com notas de divergência, não medição universal.

**Diferenciação essencial:** fascismo/nazismo não são a extremidade de liberalismo econômico, nem o comunismo é automaticamente equivalente a regimes autoritários. Catálogo de autoritarismo histórico é ortogonal aos eixos econômicos. Fontes obrigatórias em cada verbete.

## IV. Linguagem visual escolhida

### Tela dark (prioritária)
- Fundo profundo grafite/navy (#08111F / #0B1526), painéis #111D31, bordas #22324A; acento ciano tecnológico e azul editorial, âmbar para ações selecionadas; vermelho/azul somente quando a categoria for explicitamente legendada.
- Layout desktop: topbar + hero lateral enxuto + **gráfico linha amplo** na primeira dobra + dashboard em grid 12 colunas. Em telas grandes, G02 em área ampla; G03/G04/G05/G06 abaixo, sem aglomeração.
- Linhas precisas, grade discreta, glow sutil apenas para foco e transições reduzidas; tipografia clara, hierarquia nítida, sem exagerar neon para manter legibilidade.

### Tela light (mesma qualidade)
- Fundo off-white (#F7F9FC), cartões brancos, texto navy (#152238), bordas #D9E2ED, azul-petróleo e âmbar editorial; contrastes verificados AA.

### Símbolos e iconografia
- Ícones funcionais Lucide (justiça/escala, Estado/prédio, economia/fábrica, direitos/escudo, fonte/livro, zoom/lupa, privacidade/cadeado), consistentes e acompanhados de texto.
- Comunismo: símbolo histórico da foice e martelo (☭) **apenas no verbete pertinente** com legenda, fonte e contextualização. Evitar usar como sinônimo de toda esquerda.
- Fascismo: representação contextual da **fasces** histórica (feixe de varas) em verbete histórico, preferencialmente ilustração original neutra e descrita, não emblema oficial glorificado.
- Nazismo: **sem suástica**; use pictograma editorial de arquivo histórico / brasão abstrato neutro com formas angulares, claramente marcado `Ícone ilustrativo, não símbolo histórico oficial`, sem copiar iconografia de organizações extremistas. Evitar águia/ícone que implique falsa autenticação; incluir verbete e fonte histórica.
- Para as demais correntes, pictogramas didáticos originais, nunca fingir que são logotipos de movimentos reais.
- Bandeiras de países apenas quando fizerem sentido factual na explicação; não usar em resultados pessoais como inferência de nacionalidade.

## V. Arquitetura e stack

- Frontend: React, TypeScript estrito, Vite.
- UI: Tailwind CSS + primitives acessíveis (Radix/shadcn) + Lucide; CSS custom properties com theme tokens.
- Gráficos: D3 modular para transformações e SVG para rótulos interativos; renderização virtualizada quando houver muitos nós. Manter camadas de dados separadas de geometria e apresentação.
- Dados: JSON tipado, `questionnaire.schema.json`, `sources.json`, `ideologies.json`, `relations.json`; IDs estáveis, versionamento semântico.
- PDF: `@react-pdf/renderer` com visualizações vetoriais, fallback SVG->PNG controlado, metadados, hyperlinks e diagramação A4; PDF não depende de carregar fontes externas de última hora.
- Routing: hash-router ou roteamento que comprovadamente funcione em Pages com refresh e deep links.
- CI: GitHub Actions (typecheck, lint, unit, E2E, build, link-check, accessibility, deploy após aprovação).
- Testes: Vitest + Testing Library + Playwright Chromium/Firefox/WebKit; axe automated + auditoria manual; Lighthouse CI quando pertinente.
- Privacidade: sem third party analytics, sem CDN obrigatório, CSP coerente, dados sensíveis apenas em memória temporária, nome salvo somente opt-in, nada em query params.
- SEO: metadata, sitemap do conteúdo educativo (sem indexação de respostas pessoais) e OpenGraph genérico.

## VI. Arquitetura de pastas proposta

```text
atlas-ideias-politicas/
  .github/workflows/{ci.yml,deploy.yml}
  public/{favicon.svg,og-card.png}
  src/
    app/{App.tsx,routes.tsx,providers.tsx}
    components/{layout,ui,charts,questionnaire,report}
    features/{home,quiz,results,library,methodology,privacy}
    data/{questions.json,ideologies.json,sources.json,relations.json}
    domain/{types,validation,interpretation,provenance,export}
    hooks/{useTheme,useVolatileAnswers,useOptionalName}
    styles/{tokens.css,global.css}
    tests/{unit,integration,e2e,fixtures}
  docs/{PRD,DESIGN_SYSTEM,METODOLOGIA,FONTES,QA,SECURITY}
  LICENSE
  README.md
  package.json
  vite.config.ts
```

## VII. Regras de interpretação e integridade

1. Não converter escolhas em porcentagens de `ser esquerda`, `ser comunista`, `ser nazi` ou em `candidato/partido mais provável`.
2. Não inferir identidade definitiva; classificar proposições respondidas e grau de cobertura da informação. Se não houver informação, `indeterminado`.
3. Não atribuir o valor `centro` a respostas `depende`, `não sei`, saltadas ou inconclusivas.
4. Separar pensamento econômico de instituições/autoritarismo e de costumes; não deduzir voto, religião pessoal ou etnia.
5. Toda conclusão descritiva aponta para QIDs que a sustentam e referências que definem os conceitos. Outras respostas podem ser divergentes e devem aparecer transparentemente.
6. Exibir uma alternativa que permita o visitante marcar `não me reconheço nesta síntese`, sem enviar feedback ao servidor.
7. Perguntas sobre ilícitos e direitos são cenários de interpretação normativa; não apresentar um `índice de autoritarismo` baseado em uma questão.
8. O banco de 20 perguntas é um rascunho editorial, não modelo cientificamente validado. Revisão de pares e testes de entendimento antes do lançamento; manter marcações `exploratório` mesmo após revisão.

## VIII. Fontes, auditoria, correção editorial

- Constituição de 1988 / legislação oficial quando falar de direitos brasileiros.
- TSE para nomes/estatutos de partidos, sem presumir localização ideológica de toda a legenda.
- OCDE para estatais, tributação e mobilidade socioeconômica.
- International IDEA e V-Dem para indicadores/conceitos de democracia (não criar ranking do usuário).
- Stanford Encyclopedia of Philosophy e literatura acadêmica para correntes políticas e controvérsias.
- USHMM e instituições museológicas/históricas para fascismo, nazismo e símbolos extremistas.
- W3C WCAG 2.2, documentação oficial D3/Vite/GitHub/Playwright/React PDF para implementação.
- Cada link precisa de verificação final, data de consulta, título, instituição e pertinência. Nenhum `citation` inventado ou URL genérica no lugar de referência concreta.
- **Aviso:** uma fonte acadêmica apoia a interpretação da teoria, mas não valida o questionário em si.

## IX. GATES de execução e critérios de aceite

**G0 — Editorial:** 20 perguntas revisadas, equilíbrio de alternativas, hipóteses, referências por verbete e por questão, rastreabilidade e revisão antiviés. Resultado falso ou enviesado é bloqueador.

**G1 — UI/UX:** implementar fielmente mockup em home desktop + mobile com G01 em destaque, símbolos contextualizados, temas, foco de teclado, fonte legível; prints de 320/375/390/768/1024/1440 px.

**G2 — Funcionalidades:** questionário, nome opcional, revisão, reinício, eliminação de dados, inferência descritiva traçável; navegação sem 404.

**G3 — Gráficos:** 6 tipos únicos, gestos touch/mouse, grade responsiva, alternativas acessíveis e fontes por clique.

**G4 — Documentação/relatórios:** biblioteca, links, exportações PDF curto/completo, SVG/PNG, metadados e validação no celular.

**G5 — QA:** lint, TS, testes unitários, E2E, OWASP básica, privacidade, link checking, axe, inspeção manual AA, Lighthouse, percepção de performance; corrigir bloqueadores e regressões.

**G6 — Deploy único:** publish Pages após todos os gates, validar URL HTTPS real, refresh/deep links, commit/tag v1.0.0, GitHub Action verde, README com links e relatório QA; não declarar concluído se qualquer evidência faltar.

### Critérios de aceite que bloqueiam o lançamento

- Espectro horizontal **é visível e interativo na home**, antes do teste; tem zoom real por mouse wheel / pinça / botões, reset e drill-down.
- Os seis gráficos representam dados verdadeiros do instrumento; não mostrar `% político` ou evolução inventada.
- Usuário consegue finalizar, editar, refazer ilimitadamente, exportar os dois PDFs, apagar nome e dados.
- Dados de respostas não persistem nem são transmitidos; a pessoa vê aviso se perder sessão.
- Arte dark e light consistente; ícones com acessibilidade; nazismo sem suástica e com iconografia editorial neutra não oficial.
- Cada afirmativa política histórica relevante tem fonte clicável verificável; cada interpretação de respostas aponta às perguntas correspondentes.
- Android/iOS/PC testados; scroll não é sequestrado; zoom por teclado e tabela são equivalentes.
- GitHub Pages HTTPS estável, sem 404 em reload, workflows verdes, release e README atualizados.

## X. Pontos pendentes para o Work sem bloquear planejamento

- Proprietário/organização exata do repositório GitHub e respectiva autorização de criação/deploy, quando o Work for acionado.
- Respostas Q19 e Q20 do criador ainda **não foram fornecidas**. O site sempre começa com todas as opções vazias, independentemente disso.
- Validação metodológica final por revisão editorial (necessária antes de qualquer ranking inferencial).
- Verificação de todos os links/fontes e documentação final da versão das bibliotecas usada na implementação.

## XI. Entregáveis de encerramento exigidos do Work

URL do repositório; URL GitHub Pages funcional; workflow e build aprovados; release `v1.0.0`; screenshots dark/light desktop/mobile; PDF curto e completo gerados com respostas **fictícias e explicitamente marcadas como demonstração**; matriz de testes e acessibilidade; relatório de limitações; bibliografia com data de consulta. Nada de inventar URL, teste executado ou status de deploy.
