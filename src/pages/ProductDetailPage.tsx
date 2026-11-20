import { useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Camera, Check, Compass, Download } from 'lucide-react';
import gsap from 'gsap';
import RackTechnicalDiagram from '../components/RackTechnicalDiagram';
import BayCapacityEstimator from '../components/BayCapacityEstimator';
import MediaFrame from '../components/ui/MediaFrame';
import ActionButton from '../components/ui/ActionButton';
import Reveal from '../components/ui/Reveal';
import CtaBand from '../components/CtaBand';
import { COMPANY_CONTACT, PRODUCTS_DATA } from '../data/siteData';
import { downloadTextFile } from '../utils/quoteStorage';

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = PRODUCTS_DATA.find((p) => p.slug === slug);
  const [mediaView, setMediaView] = useState<'photo' | 'schematic'>('photo');
  const stageRef = useRef<HTMLDivElement | null>(null);

  if (!product) {
    return (
      <div className="bg-[#F4F6F8] min-h-[70vh] flex items-center justify-center px-4 py-16">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-8 max-w-md text-center space-y-4">
          <h1 className="font-display text-2xl font-bold text-[#14243A]">Product Not Found</h1>
          <p className="text-base text-slate-600">
            We could not find that storage system. View our full catalog to explore all 8 lines.
          </p>
          <ActionButton to="/products" variant="primary">
            Back to Products
          </ActionButton>
        </div>
      </div>
    );
  }

  const switchMediaView = (next: 'photo' | 'schematic') => {
    setMediaView(next);
    if (stageRef.current && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.fromTo(
        stageRef.current,
        { opacity: 0.45, y: 6 },
        { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out', clearProps: 'transform,opacity' }
      );
    }
  };

  const handleDownloadSpecSheet = () => {
    const content = [
      `APEXRACK INDUSTRIAL SOLUTIONS | PRODUCT SPECIFICATION SHEET`,
      `===========================================================`,
      `System: ${product.name}`,
      `Category: ${product.categoryGroup}`,
      ``,
      `OVERVIEW`,
      `${product.overview}`,
      ``,
      `TECHNICAL SPECIFICATIONS`,
      ...product.specs.map((s) => `- ${s.label}: ${s.value}`),
      ``,
      `KEY ADVANTAGES`,
      ...product.keyFeatures.map((f) => `* ${f}`),
      ``,
      `BEST APPLICATIONS`,
      ...product.applications.map((a) => `* ${a}`),
      ``,
      `COMMERCIAL SALES DESK`,
      `Phone: ${COMPANY_CONTACT.primaryPhone}`,
      `Email: ${COMPANY_CONTACT.salesEmail}`,
      `Regions: ${COMPANY_CONTACT.regionsLine}`,
    ].join('\n');

    downloadTextFile(`${product.slug}-spec-sheet.txt`, content);
  };

  const relatedProducts = PRODUCTS_DATA.filter((p) => product.relatedSlugs.includes(p.slug));
  const quickHighlights = [
    product.specs[0],
    product.specs[1],
    product.specs[3] || product.specs[2],
  ].filter(Boolean);

  return (
    <div className="bg-[#F4F6F8] min-h-[75vh]">
      {/* Header with 3 Key Specs */}
      <section className="relative bg-[#14243A] text-white border-b border-white/10 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(240,120,36,0.14),transparent_58%)]"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-blueprint-grid opacity-20" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-5">
          <nav
            aria-label="Breadcrumb"
            className="text-sm text-slate-400 flex flex-wrap items-center gap-2"
          >
            <Link to="/" className="hover:text-white transition-colors duration-150">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link to="/products" className="hover:text-white transition-colors duration-150">
              Products
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-slate-200">{product.name}</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <p className="text-sm font-medium tracking-wide text-[#F07824]">
                {product.categoryGroup}
              </p>
              <h1 className="font-display text-[clamp(1.85rem,7.5vw,2.35rem)] sm:text-3xl lg:text-[40px] font-bold text-white leading-[1.12] tracking-tight [text-wrap:balance]">
                {product.name}
              </h1>
              <p className="text-base sm:text-[17px] leading-relaxed text-slate-300">
                {product.shortDesc}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <ActionButton
                to={`/request-quote?product=${encodeURIComponent(product.name)}`}
                variant="primary"
                className="px-5 py-3 min-h-[46px]"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" />
              </ActionButton>

              <ActionButton
                to="/products"
                variant="outline-light"
                className="px-4 py-3 min-h-[46px]"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>All Products</span>
              </ActionButton>
            </div>
          </div>

          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            {quickHighlights.map((item) => (
              <div
                key={item.label}
                className="bg-white/6 border border-white/12 rounded-xl px-4 py-2.5"
              >
                <dt className="text-xs text-slate-400">{item.label}</dt>
                <dd className="font-mono text-sm sm:text-base font-semibold text-white mt-0.5 tabular-nums">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-9 lg:py-11 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 8 Columns */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-sm font-semibold text-[#14243A]">
                  System View &amp; Layout
                </span>
                <div
                  className="inline-flex items-center gap-1 p-1 bg-[#F4F6F8] rounded-xl border border-slate-200/80"
                  role="tablist"
                  aria-label="System view switcher"
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={mediaView === 'photo'}
                    onClick={() => switchMediaView('photo')}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                      mediaView === 'photo'
                        ? 'bg-white text-[#14243A] shadow-sm'
                        : 'text-slate-600 hover:text-[#14243A]'
                    }`}
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Warehouse Photo</span>
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={mediaView === 'schematic'}
                    onClick={() => switchMediaView('schematic')}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                      mediaView === 'schematic'
                        ? 'bg-white text-[#14243A] shadow-sm'
                        : 'text-slate-600 hover:text-[#14243A]'
                    }`}
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>Rack Diagram</span>
                  </button>
                </div>
              </div>

              <div ref={stageRef}>
                {mediaView === 'photo' ? (
                  <div className="h-[220px] sm:h-[270px] lg:h-[300px] rounded-xl overflow-hidden border border-slate-200/80">
                    <MediaFrame
                      src={product.image}
                      alt={product.name}
                      priority
                      className="w-full h-full"
                    />
                  </div>
                ) : (
                  <RackTechnicalDiagram
                    type={product.diagramType}
                    heightLabel={product.specs[0]?.value || 'Standard'}
                    widthLabel={product.specs[1]?.value || 'Modular'}
                    loadLabel={product.specs[3]?.value || 'Standard Load Rating'}
                  />
                )}
              </div>

              <p className="text-base leading-relaxed text-[#202B38]/85 pt-1">
                {product.overview}
              </p>
            </div>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 space-y-3.5">
                <h2 className="font-display text-lg sm:text-xl font-bold text-[#14243A]">
                  Key Benefits
                </h2>
                <ul className="space-y-2.5 text-[15px] text-[#202B38]">
                  {product.keyFeatures.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 leading-relaxed">
                      <Check className="w-4 h-4 text-[#F07824] mt-1 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 space-y-3.5">
                <h2 className="font-display text-lg sm:text-xl font-bold text-[#14243A]">
                  Best Used For
                </h2>
                <ul className="space-y-2.5 text-[15px] text-[#202B38]/85">
                  {product.applications.map((app) => (
                    <li key={app} className="flex items-start gap-2.5 leading-relaxed">
                      <span className="text-[#F07824] font-bold shrink-0" aria-hidden="true">
                        •
                      </span>
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Technical Specifications Table */}
            <section className="bg-white border border-slate-200/80 rounded-2xl p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-[#14243A]">
                    Technical Specifications
                  </h2>
                  <span className="text-xs sm:text-sm text-slate-500">
                    Custom bay heights and load capacities built to order
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleDownloadSpecSheet}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-[#14243A] bg-[#F4F6F8] hover:bg-slate-200 border border-slate-300 rounded-[20px] transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#F07824]" />
                  <span>Download Spec Sheet</span>
                </button>
              </div>

              <div className="border border-slate-200/80 rounded-xl overflow-hidden">
                <dl className="divide-y divide-slate-200 text-[15px]">
                  {product.specs.map((spec, idx) => (
                    <div
                      key={spec.label}
                      className={`grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-2 px-5 py-3 ${
                        idx % 2 === 0 ? 'bg-[#F4F6F8]' : 'bg-white'
                      }`}
                    >
                      <dt className="font-semibold text-[#14243A]">{spec.label}</dt>
                      <dd className="sm:col-span-2 font-mono tabular-nums text-[#202B38]">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </section>

            {/* Quick Capacity Calculator */}
            <BayCapacityEstimator product={product} />
          </div>

          {/* Right 4 Columns: Sticky Quote Desk */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-5">
            <div className="bg-[#14243A] text-white rounded-2xl p-6 space-y-4">
              <div>
                <p className="text-xs font-mono text-[#F07824] mb-1">
                  Direct Quote Desk · Floor Plan Included
                </p>
                <h2 className="font-display text-xl sm:text-2xl font-bold">
                  Price {product.name} for Your Warehouse
                </h2>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                  Tell us how many bays you need, your ceiling height, and your city. We&apos;ll send
                  a clear price and bay drawing within 1 business day.
                </p>
              </div>

              <dl className="border-t border-b border-white/15 py-3.5 space-y-2.5 text-sm">
                {product.specs.slice(0, 3).map((s) => (
                  <div key={s.label} className="flex justify-between gap-3">
                    <dt className="text-slate-400">{s.label}</dt>
                    <dd className="font-mono tabular-nums text-white text-right">{s.value}</dd>
                  </div>
                ))}
              </dl>

              <ActionButton
                to={`/request-quote?product=${encodeURIComponent(product.name)}`}
                variant="primary"
                className="w-full py-3 min-h-[46px]"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" />
              </ActionButton>

              <ul className="space-y-1.5 text-xs text-slate-300 pt-1">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#F07824] shrink-0" />
                  <span>Written quote back within 1 business day</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#F07824] shrink-0" />
                  <span>Free beam load &amp; floor slab check before ordering</span>
                </li>
              </ul>

              <p className="text-xs sm:text-sm text-slate-400 font-mono tabular-nums pt-2 border-t border-white/10">
                {COMPANY_CONTACT.primaryPhone} · {COMPANY_CONTACT.salesEmail}
              </p>
            </div>
          </aside>
        </div>

        {/* Related Systems */}
        <Reveal>
          <section className="pt-8 border-t border-slate-200">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#14243A] mb-5">
              Systems Often Paired Together
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedProducts.map((rel) => (
                <Link
                  key={rel.slug}
                  to={`/products/${rel.slug}`}
                  className="group bg-white border border-slate-200/80 hover:border-[#14243A] hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-15px_rgba(20,36,58,0.14)] rounded-2xl overflow-hidden flex flex-col transition-[transform,border-color,box-shadow] duration-200 agency-ease"
                >
                  <div className="h-[165px] border-b border-slate-200/80">
                    <MediaFrame
                      src={rel.image}
                      alt={rel.name}
                      zoomOnHover
                      className="w-full h-full"
                    />
                  </div>
                  <div className="p-5">
                    <div className="text-xs font-mono text-slate-500 mb-1">{rel.categoryGroup}</div>
                    <h3 className="font-display text-lg font-bold text-[#14243A] group-hover:text-[#F07824] transition-colors duration-150">
                      {rel.name}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#202B38]/85 mt-1 line-clamp-2">
                      {rel.shortDesc}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </Reveal>
      </div>

      <CtaBand
        eyebrow={`Quick Quote · Free Floor Plan for ${product.name}`}
        title={`Need Exact Bay Pricing for ${product.name}?`}
        description="Send your room dimensions and pallet weights to get a clear written quote and floor plan within 1 business day."
        ctaLabel="Request a Quote"
        ctaTo={`/request-quote?product=${encodeURIComponent(product.name)}`}
        secondaryLabel="Contact Us"
        secondaryTo="/contact"
      />
    </div>
  );
}
