import { useState } from 'react';
import { AlertCircle, ArrowRight, CheckCircle2, Globe, Mail, MapPin, Phone } from 'lucide-react';
import PageBanner from '../components/PageBanner';
import ActionButton from '../components/ui/ActionButton';
import Reveal from '../components/ui/Reveal';
import FaqAccordion from '../components/FaqAccordion';
import { COMPANY_CONTACT } from '../data/siteData';

interface ContactFormState {
  name: string;
  company: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const REGIONAL_DESKS = [
  {
    code: 'UK',
    region: 'United Kingdom',
    cityPhone: COMPANY_CONTACT.ukPhone,
    address: 'Unit 14, West Thurrock Industrial Park, London',
    coverage: 'London, Birmingham, Manchester & Scotland',
    focus: 'Pallet racking & steel mezzanine installation',
  },
  {
    code: 'US',
    region: 'United States',
    cityPhone: COMPANY_CONTACT.usPhone,
    address: '4800 Westgate Industrial Pkwy, Suite B, Chicago, IL',
    coverage: 'Chicago, Dallas, East & West Coast Hubs',
    focus: 'High-bay selective, cantilever & pick shelving',
  },
  {
    code: 'CA',
    region: 'Canada',
    cityPhone: COMPANY_CONTACT.caPhone,
    address: '6400 Kennedy Rd, Unit 4, Mississauga, ON',
    coverage: 'Ontario, Quebec, Alberta & BC',
    focus: 'Ambient & galvanized cold-storage racking',
  },
  {
    code: 'UAE',
    region: 'United Arab Emirates',
    cityPhone: COMPANY_CONTACT.uaePhone,
    address: 'Plot S-204, Jebel Ali Free Zone, Dubai',
    coverage: 'Dubai, Abu Dhabi & Jebel Ali Zones',
    focus: 'Heavy-duty racking & rack safety upgrades',
  },
];

export default function ContactPage() {
  const [form, setForm] = useState<ContactFormState>({
    name: '',
    company: '',
    email: '',
    phone: '',
    subject: 'Product Specs & Pricing',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const nextErrors: Partial<Record<keyof ContactFormState, string>> = {};
    if (!form.name.trim()) nextErrors.name = 'Please enter your full name.';
    if (!form.company.trim()) nextErrors.company = 'Please enter your company name.';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!form.email.trim()) {
      nextErrors.email = 'Please enter your business email.';
    } else if (!emailRegex.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid business email address.';
    }

    if (form.phone.trim()) {
      const phoneDigits = form.phone.replace(/\D/g, '');
      if (phoneDigits.length < 7) {
        nextErrors.phone = 'Please enter a valid phone number (minimum 7 digits).';
      }
    }

    if (!form.message.trim()) {
      nextErrors.message = 'Please enter your message or question.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  return (
    <div className="bg-[#F4F6F8] min-h-[75vh]">
      <PageBanner
        eyebrow="Get in Touch"
        title="Contact Us"
        description="Call, email, or message our sales desk directly for product questions, freight timing, or installation availability."
        breadcrumbCurrent="Contact Us"
        highlights={[
          { label: 'Sales Desk', value: COMPANY_CONTACT.primaryPhone },
          { label: 'Email', value: COMPANY_CONTACT.salesEmail },
          { label: 'Response Time', value: 'Under 24 Hours' },
        ]}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 space-y-9">
        {/* Quick Contact Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href={COMPANY_CONTACT.primaryPhoneHref}
            className="bg-white border border-slate-200/80 hover:border-[#14243A] rounded-2xl p-5 flex items-center gap-4 transition-colors"
          >
            <div className="w-11 h-11 rounded-xl bg-[#F07824]/10 text-[#F07824] inline-flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-medium text-slate-500">Call Commercial Sales</div>
              <div className="font-mono text-base font-bold text-[#14243A] tabular-nums mt-0.5">
                {COMPANY_CONTACT.primaryPhone}
              </div>
            </div>
          </a>

          <a
            href={COMPANY_CONTACT.salesEmailHref}
            className="bg-white border border-slate-200/80 hover:border-[#14243A] rounded-2xl p-5 flex items-center gap-4 transition-colors"
          >
            <div className="w-11 h-11 rounded-xl bg-[#F07824]/10 text-[#F07824] inline-flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-medium text-slate-500">Email Engineering</div>
              <div className="text-base font-bold text-[#14243A] mt-0.5">
                {COMPANY_CONTACT.salesEmail}
              </div>
            </div>
          </a>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-[#F4F6F8] text-[#14243A] inline-flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-medium text-slate-500">Headquarters</div>
              <div className="text-sm sm:text-[15px] font-bold text-[#14243A] mt-0.5 leading-snug">
                {COMPANY_CONTACT.hqAddress}
              </div>
            </div>
          </div>
        </div>

        {/* Form + Quote Fast Track */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
          <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-7">
            {submitted ? (
              <div className="space-y-5 py-3">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-emerald-700" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-emerald-700">Message Sent</p>
                    <h2 className="font-display text-2xl font-bold text-[#14243A]">
                      Thanks for reaching out, {form.name}
                    </h2>
                    <p className="text-base text-[#202B38]/85 leading-relaxed">
                      Our team received your note for <strong className="text-[#14243A]">{form.company}</strong>{' '}
                      about <strong className="text-[#14243A]">{form.subject}</strong> and will reply
                      to <strong className="text-[#14243A]">{form.email}</strong> within one business
                      day.
                    </p>
                  </div>
                </div>

                <ActionButton
                  variant="navy"
                  onClick={() => {
                    setSubmitted(false);
                    setForm({
                      name: '',
                      company: '',
                      email: '',
                      phone: '',
                      subject: 'Product Specs & Pricing',
                      message: '',
                    });
                    setErrors({});
                  }}
                >
                  Send Another Message
                </ActionButton>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="border-b border-slate-200 pb-4">
                  <h2 className="font-display text-2xl font-bold text-[#14243A]">
                    Send Us a Message
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">
                    Ask about beam loads, freight lead times, or site surveys.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="cu-name"
                      className="block text-sm font-semibold text-[#14243A] mb-1.5"
                    >
                      Name <span className="text-[#F07824]">*</span>
                    </label>
                    <input
                      id="cu-name"
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
                      htmlFor="cu-company"
                      className="block text-sm font-semibold text-[#14243A] mb-1.5"
                    >
                      Company <span className="text-[#F07824]">*</span>
                    </label>
                    <input
                      id="cu-company"
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
                      htmlFor="cu-email"
                      className="block text-sm font-semibold text-[#14243A] mb-1.5"
                    >
                      Business Email <span className="text-[#F07824]">*</span>
                    </label>
                    <input
                      id="cu-email"
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
                      htmlFor="cu-phone"
                      className="block text-sm font-semibold text-[#14243A] mb-1.5"
                    >
                      Phone (Optional)
                    </label>
                    <input
                      id="cu-phone"
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
                </div>

                <div>
                  <label
                    htmlFor="cu-subject"
                    className="block text-sm font-semibold text-[#14243A] mb-1.5"
                  >
                    Topic
                  </label>
                  <select
                    id="cu-subject"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 min-h-[44px] text-base bg-[#F4F6F8] border border-slate-300 rounded-xl focus:outline-2 focus:outline-[#F07824]"
                  >
                    <option value="Product Specs & Pricing">Product Specs &amp; Pricing</option>
                    <option value="Shipping & Regional Delivery">Shipping &amp; Regional Delivery</option>
                    <option value="On-Site Installation & Crew Timing">
                      On-Site Installation &amp; Crew Timing
                    </option>
                    <option value="Warehouse Safety Inspection & Guards">
                      Warehouse Safety Inspection &amp; Guards
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="cu-message"
                    className="block text-sm font-semibold text-[#14243A] mb-1.5"
                  >
                    Message <span className="text-[#F07824]">*</span>
                  </label>
                  <textarea
                    id="cu-message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us briefly what you need help with..."
                    className="w-full px-3.5 py-2.5 text-base bg-[#F4F6F8] border border-slate-300 rounded-xl focus:outline-2 focus:outline-[#F07824]"
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                <div className="pt-1">
                  <ActionButton type="submit" variant="primary" className="px-7 py-3 min-h-[46px]">
                    Send Message
                  </ActionButton>
                </div>
              </form>
            )}
          </div>

          <aside className="lg:col-span-4 space-y-5">
            <div className="bg-[#14243A] text-white rounded-2xl p-6 space-y-4">
              <p className="text-xs font-mono text-[#F07824]">Formal Quote Portal</p>
              <h3 className="font-display text-xl font-bold">
                Already Know Your Bay Count or Floor Area?
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Send your system choices and warehouse size directly on our Request a Quote page to
                get an itemized hardware and installation quote.
              </p>
              <ActionButton to="/request-quote" variant="primary" className="w-full">
                <span>Open Request a Quote</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" />
              </ActionButton>
            </div>
          </aside>
        </div>

        {/* Regional Desks */}
        <Reveal className="space-y-4">
          <div>
            <p className="text-sm font-medium text-[#F07824]">Regional Offices &amp; Dispatch</p>
            <h2 className="font-display text-2xl font-bold text-[#14243A] mt-0.5">
              Supply &amp; Installation Regions
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {REGIONAL_DESKS.map((desk) => (
              <div
                key={desk.region}
                className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#F07824]">{desk.code}</span>
                  <MapPin className="w-4 h-4 text-slate-400" />
                </div>
                <h3 className="font-display text-lg font-bold text-[#14243A]">{desk.region}</h3>
                <p className="font-mono text-xs text-[#14243A] font-semibold tabular-nums">
                  {desk.cityPhone}
                </p>
                <p className="text-xs text-slate-500 leading-snug">{desk.address}</p>
                <p className="text-sm font-medium text-[#202B38]">{desk.coverage}</p>
                <p className="text-sm text-slate-600 leading-relaxed">{desk.focus}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Compact FAQ */}
      <section className="bg-white border-t border-slate-200/80 py-11 lg:py-14">
        <FaqAccordion />
      </section>
    </div>
  );
}
