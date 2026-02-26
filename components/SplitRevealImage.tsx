'use client';

import { useEffect, useRef } from 'react';
import Image, { StaticImageData } from 'next/image';
import { gsap } from 'gsap';

type SplitRevealImageProps = {
  src: string | StaticImageData;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  triggerOnView?: boolean;
};

export default function SplitRevealImage({
  src,
  alt,
  className = '',
  priority = false,
  sizes = '(max-width: 1024px) 100vw, 50vw',
  triggerOnView = true,
}: SplitRevealImageProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const leftRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const root = rootRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    if (!root || !left || !right) return;

    const ctx = gsap.context(() => {
      // Initial split state: both halves outside center with subtle fade/scale.
      gsap.set(left, { xPercent: -100, opacity: 0, scale: 1.05 });
      gsap.set(right, { xPercent: 100, opacity: 0, scale: 1.05 });
    }, root);

    const playReveal = () => {
      if (hasAnimatedRef.current) return;
      hasAnimatedRef.current = true;

      gsap.timeline()
        .to([left, right], { opacity: 1, duration: 0.35, ease: 'power2.out' }, 0)
        .to(left, { xPercent: 0, scale: 1, duration: 1.1, ease: 'power3.out' }, 0)
        .to(right, { xPercent: 0, scale: 1, duration: 1.1, ease: 'power3.out' }, 0);
    };

    let observer: IntersectionObserver | null = null;

    if (triggerOnView) {
      observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry?.isIntersecting) {
            playReveal();
            observer?.disconnect();
          }
        },
        { threshold: 0.35 }
      );
      observer.observe(root);
    } else {
      playReveal();
    }

    return () => {
      observer?.disconnect();
      ctx.revert();
    };
  }, [triggerOnView]);

  return (
    <div ref={rootRef} className={`relative w-full overflow-hidden ${className}`}>
      <div ref={leftRef} className="absolute inset-y-0 left-0 w-1/2 overflow-hidden">
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover object-left" />
      </div>

      <div ref={rightRef} className="absolute inset-y-0 right-0 w-1/2 overflow-hidden">
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover object-right" />
      </div>
    </div>
  );
}

