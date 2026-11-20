import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Layers } from 'lucide-react';
import gsap from 'gsap';
import PageBanner from '../components/PageBanner';
import MediaFrame from '../components/ui/MediaFrame';
import ActionButton from '../components/ui/ActionButton';
import Reveal from '../components/ui/Reveal';
import CtaBand from '../components/CtaBand';
import { INDUSTRIES_DATA } from '../data/siteData';

export default function IndustriesPage() {
  const [activeId, setActiveId] = useState(INDUSTRIES_DATA[0].id);
  const spotlightRef = useRef<HTMLElement | null>(null);
  const activeIndustry =
    INDUSTRIES_DATA.find((ind) => ind.id === activeId) || INDUSTRIES_DATA[0];

  const selectSector = (id: string, scrollTop?: boolean) => {
    setActiveId(id);
    if (spotlightRef.current && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.fromTo(
        spotlightRef.current,
        { opacity: 0.45, y: 8 },
        { opacity: 1, y: 0, duration: 0.28, ease: 'power2.out', clearProps: 'transform,opacity' }
      );
    }
    if (scrollTop) {
      document.getElementById('sector-workspace')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-[#F4F6F8] min-h-[75vh]">
      <PageBanner
        eyebrow="Industry Solutions"
        title="Industries We Serve"
        description="Pick your industry below to see the exact racking setup, daily problems solved, and recommended equipment."
        breadcrumbCurrent="Industries"
        highlights={[
          { label: 'Core Sectors', value: `${INDUSTRIES_DATA.length} Industries` },
          { label: 'Operating Temp', value: 'Ambient & -20°C' },
          { label: 'Service Regions', value: 'UK · US · CA · UAE' },
        ]}
      />

      <div id="sector-workspace" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 space-y-7">
        {/* Sector Tabs */}
        <div
          className="bg-white border border-slate-200/80 rounded-2xl p-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2"
          role="tablist"
          aria-label="Industry sectors"
        >
          {INDUSTRIES_DATA.map((ind) => {
            const isActive = ind.id === activeIndustry.id;
            return (
              <button
                key={ind.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => selectSector(ind.id)}
                className={`px-4 py-2.5 rounded-xl text-left transition-[background-color,color] duration-150 cursor-pointer flex items-center justify-between gap-2 ${
                  isActive
                    ? 'bg-[#14243A] text-white shadow-sm'
                    : 'text-[#202B38] hover:bg-[#F4F6F8]'
                }`}
              >
                <span className="font-semibold text-sm truncate">{ind.name}</span>
                <span
                  aria-hidden="true"
                  className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                    isActive ? 'bg-[#F07824]' : 'bg-slate-300'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Active Sector Spotlight */}
        <section
          ref={spotlightRef}
          className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12"
        >
          <div className="lg:col-span-5 relative h-[230px] sm:h-[270px] lg:h-auto lg:min-h-[360px]">
            <MediaFrame
              src={activeIndustry.image}
              alt={activeIndustry.name}
              priority
              className="absolute inset-0 w-full h-full"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#0C1726]/90 via-[#0C1726]/25 to-transparent"
            />
            <div className="relative h-full flex flex-col justify-end p-6">
              <span className="font-mono text-xs text-[#F07824]">Sector Focus</span>
              <h2 className="font-display text-2xl sm:text-[26px] font-bold text-white mt-1">
                {activeIndustry.name}
              </h2>
            </div>
          </div>

          <div className="lg:col-span-7 p-6 sm:p-7 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#14243A] leading-snug">
                  {activeIndustry.headline}
                </h3>
                <p className="text-[15px] sm:text-base leading-relaxed text-[#202B38]/85 mt-2">
                  {activeIndustry.description}
                </p>
              </div>

              <div className="bg-[#F4F6F8] rounded-xl p-4 sm:p-5 space-y-2.5">
                <div className="text-xs font-mono uppercase tracking-wide text-slate-500 font-semibold">
                  Key Problems Solved
                </div>
                <ul className="space-y-2 text-sm sm:text-[15px] text-[#202B38]">
                  {activeIndustry.challenges.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#F07824] mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-semibold text-[#14243A] flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-[#F07824]" />
                  <span>Recommended Storage Systems</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeIndustry.recommendedProducts.map((rec) => (
                    <Link
                      key={rec.slug}
                      to={`/products/${rec.slug}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[20px] bg-white border border-slate-300 hover:border-[#14243A] hover:bg-[#14243A] hover:text-white text-sm font-semibold text-[#14243A] transition-colors duration-150"
                    >
                      <span>{rec.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <ActionButton
                  to={`/request-quote?product=${encodeURIComponent(
                    activeIndustry.recommendedProducts[0]?.name || 'Selective Racking'
                  )}`}
                  variant="primary"
                >
                  <span>Quote for {activeIndustry.name}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" />
                </ActionButton>
                <span className="text-xs font-mono text-slate-500">
                  Free floor plan · 1-day quote
                </span>
              </div>

              <Link
                to="/projects"
                className="text-sm font-semibold text-[#14243A] hover:text-[#F07824] transition-colors"
              >
                See Completed Projects →
              </Link>
            </div>
          </div>
        </section>

        {/* All 5 Sectors Quick Overview */}
        <Reveal className="space-y-4 pt-1">
          <div className="flex items-baseline justify-between gap-2">
            <h2 className="font-display text-xl font-bold text-[#14243A]">
              All 5 Sectors at a Glance
            </h2>
            <span className="text-xs sm:text-sm text-slate-500">Click any card to switch view</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {INDUSTRIES_DATA.map((ind) => {
              const selected = ind.id === activeIndustry.id;
              return (
                <button
                  key={ind.id}
                  type="button"
                  onClick={() => selectSector(ind.id, true)}
                  className={`group text-left bg-white rounded-2xl overflow-hidden border transition-[transform,border-color,box-shadow] duration-150 cursor-pointer flex flex-col justify-between ${
                    selected
                      ? 'border-[#F07824] ring-1 ring-[#F07824] shadow-[0_12px_28px_-12px_rgba(240,120,36,0.22)]'
                      : 'border-slate-200/80 hover:border-[#14243A] hover:-translate-y-0.5'
                  }`}
                >
                  <div>
                    <div className="h-[115px] border-b border-slate-200/80">
                      <MediaFrame
                        src={ind.image}
                        alt={ind.name}
                        zoomOnHover
                        className="w-full h-full"
                      />
                    </div>
                    <div className="p-3.5 space-y-1">
                      <span className="font-mono text-[11px] text-[#F07824]">
                        Recommended Setup
                      </span>
                      <h3 className="font-display text-base font-bold text-[#14243A]">{ind.name}</h3>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-snug">
                        {ind.recommendedProducts.map((p) => p.name).join(' · ')}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>

      <CtaBand
        title="Need Racking Built Around Your Warehouse?"
        description="Talk with our team to pick a safe, practical layout that fits your stock and forklifts."
      />
    </div>
  );
}
