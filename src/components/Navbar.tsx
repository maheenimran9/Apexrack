import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowRight, ChevronDown, Mail, Menu, Phone, X } from 'lucide-react';
import { COMPANY_CONTACT, PRODUCTS_DATA } from '../data/siteData';
import BrandMark from './BrandMark';
import MediaFrame from './ui/MediaFrame';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [hoveredProductSlug, setHoveredProductSlug] = useState(PRODUCTS_DATA[0].slug);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
    setProductsDropdownOpen(false);
    setMobileProductsOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setProductsDropdownOpen(false);
        setMobileOpen(false);
      }
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProductsDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `relative py-2 text-[15px] font-medium transition-colors duration-150 whitespace-nowrap shrink-0 ${
      isActive ? 'text-[#14243A] font-semibold' : 'text-[#202B38]/80 hover:text-[#14243A]'
    }`;

  const isProductsActive = location.pathname.startsWith('/products');
  const hoveredProduct =
    PRODUCTS_DATA.find((p) => p.slug === hoveredProductSlug) || PRODUCTS_DATA[0];

  return (
    <>
      {/* Top Utility Strip (Desktop & Tablet) */}
      <div className="hidden sm:block bg-[#0C1726] text-slate-300 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between gap-4 text-xs sm:text-[13px]">
          <div className="flex items-center gap-4">
            <a
              href={COMPANY_CONTACT.primaryPhoneHref}
              className="font-mono tabular-nums text-white hover:text-[#F07824] transition-colors duration-150 whitespace-nowrap shrink-0"
            >
              {COMPANY_CONTACT.primaryPhone}
            </a>
            <span aria-hidden="true" className="text-slate-600">
              |
            </span>
            <a
              href={COMPANY_CONTACT.salesEmailHref}
              className="text-slate-300 hover:text-white transition-colors duration-150 whitespace-nowrap shrink-0"
            >
              {COMPANY_CONTACT.salesEmail}
            </a>
          </div>

          <div className="hidden md:block text-slate-300 whitespace-nowrap shrink-0">
            Supply &amp; Installation · {COMPANY_CONTACT.regionsLine}
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation Bar */}
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-[0_1px_3px_rgba(20,36,58,0.04)]">
        <div className="max-w-6xl mx-auto px-3.5 sm:px-6 lg:px-8 h-16 sm:h-[72px] flex items-center justify-between gap-2 sm:gap-6 lg:gap-8">
          {/* Zone 1: Brand Wordmark */}
          <Link
            to="/"
            className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F07824] whitespace-nowrap shrink-0"
          >
            <BrandMark />
          </Link>

          {/* Zone 2: Primary Navigation Links */}
          <nav aria-label="Primary Navigation" className="hidden lg:flex items-center gap-6">
            <NavLink to="/" end className={navLinkClass}>
              {({ isActive }) => (
                <>
                  <span>Home</span>
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 -bottom-[21px] h-[2px] bg-[#F07824]"
                    />
                  )}
                </>
              )}
            </NavLink>

            {/* Interactive Mega Dropdown for Products */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setProductsDropdownOpen(true)}
              onMouseLeave={() => setProductsDropdownOpen(false)}
            >
              <div className="inline-flex items-center gap-1 relative">
                <Link
                  to="/products"
                  className={`py-2 text-[15px] font-medium transition-colors duration-150 whitespace-nowrap shrink-0 ${
                    isProductsActive
                      ? 'text-[#14243A] font-semibold'
                      : 'text-[#202B38]/80 hover:text-[#14243A]'
                  }`}
                >
                  Products
                </Link>
                <button
                  type="button"
                  onClick={() => setProductsDropdownOpen((prev) => !prev)}
                  aria-expanded={productsDropdownOpen}
                  aria-label="Toggle products menu"
                  className="p-1 text-[#202B38]/60 hover:text-[#14243A] cursor-pointer"
                >
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-150 ${
                      productsDropdownOpen ? 'rotate-180 text-[#F07824]' : ''
                    }`}
                  />
                </button>
                {isProductsActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-[21px] h-[2px] bg-[#F07824]"
                  />
                )}
              </div>

              {productsDropdownOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 w-[760px] z-50 animate-dropdown-in">
                  <div className="bg-white border border-slate-200/80 rounded-2xl shadow-[0_24px_48px_-12px_rgba(20,36,58,0.18)] overflow-hidden grid grid-cols-12">
                    {/* Left 7 Columns: System Directory */}
                    <div className="col-span-7 p-4 border-r border-slate-200">
                      <div className="flex items-center justify-between px-2 pb-3 mb-2 border-b border-slate-100">
                        <span className="text-xs font-semibold text-[#14243A]">
                          Warehouse Storage Systems
                        </span>
                        <Link
                          to="/products"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#F07824] hover:text-[#14243A] transition-colors"
                        >
                          <span>All {PRODUCTS_DATA.length} Systems</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>

                      <div className="grid grid-cols-1 gap-0.5">
                        {PRODUCTS_DATA.map((prod) => {
                          const isHovered = prod.slug === hoveredProduct.slug;
                          return (
                            <Link
                              key={prod.slug}
                              to={`/products/${prod.slug}`}
                              onMouseEnter={() => setHoveredProductSlug(prod.slug)}
                              className={`px-3 py-2.5 rounded-xl transition-colors duration-150 flex items-center justify-between gap-2 ${
                                isHovered ? 'bg-[#F4F6F8] text-[#14243A]' : 'text-[#202B38]'
                              }`}
                            >
                              <span
                                className={`text-sm font-semibold ${
                                  isHovered ? 'text-[#F07824]' : 'text-[#14243A]'
                                }`}
                              >
                                {prod.name}
                              </span>
                              <span className="text-xs text-slate-500 whitespace-nowrap">
                                {prod.categoryGroup}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>

                    {/* Right 5 Columns: Live System Preview */}
                    <div className="col-span-5 bg-[#F4F6F8] p-4 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="aspect-[4/3] rounded-xl overflow-hidden border border-slate-200">
                          <MediaFrame
                            src={hoveredProduct.image}
                            alt={hoveredProduct.name}
                            className="w-full h-full"
                          />
                        </div>
                        <div>
                          <div className="text-xs font-medium text-[#F07824]">
                            {hoveredProduct.categoryGroup}
                          </div>
                          <div className="font-display text-base font-bold text-[#14243A] mt-0.5">
                            {hoveredProduct.name}
                          </div>
                          <p className="text-xs sm:text-[13px] text-[#202B38]/85 mt-1 leading-relaxed">
                            {hoveredProduct.shortDesc}
                          </p>
                        </div>
                      </div>

                      <Link
                        to={`/products/${hoveredProduct.slug}`}
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#14243A] hover:text-[#F07824] transition-colors"
                      >
                        <span>View Specifications</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <NavLink to="/industries" className={navLinkClass}>
              {({ isActive }) => (
                <>
                  <span>Industries</span>
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 -bottom-[21px] h-[2px] bg-[#F07824]"
                    />
                  )}
                </>
              )}
            </NavLink>

            <NavLink to="/about" className={navLinkClass}>
              {({ isActive }) => (
                <>
                  <span>About Us</span>
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 -bottom-[21px] h-[2px] bg-[#F07824]"
                    />
                  )}
                </>
              )}
            </NavLink>

            <NavLink to="/projects" className={navLinkClass}>
              {({ isActive }) => (
                <>
                  <span>Projects</span>
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 -bottom-[21px] h-[2px] bg-[#F07824]"
                    />
                  )}
                </>
              )}
            </NavLink>

            <NavLink to="/contact" className={navLinkClass}>
              {({ isActive }) => (
                <>
                  <span>Contact Us</span>
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 -bottom-[21px] h-[2px] bg-[#F07824]"
                    />
                  )}
                </>
              )}
            </NavLink>
          </nav>

          {/* Zone 3: Single Primary Action + Mobile Drawer Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link
              to="/request-quote"
              className="px-3 sm:px-5 py-2 sm:py-2.5 min-h-[40px] sm:min-h-[44px] inline-flex items-center justify-center text-[13px] sm:text-sm font-semibold text-white bg-[#F07824] hover:bg-[#D86617] rounded-[20px] transition-[transform,background-color] duration-150 agency-ease hover:-translate-y-px active:scale-[0.98] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14243A]"
            >
              Request a Quote
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-[20px] border border-slate-200 bg-white text-[#14243A] hover:bg-[#F4F6F8] transition-[transform,background-color] duration-150 active:scale-95 shrink-0 cursor-pointer"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-5 py-6 space-y-2 shadow-xl max-h-[82vh] overflow-y-auto animate-dropdown-in">
            <Link
              to="/"
              className="block py-3 px-3 text-[17px] font-medium text-[#202B38] hover:bg-[#F4F6F8] rounded-xl"
            >
              Home
            </Link>

            <div>
              <div className="flex items-center justify-between">
                <Link
                  to="/products"
                  className="flex-1 py-3 px-3 text-[17px] font-medium text-[#202B38] hover:bg-[#F4F6F8] rounded-xl"
                >
                  Products
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileProductsOpen((prev) => !prev)}
                  aria-label="Expand products submenu"
                  className="p-3 text-slate-600 hover:text-[#14243A] cursor-pointer"
                >
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      mobileProductsOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </div>
              {mobileProductsOpen && (
                <div className="pl-5 space-y-1.5 my-1.5 border-t border-b border-slate-100 py-2">
                  {PRODUCTS_DATA.map((prod) => (
                    <Link
                      key={prod.slug}
                      to={`/products/${prod.slug}`}
                      className="block py-2.5 px-3 text-[15px] font-medium text-slate-700 hover:text-[#14243A] hover:bg-[#F4F6F8] rounded-xl"
                    >
                      {prod.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/industries"
              className="block py-3 px-3 text-[17px] font-medium text-[#202B38] hover:bg-[#F4F6F8] rounded-xl"
            >
              Industries
            </Link>
            <Link
              to="/about"
              className="block py-3 px-3 text-[17px] font-medium text-[#202B38] hover:bg-[#F4F6F8] rounded-xl"
            >
              About Us
            </Link>
            <Link
              to="/projects"
              className="block py-3 px-3 text-[17px] font-medium text-[#202B38] hover:bg-[#F4F6F8] rounded-xl"
            >
              Projects
            </Link>
            <Link
              to="/contact"
              className="block py-3 px-3 text-[17px] font-medium text-[#202B38] hover:bg-[#F4F6F8] rounded-xl"
            >
              Contact Us
            </Link>

            <div className="pt-4 mt-3 border-t border-slate-200 space-y-3.5 px-3">
              <Link
                to="/request-quote"
                className="w-full py-3 px-5 min-h-[46px] inline-flex items-center justify-center text-base font-semibold text-white bg-[#F07824] hover:bg-[#D86617] rounded-[20px] transition-colors duration-150"
              >
                Request a Quote
              </Link>
              <div className="flex items-center gap-2.5 text-base text-[#202B38] pt-1">
                <Phone className="w-4 h-4 text-[#F07824] shrink-0" />
                <a href={COMPANY_CONTACT.primaryPhoneHref} className="font-mono tabular-nums font-medium">
                  {COMPANY_CONTACT.primaryPhone}
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-base text-[#202B38]">
                <Mail className="w-4 h-4 text-[#F07824] shrink-0" />
                <a href={COMPANY_CONTACT.salesEmailHref}>{COMPANY_CONTACT.salesEmail}</a>
              </div>
              <div className="text-sm text-slate-500">
                Supply &amp; Installation · {COMPANY_CONTACT.regionsLine}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
