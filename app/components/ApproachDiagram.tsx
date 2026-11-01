const MONO = "'Cascadia Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

// The towers' artwork was drawn on a 1:2 slope. These shears bring it onto the floor's slope
// (115:260), so every edge heading into the distance runs at the same angle.
const STACK_LEFT_FACE = "matrix(1 -0.0577 0 1 0 24)";
const STACK_RIGHT_FACE = "matrix(1 0.0577 0 1 0 8.98)";
const DESIGN_LEFT_FACE = "matrix(1 -0.0577 0 1 0 39)";
const DESIGN_RIGHT_FACE = "matrix(1 0.0577 0 1 0 -6.02)";

// Scale each tower up from its base, so the two meet at the center of the floor.
const STACK_TOWER = "matrix(1.2 0 0 1.2 -16 -38.6)";
const DESIGN_TOWER = "matrix(1.2 0 0 1.2 -88 -38.6)";
// Lays artwork on the floor's southeast wall: x runs along the wall (0-260), y runs down it (0-45).
const SOUTHEAST_WALL = "matrix(1 -0.4423 0 1 260 308.09)";

const pillText = { fontFamily: MONO, fontWeight: "bold", textAnchor: "middle" } as const;

const RACK_WIDTH = 34;
const UNIT_HEIGHT = 15;
const UNIT_STEP = 18;
const GREEN = "#34d399";
const BLUE = "#38bdf8";

/**
 * A server cabinet on the Tech Stack tower: a frame with mounting rails, holding a network
 * switch (a row of ports) and servers (drive bays and status lights). `u` runs across the
 * rack and `v` runs down it, following the slope of the face.
 */
function Rack({ x, y, units }: { x: number; y: number; units: { switch?: boolean; lights: [string, string] }[] }) {
  const px = (u: number) => x + u;
  const py = (u: number, v: number) => y - u / 2 + v;
  const quad = (u: number, v: number, w: number, h: number) =>
    [
      [u, v],
      [u + w, v],
      [u + w, v + h],
      [u, v + h],
    ]
      .map(([a, b]) => `${px(a)},${py(a, b)}`)
      .join(" ");

  return (
    <>
      <polygon points={quad(0, 0, RACK_WIDTH, 100)} fill="#0f172a" />
      <polygon points={quad(0, 0, RACK_WIDTH, 100)} fill="none" stroke="#475569" strokeWidth="0.8" />
      {[2, RACK_WIDTH - 2].map((u) => (
        <line key={u} x1={px(u)} y1={py(u, 3)} x2={px(u)} y2={py(u, 97)} stroke="#64748b" strokeWidth="0.8" />
      ))}
      {units.map((unit, i) => {
        const top = 6 + i * UNIT_STEP;
        return (
          <g key={i}>
            <polygon points={quad(3.5, top, RACK_WIDTH - 7, UNIT_HEIGHT)} fill="#1e293b" stroke="#334155" strokeWidth="0.5" />
            {unit.switch
              ? [0, 1, 2, 3, 4, 5].map((n) => (
                  <polygon key={n} points={quad(6 + n * 3, top + 5, 2, 3.5)} fill={n % 2 ? BLUE : "#94a3b8"} />
                ))
              : [0, 1, 2, 3].map((n) => (
                  <polygon key={n} points={quad(6 + n * 4, top + 3, 3, UNIT_HEIGHT - 6)} fill="#475569" />
                ))}
            {unit.lights.map((fill, n) => (
              <circle
                key={n}
                cx={px(25.5 + n * 3)}
                cy={py(25.5 + n * 3, top + UNIT_HEIGHT / 2)}
                r="1.1"
                fill={fill}
                className={(i + n) % 3 === 0 ? "rack-light" : undefined}
                style={{ animationDelay: `${(i * 0.4 + n * 0.7).toFixed(1)}s` }}
              />
            ))}
          </g>
        );
      })}
    </>
  );
}

