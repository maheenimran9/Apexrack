import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Layers, Maximize2, ShieldCheck, Sliders, Truck } from 'lucide-react';
import gsap from 'gsap';
import { HOME_CATEGORIES, PRODUCTS_DATA, SITE_IMAGES } from '../data/siteData';
import ActionButton from '../components/ui/ActionButton';
import MediaFrame from '../components/ui/MediaFrame';
import Reveal from '../components/ui/Reveal';
import SectionHeading from '../components/ui/SectionHeading';
import FaqAccordion from '../components/FaqAccordion';
import CtaBand from '../components/CtaBand';

const HERO_SPOTLIGHTS = [
  {
    slug: 'pallet-racking',
    tag: 'Pallet Storage',
    label: 'Pallet Racking',
    caption: 'Strong upright frames built for tall distribution aisles and heavy pallets.',
    image: SITE_IMAGES.heroWarehouse,
  },
  {
    slug: 'selective-racking',
    tag: 'Direct Access',
    label: 'Selective Racking',
    caption: 'Direct access to every pallet so pickers never shift other loads.',
    image: SITE_IMAGES.selectiveRack,
  },
  {
    slug: 'cantilever-racking',
    tag: 'Long Stock',
    label: 'Cantilever Racking',
    caption: 'Open-front steel arms built for long timber, pipes, and bar stock.',
    image: SITE_IMAGES.cantileverRack,
  },
  {
    slug: 'mezzanine-flooring',
    tag: 'Second Level',
    label: 'Mezzanine Flooring',
    caption: 'Bolt-together second-floor platforms that double your usable workspace.',
    image: SITE_IMAGES.mezzanine,
  },
];

