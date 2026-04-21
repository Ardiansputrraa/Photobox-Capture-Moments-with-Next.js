"use client";

import { useState, useRef, useCallback } from "react";

interface UseCountdownReturn {
  count: number | null;
  isActive: boolean;
  start: (from: number, onTick?: (n: number) => void) => Promise<void>;
}

export function useCountdown(): UseCountdownReturn {
  const [count, setCount] = useState<number | null>(null);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const start = useCallback(
    (from: number, onTick?: (n: number) => void): Promise<void> => {
      return new Promise((resolve) => {
        setIsActive(true);
        setCount(from);
        onTick?.(from);

        let current = from;
        const tick = () => {
          current -= 1;
          if (current <= 0) {
            setCount(null);
            setIsActive(false);
            resolve();
          } else {
            setCount(current);
            onTick?.(current);
            timerRef.current = setTimeout(tick, 1000);
          }
        };
        timerRef.current = setTimeout(tick, 1000);
      });
    },
    [],
  );

  return { count, isActive, start };
}
