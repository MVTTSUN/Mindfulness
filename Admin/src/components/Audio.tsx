import styled from "styled-components";
import { ResetButton } from "../mixins";
import { Color } from "../const";
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { getIsPause } from "../store/currentAudioSelectors";
import { useAppDispatch } from "../hooks/useAppDispatch";
import {
  changeCurrentTime,
  changeIsPause,
  setAudioSrc,
  setDuration,
} from "../store/currentAudioSlice";

type AudioProps = {
  src: string;
};

export function Audio(props: AudioProps) {
  const { src } = props;
  const dispatch = useAppDispatch();
  const isPause = useAppSelector(getIsPause);
  const refAudio = useRef<HTMLAudioElement | null>(null);
  const [isFirstPlay, setIsFirstPlay] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const togglePlayAndPause = () => {
    if (refAudio?.current?.paused && src) {
      isFirstPlay && refAudio.current?.load();
      setIsFirstPlay(false);
      dispatch(changeIsPause(false));
      refAudio.current.play();
      intervalRef.current = setInterval(() => {
        if (refAudio.current) {
          dispatch(changeCurrentTime(refAudio.current.currentTime));
        }
      }, 100);
    } else {
      dispatch(changeIsPause(true));
      refAudio?.current?.pause();
      intervalRef.current && clearInterval(intervalRef.current);
    }
  };

  const handleLoadedMetadata = () => {
    dispatch(setDuration(Number(refAudio.current?.duration)));
  };

  const handleOnEnded = () => {
    intervalRef.current && clearInterval(intervalRef.current);
    dispatch(changeIsPause(true));
    dispatch(changeCurrentTime(0));
  };

  useEffect(() => {
    return () => {
      intervalRef.current && clearInterval(intervalRef.current);
      dispatch(changeIsPause(true));
      dispatch(changeCurrentTime(0));
      dispatch(setAudioSrc(""));
    };
  }, []);

  useEffect(() => {
    if (isPause) {
      intervalRef.current && clearInterval(intervalRef.current);
    }
  }, [isPause]);

  useEffect(() => {
    if (src) {
      setIsFirstPlay(true);
      dispatch(setAudioSrc(src));
      refAudio?.current?.pause();
      dispatch(changeIsPause(true));
      dispatch(changeCurrentTime(0));
    }
  }, [src]);

  return (
    <>
      <audio
        ref={refAudio}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleOnEnded}
        id="meditation-audio"
      >
        <source src={src} type="audio/mp3" />
      </audio>
      <PlayButton type="button" onClick={togglePlayAndPause}>
        {isPause ? (
          <img src="/images/play.svg" alt="Играть" />
        ) : (
          <img src="/images/pause.svg" alt="Пауза" />
        )}
      </PlayButton>
    </>
  );
}

const PlayButton = styled.button`
  ${ResetButton}
  padding: 40px;
  flex: auto;
  border-radius: 100px;
  background-color: ${Color.Primary};
`;
