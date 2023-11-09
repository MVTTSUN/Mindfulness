import { GlobalScreen } from "../../components/GlobalScreenWrapper";
import { Title } from "../../components/ui/titles/Title";
import { CenterContainer } from "../../components/CenterContainer";
import { Input } from "../../components/ui/inputs/Input";
import { styled } from "styled-components/native";
import { Select } from "../../components/ui/inputs/Select";
import { Color, OPTIONS_DATA_TASKS } from "../../const";
import { CardListTasks } from "../../components/ui/lists/CardListTasks";
import { LikeIcon } from "../../components/svg/icons/other-icons/LikeIcon";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from "react-native-reanimated";
import { useCallback } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useFocusEffect } from "@react-navigation/native";
import { setIsLikeTasks, setSearchTasks } from "../../store/tasksSlice";
import { normalize } from "../../utils";
import { getIsLikeTasks, getSearchTasks } from "../../store/tasksSelectors";

export function Tasks() {
  const searchTasks = useAppSelector(getSearchTasks);
  const isLikeTasks = useAppSelector(getIsLikeTasks);
  const dispatch = useAppDispatch();
  const scaleLike = useSharedValue(1);
  const likeStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleLike.value }],
  }));

  const findFavorites = () => {
    scaleLike.value = withSequence(
      withSpring(1),
      withSpring(1.2),
      withSpring(1)
    );
    if (isLikeTasks) {
      dispatch(setIsLikeTasks(false));
    } else {
      dispatch(setIsLikeTasks(true));
    }
  };

  const onChangeText = (text: string) => {
    dispatch(setSearchTasks(text));
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        dispatch(setSearchTasks(""));
      };
    }, [])
  );

  return (
    <GlobalScreen>
      <CenterContainer>
        <Title>Задания</Title>
        <SearchView>
          <Input
            value={searchTasks}
            onChangeText={onChangeText}
            width="70%"
            placeholder="Поиск"
          />
          <FavoritesButton
            onPress={findFavorites}
            underlayColor={Color.TaskPressed}
          >
            <Animated.View style={likeStyle}>
              <LikeIcon color={Color.TextStandard} isActive={isLikeTasks} />
            </Animated.View>
          </FavoritesButton>
        </SearchView>
      </CenterContainer>
      <Select optionsData={OPTIONS_DATA_TASKS} />
      <CenterContainer>
        <CardListTasks count={12} />
      </CenterContainer>
    </GlobalScreen>
  );
}

const SearchView = styled.View`
  flex-direction: row;
  gap: 5px;
  margin-bottom: 12px;
`;

const FavoritesButton = styled.TouchableHighlight`
  height: ${normalize(30)}px;
  padding: ${normalize(3)}px ${normalize(10)}px;
  background-color: ${Color.Task};
  border-radius: ${normalize(20)}px;
  transform: translateY(7px);
`;
