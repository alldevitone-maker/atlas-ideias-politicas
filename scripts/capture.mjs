import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import AxeBuilder from "@axe-core/playwright";
await mkdir("docs/evidence", { recursive: true });
const b = await chromium.launch();
const context = await b.newContext();
const page = await context.newPage();
const checks = [];
for (const theme of ["dark", "light"]) {
  await page.goto("http://127.0.0.1:4173/atlas-ideias-politicas/");
  await page.getByLabel("Tema visual").selectOption(theme);
  for (const width of [320, 375, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.screenshot({
      path: `docs/evidence/home-${theme}-${width}.png`,
      fullPage: true,
    });
    checks.push({
      theme,
      width,
      overflow: await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
    });
  }
}
await page.setViewportSize({ width: 1440, height: 1000 });
await page.goto("http://127.0.0.1:4173/atlas-ideias-politicas/#/teste");
await page
  .getByLabel("Como quer aparecer no relatório?")
  .fill("DEMONSTRAÇÃO · respostas fictícias");
for (let i = 0; i < 20; i++) {
  await page
    .getByRole("radio")
    .nth(i % 3)
    .check();
  await page
    .getByRole("button", {
      name: i === 19 ? "Revisar teste" : "Próxima",
      exact: true,
    })
    .click();
}
await page.getByRole("button", { name: "Ver meu relatório" }).click();
for (const theme of ["dark", "light"]) {
  await page.getByLabel("Tema visual").selectOption(theme);
  for (const width of [320, 375, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.screenshot({
      path: `docs/evidence/results-${theme}-${width}.png`,
      fullPage: true,
    });
    checks.push({
      theme,
      width,
      route: "results",
      overflow: await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
    });
  }
}
await page.setViewportSize({ width: 1440, height: 1000 });
const axe = await new AxeBuilder({ page })
  .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
  .analyze();
console.log(
  JSON.stringify(
    axe.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => ({
        target: n.target,
        summary: n.failureSummary,
      })),
    })),
    null,
    2,
  ),
);
await writeFile(
  "docs/evidence/layout-checks.json",
  JSON.stringify(checks, null, 2) + "\n",
);
page.on("console", (m) => {
  if (m.type() === "error") console.log("BROWSER ERROR", m.text());
});
page.on("pageerror", (e) => console.log("PAGE ERROR", e.message));
for (const full of [false, true]) {
  const download = page.waitForEvent("download", { timeout: 60000 });
  await page
    .getByRole("button", {
      name: full ? "PDF completo" : "PDF resumido",
      exact: true,
    })
    .click();
  const file = await download;
  await file.saveAs(`docs/evidence/demo-${full ? "completo" : "resumo"}.pdf`);
  console.log("PDF SAVED", full);
}
await b.close();
