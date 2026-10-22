# Handoff, testes e revisão metodológica — V1.2

## Auditoria editorial antes do código
1. Rever todas as 20 perguntas: cenário simétrico, nenhuma alternativa persuasiva, evitar termos carregados; permitir escolhas ambivalentes.
2. Revisar `Q19` e `Q20`: admitir que oposição institucional e mobilização pacífica são simultaneamente legítimas; a redação atual pede "preferência" e não "verdadeiro democrata". Não transformar a escolha em score de democracia.
3. Definir cinco a seis dimensões e relações explicativas manualmente, com critérios públicos, versionados e testáveis. Não inserir pesos científicos fictícios.
4. Revisar verbetes históricos de nazismo, fascismo, marxismos e socialismos com fonte museológica/acadêmica e cautela com anacronismo.
5. Auditar catálogo de partidos no TSE, se incluir na V1; listar documentos sem classificação de proximidade ideológica.

## Matriz de dispositivos
| Navegador | Larguras principais | Pontos críticos |
|---|---|---|
| Chrome desktop | 1024/1280/1440/1920 | wheel zoom, zoom reset, PDF, HMR/refresh |
| Firefox desktop | 1024/1440 | SVG, wheel, export, contraste |
| Safari macOS/WebKit | 1024/1440 | texto SVG, PDF e navegação |
| Chrome Android | 320/360/390/430 | pinch, scroll sem travar, toques, PDF |
| Safari iPhone | 375/390/430 | bottom-sheet, pinch, save PDF, safe area |
| Tablet | 768/820/1024 | grid adaptativo e tipografia |

## Testes necessários
- Unit: QIDs, 20 questões, ausência de respostas padrão, sem `centro` automático, fontes existentes, mapeamento das evidências, recomeçar.
- Integration: nome opcional e esquecimento, tema, roteamento, manipulação de perguntas, resultado, PDF e bibliografia.
- E2E: iniciar sem nome, 20 escolhas variadas, voltar e trocar resposta, baixar dois relatórios, limpar tudo; simular erro em fonte quebrada e exportação; navegação por teclado.
- Touch: pelo menos um dispositivo real Android e iPhone sempre que possível; Playwright emulação complementa, mas não substitui testes físicos para pinch.
- Accessibility: WCAG 2.2 AA, axe + avaliação manual de teclado, leitor de tela, texto equivalente aos gráficos, foco/labels e redução de movimento.
- Security/Privacy: sem analytics/CDN obrigatório, sem enviar alternativas a endpoint remoto, XSS em nome personalizado e títulos, sem persistência de respostas, revisão das dependências, CSP.
- Performance: LCP < 2,5 s na condição de referência; CLS < 0,1; INP < 200 ms quando mensurável; metas, não garantias; informar condições de medição.
- Links: todas as fontes retornam conteúdo certo, não apenas HTTP 200 genérico. Fonte instável fica rotulada indisponível até revisão, sem fonte inventada.

## GitHub Actions
- `ci.yml`: npm ci, format-check, lint, typecheck, unit, accessibility básico, E2E Chromium/Firefox/WebKit, build, link checker para catálogo (com cache/fallback para indisponibilidade externa).
- `deploy.yml`: só deploy Pages após CI aprovado na branch padrão, respeitando `permissions: contents:read,pages:write,id-token:write`, artefato `dist`.
- `vite.config` define `base: '/atlas-ideias-politicas/'` quando publicado em subpath do GitHub Pages.
- Setup `Settings > Pages > Build and deployment > GitHub Actions`; resultado validado publicamente pelo Work.

## Definição de pronto (DoD)
Uma V1 está pronta se: 20 perguntas revisadas, seis gráficos úteis, G01 na home com zoom completo, dark/light AA, sites responsivos, reteste, cache de nome opt-in, nenhum cache remoto de escolhas, biblioteca com links válidos, PDFs testados, CI verde, release e Pages verificáveis. Se qualquer bloqueador falhar, Work deverá corrigir antes de lançar ou reportar claramente que a V1 ainda não foi concluída. Não declarar 100% sem erros.

## Instruções para execução futura
**Ponto de entrada:** `00_LEIA_PRIMEIRO.md` e `10_ROADMAP_MESTRE_V1_2.md`; depois consultar os arquivos 01-09 para detalhes e o mockup em `referencias/`.
**Ações permitidas quando usuário acionar Work:** criar repositório, implementar, auditar, executar testes, publicar e reportar links. Não executar essas ações durante o planejamento.
**Critério de autoridade:** quando arquivos conflitarem, 10 (roadmap mestre) > 11 (design) > 12 (handoff QA) > 01-09 (histórico). O banco de perguntas continua `07_QUESTOES_DADOS.json`, sujeito à revisão editorial antes do release.
