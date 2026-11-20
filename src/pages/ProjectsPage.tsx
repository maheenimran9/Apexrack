import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PageBanner from '../components/PageBanner';
import ProjectShowcaseCard from '../components/ProjectShowcaseCard';
import Reveal from '../components/ui/Reveal';
import CtaBand from '../components/CtaBand';
import { PROJECTS_DATA } from '../data/siteData';

type ProjectCategory = 'All' | 'Logistics' | 'Cold Storage' | 'Manufacturing' | 'E-commerce';

const PROJECT_FILTERS: ProjectCategory[] = [
  'All',
  'Logistics',
  'E-commerce',
  'Cold Storage',
  'Manufacturing',
];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('All');

  const visibleProjects = useMemo(() => {
    if (activeFilter === 'All') return PROJECTS_DATA;
    return PROJECTS_DATA.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  const leadProject = visibleProjects[0];
  const restProjects = visibleProjects.slice(1);

  return (
    <div className="bg-[#F4F6F8] min-h-[75vh]">
      <PageBanner
        eyebrow="Completed Installations"
        title="Warehouse Racking & Storage Projects"
        description="See how selective racking, drive-in cold lanes, cantilever towers, and steel mezzanines work inside active facilities."
        breadcrumbCurrent="Projects"
        highlights={[
          { label: 'Installations', value: `${PROJECTS_DATA.length} Case Studies` },
          { label: 'Industries', value: '4 Core Sectors' },
          { label: 'Regions', value: 'UK · US · CA · UAE' },
        ]}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 space-y-7">
        {/* Install Schedule Notice */}
        <div className="bg-[#14243A] text-white rounded-2xl px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-white/10">
          <div className="text-sm">
            <span className="font-mono text-xs text-[#F07824] font-semibold mr-2">
              Install Schedule:
            </span>
            <span className="text-slate-200">
              Our regional crews are booking floor fits across the UK, USA, Canada &amp; UAE this month.
            </span>
          </div>
          <Link
            to="/request-quote"
            className="text-sm font-semibold text-[#F07824] hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Book a Floor Check →
          </Link>
        </div>

        {/* Sector Filter Bar */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by sector">
            {PROJECT_FILTERS.map((filter) => {
              const active = activeFilter === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 min-h-[40px] text-sm font-semibold rounded-[20px] transition-[transform,background-color,color] duration-150 agency-ease hover:-translate-y-px active:scale-[0.98] whitespace-nowrap cursor-pointer ${
                    active
                      ? 'bg-[#14243A] text-white'
                      : 'bg-[#F4F6F8] text-[#202B38] hover:bg-slate-200'
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          <p className="text-xs sm:text-sm text-slate-500">
            Showing {visibleProjects.length} of {PROJECTS_DATA.length} warehouse installations
          </p>
        </div>

        {/* Lead Feature */}
        {leadProject && (
          <ProjectShowcaseCard project={leadProject} variant="lead" showSimilarCta />
        )}

        {/* Secondary Grid */}
        {restProjects.length > 0 && (
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {restProjects.map((project) => (
                <ProjectShowcaseCard
                  key={project.id}
                  project={project}
                  variant="compact"
                  showSimilarCta
                />
              ))}
            </div>
          </Reveal>
        )}
      </div>

      <CtaBand
        eyebrow="Free Floor Plan · Crews Booking This Month"
        title="Need a Setup Like One of These?"
        description="Send your building dimensions and pallet weights so we can draw a layout that fits your room."
        ctaLabel="Request a Quote"
      />
    </div>
  );
}
