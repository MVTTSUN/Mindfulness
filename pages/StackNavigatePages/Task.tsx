import { GlobalScreen } from "../../components/GlobalScreen";
import { CenterContainer } from "../../components/CenterContainer";
import { TopWithBack } from "../../components/ui/TopWithBack";
import { styled } from "styled-components/native";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NotesScreenProp, TaskType, TasksScreenProp } from "../../types";
import { Pressable, ScrollView } from "react-native";
import { AddIcon } from "../../components/icons/AddIcon";
import LottieView from "lottie-react-native";
import { COLORS } from "../../const";
import { useCallback, useEffect, useState } from "react";
import { LikeIcon } from "../../components/icons/LikeIcon";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from "react-native-reanimated";
import { addTaskLike, removeTaskLike } from "../../store/likesSlice";

export function Task() {
  const route = useRoute();
  const { task } = route.params as { task: TaskType };
  const navigation = useNavigation<NotesScreenProp & TasksScreenProp>();
  const likes = useAppSelector((state) => state.likes.likesTask);
  const dispatch = useAppDispatch();
  const scaleLike = useSharedValue(1);
  const likeStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleLike.value }],
  }));
  const [isActive, setIsActive] = useState(false);
  const theme = useAppSelector((state) => state.theme.value);

  const toggleLike = () => {
    scaleLike.value = withSequence(
      withSpring(1),
      withSpring(1.2),
      withSpring(1)
    );
    if (isActive) {
      dispatch(removeTaskLike(task.id));
    } else {
      dispatch(addTaskLike(task.id));
    }
  };
  console.log(1);

  useEffect(() => {
    setIsActive(likes.some((like) => like.id === task.id));
  }, [likes]);

  return (
    <>
      <GlobalScreen withoutScrollView>
        <CenterContainer>
          <TopWithBack>
            <TextTitle>{task.title}</TextTitle>
            <Pressable onPress={toggleLike}>
              <Animated.View
                style={[{ backgroundColor: "transparent" }, likeStyle]}
              >
                <LikeIcon
                  color={theme === "light" ? "#313131" : "#edecf5"}
                  isActive={isActive}
                />
              </Animated.View>
            </Pressable>
          </TopWithBack>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Container>
              {task.content.map((node, index) => {
                if (node.type === "text") {
                  return <TextNode key={index}>{node.payload}</TextNode>;
                } else if (node.type === "image") {
                  return (
                    <ImageWrapper key={index}>
                      <ImageNode source={node.payload} />
                    </ImageWrapper>
                  );
                } else if (node.type === "lottie") {
                  return (
                    <LottieWrapper key={index}>
                      <LottieNode
                        source={node.payload}
                        autoPlay
                        loop
                        resizeMode="cover"
                      />
                    </LottieWrapper>
                  );
                }
              })}
            </Container>
          </ScrollView>
        </CenterContainer>
      </GlobalScreen>
      <PressableStyled
        onPress={() =>
          navigation.navigate("NotesStack", {
            screen: "Notes",
            params: { screen: "Note", task },
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

const TextTitle = styled.Text`
  font-family: "Poppins-Medium";
  font-size: 18px;
  color: ${({ theme }) => theme.color.standard};
`;

const Container = styled.View`
  gap: 20px;
  margin-bottom: 270px;
`;

const LottieWrapper = styled.View`
  overflow: hidden;
  height: 250px;
  width: 100%;
  border-radius: 25px;
  border: 7px dotted ${COLORS.backgroundColors.taskCard};
`;

const LottieNode = styled(LottieView)`
  flex: 1;
`;

const TextNode = styled.Text`
  text-align: justify;
  font-family: "Poppins-Regular";
  font-size: 18px;
  line-height: 24px;
  color: ${({ theme }) => theme.color.standard};
`;

const ImageWrapper = styled.View`
  height: 250px;
  width: 100%;
  border-radius: 25px;
  border: 7px dotted ${COLORS.backgroundColors.taskCard};
  overflow: hidden;
`;

const ImageNode = styled.Image`
  width: 100%;
  flex: 1;
`;
