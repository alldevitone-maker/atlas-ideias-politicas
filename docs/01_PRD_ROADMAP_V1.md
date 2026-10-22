# PRD e Roadmap V1.0 — Atlas das Ideias Políticas

## Missão
Criar uma página web gratuita, educativa, de código aberto e acessível para explorar 20 escolhas sobre economia, propriedade, direitos civis, democracia, desigualdade e modelos institucionais, com referências verificáveis e relatório exportável. O objetivo é educação cívica e autorreflexão, não um diagnóstico científico de ideologia nem recomendação de voto.

## Decisões congeladas da V1
1. Repositório próprio sugerido: `atlas-ideias-politicas`, separado de API-Lab/Atlas municipal/outros projetos.
2. Hospedagem exclusivamente estática via GitHub Pages, publicação automatizada com GitHub Actions.
3. Sem backend, banco de dados, autenticação, registro de IP, analytics ou coleta remota de respostas.
4. Português brasileiro na V1; arquitetura preparada para i18n, mas traduções só entram quando revisadas.
5. Questionário de 20 perguntas, 4–5 alternativas, incluindo resposta de incerteza quando pertinente.
6. Resultado **multidimensional**, não ponto ideológico universal nem mapa que ponha nazismo ou fascismo como mera versão 'mais liberal economicamente'.
7. Tema claro, escuro e sistema; responsividade integral e acessibilidade WCAG 2.2 AA.
8. Gráficos interativos com pinça, arrastar, roda do mouse, botões +/−/redefinir e alternativa em texto/tabela.
9. Relatório PDF local contendo gráficos estáticos equivalentes aos interativos, respostas, referências, metodologia e limitações; exportar PNG/SVG como bônus V1.
10. Biblioteca temática com fontes oficiais/institucionais/acadêmicas; separação entre fatos históricos, conceitos, conjecturas e cenários hipotéticos.
11. Público sem login pode responder, revisar, alterar, reiniciar e baixar resultados. Nenhum resultado do criador deve aparecer pré-selecionado.
12. V1 = **um único release público**, mas trabalho dividido em gates internos; não prometer ausência absoluta de bugs.

## Usuário principal / Jornadas
- Visitante entra no link e vê objetivo, caráter exploratório, dados tratados e botão `Começar`.
- Seleciona alternativas sem cadastramento; acompanha progresso 1/20, 2/20 etc.; pode voltar, pular e revisar, com sinalização de questões ausentes.
- Ao concluir, vê perspectivas em cinco dimensões, áreas sem evidência e explicações sustentadas pelo que de fato respondeu.
- Manipula gráfico no desktop e mobile, abre legenda/fontes por toque ou clique, reseta zoom sem recarregar.
- Baixa relatório completo em PDF, inclusive via iPhone e Android; pode exportar PNG/SVG do gráfico.
- Consulta biblioteca de conceitos, cada entrada com definição, escopo, fonte, data e limitações; volta ao relatório sem perder respostas.
- Apaga sessão e resultados pelo botão `Limpar respostas`.

## Navegação / Rotas para GitHub Pages
- Preferir SPA com rota baseada em `hash` (`/#/inicio`, `/#/teste`, `/#/resultado`, `/#/biblioteca`, `/#/metodologia`, `/#/fontes`, `/#/privacidade`) para evitar 404 no refresh no GitHub Pages; alternativamente usar páginas estáticas pre-renderizadas se todos os caminhos forem testados.
- Cabeçalho acessível: marca, Começar, Biblioteca, Fontes, Alternar tema, Sobre.
- Tela inicial: hero neutro; contadores '20 perguntas'; 'sem login'; 'resultado privado no navegador'; CTA.
- Questionário: uma questão por tela com explicação colapsável, navegadores anterior/próxima, indicador de revisitar/pular, acessibilidade para rádio e textos longos.
- Resultado: visão multidimensional + zoom da região econômica escolhida, mas sem 'rótulo definitivo' nem '%' científico.
- Gráfico: pan/zoom sem bloquear rolagem da página fora do gráfico; toque em nós abre definição e fontes; seleção tem equivalente por teclado.
- PDF: relatório curto (~2 páginas) e completo (respostas + eixos + fontes), metadados de versão e data.
- Bibliografia: filtros por instituição, tema, documento e ano; links abrindo nova aba com atributos de segurança.

## Visualização política (exigência fundamental)
- Um espectro unidimensional pode figurar como **biblioteca conceitual**, não como medida objetiva de pessoas/partidos.
- Evitar organizar extremos como 'comunismo = máxima intervenção' e 'nazismo = mínima intervenção': isso está historicamente errado e mistura variáveis.
- Exibir perspectivas em dimensão econômica (propriedade privada / social), coordenação (mercados / planejamento), redistribuição (menor / maior), instituições (poder sem controle / fiscalizado), liberdade pessoal (mais restrição / mais autonomia), sempre como **descrições condicionadas** às respostas.
- Não usar cores de partidos como se fossem identidade da pessoa; esquema cromático perceptualmente distinto e legenda textual.
- Diferenciar 'socialismo democrático', 'comunismo revolucionário', 'marxismo-leninismo', 'fascismo', 'nazismo', 'liberalismo político', 'liberalismo econômico' com fontes e ressalvas históricas.
- Partido brasileiro: catálogo opcional com TSE (nome, programa, estatuto), sem ranqueamento 'parecido com você' ou posicionamento de partido como verdade científica.
- Não comparar usuário a grupos extremistas por simples posição sobre impostos/estatais. Critérios históricos independentes.

