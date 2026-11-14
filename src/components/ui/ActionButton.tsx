import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type ActionVariant = 'primary' | 'secondary' | 'outline-light' | 'navy';

interface ActionButtonProps {
  to?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: ActionVariant;
  className?: string;
  children: ReactNode;
}

const VARIANT_CLASSES: Record<ActionVariant, string> = {
  primary:
    'text-white bg-[#F07824] hover:bg-[#D86617] focus-visible:outline-[#14243A]',
  navy:
    'text-white bg-[#14243A] hover:bg-[#1E3352] focus-visible:outline-[#F07824]',
  secondary:
    'text-[#14243A] bg-[#F4F6F8] hover:bg-slate-200 border border-slate-300 focus-visible:outline-[#14243A]',
  'outline-light':
    'text-white bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-xs focus-visible:outline-[#F07824]',
};

export default function ActionButton({
  to,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
  children,
}: ActionButtonProps) {
  const baseClasses = `group inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[46px] text-base sm:text-[15px] font-semibold rounded-[20px] transition-[transform,background-color,border-color,color,box-shadow] duration-150 agency-ease hover:-translate-y-px active:scale-[0.98] will-change-transform whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 ${VARIANT_CLASSES[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={baseClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={`${baseClasses} cursor-pointer`}>
      {children}
    </button>
  );
}
