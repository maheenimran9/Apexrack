import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, Check, GitCompare, Plus, RotateCcw, Search, X } from 'lucide-react';
import PageBanner from '../components/PageBanner';
import MediaFrame from '../components/ui/MediaFrame';
import ActionButton from '../components/ui/ActionButton';
import Reveal from '../components/ui/Reveal';
import CtaBand from '../components/CtaBand';
import { PRODUCT_GROUPS, PRODUCTS_DATA, ProductGroup } from '../data/siteData';
import {
  loadCompareSlugs,
  loadQuoteItems,
  saveCompareSlugs,
  saveQuoteItems,
} from '../utils/quoteStorage';

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialGroup = (searchParams.get('category') as ProductGroup) || 'All';
  const [selectedGroup, setSelectedGroup] = useState<ProductGroup>(
    PRODUCT_GROUPS.includes(initialGroup) ? initialGroup : 'All'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [compareSlugs, setCompareSlugs] = useState<string[]>(() => loadCompareSlugs());
  const [quoteItems, setQuoteItems] = useState<string[]>(() => loadQuoteItems());

  useEffect(() => {
    saveCompareSlugs(compareSlugs);
  }, [compareSlugs]);

  useEffect(() => {
    saveQuoteItems(quoteItems);
  }, [quoteItems]);

  const handleGroupChange = (group: ProductGroup) => {
    setSelectedGroup(group);
    if (group === 'All') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: group });
    }
  };

  const toggleCompare = (slug: string) => {
    setCompareSlugs((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= 3) return [...prev.slice(1), slug];
      return [...prev, slug];
    });
  };

  const toggleQuoteItem = (name: string) => {
    setQuoteItems((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((prod) => {
      const matchesGroup = selectedGroup === 'All' || prod.categoryGroup === selectedGroup;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        prod.name.toLowerCase().includes(q) ||
        prod.shortDesc.toLowerCase().includes(q) ||
        prod.categoryGroup.toLowerCase().includes(q);
      return matchesGroup && matchesSearch;
    });
  }, [selectedGroup, searchQuery]);

  const compareProducts = useMemo(
    () => PRODUCTS_DATA.filter((p) => compareSlugs.includes(p.slug)),
    [compareSlugs]
  );

  const flagshipProduct = filteredProducts[0];
  const remainingProducts = filteredProducts.slice(1);

  return (
    <div className="bg-[#F4F6F8] min-h-[75vh]">
      <PageBanner
        eyebrow="Storage Equipment Catalog"
        title="Warehouse Racking & Storage Products"
        description="Compare load ratings, bay heights, and configurations across all 8 commercial warehouse systems, with a free floor plan when you request a quote."
        breadcrumbCurrent="Products"
        highlights={[
          { label: 'Standard Stock Ships', value: '5–7 Days' },
          { label: 'Included', value: 'Free Floor Plan' },
          { label: 'Safety Codes', value: 'RMI · SEMA · OSHA' },
        ]}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 space-y-7">
        {/* Saved Multi-Product Quote Shortlist Bar */}
        {quoteItems.length > 0 && (
          <div className="bg-[#14243A] text-white rounded-2xl px-5 py-3.5 flex flex-wrap items-center justify-between gap-4 border border-[#F07824]/40">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="font-mono text-xs text-[#F07824] font-semibold">
                Selected for Quote ({quoteItems.length}):
              </span>
              <span className="text-slate-200">{quoteItems.join(' · ')}</span>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setQuoteItems([])}
                className="text-xs text-slate-300 hover:text-white cursor-pointer"
              >
                Clear
              </button>
              <Link
                to={`/request-quote?products=${encodeURIComponent(quoteItems.join(','))}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-[#F07824] hover:bg-[#D86617] rounded-[20px] transition-colors whitespace-nowrap"
              >
                <span>Quote Selected ({quoteItems.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* Filter & Search Bar */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Product categories">
            {PRODUCT_GROUPS.map((group) => {
              const active = selectedGroup === group;
              return (
                <button
                  key={group}
                  type="button"
                  onClick={() => handleGroupChange(group)}
                  className={`px-3.5 py-2 min-h-[40px] text-sm font-semibold rounded-[20px] transition-[transform,background-color,color] duration-150 agency-ease hover:-translate-y-px active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#14243A] text-white'
                      : 'bg-[#F4F6F8] text-[#202B38] hover:bg-slate-200'
                  }`}
                >
                  {group}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
            <span className="text-xs sm:text-sm font-mono tabular-nums text-slate-500 whitespace-nowrap">
              {filteredProducts.length}/{PRODUCTS_DATA.length} systems
            </span>

            <div className="relative flex-1 sm:w-60">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search racking or shelving..."
                aria-label="Search warehouse products"
                className="w-full pl-10 pr-3.5 py-2 min-h-[42px] text-base sm:text-sm bg-[#F4F6F8] border border-slate-300 rounded-xl focus:outline-2 focus:outline-[#F07824]"
              />
            </div>

            {(selectedGroup !== 'All' || searchQuery.trim() !== '') && (
              <button
                type="button"
                onClick={() => {
                  handleGroupChange('All');
                  setSearchQuery('');
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[20px] text-sm font-semibold text-slate-600 hover:text-[#F07824] hover:bg-[#F4F6F8] transition-colors whitespace-nowrap cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Comparison Table */}
        {compareProducts.length > 0 && (
          <section className="bg-white border border-[#14243A] rounded-2xl overflow-hidden">
            <div className="bg-[#14243A] text-white px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <GitCompare className="w-4 h-4 text-[#F07824]" />
                <h2 className="font-display text-base font-bold">
                  System Comparison ({compareProducts.length}/3 selected)
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setCompareSlugs([])}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-[20px] text-sm text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
                <span>Clear</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-[#F4F6F8]">
                    <th className="py-3 px-5 font-semibold text-[#14243A] w-44">Specification</th>
                    {compareProducts.map((cp) => (
                      <th key={cp.slug} className="py-3 px-5 font-bold text-[#14243A] min-w-[200px]">
                        <div className="flex items-center justify-between gap-2">
                          <Link to={`/products/${cp.slug}`} className="hover:text-[#F07824]">
                            {cp.name}
                          </Link>
                          <button
                            type="button"
                            onClick={() => toggleCompare(cp.slug)}
                            aria-label={`Remove ${cp.name} from comparison`}
                            className="p-1.5 -mr-1.5 rounded-[20px] text-slate-400 hover:text-red-600 hover:bg-slate-200/70 transition-colors cursor-pointer"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="py-3 px-5 font-semibold text-slate-600">Category</td>
                    {compareProducts.map((cp) => (
                      <td key={cp.slug} className="py-3 px-5 text-[#202B38]">
                        {cp.categoryGroup}
                      </td>
                    ))}
                  </tr>
                  {[0, 1, 3].map((rowIdx, i) => (
                    <tr key={rowIdx} className={i % 2 === 0 ? 'bg-[#F4F6F8]/40' : 'bg-white'}>
                      <td className="py-3 px-5 font-semibold text-slate-600">
                        {compareProducts[0]?.specs[rowIdx]?.label || `Spec ${i + 1}`}
                      </td>
                      {compareProducts.map((cp) => (
                        <td
                          key={cp.slug}
                          className="py-3 px-5 font-mono tabular-nums text-[#202B38] text-sm"
                        >
                          {cp.specs[rowIdx]?.value || '-'}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td className="py-3 px-5 font-semibold text-slate-600">Action</td>
                    {compareProducts.map((cp) => (
                      <td key={cp.slug} className="py-3 px-5">
                        <Link
                          to={`/request-quote?product=${encodeURIComponent(cp.name)}`}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#F07824] hover:underline"
                        >
                          <span>Request Quote</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Empty State */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white border border-slate-200/80 rounded-2xl p-10 text-center">
            <h2 className="font-display text-xl font-bold text-[#14243A]">
              No matching storage systems found
            </h2>
            <p className="text-base text-slate-600 mt-1">
              Clear your filter or search query to view all {PRODUCTS_DATA.length} product lines.
            </p>
            <ActionButton
              variant="navy"
              onClick={() => {
                handleGroupChange('All');
                setSearchQuery('');
              }}
              className="mt-5"
            >
              Show All Products
            </ActionButton>
          </div>
        ) : (
          <div className="space-y-7">
            {/* Lead System Spotlight */}
            {flagshipProduct && (
              <article className="group bg-white border border-slate-200/80 hover:border-[#14243A] hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-15px_rgba(20,36,58,0.14)] rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-[transform,border-color,box-shadow] duration-200 agency-ease">
                <Link
                  to={`/products/${flagshipProduct.slug}`}
                  className="lg:col-span-5 h-[220px] sm:h-[260px] lg:h-auto lg:min-h-[290px] block"
                >
                  <MediaFrame
                    src={flagshipProduct.image}
                    alt={flagshipProduct.name}
                    zoomOnHover
                    priority
                    className="w-full h-full"
                  />
                </Link>

                <div className="lg:col-span-7 p-6 sm:p-7 flex flex-col justify-between space-y-4">
                  <div className="space-y-3.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs sm:text-sm font-mono text-[#F07824]">
                        {flagshipProduct.categoryGroup}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => toggleQuoteItem(flagshipProduct.name)}
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-[20px] text-xs font-semibold transition-colors cursor-pointer ${
                            quoteItems.includes(flagshipProduct.name)
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'text-slate-600 bg-[#F4F6F8] hover:text-[#14243A]'
                          }`}
                        >
                          {quoteItems.includes(flagshipProduct.name) ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>In Shortlist</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>Shortlist</span>
                            </>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleCompare(flagshipProduct.slug)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-[20px] text-xs font-semibold transition-colors cursor-pointer ${
                            compareSlugs.includes(flagshipProduct.slug)
                              ? 'text-[#F07824] bg-[#F07824]/10'
                              : 'text-slate-500 hover:text-[#14243A] hover:bg-[#F4F6F8]'
                          }`}
                        >
                          <GitCompare className="w-3.5 h-3.5" />
                          <span>
                            {compareSlugs.includes(flagshipProduct.slug) ? 'Selected' : 'Compare'}
                          </span>
                        </button>
                      </div>
                    </div>

                    <div>
                      <h2 className="font-display text-2xl sm:text-[26px] font-bold text-[#14243A]">
                        <Link
                          to={`/products/${flagshipProduct.slug}`}
                          className="hover:text-[#F07824] transition-colors duration-150"
                        >
                          {flagshipProduct.name}
                        </Link>
                      </h2>
                      <p className="text-[15px] sm:text-base leading-relaxed text-[#202B38]/85 mt-1.5">
                        {flagshipProduct.shortDesc}
                      </p>
                    </div>

                    <dl className="grid grid-cols-2 gap-3">
                      <div className="bg-[#F4F6F8] rounded-xl px-3.5 py-2.5">
                        <dt className="text-xs text-slate-500">{flagshipProduct.specs[0]?.label}</dt>
                        <dd className="font-mono text-xs sm:text-sm font-semibold text-[#14243A] mt-0.5 tabular-nums">
                          {flagshipProduct.specs[0]?.value}
                        </dd>
                      </div>
                      <div className="bg-[#F4F6F8] rounded-xl px-3.5 py-2.5">
                        <dt className="text-xs text-slate-500">{flagshipProduct.specs[3]?.label}</dt>
                        <dd className="font-mono text-xs sm:text-sm font-semibold text-[#14243A] mt-0.5 tabular-nums">
                          {flagshipProduct.specs[3]?.value}
                        </dd>
                      </div>
                    </dl>

                    <ul className="space-y-1.5 text-sm sm:text-[15px] text-[#202B38]">
                      {flagshipProduct.keyFeatures.slice(0, 2).map((feat) => (
                        <li key={feat} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-[#F07824] mt-0.5 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3.5 border-t border-slate-200 flex flex-wrap items-center gap-3">
                    <ActionButton
                      to={`/request-quote?product=${encodeURIComponent(flagshipProduct.name)}`}
                      variant="primary"
                    >
                      <span>Request a Quote</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" />
                    </ActionButton>

                    <ActionButton to={`/products/${flagshipProduct.slug}`} variant="secondary">
                      <span>View Specs</span>
                    </ActionButton>
                  </div>
                </div>
              </article>
            )}

            {/* 3-Column Visual Product Cards */}
            {remainingProducts.length > 0 && (
              <Reveal>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {remainingProducts.map((product) => {
                    const isCompared = compareSlugs.includes(product.slug);
                    const isShortlisted = quoteItems.includes(product.name);
                    return (
                      <article
                        key={product.slug}
                        className="group bg-white border border-slate-200/80 hover:border-[#14243A] hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-15px_rgba(20,36,58,0.14)] rounded-2xl overflow-hidden flex flex-col justify-between transition-[transform,border-color,box-shadow] duration-200 agency-ease"
                      >
                        <div>
                          <Link
                            to={`/products/${product.slug}`}
                            className="h-[180px] sm:h-[185px] border-b border-slate-200/80 block"
                          >
                            <MediaFrame
                              src={product.image}
                              alt={product.name}
                              zoomOnHover
                              className="w-full h-full"
                            />
                          </Link>

                          <div className="p-5 space-y-2.5">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-xs font-mono text-slate-500">
                                {product.categoryGroup}
                              </span>
                              <button
                                type="button"
                                onClick={() => toggleCompare(product.slug)}
                                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-[20px] text-xs font-semibold transition-colors cursor-pointer ${
                                  isCompared
                                    ? 'text-[#F07824] bg-[#F07824]/10'
                                    : 'text-slate-500 hover:text-[#14243A] hover:bg-[#F4F6F8]'
                                }`}
                              >
                                <GitCompare className="w-3.5 h-3.5" />
                                <span>{isCompared ? 'Added' : 'Compare'}</span>
                              </button>
                            </div>

                            <h3 className="font-display text-lg sm:text-xl font-bold text-[#14243A]">
                              <Link
                                to={`/products/${product.slug}`}
                                className="hover:text-[#F07824] transition-colors duration-150"
                              >
                                {product.name}
                              </Link>
                            </h3>

                            <p className="text-[15px] leading-relaxed text-[#202B38]/85 line-clamp-2">
                              {product.shortDesc}
                            </p>

                            <dl className="grid grid-cols-2 gap-2 pt-1">
                              <div className="bg-[#F4F6F8] rounded-xl px-3 py-2">
                                <dt className="text-[11px] text-slate-500 truncate">
                                  {product.specs[0]?.label}
                                </dt>
                                <dd className="font-mono text-xs font-semibold text-[#14243A] mt-0.5 truncate tabular-nums">
                                  {product.specs[0]?.value}
                                </dd>
                              </div>
                              <div className="bg-[#F4F6F8] rounded-xl px-3 py-2">
                                <dt className="text-[11px] text-slate-500 truncate">
                                  {product.specs[3]?.label || product.specs[1]?.label}
                                </dt>
                                <dd className="font-mono text-xs font-semibold text-[#14243A] mt-0.5 truncate tabular-nums">
                                  {product.specs[3]?.value || product.specs[1]?.value}
                                </dd>
                              </div>
                            </dl>
                          </div>
                        </div>

                        <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                          <Link
                            to={`/products/${product.slug}`}
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#14243A] hover:text-[#F07824] transition-colors whitespace-nowrap"
                          >
                            <span>View Specs</span>
                            <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" />
                          </Link>

                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => toggleQuoteItem(product.name)}
                              title="Add to multi-product quote list"
                              className={`w-9 h-9 rounded-[20px] inline-flex items-center justify-center border transition-colors cursor-pointer ${
                                isShortlisted
                                  ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                                  : 'bg-[#F4F6F8] border-slate-200 text-slate-600 hover:text-[#14243A]'
                              }`}
                              aria-label={
                                isShortlisted
                                  ? `Remove ${product.name} from quote list`
                                  : `Add ${product.name} to quote list`
                              }
                            >
                              {isShortlisted ? (
                                <Check className="w-4 h-4" />
                              ) : (
                                <Plus className="w-4 h-4" />
                              )}
                            </button>
                            <Link
                              to={`/request-quote?product=${encodeURIComponent(product.name)}`}
                              className="px-4 py-2 min-h-[38px] inline-flex items-center text-sm font-semibold text-white bg-[#F07824] hover:bg-[#D86617] rounded-[20px] transition-[transform,background-color] duration-150 agency-ease hover:-translate-y-px active:scale-[0.98] whitespace-nowrap"
                            >
                              Get Quote
                            </Link>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </Reveal>
            )}
          </div>
        )}
      </div>

      <CtaBand
        eyebrow="Free Floor Plan · Standard Bays Ship in 5–7 Days"
        title="Not Sure Which Racking Fits Your Floor?"
        description="Tell us your ceiling height and pallet weight, and we'll suggest the right bays and send a floor plan."
        ctaLabel="Request a Quote"
      />
    </div>
  );
}
