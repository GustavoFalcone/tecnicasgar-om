const labels = {
  tray: ['CENTRO','PESO','APOIO'], plates: ['1','2','3'], glass: ['COPO','TAÇA','BASE'], table: ['MESA','DISTÂNCIA','ROTA'],
  route: ['A','B','C'], collect: ['OBSERVE','RECOLHA','RETORNE'], posture: ['EIXO','OMBROS','MÃOS'], eye: ['OBSERVE','CONFIRME','AJA'],
  spark: ['ALINHE','CONTROLE','CONFIRA'], alert: ['PARE','PROTEJA','CORRIJA']
};

export function VisualDemo({ type = 'tray' }) {
  const words = labels[type] || labels.tray;
  return <div className={`visualDemo visual-${type}`} aria-label="Diagrama visual da técnica">
    <svg viewBox="0 0 420 190" role="img">
      <defs><marker id={`arrow-${type}`} markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="currentColor" /></marker></defs>
      <rect x="18" y="18" width="384" height="154" rx="24" className="demoFrame" />
      <path d="M62 112 C130 48, 235 46, 354 104" className="demoRoute" markerEnd={`url(#arrow-${type})`} />
      {[92,210,328].map((x, index) => <g key={x}><circle cx={x} cy={index === 1 ? 72 : 116} r={index === 1 ? 31 : 23} className="demoPoint" /><text x={x} y={index === 1 ? 77 : 121}>{index + 1}</text></g>)}
    </svg>
    <div className="visualLegend">{words.map((word, index) => <span key={word}><b>{index + 1}</b>{word}</span>)}</div>
  </div>;
}

export function CorrectWrongCard({ technique }) {
  return <div className="correctWrong"><div className="correct"><span>✓ FAÇA ASSIM</span><p>{technique.doThis}</p></div><div className="wrong"><span>× EVITE</span><p>{technique.avoid}</p></div></div>;
}

export function ProgressBar({ value, label }) {
  return <div className="progressWrap"><div className="progressMeta"><span>{label}</span><strong>{value}%</strong></div><div className="progressTrack"><span style={{ width: `${Math.min(100, value)}%` }} /></div></div>;
}

