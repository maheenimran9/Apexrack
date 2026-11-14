import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface SectionHeadingProps {
  indexLabel?: string;
  eyebrow: string;
  title: string;
  description?: string;
  actionLabel?: string;
  actionTo?: string;
  tone?: 'light' | 'dark';
  rightSlot?: ReactNode;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  actionLabel,
  actionTo,
  tone = 'light',
  rightSlot,
}: SectionHeadingProps) {
  const isDark = tone === 'dark';

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div className="max-w-2xl space-y-2.5">
        <p className="text-sm font-semibold tracking-wide text-[#F07824]">{eyebrow}</p>

        <h2
          className={`font-display text-[clamp(1.625rem,6.5vw,2rem)] leading-[1.18] sm:text-3xl sm:leading-tight lg:text-[34px] font-bold tracking-tight [text-wrap:balance] ${
            isDark ? 'text-white' : 'text-[#14243A]'
          }`}
        >
          {title}
        </h2>

        {description && (
          <p
            className={`text-base leading-[1.68] sm:text-[17px] sm:leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-[#202B38]/85'
            }`}
          >
            {description}
          </p>
        )}
      </div>

      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          className={`group inline-flex items-center gap-2 text-base sm:text-[15px] font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 ${
            isDark
              ? 'text-white hover:text-[#F07824]'
              : 'text-[#14243A] hover:text-[#F07824]'
          }`}
        >
          <span>{actionLabel}</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-150 agency-ease group-hover:translate-x-0.5" />
        </Link>
      )}

      {rightSlot}
    </div>
  );
}
