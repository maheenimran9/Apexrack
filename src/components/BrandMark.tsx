interface BrandMarkProps {
  inverted?: boolean;
  showFullTitle?: boolean;
}

export default function BrandMark({
  inverted = false,
  showFullTitle = false,
}: BrandMarkProps) {
  return (
    <span className="inline-flex items-center gap-2 sm:gap-3 whitespace-nowrap shrink-0">
      <svg viewBox="0 0 32 32" className="w-7 h-7 sm:w-8 sm:h-8 shrink-0" aria-hidden="true">
        <rect width="32" height="32" rx="3" fill={inverted ? '#FFFFFF' : '#14243A'} />
        <rect x="7" y="6" width="3.5" height="20" fill={inverted ? '#14243A' : '#FFFFFF'} />
        <rect x="21.5" y="6" width="3.5" height="20" fill={inverted ? '#14243A' : '#FFFFFF'} />
        <rect x="10.5" y="10" width="11" height="3" fill="#F07824" />
        <rect x="10.5" y="18.5" width="11" height="3" fill="#F07824" />
      </svg>
      <span
        className={`font-display text-[17px] sm:text-xl font-bold tracking-tight ${
          inverted ? 'text-white' : 'text-[#14243A]'
        }`}
      >
        {showFullTitle ? 'ApexRack Industrial Solutions' : 'ApexRack'}
      </span>
    </span>
  );
}
