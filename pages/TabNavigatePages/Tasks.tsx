import { GlobalScreen } from "../../components/GlobalScreen";
import { Title } from "../../components/ui/Titles/Title";
import { CenterContainer } from "../../components/CenterContainer";
import { Input } from "../../components/ui/Input";
import { styled } from "styled-components/native";
import { Select } from "../../components/ui/Select";
import { COLORS, OPTIONS_DATA } from "../../const";
import { CardListTasks } from "../../components/ui/CardListTasks";
import { LikeIcon } from "../../components/icons/LikeIcon";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from "react-native-reanimated";
import { useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { likeTasks, searchTasks } from "../../store/tasksSlice";
import { Pressable } from 'react-native';

export function Tasks() {
  const [isActive, setIsActive] = useState(false);
  const scaleLike = useSharedValue(1);
  const dispatch = useAppDispatch();
  const likes = useAppSelector((state) => state.likes.likesTask);
  const likeStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleLike.value }],
  }));

  const findFavorites = () => {
    scaleLike.value = withSequence(
      withSpring(1),
      withSpring(1.2),
      withSpring(1)
    );
    if (isActive) {
      dispatch(likeTasks(null));
    } else {
      dispatch(likeTasks(likes));
    }
    setIsActive(!isActive);
  };

  return (
    <GlobalScreen>
      <CenterContainer>
        <Title>Задания</Title>
        <SearchView>
          <Input
            onChangeText={(text) => dispatch(searchTasks(text))}
            width="70%"
            placeholder="Поиск"
          />
          <FavoritesButton
            onPress={findFavorites}
            underlayColor={COLORS.backgroundColors.taskCardPressed}
          >
            <Animated.View style={likeStyle}>
              <LikeIcon
                color={COLORS.textColors.taskCard}
                isActive={isActive}
              />
            </Animated.View>
          </FavoritesButton>
        </SearchView>
      </CenterContainer>
      <Select optionsData={OPTIONS_DATA} />
      <CenterContainer>
        <CardListTasks count={12} />
      </CenterContainer>
    </GlobalScreen>
  );
}

const SearchView = styled.View`
  flex-direction: row;
  gap: 5px;
`;

const FavoritesButton = styled.TouchableHighlight`
  height: 30px;
  padding: 3px 10px;
  background-color: ${COLORS.backgroundColors.taskCard};
  border-radius: 20px;
  transform: translateY(7px);
`;
