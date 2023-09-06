import { Pressable } from "react-native";
import { GlobalScreen } from "../../components/GlobalScreen";
import { CenterContainer } from "../../components/CenterContainer";
import { styled } from "styled-components/native";
import { TextIcon } from "../../components/icons/TextIcon";
import { PlayerImages } from "../../components/icons/PlayerImage";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  MeditationScreenProp,
  MeditationData,
  NotesScreenProp,
} from "../../types";
import { LikeIcon } from "../../components/icons/LikeIcon";
import { AudioPlayer } from "../../components/ui/AudioPlayer";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useEffect, useState } from "react";
import { addLike, removeLike } from "../../store/likesSlice";
import { TopWithBack } from "../../components/ui/TopWithBack";
import { AddIcon } from "../../components/icons/AddIcon";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
} from "react-native-reanimated";

export function Audio() {
  const navigation = useNavigation<MeditationScreenProp & NotesScreenProp>();
  const route = useRoute();
  const { meditation } = route.params as { meditation: MeditationData };
  const [isActive, setIsActive] = useState(false);
  const likes = useAppSelector((state) => state.likes.likes);
  const dispatch = useAppDispatch();
  const scaleLike = useSharedValue(1);
  const likeStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleLike.value }],
  }));

  const toggleLike = () => {
    scaleLike.value = withSequence(
      withSpring(1),
      withSpring(1.2),
      withSpring(1)
    );
    if (isActive) {
      dispatch(removeLike(meditation.id));
    } else {
      dispatch(addLike(meditation.id));
    }
  };

  useEffect(() => {
    setIsActive(likes.some((like) => like.id === meditation.id));
  }, [likes]);

  return (
    <>
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
              <Animated.View
                style={[{ backgroundColor: "transparent" }, likeStyle]}
              >
                <LikeIcon isActive={isActive} />
              </Animated.View>
            </Pressable>
          </TitleAndLikeView>
          <AudioPlayer id={meditation.id} duration={meditation.duration} />
        </CenterContainer>
      </GlobalScreen>
      <PressableStyled
        onPress={() =>
          navigation.navigate("NotesStack", {
            screen: "Notes",
            params: { screen: "Note", meditation },
          })
        }
      >
        <ViewPlus>
          <AddIcon />
        </ViewPlus>
      </PressableStyled>
    </>
  );
}

const PressableStyled = styled.Pressable`
  position: absolute;
  right: 40px;
  bottom: 100px;
`;

const ViewPlus = styled.View`
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: #313131;
`;

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
