# PROMPT ÚNICO PARA COLAR NO CHATGPT WORK

Quero que você construa e publique a V1.0.0 do repositório independente `atlas-ideias-politicas`, uma plataforma pública e gratuita chamada **Atlas das Ideias Políticas**. O objetivo é educação política e autorreflexão com 20 perguntas, seis módulos gráficos interativos, ampla biblioteca de conceitos, fontes oficiais e acadêmicas, e PDFs exportáveis localmente.

**Anexo:** `atlas_ideias_politicas_roadmap_v1_2_final.zip`. Leia TODOS os arquivos. O documento mestre é `10_ROADMAP_MESTRE_V1_2.md`, complementado pelo design aprovado `11_DESIGN_SYSTEM_TELAS_V1_2.md`, critérios QA `12_HANDOFF_QA_V1_2.md` e mockup `referencias/mockup_dashboard_aprovado.png`. O mockup orienta o visual, não valida dados nem percentuais de exemplo.

Requisitos prioritários:
1. O **gráfico horizontal/espectro detalhado** estará no centro da home e será zoomável por mouse wheel, arrastar, pinça no celular, +/−/reset e acessível por teclado, com drill-down nas vertentes e fontes clicáveis.
2. Preserve a estética dark profissional de dashboard do mockup; implemente também light mode igualmente excelente, mobile-first, design fluido e iconografia consistente.
3. Seis módulos de gráficos verdadeiros. **Proibido inventar percentuais de identidade ou evolução ideológica**. Não inferir extremismo ou partido eleitoral a partir da posição sobre estatais.
4. Símbolos históricos: ☭ contextualizado apenas em verbetes comunistas; fasces com finalidade educativa no fascismo; nazismo **sem suástica**, apenas ícone abstrato editorial *não oficial* e legenda histórica. Nada de celebrar símbolos extremistas.
5. Questionário 20Q, sem login. Nome de exibição opcional/cache apenas por permissão. Respostas nunca enviadas, registradas remotamente ou persistidas no dispositivo por padrão. Revisar/retomar na aba, refazer à vontade, apagar dados.
6. Fontes oficiais/acadêmicas por item; PDF curto e completo com gráficos acessíveis, fontes e aviso de questionário exploratório não validado.
7. Stack React + TS estrito + Vite + Tailwind + Radix/shadcn + D3 + React PDF; GitHub Pages + Actions; GitHub sem backend.
8. Audite questões e interpretação ANTES de programar. Corrija vieses de alternativas e cite as fontes reais. Q19 e Q20 do criador ainda não foram respondidas e **NÃO** devem ser pré-preenchidas para visitantes.
9. Rode testes unitários, integração, E2E navegadores/dispositivos, WCAG 2.2 AA e QA dos PDFs. Obtenha capturas desktop/mobile e corrija defeitos críticos antes do deploy.

Faça implementação completa e **uma única publicação V1** após todos os gates. Entregue URL real do repositório, URL HTTPS pública do Pages, link do Actions bem-sucedido, tag/release v1.0.0, screenshots, PDF de teste marcado como demo, relatório de QA e limitações honestas. Não invente trabalho executado ou URLs. Se faltar autorização de uma ação externa, solicite-a no fluxo do Work e prossiga com as etapas permitidas.
