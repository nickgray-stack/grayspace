// Small explanatory diagrams for overlays, drawn in code so they stay crisp and
// match the page type. Each is keyed by name from a detail's `diagram` field.

// The quality action as a narrowing funnel: each step of the definition filters the
// consultations we count, ending in the quality action itself. Colours keep the four
// highlights from the Shape metric board; a short note says why each step is there.
const QA_STEPS = [
  { c: "#F5E6B8", t: "Consultations that end with", note: "Only consultations where a practitioner set a next step." },
  { c: "#EFD3B4", t: "an assigned care plan action", note: "Strips out no-shows and no actions. Focuses on what the practitioner asked for." },
  { c: "#C5CBF0", t: "where the patient completes it", note: "Every action needs a way to record it, even a tick." },
  { c: "#C3DECF", t: "within a clinically appropriate window", note: "The open question: a fluid window, or a first action within three days?" },
];

export function QualityDiagram() {
  return (
    <div className="dg-qa">
      <ol className="dg-qa-f">
        {QA_STEPS.map((s, i) => (
          <li key={i} style={{ "--c": s.c, "--w": 100 - i * 13 + "%" }}>
            <div className="dg-qa-bar"><span className="dg-qa-k">{i + 1}</span>{s.t}</div>
            <p className="dg-qa-note">{s.note}</p>
          </li>
        ))}
      </ol>
      <p className="dg-qa-out"><span>=</span> a quality action, counted as a share of consultations</p>
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