export default function HomePage() {
  const [heroIdx, setHeroIdx] = useState(0);
  const heroRef = useRef<HTMLElement | null>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const activeHero = HERO_SPOTLIGHTS[heroIdx];

  useEffect(() => {
    if (!heroRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-hero-stagger]',
        { y: 10 },
        {
          y: 0,
          duration: 0.34,
          stagger: 0.04,
          ease: 'power2.out',
          clearProps: 'transform',
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleSpotlightSelect = (idx: number) => {
    setHeroIdx(idx);
    if (spotlightRef.current && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.fromTo(
        spotlightRef.current,
        { opacity: 0.65, scale: 0.99 },
        { opacity: 1, scale: 1, duration: 0.28, ease: 'power2.out', clearProps: 'transform,opacity' }
      );
    }
  };

  const capabilities = [
    {
      badge: 'Code Compliant',
      icon: ShieldCheck,
      title: 'Heavy-Duty Steel Frames',
      description:
        'Racks and shelving built to RMI and SEMA load codes for safe daily forklift operation.',
    },
    {
      badge: 'High Density',
      icon: Maximize2,
      title: 'More Space in the Same Building',
      description:
        'Tighter aisle layouts and steel mezzanines help you add pallet positions without moving.',
    },
    {
      badge: 'Custom Sized',
      icon: Sliders,
      title: 'Sized to Your Pallets & Lifts',
      description:
        'Beam spans, upright heights, and post guards matched cleanly to your floor plan and trucks.',
    },
    {
      badge: 'Full Crew',
      icon: Truck,
      title: 'Supply & On-Site Installation',
      description:
        'Fast shipping and experienced install crews across the UK, USA, Canada, and UAE.',
    },
  ];

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section
        ref={heroRef}
        className="relative bg-[#14243A] text-white border-b border-white/10 overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_20%,rgba(240,120,36,0.14),transparent_58%)]"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-blueprint-grid opacity-20" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10 sm:pt-11 sm:pb-12 lg:pt-12 lg:pb-13">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-6 space-y-5">
              <div
                data-hero-stagger
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[20px] bg-white/8 border border-white/15 text-xs sm:text-sm font-medium text-slate-200"
              >
                <Layers className="w-3.5 h-3.5 text-[#F07824]" aria-hidden="true" />
                <span>Free Floor Drawing · Dispatch in 5–7 Business Days</span>
              </div>

              <h1
                data-hero-stagger
                className="font-display text-[clamp(1.95rem,8vw,2.45rem)] sm:text-4xl lg:text-[42px] font-bold text-white leading-[1.12] sm:leading-[1.08] tracking-tight [text-wrap:balance]"
              >
                Fit More Stock in Your Warehouse, Without Moving Building.
              </h1>

              <p
                data-hero-stagger
                className="text-base sm:text-[17px] leading-relaxed text-slate-300 max-w-xl"
              >
                Heavy-duty pallet racking, industrial shelving, and steel mezzanines built to RMI
                &amp; SEMA codes. We measure your floor, supply the steel, and quote within 1
                business day.
              </p>

              <div data-hero-stagger className="flex flex-wrap items-center gap-3 pt-1">
                <ActionButton to="/request-quote" variant="primary" className="px-5 py-3 min-h-[46px]">
                  <span>Request a Quote</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" />
                </ActionButton>

                <ActionButton
                  to="/products"
                  variant="outline-light"
                  className="px-5 py-3 min-h-[46px]"
                >
                  Browse All 8 Systems
                </ActionButton>
              </div>

              <div
                data-hero-stagger
                className="pt-4 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm text-slate-300"
              >
                <span>Supply &amp; on-site install · Crews booking this month</span>
                <span className="font-mono text-xs sm:text-sm text-slate-400 whitespace-nowrap">
                  UK · USA · Canada · UAE
                </span>
              </div>
            </div>

            {/* Right Visual Stage (Controlled Laptop Height) */}
            <div data-hero-stagger className="lg:col-span-6 space-y-2.5">
              <div
                ref={spotlightRef}
                className="relative rounded-2xl overflow-hidden border border-white/15 bg-[#0C1726] h-[240px] sm:h-[285px] lg:h-[315px] shadow-[0_20px_48px_-16px_rgba(0,0,0,0.45)]"
              >
                <MediaFrame
                  key={activeHero.slug}
                  src={activeHero.image}
                  alt={activeHero.label}
                  priority
                  className="absolute inset-0 w-full h-full"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#0C1726]/95 via-[#0C1726]/25 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-4">
                  <div className="rounded-xl bg-[#0C1726]/80 backdrop-blur-md border border-white/15 p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="text-xs font-mono text-[#F07824]">{activeHero.tag}</div>
                      <div className="font-display text-base sm:text-lg font-bold text-white mt-0.5">
                        {activeHero.label}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-200/90 mt-0.5 max-w-sm leading-snug">
                        {activeHero.caption}
                      </p>
                    </div>

                    <Link
                      to={`/products/${activeHero.slug}`}
                      className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[38px] text-sm font-semibold text-white bg-[#F07824] hover:bg-[#D86617] rounded-[20px] transition-[transform,background-color] duration-150 agency-ease hover:-translate-y-px active:scale-[0.98] whitespace-nowrap shrink-0"
                    >
                      <span>Specs</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Switcher Rail */}
              <div
                className="p-1.5 bg-[#0C1726]/90 border border-white/15 rounded-2xl grid grid-cols-2 sm:grid-cols-4 gap-1.5"
                role="tablist"
                aria-label="Featured warehouse systems"
              >
                {HERO_SPOTLIGHTS.map((item, idx) => {
                  const active = idx === heroIdx;
                  return (
                    <button
                      key={item.slug}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => handleSpotlightSelect(idx)}
                      className={`px-3 py-2 rounded-xl text-left transition-colors duration-150 cursor-pointer ${
                        active
                          ? 'bg-[#1E3352] text-white shadow-sm'
                          : 'text-slate-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span
                        className={`block font-mono text-[11px] ${
                          active ? 'text-[#F07824]' : 'text-slate-500'
                        }`}
                      >
                        {item.tag}
                      </span>
                      <span className="block text-[13px] font-semibold truncate mt-0.5">
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORE STORAGE SYSTEMS */}
      <section className="bg-white py-11 lg:py-14 border-b border-slate-200/80">
        <Reveal className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-7">
          <SectionHeading
            eyebrow="Storage Systems"
            title="Warehouse Storage Systems"
            description="Pick a system below to check load ratings, dimensions, and aisle options, or browse all 8 equipment lines."
            actionLabel={`Browse All ${PRODUCTS_DATA.length} Systems`}
            actionTo="/products"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Lead Focal Tile */}
            <Link
              to={`/products/${HOME_CATEGORIES[0].slug}`}
              className="group lg:col-span-6 relative min-h-[280px] sm:min-h-[320px] lg:min-h-[380px] rounded-2xl overflow-hidden bg-[#14243A] flex flex-col justify-end border border-slate-200/80 hover:border-[#14243A] hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-15px_rgba(20,36,58,0.18)] transition-[transform,border-color,box-shadow] duration-200 agency-ease"
            >
              <MediaFrame
                src={HOME_CATEGORIES[0].image}
                alt={HOME_CATEGORIES[0].name}
                zoomOnHover
                className="absolute inset-0 w-full h-full"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#0C1726]/95 via-[#0C1726]/40 to-transparent"
              />
              <div className="relative p-6 sm:p-7 space-y-2">
                <span className="font-mono text-xs sm:text-sm text-[#F07824] tabular-nums">
                  {HOME_CATEGORIES[0].specHighlight}
                </span>
                <h3 className="font-display text-2xl sm:text-[28px] font-bold text-white">
                  {HOME_CATEGORIES[0].name}
                </h3>
                <p className="text-[15px] sm:text-base leading-relaxed text-slate-200 max-w-md">
                  {HOME_CATEGORIES[0].shortDesc}
                </p>
                <div className="pt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-white group-hover:text-[#F07824] transition-colors duration-150">
                  <span>View Specs &amp; Sizes</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>

            {/* Right Asymmetric Stack */}
            <div className="lg:col-span-6 flex flex-col gap-5">
              <Link
                to={`/products/${HOME_CATEGORIES[3].slug}`}
                className="group bg-[#F4F6F8] border border-slate-200/80 hover:border-[#14243A] hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-15px_rgba(20,36,58,0.14)] rounded-2xl overflow-hidden grid grid-cols-1 sm:grid-cols-12 transition-[transform,border-color,box-shadow] duration-200 agency-ease"
              >
                <div className="sm:col-span-5 h-[175px] sm:h-auto sm:min-h-[175px]">
                  <MediaFrame
                    src={HOME_CATEGORIES[3].image}
                    alt={HOME_CATEGORIES[3].name}
                    zoomOnHover
                    className="w-full h-full"
                  />
                </div>
                <div className="sm:col-span-7 p-5 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="font-mono text-xs text-[#F07824] tabular-nums">
                      Second-Level Deck · {HOME_CATEGORIES[3].specHighlight}
                    </span>
                    <h3 className="font-display text-xl font-bold text-[#14243A] mt-1">
                      {HOME_CATEGORIES[3].name}
                    </h3>
                    <p className="text-sm sm:text-[15px] leading-relaxed text-[#202B38]/85 mt-1.5">
                      {HOME_CATEGORIES[3].shortDesc}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#14243A] group-hover:text-[#F07824] transition-colors duration-150">
                    <span>View Specs</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 flex-1">
                {[HOME_CATEGORIES[1], HOME_CATEGORIES[2]].map((cat) => (
                  <Link
                    key={cat.slug}
                    to={`/products/${cat.slug}`}
                    className="group bg-white border border-slate-200/80 hover:border-[#14243A] hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-15px_rgba(20,36,58,0.14)] rounded-2xl overflow-hidden flex flex-col justify-between transition-[transform,border-color,box-shadow] duration-200 agency-ease"
                  >
                    <div className="h-[145px] sm:h-[140px] border-b border-slate-200/80">
                      <MediaFrame
                        src={cat.image}
                        alt={cat.name}
                        zoomOnHover
                        className="w-full h-full"
                      />
                    </div>
                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-2.5">
                      <div>
                        <span className="font-mono text-xs text-slate-500 tabular-nums">
                          {cat.specHighlight}
                        </span>
                        <h3 className="font-display text-lg sm:text-xl font-bold text-[#14243A] mt-0.5">
                          {cat.name}
                        </h3>
                        <p className="text-sm leading-relaxed text-[#202B38]/85 mt-1">
                          {cat.shortDesc}
                        </p>
                      </div>
                      <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#14243A] group-hover:text-[#F07824] transition-colors duration-150">
                        <span>View Specs</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 3. WHY CHOOSE APEXRACK? */}
      <section className="bg-[#F4F6F8] py-11 lg:py-14 border-b border-slate-200/80">
        <Reveal className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start lg:items-center">
            <div className="lg:col-span-5 space-y-4">
              <SectionHeading
                eyebrow="Why ApexRack"
                title="Built Right. Installed Fast."
                description="Strong steel hardware paired with clear floor planning so your team gets more pallet positions without headaches."
              />

              <div className="flex flex-wrap gap-5 text-sm font-semibold">
                <Link
                  to="/industries"
                  className="group inline-flex items-center gap-1.5 text-[#14243A] hover:text-[#F07824] transition-colors"
                >
                  <span>Industries We Serve</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to="/projects"
                  className="group inline-flex items-center gap-1.5 text-[#14243A] hover:text-[#F07824] transition-colors"
                >
                  <span>Completed Projects</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" />
                </Link>
              </div>

              <div className="h-[200px] sm:h-[225px] rounded-2xl overflow-hidden border border-slate-200/80 shadow-[0_8px_24px_-12px_rgba(20,36,58,0.12)]">
                <MediaFrame
                  src={SITE_IMAGES.warehouseEngineering}
                  alt="Commercial warehouse outfitted with steel pallet racking aisles"
                  className="w-full h-full"
                />
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {capabilities.map((cap) => {
                const Icon = cap.icon;
                return (
                  <div
                    key={cap.title}
                    className="bg-white border border-slate-200/80 hover:border-[#14243A]/40 hover:shadow-[0_12px_26px_-14px_rgba(20,36,58,0.12)] rounded-2xl p-5 sm:p-6 space-y-2.5 transition-[border-color,box-shadow] duration-200 agency-ease"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-xl bg-[#F07824]/10 text-[#F07824] inline-flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-mono text-xs font-medium text-slate-400">
                        {cap.badge}
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-[#14243A]">{cap.title}</h3>
                    <p className="text-[15px] leading-relaxed text-[#202B38]/85">
                      {cap.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mid-Page Layout Help Callout */}
          <div className="mt-8 bg-[#14243A] text-white rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-white/10">
            <div className="space-y-1">
              <div className="font-mono text-xs text-[#F07824] font-semibold">
                Free Floor Drawing Included
              </div>
              <p className="font-display text-lg sm:text-xl font-bold">
                Send your room dimensions, and we&apos;ll draw a bay plan and send a quote within 1 business day.
              </p>
            </div>
            <ActionButton to="/request-quote" variant="primary" className="shrink-0">
              <span>Get a Free Floor Plan</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" />
            </ActionButton>
          </div>
        </Reveal>
      </section>

      {/* 4. COMPACT INSTALLATION FAQ */}
      <section className="bg-white py-11 lg:py-14 border-b border-slate-200/80">
        <FaqAccordion />
      </section>

      {/* 5. FINAL CTA BAND */}
      <CtaBand
        eyebrow="Install Crews Booking This Month · 1-Day Written Quote"
        title="Planning a New Rack Layout or Mezzanine?"
        description="Send your room size, ceiling height, and pallet weights for a straight written quote and floor drawing."
        ctaLabel="Request a Quote"
        ctaTo="/request-quote"
        secondaryLabel="Contact Us"
        secondaryTo="/contact"
      />
    </div>
  );
}
