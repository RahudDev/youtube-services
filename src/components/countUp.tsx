import React, { useEffect, useState } from 'react';

interface CountUpProps {
  target: number;
  duration?: number; // animation duration in ms
}

const CountUp: React.FC<CountUpProps> = ({ target, duration = 500 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start: number | null = null;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const progressRatio = Math.min(progress / duration, 1);
      setCount(Math.floor(progressRatio * target));
      if (progress < duration) {
        requestAnimationFrame(step);
      } else {
        setCount(target); // ensure final value
      }
    };
    requestAnimationFrame(step);
  }, [target, duration]);

  return <>{count}</>;
};

export default CountUp;

