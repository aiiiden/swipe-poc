import { useCallback, useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/tailwind-utils';

export function MobileSwiper({
  children,
  onSwipe,
}: {
  children: React.ReactNode;
  onSwipe: ({ deltaX, deltaY }: { deltaX: number; deltaY: number }) => void;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [startX, setStartX] = useState<number>(0);
  const [startY, setStartY] = useState<number>(0);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setStartY(e.touches[0].clientY);
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (wrapperRef.current) {
        const deltaX = e.touches[0].clientX - startX;
        const deltaY = e.touches[0].clientY - startY;
        onSwipe({ deltaX, deltaY });
      }
    },
    [onSwipe, startX, startY],
  );

  // for desktop : click and drag
  const handleClickMove = useCallback(
    (e: MouseEvent) => {
      if (wrapperRef.current) {
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        onSwipe({ deltaX, deltaY });
      }
    },
    [onSwipe, startX, startY],
  );

  useEffect(() => {
    if (wrapperRef.current) {
      // if mobile
      wrapperRef.current.addEventListener('touchstart', handleTouchStart);
      wrapperRef.current.addEventListener('touchmove', handleTouchMove);

      return () => {
        wrapperRef.current?.removeEventListener('touchstart', handleTouchStart);
        wrapperRef.current?.removeEventListener('touchmove', handleTouchMove);
      };
    }
  }, [handleTouchMove, handleTouchStart, handleClickMove]);

  return (
    <>
      <div ref={wrapperRef}>{children}</div>
    </>
  );
}

export function Card({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={cn(['w-80 aspect-square bg-gray-400 rounded-xl', className])}
      style={style}
    ></div>
  );
}
