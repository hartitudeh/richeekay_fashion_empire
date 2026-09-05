'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: 'fade-up' | 'fade-in' | 'scale-up' | 'slide-left' | 'slide-right';
  delay?: number; // delay in ms
  duration?: number; // duration in ms
  threshold?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 600,
  threshold = 0.15,
  className = '',
  style = {}
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (domRef.current) {
              observer.unobserve(domRef.current);
            }
          }
        });
      },
      { threshold }
    );

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  const getAnimationStyles = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
      transitionDelay: `${delay}ms`,
      willChange: 'opacity, transform',
      ...style
    };

    if (!isVisible) {
      switch (animation) {
        case 'fade-up':
          return { ...baseStyle, opacity: 0, transform: 'translateY(36px)' };
        case 'scale-up':
          return { ...baseStyle, opacity: 0, transform: 'scale(0.92)' };
        case 'slide-left':
          return { ...baseStyle, opacity: 0, transform: 'translateX(-40px)' };
        case 'slide-right':
          return { ...baseStyle, opacity: 0, transform: 'translateX(40px)' };
        case 'fade-in':
        default:
          return { ...baseStyle, opacity: 0 };
      }
    }

    return {
      ...baseStyle,
      opacity: 1,
      transform: 'none'
    };
  };

  return (
    <div ref={domRef} className={className} style={getAnimationStyles()}>
      {children}
    </div>
  );
};

export default ScrollReveal;
