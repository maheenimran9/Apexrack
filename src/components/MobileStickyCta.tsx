import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function MobileStickyCta() {
  const [visible, setVisible] = useState(false);
  const { pathname } = useLocation();

  const isQuoteOrContact = pathname === '/request-quote' || pathname === '/contact';

  useEffect(() => {
    if (isQuoteOrContact) {
      setVisible(false);
      return;
    }

    const onScroll = () => {
      setVisible(window.scrollY > 280);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isQuoteOrContact]);

  if (isQuoteOrContact || !visible) return null;

  return (
    <div
      role="region"
      aria-label="Quick quote action"
      className="md:hidden fixed inset-x-0 bottom-0 z-40 bg-[#0C1726]/95 backdrop-blur-md border-t border-white/15 px-3.5 py-2.5 shadow-[0_-8px_24px_rgba(12,23,38,0.3)]"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-xs font-mono text-[#F07824] font-semibold truncate">
            Free Floor Plan Included
          </div>
          <div className="text-[13px] font-medium text-white truncate">
            Written quote in 1 business day
          </div>
        </div>

        <Link
          to="/request-quote"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 min-h-[42px] bg-[#F07824] hover:bg-[#D86617] text-white text-sm font-semibold rounded-[20px] transition-colors shrink-0 whitespace-nowrap"
        >
          <span>Request Quote</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
