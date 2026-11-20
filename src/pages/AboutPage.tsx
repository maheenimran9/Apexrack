import { Compass, Globe, Layers, Ruler, ShieldCheck, Target, Truck, Wrench } from 'lucide-react';
import PageBanner from '../components/PageBanner';
import MediaFrame from '../components/ui/MediaFrame';
import Reveal from '../components/ui/Reveal';
import SectionHeading from '../components/ui/SectionHeading';
import ActionButton from '../components/ui/ActionButton';
import CtaBand from '../components/CtaBand';
import { COMPANY_CONTACT, SITE_IMAGES } from '../data/siteData';

export default function AboutPage() {
  const highlights = [
    { icon: Globe, label: 'Headquarters', value: 'West Thurrock Park, UK' },
    { icon: Layers, label: 'Equipment Range', value: '8 Warehouse Systems' },
    { icon: Ruler, label: 'Safety Standards', value: 'RMI · ANSI · SEMA' },
    { icon: Wrench, label: 'Full Delivery', value: 'Layout to Site Install' },
  ];

  const workflowSteps = [
    {
      step: 'Step 1',
      title: 'Check Floor & Pallets',
      detail: 'We review your pallet weights, ceiling height, floor slab, and forklift aisle widths.',
    },
    {
      step: 'Step 2',
      title: 'Match the Right Racks',
      detail: 'Upright frames, beam spans, and safety barriers are sized cleanly to your stock.',
    },
    {
      step: 'Step 3',
      title: 'Ship & Install on Site',
      detail: 'Steel hardware arrives directly at your dock with experienced local install crews.',
    },
  ];

  const capabilities = [
    {
      badge: 'Full Catalog',
      icon: Layers,
      title: 'Full Range of Racking & Shelving',
      detail:
        'From selective pallet racking and drive-in lanes to cantilever arms, industrial shelving, and steel mezzanines.',
    },
    {
      badge: 'CAD Layouts',
      icon: Compass,
      title: 'Practical Floor Planning',
      detail:
        'Aisle widths and beam levels planned around your exact forklifts so drivers turn and stack smoothly.',
    },
    {
      badge: 'Safety Tested',
      icon: ShieldCheck,
      title: 'Safety-First Hardware',
      detail:
        'Bolted footplates, locking beam clips, steel post protectors, row-end barriers, and load-rating signs.',
    },
    {
      badge: '4 Regions',
      icon: Truck,
      title: 'Four-Country Delivery & Crews',
      detail:
        'Coordinated freight and on-site installation teams supporting commercial sites in the UK, USA, Canada, and UAE.',
    },
  ];

  return (
    <div className="bg-[#F4F6F8] min-h-[75vh]">
      <PageBanner
        eyebrow="About ApexRack"
        title="About ApexRack Industrial Solutions"
        description="We design, supply, and install heavy-duty warehouse racking, industrial shelving, and steel mezzanine floors."
        breadcrumbCurrent="About Us"
        highlights={[
          { label: 'Service Markets', value: '4 Countries' },
          { label: 'Product Catalog', value: '8 Systems' },
          { label: 'Compliance', value: 'RMI & SEMA' },
        ]}
      />

      {/* Section 1: Who We Are + 4-Card Snapshot */}
      <section className="bg-white border-b border-slate-200/80 py-10 lg:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-6 space-y-4">
              <SectionHeading
                eyebrow="Who We Are"
                title="Practical Racking Supply & Engineering Support"
              />
              <p className="text-base text-[#202B38]/85 leading-relaxed">
                ApexRack Industrial Solutions helps warehouse managers, 3PL operators, and factories
                fit more stock safely inside the building they already have.
              </p>
              <p className="text-base text-[#202B38]/85 leading-relaxed">
                From our main hub at {COMPANY_CONTACT.hqAddress} alongside partner depots across the
                United States, Canada, and the UAE, we handle everything from load sizing and floor
                layouts to delivery and site installation.
              </p>
              <div className="pt-1 flex flex-wrap gap-3">
                <ActionButton to="/products" variant="primary">
                  Browse Systems
                </ActionButton>
                <ActionButton to="/projects" variant="secondary">
                  View Completed Projects
                </ActionButton>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="h-[220px] sm:h-[260px] lg:h-[280px] rounded-2xl overflow-hidden border border-slate-200/80 shadow-[0_14px_32px_-16px_rgba(20,36,58,0.16)]">
                <MediaFrame
                  src={SITE_IMAGES.warehouseEngineering}
                  alt="Modern warehouse interior outfitted with industrial steel pallet racking"
                  priority
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="bg-[#F4F6F8] border border-slate-200/80 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 text-[#F07824] inline-flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-slate-500">{item.label}</div>
                    <div className="font-display text-[15px] font-bold text-[#14243A] mt-0.5">
                      {item.value}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 2: How We Work */}
      <section className="bg-[#F4F6F8] py-10 lg:py-14 border-b border-slate-200/80">
        <Reveal className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-7">
          <SectionHeading
            eyebrow="How It Works"
            title="From Floor Plan to Installed Racking in 3 Steps"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {workflowSteps.map((ws) => (
              <div
                key={ws.step}
                className="bg-white border border-slate-200/80 rounded-2xl p-6 space-y-2.5"
              >
                <div className="font-mono text-sm font-bold text-[#F07824]">{ws.step}</div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-[#14243A]">
                  {ws.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-[#202B38]/85">{ws.detail}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Section 3: Core Capabilities */}
      <section className="bg-white py-10 lg:py-14 border-b border-slate-200/80">
        <Reveal className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-7">
          <SectionHeading
            eyebrow="What We Do"
            title="How We Support Your Warehouse"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {capabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <div
                  key={cap.title}
                  className="bg-[#F4F6F8] border border-slate-200/80 rounded-2xl p-6 space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 text-[#F07824] inline-flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs font-medium text-slate-400">
                      {cap.badge}
                    </span>
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-[#14243A]">
                    {cap.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-[#202B38]/85">{cap.detail}</p>
                </div>
              );
            })}
          </div>
        </Reveal>
      </section>

      {/* Section 4: Mission & Vision */}
      <section className="bg-[#F4F6F8] py-10 lg:py-14">
        <Reveal className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-[#14243A] text-white rounded-2xl p-6 sm:p-7 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 text-[#F07824] inline-flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <p className="text-xs font-mono text-[#F07824]">Our Goal</p>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white [text-wrap:balance]">
              Safer Warehouses With More Storage Room
            </h2>
            <p className="text-[15px] sm:text-base leading-relaxed text-slate-300">
              Give warehouse teams properly rated steel storage that boosts capacity, speeds up daily
              picking, and protects workers around forklifts.
            </p>
          </div>

          <div className="bg-[#14243A] text-white rounded-2xl p-6 sm:p-7 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 text-[#F07824] inline-flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <p className="text-xs font-mono text-[#F07824]">Our Promise</p>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white [text-wrap:balance]">
              Straight Answers, Honest Specs &amp; On-Time Install
            </h2>
            <p className="text-[15px] sm:text-base leading-relaxed text-slate-300">
              Deliver reliable racking hardware backed by clear drawings, transparent pricing, and
              dependable crews in every region we serve.
            </p>
          </div>
        </Reveal>
      </section>

      <CtaBand
        eyebrow="Free Floor Layout · 1-Day Written Quote"
        title="Need More Storage Room Without Moving Building?"
        description="Share your room dimensions or call our team directly, and we'll send a straightforward layout drawing and quote."
        ctaLabel="Request a Quote"
        secondaryLabel="Contact Us"
        secondaryTo="/contact"
      />
    </div>
  );
}
