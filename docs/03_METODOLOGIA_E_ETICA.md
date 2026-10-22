# Metodologia, neutralidade, ética e limitações

## Natureza
É um **instrumento de reflexão cívica e educativa**, NÃO uma escala clínica, teste psicométrico validado, pesquisa eleitoral ou inferência de voto. A ideia é mostrar as proposições que a pessoa escolheu e suas relações com conceitos fundamentados. Não gerar 'você é 82% socialista' nem afirmação de identidade definitiva.

## Estrutura multidimensional proposta
- `ownership` — propriedade de grandes empresas e meios de produção; Estado ≠ controle democrático de trabalhadores.
- `distribution` — tributação, desigualdade e herança; não confundir pobreza com desigualdade.
- `civil_liberties` — privacidade, consentimento, liberdade de consciência, riscos assumidos por adultos.
- `rule_of_law` — aplicação impessoal da lei, limites do governo, independência judicial, uso de provas.
- `governance` — direção e fiscalização de empresas públicas, participação dos trabalhadores.
- `coordination` — papel de preços de mercado, planejamento central ou participativo.
- `pluralism` — direitos da oposição, diferenças religiosas, alternância democrática.
- `decision_principles` — pragmatismo declaratório e princípios de justiça; não atribuir centro à indecisão.

Apresentação inicial: cards para essas dimensões, sem numeração de posição política; opcional 2D exploratório com rótulos descritivos. Uma posição numérica precisa só é possível se houver protocolo publicado, justificativas de mapeamento, revisão independente e evidência mínima suficiente; **não é requisito da V1**.

## Motor interpretativo
1. Resposta -> lista transparente de posições textuais (`evidenceTags`), não identidade personalíssima.
2. Cada bloco de resultado contém: enunciado da posição, IDs das respostas de suporte, eventual resposta tensionante, pergunta não respondida, fontes das definições.
3. Toda inferência deve poder ser reproduzida lendo `results/rules.json`. Nenhum GPT, API opaca ou texto gerado probabilisticamente em tempo real.
4. Se poucos itens da dimensão foram respondidos ou perguntas conflitantes: renderizar `Informação insuficiente para uma posição conclusiva` e exibir ambas as posições, sem penalização.
5. Caso Q11=C e Q18=A, não diagnosticar viés/hypocrisia: exibir `As respostas sobre provas ilícitas diferiram entre os cenários, que também tinham formulações distintas`.
6. Q20 A/B/C são maneiras constitucionalmente compatíveis de oposição. Não converter B/C em sinal automático de autoritarismo.
7. Q19 B/C não são pontos colineares de um eixo único: mercado versus planejamento e participação versus tecnocracia são conceitos diferentes.
8. Separar propriedade privada familiar, riqueza, produção, mecanismos jurídicos e legitimidade da política econômica.
9. Evitar confundir fascismo/nazismo com 'mais mercado' ou com uma quantidade maior de poder estatal; explicar características históricas em biblioteca contextualizada.
10. Partidos: apenas registro oficial/estatutos TSE e comparações documentadas e datadas, SEM 'seu partido recomendado'.

## Curadoria das questões
- Todas as perguntas fictícias identificadas como cenário hipotético; fonte serve aos conceitos envolvidos, não valida a premissa imaginada.
- Checar paralelismo das alternativas; evitar que apenas uma pareça 'moralmente correta'.
- Teste de compreensão com voluntários de diferentes repertórios; registrar problemas sem guardar opiniões identificáveis.
- Incluir opção 'Não sei / prefiro não responder' transversal à pergunta no UI quando faltar alternativa equivalente; essa escolha não aciona interpretação nem média arbitrária.
- Texto português claro, glossário opcional ao clicar em termos como 'propriedade social', 'centralização', 'vigilância em massa'.
- Evitar hierarquizar em escala única todas as vertentes e extremos; mapa 1D só referência didática com indicação de limitações.

## Privacidade (obrigatória)
- Opiniões políticas podem ser dados pessoais sensíveis pela LGPD [S13].
- Não coletar nome, e-mail, telefone, geolocalização, identificadores persistentes ou respostas do quiz.
- Não enviar answers ao GitHub, Google Analytics, pixels sociais, CDN com recursos externos dinâmicos, modelos de IA ou servidores terceiros.
- Sessão React local, em RAM. Persistir tema visual (não sensível) é permitido; resultados não devem ir para localStorage por padrão.
- Se usuário decide exportar PDF, browser gera arquivo sem upload; aviso de que o usuário assume controle de seu arquivo baixado.
- Sem parâmetros de URL com opiniões políticas; compartilhar somente link público para a página inicial, nunca respostas individuais.
- `Limpar respostas` zera memória da aplicação e confirma estado vazio.
- Evitar dependências de fontes remotas/iframe analítico no site; empacotar assets próprios/licenciados.

## Ética e política editorial
- Não sugerir voto, candidato, partido, doação ou ativismo direcionado a quem responda.
- Não inferir orientação política de idade, raça, religião, localidade, gênero, profissão ou outros dados pessoais.
- Não nomear nazismo/fascismo/comunismo autoritário como categorias obtidas de um eixo econômico isolado.
- Distinguir fatos históricos de posicionamentos acadêmicos contestados; expor fontes para divergências.
- Sem classificações moralizantes do participante; linguagem neutra e sem perguntas manipulativas.
- Registrar versões de conteúdo, fonte e regras e oferecer changelog público para correções.

## Modelo mínimo de dados interpretativos (a detalhar após revisão)
`Question { id, title, scenario, question, options[], dimensions[], source_ids[] }`
`Answer { questionId, optionCode | null }`
`Evidence { axis, claim, questionIds[], optionCodes[], counterEvidenceIds[], sourceIds[] }`
`Result { status: descriptive|insufficient, evidence[], tensions[], missingDimensions[], version }`
`Reference { id, author, title, year, type: official|academic|technical, url, topic, accessedAt, limitations }`

Nunca afirmar que todas as 20 perguntas medem as dimensões igualmente. Algumas delas concentram mais itens econômicos; resultados devem ser descritos com essa limitação.
