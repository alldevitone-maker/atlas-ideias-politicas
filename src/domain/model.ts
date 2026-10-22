import questionData from "../data/questions.json";
import sourceData from "../data/sources.json";
import ideologyData from "../data/ideologies.json";
import relationData from "../data/relations.json";
export type Kind = "declared" | "conditional" | "uncertain";
export type Question = {
  id: string;
  title: string;
  scenario: string;
  question: string;
  options: { code: string; label: string; kind: Kind }[];
  dimensions: string[];
  source_ids: string[];
  explanation: string;
};
export const questions = questionData.questions as Question[];
export const sources = sourceData;
export const ideologies = ideologyData;
export const relations = relationData;
export type Ideology = (typeof ideologies)[number];
export type Answers = Record<string, string>;
export const dimensions: Record<string, string> = {
  ownership: "Propriedade",
  distribution: "Redistribuição",
  civil_liberties: "Liberdades",
  rule_of_law: "Instituições",
  governance: "Governança",
  coordination: "Coordenação",
  pluralism: "Pluralismo",
  decision_principles: "Critérios",
};
export const families = [
  {
    id: "historical-left",
    name: "Esquerda radical histórica",
    short: "Esq. radical",
    color: "#cc9cf5",
  },
  {
    id: "socialist",
    name: "Esquerda socialista",
    short: "Socialista",
    color: "#d69bd1",
  },
  {
    id: "democratic-left",
    name: "Esquerda democrática",
    short: "Esq. democr.",
    color: "#b69bfa",
  },
  {
    id: "center-left",
    name: "Centro-esquerda",
    short: "Centro-esq.",
    color: "#8aaff5",
  },
  { id: "center", name: "Centro", short: "Centro", color: "#80c8d7" },
  {
    id: "center-right",
    name: "Centro-direita",
    short: "Centro-dir.",
    color: "#89c6b6",
  },
  { id: "right", name: "Direita", short: "Direita", color: "#d2bf8c" },
  {
    id: "historical-right",
    name: "Extrema direita histórica",
    short: "Ext. direita",
    color: "#d9ac88",
  },
];
export function optionFor(id: string, answers: Answers) {
  return questions
    .find((q) => q.id === id)
    ?.options.find((o) => o.code === answers[id]);
}
export function statusFor(id: string, answers: Answers): Kind | "missing" {
  return optionFor(id, answers)?.kind ?? "missing";
}
export function coverage(answers: Answers) {
  return Object.entries(dimensions).map(([id, name]) => {
    const qs = questions.filter((q) => q.dimensions.includes(id));
    return {
      id,
      name,
      total: qs.length,
      declared: qs.filter((q) => statusFor(q.id, answers) === "declared")
        .length,
      conditional: qs.filter((q) => statusFor(q.id, answers) === "conditional")
        .length,
      uncertain: qs.filter((q) => statusFor(q.id, answers) === "uncertain")
        .length,
      missing: qs.filter((q) => statusFor(q.id, answers) === "missing").length,
      questionIds: qs.map((q) => q.id),
    };
  });
}
export function relationResults(answers: Answers) {
  return relations.map((r) => {
    const a = answers[r.a],
      b = answers[r.b];
    let state: "insufficient" | "tension" | "related" = "insufficient";
    if (
      statusFor(r.a, answers) === "declared" &&
      statusFor(r.b, answers) === "declared"
    ) {
      state = "related";
      if (
        r.id === "R1" &&
        ((a === "A" && ["C", "D"].includes(b)) || (a === "D" && b === "A"))
      )
        state = "tension";
      if (
        r.id === "R2" &&
        ((a === "C" && b === "A") || (a === "A" && b === "B"))
      )
        state = "tension";
      if (
        r.id === "R3" &&
        ((a === "A" && b === "D") || (a === "C" && ["A", "B", "C"].includes(b)))
      )
        state = "tension";
    }
    return { ...r, state };
  });
}
export const statusNames = {
  declared: "Posição declarada",
  conditional: "Condicional",
  uncertain: "Não sei / não responder",
  missing: "Ausente",
};
export function statement(q: Question, answers: Answers) {
  return optionFor(q.id, answers)?.label ?? "Questão não respondida.";
}
export const reportWarning =
  "Questionário exploratório não validado. As respostas descrevem preferências em cenários hipotéticos; não medem identidade política, extremismo ou intenção de voto.";
export function validAnswers(input: Answers) {
  return Object.fromEntries(
    Object.entries(input).filter(([id, code]) =>
      questions.some(
        (q) => q.id === id && q.options.some((o) => o.code === code),
      ),
    ),
  );
}
