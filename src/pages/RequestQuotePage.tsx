import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  AlertCircle,
  ArrowRight,
  Check,
  CheckCircle2,
  Copy,
  Download,
  Mail,
  Phone,
} from 'lucide-react';
import PageBanner from '../components/PageBanner';
import MediaFrame from '../components/ui/MediaFrame';
import ActionButton from '../components/ui/ActionButton';
import { COMPANY_CONTACT, INDUSTRIES_DATA, PRODUCTS_DATA } from '../data/siteData';
import {
  downloadTextFile,
  loadLastQuote,
  loadQuoteItems,
  saveLastQuote,
  saveQuoteItems,
  SavedQuoteRecord,
} from '../utils/quoteStorage';

interface QuoteFormState {
  selectedProducts: string[];
  quantityOrArea: string;
  timeline: string;
  scopeOptions: string[];
  industry: string;
  requirements: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  cityPostal: string;
}

const SCOPE_OPTIONS = [
  'Hardware Supply & Freight Delivery',
  'On-Site Professional Installation',
  'Warehouse Layout & Floor Planning',
  'Column Guards & Safety Barriers',
];

const TIMELINES = [
  'Immediate (Within 30 Days)',
  '1 – 3 Months',
  '3 – 6 Months',
  'Planning / Budgeting',
];

