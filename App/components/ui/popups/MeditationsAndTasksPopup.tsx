import styled from "styled-components/native";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { Pressable, ScrollView } from "react-native";
import { RadioButton } from "../inputs/RadioButton";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useEffect, useState } from "react";
import { getTasks } from "../../../store/tasksSelectors";
import { normalize } from "../../../utils";
import { getMeditations } from "../../../store/meditationsSelectors";
import {
  useLazyGetMeditationsQuery,
  useLazyGetTasksQuery,
} from "../../../api/api";
import deepEqual from "deep-equal";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useFileSystem } from "../../../hooks/useFileSystem";
import {
  deleteDataMeditationsCopy,
  deleteMeditationsInMeditation,
  setMeditations,
} from "../../../store/meditationsSlice";
import {
  deleteDataTasksCopy,
  deleteTasksInTask,
  setTasks,
} from "../../../store/tasksSlice";
import { getIsOffline } from "../../../store/offlineSelectors";
import { Color, NameFolder } from "../../../const";

type MeditationsAndTasksPopupProps = {
  nameNote: string;
  setNameNote: (
    nameNote: string,
    backgroundColors: string,
    underlayColor: string,
    colors: string
  ) => void;
};

export function MeditationsAndTasksPopup(props: MeditationsAndTasksPopupProps) {
  const { nameNote, setNameNote } = props;
  const meditations = useAppSelector(getMeditations);
  const tasks = useAppSelector(getTasks);
  const isOffline = useAppSelector(getIsOffline);
  const dispatch = useAppDispatch();
  const [isSelectMeditations, setIsSelectMeditations] = useState(false);
  const [isSelectTasks, setIsSelectTasks] = useState(false);
  const [meditationsState, setMeditationsState] = useState(meditations);
  const [tasksState, setTasksState] = useState(tasks);
  const [getMeditationsQuery] = useLazyGetMeditationsQuery();
  const [getTasksQuery] = useLazyGetTasksQuery();
  const { deleteFile } = useFileSystem();

  const loadingData = async () => {
    const { data: dataMeditations } = await getMeditationsQuery();

    if (dataMeditations) {
      if (!deepEqual(meditations, dataMeditations)) {
        const MeditationsForDeleting = meditations.filter(
          (oldMeditation) =>
            !dataMeditations.some(
              (newMeditation) => oldMeditation._id === newMeditation._id
            )
        );
        for (const meditation of MeditationsForDeleting) {
          await deleteFile(NameFolder.Meditations + `/${meditation._id}`);
          dispatch(deleteDataMeditationsCopy(meditation));
          dispatch(deleteMeditationsInMeditation(meditation));
        }
        dispatch(setMeditations(dataMeditations));
      }
    }

    const { data: dataTasks } = await getTasksQuery();

    if (dataTasks) {
      if (!deepEqual(tasks, dataTasks)) {
        const TasksForDeleting = tasks.filter(
          (oldTask) => !dataTasks.some((newTask) => oldTask._id === newTask._id)
        );
        for (const task of TasksForDeleting) {
          await deleteFile(NameFolder.Tasks + `/${task._id}`);
          dispatch(deleteDataTasksCopy(task));
          dispatch(deleteTasksInTask(task));
        }
        dispatch(setTasks(dataTasks));
      }
    }
  };

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

  useEffect(() => {
    if (!isOffline) {
      loadingData();
    }
  }, []);

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
                isSelectMeditations ? Color.MeditationPressed : Color.Meditation
              }
            >
              <TextFilter $color={Color.TextWhite}>Медитации</TextFilter>
            </FilterButton>
          </PressableButton>
          <PressableButton onPress={() => setIsSelectTasks(!isSelectTasks)}>
            <FilterButton
              $backgroundColor={isSelectTasks ? Color.TaskPressed : Color.Task}
            >
              <TextFilter $color={Color.TextStandard}>Задания</TextFilter>
            </FilterButton>
          </PressableButton>
        </FilterContainer>
        <ScrollView showsVerticalScrollIndicator={false}>
          <MeditationsAndTasksContainer>
            {meditationsState.map((meditation) => (
              <Pressable
                key={`meditation-${meditation._id}`}
                onPress={() =>
                  nameNote.split(": ")[1] === meditation.title
                    ? () => {}
                    : setNameNote(
                        `Медитация: ${meditation.title}`,
                        Color.Meditation,
                        Color.MeditationPressed,
                        Color.TextWhite
                      )
                }
              >
                <RadioButton
                  color={Color.Meditation}
                  text={meditation.title}
                  isActive={nameNote.split(": ")[1] === meditation.title}
                />
              </Pressable>
            ))}
            {tasksState.map((task) => (
              <Pressable
                key={`task-${task._id}`}
                onPress={() =>
                  nameNote.split(": ")[1] === task.title
                    ? () => {}
                    : setNameNote(
                        `Задание: ${task.title}`,
                        Color.Task,
                        Color.TaskPressed,
                        Color.TextStandard
                      )
                }
              >
                <RadioButton
                  color={Color.Task}
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
  padding: ${normalize(20)}px;
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.backgroundColor.main};
  border-radius: ${normalize(20)}px;
`;

const FilterContainer = styled.View`
  flex-direction: row;
  gap: ${normalize(10)}px;
  flex-wrap: wrap;
`;

const MeditationsAndTasksContainer = styled.View`
  gap: 10px;
`;

const PressableButton = styled.Pressable`
  height: ${normalize(50)}px;
  width: 47%;
`;

const FilterButton = styled.View<{
  $backgroundColor: string;
}>`
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: ${normalize(5)}px;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  border-radius: ${normalize(20)}px;
`;

const TextFilter = styled.Text<{ $color: string }>`
  font-family: "Poppins-Medium";
  font-size: ${normalize(14)}px;
  line-height: ${normalize(18)}px;
  color: ${({ $color }) => $color};
`;
