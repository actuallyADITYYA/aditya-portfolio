import { Fragment, useState } from 'react';

const EXAMPLES = [
  { code: 'out = a and b', note: 'A Toffoli gate flips the output qubit only when both controls are 1. It is AND, made reversible so no information is lost.', label: 'Toffoli gate: controls on a and b, target on out', gates: [{ t: 'ccx', c: [0, 1], tg: 2, col: 1 }] },
  { code: 'out = a ^ b', note: 'Two CNOTs each flip the output when their control is 1, so the output ends up as a XOR b.', label: 'Two CNOT gates targeting out, controlled by a then b', gates: [{ t: 'cx', c: [0], tg: 2, col: 1 }, { t: 'cx', c: [1], tg: 2, col: 2 }] },
  { code: 'a = not a', note: 'NOT is a single X gate: it flips 0 to 1 and 1 to 0.', label: 'X gate on a', gates: [{ t: 'box', w: 0, l: 'X', col: 1 }] },
  { code: 'a, b = b, a', note: 'A SWAP gate exchanges the states of two qubits in one step.', label: 'SWAP gate between a and b', gates: [{ t: 'swap', a: 0, b: 1, col: 1 }] },
  { code: 'a = random_bit()', note: 'A Hadamard puts the qubit into equal superposition. Measuring it gives a truly random 0 or 1.', label: 'Hadamard gate then measurement on a', gates: [{ t: 'box', w: 0, l: 'H', col: 1 }, { t: 'box', w: 0, l: 'M', col: 2 }] },
];

const X = (col) => 60 + col * 110;
const Y = (w) => 36 + w * 72;
const A = 'var(--accent)';

function Gate({ gt, i }) {
  const x = X(gt.col);
  const style = { animationDelay: `${i * 120}ms` };
  const vline = (w1, w2) => <line x1={x} x2={x} y1={Y(w1)} y2={Y(w2)} stroke={A} strokeWidth="2" />;

  if (gt.t === 'box') return (
    <g className="gate" style={style}>
      <rect x={x - 20} y={Y(gt.w) - 20} width="40" height="40" rx="8" fill={A} />
      <text className="gate-text" x={x} y={Y(gt.w) + 6} textAnchor="middle">{gt.l}</text>
    </g>
  );
  if (gt.t === 'cx' || gt.t === 'ccx') {
    const ws = [...gt.c, gt.tg];
    return (<>
      {vline(Math.min(...ws), Math.max(...ws))}
      <g className="gate" style={style}>
        {gt.c.map((w) => <circle key={w} cx={x} cy={Y(w)} r="7" fill={A} />)}
        <circle cx={x} cy={Y(gt.tg)} r="15" fill="#24123A" stroke={A} strokeWidth="2.5" />
        <path d={`M${x} ${Y(gt.tg) - 15}v30M${x - 15} ${Y(gt.tg)}h30`} stroke={A} strokeWidth="2.5" />
      </g>
    </>);
  }
  return (<>
    {vline(gt.a, gt.b)}
    <g className="gate" style={style}>
      {[gt.a, gt.b].map((w) => <path key={w} d={`M${x - 9} ${Y(w) - 9}l18 18M${x + 9} ${Y(w) - 9}l-18 18`} stroke={A} strokeWidth="3" strokeLinecap="round" />)}
    </g>
  </>);
}

export default function Lab() {
  const [sel, setSel] = useState(0);
  const ex = EXAMPLES[sel];

  return (
    <div className="lab">
      <div className="lab__controls">
        <p className="muted-on-dark">Pick a line of ordinary code to see the circuit it becomes.</p>
        <div className="chips" role="group" aria-label="Code examples">
          {EXAMPLES.map((e, i) => (
            <button key={e.code} type="button" className="chip" aria-pressed={i === sel} onClick={() => setSel(i)}>{e.code}</button>
          ))}
        </div>
        <p className="lab__code" aria-live="polite">{ex.code}</p>
        <p className="lab__note">{ex.note}</p>
      </div>
      <figure className="lab__panel">
        <svg className="circuit" viewBox="0 0 560 216" role="img" aria-label={ex.label}>
          {/* key remounts the drawing so the gate drop-in animation replays on each pick */}
          <Fragment key={sel}>
            {['a', 'b', 'out'].map((l, i) => (
              <Fragment key={l}>
                <text x="0" y={Y(i) + 5}>{l}</text>
                <line x1="60" x2="560" y1={Y(i)} y2={Y(i)} stroke="#6E5A92" strokeWidth="2" />
              </Fragment>
            ))}
            {ex.gates.map((gt, i) => <Gate key={i} gt={gt} i={i} />)}
          </Fragment>
        </svg>
        <figcaption>Textbook mappings, drawn by hand. The model learns translations like these from paired examples.</figcaption>
      </figure>
    </div>
  );
}
