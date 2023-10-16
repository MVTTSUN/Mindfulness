import styled from "styled-components";
import { useGetAudio } from "../hooks/useGetAudio";
import { Color } from "../const";
import { ResetButton } from "../mixins";
import { ChangeEvent, useEffect } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import {
  getCurrentTime,
  getDuration,
  getIsPause,
} from "../store/currentAudioSelectors";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { changeCurrentTime, changeIsPause } from "../store/currentAudioSlice";
import { useFrameInterval } from "../hooks/useFrameInterval";

export function Player() {
  const isPause = useAppSelector(getIsPause);
  const dispatch = useAppDispatch();
  const currentTime = useAppSelector(getCurrentTime);
  const duration = useAppSelector(getDuration);
  const audio = useGetAudio("meditation-audio");
  const { startAnimating, stopAnimating } = useFrameInterval(100, () => {
    if (audio) {
      dispatch(changeCurrentTime(audio.currentTime));
    }
  });

  const togglePlayAndPause = () => {
    if (audio?.paused) {
      dispatch(changeIsPause(false));
      audio.play();
      startAnimating();
    } else {
      dispatch(changeIsPause(true));
      audio?.pause();
      stopAnimating();
    }
  };

  const changeDuration = (evt: ChangeEvent<HTMLInputElement>) => {
    if (audio) {
      const value = Number(evt.target.value);

      setTimeout(() => {
        dispatch(changeCurrentTime(value));
        audio.currentTime = value;
      }, 80);
    }
  };

  const changeBackward = () => {
    if (audio) {
      const value = audio.currentTime - 5 <= 0 ? 0 : audio.currentTime - 5;

      dispatch(changeCurrentTime(value));
      audio.currentTime = value;
    }
  };

  const changeForward = () => {
    if (audio) {
      const value =
        audio.currentTime + 5 >= audio.duration
          ? audio.duration
          : audio.currentTime + 5;

      dispatch(changeCurrentTime(value));
      audio.currentTime = value;
    }
  };

  useEffect(() => {
    return () => {
      stopAnimating();
    };
  }, []);

  useEffect(() => {
    if (isPause) {
      stopAnimating();
    }
  }, [isPause]);

  return (
    <PlayerStyled>
      <Container>
        <ControlContainer>
          <BackwardAndForwardButton onClick={changeBackward}>
            <img src="/images/backward.svg" alt="Назад" />
          </BackwardAndForwardButton>
          <PlayButton type="button" onClick={togglePlayAndPause}>
            {isPause ? (
              <img src="/images/play.svg" alt="Играть" />
            ) : (
              <img src="/images/pause.svg" alt="Пауза" />
            )}
          </PlayButton>
          <BackwardAndForwardButton onClick={changeForward}>
            <img src="/images/forward.svg" alt="Назад" />
          </BackwardAndForwardButton>
        </ControlContainer>
        <LineContainer>
          <Time>{currentTime.toFixed(1)}</Time>
          <LineBar
            value={currentTime}
            onChange={changeDuration}
            step={1}
            min={0}
            max={Math.floor(duration)}
            type="range"
          />
          <Time>{duration.toFixed(1)}</Time>
        </LineContainer>
      </Container>
    </PlayerStyled>
  );
}

const PlayerStyled = styled.div`
  box-sizing: border-box;
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 0;
  height: 100px;
  width: 100%;
  background-color: ${Color.Pastel};
`;

const Container = styled.div`
  padding: 0 20px;
  flex: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  max-width: 800px;
`;

const ControlContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const BackwardAndForwardButton = styled.button`
  ${ResetButton}
  width: 24px;
  height: 24px;
`;

const PlayButton = styled.button`
  ${ResetButton}
  padding: 10px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${Color.Primary};
`;

const LineContainer = styled.div`
  flex: auto;
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const LineBar = styled.input`
  cursor: pointer;
  flex: auto;
  height: 3px;
  max-width: 680px;
  background-color: ${Color.TextStandard};
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  position: relative;
  border-radius: 2px;

  &::-webkit-slider-thumb {
    appearance: none;
    height: 13px;
    width: 13px;
    background: ${Color.TextStandard};
    border-radius: 10px;
  }
  &::-moz-range-thumb {
    border: none;
    height: 13px;
    width: 13px;
    background: ${Color.TextStandard};
    border-radius: 10px;
  }
`;

const Time = styled.p`
  text-align: center;
  margin: 0;
  font-size: 14px;
  font-weight: 400;
  width: 50px;
  color: ${Color.TextStandard};
`;
