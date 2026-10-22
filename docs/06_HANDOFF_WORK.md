# Prompt de handoff — ChatGPT Work

## Instrução para colar no Work quando for desenvolver

Desenvolva e publique **Atlas das Ideias Políticas** como aplicação web completa V1.0.0 em **um release público**, usando exclusivamente este pacote de planejamento como escopo inicial.

Antes de escrever código:
1. Leia TODOS os arquivos do pacote, especialmente `01_PRD_ROADMAP_V1.md`, `02_QUESTIONARIO_20.md`, `03_METODOLOGIA_E_ETICA.md`, `05_ARQUITETURA_TESTES.md` `08_RASTREABILIDADE.md` e `09_UX_GRAFICOS_NOME_E_RETESTE.md`.
2. Verifique a existência de repositório GitHub `atlas-ideias-politicas`. Se não existir, crie um repositório dedicado; não use nem altere meus outros repositórios.
3. Audite editorialmente as 20 perguntas por neutralidade, equilíbrio, clareza, e cobertura temática. Corrija vieses antes da implementação. Mantenha mapa de equivalência com as perguntas originais.
4. Verifique novamente todas as referências com fontes primárias oficiais e acadêmicas. Não invente datas, números, partidos ou pontuações científicas.
5. Desenhe arquitetura, contratos JSON e estados da UI. Não iniciar pontuação/ranking ideológico sem metodologia verificável.

Implemente:
- React, TypeScript strict, Vite e UI profissional acessível, responsiva, dark/light/system.
- 20 perguntas com retomada de navegação e revisão, sem valores pré-selecionados para usuários novos.
- Biblioteca de correntes explicadas de forma plural, conteúdo com fonte por afirmação, glossário, divergências e limitações.
- Seis visualizações SVG/D3 explicitamente enumeradas em `09_UX_GRAFICOS_NOME_E_RETESTE.md`, incluindo atlas interativo COM zoom na home (sem pré-preencher resultado pessoal), zoom das vertentes, economia em 2 dimensões, perfil por temas, matriz Q1–Q20 e rede de tensões. Implementar pinch, drag, mouse wheel, zoom controls, reset e alternativa acessível de teclado.
- Nome de exibição opcional, cache do nome SOMENTE por opt-in, privacidade das respostas, e opção de refazer teste ilimitadas com confirmação.
- PDF gerado localmente contendo perguntas/respostas, gráficos, evidências e bibliografia. Exportação SVG/PNG como bônus, se estável.
- **Nenhuma coleta remota de respostas; opinião política é dado sensível.** Sem autenticação, database, analytics, trackers ou LLM para classificar o visitante.
- GitHub Actions CI + deploy Pages, rotas funcionando por hash e Vite `base` para URL do repo.
- Testes completos e automatizados com Vitest, Playwright, axe e auditoria manual.

Critérios de encerramento:
- Nenhuma funcionalidade obrigatória incompleta, todas as 20 perguntas acessíveis, gráficos e PDFs funcionais, informações consistentes com fontes e URL pública confirmada.
- Conclua G0–G7 internamente. Se não puder publicar por permissão, reporte exatamente o bloqueio e entregue artefatos/testes, sem simular publicação.
- Entregue links reais para repo, Pages, workflow, release `v1.0.0`, relatório de QA, capturas desktop/mobile e um PDF de amostra com respostas fictícias.
- Evite narrativas partidárias, propaganda eleitoral, recomendações de voto e ranqueamentos políticos.

## Observações
- O questionário foi desenvolvido primeiro em conversa exploratória. Suas alternativas originais têm vieses possíveis e distribuição desigual de temas; essa limitação deve aparecer no relatório e na UI.
- O Work poderá ajustar redações mantendo equivalência de tema, mas deve registrar todas as mudanças editoriais.
- Links públicos só devem ser informados após publicação verificada.
