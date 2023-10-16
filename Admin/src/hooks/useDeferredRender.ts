import { useEffect, useRef, useState } from "react";

export const useDeferredRender = (
  isSomethingBoolean: boolean,
  time: number
) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isActive, setIsActive] = useState(false);

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
