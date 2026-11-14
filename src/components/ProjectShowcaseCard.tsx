import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { CaseProject } from '../data/siteData';
import MediaFrame from './ui/MediaFrame';

interface ProjectShowcaseCardProps {
  project: CaseProject;
  variant?: 'lead' | 'compact';
  showSimilarCta?: boolean;
}

export default function ProjectShowcaseCard({
  project,
  variant = 'compact',
  showSimilarCta = false,
}: ProjectShowcaseCardProps) {
  if (variant === 'lead') {
    return (
      <article className="group bg-white border border-slate-200/80 hover:border-[#14243A] hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-15px_rgba(20,36,58,0.14)] rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-[transform,border-color,box-shadow] duration-200 agency-ease">
        <div className="lg:col-span-6 relative h-[220px] sm:h-[260px] lg:h-auto lg:min-h-[300px]">
          <MediaFrame
            src={project.image}
            alt={project.title}
            zoomOnHover
            priority
            className="w-full h-full"
          />
        </div>

        <div className="lg:col-span-6 p-6 sm:p-7 flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500 font-medium">
              <span className="text-[#F07824] font-semibold">{project.category}</span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{project.location}</span>
              </span>
            </div>

            <h3 className="font-display text-[22px] sm:text-2xl font-bold text-[#14243A] leading-snug">
              {project.title}
            </h3>

            <div className="font-mono text-xs sm:text-sm font-semibold text-[#14243A] tabular-nums">
              {project.metricSummary}
            </div>

            <p className="text-base leading-relaxed text-[#202B38]/85">{project.description}</p>
          </div>

          <div className="pt-4 border-t border-slate-200 space-y-3.5">
            <div className="bg-[#F4F6F8] rounded-xl px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 text-sm">
              <span className="text-slate-500">System Installed</span>
              <span className="font-semibold text-[#14243A]">{project.solutionUsed}</span>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <Link
                to={`/products/${project.productSlug}`}
                className="inline-flex items-center gap-1.5 text-[15px] sm:text-sm font-semibold text-[#14243A] hover:text-[#F07824] transition-colors duration-150"
              >
                <span>View Product Specs</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" />
              </Link>

              {showSimilarCta && (
                <Link
                  to={`/request-quote?product=${encodeURIComponent(project.solutionUsed)}`}
                  className="px-4 py-2 min-h-[42px] inline-flex items-center text-sm font-semibold text-white bg-[#F07824] hover:bg-[#D86617] rounded-[20px] transition-[transform,background-color] duration-150 agency-ease hover:-translate-y-px active:scale-[0.98] whitespace-nowrap"
                >
                  Request Similar Setup
                </Link>
              )}
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group bg-white border border-slate-200/80 hover:border-[#14243A] hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-15px_rgba(20,36,58,0.14)] rounded-2xl overflow-hidden flex flex-col justify-between transition-[transform,border-color,box-shadow] duration-200 agency-ease">
      <div>
        <div className="h-[185px] sm:h-[200px] border-b border-slate-200/80">
          <MediaFrame
            src={project.image}
            alt={project.title}
            zoomOnHover
            className="w-full h-full"
          />
        </div>

        <div className="p-5 sm:p-6 space-y-2">
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-500 font-medium">
            <span className="text-[#F07824] font-semibold">{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>{project.location}</span>
          </div>
          <h3 className="font-display text-xl font-bold text-[#14243A] leading-snug">
            {project.title}
          </h3>
          <div className="font-mono text-xs font-semibold text-[#14243A] tabular-nums">
            {project.metricSummary}
          </div>
          <p className="text-[15px] leading-relaxed text-[#202B38]/85 line-clamp-3">
            {project.description}
          </p>
        </div>
      </div>

      <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-3.5 border-t border-slate-100 space-y-3">
        <div className="text-sm text-[#202B38] bg-[#F4F6F8] rounded-xl px-3.5 py-2.5">
          <span className="text-slate-500 block text-xs">System Installed</span>
          <strong className="text-[#14243A] font-semibold">{project.solutionUsed}</strong>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            to={`/products/${project.productSlug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#14243A] hover:text-[#F07824] transition-colors duration-150"
          >
            <span>View Specs</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" />
          </Link>

          {showSimilarCta && (
            <Link
              to={`/request-quote?product=${encodeURIComponent(project.solutionUsed)}`}
              className="text-sm font-semibold text-[#F07824] hover:underline whitespace-nowrap"
            >
              Request Similar Setup
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