## Estrutura científica
- 20 itens formam instrumento **exploratório, NÃO VALIDADO**; sem alegação de precisão estatística, percentual de socialismo, QI político ou diagnóstico.
- Revisar redação em língua portuguesa: enunciados sem vieses, alternativas equilibradas e sem elogios/estigmas embutidos.
- O original tinha distribuição desigual por dimensão: tratar explicitamente insuficiência de evidência e baixa cobertura em temas pouco perguntados.
- Configurar mapeamento de cada alternativa em código declarativo versionado **após revisão por especialistas**, sem pesos arbitrários disfarçados de ciência.
- 'Não sei / depende' não deve contar como meio da escala e não deve ser automaticamente identificado como centro político.
- Registrar contradições apenas entre proposições comparáveis. Mudança de resposta pode ser atualização legítima, não hipocrisia.
- Sem cálculo de partido/candidato provável, sem inferência de voto.

## Critérios de aceite funcionais (bloqueiam release)
A01: Link público abre na home por GitHub Pages; refresh funciona em TODAS as rotas.
A02: Todas as 20 perguntas aparecem completas, sem duplicação, e navegam por teclado/toque.
A03: Revisão altera resultados de forma reprodutível; nenhuma resposta pessoal do desenvolvedor vem selecionada.
A04: Incertas/omitidas aparecem como 'não determinado', sem score automático de centro.
A05: Gráfico contém zoom por pinça, wheel, drag, +/−, reset; não recorta rótulos; comportamento de rolagem da página validado.
A06: Todo elemento interativo do gráfico tem alternativa por teclado e em tabela acessível.
A07: Light/dark/sistema respeitam contraste AA sem flicker, com preferência visual persistida só localmente.
A08: PDF abre corretamente em Chrome/Firefox/Safari mobile, apresenta acentos, fontes incorporadas e gráficos nítidos, links/citações válidos e data/versão.
A09: Fontes verificadas com URL oficial/acadêmica e descrição, sem links quebrados; toda afirmação factual substantiva tem lastro.
A10: Nenhuma resposta/transcrição enviada a servidores externos, analytics, telemetria ou third-party embeds.
A11: Limpar respostas remove estado sensível da memória de sessão; exports são ações conscientes do usuário.
A12: WCAG 2.2 AA aprovado em auditoria automatizada e revisão manual essencial.
A13: GitHub Actions executa lint/types/unit/e2e/build antes de deploy; falha bloqueia publicação.
A14: Lighthouse/perf e matriz de dispositivos aceitas conforme QA; sem overflow horizontal; tipografia fluida.
A15: README, arquitetura, fontes, licença, limitações, instruções de deploy e testes completos.
A16: Deploy público validado com URL real e link em README; release/tag v1.0.0.
A17: Todas as 20 questões possuem ID imutável, categoria, referências e explicação, sem codificação de scores escondida.
A18: Página demonstra diferença entre 'resultado descritivo' e 'afirmação científica', sem selo diagnóstico.

## Fases de execução (gates internos, uma entrega pública)
G0 — Congelar conteúdo: revisão das 20 perguntas, hipóteses, definições, fontes, riscos e datas; nenhuma implementação antes do aceite editorial.
G1 — Arquitetura e UI/UX: design tokens, Figma opcional, telas mobile-first e invariantes de estado.
G2 — Motor de perguntas: dados JSON + tipagem/validação + navegação/revisão/limpeza.
G3 — Motor interpretativo: dimensões, evidências, linguagem calibrada e casos insuficientes.
G4 — Gráficos: D3-SVG, zoom pan pinch wheel, labels, acessibilidade e queda graciosa.
G5 — Biblioteca + relatório: referências, estrutura de literatura, PDF e exportações.
G6 — Segurança/qualidade: auditoria de privacidade, WCAG, navegadores, performance, erros, SEO básico.
G7 — GitHub Pages: workflow protegido, validação URL pública, tag V1.0.0, documentação de handoff.
**Não publicar release intermediário público**: branch de trabalho e CI podem existir; release estável só após G7.

## Não faz parte da V1
- Coleta de dados, contas, login social, analytics, dashboard coletivo, ranking de pessoas/partidos, previsão de voto, mapeamento automático de partidos, chatbot político, notícias ao vivo, comentários e backend.
- Alegar instrumentação científica validada ou 100% de ausência de bugs.
- Publicação no GitHub nesta etapa de planejamento; Work fará posteriormente com autorização.

## Metas não funcionais
- Mobile-first desde 320px; checkpoints 320/375/390/768/1024/1440px e orientação paisagem.
- Core Web Vitals / Lighthouse: alvo de desempenho ≥90 mobile, acessibilidade ≥95, boas práticas ≥95, SEO ≥90 em medições reproduzíveis (metas de engenharia, não garantias).
- Interações gráficas com FPS fluido nos dispositivos de referência; dependências carregadas sob demanda para preservar a home.
- Zero erros de TypeScript, lint, unit e E2E na branch de release; corrigir falhas detectadas, registrar limitações reais.


## Adendo aprovado de UX e visualizações
Especificação obrigatória em `09_UX_GRAFICOS_NOME_E_RETESTE.md`: seis visualizações distintas (atlas da home, zoom das vertentes, economia em 2 dimensões, perfil categórico, matriz Q1–Q20 e rede de tensões), home com zoom didático, nome opcional com cache por consentimento explícito, refazer teste ilimitado, gestos mobile/desktop, símbolos sóbrios, novos critérios A19–A25. Este adendo complementa e prevalece em caso de divergência de escopo entre arquivos.
