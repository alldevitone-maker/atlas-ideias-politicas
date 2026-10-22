import { describe, it, expect } from "vitest";
import {
  questions,
  sources,
  coverage,
  statusFor,
  relationResults,
  validAnswers,
} from "../domain/model";
describe("contratos editoriais e privacidade", () => {
  it("20 IDs estáveis e nenhuma alternativa padrão; fontes resolvidas", () => {
    expect(questions.map((q) => q.id)).toEqual(
      Array.from(
        { length: 20 },
        (_, i) => `Q${String(i + 1).padStart(2, "0")}`,
      ),
    );
    for (const q of questions) {
      expect(new Set(q.options.map((o) => o.code)).size).toBe(q.options.length);
      expect(
        q.options.some((o) => o.code === "?" && o.kind === "uncertain"),
      ).toBe(true);
      expect(q).not.toHaveProperty("default");
      for (const id of q.source_ids)
        expect(sources.some((s) => s.id === id)).toBe(true);
    }
  });
  it("condicionais, ausências e incerteza nunca viram posição determinada", () => {
    const a = { Q01: "E", Q14: "?", Q19: "E" };
    expect(statusFor("Q01", a)).toBe("conditional");
    expect(statusFor("Q14", a)).toBe("uncertain");
    expect(statusFor("Q20", a)).toBe("missing");
    for (const d of coverage(a)) expect(d.declared).toBe(0);
  });
  it("a soma dos estados equivale ao total editorial por tema", () => {
    for (const a of [{}, { Q01: "A", Q02: "E", Q19: "?", Q20: "C" }] as Record<
      string,
      string
    >[])
      for (const d of coverage(a))
        expect(d.declared + d.conditional + d.uncertain + d.missing).toBe(
          d.total,
        );
  });
  it("A/B/C de Q20 não recebem hierarquia democrática", () => {
    for (const code of ["A", "B", "C"])
      expect(statusFor("Q20", { Q20: code })).toBe("declared");
  });
  it("tensão só em pares explícitos, sem classificar pessoas", () => {
    expect(
      relationResults({ Q11: "C", Q18: "A" }).find((r) => r.id === "R2")?.state,
    ).toBe("tension");
    expect(
      relationResults({ Q11: "?", Q18: "A" }).find((r) => r.id === "R2")?.state,
    ).toBe("insufficient");
    expect(
      relationResults({ Q05: "A", Q20: "C" }).find((r) => r.id === "R3")?.state,
    ).toBe("related");
  });
  it("entrada desconhecida é descartada", () => {
    expect(validAnswers({ Q01: "Z", Q99: "A", Q20: "C" })).toEqual({
      Q20: "C",
    });
  });
});
