# Atlas das Ideias Políticas

Plataforma educativa em português com biblioteca de correntes, 20 perguntas exploratórias e seis visualizações. Sem login, backend, analytics ou envio de respostas. Esta é uma candidata de implementação, ainda sem publicação pública e sem release estável.

## Estado verificável

- Repositório independente criado em `alldevitone-maker/atlas-ideias-politicas`, privado durante a preparação.
- G01 é visível na home, antes do questionário. Zoom D3 de 1× a 8×, pan, pinça, roda sob foco e teclado. Faixas com drill-down e verbetes com fontes.
- Questionário com revisão, omissão, incerteza, nome opcional com opt-in e limpeza explícita.
- G02 categorias de Q14 × Q19; G03 contagens de evidências; G04 cobertura editorial; G05 matriz; G06 três relações predefinidas.
- PDFs curto e completo são gerados no cliente com fonte incorporada e seis visuais. Demonstrações usam respostas fictícias e estão marcadas como tal.
- **Nenhuma URL Pages ou release v1.0.0 é anunciada antes de verificação.** Ver [QA](docs/QA.md) para resultados e limitações.

![Home no tema escuro](docs/evidence/home-dark-1440.png)

## Desenvolvimento

Node 24 e npm. Dependências travadas em `package-lock.json`.

```sh
npm ci
npm run dev
npm run typecheck
npm run lint
npm run test:unit
npm run build
npx playwright install --with-deps chromium firefox webkit
npm run test:e2e
npm run check:links
```

O desenvolvimento abre em `http://127.0.0.1:5173/atlas-ideias-politicas/`. A aplicação usa rotas por hash; atualizar qualquer rota mantém acesso ao arquivo estático e apaga as respostas temporárias.

## Arquitetura

| Camada     | Arquivos                                   | Responsabilidade                                             |
| ---------- | ------------------------------------------ | ------------------------------------------------------------ |
| Conteúdo   | `src/data/*.json`                          | Perguntas, fontes, verbetes e relações, sem respostas padrão |
| Domínio    | `src/domain/model.ts`                      | Estados, cobertura e relações determinísticas                |
| Interface  | `src/App.tsx`, `src/components/Shared.tsx` | Navegação, questionário e diálogos Radix                     |
| Gráficos   | `src/components/Charts.tsx`                | D3, SVG, zoom, tabelas e listas equivalentes                 |
| Exportação | `src/components/Report.tsx`                | React PDF carregado sob demanda e fonte local                |
| Estilos    | `src/styles.css`                           | Tokens dark/light, Tailwind, layout 320–1440 px              |
| Testes     | `src/tests`, `e2e`                         | Vitest, Testing Library, Playwright e axe                    |

## Metodologia e conteúdo

[Auditoria editorial anterior à implementação](docs/AUDITORIA_EDITORIAL.md). O banco tem cobertura desigual e não é validado psicometricamente. Não há porcentagem de identidade, recomendação de partido, evolução temporal fictícia ou classificação de extremismo. Respostas condicionais/incertas não são convertidas em centro político. Toda conclusão mostra a alternativa e o QID original.

A posição das correntes no G01 é organização editorial discutível. Não é uma medição universal ou equivalência moral entre extremos. Fascismo e nazismo são tratados documentalmente. A biblioteca é introdutória, não uma enciclopédia completa de todas as subcorrentes.

## Privacidade e segurança

As alternativas existem apenas no estado React. Não usamos localStorage, sessionStorage, IndexedDB, cookies ou parâmetros de URL para respostas. Somente tema visual e nome de exibição mediante opt-in podem ser armazenados localmente. O GitHub pode processar registros técnicos da entrega de arquivos estáticos; isso não contém as escolhas do questionário.

A CSP limita recursos à origem, exceto blobs de exportação e o módulo WASM incorporado pelo renderizador de PDF. Fontes Inter e Source Sans 3 são locais; suas licenças OFL estão em `docs`. Nome é renderizado como texto React e PDF, nunca HTML.

## Publicação

1. Confirmar disponibilidade pública do repositório e habilitar GitHub Pages com fonte GitHub Actions.
2. CI deve passar: formato, lint, TS, unit, build e E2E/axe em cinco projetos.
3. Revisar QA, PDFs e capturas. Checagem de disponibilidade de links é registrada separadamente porque fontes externas podem bloquear automação.
4. Executar manualmente **Publish V1 to Pages**. O workflow repete os gates e só depois envia `dist` ao Pages.
5. Verificar a URL HTTPS, deep links, workflow concluído e criar tag/release v1.0.0. Até lá, esta implementação não é uma V1 pública concluída.

As especificações recebidas estão preservadas em `docs/00…13` como histórico de planejamento, sem indicar trabalho já executado. Para o estado atual, prevalecem README e QA.

## Evidências

Capturas dark/light de home e resultado em 320, 375, 390, 768, 1024 e 1440 px: `docs/evidence`.

- [PDF curto de demonstração](docs/evidence/demo-resumo.pdf)
- [PDF completo de demonstração](docs/evidence/demo-completo.pdf)
- [Checagem de layout](docs/evidence/layout-checks.json)
- [Checagem de links](docs/LINK_CHECK.json)

MIT para o código original. Fontes bibliográficas são referências de terceiros, sem alegação de licença sobre os respectivos conteúdos.