/** A code editor and two graphs, built into the southeast wall of the data floor. */
function DataWall() {
  const panel = { fill: "#064e3b", stroke: "#34d399", strokeWidth: 0.6 };
  const code: [number, number, string][] = [
    [0, 22, "#a7f3d0"],
    [4, 34, "#34d399"],
    [8, 26, "#ecfdf5"],
    [8, 38, "#6ee7b7"],
    [4, 18, "#34d399"],
    [0, 10, "#a7f3d0"],
  ];
  return (
    <g transform={SOUTHEAST_WALL}>
      {/* Code editor */}
      <rect x="14" y="5" width="72" height="35" rx="2" {...panel} />
      <rect x="14" y="5" width="72" height="6" rx="2" fill="#047857" />
      {["#fda4af", "#fcd34d", "#6ee7b7"].map((fill, i) => (
        <circle key={fill} cx={18 + i * 3.5} cy="8" r="1" fill={fill} />
      ))}
      {code.map(([indent, width, fill], i) => (
        <rect key={i} x={19 + indent} y={14 + i * 4} width={width} height="1.7" rx="0.8" fill={fill} />
      ))}

      {/* Line graph */}
      <rect x="94" y="5" width="78" height="35" rx="2" {...panel} />
      {[12, 20, 28].map((y) => (
        <line key={y} x1="99" y1={y} x2="167" y2={y} stroke="#34d399" strokeWidth="0.3" opacity="0.6" />
      ))}
      <polygon
        points="99,36 99,31 109,28 118,30 128,23 137,25 146,16 154,19 167,9 167,36"
        fill="#34d399"
        opacity="0.35"
      />
      <polyline
        points="99,31 109,28 118,30 128,23 137,25 146,16 154,19 167,9"
        fill="none"
        stroke="#a7f3d0"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <line x1="99" y1="36" x2="167" y2="36" stroke="#a7f3d0" strokeWidth="0.5" />

      {/* Bar graph */}
      <rect x="180" y="5" width="66" height="35" rx="2" {...panel} />
      {[8, 12, 10, 16, 20, 18, 25].map((height, i) => (
        <rect key={i} x={186 + i * 8} y={36 - height} width="5" height={height} rx="0.8" fill={i === 6 ? "#a7f3d0" : "#34d399"} />
      ))}
      <line x1="185" y1="36" x2="241" y2="36" stroke="#a7f3d0" strokeWidth="0.5" />
    </g>
  );
}

/**
 * Tech Stack and Conversion Design standing on a Foundational Data floor. The floor appears
 * first and the towers follow as the section scrolls into view (see .stack-layer in globals.css).
 */
