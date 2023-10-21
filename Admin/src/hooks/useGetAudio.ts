import { useEffect, useRef } from "react";

export const useGetAudio = (id: string) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const getCurrentTime = () => {
    return audioRef.current?.currentTime || 0;
  };

  const changeCurrentTimeAudio = (value: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value;
    }
  };

  const getDuration = () => {
    return audioRef.current?.duration || 0;
  };

  const loadAudio = () => {
    audioRef.current?.load();
  };

  const playAudio = () => {
    audioRef.current?.play();
  };

  const pauseAudio = () => {
    audioRef.current?.pause();
  };

  useEffect(() => {
    audioRef.current = document.querySelector(`#${id}`);
  }, []);

  return {
    audio: audioRef.current,
    changeCurrentTimeAudio,
    getCurrentTime,
    getDuration,
    loadAudio,
    playAudio,
    pauseAudio,
  };
};
