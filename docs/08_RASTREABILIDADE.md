# Matriz de rastreabilidade — requisito / módulo / verificação / fonte

| ID | Requisito | Componente | Evidência de aceite | Fonte |
|---|---|---|---|---|
| R01 | 20 perguntas | quiz/data | validação schema + 20 IDs + E2E | S01–S05 |
| R02 | Privacidade de opiniões políticas | privacy/quiz | rede sem uploads, sem persistência pessoal | S13 |
| R03 | Zoom/drag/wheel/pinch | charts/d3 | Playwright desktop/mobile + controles | S10, S07 |
| R04 | Resultado descritivo multidimensional | results | unit tests de regras e evidências | S03, S05 |
| R05 | Igualdade/oposição/Estado de Direito | pages/library | revisões editoriais e links | S01, S03 |
| R06 | Gestão das estatais | pages/library | fontes oficiais e conceitos | S02 |
| R07 | Herança/tributação | pages/library | fontes e ressalvas jurídicas | S01, S04 |
| R08 | Correntes históricas extremistas | library | definições contextuais, sem inferência mecânica | S14, S05 |
| R09 | Registro de partidos (sem ranking) | library/sources | metadados TSE e link | S06, S16 |
| R10 | Responsividade | ui/themes | 320–1440px, iOS/Android emulado | S07, S11 |
| R11 | Dark/light/system | ui/themes | E2E e contraste | S07 |
| R12 | PDF local | export/pdf | teste visual e conteúdo, nenhum upload | S12, S13 |
| R13 | GitHub Pages | deployment | site público + workflows verdes | S08, S09 |
| R14 | Testes automáticos | tests | unit/integration/e2e/axe | S11, S15 |
| R15 | Metodologia e avisos | results/methodology | texto auditável + evidence IDs | S03, S05 |
| R16 | Remover respostas | quiz/state | testes de limpeza da sessão | S13 |
| R17 | Rotas acessíveis por refresh | app/router | E2E deep link após refresh | S08, S09 |
| R18 | PDF com referências | export/pdf | links verificáveis no relatório | S01–S14 |

## Conteúdo e validação temática
- Eixo propriedade: Q01, Q03, Q04, Q13, Q14, Q15, Q17.
- Eixo redistribuição: Q12, Q13, Q15, Q17.
- Eixo instituições: Q05, Q07, Q10, Q11, Q16, Q18, Q20.
- Eixo liberdades: Q05–Q09.
- Eixo coordenação econômica: Q19; **cobertura baixa**, mostrar essa limitação.
- Critério de decisão: Q02; **não pontuar**.
- Partidos políticos: nenhum item mede filiação ou preferência de voto.

## Critérios de bloqueio
- Informação ideológica sem fonte ou conceito sem atribuição: release bloqueado.
- Teste que infere extremismo por uma resposta isolada: release bloqueado.
- Indicador oculto de porcentagem de compatibilidade: release bloqueado.
- Gráfico inacessível por teclado ou gesto mobile quebrado: release bloqueado.
- PDF sem fonte/acentos/links corretos: release bloqueado.
- Upload invisível de respostas ou analytics: release bloqueado.
- Rotas 404 após refresh ou Pages configurado em base errado: release bloqueado.
