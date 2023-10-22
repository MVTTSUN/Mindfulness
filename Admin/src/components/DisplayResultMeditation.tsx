import { useOutletContext } from "react-router-dom";
import { DataMeditation } from "../types/get-results";
import styled from "styled-components";
import { FontSizeStandard } from "../mixins";
import { ApiRoute, BASE_URL, Color, MEDITATION_AUDIO_ID } from "../const";
import { Audio } from "./Audio";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { changeCurrentTime } from "../store/currentAudioSlice";
import { useGetAudio } from "../hooks/useGetAudio";
import { getCurrentTime } from "../store/currentAudioSelectors";

export function DisplayResultMeditation() {
  const data = useOutletContext<DataMeditation>();
  const currentTime = useAppSelector(getCurrentTime);
  const dispatch = useAppDispatch();
  const { audio, changeCurrentTimeAudio } = useGetAudio(MEDITATION_AUDIO_ID);

  const getIsActiveInput = (index: number) => {
    const timeAt = data.textLines && Number(data.textLines[index]?.timeAt);
    const timeTo = data.textLines && Number(data.textLines[index]?.timeTo);

    if (timeAt && timeTo) {
      return timeAt <= currentTime && timeTo >= currentTime;
    }
    return false;
  };

  const changeTimeAudio = (timeAt: string) => {
    if (audio) {
      const value = Number(timeAt);

      setTimeout(() => {
        dispatch(changeCurrentTime(value));
        changeCurrentTimeAudio(value);
      }, 80);
    }
  };

  return (
    <Container>
      <Text>Вид: {data && data.kind}</Text>
      <Image
        src={
          data
            ? `${BASE_URL}${ApiRoute.Meditations + ApiRoute.Filename}/${
                data.image
              }`
            : ""
        }
      />
      <Audio
        src={
          data
            ? `${BASE_URL}${ApiRoute.Meditations + ApiRoute.Filename}/${
                data.audio
              }`
            : ""
        }
        paddingButton="20px"
      />
      {data?.textLines &&
        data?.textLines.map((line, index) => (
          <TextLineContainer
            key={index}
            onClick={() => changeTimeAudio(line.timeAt)}
          >
            <TextLine $isActive={getIsActiveInput(index)}>{line.text}</TextLine>
            <TimeContainer>
              <TextTime $isActive={getIsActiveInput(index)}>
                От:&nbsp;{line.timeAt}
              </TextTime>
              <TextTime $isActive={getIsActiveInput(index)}>
                До:&nbsp;{line.timeTo}
              </TextTime>
            </TimeContainer>
          </TextLineContainer>
        ))}
    </Container>
  );
}

const Container = styled.div`
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const Text = styled.p`
  ${FontSizeStandard}
  color: ${Color.TextStandard};
`;

const Image = styled.img`
  box-sizing: border-box;
  aspect-ratio: 1 / 1;
  width: 100%;
  object-fit: cover;
  border-radius: 25px;
  border: 5px dashed ${Color.Primary};
`;

const TextLineContainer = styled.div`
  cursor: pointer;
  align-self: flex-start;
  width: 100%;
  gap: 10px;
`;

const TextLine = styled.p<{ $isActive?: boolean }>`
  ${FontSizeStandard}
  font-size: 24px;
  width: 100%;
  color: ${Color.TextStandard};
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0.6)};

  @media (max-width: 550px) {
    font-size: 20px;
  }
`;

const TimeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const TextTime = styled.p<{ $isActive?: boolean }>`
  ${FontSizeStandard}
  color: ${Color.TextStandard};
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0.6)};
`;
