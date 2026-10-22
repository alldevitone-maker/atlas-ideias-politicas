# Complemento obrigatório V1 — Home, gráficos, símbolos, nome e reteste

**Status:** escopo fechado para implementação posterior pelo Work. Este documento complementa `01_PRD_ROADMAP_V1.md` e `05_ARQUITETURA_TESTES.md`; não implica deploy.

## Decisões novas de produto

1. **Seis visualizações gráficas distintas** na V1, com propósito verificável, fontes e alternativa acessível em texto. A home mostra a primeira já interativa, em modo didático/demonstração, SEM simular um resultado pessoal. O mesmo motor gráfico é reutilizado nas demais telas.
2. **UI caprichada, mas sóbria:** design editorial + cartografia exploratória, ícones Lucide consistentes, microinterações rápidas, contraste AA, modo claro/escuro/sistema; sem símbolos partidários como identificação da pessoa. Nazismo e fascismo são tratados apenas em verbetes históricos contextualizados, sem ícones decorativos celebratórios.
3. **Refazer teste:** botão sempre acessível no resultado; diálogo de confirmação; limpar as respostas sensíveis do estado local; iniciar um novo ciclo com todas as questões vazias; preferências visuais e apelido podem permanecer conforme escolha explícita. Deve ser possível revisar o teste anterior ANTES de reiniciar.
4. **Nome opcional:** perguntar na tela inicial `Como você quer aparecer no seu relatório?` com apelido/nome de exibição OPCIONAL; nunca requerer nome civil ou e-mail. Campo vazio gera `Visitante`. Prévia mostra nome apenas na UI/PDF, não em URL/analytics. Não usar automaticamente o nome do criador ou de quem já conversou com ChatGPT.
5. **Cache do nome somente opt-in:** checkbox desmarcada `Lembrar meu nome neste dispositivo` salva **apenas o nome de exibição** em localStorage (sem data pessoal adicional). Sem opt-in, nome fica apenas em memória da aba. Botões `Esquecer meu nome` e `Apagar tudo` removem a chave local. Informar em linguagem clara que outras pessoas que usem o dispositivo podem vê-lo. Nome armazenado com limite de 60 caracteres; sanitizar como texto, nunca HTML.
6. **Respostas políticas NÃO serão salvas por padrão** em localStorage, sessionStorage, IndexedDB ou URL: ficam em estado volátil da aba. Avisar que atualizar/fechar a aba pode apagar o teste. Proposta opcional de retomar teste em versão futura requer projeto específico de privacidade. Não persistir nem histórico comparativo entre sessões na V1.
7. **Segunda tentativa na mesma sessão:** se útil, comparar em memória apenas os dois resultados agregados enquanto a aba está aberta e o usuário escolher `Comparar com tentativa anterior`; nunca gravar ou compartilhar automaticamente. Se não for implementável sem ambiguidade, priorizar apenas o reteste limpo e remover a opção comparativa, nunca apresentar botão inerte.

## 6 visualizações obrigatórias

| # | Nome visível | Página | Interação | O que revela / cuidados |
|---|---|---|---|---|
| 1 | Atlas das correntes | **Home** e Biblioteca | Arrastar, pinça, scroll/zoom, clique/toque nos nós | Mapa conceitual das correntes e famílias históricas, *sem* lugar pessoal pré-calculado. Disposição temática explicitamente editorial; fonte por nó. |
| 2 | Zoom das vertentes | Biblioteca e Resultado | Drill-down de esquerda/centro/direita, pan/zoom, filtros | Subcorrentes detalhadas, diferenças internas, relações conceituais; **não** tratar ideologias como pontos cientificamente calibrados numa régua única. |
| 3 | Economia em duas dimensões | Resultado | Zoom e troca de descrições | **Propriedade** (privada/social) e **coordenação** (mercados/planejamento) como eixos conceituais, com escolhas justificadas por perguntas Q; sem coordenadas numéricas pseudo-precisas. |
| 4 | Perfil por temas | Resultado | Seleção de tema, abrir evidências | Cinco/seis linhas categóricas: propriedade, coordenação, redistribuição, liberdades, instituições e justiça; distinguir `há evidência`, `misto`, `insuficiente`, sem porcentagens arbitrárias. |
| 5 | Matriz das 20 respostas | Resultado | Filtrar por dimensão e selecionar Q | Grade categórica de cobertura, respostas registradas, incerteza e justificativa; **cor nunca única forma de comunicação**. |
| 6 | Rede de convergências e tensões | Resultado | Aproximar, inspecionar arestas, abrir Q originais | Relações **explicadas e revisadas** entre proposições comparáveis. Diferenciar tensões, posições complementares e revisão legítima, nunca diagnosticar viés/hipocrisia. |

**A home não cria sétimo gráfico:** reutiliza o `Atlas das correntes` em modo público de exploração. Antes de responder, a pessoa vê informações didáticas, nunca a posição do autor da plataforma. Resultados particulares somente depois das respostas.

