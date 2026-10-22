import { readFile, writeFile } from "node:fs/promises";
const sources = JSON.parse(
  await readFile(new URL("../src/data/sources.json", import.meta.url), "utf8"),
);
const report = [];
for (const s of sources) {
  try {
    const r = await fetch(s.url, {
      signal: AbortSignal.timeout(15000),
      headers: { "User-Agent": "Atlas educational source verification" },
    });
    const text = await r.text();
    const title =
      text.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? "";
    report.push({
      id: s.id,
      url: s.url,
      status: r.status,
      title,
      ok:
        r.ok && !!title && !/access denied|forbidden|robot check/i.test(title),
    });
  } catch (e) {
    report.push({ id: s.id, url: s.url, ok: false, error: String(e.message) });
  }
}
await writeFile(
  new URL("../docs/LINK_CHECK.json", import.meta.url),
  JSON.stringify(
    {
      checkedAt: new Date().toISOString(),
      note: "Disponibilidade técnica não valida conteúdo ou instrumento.",
      sources: report,
    },
    null,
    2,
  ),
);
for (const r of report)
  console.log(`${r.id} ${r.ok ? "OK" : "REVISAR"} ${r.status ?? r.error}`);
if (report.some((r) => !r.ok)) process.exitCode = 1;
