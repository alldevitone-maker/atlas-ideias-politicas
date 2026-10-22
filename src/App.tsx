import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Compass,
  ShieldCheck,
  Sun,
  Moon,
  Monitor,
  Menu,
  X,
  Download,
  Check,
  LockKeyhole,
  ExternalLink,
  Globe2,
} from "lucide-react";
import {
  Spectrum,
  Economy,
  EvidenceBars,
  CoverageRadar,
  Matrix,
  RelationNetwork,
} from "./components/Charts";
import {
  ConceptDialog,
  Confirm,
  SourceLinks,
  Symbol,
} from "./components/Shared";
import {
  questions,
  sources,
  ideologies,
  dimensions,
  coverage,
  statusFor,
  statusNames,
  statement,
  reportWarning,
  families,
  type Answers,
  type Ideology,
} from "./domain/model";
const routes = [
  "inicio",
  "teste",
  "revisao",
  "resultado",
  "biblioteca",
  "fontes",
  "metodologia",
  "privacidade",
];
function getRoute() {
  const value = location.hash.replace(/^#\/?/, "") || "inicio";
  return routes.includes(value) ? value : "not-found";
}
function readStored(key: string) {
  try {
    return localStorage.getItem(key) ?? "";
  } catch {
    return "";
  }
}
function store(key: string, value: string | null) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}
export default function App() {
  const [route, setRoute] = useState(getRoute),
    [answers, setAnswers] = useState<Answers>({}),
    [index, setIndex] = useState(0),
    [name, setName] = useState(() => readStored("atlas:name").slice(0, 60)),
    [remember, setRemember] = useState(() => !!readStored("atlas:name")),
    [theme, setTheme] = useState(() => readStored("atlas:theme") || "system"),
    [menu, setMenu] = useState(false),
    [selected, setSelected] = useState<Ideology | null>(null),
    [query, setQuery] = useState(""),
    [familyFilter, setFamilyFilter] = useState("all"),
    [busy, setBusy] = useState(""),
    [error, setError] = useState(""),
    [disagree, setDisagree] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const onHash = () => {
      setRoute(getRoute());
      setMenu(false);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  useEffect(() => {
    const media = matchMedia("(prefers-color-scheme: dark)");
    const update = () => {
      document.documentElement.dataset.theme =
        theme === "system" ? (media.matches ? "dark" : "light") : theme;
    };
    update();
    media.addEventListener("change", update);
    store("atlas:theme", theme);
    return () => media.removeEventListener("change", update);
  }, [theme]);
  useEffect(() => {
    heading.current?.focus();
    document.title = `${({ inicio: "Explore", teste: "Questionário", revisao: "Revisão", resultado: "Seu relatório", biblioteca: "Biblioteca", fontes: "Fontes", metodologia: "Metodologia", privacidade: "Privacidade" } as Record<string, string>)[route] ?? "Página não encontrada"} · Atlas das Ideias Políticas`;
  }, [route, index]);
  const go = (value: string) => {
    location.hash = `/${value}`;
  };
  const edit = (id: string) => {
    setIndex(questions.findIndex((q) => q.id === id));
    go("teste");
  };
  function clearAll() {
    setAnswers({});
    setName("");
    setRemember(false);
    setDisagree(false);
    setIndex(0);
    setError("");
    store("atlas:name", null);
    go("inicio");
  }
  function restart() {
    setAnswers({});
    setIndex(0);
    setDisagree(false);
    setError("");
    go("teste");
  }
  const count = Object.keys(answers).length,
    q = questions[index],
    stats = coverage(answers),
    declared = questions.filter(
      (q) => statusFor(q.id, answers) === "declared",
    ).length;
  function updateName(value: string) {
    const text = value.slice(0, 60);
    setName(text);
    if (remember && !store("atlas:name", text))
      setError(
        "O navegador não permitiu lembrar seu nome. Ele permanece apenas nesta aba.",
      );
  }
  function toggleRemember(value: boolean) {
    setRemember(value);
    if (!store("atlas:name", value ? name : null))
      setError("Armazenamento indisponível. Seu nome fica apenas nesta aba.");
  }
  async function exportPdf(full: boolean) {
    setBusy(full ? "completo" : "resumo");
    setError("");
    try {
      const { downloadReport } = await import("./components/Report");
      await downloadReport(answers, name, full);
    } catch {
      setError(
        "Não foi possível gerar o PDF. Suas respostas continuam nesta aba. Tente novamente.",
      );
    } finally {
      setBusy("");
    }
  }
  const NameField = (
    <div className="name-field">
      <label htmlFor="display-name">
        Como quer aparecer no relatório? <span className="muted">Opcional</span>
      </label>
      <input
        id="display-name"
        value={name}
        maxLength={60}
        placeholder="Visitante"
        onChange={(e) => updateName(e.target.value)}
        autoComplete="off"
      />
      <label className="checkbox">
        <input
          type="checkbox"
          checked={remember}
          onChange={(e) => toggleRemember(e.target.checked)}
        />
        Lembrar meu nome neste dispositivo
      </label>
      <p className="muted">
        Outras pessoas neste dispositivo poderão ver o nome salvo.
      </p>
      {name && (
        <button
          className="text-button"
          onClick={() => {
            setName("");
            setRemember(false);
            store("atlas:name", null);
          }}
        >
          Esquecer meu nome
        </button>
      )}
    </div>
  );
  const nav = [
    ["inicio", "Explorar"],
    ["teste", "Teste"],
    ["resultado", "Resultados"],
    ["biblioteca", "Biblioteca"],
    ["fontes", "Fontes"],
  ];
  const cards = ideologies.filter(
    (i) =>
      (familyFilter === "all" || i.family === familyFilter) &&
      `${i.name} ${i.definition} ${i.variants.join(" ")}`
        .toLocaleLowerCase("pt-BR")
        .includes(query.toLocaleLowerCase("pt-BR")),
  );
  return (
    <>
      <a
        className="skip"
        href="#conteudo"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("conteudo")?.focus();
        }}
      >
        Pular para o conteúdo
      </a>
      <header className="topbar">
        <a
          className="brand"
          href="#/inicio"
          aria-label="Atlas das Ideias Políticas, início"
        >
          <span className="brand-mark">
            <Globe2 size={27} />
          </span>
          <span>
            ATLAS<span className="brand-sub">DAS IDEIAS POLÍTICAS</span>
          </span>
        </a>
        <nav
          aria-label="Navegação principal"
          className={menu ? "nav open" : "nav"}
        >
          {nav.map(([path, label]) =>
            path === "resultado" && !count ? (
              <span
                key={path}
                className="disabled-nav"
                title="Responda pelo menos uma questão para abrir resultados"
                aria-disabled="true"
              >
                Resultados
              </span>
            ) : (
              <a
                key={path}
                href={`#/${path}`}
                aria-current={route === path ? "page" : undefined}
              >
                {label}
              </a>
            ),
          )}
        </nav>
        <div className="top-actions">
          <label className="theme-picker">
            <span className="sr-only">Tema visual</span>
            {theme === "dark" ? (
              <Moon size={17} />
            ) : theme === "light" ? (
              <Sun size={17} />
            ) : (
              <Monitor size={17} />
            )}
            <select
              aria-label="Tema visual"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              <option value="system">Sistema</option>
              <option value="dark">Escuro</option>
              <option value="light">Claro</option>
            </select>
          </label>
          <button
            className="icon-button menu-toggle"
            aria-label={menu ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <main id="conteudo" className="main-shell" tabIndex={-1}>
        {error && (
          <div role="alert" className="notice error">
            {error}
            <button className="text-button" onClick={() => setError("")}>
              Fechar aviso
            </button>
          </div>
        )}
        {route === "inicio" && (
          <>
            <div className="home-top">
              <aside className="intro">
                <span className="eyebrow">
                  <span className="live-dot" /> UM ATLAS PARA PENSAR
                </span>
                <h1 ref={heading} tabIndex={-1}>
                  Ideias se cruzam.
                  <br />
                  <span>Explore as suas.</span>
                </h1>
                <p>
                  Conheça correntes políticas e reflita sobre suas escolhas, uma
                  pergunta de cada vez.
                </p>
                <button className="primary cta" onClick={() => go("teste")}>
                  {count ? "Retomar teste" : "Começar teste"}
                  <ArrowRight size={18} />
                </button>
                <div className="intro-facts">
                  <span>
                    <Check size={15} /> 20 perguntas
                  </span>
                  <span>
                    <LockKeyhole size={15} /> Sem login
                  </span>
                  <span>
                    <ShieldCheck size={15} /> Respostas privadas
                  </span>
                </div>
                <div className="intro-note">
                  <Compass size={24} />
                  <p>
                    Explore primeiro.
                    <br />
                    Nenhum rótulo define você.
                  </p>
                </div>
                <a className="text-link" href="#/metodologia">
                  Entenda a metodologia <ArrowRight size={14} />
                </a>
              </aside>
              <Spectrum onSelect={setSelected} />
            </div>
            <div className="section-heading library-heading">
              <div>
                <span className="eyebrow">
                  UMA BIBLIOTECA, MUITAS PERSPECTIVAS
                </span>
                <h2>Comece pelos conceitos</h2>
              </div>
              <a className="text-link" href="#/biblioteca">
                Ver biblioteca <ArrowRight size={15} />
              </a>
            </div>
            <div className="concept-grid">
              {ideologies
                .filter((i) =>
                  [
                    "socialismo",
                    "socialdemocracia",
                    "liberalismo-classico",
                    "conservadorismo",
                  ].includes(i.id),
                )
                .map((i) => (
                  <button
                    className="concept-card"
                    key={i.id}
                    onClick={() => setSelected(i)}
                  >
                    <span className="concept-icon">
                      <Symbol item={i} />
                    </span>
                    <h3>{i.name}</h3>
                    <p>{i.definition}</p>
                    <span className="text-link">
                      Ler conceito <ArrowRight size={14} />
                    </span>
                  </button>
                ))}
            </div>
            <section className="privacy-strip">
              <ShieldCheck size={32} />
              <div>
                <h2>Seu resultado pertence a você.</h2>
                <p>
                  As respostas ficam nesta aba. Ao atualizar ou fechar, o
                  progresso é perdido. O PDF é gerado no seu navegador.
                </p>
              </div>
              <a className="text-link" href="#/privacidade">
                Privacidade <ArrowRight size={15} />
              </a>
            </section>
          </>
        )}
        {route === "teste" && (
          <div className="quiz-layout">
            <aside className="quiz-aside">
              <span className="eyebrow">ESPAÇO DE REFLEXÃO</span>
              <h2>
                Sem respostas prontas.
                <br />
                Sem rótulos.
              </h2>
              <p className="muted">
                Cenários hipotéticos. Escolha a alternativa mais próxima da sua
                posição ou indique que não sabe.
              </p>
              <p className="notice">
                <LockKeyhole size={16} /> O progresso fica somente nesta aba e
                será perdido ao recarregar.
              </p>
              {NameField}
              <button className="secondary" onClick={() => go("revisao")}>
                Revisar {count} respostas
              </button>
            </aside>
            <section className="panel question-panel">
              <div className="section-heading">
                <span className="eyebrow">{q.id} / 20</span>
                <span className="tag">
                  {q.dimensions.map((d) => dimensions[d]).join(" · ")}
                </span>
              </div>
              <progress
                max={20}
                value={count}
                aria-label="Questões preenchidas"
              />
              <h1 ref={heading} tabIndex={-1}>
                {q.title}
              </h1>
              <p className="scenario">
                <span>CENÁRIO HIPOTÉTICO</span>
                {q.scenario}
              </p>
              <fieldset>
                <legend>{q.question}</legend>
                <div className="options">
                  {q.options.map((o) => (
                    <label
                      className={`option ${answers[q.id] === o.code ? "chosen" : ""}`}
                      key={o.code}
                    >
                      <input
                        type="radio"
                        name={q.id}
                        value={o.code}
                        checked={answers[q.id] === o.code}
                        onChange={() =>
                          setAnswers((prev) => ({ ...prev, [q.id]: o.code }))
                        }
                      />
                      <span className="option-code">
                        {o.code === "?" ? "?" : o.code}
                      </span>
                      <span>{o.label}</span>
                      {answers[q.id] === o.code && <Check size={18} />}
                    </label>
                  ))}
                </div>
              </fieldset>
              <details>
                <summary>
                  Entenda os conceitos e os limites desta pergunta
                </summary>
                <p>{q.explanation}</p>
                <SourceLinks ids={q.source_ids} />
              </details>
              <div className="quiz-controls">
                <button
                  className="secondary"
                  disabled={index === 0}
                  onClick={() => setIndex(index - 1)}
                >
                  <ArrowLeft size={16} />
                  Anterior
                </button>
                <button
                  className="text-button"
                  onClick={() => {
                    setAnswers((prev) => {
                      const next = { ...prev };
                      delete next[q.id];
                      return next;
                    });
                    if (index < 19) setIndex(index + 1);
                    else go("revisao");
                  }}
                >
                  Pular sem responder
                </button>
                <button
                  onClick={() =>
                    index < 19 ? setIndex(index + 1) : go("revisao")
                  }
                >
                  {index < 19 ? "Próxima" : "Revisar teste"}
                  <ArrowRight size={16} />
                </button>
              </div>
            </section>
          </div>
        )}
        {route === "revisao" && (
          <>
            <div className="page-heading">
              <span className="eyebrow">ANTES DO RELATÓRIO</span>
              <h1 ref={heading} tabIndex={-1}>
                Revise suas escolhas
              </h1>
              <p>
                {count} de 20 preenchidas · {20 - count} ausentes. Itens
                omitidos não recebem posição.
              </p>
              <div className="actions">
                <button disabled={!count} onClick={() => go("resultado")}>
                  Ver meu relatório <ArrowRight size={17} />
                </button>
                <button className="secondary" onClick={() => go("teste")}>
                  Retomar teste
                </button>
              </div>
            </div>
            <div className="review-list">
              {questions.map((item) => (
                <article className="panel review-item" key={item.id}>
                  <div>
                    <span className="eyebrow">
                      {item.id} · {statusNames[statusFor(item.id, answers)]}
                    </span>
                    <h2>{item.title}</h2>
                    <p>{statement(item, answers)}</p>
                  </div>
                  <button className="secondary" onClick={() => edit(item.id)}>
                    Editar {item.id}
                  </button>
                </article>
              ))}
            </div>
          </>
        )}
        {route === "resultado" &&
          (!count ? (
            <section className="panel empty-state">
              <h1 ref={heading} tabIndex={-1}>
                Seu relatório começa com suas respostas.
              </h1>
              <p>
                Nenhuma resposta foi registrada. Ao atualizar a página, o estado
                temporário é apagado.
              </p>
              <button onClick={() => go("teste")}>
                Começar teste <ArrowRight size={16} />
              </button>
            </section>
          ) : (
            <>
              <div className="page-heading results-heading">
                <div>
                  <span className="eyebrow">LEITURA DESCRITIVA / PRIVADA</span>
                  <h1 ref={heading} tabIndex={-1}>
                    Relatório de {name.trim() || "Visitante"}
                  </h1>
                  <p>{reportWarning}</p>
                </div>
                <div className="actions">
                  <button disabled={!!busy} onClick={() => exportPdf(false)}>
                    <Download size={16} />
                    {busy === "resumo" ? "Gerando…" : "PDF resumido"}
                  </button>
                  <button
                    className="secondary"
                    disabled={!!busy}
                    onClick={() => exportPdf(true)}
                  >
                    <Download size={16} />
                    {busy === "completo" ? "Gerando…" : "PDF completo"}
                  </button>
                </div>
              </div>
              <div className="stat-grid">
                <div className="panel stat">
                  <span>Preenchimento</span>
                  <strong>
                    {count}
                    <small> / 20</small>
                  </strong>
                  <p>Questões com alternativa escolhida</p>
                </div>
                <div className="panel stat">
                  <span>Posições declaradas</span>
                  <strong>{declared}</strong>
                  <p>Escolhas determinadas, sem score</p>
                </div>
                <div className="panel stat">
                  <span>Informação limitada</span>
                  <strong>
                    {stats.filter((d) => d.declared < 2).length}
                    <small> temas</small>
                  </strong>
                  <p>Menos de duas posições determinadas</p>
                </div>
              </div>
              <div className="result-nav">
                {[
                  ["economia", "Economia"],
                  ["evidencias", "Evidências"],
                  ["matriz", "Respostas"],
                  ["relacoes", "Relações"],
                ].map(([id, label]) => (
                  <button
                    key={id}
                    className="secondary"
                    onClick={() =>
                      document
                        .getElementById(id)
                        ?.scrollIntoView({ block: "start" })
                    }
                  >
                    {label}
                  </button>
                ))}
              </div>
              <Spectrum onSelect={setSelected} />
              <div className="dashboard-grid" id="economia">
                <Economy answers={answers} />
                <div className="panel reading-panel">
                  <span className="eyebrow">COMO INTERPRETAR</span>
                  <h2>
                    Um retrato das escolhas.
                    <br />
                    Não da sua identidade.
                  </h2>
                  <p>
                    O relatório reproduz o que você declarou. Cada afirmação
                    pode ser conferida e alterada na questão original.
                  </p>
                  <ul>
                    <li>“Depende” e “não sei” não são centro político.</li>
                    <li>
                      Uma decisão econômica não define regime, partido ou
                      extremismo.
                    </li>
                    <li>Diferenças entre cenários podem ser legítimas.</li>
                  </ul>
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      checked={disagree}
                      onChange={(e) => setDisagree(e.target.checked)}
                    />
                    Não me reconheço nesta síntese
                  </label>
                  {disagree && (
                    <p className="notice" role="status">
                      Tudo bem. A leitura tem limites; revise as escolhas e
                      consulte as definições. Este feedback não é enviado nem
                      salvo.
                    </p>
                  )}
                  {NameField}
                  <SourceLinks ids={["S05", "S03"]} />
                </div>
              </div>
              <div className="dashboard-grid" id="evidencias">
                <EvidenceBars answers={answers} onQuestion={edit} />
                <CoverageRadar answers={answers} />
              </div>
              <div id="matriz">
                <Matrix answers={answers} onQuestion={edit} />
              </div>
              <div id="relacoes">
                <RelationNetwork answers={answers} onQuestion={edit} />
              </div>
              <section className="panel">
                <h2>Continuar a reflexão</h2>
                <div className="actions">
                  <button className="secondary" onClick={() => go("revisao")}>
                    Editar respostas
                  </button>
                  <Confirm
                    trigger="Refazer teste"
                    title="Iniciar um novo teste?"
                    onConfirm={restart}
                  >
                    As respostas atuais serão apagadas desta sessão. O nome
                    permanece somente conforme sua escolha.
                  </Confirm>
                  <Confirm
                    trigger="Apagar todos os dados"
                    title="Apagar respostas e nome?"
                    onConfirm={clearAll}
                  >
                    Remove as respostas da memória da aplicação e o nome salvo
                    neste dispositivo. PDFs já baixados continuam sob seu
                    controle.
                  </Confirm>
                </div>
              </section>
            </>
          ))}
        {route === "biblioteca" && (
          <>
            <div className="page-heading">
              <span className="eyebrow">CONCEITOS, CONTEXTOS E DIFERENÇAS</span>
              <h1 ref={heading} tabIndex={-1}>
                Biblioteca das ideias
              </h1>
              <p>
                Correntes têm histórias, divergências e fronteiras discutidas.
                Esta seleção é introdutória e não esgota a literatura.
              </p>
            </div>
            <Spectrum onSelect={setSelected} />
            <div className="library-filters panel">
              <label>
                Buscar conceito
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ex.: mercado, propriedade, liberdade"
                />
              </label>
              <label>
                Faixa editorial
                <select
                  value={familyFilter}
                  onChange={(e) => setFamilyFilter(e.target.value)}
                >
                  <option value="all">Todas as faixas</option>
                  {families.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <p role="status" className="muted">
              {cards.length} conceitos encontrados
            </p>
            <div className="concept-grid library-cards">
              {cards.map((i) => (
                <article className="panel concept-article" key={i.id}>
                  <span className="concept-icon">
                    <Symbol item={i} />
                  </span>
                  <h2>{i.name}</h2>
                  <p>{i.definition}</p>
                  <SourceLinks ids={i.sourceIds} />
                  <button
                    className="text-button"
                    onClick={() => setSelected(i)}
                  >
                    Diferenças e fontes <ArrowRight size={15} />
                  </button>
                </article>
              ))}
            </div>
            {cards.length === 0 && (
              <p className="notice">
                Nenhum conceito encontrado. Tente outra palavra ou faixa.
              </p>
            )}
          </>
        )}
        {route === "fontes" && (
          <>
            <div className="page-heading">
              <span className="eyebrow">BIBLIOGRAFIA COM ESCOPO EXPLÍCITO</span>
              <h1 ref={heading} tabIndex={-1}>
                Vá às fontes.
              </h1>
              <p>
                Referências oficiais e acadêmicas sustentam conceitos. Nenhuma
                delas valida o questionário ou a localização editorial das
                correntes.
              </p>
            </div>
            <label className="source-search">
              Buscar fonte
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Instituição, título ou tema"
              />
            </label>
            <div className="source-list">
              {sources
                .filter((s) =>
                  `${s.author} ${s.title} ${s.scope}`
                    .toLowerCase()
                    .includes(query.toLowerCase()),
                )
                .map((s) => (
                  <article className="panel" key={s.id}>
                    <span className="eyebrow">
                      {s.id} /{" "}
                      {s.type === "official"
                        ? "DOCUMENTO OFICIAL"
                        : "REFERÊNCIA ACADÊMICA"}
                    </span>
                    <h2>
                      <a href={s.url} target="_blank" rel="noopener noreferrer">
                        {s.title}
                        <ExternalLink size={16} />
                      </a>
                    </h2>
                    <p>
                      {s.author} · {s.year}
                    </p>
                    <p className="muted">{s.scope}</p>
                    <small>Revisão: 22/10/2026. {s.verification}</small>
                  </article>
                ))}
            </div>
          </>
        )}
        {route === "metodologia" && (
          <article className="panel prose">
            <span className="eyebrow">MÉTODO E LIMITES</span>
            <h1 ref={heading} tabIndex={-1}>
              Reflexão, com transparência.
            </h1>
            <p className="lead">{reportWarning}</p>
            <h2>O que acontece com as respostas</h2>
            <p>
              Cada alternativa é registrada como posição declarada, condicional
              ou incerta. Omitir uma questão deixa uma ausência. O texto
              escolhido é a evidência, sem pesos ocultos ou classificação de
              partido.
            </p>
            <h2>O que cada gráfico representa</h2>
            <ol>
              <li>
                G01 organiza conceitos em faixas editoriais; não é uma régua
                objetiva.
              </li>
              <li>
                G02 cruza categorias escolhidas em Q14 e Q19. Só destaca uma
                célula com ambas determinadas.
              </li>
              <li>
                G03 conta tipos de evidência por tema. Um item pode aparecer em
                vários temas.
              </li>
              <li>
                G04 mostra preenchimento por tema. Não mede intensidade de
                crença.
              </li>
              <li>G05 liga perguntas a temas e ao estado de resposta.</li>
              <li>
                G06 compara apenas três pares predefinidos. Diferença entre
                cenários não diagnostica parcialidade.
              </li>
            </ol>
            <h2>Regra pública da rede</h2>
            <p>
              R1: diferença entre Q01=A e Q14=C/D, ou Q01=D e Q14=A. R2: Q11=C
              com Q18=A, ou Q11=A com Q18=B. R3: Q05=A com Q20=D, ou Q05=C com
              Q20=A/B/C. Só há comparação se as duas escolhas forem
              determinadas. Os cenários não são idênticos.
            </p>
            <h2>Limitações editoriais</h2>
            <p>
              Revisão interna, sem revisão independente por especialistas ou
              validação psicométrica. Algumas alternativas combinam fatores ou
              se sobrepõem; questões normativas podem provocar desejabilidade
              social. Coordenação e critérios têm um item cada. Oito temas
              recebem cobertura desigual.
            </p>
            <p>
              Q20 A, B e C expressam vias democráticas que podem coexistir. Q19
              não transforma planejamento participativo e central em uma escala
              comum. Escolher propriedade pública não implica autoritarismo.
            </p>
            <h2>Mapas e história</h2>
            <p>
              A ordem editorial não afirma equivalência moral de extremos.
              Socialismo e estatismo são conceitos diferentes. Fascismo e
              nazismo têm características históricas próprias, apresentadas em
              verbetes documentais. Os símbolos são contextualizados, sem
              suástica.
            </p>
            <SourceLinks ids={["S05", "S03", "S17", "S21", "S14"]} />
            <h2>Versões e correções</h2>
            <p>
              Conteúdo editorial 1.0.0, revisado em 22/10/2026. Código aberto
              com perguntas, fontes e regras auditáveis no repositório. Esta
              versão não inclui catálogo de partidos ou recomendação eleitoral.
            </p>
          </article>
        )}
        {route === "privacidade" && (
          <article className="panel prose">
            <span className="eyebrow">PRIVACIDADE POR PADRÃO</span>
            <h1 ref={heading} tabIndex={-1}>
              Suas respostas ficam aqui.
            </h1>
            <p className="lead">
              Sem cadastro, analytics, anúncios, pixels, banco de dados ou envio
              de alternativas.
            </p>
            <h2>Memória temporária</h2>
            <p>
              As respostas ficam no estado da aplicação enquanto esta aba
              estiver aberta. Navegar entre as telas preserva o estado;
              recarregar ou fechar apaga o progresso. Não usamos localStorage,
              sessionStorage, IndexedDB ou URL para opiniões.
            </p>
            <h2>Nome opcional</h2>
            <p>
              Sem consentimento, o nome existe somente na memória da aba.
              “Lembrar meu nome neste dispositivo” salva apenas até 60
              caracteres no armazenamento local, visível a quem usa o mesmo
              dispositivo. “Esquecer meu nome” remove essa informação.
            </p>
            <h2>PDF e gráficos</h2>
            <p>
              Os arquivos são gerados localmente após sua ação. Você controla os
              arquivos baixados e seu eventual compartilhamento. Apagar o estado
              do site não apaga arquivos já baixados.
            </p>
            <h2>Hospedagem e fontes</h2>
            <p>
              O GitHub Pages entrega os arquivos estáticos e pode processar
              dados técnicos de acesso conforme a política da hospedagem. As
              respostas do teste não são incluídas nessas requisições. Fontes
              bibliográficas abrem sites externos somente quando você clica;
              esses sites têm suas próprias políticas. Fontes tipográficas são
              servidas com o aplicativo.
            </p>
            <h2>Apagar</h2>
            <Confirm
              trigger="Apagar todos os dados"
              title="Apagar respostas e nome?"
              onConfirm={clearAll}
            >
              Apaga o estado desta aplicação e o nome salvo. A preferência de
              tema visual pode permanecer, sem opiniões políticas.
            </Confirm>
          </article>
        )}
        {route === "not-found" && (
          <section className="panel empty-state">
            <h1 ref={heading} tabIndex={-1}>
              Página não encontrada
            </h1>
            <p>Use o menu para continuar explorando.</p>
            <a href="#/inicio">Voltar ao início</a>
          </section>
        )}
      </main>
      <footer>
        <div className="footer-brand">
          <Compass size={18} /> Atlas das Ideias Políticas{" "}
          <span>Educação e autorreflexão.</span>
        </div>
        <nav aria-label="Rodapé">
          <a href="#/metodologia">
            <BookOpen size={14} />
            Metodologia
          </a>
          <a href="#/privacidade">
            <ShieldCheck size={14} />
            Privacidade
          </a>
          <a
            href="https://github.com/alldevitone-maker/atlas-ideias-politicas"
            target="_blank"
            rel="noopener noreferrer"
          >
            Código e documentação
          </a>
        </nav>
        <p>
          Instrumento exploratório não validado · Conteúdo 1.0.0 · Sem
          recomendação de voto.
        </p>
      </footer>
      <ConceptDialog item={selected} onClose={() => setSelected(null)} />
    </>
  );
}
