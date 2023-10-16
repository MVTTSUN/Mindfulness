import { useEffect, useRef } from "react";
import { useAppSelector } from "./useAppSelector";
import { getIsPause } from "../store/currentAudioSelectors";

export const useGetAudio = (id: string) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPause = useAppSelector(getIsPause);

  useEffect(() => {
    if (!isPause) {
      audioRef.current = document.querySelector(`#${id}`);
    }
  }, [isPause]);

  return audioRef.current;
};
