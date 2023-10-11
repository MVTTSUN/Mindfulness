import styled from "styled-components";
import { useGetAudio } from "../hooks/useGetAudio";
import { Color } from "../const";
import { ResetButton } from "../mixins";
import { ChangeEvent, useEffect, useRef } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import {
  getCurrentTime,
  getDuration,
  getIsPause,
} from "../store/currentAudioSelectors";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { changeCurrentTime, changeIsPause } from "../store/currentAudioSlice";

export function Player() {
  const isPause = useAppSelector(getIsPause);
  const dispatch = useAppDispatch();
  const currentTime = useAppSelector(getCurrentTime);
  const duration = useAppSelector(getDuration);
  const audio = useGetAudio("meditation-audio");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const togglePlayAndPause = () => {
    if (audio?.paused) {
      dispatch(changeIsPause(false));
      audio.play();
      intervalRef.current = setInterval(() => {
        if (audio) {
          dispatch(changeCurrentTime(audio.currentTime));
        }
      }, 100);
    } else {
      dispatch(changeIsPause(true));
      audio?.pause();
      intervalRef.current && clearInterval(intervalRef.current);
    }
  };

  const changeDuration = (evt: ChangeEvent<HTMLInputElement>) => {
    if (audio) {
      dispatch(changeCurrentTime(Number(evt.target.value)));
      audio.currentTime = Number(evt.target.value);
    }
  };

  useEffect(() => {
    return () => {
      intervalRef.current && clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (isPause) {
      intervalRef.current && clearInterval(intervalRef.current);
    }
  }, [isPause]);

  return (
    <PlayerStyled>
      <Container>
        <PlayButton type="button" onClick={togglePlayAndPause}>
          {isPause ? (
            <img src="/images/play.svg" alt="Играть" />
          ) : (
            <img src="/images/pause.svg" alt="Пауза" />
          )}
        </PlayButton>
        <LineContainer>
          <LineBar
            value={currentTime}
            onChange={changeDuration}
            step={1}
            min={0}
            max={Math.floor(duration)}
            type="range"
          />
          <TimeContainer>
            <Time>{currentTime.toFixed(1)}</Time>
            <Time>{duration.toFixed(1)}</Time>
          </TimeContainer>
        </LineContainer>
      </Container>
    </PlayerStyled>
  );
}

const PlayerStyled = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 0;
  height: 70px;
  width: 100%;
  background-color: ${Color.Pastel};
`;

const Container = styled.div`
  flex: auto;
  display: flex;
  align-items: center;
  gap: 10px;
  max-width: 800px;
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
  align-self: flex-end;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const LineBar = styled.input`
  height: 3px;
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

const TimeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const Time = styled.p`
  margin: 0;
  font-size: 12px;
  font-weight: 400;
  color: ${Color.TextStandard};
`;
