import { useFocusEffect, useRoute } from "@react-navigation/native";
import { CenterContainer } from "../../components/CenterContainer";
import { GlobalScreen } from "../../components/GlobalScreenWrapper";
import { HeaderWithBack } from "../../components/ui/headers/HeaderWithBack";
import { styled } from "styled-components/native";
import TrackPlayer, { usePlaybackState } from "react-native-track-player";
import { Pressable, ScrollView } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { normalize } from "../../utils";
import { useFrameInterval } from "../../hooks/useFrameInterval";
import { MeditationPlayer } from "../../types";
import { useToastCustom } from "../../hooks/useToastCustom";
import { ErrorMessage } from "../../const";

export function Text() {
  const [position, setPosition] = useState(0);
  const [isCurrentAudio, setIsCurrentAudio] = useState(false);
  const route = useRoute();
  const { meditation } = route.params as { meditation: MeditationPlayer };
  const playbackState = usePlaybackState();
  const { onErrorToast } = useToastCustom();
  const { startAnimating, stopAnimating } = useFrameInterval(100, async () => {
    try {
      const { position } = await TrackPlayer.getProgress();
      setPosition(position);
    } catch {
      onErrorToast(ErrorMessage.PositionTrack);
    }
  });

  const changePosition = async (time: string) => {
    try {
      await TrackPlayer.seekTo(Number(time));
    } catch {
      onErrorToast(ErrorMessage.SeekTrack);
    }
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
      onErrorToast(ErrorMessage.Player);
    }
  };

  useFocusEffect(
    useCallback(() => {
      startAnimating();

      return () => {
        stopAnimating();
      };
    }, [playbackState.state, isCurrentAudio])
  );

  useEffect(() => {
    currentAudio();
  }, []);

  return (
    <GlobalScreen withoutScrollView>
      <CenterContainer>
        <HeaderWithBack>
          <TextAudio numberOfLines={2} ellipsizeMode="tail">
            {meditation.title}
          </TextAudio>
        </HeaderWithBack>
        <ScrollView showsVerticalScrollIndicator={false}>
          {meditation.textLines?.map(({ timeTo, timeAt, text }, id) => (
            <Pressable onPress={() => changePosition(timeAt)} key={id}>
              <TextLine
                $isOpacity={
                  isCurrentAudio &&
                  Number(timeTo) >= position &&
                  Number(timeAt) < position
                }
              >
                {text}
              </TextLine>
            </Pressable>
          ))}
          <SpaceBottom />
        </ScrollView>
      </CenterContainer>
    </GlobalScreen>
  );
}

const TextAudio = styled.Text`
  width: 90%;
  text-align: right;
  font-family: "Poppins-Medium";
  font-size: ${normalize(18)}px;
  color: ${({ theme }) => theme.color.standard};
`;

const TextLine = styled.Text<{ $isOpacity: boolean }>`
  opacity: ${({ $isOpacity }) => ($isOpacity ? 1 : 0.4)};
  font-family: "Poppins-Medium";
  font-size: ${normalize(24)}px;
  line-height: ${normalize(38)}px;
  color: ${({ theme }) => theme.color.standard};
`;

const SpaceBottom = styled.View`
  height: ${normalize(300)}px;
`;
