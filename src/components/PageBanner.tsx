import { Link } from 'react-router-dom';

export interface BannerHighlight {
  label: string;
  value: string;
}

interface PageBannerProps {
  eyebrow: string;
  title: string;
  description: string;
  breadcrumbCurrent: string;
  highlights?: BannerHighlight[];
}

export default function PageBanner({
  eyebrow,
  title,
  description,
  breadcrumbCurrent,
  highlights,
}: PageBannerProps) {
  return (
    <section className="relative bg-[#14243A] text-white border-b border-white/10 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(240,120,36,0.14),transparent_58%)]"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-blueprint-grid opacity-20" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <nav
          aria-label="Breadcrumb"
          className="text-sm text-slate-400 mb-3.5 flex flex-wrap items-center gap-2"
        >
          <Link to="/" className="hover:text-white transition-colors duration-150">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-slate-200">{breadcrumbCurrent}</span>
        </nav>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-2.5">
            <p className="text-sm font-medium tracking-wide text-[#F07824]">{eyebrow}</p>
            <h1 className="font-display text-[clamp(1.85rem,7.5vw,2.35rem)] sm:text-3xl lg:text-[38px] font-bold tracking-tight text-white leading-[1.12] [text-wrap:balance]">
              {title}
            </h1>
            <p className="text-base sm:text-[17px] leading-relaxed text-slate-300">{description}</p>
          </div>

          {highlights && highlights.length > 0 && (
            <dl className="grid grid-cols-3 gap-2.5 sm:gap-3 lg:min-w-[380px] shrink-0">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="bg-white/6 border border-white/12 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3"
                >
                  <dt className="text-xs text-slate-400 leading-tight">{item.label}</dt>
                  <dd className="font-display text-sm sm:text-base font-bold text-white mt-1 tabular-nums leading-tight">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>
    </section>
  );
}
