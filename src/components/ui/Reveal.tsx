import { ReactNode, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface RevealProps {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  yOffset?: number;
}

export default function Reveal({
  children,
  className = '',
  delayMs = 0,
  yOffset = 14,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof window === 'undefined') return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const rect = node.getBoundingClientRect();
    const isNearViewport = rect.top < window.innerHeight * 0.98;

    const ctx = gsap.context(() => {
      if (isNearViewport) {
        gsap.fromTo(
          node,
          { y: Math.min(yOffset, 10) },
          {
            y: 0,
            duration: 0.34,
            delay: delayMs / 1000,
            ease: 'power2.out',
            clearProps: 'transform',
          }
        );
      } else {
        gsap.fromTo(
          node,
          { y: yOffset },
          {
            y: 0,
            duration: 0.42,
            delay: delayMs / 1000,
            ease: 'power2.out',
            clearProps: 'transform',
            scrollTrigger: {
              trigger: node,
              start: 'top 98%',
              once: true,
            },
          }
        );
      }
    }, ref);

    return () => ctx.revert();
  }, [delayMs, yOffset]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
