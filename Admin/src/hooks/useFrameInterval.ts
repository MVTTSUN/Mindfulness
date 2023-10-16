import { useRef } from "react";

export const useFrameInterval = (time: number, callback: () => void) => {
  let fpsInterval: number, now: number, then: number, elapsed: number;
  const requestAnimationFrameRef = useRef<number | null>(null);

  const startAnimating = () => {
    fpsInterval = time;
    then = Date.now();
    animate();
  };

  const stopAnimating = () => {
    requestAnimationFrameRef.current &&
      cancelAnimationFrame(requestAnimationFrameRef.current);
  };

  const animate = () => {
    requestAnimationFrameRef.current = requestAnimationFrame(animate);

    now = Date.now();
    elapsed = now - then;

    if (elapsed > fpsInterval) {
      then = now - (elapsed % fpsInterval);

      callback();
    }
  };

  return { startAnimating, stopAnimating };
};
