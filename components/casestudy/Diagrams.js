// Small explanatory diagrams for overlays, drawn in code so they stay crisp and
// match the page type. Each is keyed by name from a detail's `diagram` field.

// The quality action: the definition with its four parts highlighted, and a short
// note under each part saying why it's there (from the Shape metric board).
const QA_PARTS = [
  { n: 1, c: "#F5E6B8", t: "The share of consultations that end with", note: "Only consultations where a practitioner set a next step." },
  { t: " an " },
  { n: 2, c: "#EFD3B4", t: "assigned care plan action", note: "Strips out no-shows and no actions; focuses on what the practitioner asked for." },
  { t: ", where the " },
  { n: 3, c: "#C5CBF0", t: "patient completes that action", note: "Every action needs a way to record it, even a tick." },
  { t: " within a " },
  { n: 4, c: "#C3DECF", t: "clinically appropriate window", note: "The open question: a fluid window, or a first action within three days?" },
  { t: "." },
];

export function QualityDiagram() {
  const notes = QA_PARTS.filter((p) => p.n);
  return (
    <div className="dg-qa">
      <p className="dg-qa-s">
        {QA_PARTS.map((p, i) =>
          p.n ? (
            <mark key={i} style={{ background: p.c }}>
              {p.t}
              <sup>{p.n}</sup>
            </mark>
          ) : (
            <span key={i}>{p.t}</span>
          )
        )}
      </p>
      <ol className="dg-qa-n">
        {notes.map((p) => (
          <li key={p.n}>
            <span className="dg-qa-k" style={{ background: p.c }}>{p.n}</span>
            <span>{p.note}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

// How the system worked: tokens → B2C / B2B components → contracts → code, on navy,
// redrawn from the Shape deck slide (same geometry, units are the slide's px).
export function SystemDiagram() {
  const box = (x, y, w, h, r, dash) => <rect x={x} y={y} width={w} height={h} rx={r} fill="none" stroke="#fff" strokeWidth="2" strokeDasharray={dash ? "8 6" : undefined} />;
  const label = (x, y, t) => <text x={x} y={y} textAnchor="middle" dominantBaseline="middle">{t}</text>;
  return (
    <div className="dg-sys">
      <svg viewBox="990 96 840 830" role="img" aria-label="Tokens feed B2C and B2B component libraries for mobile and desktop, which feed contracts and tokens files, which sync both ways with code">
        <g className="dg-sys-l" fill="none" stroke="#fff" strokeWidth="2">
          <path d="M1410 219V250M1210 281V250H1610V281" />
          <path d="M1210 539V590H1610V539M1410 590V621" />
          <path d="M1410 735V795M1398 749L1410 737L1422 749M1398 781L1410 793L1422 781" />
        </g>
        {box(1261, 131, 298, 88, 18)}
        {box(1031, 281, 358, 258, 22)}
        {box(1431, 281, 358, 258, 22, true)}
        {box(1061, 381, 138, 108, 20)}
        {box(1221, 381, 138, 108, 20, true)}
        {box(1461, 381, 138, 108, 20)}
        {box(1621, 381, 138, 108, 20, true)}
        {box(1261, 621, 298, 108, 18)}
        {box(1261, 801, 298, 88, 18)}
        <g className="dg-sys-t" fill="#fff">
          {label(1410, 176, "Tokens")}
          {label(1210, 314, "Components (B2C)")}
          {label(1610, 314, "Components (B2B)")}
          {label(1130, 436, "Mobile")}
          {label(1290, 436, "Desktop")}
          {label(1530, 436, "Mobile")}
          {label(1690, 436, "Desktop")}
          {label(1410, 660, "Contracts.ts")}
          {label(1410, 690, "Tokens.json")}
          {label(1410, 846, "Code")}
        </g>
      </svg>
    </div>
  );
}

export const DIAGRAMS = { quality: QualityDiagram, system: SystemDiagram };