export default function ApproachDiagram() {
  return (
    <svg
      viewBox="0 -8 520 361.09"
      role="img"
      aria-label="Two towers, labeled tech stack and conversion design, standing on a wide platform labeled foundational data."
      className="mx-auto w-full max-w-lg"
    >
      <defs>
        <linearGradient id="approach-data" x1="0" y1="78.09" x2="170.17" y2="462.82" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#a7f3d0" />
          <stop offset="0.5" stopColor="#34d399" />
          <stop offset="1" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="approach-stack" x1="30" y1="73" x2="178.59" y2="160" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#e0f2fe" />
          <stop offset="0.5" stopColor="#38bdf8" />
          <stop offset="1" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="approach-design" x1="290" y1="73" x2="438.59" y2="160" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#f3e8ff" />
          <stop offset="0.5" stopColor="#c084fc" />
          <stop offset="1" stopColor="#7e22ce" />
        </linearGradient>
      </defs>

      {/* Foundational data */}
      <g className="stack-layer [--layer-delay:0.1s]">
        <polygon points="260,78.09 520,193.09 260,308.09 0,193.09" fill="url(#approach-data)" opacity="0.92" />
        <polygon points="0,193.09 260,308.09 260,353.09 0,238.09" fill="#047857" opacity="0.85" />
        <polygon points="260,308.09 520,193.09 520,238.09 260,353.09" fill="#065f46" opacity="0.9" />
        <g fontFamily={MONO} fontSize="6.5" fill="#a7f3d0">
          <text transform="matrix(1.13 0.5 0 1.11 12 212)">
            SELECT * FROM search_intent;
          </text>
          <text transform="matrix(1.13 0.5 0 1.11 12 224)">
            RANK() OVER (ORDER BY score);
          </text>
        </g>
        <DataWall />
        <rect x="172" y="240" width="176" height="26" rx="7" fill="#064e3b" stroke="#34d399" strokeWidth="1.5" />
        <text x="260" y="257.5" fontSize="13" letterSpacing="1.2" fill="#ecfdf5" {...pillText}>
          FOUNDATIONAL DATA
        </text>
      </g>

      {/* Tech stack */}
      <g className="stack-layer [--layer-delay:0.45s]">
        <g transform={STACK_TOWER}>
          <polygon points="130,28.77 230,73 130,117.23 30,73" fill="#f0f9ff" />
          <polygon points="30,73 130,117.23 130,237.23 30,193" fill="url(#approach-stack)" />
          <polygon points="130,117.23 230,73 230,193 130,237.23" fill="#0284c7" />
          <g transform={STACK_LEFT_FACE} opacity="0.75" fontFamily={MONO} fontSize="8.09">
            <text transform="matrix(1.11 0.54 0 1.11 33.3 146.52)" fill="#ffffff">
              npm run build
            </text>
            <text transform="matrix(1.11 0.54 0 1.11 33.3 161.52)" fill="#ffffff">
              Ready in 2.1s
            </text>
          </g>
          <g transform={STACK_RIGHT_FACE}>
            <Rack
              x={149}
              y={101.25}
              units={[
                { switch: true, lights: [GREEN, BLUE] },
                { lights: [GREEN, GREEN] },
                { lights: [GREEN, BLUE] },
                { lights: [BLUE, GREEN] },
                { lights: [GREEN, GREEN] },
              ]}
            />
            <Rack
              x={189}
              y={81.25}
              units={[
                { lights: [BLUE, GREEN] },
                { switch: true, lights: [GREEN, GREEN] },
                { lights: [GREEN, BLUE] },
                { lights: [GREEN, GREEN] },
                { lights: [BLUE, GREEN] },
              ]}
            />
          </g>
        </g>
        <rect x="75" y="36" width="130" height="26" rx="6" fill="#f0f9ff" stroke="#0284c7" strokeWidth="1.5" />
        <text x="140" y="54" fontSize="12" letterSpacing="0.5" fill="#0369a1" {...pillText}>
          TECH STACK
        </text>
      </g>

      {/* Conversion design */}
      <g className="stack-layer [--layer-delay:0.75s]">
        <g transform={DESIGN_TOWER}>
          <polygon points="390,28.77 490,73 390,117.23 290,73" fill="#faf5ff" />
          <polygon points="290,73 390,117.23 390,237.23 290,193" fill="url(#approach-design)" />
          <polygon points="390,117.23 490,73 490,193 390,237.23" fill="#7e22ce" />
          <g transform={DESIGN_LEFT_FACE}>
            <polygon points="300,65.75 340,85.75 340,125.75 300,105.75" fill="#ffffff" opacity="0.95" />
            <polygon points="300,65.75 340,85.75 340,92.75 300,72.75" fill="#e9d5ff" />
            <circle cx="305" cy="71.75" r="1" fill="#7e22ce" />
            <circle cx="308" cy="72.75" r="1" fill="#c084fc" />
            <line x1="305" y1="95.75" x2="330" y2="107.75" stroke="#7e22ce" strokeWidth="1.5" />
            <polygon points="305,103.75 320,110.75 320,117.75 305,110.75" fill="#c084fc" />
            <polygon points="350,90.75 375,102.75 375,150.75 350,138.75" fill="#ffffff" opacity="0.9" />
            <polygon points="350,90.75 375,102.75 375,107.75 350,95.75" fill="#7e22ce" />
            <polygon points="305,115.75 340,133.75 340,175.75 305,157.75" fill="#ffffff" opacity="0.95" />
            <line x1="310" y1="133.75" x2="335" y2="145.75" stroke="#7e22ce" strokeWidth="1.5" />
            <polyline points="310,147.75 320,149.75 328,143.75 335,150.75" fill="none" stroke="#a855f7" strokeWidth="1.5" />
            <polygon points="348,145.75 378,160.75 378,200.75 348,185.75" fill="#ffffff" opacity="0.9" />
            <polygon points="352,157.75 372,167.75 372,177.75 352,167.75" fill="none" stroke="#c084fc" />
            <line x1="352" y1="183.75" x2="370" y2="192.75" stroke="#7e22ce" strokeWidth="2" />
          </g>
          <g transform={DESIGN_RIGHT_FACE} opacity="0.75">
            <path
              d="M446.09 79.67 L451.98 76.52 C453.06 75.94 453.97 76.37 454.01 77.47 L454.24 83.47 C454.28 84.57 453.43 85.94 452.35 86.52 L446.46 89.67 C445.38 90.25 444.47 89.82 444.43 88.72 L444.2 82.72 C444.16 81.62 445.01 80.25 446.09 79.67 Z"
              fill="#ffffff"
            />
            <path
              d="M460.8 71.8 L466.69 68.65 C467.77 68.07 468.69 68.49 468.73 69.6 L468.95 75.59 C468.99 76.7 468.15 78.06 467.07 78.64 L461.18 81.79 C460.1 82.37 459.18 81.95 459.14 80.84 L458.92 74.85 C458.88 73.74 459.72 72.38 460.8 71.8 Z"
              fill="#e9d5ff"
            />
            <path
              d="M475.52 63.92 L481.4 60.78 C482.49 60.2 483.4 60.62 483.44 61.72 L483.67 67.72 C483.71 68.82 482.86 70.19 481.78 70.77 L475.89 73.92 C474.81 74.5 473.9 74.07 473.86 72.97 L473.63 66.97 C473.59 65.87 474.44 64.5 475.52 63.92 Z"
              fill="#c084fc"
            />
          </g>
        </g>
        <rect x="300" y="36" width="160" height="26" rx="6" fill="#faf5ff" stroke="#7e22ce" strokeWidth="1.5" />
        <text x="380" y="54" fontSize="12" letterSpacing="0.5" fill="#6b21a8" {...pillText}>
          CONVERSION DESIGN
        </text>
      </g>
    </svg>
  );
}
