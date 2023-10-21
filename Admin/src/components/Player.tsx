import styled from "styled-components";
import { useGetAudio } from "../hooks/useGetAudio";
import { Color, Image, MEDITATION_AUDIO_ID } from "../const";
import { ResetButton } from "../mixins";
import { ChangeEvent, useEffect } from "react";
import { useFrameInterval } from "../hooks/useFrameInterval";
import { useAppSelector } from "../hooks/useAppSelector";
import { getIsPause } from "../store/currentAudioSelectors";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { changeCurrentTime, changeIsPause } from "../store/currentAudioSlice";

export function Player() {
  const isPause = useAppSelector(getIsPause);
  const dispatch = useAppDispatch();
  const {
    getCurrentTime,
    getDuration,
    changeCurrentTimeAudio,
    playAudio,
    pauseAudio,
  } = useGetAudio(MEDITATION_AUDIO_ID);
  const { startAnimating, stopAnimating } = useFrameInterval(100, () =>
    dispatch(changeCurrentTime(getCurrentTime()))
  );

  const togglePlayAndPause = () => {
    if (isPause) {
      dispatch(changeIsPause(false));
      playAudio();
      startAnimating();
    } else {
      dispatch(changeIsPause(true));
      pauseAudio();
      stopAnimating();
    }
  };

  const changeTimeAudio = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = Number(evt.target.value);

    setTimeout(() => {
      dispatch(changeCurrentTime(value));
      changeCurrentTimeAudio(value);
    }, 80);
  };

  const changeBackward = () => {
    const currentTime = getCurrentTime();
    const value = currentTime - 5 <= 0 ? 0 : currentTime - 5;

    dispatch(changeCurrentTime(value));
    changeCurrentTimeAudio(value);
  };

  const changeForward = () => {
    const currentTime = getCurrentTime();
    const duration = getDuration();
    const value = currentTime + 5 >= duration ? duration : currentTime + 5;

    dispatch(changeCurrentTime(value));
    changeCurrentTimeAudio(value);
  };

  useEffect(() => {
    if (isPause) {
      stopAnimating();
    }
  }, [isPause]);

  useEffect(() => {
    return () => {
      stopAnimating();
    };
  }, []);

  return (
    <PlayerStyled>
      <Container>
        <ControlContainer>
          <BackwardAndForwardButton onClick={changeBackward}>
            <img src={Image.Backward} alt="Назад" />
          </BackwardAndForwardButton>
          <PlayButton type="button" onClick={togglePlayAndPause}>
            {isPause ? (
              <img src={Image.Play} alt="Играть" />
            ) : (
              <img src={Image.Pause} alt="Пауза" />
            )}
          </PlayButton>
          <BackwardAndForwardButton onClick={changeForward}>
            <img src={Image.Forward} alt="Назад" />
          </BackwardAndForwardButton>
        </ControlContainer>
        <LineContainer>
          <Time>{getCurrentTime().toFixed(1)}</Time>
          <LineBar
            value={getCurrentTime()}
            onChange={changeTimeAudio}
            step={1}
            min={0}
            max={Math.floor(getDuration())}
            type="range"
          />
          <Time>{getDuration().toFixed(1)}</Time>
        </LineContainer>
      </Container>
    </PlayerStyled>
  );
}

const PlayerStyled = styled.div`
  z-index: 10;
  box-sizing: border-box;
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 0;
  height: 100px;
  width: 100vw;
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
