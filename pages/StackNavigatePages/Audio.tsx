import { Pressable } from "react-native";
import { GlobalScreen } from "../../components/GlobalScreen";
import { CenterContainer } from "../../components/CenterContainer";
import { styled } from "styled-components/native";
import { TextIcon } from "../../components/icons/TextIcon";
import { PlayerImages } from "../../components/icons/PlayerImage";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MeditationScreenProp, MeditationData } from "../../types";
import { LikeIcon } from "../../components/icons/LikeIcon";
import { AudioPlayer } from "../../components/ui/AudioPlayer";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
} from "react-native-track-player";
import { init } from "../../store/trackPlayerSlice";
import { MEDITATIONS_DATA } from "../../const";
import { useEffect, useState } from "react";
import { addLike, removeLike } from "../../store/likesSlice";
import { TopWithBack } from "../../components/ui/TopWithBack";

export function Audio() {
  const navigation = useNavigation<MeditationScreenProp>();
  const route = useRoute();
  const { meditation } = route.params as { meditation: MeditationData };
  const [isActive, setIsActive] = useState(false);
  const isInitialized = useAppSelector(
    (state) => state.trackPlayer.isInitialized
  );
  const likes = useAppSelector((state) => state.likes.likes);
  const dispatch = useAppDispatch();

  const toggleLike = () => {
    if (isActive) {
      dispatch(removeLike(meditation.id));
    } else {
      dispatch(addLike(meditation.id));
    }
  };

  const setup = async () => {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior:
          AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.Stop,
        // Capability.Like,
        // Capability.Dislike,
        // Capability.Like,
      ],
    });
    // await TrackPlayer.add(MEDITATIONS_DATA);
    dispatch(init(true));
  };

  useEffect(() => {
    if (!isInitialized) {
      setup();
    }
  }, [isInitialized]);

  useEffect(() => {
    setIsActive(likes.some((like) => like.id === meditation.id));
  }, [likes]);

  return (
    <GlobalScreen>
      <CenterContainer>
        <TopWithBack>
          <Pressable
            onPress={() => navigation.navigate("Text", { meditation })}
          >
            <TextIcon />
          </Pressable>
        </TopWithBack>
        <PlayerImages />
        <TitleAndLikeView>
          <TextAudio>{meditation.title}</TextAudio>
          <Pressable onPress={toggleLike}>
            <LikeIcon isActive={isActive} />
          </Pressable>
        </TitleAndLikeView>
        <AudioPlayer id={meditation.id} duration={meditation.duration} />
      </CenterContainer>
    </GlobalScreen>
  );
}

const TextAudio = styled.Text`
  font-family: "Poppins-Medium";
  font-size: 18px;
  color: ${({ theme }) => theme.color.standard};
`;

const TitleAndLikeView = styled.View`
  margin-bottom: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
