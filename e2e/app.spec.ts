import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
async function quiz(page: import("@playwright/test").Page) {
  if (!page.url().endsWith("#/teste")) await page.goto("#/teste");
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
}
test("jornada completa, privacidade, edição, PDFs, reteste e limpeza", async ({
  page,
}, testInfo) => {
  const requests: string[] = [];
  page.on("request", (r) => {
    requests.push(r.url());
  });
  await page.goto("");
  await page
    .getByRole("button", { name: "Começar teste", exact: true })
    .click();
  await expect(page.getByRole("radio", { checked: true })).toHaveCount(0);
  await expect(
    page.getByLabel("Lembrar meu nome neste dispositivo"),
  ).not.toBeChecked();
  await page
    .getByLabel("Como quer aparecer no relatório?")
    .fill("DEMONSTRAÇÃO · <b>fictício</b>");
  await quiz(page);
  await expect(
    page.getByRole("heading", { name: /Relatório de DEMONSTRAÇÃO/ }),
  ).toBeVisible();
  const stored = await page.evaluate(() => ({
    local: { ...localStorage },
    session: { ...sessionStorage },
  }));
  expect(stored.local["atlas:name"]).toBeUndefined();
  expect(stored.session).toEqual({});
  expect(
    Object.keys(stored.local).filter((k) => k !== "atlas:theme"),
  ).toHaveLength(0);
  expect(
    requests.every(
      (u) =>
        u.startsWith("http://127.0.0.1:4173/") ||
        u.startsWith("data:") ||
        u.startsWith("blob:"),
    ),
  ).toBe(true);
  await page
    .getByRole("button", { name: "Editar respostas", exact: true })
    .click();
  await page.getByRole("button", { name: "Editar Q19", exact: true }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Mercados e planejamento numa economia socializada",
  );
  await page.getByRole("radio").last().check();
  await page.getByRole("button", { name: /Revisar 20 respostas/ }).click();
  await page.getByRole("button", { name: "Ver meu relatório" }).click();
  await expect(
    page.getByText(
      "Informação insuficiente: escolha uma posição determinada em Q14 e Q19",
      { exact: false },
    ),
  ).toBeVisible();
  for (const full of [false, true]) {
    const download = page.waitForEvent("download");
    await page
      .getByRole("button", {
        name: full ? "PDF completo" : "PDF resumido",
        exact: true,
      })
      .click();
    const file = await download;
    await file.saveAs(
      testInfo.outputPath(full ? "demo-completo.pdf" : "demo-resumo.pdf"),
    );
  }
  await page
    .getByRole("button", { name: "Refazer teste", exact: true })
    .click();
  await page.getByRole("button", { name: "Cancelar", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: /Relatório de/ }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Refazer teste", exact: true })
    .click();
  await page.getByRole("button", { name: "Confirmar", exact: true }).click();
  await expect(page.getByRole("radio", { checked: true })).toHaveCount(0);
  await page.getByLabel("Lembrar meu nome neste dispositivo").check();
  expect(
    await page.evaluate(() => localStorage.getItem("atlas:name")),
  ).toContain("DEMONSTRAÇÃO");
  await page.goto("#/privacidade");
  await page
    .getByRole("button", { name: "Apagar todos os dados", exact: true })
    .click();
  await page.getByRole("button", { name: "Confirmar", exact: true }).click();
  expect(
    await page.evaluate(() => localStorage.getItem("atlas:name")),
  ).toBeNull();
  await page.goto("#/resultado");
  await expect(
    page.getByText("Nenhuma resposta foi registrada.", { exact: false }),
  ).toBeVisible();
});
test("zoom, teclado, conceito e rotas", async ({ page }) => {
  await page.goto("");
  const chart = page.getByRole("group", { name: /linha das correntes/ });
  await page
    .getByRole("button", { name: "Ampliar linha das correntes", exact: true })
    .click();
  await expect(page.getByLabel("Escala do gráfico")).not.toHaveText("1.0×");
  await chart.focus();
  await chart.press("0");
  await expect(page.getByLabel("Escala do gráfico")).toHaveText("1.0×");
  await chart.press("+");
  await expect(page.getByLabel("Escala do gráfico")).not.toHaveText("1.0×");
  await page.getByRole("button", { name: /01 Esq. radical/ }).click();
  await expect(
    page.getByRole("button", { name: "Voltar à visão geral" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Comunismo", exact: true }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("button", { name: "Fechar conceito" }).click();
  for (const path of [
    "biblioteca",
    "fontes",
    "metodologia",
    "privacidade",
    "teste",
    "resultado",
  ]) {
    await page.goto(`#/${path}`);
    await page.reload();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
});
test("acessibilidade automatizada em home, quiz, resultado e temas", async ({
  page,
}) => {
  for (const theme of ["dark", "light"]) {
    await page.goto("");
    await page.reload();
    await page.addInitScript(
      (t) => localStorage.setItem("atlas:theme", t),
      theme,
    );
    for (const path of ["inicio", "teste", "resultado"]) {
      if (path === "resultado") await quiz(page);
      else await page.goto(`#/${path}`);
      await page.getByLabel("Tema visual").selectOption(theme);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(results.violations).toEqual([]);
    }
  }
});

test("gestos: roda com foco, arraste, pinça e exportação vetorial", async ({
  page,
  context,
  browserName,
}) => {
  test.skip(
    browserName !== "chromium",
    "Injeção de dois contatos via CDP, complementar à emulação WebKit.",
  );
  await page.goto("");
  const canvas = page.getByRole("group", { name: /linha das correntes/ });
  await canvas.focus();
  const box = await canvas.boundingBox();
  if (!box) throw new Error("Gráfico sem área");
  await page.mouse.move(box.x + box.width / 2, box.y + 100);
  await page.mouse.wheel(0, -280);
  await expect(page.getByLabel("Escala do gráfico")).not.toHaveText("1.0×");
  await page.mouse.down();
  await page.mouse.move(box.x + box.width / 2 + 50, box.y + 100);
  await page.mouse.up();
  await page
    .getByRole("button", { name: "Recentrar linha das correntes", exact: true })
    .click();
  await expect(page.getByLabel("Escala do gráfico")).toHaveText("1.0×");
  const cdp = await context.newCDPSession(page);
  const cy = box.y + 150,
    cx = box.x + box.width / 2;
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [
      { x: cx - 30, y: cy },
      { x: cx + 30, y: cy },
    ],
  });
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchMove",
    touchPoints: [
      { x: cx - 70, y: cy },
      { x: cx + 70, y: cy },
    ],
  });
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchEnd",
    touchPoints: [],
  });
  await expect(page.getByLabel("Escala do gráfico")).not.toHaveText("1.0×");
  const download = page.waitForEvent("download");
  await page
    .getByRole("button", {
      name: "Exportar SVG linha das correntes",
      exact: true,
    })
    .click();
  expect((await download).suggestedFilename()).toBe("atlas-grafico.svg");
});
