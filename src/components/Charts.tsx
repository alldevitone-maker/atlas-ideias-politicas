import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import {
  select,
  zoom,
  zoomIdentity,
  type ZoomBehavior,
  type ZoomTransform,
  lineRadial,
  curveLinearClosed,
} from "d3";
import {
  Plus,
  Minus,
  LocateFixed,
  Move,
  ArrowLeft,
  ArrowRight,
  Download,
} from "lucide-react";
import {
  coverage,
  dimensions,
  families,
  ideologies,
  questions,
  relationResults,
  statusFor,
  statusNames,
  statement,
  type Answers,
  type Ideology,
} from "../domain/model";
import { SourceLinks } from "./Shared";
export function ZoomCanvas({
  label,
  height = 310,
  children,
  onExport = true,
}: {
  label: string;
  height?: number;
  children: (t: ZoomTransform, w: number) => ReactNode;
  onExport?: boolean;
}) {
  const svg = useRef<SVGSVGElement>(null),
    host = useRef<HTMLDivElement>(null),
    behavior = useRef<ZoomBehavior<SVGSVGElement, unknown>>(null);
  const [width, setWidth] = useState(800),
    [transform, setTransform] = useState(zoomIdentity);
  const id = useId();
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) =>
      setWidth(Math.max(240, entries[0].contentRect.width)),
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  useEffect(() => {
    const el = svg.current;
    if (!el) return;
    const z = zoom<SVGSVGElement, unknown>()
      .extent([
        [0, 0],
        [width, height],
      ])
      .translateExtent([
        [0, 0],
        [width, height],
      ])
      .scaleExtent([1, 8])
      .touchable(() => true)
      .filter((e) =>
        e.type === "wheel" ? document.activeElement === el : !e.button,
      )
      .on("zoom", (e) => setTransform(e.transform));
    behavior.current = z;
    select(el).call(z).call(z.transform, zoomIdentity);
    return () => {
      select(el).on(".zoom", null);
    };
  }, [width, height]);
  const scale = (factor: number) => {
    if (svg.current && behavior.current)
      select(svg.current).call(behavior.current.scaleBy, factor);
  };
  const reset = () => {
    if (svg.current && behavior.current)
      select(svg.current).call(behavior.current.transform, zoomIdentity);
  };
  const pan = (x: number, y = 0) => {
    if (svg.current && behavior.current)
      select(svg.current).call(
        behavior.current.translateBy,
        x / transform.k,
        y / transform.k,
      );
  };
  function exportSvg() {
    if (!svg.current) return;
    const copy = svg.current.cloneNode(true) as SVGSVGElement;
    copy.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    const styles = getComputedStyle(svg.current);
    copy.setAttribute(
      "style",
      `--surface:${styles.getPropertyValue("--surface")};--surface-2:${styles.getPropertyValue("--surface-2")};background:${styles.getPropertyValue("--surface")};color:${styles.color};font-family:Arial,sans-serif`,
    );
    copy
      .querySelectorAll("text")
      .forEach((el) => el.setAttribute("fill", styles.color));
    const blob = new Blob([new XMLSerializer().serializeToString(copy)], {
      type: "image/svg+xml",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "atlas-grafico.svg";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <div ref={host} className="zoom-host">
      <div className="chart-toolbar">
        <span>
          <Move size={14} />{" "}
          <output aria-label="Escala do gráfico">
            {transform.k.toFixed(1)}×
          </output>
        </span>
        <div>
          <button
            className="icon-button"
            onClick={() => scale(1.4)}
            aria-label={`Ampliar ${label}`}
          >
            <Plus size={18} />
          </button>
          <button
            className="icon-button"
            onClick={() => scale(1 / 1.4)}
            aria-label={`Reduzir ${label}`}
          >
            <Minus size={18} />
          </button>
          <button
            className="icon-button"
            onClick={reset}
            aria-label={`Recentrar ${label}`}
          >
            <LocateFixed size={18} />
          </button>
          {onExport && (
            <button
              className="icon-button"
              onClick={exportSvg}
              aria-label={`Exportar SVG ${label}`}
            >
              <Download size={17} />
            </button>
          )}
        </div>
      </div>
      <svg
        ref={svg}
        className="chart-canvas"
        role="group"
        aria-roledescription="gráfico interativo"
        aria-labelledby={id}
        tabIndex={0}
        viewBox={`0 0 ${width} ${height}`}
        style={{ height }}
        onPointerDown={() => svg.current?.focus()}
        onKeyDown={(e) => {
          if (
            [
              "+",
              "=",
              "-",
              "0",
              "ArrowLeft",
              "ArrowRight",
              "ArrowUp",
              "ArrowDown",
            ].includes(e.key)
          ) {
            e.preventDefault();
            if (e.key === "+" || e.key === "=") scale(1.4);
            if (e.key === "-") scale(1 / 1.4);
            if (e.key === "0") reset();
            if (e.key === "ArrowLeft") pan(60);
            if (e.key === "ArrowRight") pan(-60);
            if (e.key === "ArrowUp") pan(0, 60);
            if (e.key === "ArrowDown") pan(0, -60);
          }
        }}
      >
        <title id={id}>
          {label}. Use mais e menos para zoom, setas para deslocar, zero para
          recentrar. Lista equivalente abaixo.
        </title>
        <defs>
          <pattern
            id={`${id}-grid`}
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M40 0H0V40"
              fill="none"
              stroke="currentColor"
              opacity=".07"
            />
          </pattern>
        </defs>
        <rect width={width} height={height} fill={`url(#${id}-grid)`} />
        {children(transform, width)}
      </svg>
      <p className="chart-hint">
        Arraste ou use pinça. Para a roda do mouse, clique no gráfico. Teclado:
        + / −, setas e 0.
      </p>
    </div>
  );
}
export function Spectrum({ onSelect }: { onSelect: (i: Ideology) => void }) {
  const [family, setFamily] = useState<string | null>(null);
  const visible = family
    ? ideologies.filter((i) => i.family === family)
    : ideologies;
  return (
    <section className="panel spectrum" id="espectro">
      <div className="section-heading">
        <div>
          <span className="eyebrow">G01 / CARTOGRAFIA CONCEITUAL</span>
          <h2>Linha das correntes</h2>
        </div>
        <span className="tag">Mapa editorial</span>
      </div>
      <p className="muted">
        Uma porta de entrada para ideias que não cabem em uma única régua.
      </p>
      {family && (
        <button className="text-button" onClick={() => setFamily(null)}>
          <ArrowLeft size={16} /> Voltar à visão geral
        </button>
      )}
      <ZoomCanvas
        key={family ?? "all"}
        label="linha das correntes"
        height={300}
      >
        {(t, w) => {
          const n = family ? 1 : families.length;
          const pad = 28,
            span = (w - pad * 2) / n;
          const active = family
            ? families.filter((f) => f.id === family)
            : families;
          const nodes = visible.map((i) => {
            const fi = active.findIndex((f) => f.id === i.family);
            const siblings = visible.filter((j) => j.family === i.family);
            const rank = siblings.findIndex((j) => j.id === i.id);
            return {
              i,
              x: t.applyX(
                pad + span * (fi + (rank + 1) / (siblings.length + 1)),
              ),
              y: rank % 2 === 0 ? 105 : 205,
              color: active[fi].color,
            };
          });
          let lastEnd = -999;
          return (
            <>
              <line
                x1={0}
                x2={w}
                y1={155}
                y2={155}
                stroke="currentColor"
                opacity=".25"
              />
              {active.map((f, j) => {
                const x = t.applyX(pad + j * span),
                  sw = span * t.k;
                return (
                  <g key={f.id}>
                    <rect
                      x={x + 2}
                      y={143}
                      width={Math.max(0, sw - 4)}
                      height={24}
                      rx={4}
                      fill={f.color}
                      opacity=".65"
                    />
                    <text
                      x={x + sw / 2}
                      y={158}
                      textAnchor="middle"
                      fill="#07101e"
                      fontSize={12}
                      fontWeight="700"
                    >
                      {String(j + 1).padStart(2, "0")}
                    </text>
                  </g>
                );
              })}
              {nodes.map(({ i, x, y, color }) => {
                const size = Math.min(200, i.name.length * 7 + 14),
                  show =
                    x > size / 2 && x < w - size / 2 && x - size / 2 > lastEnd;
                if (show) lastEnd = x + size / 2;
                return (
                  <g key={i.id}>
                    <line
                      x1={x}
                      x2={x}
                      y1={155}
                      y2={y}
                      stroke={color}
                      opacity=".6"
                    />
                    <circle
                      role="button"
                      tabIndex={0}
                      aria-label={`Abrir conceito ${i.name}`}
                      onClick={() => onSelect(i)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          onSelect(i);
                        }
                      }}
                      cx={x}
                      cy={y}
                      r={6}
                      fill={color}
                      stroke="var(--surface)"
                      strokeWidth={3}
                    />
                    {show && (
                      <text
                        onClick={() => onSelect(i)}
                        style={{ cursor: "pointer" }}
                        x={x}
                        y={y === 105 ? 82 : 232}
                        textAnchor="middle"
                        fill="currentColor"
                        fontSize="12"
                      >
                        {i.name}
                      </text>
                    )}
                  </g>
                );
              })}
              <text
                x={24}
                y={278}
                fill="currentColor"
                fontSize="12"
                opacity=".7"
              >
                Esquerdas
              </text>
              <text
                x={w - 24}
                y={278}
                fill="currentColor"
                fontSize="12"
                textAnchor="end"
                opacity=".7"
              >
                Direitas
              </text>
            </>
          );
        }}
      </ZoomCanvas>
      <div className="family-pills" aria-label="Aprofundar faixas do espectro">
        {families.map((f, j) => (
          <button
            key={f.id}
            aria-pressed={family === f.id}
            className="family-pill"
            onClick={() => setFamily(family === f.id ? null : f.id)}
          >
            <span style={{ background: f.color }} />
            {String(j + 1).padStart(2, "0")} {f.short}
          </button>
        ))}
      </div>
      <details className="legend">
        <summary>Como ler esta linha</summary>
        <p>
          Visualização didática; não mede pessoas nem partidos com precisão. As
          faixas organizam a biblioteca, não calculam equivalência moral ou
          distância histórica. Autoritarismo é uma questão independente da
          propriedade econômica. Socialismo não equivale automaticamente a
          estatismo; fascismo e nazismo não são extremos de liberalismo
          econômico.
        </p>
        <SourceLinks ids={["S05", "S17", "S21", "S14"]} />
      </details>
      <div className="node-list" aria-label="Conceitos da faixa selecionada">
        {visible.map((i) => (
          <button key={i.id} onClick={() => onSelect(i)}>
            {i.name}
            <ArrowRight size={13} />
          </button>
        ))}
      </div>
    </section>
  );
}
export function Economy({ answers }: { answers: Answers }) {
  const [swap, setSwap] = useState(false);
  const x = answers.Q14,
    y = answers.Q19;
  const valid =
    ["A", "B", "C", "D"].includes(x) && ["A", "B", "C", "D"].includes(y);
  const labelsX = [
    "Privada regulada",
    "Mista",
    "Socialização gradual",
    "Social predominante",
  ];
  const labelsY = [
    "Mercados",
    "Mercados regulados",
    "Plan. participativo",
    "Plan. central",
  ];
  const lx = swap ? labelsY : labelsX,
    ly = swap ? labelsX : labelsY;
  const ai = ["A", "B", "C", "D"].indexOf(swap ? y : x),
    bi = ["A", "B", "C", "D"].indexOf(swap ? x : y);
  return (
    <section className="panel">
      <span className="eyebrow">G02 / ESCOLHAS ECONÔMICAS</span>
      <h2>Propriedade × coordenação</h2>
      <p className="muted">
        Categorias de Q14 e Q19, sem média ou posição ideológica.
      </p>
      <label className="small-label">
        Organizar eixos
        <select
          value={swap ? "swap" : "normal"}
          onChange={(e) => setSwap(e.target.value === "swap")}
        >
          <option value="normal">Propriedade na horizontal</option>
          <option value="swap">Coordenação na horizontal</option>
        </select>
      </label>
      <ZoomCanvas label="mapa econômico" height={340}>
        {(t, w) => {
          const left = w < 450 ? 64 : 100,
            cw = (w - left - 18) / 4,
            ch = 56;
          return (
            <>
              {lx.map((l, a) =>
                ly.map((m, b) => {
                  const xx = t.applyX(left + a * cw),
                    yy = t.applyY(28 + b * ch);
                  const selected = valid && a === ai && b === bi;
                  return (
                    <rect
                      key={`${a}-${b}`}
                      x={xx + 2}
                      y={yy + 2}
                      width={Math.max(1, cw * t.k - 4)}
                      height={ch * t.k - 4}
                      rx={6}
                      fill={selected ? "#64c4ed" : "currentColor"}
                      opacity={selected ? 0.8 : 0.055}
                      stroke={selected ? "#e9b56a" : "currentColor"}
                      strokeWidth={selected ? 3 : 1}
                    />
                  );
                }),
              )}
              {lx.map((l, a) => (
                <text
                  key={l}
                  x={t.applyX(left + (a + 0.5) * cw)}
                  y={280 + (a % 2) * 28}
                  fontSize={12}
                  fill="currentColor"
                  textAnchor="middle"
                >
                  {l.split(" ").map((part, j) => (
                    <tspan
                      key={j}
                      x={t.applyX(left + (a + 0.5) * cw)}
                      dy={j ? 13 : 0}
                    >
                      {part}
                    </tspan>
                  ))}
                </text>
              ))}
              {ly.map((l, b) => (
                <text
                  key={l}
                  x={left - 8}
                  y={t.applyY(60 + b * ch)}
                  fontSize={12}
                  fill="currentColor"
                  textAnchor="end"
                >
                  {l.split(" ").map((part, j) => (
                    <tspan key={j} x={left - 8} dy={j ? 13 : 0}>
                      {part}
                    </tspan>
                  ))}
                </text>
              ))}
            </>
          );
        }}
      </ZoomCanvas>
      <p className="notice">
        {valid
          ? `Q14: ${statement(questions[13], answers)} Q19: ${statement(questions[18], answers)}`
          : "Informação insuficiente: escolha uma posição determinada em Q14 e Q19 para destacar uma célula. As outras respostas continuam disponíveis abaixo."}
      </p>
      <details>
        <summary>Dados e limites do mapa</summary>
        <p>
          A célula representa duas alternativas diretas, sem distância numérica
          entre elas. Planejamento participativo não é um grau inferior de
          planejamento central. Q19 tem cobertura de um único item.
        </p>
        <table>
          <tbody>
            {["Q14", "Q19"].map((id) => (
              <tr key={id}>
                <th scope="row">{id}</th>
                <td>
                  {statement(
                    questions.find((q) => q.id === id)!,
                    answers,
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
      <SourceLinks ids={["S05"]} />
    </section>
  );
}
const colors: Record<string, string> = {
  declared: "#64c4ed",
  conditional: "#e9b56a",
  uncertain: "#b6a0e2",
  missing: "#75849a",
};
export function EvidenceBars({
  answers,
  onQuestion,
}: {
  answers: Answers;
  onQuestion: (id: string) => void;
}) {
  const data = coverage(answers);
  return (
    <section className="panel">
      <span className="eyebrow">G03 / EVIDÊNCIAS</span>
      <h2>O que foi declarado</h2>
      <p className="muted">
        Contagem por tema. Respostas multitemáticas aparecem em mais de uma
        linha.
      </p>
      <div className="bars">
        {data.map((d) => (
          <div key={d.id}>
            <div className="bar-label">
              <strong>{d.name}</strong>
              <span>
                {d.declared} declaradas / {d.total}
              </span>
            </div>
            <div
              className="bar-track"
              role="img"
              aria-label={`${d.name}: ${d.declared} declaradas, ${d.conditional} condicionais, ${d.uncertain} incertas, ${d.missing} ausentes`}
            >
              {(
                ["declared", "conditional", "uncertain", "missing"] as const
              ).map((k) => (
                <span
                  key={k}
                  style={{
                    width: `${(d[k] / d.total) * 100}%`,
                    background: colors[k],
                  }}
                />
              ))}
            </div>
            <details>
              <summary>Evidências de {d.name}</summary>
              {d.questionIds.map((id) => (
                <div className="evidence" key={id}>
                  <button
                    className="text-button"
                    onClick={() => onQuestion(id)}
                  >
                    {id} · {statusNames[statusFor(id, answers)]}
                  </button>
                  <p>
                    {statement(
                      questions.find((q) => q.id === id)!,
                      answers,
                    )}
                  </p>
                </div>
              ))}
            </details>
          </div>
        ))}
      </div>
      <div className="chart-legend">
        {Object.entries(statusNames).map(([k, v]) => (
          <span key={k}>
            <i style={{ background: colors[k] }} />
            {v}
          </span>
        ))}
      </div>
      <SourceLinks ids={["S05", "S03", "S04"]} />
    </section>
  );
}
export function CoverageRadar({ answers }: { answers: Answers }) {
  const data = coverage(answers);
  const n = data.length,
    center = 180,
    r = 108;
  const pt = (i: number, rad: number) => [
    center + Math.sin((i / n) * 2 * Math.PI) * rad,
    center - Math.cos((i / n) * 2 * Math.PI) * rad,
  ];
  const path = lineRadial<number>()
    .angle((_, i) => (i / n) * 2 * Math.PI)
    .radius((d) => d)
    .curve(curveLinearClosed);
  const values = data.map((d) => ((d.total - d.missing) / d.total) * r);
  return (
    <section className="panel">
      <span className="eyebrow">G04 / COBERTURA EDITORIAL</span>
      <h2>O que o teste alcança</h2>
      <p className="muted">
        Proporção preenchida de cada tema. “Não sei” conta como preenchimento,
        sem posição determinada.
      </p>
      <svg
        className="radar"
        viewBox="0 0 360 360"
        role="img"
        aria-label="Radar da proporção preenchida por tema, de zero a total; tabela com contagens abaixo"
      >
        {[0.25, 0.5, 0.75, 1].map((k) => (
          <polygon
            key={k}
            points={data.map((_, i) => pt(i, r * k).join(",")).join(" ")}
            fill="none"
            stroke="currentColor"
            opacity=".15"
          />
        ))}
        {data.map((d, i) => {
          const p = pt(i, r),
            label = pt(i, r + 35);
          return (
            <g key={d.id}>
              <line
                x1={center}
                y1={center}
                x2={p[0]}
                y2={p[1]}
                stroke="currentColor"
                opacity=".15"
              />
              <text
                x={label[0]}
                y={label[1]}
                textAnchor="middle"
                fill="currentColor"
                fontSize={12}
              >
                {d.name}
              </text>
            </g>
          );
        })}
        <path
          transform={`translate(${center},${center})`}
          d={path(values) ?? ""}
          fill="#64c4ed"
          fillOpacity=".18"
          stroke="#64c4ed"
          strokeWidth={2}
        />
        {data.map((d, i) => {
          const p = pt(i, values[i]);
          return <circle key={d.id} cx={p[0]} cy={p[1]} r={4} fill="#64c4ed" />;
        })}
        <text
          x={center}
          y={center + 8}
          fill="currentColor"
          textAnchor="middle"
          fontSize={12}
        >
          0 → total
        </text>
      </svg>
      <details>
        <summary>Tabela equivalente da cobertura</summary>
        <table>
          <thead>
            <tr>
              <th>Tema</th>
              <th>Preenchidas / total</th>
              <th>Determinadas</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={d.id}>
                <th scope="row">{d.name}</th>
                <td>
                  {d.total - d.missing} / {d.total}
                </td>
                <td>{d.declared}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
      <p className="notice">
        Cobertura não significa intensidade de crença. Coordenação e critérios
        têm apenas uma pergunta cada.
      </p>
      <SourceLinks ids={["S03", "S05"]} />
    </section>
  );
}
export function Matrix({
  answers,
  onQuestion,
}: {
  answers: Answers;
  onQuestion: (id: string) => void;
}) {
  const [filter, setFilter] = useState("all"),
    [reverse, setReverse] = useState(false);
  const rows = questions.filter(
    (q) => filter === "all" || q.dimensions.includes(filter),
  );
  if (reverse) rows.reverse();
  return (
    <section className="panel">
      <span className="eyebrow">G05 / MATRIZ DE QUESTÕES</span>
      <h2>Vinte escolhas, tema a tema</h2>
      <div className="actions">
        <label className="small-label">
          Filtrar tema
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">Todos os temas</option>
            {Object.entries(dimensions).map(([id, label]) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <button className="secondary" onClick={() => setReverse(!reverse)}>
          Ordem {reverse ? "decrescente" : "crescente"}
        </button>
      </div>
      <p className="muted">
        ● tema abordado; espaço vazio significa que o item não cobre o tema.
        Tabela com rolagem interna.
      </p>
      <div
        className="table-scroll"
        tabIndex={0}
        role="region"
        aria-label="Matriz das questões com rolagem horizontal"
      >
        <table className="matrix">
          <thead>
            <tr>
              <th>Questão</th>
              <th>Resposta</th>
              {Object.entries(dimensions).map(([id, label]) => (
                <th key={id}>{label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((q) => (
              <tr key={q.id}>
                <th scope="row">
                  <button
                    className="text-button"
                    onClick={() => onQuestion(q.id)}
                  >
                    {q.id}
                  </button>
                </th>
                <td>{statusNames[statusFor(q.id, answers)]}</td>
                {Object.keys(dimensions).map((d) => (
                  <td
                    key={d}
                    aria-label={
                      q.dimensions.includes(d)
                        ? `${q.id} aborda ${dimensions[d]}`
                        : `${q.id} não aborda ${dimensions[d]}`
                    }
                  >
                    {q.dimensions.includes(d) ? "●" : ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <SourceLinks ids={["S01", "S02", "S03", "S04", "S05"]} />
    </section>
  );
}
export function RelationNetwork({
  answers,
  onQuestion,
}: {
  answers: Answers;
  onQuestion: (id: string) => void;
}) {
  const [filter, setFilter] = useState("all");
  const all = relationResults(answers),
    data = all.filter((r) => filter === "all" || r.state === filter);
  return (
    <section className="panel">
      <span className="eyebrow">G06 / RELAÇÕES CONCEITUAIS</span>
      <h2>Convergências e tensões</h2>
      <label className="small-label">
        Mostrar relações
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">Todas</option>
          <option value="tension">Diferenças explícitas</option>
          <option value="related">Relacionadas</option>
          <option value="insufficient">Sem evidência suficiente</option>
        </select>
      </label>
      <ZoomCanvas label="rede de relações" height={280}>
        {(t, w) => (
          <>
            {data.map((r, j) => {
              const y = 50 + j * 82,
                x1 = w * 0.24,
                x2 = w * 0.76;
              return (
                <g key={r.id}>
                  <line
                    x1={t.applyX(x1)}
                    y1={t.applyY(y)}
                    x2={t.applyX(x2)}
                    y2={t.applyY(y)}
                    stroke={r.state === "tension" ? "#e9b56a" : "#64c4ed"}
                    strokeDasharray={
                      r.state === "insufficient" ? "5 5" : undefined
                    }
                    strokeWidth={2}
                    opacity=".7"
                  />
                  {[r.a, r.b].map((q, i) => (
                    <g key={q}>
                      <circle
                        cx={t.applyX(i ? x2 : x1)}
                        cy={t.applyY(y)}
                        r={22}
                        fill="var(--surface-2)"
                        stroke="currentColor"
                        opacity=".9"
                      />
                      <text
                        x={t.applyX(i ? x2 : x1)}
                        y={t.applyY(y) + 4}
                        fill="currentColor"
                        textAnchor="middle"
                        fontSize={12}
                      >
                        {q}
                      </text>
                    </g>
                  ))}
                  <text
                    x={t.applyX(w / 2)}
                    y={t.applyY(y) - 12}
                    fill="currentColor"
                    fontSize={12}
                    textAnchor="middle"
                  >
                    {r.state === "tension"
                      ? "Diferença"
                      : r.state === "related"
                        ? "Relação"
                        : "Insuficiente"}
                  </text>
                </g>
              );
            })}
          </>
        )}
      </ZoomCanvas>
      {data.length === 0 && <p>Nenhuma relação neste filtro.</p>}
      <div className="relation-list">
        {data.map((r) => (
          <details key={r.id}>
            <summary>
              {r.a} ↔ {r.b} · {r.title}
            </summary>
            <p>{r.rationale}</p>
            <p>
              {r.state === "tension"
                ? "As alternativas escolhidas expressam regras diferentes entre cenários. Isso não diagnostica hipocrisia ou identidade política."
                : r.state === "related"
                  ? "Duas posições determinadas estão disponíveis para comparação. A ligação não afirma equivalência."
                  : "Falta uma posição determinada em pelo menos um dos itens."}
            </p>
            {[r.a, r.b].map((id) => (
              <div key={id}>
                <button className="text-button" onClick={() => onQuestion(id)}>
                  {id} · Editar escolha
                </button>
                <p>
                  {statement(
                    questions.find((q) => q.id === id)!,
                    answers,
                  )}
                </p>
              </div>
            ))}
            <SourceLinks ids={r.sourceIds} />
          </details>
        ))}
      </div>
    </section>
  );
}
