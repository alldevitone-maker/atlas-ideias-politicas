# Design system e telas — especificação executável V1.2

## Referência aprovada
O arquivo `referencias/mockup_dashboard_aprovado.png` é uma referência visual válida de estilo: dashboard dark navy, mapa com pontos, painéis inferiores, linha/espectro, filtros e iconografia temática. **Não reproduzir seus erros factuais nem os números inventados do exemplo.** O produto real precisa começar na linha horizontal que o usuário aprovou primeiro.

## Composição desktop (>= 1200px)
```
┌──────────────────────────────────────────────────────────────────────────┐
│ ATLAS DAS IDEIAS | Explorar | Teste | Biblioteca | Fontes | ☀︎/☾         │
├──────────────────────────────┬───────────────────────────────────────────┤
│ Chamada breve / Começar      │  G01 ESPECTRO HORIZONTAL COM ZOOM        │
│ 20 perguntas / sem login     │  extremos históricos...centro...direita │
├──────────────────────────────┴───────────────────────────────────────────┤
│ Filtros de vertentes • definições e fontes • legenda metodológica       │
├──────────────────────────────────────────────────────────────────────────┤
│ G02 MAPA 2D (8 col)                      │ fontes/contexto (4 col)      │
├──────────────────────┬──────────────────────┬────────────────────────────┤
│ G03 BARRAS           │ G04 RADAR DE COBERT.│ resultados interpretativos │
├──────────────────────┴──────────────────────┴────────────────────────────┤
│ G05 MATRIZ DE QUESTÕES            │ G06 REDE DE TENSÕES                │
├──────────────────────────────────────────────────────────────────────────┤
│ Biblioteca + metodologia + fontes + privacidade + rodapé de versão       │
└──────────────────────────────────────────────────────────────────────────┘
```
A home exibe o G01 sem resultado pessoal. Outros gráficos podem aparecer em abas `Explore` como demonstração de **conceitos**, nunca dados falsamente atribuídos a visitante.

## Composição mobile (< 768px)
- Topbar compacta, logo e menu acessível; sem sidebar que roube largura.
- Hero de até duas linhas com CTA visível.
- G01 com altura inicial 300–360px; pan/zoom pinça; legenda abaixo em acordeão; rótulos selecionados aparecem em cartão fora da área de toque.
- Layout vertical com 1 coluna e ordem: G01 -> seletor de vertentes -> biblioteca essencial -> iniciar teste.
- Resultados em seções colapsáveis; exportar PDF por ação clara. Sem rolagem horizontal da página; apenas mapa interativo dentro do viewport e tabela interna com controles próprios.
- Botões de zoom 44×44px recomendados; foco visível; tooltip tocável e com botão fechar; menu de seleção não depende de hover.

## Tipografia, tokens e iconografia
- Fonte open source com suporte completo a acentos: `Inter` ou `Source Sans 3` autopré-carregada/local; não usar fontes da imagem sem licença ou link remoto obrigatório.
- Tipos: h1 32–44 desktop / 25–31 mobile, subtítulo 16–18, texto 14–16, metadados nunca abaixo de 12px em telas normais.
- Espaçamento 4/8px, radius 10–18px, bordas #26354C dark / #D8E1ED light, sombras contidas.
- Paleta dark: `#07101E`, `#101D31`, `#DCE9F7`, `#64C4ED`, `#E9B56A`; light: `#F7F9FC`, `#FFFFFF`, `#18283C`, `#096D87`, `#9A5A1B` (todos sujeitos à validação WCAG).
- Ícones funcionais via Lucide, dentro da aplicação; ícones históricos autorais neutros via SVG com captions e fontes.
- Falhas de gráfico, font-loading, exportação e dados têm estados UI claros, sem caixas vazias ou botões falsos.

## Interação G01: espectro em linha
- Por padrão, mostrar grandes famílias em segmentos e barras; clicar num segmento cria `drill-down` da própria faixa com subcorrentes e navegação `voltar à visão geral`.
- Sempre exibir `visualização didática; não mede pessoas nem partidos com precisão`.
- Scroll do mouse com foco no gráfico controla zoom; fora dele continua rolando a página; mobile pinça usando dois dedos e deslocamento de um dedo dentro do mapa com indicação contextual.
- Zoom entre 1x e 8x, com limitação de pan; realimentação de escala, botões `+`, `-`, `Recentrar`.
- Tooltip contém nome, definição resumida, diferenças internas e link `Fontes`; clique abre drawer lateral desktop / bottom sheet mobile.
- Com zoom avançado, rótulos dispostos por nível de detalhe e colisão; preservar tamanho de fonte de leitura sempre que possível e adicionar lista filtrada que espelha os nós visíveis.
- Marcador pessoal opcional **faixa ampla/narrativa** somente se houver evidência de mais de uma dimensão; nunca mostrar `você é 82% X`.

## Cards e símbolos históricos
- Correntes não recebem imagem personalista como identificação universal.
- Em verbete comunista, usar foice/martelo histórico contextualizado e rotulado. Em vertentes democráticas, símbolo neutro original (ex: pessoas / rosa apenas com nota simbólica; rosa não é símbolo universal).
- Em verbete fascista, usar pictograma histórico fasces de modo documental (não celebratório).
- Em verbete nazista, usar símbolo abstrato editorial de arquivo (brasão retangular angular + aviso *não oficial*) sem suástica, runas, sigilos codificados ou derivações que funcionem como código de simpatizantes. Rótulo `Nazismo` sempre textual.
- Nunca codificar extrema esquerda e extrema direita como pares históricos moralmente equivalentes; esclarecer as distinções de cada corrente.

## PDFs e screenshots
- PDFs têm capa simples, nome opcional, sumário, 20 respostas, fonte por conceito, seis visuais em formato estático, nota de privacidade e aviso exploratório; relatório resumido é curto.
- Desktop e mobile têm exemplos de exportação. Efeitos de blur e gradientes não devem degradar a legibilidade dos PDFs.
- Screenshot de referência não pode ser reutilizado como gráfico final exportável: os gráficos precisam ser dados reais derivados do questionário.
