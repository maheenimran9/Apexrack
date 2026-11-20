import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from 'lucide-react';
import { COMPANY_CONTACT, PRODUCTS_DATA } from '../data/siteData';
import BrandMark from './BrandMark';

export default function Footer() {
  const [devMenuOpen, setDevMenuOpen] = useState(false);
  const devMenuRef = useRef<HTMLDivElement | null>(null);
  const lastPointerTypeRef = useRef<string>('mouse');

  useEffect(() => {
    if (!devMenuOpen) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (devMenuRef.current && !devMenuRef.current.contains(event.target as Node)) {
        setDevMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDevMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [devMenuOpen]);
  return (
    <footer className="bg-[#0C1726] text-slate-300 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 md:pb-9">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-9 pb-10 border-b border-white/10">
          {/* Column 1: Company Info */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block">
              <BrandMark inverted showFullTitle />
            </Link>

            <p className="text-base leading-[1.65] sm:text-[15px] text-slate-400 max-w-sm">
              Heavy-duty pallet racking, cantilever systems, industrial shelving, and steel
              mezzanines built to RMI &amp; SEMA safety standards.
            </p>

            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ApexRack on LinkedIn"
                className="group w-10 h-10 rounded-[12px] bg-white/5 border border-white/15 inline-flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#F07824] hover:border-[#F07824] hover:-translate-y-0.5 active:scale-95 transition-[transform,background-color,border-color,color] duration-150 agency-ease"
              >
                <Linkedin className="w-4 h-4 transition-transform duration-150 group-hover:scale-110" />
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ApexRack on YouTube"
                className="group w-10 h-10 rounded-[12px] bg-white/5 border border-white/15 inline-flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#F07824] hover:border-[#F07824] hover:-translate-y-0.5 active:scale-95 transition-[transform,background-color,border-color,color] duration-150 agency-ease"
              >
                <Youtube className="w-4 h-4 transition-transform duration-150 group-hover:scale-110" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ApexRack on Instagram"
                className="group w-10 h-10 rounded-[12px] bg-white/5 border border-white/15 inline-flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#F07824] hover:border-[#F07824] hover:-translate-y-0.5 active:scale-95 transition-[transform,background-color,border-color,color] duration-150 agency-ease"
              >
                <Instagram className="w-4 h-4 transition-transform duration-150 group-hover:scale-110" />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ApexRack on Facebook"
                className="group w-10 h-10 rounded-[12px] bg-white/5 border border-white/15 inline-flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#F07824] hover:border-[#F07824] hover:-translate-y-0.5 active:scale-95 transition-[transform,background-color,border-color,color] duration-150 agency-ease"
              >
                <Facebook className="w-4 h-4 transition-transform duration-150 group-hover:scale-110" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3.5">
            <h3 className="font-display text-base sm:text-sm font-semibold text-white">Company</h3>
            <ul className="space-y-2.5 text-base sm:text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors duration-150">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white transition-colors duration-150">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/industries" className="hover:text-white transition-colors duration-150">
                  Industries
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors duration-150">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-white transition-colors duration-150">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors duration-150">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/request-quote"
                  className="text-[#F07824] hover:text-white transition-colors duration-150 font-medium"
                >
                  Request a Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Storage Systems */}
          <div className="lg:col-span-3 space-y-3.5">
            <h3 className="font-display text-base sm:text-sm font-semibold text-white">
              Storage Systems
            </h3>
            <ul className="space-y-2.5 text-base sm:text-sm">
              {PRODUCTS_DATA.slice(0, 7).map((prod) => (
                <li key={prod.slug}>
                  <Link
                    to={`/products/${prod.slug}`}
                    className="hover:text-white transition-colors duration-150"
                  >
                    {prod.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Commercial Desk */}
          <div className="lg:col-span-3 space-y-3.5">
            <h3 className="font-display text-base sm:text-sm font-semibold text-white">
              Commercial Desk
            </h3>
            <div className="space-y-3 text-base sm:text-sm">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#F07824] shrink-0" />
                <a
                  href={COMPANY_CONTACT.primaryPhoneHref}
                  className="font-mono tabular-nums text-white hover:text-[#F07824] transition-colors duration-150"
                >
                  {COMPANY_CONTACT.primaryPhone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#F07824] shrink-0" />
                <a
                  href={COMPANY_CONTACT.salesEmailHref}
                  className="text-white hover:text-[#F07824] transition-colors duration-150"
                >
                  {COMPANY_CONTACT.salesEmail}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F07824] mt-0.5 shrink-0" />
                <span className="text-sm leading-relaxed text-slate-300">
                  {COMPANY_CONTACT.hqAddress}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-slate-400">
                Serving the UK, USA, Canada, and UAE.
              </p>
              <div className="pt-1">
                <Link
                  to="/request-quote"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 min-h-[42px] text-sm font-semibold text-white bg-[#F07824] hover:bg-[#D86617] rounded-[20px] transition-[transform,background-color] duration-150 agency-ease hover:-translate-y-px active:scale-[0.98]"
                >
                  <span>Request a Quote</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-slate-500">
          <div className="space-y-1.5">
            <p>© {new Date().getFullYear()} ApexRack Industrial Solutions. All rights reserved.</p>

            {/* Interactive Developer Credit Popover */}
            <div
              ref={devMenuRef}
              className="relative inline-block"
              onMouseEnter={() => setDevMenuOpen(true)}
              onMouseLeave={() => setDevMenuOpen(false)}
            >
              {/* Popover Tooltip Card above trigger */}
              <div
                role="menu"
                aria-label="Developer profiles"
                className={`absolute left-0 sm:left-1/2 sm:-translate-x-1/2 bottom-full pb-3 z-30 transition-all duration-150 ease-out ${
                  devMenuOpen
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 translate-y-1.5 pointer-events-none'
                }`}
              >
                <div className="relative w-60 rounded-xl bg-[#14243A] border border-white/15 shadow-[0_20px_42px_-12px_rgba(0,0,0,0.65)] p-2 space-y-1">
                  <a
                    role="menuitem"
                    href="https://www.linkedin.com/in/maheenimran9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-2.5 px-3.5 py-2.5 rounded-lg text-sm font-medium text-white hover:bg-white/10 hover:text-[#F07824] transition-colors duration-150"
                  >
                    <span className="inline-flex items-center gap-2.5">
                      <Linkedin className="w-4 h-4 text-[#F07824] shrink-0" />
                      <span>See LinkedIn Profile</span>
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  </a>

                  <a
                    role="menuitem"
                    href="https://github.com/maheenimran9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-2.5 px-3.5 py-2.5 rounded-lg text-sm font-medium text-white hover:bg-white/10 hover:text-[#F07824] transition-colors duration-150"
                  >
                    <span className="inline-flex items-center gap-2.5">
                      <Github className="w-4 h-4 text-[#F07824] shrink-0" />
                      <span>See GitHub Profile</span>
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  </a>

                  {/* Bottom Pointer Arrow */}
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1.5 left-12 sm:left-1/2 sm:-translate-x-1/2 w-3 h-3 rotate-45 bg-[#14243A] border-r border-b border-white/15"
                  />
                </div>
              </div>

              <button
                type="button"
                aria-expanded={devMenuOpen}
                aria-haspopup="menu"
                onPointerDown={(e) => {
                  lastPointerTypeRef.current = e.pointerType;
                }}
                onClick={() => {
                  if (lastPointerTypeRef.current === 'mouse') {
                    setDevMenuOpen(true);
                  } else {
                    setDevMenuOpen((prev) => !prev);
                  }
                }}
                className="text-xs font-mono tracking-wider uppercase text-[#E2B76B] hover:text-[#F07824] transition-colors duration-150 cursor-pointer py-0.5 text-left"
              >
                DEVELOPED BY <span className="italic font-semibold">MAHEEN IMRAN</span>
              </button>
            </div>
          </div>

          <p>{COMPANY_CONTACT.regionsLine}</p>
        </div>
      </div>
    </footer>
  );
}
