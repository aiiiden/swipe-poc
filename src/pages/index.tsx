import { useEffect, useState } from 'react';

import { Card, MobileSwiper } from '@/features/card/components/card';

function CardArea() {
  const [delta2D, setDelta2D] = useState<{
    deltaX: number;
    deltaY: number;
  }>();

  console.log('DX', delta2D?.deltaX, 'DY', delta2D?.deltaY);

  // if deltaX changes, re-center the card after 3 second
  useEffect(() => {
    if (delta2D?.deltaX) {
      const timeout = setTimeout(() => {
        setDelta2D({ deltaX: 0, deltaY: 0 });
      }, 500);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [delta2D?.deltaX]);

  return (
    <MobileSwiper onSwipe={(deltas) => setDelta2D(deltas)}>
      <div className="fixed bottom-2 right-2 p-2 border rounded-lg">
        DX {delta2D?.deltaX.toFixed(2)} DY {delta2D?.deltaY.toFixed(2)}
      </div>
      <Card
        className="transition-all ease-in-out duration-75"
        style={{
          transform: `translateX(${delta2D?.deltaX ?? 0}px)`,
          opacity: `${1 - Math.abs(delta2D?.deltaX ?? 0) / 400}`,
        }}
      />
    </MobileSwiper>
  );
}

export default function IndexPage() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <CardArea />
    </div>
  );
}
