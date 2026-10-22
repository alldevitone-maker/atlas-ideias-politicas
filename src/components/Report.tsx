import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Svg,
  Line,
  Rect,
  Circle,
  Polyline,
  Link,
  pdf,
} from "@react-pdf/renderer";
import font from "@fontsource/source-sans-3/files/source-sans-3-latin-400-normal.woff?url";
import {
  coverage,
  questions,
  sources,
  families,
  ideologies,
  relationResults,
  statement,
  statusFor,
  statusNames,
  reportWarning,
  type Answers,
} from "../domain/model";
Font.register({ family: "SourceSans", src: font });
const s = StyleSheet.create({
  page: {
    fontFamily: "SourceSans",
    fontSize: 10,
    padding: 34,
    color: "#18283c",
    lineHeight: 1.35,
  },
  title: { fontSize: 25, lineHeight: 1.2, marginBottom: 12 },
  sub: { fontSize: 11, color: "#4c5c72", marginBottom: 10 },
  box: {
    padding: 10,
    backgroundColor: "#f1f5fa",
    borderRadius: 5,
    marginBottom: 9,
  },
  h2: { fontSize: 14, lineHeight: 1.3, marginBottom: 6, marginTop: 9 },
  h3: { fontSize: 11, lineHeight: 1.3, marginTop: 6, marginBottom: 3 },
  small: { fontSize: 8, color: "#485a70" },
  row: { flexDirection: "row", gap: 12 },
  col: { flex: 1 },
  footer: {
    position: "absolute",
    top: 800,
    left: 34,
    width: 527,
    fontSize: 8,
    lineHeight: 1.3,
    height: 14,
    color: "#4c5c72",
  },
  link: { fontSize: 8, color: "#096d87", marginBottom: 4 },
  answer: {
    marginBottom: 10,
    paddingBottom: 8,
    borderBottom: "1 solid #d8e1ed",
  },
  demo: { color: "#8b4a12", fontSize: 11, marginBottom: 6 },
});
const color = {
  declared: "#096d87",
  conditional: "#9a5a1b",
  uncertain: "#75549a",
  missing: "#75849a",
};
export function Report({
  answers,
  name,
  full,
}: {
  answers: Answers;
  name: string;
  full: boolean;
}) {
  const stats = coverage(answers),
    relations = relationResults(answers);
  const demo = name.toLocaleLowerCase().includes("demonstração");
  const c = Object.keys(answers).length;
  return (
    <Document
      title={`Atlas das Ideias Políticas · ${full ? "relatório completo" : "resumo"}`}
      author="Atlas das Ideias Políticas"
      subject="Autorreflexão exploratória, sem diagnóstico"
      language="pt-BR"
    >
      <Page size="A4" style={s.page}>
        <Text style={s.small}>
          ATLAS / RELATÓRIO {full ? "COMPLETO" : "RESUMIDO"}
        </Text>
        <Text style={s.title}>Ideias para refletir.</Text>
        <Text style={s.sub}>
          Relatório de {name.trim() || "Visitante"} ·{" "}
          {new Date().toLocaleDateString("pt-BR")} · {c}/20 preenchidas
        </Text>
        {demo && (
          <Text style={s.demo}>
            DEMONSTRAÇÃO · RESPOSTAS FICTÍCIAS DE TESTE
          </Text>
        )}
        <View style={s.box}>
          <Text>{reportWarning}</Text>
        </View>
        <Text style={s.h2}>G01 · Linha das correntes</Text>
        <Svg width="520" height="80" viewBox="0 0 520 80">
          {families.map((f, i) => (
            <Rect
              key={f.id}
              x={i * 65 + 2}
              y={22}
              width={61}
              height={19}
              rx={3}
              fill={f.color}
            />
          ))}
          {families.map((f, i) => (
            <Text
              key={f.id}
              x={i * 65 + 32}
              y={15}
              textAnchor="middle"
              style={{ fontSize: 8 }}
            >
              0{i + 1}
            </Text>
          ))}
        </Svg>
        <Text style={s.small}>
          {families.map((f, i) => `${i + 1}: ${f.name}`).join(" · ")}
        </Text>
        <Text style={s.small}>
          Organização editorial; não mede pessoas ou partidos. Não afirma
          equivalência histórica ou moral. Fontes: S05, S17, S21, S14.
        </Text>
        <Text style={s.h2}>G02 · Propriedade × coordenação</Text>
        <View style={s.row}>
          <View style={s.col}>
            <Svg width="220" height="122" viewBox="0 0 220 122">
              {["A", "B", "C", "D"].map((x, i) =>
                ["A", "B", "C", "D"].map((y, j) => (
                  <Rect
                    key={`${x}${y}`}
                    x={i * 49 + 13}
                    y={j * 25 + 7}
                    width={45}
                    height={21}
                    fill={
                      answers.Q14 === x && answers.Q19 === y
                        ? "#096d87"
                        : "#e6edf5"
                    }
                  />
                )),
              )}
            </Svg>
          </View>
          <View style={s.col}>
            <Text>Q14: {statement(questions[13], answers)}</Text>
            <Text>Q19: {statement(questions[18], answers)}</Text>
            <Text style={s.small}>
              Colunas A–D de Q14, linhas A–D de Q19. Sem célula se
              condicional/incerta/ausente. Categorias não são distâncias. Fonte:
              S05.
            </Text>
          </View>
        </View>
        <Text style={s.h2}>G03 · Evidências por tema</Text>
        {stats.map((d) => (
          <View key={d.id} style={{ marginBottom: 6 }}>
            <Text style={s.small}>
              {d.name}: {d.declared} declaradas, {d.conditional} condicionais,{" "}
              {d.uncertain} incertas, {d.missing} ausentes / {d.total}
            </Text>
            <Svg width="520" height="7" viewBox="0 0 520 7">
              {(
                ["declared", "conditional", "uncertain", "missing"] as const
              ).map((k, i, arr) => {
                const x =
                  (arr.slice(0, i).reduce((sum, key) => sum + d[key], 0) /
                    d.total) *
                  520;
                return (
                  <Rect
                    key={k}
                    x={x}
                    y={0}
                    width={(d[k] / d.total) * 520}
                    height={7}
                    fill={color[k]}
                  />
                );
              })}
            </Svg>
          </View>
        ))}
        <Text style={s.small}>
          Itens multitemáticos entram em mais de uma linha. As cores indicam
          estado da resposta, não posição. Fontes: S03, S04, S05.
        </Text>
      </Page>
      <Page size="A4" style={s.page}>
        <Text style={s.title}>Cobertura e relações</Text>
        <Text style={s.h2}>G04 · Radar de cobertura</Text>
        <View style={s.row}>
          <Svg width="245" height="200" viewBox="0 0 245 200">
            {[0.5, 1].map((k) => (
              <Polyline
                key={k}
                points={stats
                  .map(
                    (_, i) =>
                      `${122 + Math.sin((i / 8) * Math.PI * 2) * 70 * k},${100 - Math.cos((i / 8) * Math.PI * 2) * 70 * k}`,
                  )
                  .concat([`122,${100 - 70 * k}`])
                  .join(" ")}
                stroke="#b0bdcc"
                fill="none"
              />
            ))}
            <Polyline
              points={stats
                .map(
                  (d, i) =>
                    `${122 + (Math.sin((i / 8) * Math.PI * 2) * 70 * (d.total - d.missing)) / d.total},${100 - (Math.cos((i / 8) * Math.PI * 2) * 70 * (d.total - d.missing)) / d.total}`,
                )
                .concat([
                  `122,${100 - (70 * (stats[0].total - stats[0].missing)) / stats[0].total}`,
                ])
                .join(" ")}
              stroke="#096d87"
              fill="#d4eaf0"
            />
            {stats.map((d, i) => (
              <Text
                key={d.id}
                x={122 + Math.sin((i / 8) * Math.PI * 2) * 91}
                y={102 - Math.cos((i / 8) * Math.PI * 2) * 91}
                textAnchor="middle"
                style={{ fontSize: 8 }}
              >
                {d.name}
              </Text>
            ))}
          </Svg>
          <View style={s.col}>
            {stats.map((d) => (
              <Text key={d.id}>
                {d.name}: {d.total - d.missing}/{d.total} preenchidas
              </Text>
            ))}
            <Text style={s.small}>
              0 no centro, total na borda. Não mede intensidade de crença. Q19:
              um único item de coordenação. Fonte: S03.
            </Text>
          </View>
        </View>
        <Text style={s.h2}>G05 · Matriz de questões × temas</Text>
        <Text style={s.small}>
          P propriedade · R redistribuição · L liberdades · I instituições · G
          governança · C coordenação · PL pluralismo · CR critérios
        </Text>
        <View style={{ flexDirection: "row", marginTop: 5 }}>
          {[questions.slice(0, 10), questions.slice(10)].map((group, idx) => (
            <View key={idx} style={s.col}>
              {group.map((q) => (
                <View
                  key={q.id}
                  style={{ flexDirection: "row", marginBottom: 2 }}
                >
                  <Text style={{ width: 28, fontSize: 8 }}>{q.id}</Text>
                  <Text style={{ width: 70, fontSize: 8 }}>
                    {answers[q.id] ?? "—"} ·{" "}
                    {
                      {
                        declared: "decl.",
                        conditional: "cond.",
                        uncertain: "inc.",
                        missing: "aus.",
                      }[statusFor(q.id, answers)]
                    }
                  </Text>
                  <Text style={{ fontSize: 8 }}>
                    {q.dimensions
                      .map(
                        (d) =>
                          (
                            ({
                              ownership: "P",
                              distribution: "R",
                              civil_liberties: "L",
                              rule_of_law: "I",
                              governance: "G",
                              coordination: "C",
                              pluralism: "PL",
                              decision_principles: "CR",
                            }) as Record<string, string>
                          )[d],
                      )
                      .join(" · ")}
                  </Text>
                </View>
              ))}
            </View>
          ))}
        </View>
        <Text style={s.small}>
          Cada linha indica cobertura e estado, sem score. Fontes de cada item
          no relatório completo e na aplicação.
        </Text>
        <Text style={s.h2}>G06 · Rede de relações conceituais</Text>
        {relations.map((r) => (
          <View key={r.id} style={{ marginBottom: 7 }}>
            <View style={s.row}>
              <Svg width="128" height="24" viewBox="0 0 128 24">
                <Line
                  x1={20}
                  y1={12}
                  x2={108}
                  y2={12}
                  stroke={r.state === "tension" ? "#9a5a1b" : "#096d87"}
                />
                <Circle cx={20} cy={12} r={10} fill="#e6edf5" />
                <Circle cx={108} cy={12} r={10} fill="#e6edf5" />
                <Text x={20} y={15} textAnchor="middle" style={{ fontSize: 7 }}>
                  {r.a}
                </Text>
                <Text
                  x={108}
                  y={15}
                  textAnchor="middle"
                  style={{ fontSize: 7 }}
                >
                  {r.b}
                </Text>
              </Svg>
              <Text style={{ flex: 1 }}>
                {r.title}:{" "}
                {r.state === "tension"
                  ? "diferença explícita"
                  : r.state === "related"
                    ? "escolhas relacionadas"
                    : "informação insuficiente"}
                .
              </Text>
            </View>
            <Text style={s.small}>
              {r.rationale} Fontes: {r.sourceIds.join(", ")}.
            </Text>
          </View>
        ))}
        <View style={s.box}>
          <Text style={s.small}>
            Oito temas têm cobertura desigual. As alternativas podem se sobrepor
            e os cenários diferem. Revisão editorial interna, sem revisão
            independente. Não inferir partido ou extremismo. Respostas e nome
            ficam na aba, salvo nome por opt-in. Arquivos baixados ficam sob seu
            controle.
          </Text>
        </View>
        <Text style={s.small}>
          Fontes: Planalto, Constituição/1988 (S01); OECD, estatais/2024 (S02),
          heranças/2021 (S04); IDEA, metodologia/2026 (S03); Stanford,
          Socialism/2024 (S05); USHMM, Fascism e O Partido Nazista (S21/S14).
          Bibliografia clicável a seguir.
        </Text>
      </Page>
      {full && (
        <Page size="A4" style={s.page}>
          <Text style={s.title}>As vinte respostas</Text>
          <Text style={s.sub}>
            Sumário: gráficos e cobertura nas páginas anteriores; respostas
            abaixo; bibliografia ao final.
          </Text>
          {questions.map((q) => (
            <View key={q.id} style={s.answer} wrap={false}>
              <Text style={s.h3}>
                {q.id} · {q.title}
              </Text>
              <Text style={s.small}>Cenário hipotético: {q.scenario}</Text>
              <Text>{q.question}</Text>
              <Text>
                Resposta {answers[q.id] ?? "ausente"}: {statement(q, answers)}
              </Text>
              <Text style={s.small}>
                {statusNames[statusFor(q.id, answers)]} · {q.explanation}
              </Text>
              <Text style={s.small}>Fontes: {q.source_ids.join(", ")}.</Text>
            </View>
          ))}
        </Page>
      )}
      <Page size="A4" style={s.page}>
        <Text style={s.title}>Fontes e notas</Text>
        <Text style={s.sub}>
          Consulta editorial: 22/10/2026. Apoio conceitual, sem validação do
          instrumento.
        </Text>
        {sources.map((source) => (
          <View key={source.id} style={{ marginBottom: 9 }} wrap={false}>
            <Text>
              {source.id} · {source.author} · {source.title} · {source.year}
            </Text>
            <Text style={s.small}>{source.scope}</Text>
            <Link src={source.url} style={s.link}>
              {source.url}
            </Link>
          </View>
        ))}
        <Text style={s.small}>
          Privacidade: nenhuma resposta enviada. Limpar o site não elimina os
          PDFs baixados. Este relatório não substitui estudo histórico,
          avaliação jurídica ou pesquisa científica.
        </Text>
      </Page>
      {full && (
        <Page size="A4" style={s.page}>
          <Text style={s.title}>Biblioteca resumida</Text>
          <Text style={s.sub}>
            Organização editorial, sem medida de identidade. Leia as fontes para
            variações internas.
          </Text>
          {ideologies.map((i) => (
            <Text key={i.id} style={{ ...s.small, marginBottom: 10 }}>
              {i.name}: {i.definition} Fontes: {i.sourceIds.join(", ")}.
            </Text>
          ))}
        </Page>
      )}
    </Document>
  );
}
export async function downloadReport(
  answers: Answers,
  name: string,
  full: boolean,
) {
  const blob = await pdf(
    <Report answers={answers} name={name} full={full} />,
  ).toBlob();
  const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");
  const finalDocument = await PDFDocument.load(await blob.arrayBuffer());
  const footerFont = await finalDocument.embedFont(StandardFonts.Helvetica);
  const pages = finalDocument.getPages();
  pages.forEach((page, index) =>
    page.drawText(
      `Atlas das Ideias Políticas · conteúdo 1.0.0 · exploratório não validado · ${index + 1}/${pages.length}`,
      { x: 34, y: 18, size: 8, font: footerFont, color: rgb(0.3, 0.36, 0.45) },
    ),
  );
  const bytes = await finalDocument.save();
  const finalBlob = new Blob([new Uint8Array(bytes).buffer], {
    type: "application/pdf",
  });
  const url = URL.createObjectURL(finalBlob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `atlas-ideias-${full ? "completo" : "resumo"}-${new Date().toISOString().slice(0, 10)}.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30000);
}
