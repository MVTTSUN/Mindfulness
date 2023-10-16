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
import { useFrameInterval } from "../hooks/useFrameInterval";

type AudioProps = {
  src: string;
};

export function Audio(props: AudioProps) {
  const { src } = props;
  const dispatch = useAppDispatch();
  const isPause = useAppSelector(getIsPause);
  const refAudio = useRef<HTMLAudioElement | null>(null);
  const [isFirstPlay, setIsFirstPlay] = useState(true);
  const { startAnimating, stopAnimating } = useFrameInterval(100, () => {
    if (refAudio.current) {
      dispatch(changeCurrentTime(refAudio.current.currentTime));
    }
  });

  const togglePlayAndPause = () => {
    if (refAudio?.current?.paused && src) {
      isFirstPlay && refAudio.current?.load();
      setIsFirstPlay(false);
      dispatch(changeIsPause(false));
      refAudio.current.play();
      startAnimating();
    } else {
      dispatch(changeIsPause(true));
      refAudio?.current?.pause();
      stopAnimating();
    }
  };

  const handleLoadedMetadata = () => {
    dispatch(setDuration(Number(refAudio.current?.duration)));
  };

  const handleOnEnded = () => {
    stopAnimating();
    dispatch(changeIsPause(true));
    dispatch(changeCurrentTime(0));
  };

  useEffect(() => {
    return () => {
      stopAnimating();
      dispatch(changeIsPause(true));
      dispatch(changeCurrentTime(0));
      dispatch(setAudioSrc(""));
    };
  }, []);

  useEffect(() => {
    if (isPause) {
      stopAnimating();
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
      <PlayButton
        type="button"
        onClick={togglePlayAndPause}
        disabled={src === ""}
      >
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
  aspect-ratio: 1 / 1;
  height: 100%;
  border-radius: 100px;
  background-color: ${Color.Primary};

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
