interface RackTechnicalDiagramProps {
  type: 'selective' | 'cantilever' | 'shelving' | 'mezzanine';
  heightLabel: string;
  widthLabel: string;
  loadLabel: string;
}

export default function RackTechnicalDiagram({
  type,
  heightLabel,
  widthLabel,
  loadLabel,
}: RackTechnicalDiagramProps) {
  return (
    <div className="bg-[#F4F6F8] bg-blueprint-grid border border-slate-200/80 rounded-xl p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-[11px] font-mono text-slate-600 mb-3">
        <span>Standard Elevation Schematic · Modular Layout</span>
        <span className="text-[#14243A] font-medium tabular-nums">{loadLabel}</span>
      </div>

      <svg
        viewBox="0 0 380 156"
        className="w-full h-36 sm:h-40 text-[#14243A]"
        role="img"
        aria-label={`Technical elevation schematic for ${type} storage system`}
      >
        {/* Floor Concrete Slab Datum */}
        <line x1="28" y1="132" x2="360" y2="132" stroke="#94A3B8" strokeWidth="1.5" />
        <line x1="28" y1="135" x2="360" y2="135" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="4 4" />

        {type === 'selective' && (
          <>
            {/* Structural Upright Columns */}
            <rect x="64" y="18" width="8" height="114" fill="#14243A" />
            <rect x="184" y="18" width="8" height="114" fill="#14243A" />
            <rect x="304" y="18" width="8" height="114" fill="#14243A" />
            {/* Baseplates */}
            <rect x="60" y="129" width="16" height="3" fill="#14243A" />
            <rect x="180" y="129" width="16" height="3" fill="#14243A" />
            <rect x="300" y="129" width="16" height="3" fill="#14243A" />
            {/* Step Beams */}
            <rect x="72" y="32" width="112" height="6" fill="#F07824" />
            <rect x="192" y="32" width="112" height="6" fill="#F07824" />
            <rect x="72" y="66" width="112" height="6" fill="#F07824" />
            <rect x="192" y="66" width="112" height="6" fill="#F07824" />
            <rect x="72" y="100" width="112" height="6" fill="#F07824" />
            <rect x="192" y="100" width="112" height="6" fill="#F07824" />
            {/* Sample Pallet Unit Loads */}
            <rect x="86" y="46" width="36" height="18" fill="#CBD5E1" stroke="#64748B" strokeWidth="1" />
            <rect x="134" y="46" width="36" height="18" fill="#CBD5E1" stroke="#64748B" strokeWidth="1" />
            <rect x="206" y="80" width="36" height="18" fill="#CBD5E1" stroke="#64748B" strokeWidth="1" />
            <rect x="254" y="80" width="36" height="18" fill="#CBD5E1" stroke="#64748B" strokeWidth="1" />
          </>
        )}

        {type === 'cantilever' && (
          <>
            {/* Heavy Flanged Bases */}
            <rect x="88" y="123" width="64" height="9" fill="#14243A" />
            <rect x="224" y="123" width="64" height="9" fill="#14243A" />
            {/* Vertical I-Beam Columns */}
            <rect x="115" y="20" width="10" height="103" fill="#14243A" />
            <rect x="251" y="20" width="10" height="103" fill="#14243A" />
            {/* Cantilever Arms */}
            {[36, 62, 88, 110].map((y) => (
              <g key={y}>
                <polygon points={`90,${y} 115,${y} 115,${y + 6} 90,${y + 4}`} fill="#F07824" />
                <polygon points={`125,${y} 150,${y} 150,${y + 4} 125,${y + 6}`} fill="#F07824" />
                <polygon points={`226,${y} 251,${y} 251,${y + 6} 226,${y + 4}`} fill="#F07824" />
                <polygon points={`261,${y} 286,${y} 286,${y + 4} 261,${y + 6}`} fill="#F07824" />
              </g>
            ))}
            {/* Long Bar / Timber Load */}
            <rect x="78" y="54" width="222" height="6" fill="#94A3B8" />
            <rect x="78" y="80" width="222" height="6" fill="#64748B" />
          </>
        )}

        {type === 'shelving' && (
          <>
            {/* Corner Posts */}
            <rect x="76" y="28" width="6" height="104" fill="#14243A" />
            <rect x="185" y="28" width="6" height="104" fill="#14243A" />
            <rect x="294" y="28" width="6" height="104" fill="#14243A" />
            {/* 5 Adjustable Shelf Beams */}
            {[32, 55, 78, 101, 124].map((y) => (
              <g key={y}>
                <rect x="82" y={y} width="103" height="4" fill="#475569" />
                <rect x="191" y={y} width="103" height="4" fill="#475569" />
              </g>
            ))}
            {/* Totes & Cartons */}
            <rect x="94" y="64" width="26" height="12" fill="#F07824" opacity="0.9" />
            <rect x="128" y="64" width="26" height="12" fill="#14243A" opacity="0.85" />
            <rect x="206" y="87" width="32" height="12" fill="#CBD5E1" stroke="#64748B" strokeWidth="1" />
          </>
        )}

        {type === 'mezzanine' && (
          <>
            {/* HSS Columns */}
            <rect x="68" y="56" width="10" height="76" fill="#14243A" />
            <rect x="182" y="56" width="10" height="76" fill="#14243A" />
            <rect x="296" y="56" width="10" height="76" fill="#14243A" />
            {/* Structural Deck Girder */}
            <rect x="56" y="48" width="262" height="10" fill="#334155" />
            {/* Perimeter Safety Guardrails */}
            <line x1="62" y1="24" x2="312" y2="24" stroke="#F07824" strokeWidth="2.5" />
            <line x1="62" y1="36" x2="312" y2="36" stroke="#F07824" strokeWidth="1.5" />
            {[62, 112, 162, 212, 262, 312].map((x) => (
              <line key={x} x1={x} y1="24" x2={x} y2="48" stroke="#F07824" strokeWidth="2" />
            ))}
            {/* Steel Access Staircase */}
            <line x1="316" y1="48" x2="352" y2="132" stroke="#14243A" strokeWidth="3" />
            <line x1="316" y1="24" x2="352" y2="108" stroke="#F07824" strokeWidth="2" />
          </>
        )}

        {/* Dimension Callout Lines */}
        <line x1="40" y1="20" x2="40" y2="132" stroke="#64748B" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="36" y1="20" x2="44" y2="20" stroke="#64748B" strokeWidth="1" />
        <line x1="36" y1="132" x2="44" y2="132" stroke="#64748B" strokeWidth="1" />
        <text x="8" y="80" fontSize="9" fontFamily="monospace" fill="#475569">
          {heightLabel.split(' ')[0]}
        </text>
        <text x="190" y="149" fontSize="9" fontFamily="monospace" fill="#475569" textAnchor="middle">
          Span Reference: {widthLabel}
        </text>
      </svg>
    </div>
  );
}
