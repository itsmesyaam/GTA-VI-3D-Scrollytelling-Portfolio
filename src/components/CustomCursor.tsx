'use client';

import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Check if device supports fine hover (desktop mouse)
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hasFinePointer || prefersReducedMotion) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable =
          target.closest('button') ||
          target.closest('a') ||
          target.closest('input') ||
          target.closest('select') ||
          target.closest('textarea') ||
          target.closest('[role="button"]') ||
          target.classList.contains('cursor-pointer');
        setIsPointer(Boolean(isClickable));
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="pointer-events-none fixed z-50 transition-transform duration-75 ease-out select-none"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        left: 0,
        top: 0,
      }}
    >
      {/* Outer Reticle Crosshair Ring */}
      <div
        className={`relative -translate-x-1/2 -translate-y-1/2 transition-all duration-150 ${
          isPointer ? 'w-10 h-10 border-[#FF2A85] scale-110' : 'w-7 h-7 border-[#00F0FF] scale-100'
        } rounded-full border border-opacity-70`}
      >
        {/* Reticle tick marks */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-[1px] h-2 bg-[#00F0FF]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 w-[1px] h-2 bg-[#00F0FF]" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 h-[1px] w-2 bg-[#00F0FF]" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 h-[1px] w-2 bg-[#00F0FF]" />

        {/* Center Target Dot */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full ${
            isPointer ? 'w-2 h-2 bg-[#FF2A85] shadow-[0_0_8px_#FF2A85]' : 'w-1 h-1 bg-[#00F0FF]'
          }`}
        />
      </div>
    </div>
  );
};
