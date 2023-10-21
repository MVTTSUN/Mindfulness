import { useEffect, useRef, useState } from "react";

export const useDeferredRender = (
  isSomethingBoolean: boolean,
  time: number
) => {
  const [isActive, setIsActive] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isSomethingBoolean) {
      timeoutRef.current = setTimeout(() => {
        setIsActive(true);
      }, time);
    } else {
      timeoutRef.current && clearTimeout(timeoutRef.current);
      setIsActive(false);
    }
  }, [isSomethingBoolean]);

  return isActive;
};
