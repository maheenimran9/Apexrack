import { useEffect, useRef, useState } from 'react';
import { Layers } from 'lucide-react';

interface MediaFrameProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  zoomOnHover?: boolean;
  priority?: boolean;
}

export default function MediaFrame({
  src,
  alt,
  className = '',
  imgClassName = '',
  zoomOnHover = false,
  priority = false,
}: MediaFrameProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    setHasError(false);
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
  }, [src]);

  return (
    <div className={`relative overflow-hidden bg-[#14243A] ${className}`}>
      {/* Subtle architectural shimmer while image downloads */}
      {!hasError && !isLoaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-blueprint-grid bg-[#182B44] animate-pulse"
        />
      )}

      {!hasError ? (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          referrerPolicy="no-referrer"
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            setHasError(true);
            setIsLoaded(true);
          }}
          className={`relative w-full h-full object-cover transition-opacity duration-200 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${
            zoomOnHover
              ? 'transition-[transform,opacity] duration-200 agency-ease will-change-transform group-hover:scale-[1.03]'
              : ''
          } ${imgClassName}`}
        />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="w-full h-full min-h-[180px] bg-blueprint-grid bg-[#14243A] flex flex-col items-center justify-center p-6 text-center text-slate-300"
        >
          <Layers className="w-7 h-7 text-[#F07824] mb-2" />
          <span className="font-display text-sm font-semibold text-white max-w-xs">{alt}</span>
        </div>
      )}
    </div>
  );
}
