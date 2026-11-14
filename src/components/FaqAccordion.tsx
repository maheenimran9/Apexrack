import { useId, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { FaqCategory, FaqItem, INSTALLATION_FAQS } from '../data/siteData';
import SectionHeading from './ui/SectionHeading';

const FAQ_CATEGORIES: FaqCategory[] = ['All', 'Pallet Racking', 'Mezzanine'];

interface FaqAccordionProps {
  items?: FaqItem[];
  indexLabel?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  showCategoryFilter?: boolean;
}

export default function FaqAccordion({
  items = INSTALLATION_FAQS,
  eyebrow = 'Installation FAQ',
  title = 'Quick Answers Before You Order',
  description = 'Plain answers on floor thickness, ceiling heights, and installation lead times.',
  showCategoryFilter = true,
}: FaqAccordionProps) {
  const baseId = useId();
  const listRef = useRef<HTMLDivElement | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<FaqCategory>('All');
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'All') return items;
    return items.filter((item) => item.category === selectedCategory);
  }, [items, selectedCategory]);

  const handleCategoryChange = (category: FaqCategory) => {
    setSelectedCategory(category);
    const nextList =
      category === 'All' ? items : items.filter((item) => item.category === category);
    setOpenId(nextList[0]?.id ?? null);
    if (listRef.current && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.fromTo(
        listRef.current,
        { opacity: 0.55, y: 6 },
        { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out', clearProps: 'transform,opacity' }
      );
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        <div className="lg:col-span-5 space-y-5">
          <SectionHeading eyebrow={eyebrow} title={title} description={description} />

          {showCategoryFilter && (
            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Filter FAQ by installation topic"
            >
              {FAQ_CATEGORIES.map((category) => {
                const active = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleCategoryChange(category)}
                    className={`px-3.5 py-2 min-h-[40px] text-sm font-semibold rounded-[20px] transition-[transform,background-color,color] duration-150 agency-ease hover:-translate-y-px active:scale-[0.98] whitespace-nowrap cursor-pointer ${
                      active
                        ? 'bg-[#14243A] text-white'
                        : 'bg-[#F4F6F8] text-[#202B38] border border-slate-200 hover:bg-slate-200/70'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          )}

          <Link
            to="/request-quote"
            className="group inline-flex items-center gap-1.5 text-[15px] sm:text-sm font-semibold text-[#F07824] hover:text-[#14243A] transition-colors duration-150"
          >
            <span>Need help with floor specs? Request a Quote</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div
          ref={listRef}
          className="lg:col-span-7 bg-white border border-slate-200/80 rounded-2xl divide-y divide-slate-200/80 shadow-[0_1px_3px_rgba(20,36,58,0.04)] overflow-hidden"
        >
          {filteredItems.map((item) => {
            const isOpen = openId === item.id;
            const triggerId = `${baseId}-trigger-${item.id}`;
            const panelId = `${baseId}-panel-${item.id}`;

            return (
              <div
                key={item.id}
                className={`transition-colors duration-150 ${isOpen ? 'bg-[#F4F6F8]/55' : 'bg-white'}`}
              >
                <h3 className="m-0">
                  <button
                    id={triggerId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="w-full px-5 sm:px-6 py-4 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#F07824]"
                  >
                    <span
                      className={`font-display text-base sm:text-[17px] font-bold leading-snug transition-colors duration-150 ${
                        isOpen ? 'text-[#14243A]' : 'text-[#202B38]'
                      }`}
                    >
                      {item.question}
                    </span>

                    <span
                      aria-hidden="true"
                      className={`w-8 h-8 rounded-xl inline-flex items-center justify-center shrink-0 transition-[background-color,color] duration-200 ${
                        isOpen ? 'bg-[#F07824] text-white' : 'bg-[#F4F6F8] text-[#14243A]'
                      }`}
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 agency-ease ${
                          isOpen ? 'rotate-180' : 'rotate-0'
                        }`}
                      />
                    </span>
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  aria-hidden={!isOpen}
                  className={`grid transition-[grid-template-rows] duration-200 agency-ease ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div
                      className={`px-5 sm:px-6 pb-4 space-y-2 transition-[opacity,transform] duration-200 agency-ease ${
                        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'
                      }`}
                    >
                      <p className="text-[15px] sm:text-sm leading-relaxed text-[#202B38]/85">
                        {item.answer}
                      </p>
                      {item.relatedSlug && item.relatedLabel && (
                        <Link
                          to={`/products/${item.relatedSlug}`}
                          tabIndex={isOpen ? 0 : -1}
                          className="group inline-flex items-center gap-1 text-sm font-semibold text-[#F07824] hover:text-[#14243A] transition-colors duration-150"
                        >
                          <span>{item.relatedLabel}</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
