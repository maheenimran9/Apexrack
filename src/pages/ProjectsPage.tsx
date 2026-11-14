import { useMemo, useState } from 'react';
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
        title="Want a Layout Like One of These?"
        description="Send us your building dimensions and pallet weights to get a tailored floor plan and quote."
      />
    </div>
  );
}
