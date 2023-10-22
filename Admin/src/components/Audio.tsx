import styled from "styled-components";
import { ResetButton } from "../mixins";
import { Color, Image, MEDITATION_AUDIO_ID } from "../const";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { changeCurrentTime, changeIsPause } from "../store/currentAudioSlice";
import { useFrameInterval } from "../hooks/useFrameInterval";
import { Player } from "./Player";
import { createPortal } from "react-dom";
import { useGetAudio } from "../hooks/useGetAudio";
import { getIsPause } from "../store/currentAudioSelectors";
import { useAppSelector } from "../hooks/useAppSelector";

type AudioProps = {
  src: string;
  paddingButton?: string;
};

export function Audio(props: AudioProps) {
  const { src, paddingButton } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [isFirstPlay, setIsFirstPlay] = useState(true);
  const isPause = useAppSelector(getIsPause);
  const dispatch = useAppDispatch();
  const { loadAudio, playAudio, pauseAudio, getCurrentTime } =
    useGetAudio(MEDITATION_AUDIO_ID);
  const { startAnimating, stopAnimating } = useFrameInterval(100, () =>
    dispatch(changeCurrentTime(getCurrentTime()))
  );

  const togglePlayAndPause = () => {
    setIsOpen(true);
    if (isPause && src) {
      isFirstPlay && loadAudio();
      setIsFirstPlay(false);
      dispatch(changeIsPause(false));
      playAudio();
      startAnimating();
    } else {
      dispatch(changeIsPause(true));
      pauseAudio();
      stopAnimating();
    }
  };

  const handleOnEnded = () => {
    dispatch(changeIsPause(true));
    dispatch(changeCurrentTime(0));
    stopAnimating();
  };

  useEffect(() => {
    if (isPause) {
      stopAnimating();
    }
  }, [isPause]);

  useEffect(() => {
    if (src) {
      setIsFirstPlay(true);
      pauseAudio();
      dispatch(changeIsPause(true));
      dispatch(changeCurrentTime(0));
      changeCurrentTime(0);
    }
  }, [src]);

  useEffect(() => {
    return () => {
      stopAnimating();
      dispatch(changeIsPause(true));
      dispatch(changeCurrentTime(0));
      changeCurrentTime(0);
    };
  }, []);

  return (
    <>
      <audio onEnded={handleOnEnded} id={MEDITATION_AUDIO_ID}>
        <source src={src} type="audio/mp3" />
      </audio>
      <PlayButton
        type="button"
        onClick={togglePlayAndPause}
        disabled={!src}
        $paddingButton={paddingButton}
      >
        {isPause ? (
          <ImageStyled
            $paddingButton={paddingButton}
            src={Image.Play}
            alt="Играть"
          />
        ) : (
          <ImageStyled
            $paddingButton={paddingButton}
            src={Image.Pause}
            alt="Пауза"
          />
        )}
      </PlayButton>
      {isOpen && createPortal(<Player />, document.body)}
    </>
  );
}

const PlayButton = styled.button<{ $paddingButton?: string }>`
  ${ResetButton}
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ $paddingButton }) =>
    $paddingButton ? $paddingButton : "40px"};
  aspect-ratio: 1 / 1;
  height: 100%;
  border-radius: 100px;
  background-color: ${Color.Primary};

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ImageStyled = styled.img<{ $paddingButton?: string }>`
  width: ${({ $paddingButton }) => ($paddingButton ? 18 : 70)}px;
`;
