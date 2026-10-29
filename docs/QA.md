# QA do Atlas · atualização em 29/10/2026

## Executado localmente em 22/10/2026

| Verificação        | Evidência                                                   | Resultado                                                                                                           |
| ------------------ | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| TypeScript estrito | `npm run typecheck`                                         | Passou                                                                                                              |
| ESLint             | `npm run lint`                                              | Passou                                                                                                              |
| Build de produção  | `npm run build`                                             | Passou; módulo PDF separado sob demanda, aviso de tamanho do bundle                                                 |
| Unit/integration   | `npm run test:unit`                                         | 8 testes passaram                                                                                                   |
| Chromium desktop   | Playwright: jornada, zoom/rotas, axe em ambos os temas      | 3 testes passaram                                                                                                   |
| Responsividade     | 24 capturas, 6 larguras × 2 temas × 2 telas                 | Sem overflow horizontal da página                                                                                   |
| PDF                | Downloads reais via UI, pdfinfo, pdftotext e render Poppler | 3 páginas no resumo, 8 no completo; acentos, seis gráficos, Q01–Q20, paginação e links conferidos após renderização |
| Fontes             | `docs/LINK_CHECK.json`                                      | 11 respostas 200; Planalto 503 local. Texto relevante confirmado na busca oficial                                   |
| Dependências       | `npm audit --omit=dev`                                      | Endpoint de auditoria retornou 503; não alegar ausência de vulnerabilidades                                         |

## Publicação e acesso público

O repositório está público. A execução [39892345207](https://github.com/alldevitone-maker/atlas-ideias-politicas/actions/runs/39892345207) concluiu os jobs `verify` e `deploy` com sucesso. A publicação terminou em 23/10/2026 às 00:01, horário de São Paulo, no commit `764fc77`. O job de validação registrou 8 testes unitários e 17 E2E aprovados, com 3 ignorados pelos limites de CDP descritos abaixo.

Em 29/10/2026, a URL [pública do Atlas](https://alldevitone-maker.github.io/atlas-ideias-politicas/) foi aberta no navegador sem login. Foi conferido o percurso inicial → questionário → revisão → relatório com uma alternativa fictícia de incerteza; o relatório preservou 19 ausências e não atribuiu uma posição política. Também foram conferidos o tema escuro, a Biblioteca e a atualização direta de `#/resultado`: o aplicativo carregou e exibiu o estado vazio esperado, sem erro 404, apagando o progresso temporário.

[Captura da página publicada](evidence/public-home.jpg).

O README da main contém acesso destacado ao dashboard, tutorial de uso, explicação das visualizações e aviso sobre o progresso temporário. Esta atualização de documentação não modifica a aplicação publicada. Não há tag/release estável anunciada neste relatório.

## GitHub Actions confirmado

Execução [39739350738](https://github.com/alldevitone-maker/atlas-ideias-politicas/actions/runs/39739350738), commit `9b8c5e9`: 17 testes E2E passaram e 3 foram ignorados. Estes três são a injeção de gestos via CDP nos projetos Firefox, WebKit e iPhone; a mesma cobertura de jornada, PDF, zoom por teclado, rotas e axe foi executada nesses projetos. A pinça sintética via CDP passou no Chromium desktop e Android emulado.

Os ajustes finais de PDF passaram na execução [39740517315](https://github.com/alldevitone-maker/atlas-ideias-politicas/actions/runs/39740517315), commit `764fc77`, e novamente no workflow de publicação. Os PDFs de demonstração possuem 3 e 8 páginas, seis visuais, links e numeração. Capturas estão em WebP no repositório.

## Privacidade testada

Jornada usa nome fictício com tags HTML literais. Sem opt-in, nenhuma chave de nome é salva. Nenhuma resposta em localStorage/sessionStorage. Requisições durante o teste limitadas ao próprio aplicativo. Opt-in de nome funciona; apagar dados remove o nome. Refazer após confirmação remove escolhas e cancelar preserva o resultado. Atualizar limpa as respostas.

## Limitações e pendências

- Firefox e WebKit locais encontraram limitações do ambiente; os mesmos projetos passaram no runner GitHub Actions com dependências de sistema instaladas. Não confundir emulação com dispositivos físicos.
- Android/iPhone: emulação Playwright, sem aparelho físico disponível. Pinça física e leitor de tela humano ainda não auditados.
- axe é uma verificação automática e não certificação WCAG 2.2 AA integral. Há alternativas em texto/tabela, foco, teclado, redução de movimento e temas.
- PDF contém texto selecionável, fonte incorporada e links, mas não é PDF/UA certificado e não possui árvore de tags de acessibilidade completa.
- Não foi feita validação científica nem revisão independente por especialistas. Biblioteca introdutória com 14 verbetes; não contém todos os subtipos do planejamento.
- Fonte S01 pode ficar temporariamente indisponível; a página de Fontes informa a diferença entre recuperação de busca e leitura direta.
- Lighthouse 13.5.0 foi conferido nos logs da execução 39740517315: performance 95/94/95, acessibilidade automática 100/100/100, boas práticas 100/100/100 e SEO 100/100/100. LCP: 2358/2494/2343 ms; CLS aproximadamente 0,000129 nas três rodadas. São medições móveis simuladas da home de produção servida no runner Ubuntu, não medições no GitHub Pages ou em aparelho físico. Relatórios no artefato `qa-evidence/performance`.
- `npm ci` no workflow de publicação registrou zero vulnerabilidades na data daquela execução; isso não substitui auditoria contínua de dependências.

## Gates

G0: revisão interna registrada. G1–G4: implementação funcional e evidências locais, com limites acima. G5: matriz automatizada validada em CI; medições e limitações manuais estão registradas acima. G6: aplicação publicada e acesso público conferido, com as limitações manuais acima. Tag/release v1.0.0 não foi criada.
