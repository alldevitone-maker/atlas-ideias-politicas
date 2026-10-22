# QA da candidata · 22/10/2026

## Executado localmente

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

## GitHub Actions confirmado

Execução [39739350738](https://github.com/alldevitone-maker/atlas-ideias-politicas/actions/runs/39739350738), commit `9b8c5e9`: 17 testes E2E passaram e 3 foram ignorados. Estes três são a injeção de gestos via CDP nos projetos Firefox, WebKit e iPhone; a mesma cobertura de jornada, PDF, zoom por teclado, rotas e axe foi executada nesses projetos. A pinça sintética via CDP passou no Chromium desktop e Android emulado.

Os ajustes finais de PDF e a documentação recebem nova execução antes da publicação. Os PDFs de demonstração possuem 3 e 8 páginas, seis visuais, links e numeração. Capturas estão em WebP no repositório.

## Privacidade testada

Jornada usa nome fictício com tags HTML literais. Sem opt-in, nenhuma chave de nome é salva. Nenhuma resposta em localStorage/sessionStorage. Requisições durante o teste limitadas ao próprio aplicativo. Opt-in de nome funciona; apagar dados remove o nome. Refazer após confirmação remove escolhas e cancelar preserva o resultado. Atualizar limpa as respostas.

## Limitações e pendências

- Firefox e WebKit locais encontraram limitações do ambiente; os mesmos projetos passaram no runner GitHub Actions com dependências de sistema instaladas. Não confundir emulação com dispositivos físicos.
- Android/iPhone: emulação Playwright, sem aparelho físico disponível. Pinça física e leitor de tela humano ainda não auditados.
- axe é uma verificação automática e não certificação WCAG 2.2 AA integral. Há alternativas em texto/tabela, foco, teclado, redução de movimento e temas.
- PDF contém texto selecionável, fonte incorporada e links, mas não é PDF/UA certificado e não possui árvore de tags de acessibilidade completa.
- Não foi feita validação científica nem revisão independente por especialistas. Biblioteca introdutória com 14 verbetes; não contém todos os subtipos do planejamento.
- Fonte S01 pode ficar temporariamente indisponível; a página de Fontes informa a diferença entre recuperação de busca e leitura direta.
- Publicação pública foi bloqueada pela revisão automática de autorização específica de visibilidade. Repositório privado preserva o trabalho. Pages e release não executados.
- Lighthouse local foi tentado três vezes, mas Chrome Launcher não abriu a porta de depuração; medição transferida ao runner, com três relatórios e resumo no artefato `qa-evidence/performance`. Não declarar pontuações antes de conferir o resultado. A auditoria de dependências também não foi concluída. Não alegar metas de performance alcançadas.

## Gates

G0: revisão interna registrada. G1–G4: implementação funcional e evidências locais, com limites acima. G5: matriz automatizada validada em CI; medições e limitações manuais estão registradas acima. G6: não publicado. Esta candidata não deve ser declarada V1.0.0 pronta.
