# Arquitetura, UX, PDF, GitHub e qualidade

## Decisões técnicas
- Node.js LTS compatível com ferramentas atuais; React + TypeScript strict; Vite; Tailwind CSS; Radix/shadcn somente onde ajudam acessibilidade.
- Estado mínimo com React Context/useReducer; Zustand somente se a complexidade justificar. Não usar persistência automática de respostas.
- Rotas SPA com `HashRouter` ou roteador de hash equivalente; URL tipo `https://<usuario>.github.io/atlas-ideias-politicas/#/resultado`.
- Assets com `import.meta.env.BASE_URL` para suportar `base: '/atlas-ideias-politicas/'`; se repositório username.github.io, base `/`.
- Gráficos SVG desenhados com D3 e componentes React; funções de projeção/axes/ticks puras e testáveis.
- Uso de d3-zoom: touch pinch, wheel, drag, scaleExtent, translateExtent; reset por botão e duplo toque; nunca permitir zoom infinito ou label ilegível.
- PDF por @react-pdf/renderer, com assets incorporados/localizados; snapshot gráfico SVG/PNG em alta resolução, ou vetor quando estável; fonte licenciada incorporada ao build; Unicode português; URLs em notas.
- CSV/JSON de respostas NÃO é obrigatório, pois opinião política é sensível; exportações de gráfico (SVG/PNG) são opcionais sob ação explícita do usuário.
- Nenhum endpoint REST, função serverless, token privado nem serviço Render na V1.

## Módulos / camadas
```
src/
  app/               # bootstrap, router, theme provider, error boundary
  pages/             # home, quiz, results, library, sources, methodology, privacy
  components/        # header, footer, question, source badge, modal, glossary
  features/quiz/     # reducer, navigation, validation, review
  features/results/  # descriptive rules, evidence extraction, contradictions
  features/charts/   # d3 scales, panzoom, SVG, alternatives accessible
  features/export/   # PDF templates, chart snapshot, file naming
  content/           # loader and schemas for questions, sources, ideologies
  styles/            # design tokens, responsive, color schemes
  test/              # fixtures/helpers
public/
  data/v1/            # 20 questions and bibliography JSON (if not TS bundled)
.github/workflows/
  ci.yml              # tests/build
  deploy.yml          # deploy on main after checks
README.md
LICENSE
```

## UI/UX quality
- Visual editorial/institucional de qualidade; não replicar propaganda partidária.
- Escalas tipográficas fluidas; tokens para superfícies, tinta, accents, borders, focus, contrast, transitions.
- Dark/light/system; contraste WCAG e preferência de movimento reduzido.
- Mobile bottom navigation onde fizer sentido; desktop sidebar contextual na biblioteca/resultados.
- Eixos e pontos interativos com hover/focus/tap; tooltip nunca o único canal de informação; modal/sheet para definição, fontes, exemplo.
- Botões de zoom +, −, redefinir, ajustar tela, alto contraste; no mobile área de gesto identificada, com rótulo 'Use dois dedos para ampliar'.
- Roda de mouse só amplia dentro do gráfico sob foco/hover; página mantém scroll natural fora do gráfico.
- Gráfico em SVG responsivo; manter tamanho mínimo dos rótulos mesmo em zoom; legenda fixa fora da região transformada.
- Reconciliação de touch-action para não bloquear rolagem vertical externa.
- Usuário pode alternar rapidamente resultado de dimensão e abrir mapa de correntes por zoom.
- Tabela equivalente de definições e evidências para leitor de tela, inclusive sem JS em fallback estático editorial.

## Exportar PDF
- Botões: `Baixar resumo em PDF` e `Baixar relatório completo em PDF`.
- Resumo contém título, data, versão, notas metodológicas, gráficos estáticos/legendas, posições explicitamente escolhidas e lacunas.
- Completo contém sumário, 20 respostas (ou indicação de não respondida), gráficos por dimensão, evidências com IDs Q, explicações, fontes e limitações.
- PDF com fonte UTF-8 portuguesa e paginação estável; evitar URLs quebradas, tabelas cortadas e fontes ilegíveis; texto selecionável.
- PDF exportado em ambos os temas deve ser visualmente legível, mas pode usar tema de impressão independente mais seguro.
- Gerar sem enviar dados a servidores; testar Android Chrome e Safari iPhone pelo menos com emulação mais revisão real se disponível.
- Nome de arquivo: `atlas-ideias-resultado-AAAA-MM-DD.pdf`. O usuário não precisa colocar nome pessoal.

## GitHub Pages / GitHub Actions
- Branch principal `main`; branch de trabalho PR; branch protection e checks CI obrigatórios.
- Build para Pages com Vite base corretamente configurado; deploy oficial `actions/configure-pages`, `actions/upload-pages-artifact`, `actions/deploy-pages`, versões estáveis/pinadas no momento da execução.
- Permissões mínimas no deploy: `contents:read`, `pages:write`, `id-token:write`; checks separados; sem PAT desnecessário.
- `npm ci`, `npm run lint`, `npm run typecheck`, `npm run test:unit`, `npm run build`, `npm run test:e2e`, `npm run test:a11y` com falha impedindo deploy.
- Versionar package-lock, Dependabot alertas, permissões mínimas, nenhum segredo em `VITE_*` client-side.
- GitHub Pages não executa backend; evitar SSR e rotas que dependem de reescrita de servidor.
- README com instruções completas, preview, arquitetura, fontes, QA, limitações, changelog e link público após deploy real.

## Plano de testes
**Unitários:** renderização e schema das 20 questões, opções únicas, mapeamento de resposta, regras interpretativas, missing data, dualidade Q11/Q18, pdf data-mapper, serialização não persistente, lógica do tema.
**Integração:** navegação idempotente, voltar/avançar, alterar resposta, reiniciar, biblioteca+quiz, fontes, PDF download, erro de fonte.
**E2E:** Chromium desktop, Firefox desktop, WebKit desktop; pixel 320/375/390/768/1024/1440; aparelhos Android/iOS emulados Playwright; jornada de 20 questões; troca tema; refresh routes; zoom gráfico; PDF.
**Acessibilidade:** axe-core, tab/shift-tab, leitor de tela em cenários representativos, foco visível, contraste AA, alvo mínimo, sem dependência de cor, redução de movimento, zoom da página até 200%/400% onde aplicável.
**Privacidade:** DevTools/rede sem envio de respostas, sem analytics, sem params sensíveis, cookies desnecessários ou persistência de answers; limpar sessão.
**PDF:** renderizar arquivos de teste em imagem, revisar quebras/acentos/links, conteúdo acessível selecionável e aspecto em diferentes navegadores.
**CI:** cobertura significativa dos motores de negócio, falhas de regras críticas com test cases determinísticos; sem metas irreais de 100% cobertura como garantia zero bugs.
**Performance:** lazy import D3/PDF, evitar hydration pesada, fontes próprias licenciadas; lighthouse em build de produção, medir ao menos 3 vezes em dispositivo/ambiente controlado.
**Security:** lockfile, audit de dependências, Content Security Policy viável para Pages, referrer policy quando possível, sem XSS via markdown/JSON, enlaces externos seguros.

## Entrega e prova final
- Publicar 1 versão estável `v1.0.0`, com URL real operante e README claro.
- Fornecer links: repositório GitHub, site GitHub Pages, workflow verde, release, changelog e relatório de QA.
- Capturas mobile e desktop com light/dark, PDF de exemplo **fictício**, checklist de fontes e limitações.
- Falhas ou bloqueios documentados; não afirmar '100% livre de erros' sem justificativa; preferência à qualidade comprovada por gates.
