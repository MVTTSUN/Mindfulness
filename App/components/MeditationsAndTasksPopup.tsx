import styled from "styled-components/native";
import { useAppSelector } from "../hooks/useAppSelector";
import { Pressable, ScrollView } from "react-native";
import { COLORS } from "../const";
import { RadioButton } from "./ui/RadioButton";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useEffect, useState } from "react";

type MeditationsAndTasksPopupProps = {
  nameNote: string;
  setNameNote: (
    nameNote: string,
    backgroundColors: string,
    underlayColor: string,
    colors: string
  ) => void;
};

export function MeditationsAndTasksPopup({
  nameNote,
  setNameNote,
}: MeditationsAndTasksPopupProps) {
  const meditations = useAppSelector((state) => state.meditations.meditations);
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const [isSelectMeditations, setIsSelectMeditations] = useState(false);
  const [isSelectTasks, setIsSelectTasks] = useState(false);
  const [meditationsState, setMeditationsState] = useState(meditations);
  const [tasksState, setTasksState] = useState(tasks);

  useEffect(() => {
    if (isSelectMeditations && !isSelectTasks) {
      setTasksState([]);
    }

    if (isSelectTasks && !isSelectMeditations) {
      setMeditationsState([]);
    }

    if (
      (isSelectMeditations && isSelectTasks) ||
      (!isSelectTasks && !isSelectMeditations)
    ) {
      setMeditationsState(meditations);
      setTasksState(tasks);
    }
  }, [isSelectMeditations, isSelectTasks]);

  return (
    <Animated.View
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(200)}
    >
      <Container>
        <FilterContainer>
          <PressableButton
            onPress={() => setIsSelectMeditations(!isSelectMeditations)}
          >
            <FilterButton
              $backgroundColor={
                isSelectMeditations
                  ? COLORS.backgroundColors.meditationCardPressed
                  : COLORS.backgroundColors.meditationCard
              }
            >
              <TextFilter $color={COLORS.textColors.meditationCard}>
                Медитации
              </TextFilter>
            </FilterButton>
          </PressableButton>
          <PressableButton onPress={() => setIsSelectTasks(!isSelectTasks)}>
            <FilterButton
              $backgroundColor={
                isSelectTasks
                  ? COLORS.backgroundColors.taskCardPressed
                  : COLORS.backgroundColors.taskCard
              }
            >
              <TextFilter $color={COLORS.textColors.taskCard}>
                Задания
              </TextFilter>
            </FilterButton>
          </PressableButton>
        </FilterContainer>
        <ScrollView showsVerticalScrollIndicator={false}>
          <MeditationsAndTasksContainer>
            {meditationsState.map((meditation) => (
              <Pressable
                key={`meditation-${meditation.id}`}
                onPress={() =>
                  nameNote.split(": ")[1] === meditation.title
                    ? () => {}
                    : setNameNote(
                        `Медитация: ${meditation.title}`,
                        COLORS.backgroundColors.meditationCard,
                        COLORS.backgroundColors.meditationCardPressed,
                        COLORS.textColors.meditationCard
                      )
                }
              >
                <RadioButton
                  color={COLORS.backgroundColors.meditationCard}
                  text={meditation.title}
                  isActive={nameNote.split(": ")[1] === meditation.title}
                />
              </Pressable>
            ))}
            {tasksState.map((task) => (
              <Pressable
                key={`task-${task.id}`}
                onPress={() =>
                  nameNote.split(": ")[1] === task.title
                    ? () => {}
                    : setNameNote(
                        `Задание: ${task.title}`,
                        COLORS.backgroundColors.taskCard,
                        COLORS.backgroundColors.taskCardPressed,
                        COLORS.textColors.taskCard
                      )
                }
              >
                <RadioButton
                  color={COLORS.backgroundColors.taskCard}
                  text={task.title}
                  isActive={nameNote.split(": ")[1] === task.title}
                />
              </Pressable>
            ))}
          </MeditationsAndTasksContainer>
        </ScrollView>
      </Container>
    </Animated.View>
  );
}

const Container = styled.View`
  gap: 20px;
  padding: 20px;
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.backgroundColor.main};
  border-radius: 20px;
`;

const FilterContainer = styled.View`
  flex-direction: row;
  gap: 10px;
  flex-wrap: wrap;
`;

const MeditationsAndTasksContainer = styled.View`
  gap: 10px;
`;

const PressableButton = styled.Pressable`
  height: 50px;
  width: 47%;
`;

const FilterButton = styled.View<{
  $backgroundColor: string;
}>`
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: 5px;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  border-radius: 20px;
`;

const TextFilter = styled.Text<{ $color: string }>`
  font-family: "Poppins-Medium";
  font-size: 14px;
  line-height: 18px;
  color: ${({ $color }) => $color};
`;