## Gestos do mapa e acessibilidade

- Telas móveis: pinch de dois dedos, pan, toque que abre painel contextual, botões `+`, `−`, `Centralizar`; área de interação com instruções e gesto que não impede scroll normal da página.
- Desktop: mouse wheel quando o ponteiro está dentro da área explicitamente interativa; arrastar; duplo clique; botões; controles com teclado; gesto de scroll fora da área mantém navegação da página.
- Alvos de toque adequados, escalas de zoom limitadas, legendas fixas e rótulos que não se tornem microscópicos; opção de alto contraste e redução de movimento.
- Cada diagrama oferece alternativa textual/tabela, com correspondência de conteúdo e links de fontes.
- Exportar gráficos para PDF como vetor quando viável e imagens de alta resolução em fallback, nunca captura pixelada com controles da UI.

## Linguagem visual e símbolos

- Identidade visual original: *atlas cartográfico + laboratório cívico*, evitando campanha ou material partidário.
- Ícones: globo = contexto mundial; balança = justiça; prédio público = Estado; fábrica = propriedade; mãos/grupo = cooperação e trabalho; cadeado = privacidade; livro = fontes; lupa = investigação; bússola = explorar; sol/lua = tema; arquivo = PDF.
- Paleta: grafite/índigo com ciano contido e acento âmbar no dark; off-white/azul-petróleo com acento cobre no light. Não codificar `esquerda=vermelho, direita=azul` como verdade ou preferência pessoal sem legenda neutra.
- Aparência: hero com mapa SVG interativo e animação discreta; cartões com hierarquia editorial; tipografia responsiva; navegação por abas no resultado; transições com `prefers-reduced-motion`.
- Fonte acadêmica/histórica acessível em cada ponto do mapa (referência, instituição, data/ano, link e limites); nenhuma imagem externa como dependência crítica.

## Jornada detalhada

**Home:** marca, título, descritor neutro, 20 perguntas, sem login, botão `Iniciar`, mapa ao vivo didático com zoom, `Explorar conceitos`, `Metodologia`, `Fontes`, `Privacidade`, seletor de tema. Campo opcional `Como quer aparecer no relatório?` e checkbox desmarcada `Lembrar meu nome neste dispositivo`.

**Questionário:** 1 Q por tela; progresso, voltar/avançar, pular sem atribuir valor ao centro, pausa apenas enquanto aba aberta, resumo de revisão ao finalizar. `Recomeçar` com confirmação.

**Resultados:** título com nome opcional, resumo honesto, gráfico panorâmico, 5 gráficos adicionais, cartões de evidência, `Alterar respostas`, `Refazer teste`, `Baixar PDF resumido`, `Baixar PDF completo`, `Consultar fontes`, `Apagar meus dados`.

**Reiniciar:** pedir confirmação `Iniciar novo teste? As respostas atuais serão apagadas desta sessão.`; guardar nome apenas se autorizado; formulário reinicia sem respostas selecionadas; após novo teste, PDF representa somente a tentativa atual.

## Critérios adicionais de aceitação

- A19: exatamente 6 **tipos** de visualização, sem gráficos decorativos; home já contém atlas com zoom real, sem resultado de usuário pré-preenchido.
- A20: gesto pinça Android/iOS, zoom wheel mouse e pan; scroll do documento não bloqueado; reset e alternativa por teclado/tabela.
- A21: nome opcional vazio = `Visitante`; checkbox de armazenamento desmarcada; armazenar só nome e tema quando autorizado/conforme UX; nenhuma resposta sensível persistida.
- A22: nome não entra em URLs, logs, tracking ou chamadas HTTP; `Esquecer meu nome` e `Apagar tudo` funcionam; nomes com caracteres especiais não causam XSS ou PDF inválido.
- A23: teste pode ser refeito ilimitadamente; diálogo confirma descarte; novo teste começa sem alternativas marcadas e PDFs não contêm respostas antigas.
- A24: bibliografia em cada gráfico/verbete; sem classificação precisa não validada ou ranking de semelhança com partidos/figuras políticas.
- A25: tela inicial e resultados possuem screenshots/QA dark/light em 320, 375, 390, 768, 1024 e 1440 px; layout e ícones consistentes.

## Bloqueadores remanescentes para enviar ao Work

1. Respostas pessoais Q19/Q20 ainda não confirmadas pelo criador; não preencher como padrão público.
2. Fazer revisão metodológica das 20 alternativas e regras interpretativas; eliminar enviesamentos e resultados pseudo-científicos.
3. Resolver referências por questão em lista de fontes confiáveis, com links vivos e datas; versão dos dados registrada.
4. Definir e registrar mapeamento de resposta -> evidência de modo explícito e testável, com resultado `indeterminado` quando insuficiente.
5. Validar mockups mobile e desktop, UX zoom e pdf, antes do release único.
6. Verificar permissão para repo e deploy no GitHub conectado; não presumir URL existente.
