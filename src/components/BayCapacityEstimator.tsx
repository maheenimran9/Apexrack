import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, SlidersHorizontal } from 'lucide-react';
import { ProductItem } from '../data/siteData';

interface BayCapacityEstimatorProps {
  product: ProductItem;
}

const AISLE_PRESETS = [
  { id: 'counterbalance', label: 'Counterbalance (12 ft aisle)', aisleFt: 12 },
  { id: 'reach', label: 'Reach Truck (9.5 ft aisle)', aisleFt: 9.5 },
  { id: 'vna', label: 'VNA Turret (6 ft aisle)', aisleFt: 6 },
];

export default function BayCapacityEstimator({ product }: BayCapacityEstimatorProps) {
  const isMezzanine = product.diagramType === 'mezzanine';
  const isShelving = product.diagramType === 'shelving';
  const isCantilever = product.diagramType === 'cantilever';

  const [baysCount, setBaysCount] = useState(12);
  const [levelsCount, setLevelsCount] = useState(isMezzanine ? 1 : isShelving ? 5 : 4);
  const [floorSpanSqFt, setFloorSpanSqFt] = useState(2400);
  const [palletFormat, setPalletFormat] = useState<'gma' | 'euro'>('gma');
  const [aisleId, setAisleId] = useState('reach');

  const aislePreset = AISLE_PRESETS.find((a) => a.id === aisleId) || AISLE_PRESETS[1];
  const palletsPerBayLevel = palletFormat === 'euro' ? 3 : 2;
  const bayWidthFt = palletFormat === 'euro' ? 9 : 8.3;
  const bayDepthFt = 3.67;

  const estimatedPositions = isMezzanine
    ? floorSpanSqFt
    : isCantilever
      ? baysCount * levelsCount * 2
      : isShelving
        ? baysCount * levelsCount
        : baysCount * levelsCount * palletsPerBayLevel;

  const estimatedFloorSqFt = isMezzanine
    ? floorSpanSqFt
    : Math.round(baysCount * bayWidthFt * (bayDepthFt + aislePreset.aisleFt * 0.55));

  const unitLabel = isMezzanine
    ? 'sq ft upper platform floor space'
    : isCantilever
      ? 'arm-level bundle storage slots'
      : isShelving
        ? 'adjustable steel shelf levels'
        : `pallet positions (${palletsPerBayLevel}-wide ${palletFormat === 'euro' ? 'Euro' : 'GMA 48"×40"'} bays)`;

  const configSummary = isMezzanine
    ? `Mezzanine platform estimate: ~${floorSpanSqFt.toLocaleString()} sq ft clear deck.`
    : `Estimated ${baysCount} bays × ${levelsCount} levels (${aislePreset.label}) = ~${estimatedPositions.toLocaleString()} ${unitLabel}, ~${estimatedFloorSqFt.toLocaleString()} sq ft floor area.`;

  return (
    <section className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-7 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2.5">
          <SlidersHorizontal className="w-4 h-4 text-[#F07824] shrink-0" />
          <h2 className="font-display text-xl sm:text-2xl font-bold text-[#14243A]">
            Warehouse Space &amp; Capacity Calculator
          </h2>
        </div>
        <span className="text-sm text-slate-500">Calculate real storage capacity &amp; floor footprint</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-7 space-y-5">
          {!isMezzanine && !isShelving && !isCantilever && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <div className="text-xs font-semibold text-slate-600 mb-1.5">Pallet Footprint</div>
                <div className="grid grid-cols-2 gap-1.5 bg-[#F4F6F8] p-1 rounded-xl border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setPalletFormat('gma')}
                    className={`py-1.5 px-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      palletFormat === 'gma' ? 'bg-white text-[#14243A] shadow-sm' : 'text-slate-600'
                    }`}
                  >
                    US 48&quot;×40&quot;
                  </button>
                  <button
                    type="button"
                    onClick={() => setPalletFormat('euro')}
                    className={`py-1.5 px-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      palletFormat === 'euro' ? 'bg-white text-[#14243A] shadow-sm' : 'text-slate-600'
                    }`}
                  >
                    Euro 1200×800
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="est-aisle" className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Forklift Aisle Type
                </label>
                <select
                  id="est-aisle"
                  value={aisleId}
                  onChange={(e) => setAisleId(e.target.value)}
                  className="w-full px-3 py-1.5 min-h-[38px] text-xs sm:text-sm bg-[#F4F6F8] border border-slate-200 rounded-xl font-medium text-[#14243A]"
                >
                  {AISLE_PRESETS.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {isMezzanine ? (
            <div>
              <div className="flex items-center justify-between text-base sm:text-sm font-medium text-[#14243A] mb-2">
                <label htmlFor="est-sqft">Target Platform Area</label>
                <span className="font-mono tabular-nums font-semibold">
                  {floorSpanSqFt.toLocaleString()} sq ft
                </span>
              </div>
              <input
                id="est-sqft"
                type="range"
                min={600}
                max={12000}
                step={200}
                value={floorSpanSqFt}
                onChange={(e) => setFloorSpanSqFt(Number(e.target.value))}
                className="w-full accent-[#F07824] cursor-pointer"
              />
            </div>
          ) : (
            <>
              <div>
                <div className="flex items-center justify-between text-base sm:text-sm font-medium text-[#14243A] mb-2">
                  <label htmlFor="est-bays">Number of Continuous Bays</label>
                  <span className="font-mono tabular-nums font-semibold">{baysCount} bays</span>
                </div>
                <input
                  id="est-bays"
                  type="range"
                  min={2}
                  max={60}
                  step={1}
                  value={baysCount}
                  onChange={(e) => setBaysCount(Number(e.target.value))}
                  className="w-full accent-[#F07824] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex items-center justify-between text-base sm:text-sm font-medium text-[#14243A] mb-2">
                  <label htmlFor="est-levels">Storage Tiers / Levels High</label>
                  <span className="font-mono tabular-nums font-semibold">{levelsCount} levels</span>
                </div>
                <input
                  id="est-levels"
                  type="range"
                  min={2}
                  max={8}
                  step={1}
                  value={levelsCount}
                  onChange={(e) => setLevelsCount(Number(e.target.value))}
                  className="w-full accent-[#F07824] cursor-pointer"
                />
              </div>
            </>
          )}
        </div>

        <div className="md:col-span-5 bg-[#F4F6F8] border border-slate-200/80 rounded-xl p-5 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Estimated Output
          </div>
          <div className="font-display text-3xl sm:text-4xl font-bold text-[#14243A] tabular-nums">
            {estimatedPositions.toLocaleString()}
          </div>
          <div className="text-sm text-[#202B38]/85 leading-relaxed">{unitLabel}</div>

          <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-600">
            <span>Est. Floor Footprint</span>
            <span className="font-mono font-semibold text-[#14243A] tabular-nums">
              ~{estimatedFloorSqFt.toLocaleString()} sq ft
            </span>
          </div>

          <div className="pt-1">
            <Link
              to={`/request-quote?product=${encodeURIComponent(
                product.name
              )}&notes=${encodeURIComponent(configSummary)}`}
              className="group inline-flex items-center gap-1.5 text-[15px] sm:text-sm font-semibold text-[#F07824] hover:text-[#14243A] transition-colors duration-150"
            >
              <span>Send Specs to Quote</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