export default function RequestQuotePage() {
  const [searchParams] = useSearchParams();
  const productParam = searchParams.get('product') || '';
  const productsParam = searchParams.get('products') || '';
  const notesParam = searchParams.get('notes') || '';

  const initialSelected = (() => {
    if (productsParam) {
      return productsParam
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
    }
    if (productParam) return [productParam];
    const savedList = loadQuoteItems();
    if (savedList.length > 0) return savedList;
    return [PRODUCTS_DATA[0].name];
  })();

  const [form, setForm] = useState<QuoteFormState>({
    selectedProducts: initialSelected,
    quantityOrArea: '',
    timeline: TIMELINES[1],
    scopeOptions: ['Hardware Supply & Freight Delivery'],
    industry: INDUSTRIES_DATA[0].name,
    requirements: notesParam || '',
    name: '',
    company: '',
    email: '',
    phone: '',
    country: 'United Kingdom',
    cityPostal: '',
  });

  useEffect(() => {
    if (productsParam) {
      const list = productsParam
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      if (list.length > 0) {
        setForm((prev) => ({ ...prev, selectedProducts: list }));
      }
    } else if (productParam || notesParam) {
      setForm((prev) => ({
        ...prev,
        selectedProducts: productParam ? [productParam] : prev.selectedProducts,
        requirements: notesParam || prev.requirements,
      }));
    }
  }, [productParam, productsParam, notesParam]);

  const [errors, setErrors] = useState<Partial<Record<keyof QuoteFormState, string>>>({});
  const [submittedRecord, setSubmittedRecord] = useState<SavedQuoteRecord | null>(() =>
    loadLastQuote()
  );
  const [copiedRef, setCopiedRef] = useState(false);

  const toggleProduct = (name: string) => {
    setForm((prev) => {
      const exists = prev.selectedProducts.includes(name);
      const next = exists
        ? prev.selectedProducts.filter((item) => item !== name)
        : [...prev.selectedProducts, name];
      return {
        ...prev,
        selectedProducts: next.length > 0 ? next : [name],
      };
    });
  };

  const toggleScopeOption = (option: string) => {
    setForm((prev) => {
      const exists = prev.scopeOptions.includes(option);
      return {
        ...prev,
        scopeOptions: exists
          ? prev.scopeOptions.filter((item) => item !== option)
          : [...prev.scopeOptions, option],
      };
    });
  };

  const validate = (): boolean => {
    const nextErrors: Partial<Record<keyof QuoteFormState, string>> = {};
    if (!form.name.trim()) nextErrors.name = 'Please enter your full name.';
    if (!form.company.trim()) nextErrors.company = 'Please enter your company name.';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!form.email.trim()) {
      nextErrors.email = 'Please enter your business email.';
    } else if (!emailRegex.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid business email address.';
    }

    const phoneDigits = form.phone.replace(/\D/g, '');
    if (!form.phone.trim()) {
      nextErrors.phone = 'Please enter your phone number.';
    } else if (phoneDigits.length < 7) {
      nextErrors.phone = 'Please enter a valid phone number (minimum 7 digits).';
    }

    if (!form.requirements.trim()) {
      nextErrors.requirements =
        'Please share your room height, pallet load, or bay requirements.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const refDigits = Math.floor(1000 + Math.random() * 9000);
    const record: SavedQuoteRecord = {
      reference: `APX-RFQ-${refDigits}`,
      submittedAt: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      products: form.selectedProducts,
      industry: form.industry,
      quantityOrArea: form.quantityOrArea || 'Not specified',
      timeline: form.timeline,
      scopeOptions: form.scopeOptions,
      requirements: form.requirements,
      name: form.name,
      company: form.company,
      email: form.email,
      phone: form.phone,
      country: form.country,
      cityPostal: form.cityPostal,
    };
    saveLastQuote(record);
    saveQuoteItems([]);
    setSubmittedRecord(record);
    setCopiedRef(false);
  };

  const handleCopyRef = () => {
    if (!submittedRecord || !navigator.clipboard) return;
    navigator.clipboard.writeText(submittedRecord.reference).then(() => {
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    });
  };

  const handleDownloadQuoteSummary = () => {
    if (!submittedRecord) return;
    const lines = [
      `APEXRACK INDUSTRIAL SOLUTIONS | QUOTE REQUEST RECEIPT`,
      `======================================================`,
      `Reference: ${submittedRecord.reference}`,
      `Date: ${submittedRecord.submittedAt}`,
      ``,
      `SELECTED SYSTEMS`,
      ...submittedRecord.products.map((p) => `- ${p}`),
      ``,
      `PROJECT DETAILS`,
      `Industry: ${submittedRecord.industry}`,
      `Bays / Floor Area: ${submittedRecord.quantityOrArea}`,
      `Target Timeline: ${submittedRecord.timeline}`,
      `Scope: ${submittedRecord.scopeOptions.join(', ')}`,
      `Notes: ${submittedRecord.requirements}`,
      ``,
      `CONTACT INFORMATION`,
      `Name: ${submittedRecord.name}`,
      `Company: ${submittedRecord.company}`,
      `Email: ${submittedRecord.email}`,
      `Phone: ${submittedRecord.phone}`,
      `Delivery Region: ${submittedRecord.country}${submittedRecord.cityPostal ? ` (${submittedRecord.cityPostal})` : ''}`,
      ``,
      `SALES DESK: ${COMPANY_CONTACT.primaryPhone} · ${COMPANY_CONTACT.salesEmail}`,
    ].join('\n');

    downloadTextFile(`${submittedRecord.reference}-summary.txt`, lines);
  };

  const primaryProductName = form.selectedProducts[0] || PRODUCTS_DATA[0].name;
  const matchedProduct =
    PRODUCTS_DATA.find((p) =>
      primaryProductName.toLowerCase().includes(p.name.toLowerCase())
    ) || PRODUCTS_DATA[0];

  return (
    <div className="bg-[#F4F6F8] min-h-[75vh]">
      <PageBanner
        eyebrow="Quote Request"
        title="Request a Quote"
        description="Pick the systems you need, share your room size, and get a clear written quote."
        breadcrumbCurrent="Request a Quote"
        highlights={[
          { label: 'Step 1: Pick Systems', value: 'Single or Multi-Rack' },
          { label: 'Step 2: Share Size', value: 'Bays or Sq Ft' },
          { label: 'Step 3: Written Quote', value: '1 Business Day' },
        ]}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
          {/* Left 8 Columns */}
          <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-7">
            {submittedRecord ? (
              <div className="space-y-6 py-2">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-emerald-700" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-emerald-700">
                      Quote Request Saved · {submittedRecord.submittedAt}
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#14243A]">
                        Ref:{' '}
                        <span className="font-mono tabular-nums">{submittedRecord.reference}</span>
                      </h2>
                      <button
                        type="button"
                        onClick={handleCopyRef}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-[#14243A] bg-[#F4F6F8] hover:bg-slate-200 border border-slate-300 rounded-[20px] transition-colors cursor-pointer"
                      >
                        {copiedRef ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-700" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Ref</span>
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={handleDownloadQuoteSummary}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-[#14243A] bg-[#F4F6F8] hover:bg-slate-200 border border-slate-300 rounded-[20px] transition-colors cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5 text-[#F07824]" />
                        <span>Download Receipt</span>
                      </button>
                    </div>
                    <p className="text-base text-[#202B38]/85 leading-relaxed">
                      Thank you, <strong className="text-[#14243A]">{submittedRecord.name}</strong>.
                      Your request for{' '}
                      <strong className="text-[#14243A]">
                        {submittedRecord.products.join(', ')}
                      </strong>{' '}
                      ({submittedRecord.company}, {submittedRecord.country}) is logged. Our desk
                      will email your written quote to{' '}
                      <strong className="text-[#14243A]">{submittedRecord.email}</strong>.
                    </p>
                  </div>
                </div>

                <div className="bg-[#F4F6F8] border border-slate-200/80 rounded-xl p-5 space-y-3 text-sm text-[#202B38]">
                  <div className="font-display font-bold text-[#14243A] border-b border-slate-200 pb-2">
                    Saved Enquiry Summary
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <span className="text-slate-500 block text-xs">Selected Systems</span>
                      <span className="font-semibold text-[#14243A]">
                        {submittedRecord.products.join(' · ')}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-xs">Industry</span>
                      <span className="font-semibold text-[#14243A]">
                        {submittedRecord.industry}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-xs">Timeline</span>
                      <span className="font-semibold text-[#14243A]">
                        {submittedRecord.timeline}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-xs">Phone</span>
                      <span className="font-mono tabular-nums font-semibold text-[#14243A]">
                        {submittedRecord.phone}
                      </span>
                    </div>
                  </div>
                  {submittedRecord.scopeOptions.length > 0 && (
                    <div>
                      <span className="text-slate-500 block text-xs">Requested Scope</span>
                      <span>{submittedRecord.scopeOptions.join(' · ')}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-slate-500 block text-xs">Project Notes</span>
                    <p className="mt-0.5 leading-relaxed">{submittedRecord.requirements}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <ActionButton
                    variant="navy"
                    onClick={() => {
                      setSubmittedRecord(null);
                      setErrors({});
                    }}
                  >
                    Start New Quote Request
                  </ActionButton>
                  <ActionButton to="/products" variant="secondary">
                    Browse Products
                  </ActionButton>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="space-y-4">
                  <div className="border-b border-slate-200 pb-3">
                    <span className="font-mono text-xs text-[#F07824] font-semibold">
                      System &amp; Scope
                    </span>
                    <h2 className="font-display text-2xl font-bold text-[#14243A] mt-0.5">
                      What Equipment Do You Need?
                    </h2>
                  </div>

                  {/* Multi-Product Selector */}
                  <div>
                    <div className="text-xs font-medium text-slate-500 mb-2">
                      Select one or more systems (click to toggle):
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {PRODUCTS_DATA.map((prod) => {
                        const active = form.selectedProducts.includes(prod.name);
                        return (
                          <button
                            key={prod.slug}
                            type="button"
                            onClick={() => toggleProduct(prod.name)}
                            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[20px] text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                              active
                                ? 'bg-[#14243A] text-white'
                                : 'bg-[#F4F6F8] text-[#202B38] hover:bg-slate-200'
                            }`}
                          >
                            {active && <Check className="w-3.5 h-3.5 text-[#F07824]" />}
                            <span>{prod.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="rfq-industry"
                        className="block text-sm font-semibold text-[#14243A] mb-1.5"
                      >
                        Industry
                      </label>
                      <select
                        id="rfq-industry"
                        value={form.industry}
                        onChange={(e) => setForm({ ...form, industry: e.target.value })}
                        className="w-full px-3.5 py-2.5 min-h-[44px] text-base bg-[#F4F6F8] border border-slate-300 rounded-xl focus:outline-2 focus:outline-[#F07824]"
                      >
                        {INDUSTRIES_DATA.map((ind) => (
                          <option key={ind.id} value={ind.name}>
                            {ind.name}
                          </option>
                        ))}
                        <option value="Other Commercial Facility">Other Commercial Facility</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="rfq-qty"
                        className="block text-sm font-semibold text-[#14243A] mb-1.5"
                      >
                        Estimated Bays or Floor Area
                      </label>
                      <input
                        id="rfq-qty"
                        type="text"
                        value={form.quantityOrArea}
                        onChange={(e) => setForm({ ...form, quantityOrArea: e.target.value })}
                        placeholder="e.g., 40 bays or 12,000 sq ft"
                        className="w-full px-3.5 py-2.5 min-h-[44px] text-base bg-[#F4F6F8] border border-slate-300 rounded-xl focus:outline-2 focus:outline-[#F07824]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="rfq-timeline"
                        className="block text-sm font-semibold text-[#14243A] mb-1.5"
                      >
                        When Do You Need It?
                      </label>
                      <select
                        id="rfq-timeline"
                        value={form.timeline}
                        onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                        className="w-full px-3.5 py-2.5 min-h-[44px] text-base bg-[#F4F6F8] border border-slate-300 rounded-xl focus:outline-2 focus:outline-[#F07824]"
                      >
                        {TIMELINES.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-[#14243A] mb-2">
                      Services Required
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {SCOPE_OPTIONS.map((opt) => {
                        const checked = form.scopeOptions.includes(opt);
                        return (
                          <label
                            key={opt}
                            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl border text-sm cursor-pointer transition-colors ${
                              checked
                                ? 'bg-[#14243A]/5 border-[#14243A] text-[#14243A] font-medium'
                                : 'bg-[#F4F6F8] border-slate-200 text-[#202B38]'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleScopeOption(opt)}
                              className="w-4 h-4 accent-[#F07824] rounded shrink-0"
                            />
                            <span>{opt}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="rfq-requirements"
                      className="block text-sm font-semibold text-[#14243A] mb-1.5"
                    >
                      Room Dimensions &amp; Pallet Load Notes <span className="text-[#F07824]">*</span>
                    </label>
                    <textarea
                      id="rfq-requirements"
                      rows={3}
                      value={form.requirements}
                      onChange={(e) => setForm({ ...form, requirements: e.target.value })}
                      placeholder="Example: 28 ft clear ceiling height, 2,500 lb Euro pallets, reach truck aisles..."
                      className="w-full px-3.5 py-2.5 text-base bg-[#F4F6F8] border border-slate-300 rounded-xl focus:outline-2 focus:outline-[#F07824]"
                    />
                    {errors.requirements && (
                      <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errors.requirements}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Section 2: Contact Details */}
                <div className="space-y-4">
                  <div className="border-b border-slate-200 pb-3">
                    <span className="font-mono text-xs text-[#F07824] font-semibold">
                      Contact &amp; Shipping Location
                    </span>
                    <h2 className="font-display text-2xl font-bold text-[#14243A] mt-0.5">
                      Where Should We Send Your Quote?
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="rfq-name"
                        className="block text-sm font-semibold text-[#14243A] mb-1.5"
                      >
                        Full Name <span className="text-[#F07824]">*</span>
                      </label>
                      <input
                        id="rfq-name"
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Full Name"
                        className="w-full px-3.5 py-2.5 min-h-[44px] text-base bg-[#F4F6F8] border border-slate-300 rounded-xl focus:outline-2 focus:outline-[#F07824]"
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1.5">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="rfq-company"
                        className="block text-sm font-semibold text-[#14243A] mb-1.5"
                      >
                        Company Name <span className="text-[#F07824]">*</span>
                      </label>
                      <input
                        id="rfq-company"
                        type="text"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        placeholder="Company Name"
                        className="w-full px-3.5 py-2.5 min-h-[44px] text-base bg-[#F4F6F8] border border-slate-300 rounded-xl focus:outline-2 focus:outline-[#F07824]"
                      />
                      {errors.company && (
                        <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1.5">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>{errors.company}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="rfq-email"
                        className="block text-sm font-semibold text-[#14243A] mb-1.5"
                      >
                        Business Email <span className="text-[#F07824]">*</span>
                      </label>
                      <input
                        id="rfq-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="name@company.com"
                        className="w-full px-3.5 py-2.5 min-h-[44px] text-base bg-[#F4F6F8] border border-slate-300 rounded-xl focus:outline-2 focus:outline-[#F07824]"
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1.5">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="rfq-phone"
                        className="block text-sm font-semibold text-[#14243A] mb-1.5"
                      >
                        Phone Number <span className="text-[#F07824]">*</span>
                      </label>
                      <input
                        id="rfq-phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+1 (312) 854-0920"
                        className="w-full px-3.5 py-2.5 min-h-[44px] text-base bg-[#F4F6F8] border border-slate-300 rounded-xl focus:outline-2 focus:outline-[#F07824]"
                      />
                      {errors.phone && (
                        <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1.5">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="rfq-country"
                        className="block text-sm font-semibold text-[#14243A] mb-1.5"
                      >
                        Delivery Country
                      </label>
                      <select
                        id="rfq-country"
                        value={form.country}
                        onChange={(e) => setForm({ ...form, country: e.target.value })}
                        className="w-full px-3.5 py-2.5 min-h-[44px] text-base bg-[#F4F6F8] border border-slate-300 rounded-xl focus:outline-2 focus:outline-[#F07824]"
                      >
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Arab Emirates">United Arab Emirates</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="rfq-city"
                        className="block text-sm font-semibold text-[#14243A] mb-1.5"
                      >
                        City / Postal Code (Optional)
                      </label>
                      <input
                        id="rfq-city"
                        type="text"
                        value={form.cityPostal}
                        onChange={(e) => setForm({ ...form, cityPostal: e.target.value })}
                        placeholder="Used for shipping estimate"
                        className="w-full px-3.5 py-2.5 min-h-[44px] text-base bg-[#F4F6F8] border border-slate-300 rounded-xl focus:outline-2 focus:outline-[#F07824]"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-3 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200">
                  <p className="text-sm text-slate-500">
                    Fields marked * help us price your job · Written quote sent within 1 business day
                  </p>
                  <ActionButton type="submit" variant="primary" className="px-7 py-3 min-h-[46px]">
                    <span>Send Quote Request</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" />
                  </ActionButton>
                </div>
              </form>
            )}
          </div>

          {/* Right 4 Columns: Live Selected System */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-5">
            <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden">
              <div className="h-[170px] border-b border-slate-200/80">
                <MediaFrame
                  src={matchedProduct.image}
                  alt={matchedProduct.name}
                  priority
                  className="w-full h-full"
                />
              </div>
              <div className="p-5 space-y-2.5">
                <div className="text-xs font-mono text-[#F07824]">
                  Selected ({form.selectedProducts.length})
                </div>
                <h3 className="font-display text-lg font-bold text-[#14243A]">
                  {form.selectedProducts.join(' + ')}
                </h3>
                <p className="text-sm text-[#202B38]/80 leading-relaxed">
                  {matchedProduct.shortDesc}
                </p>
                <div className="pt-2 border-t border-slate-100">
                  <Link
                    to={`/products/${matchedProduct.slug}`}
                    className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[#14243A] hover:text-[#F07824] transition-colors"
                  >
                    <span>Review Technical Specs</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-[#14243A] text-white rounded-2xl p-6 space-y-3.5">
              <div className="font-mono text-xs text-[#F07824] font-semibold">
                What We Send Back
              </div>
              <h3 className="font-display text-lg font-bold">Included With Your Quote</h3>
              <ul className="space-y-2 text-sm text-slate-200 leading-relaxed">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#F07824] mt-0.5 shrink-0" />
                  <span>
                    <strong className="text-white">Floor Drawing:</strong> Scaled bays &amp;
                    forklift aisle clearances.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#F07824] mt-0.5 shrink-0" />
                  <span>
                    <strong className="text-white">Beam &amp; Upright Check:</strong> Verified load
                    ratings to RMI / SEMA rules.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#F07824] mt-0.5 shrink-0" />
                  <span>
                    <strong className="text-white">Clear Price Breakdown:</strong> Steel hardware,
                    delivery, and site install priced separately.
                  </span>
                </li>
              </ul>

              <div className="pt-3 border-t border-white/15 space-y-2 text-sm">
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#F07824] shrink-0" />
                  <a
                    href={COMPANY_CONTACT.primaryPhoneHref}
                    className="font-mono tabular-nums hover:text-[#F07824]"
                  >
                    {COMPANY_CONTACT.primaryPhone}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#F07824] shrink-0" />
                  <a href={COMPANY_CONTACT.salesEmailHref} className="hover:text-[#F07824]">
                    {COMPANY_CONTACT.salesEmail}
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
