import { readFile, writeFile } from "node:fs/promises";
const runs = [];
for (let i = 1; i <= 3; i++) {
  const report = JSON.parse(
    await readFile(`performance/mobile-${i}.json`, "utf8"),
  );
  runs.push({
    run: i,
    url: report.finalDisplayedUrl,
    fetchTime: report.fetchTime,
    lighthouseVersion: report.lighthouseVersion,
    performance: Math.round(report.categories.performance.score * 100),
    accessibility: Math.round(report.categories.accessibility.score * 100),
    bestPractices: Math.round(report.categories["best-practices"].score * 100),
    seo: Math.round(report.categories.seo.score * 100),
    lcpMs: report.audits["largest-contentful-paint"].numericValue,
    cls: report.audits["cumulative-layout-shift"].numericValue,
    environment: report.environment,
  });
}
const summary = {
  note: "Home de produção servida localmente no runner Ubuntu; emulação móvel Lighthouse padrão. Não é medição em aparelho físico ou GitHub Pages.",
  runs,
};
await writeFile(
  "performance/summary.json",
  JSON.stringify(summary, null, 2) + "\n",
);
console.log(JSON.stringify(summary, null, 2));
