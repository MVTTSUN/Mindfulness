import { useRoute } from "@react-navigation/native";
import { CenterContainer } from "../../components/CenterContainer";
import { GlobalScreen } from "../../components/GlobalScreen";
import { TopWithBack } from "../../components/ui/TopWithBack";
import { MeditationData } from "../../types";
import { styled } from "styled-components/native";
import TrackPlayer from "react-native-track-player";
import { Pressable, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { init } from "../../store/trackPlayerSlice";

export function Text() {
  const route = useRoute();
  const { meditation } = route.params as { meditation: MeditationData };
  const [position, setPosition] = useState(0);
  const [isCurrentAudio, setIsCurrentAudio] = useState(false);
  const dispatch = useAppDispatch();

  const changePosition = async (time: number) => {
    await TrackPlayer.seekTo(time);
  };

  const currentAudio = async () => {
    try {
      const currentAudio = await TrackPlayer.getTrack(0);
      if (currentAudio?.id === meditation.id) {
        setIsCurrentAudio(true);
      } else {
        setIsCurrentAudio(false);
      }
    } catch {
      dispatch(init(false));
    }
  };

  useEffect(() => {
    currentAudio();

    const positionInterval = setInterval(async () => {
      const asyncPosition = await TrackPlayer.getPosition();
      setPosition(asyncPosition);
    }, 100);

    return () => {
      clearInterval(positionInterval);
    };
  }, []);

  return (
    <GlobalScreen withoutScrollView>
      <CenterContainer>
        <TopWithBack>
          <TextAudio>{meditation.title}</TextAudio>
        </TopWithBack>
        <ScrollView showsVerticalScrollIndicator={false}>
          {meditation.textLines.map(({ timeTo, timeAt, text }, id) => (
            <Pressable onPress={() => changePosition(timeAt)} key={id}>
              <TextLine
                $isOpacity={
                  isCurrentAudio && timeTo >= position && timeAt < position
                }
              >
                {text}
              </TextLine>
            </Pressable>
          ))}
        </ScrollView>
      </CenterContainer>
    </GlobalScreen>
  );
}

const TextAudio = styled.Text`
  font-family: "Poppins-Medium";
  font-size: 18px;
  color: ${({ theme }) => theme.color.standard};
`;

const TextLine = styled.Text<{ $isOpacity: boolean }>`
  opacity: ${({ $isOpacity }) => ($isOpacity ? 1 : 0.4)};
  font-family: "Poppins-Medium";
  font-size: 24px;
  color: ${({ theme }) => theme.color.standard};
`;
