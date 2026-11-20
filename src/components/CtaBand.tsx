import { ArrowRight } from 'lucide-react';
import ActionButton from './ui/ActionButton';
import Reveal from './ui/Reveal';

interface CtaBandProps {
  eyebrow?: string;
  title: string;
  description: string;
  ctaLabel?: string;
  ctaTo?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
  reassuranceNote?: string;
}

export default function CtaBand({
  eyebrow = 'Install Crews Booking This Month · 1-Day Written Quote',
  title,
  description,
  ctaLabel = 'Request a Quote',
  ctaTo = '/request-quote',
  secondaryLabel,
  secondaryTo,
  reassuranceNote = 'Includes a free floor layout drawing · Written quote with no pressure to commit',
}: CtaBandProps) {
  return (
    <section className="relative bg-[#14243A] text-white py-12 lg:py-14 overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 bg-blueprint-grid opacity-25" />
      <Reveal className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row lg:items-center justify-between gap-7">
        <div className="max-w-2xl space-y-2.5">
          {eyebrow && (
            <p className="font-mono text-xs sm:text-[13px] font-medium text-[#F07824] tracking-wide">
              {eyebrow}
            </p>
          )}
          <h2 className="font-display text-[clamp(1.5rem,6vw,1.9rem)] leading-[1.18] sm:text-3xl font-bold text-white tracking-tight [text-wrap:balance]">
            {title}
          </h2>
          <p className="text-base sm:text-[17px] leading-relaxed text-slate-300">{description}</p>
        </div>

        <div className="flex flex-col items-start lg:items-end gap-2.5 shrink-0">
          <div className="flex flex-wrap items-center gap-3.5">
            <ActionButton to={ctaTo} variant="primary" className="px-6 py-3 min-h-[46px]">
              <span>{ctaLabel}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" />
            </ActionButton>

            {secondaryLabel && secondaryTo && (
              <ActionButton
                to={secondaryTo}
                variant="outline-light"
                className="px-6 py-3 min-h-[46px]"
              >
                {secondaryLabel}
              </ActionButton>
            )}
          </div>
          {reassuranceNote && (
            <p className="text-xs text-slate-400">{reassuranceNote}</p>
          )}
        </div>
      </Reveal>
    </section>
  );
}
