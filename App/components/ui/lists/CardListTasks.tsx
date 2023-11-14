import { styled } from "styled-components/native";
import { DataTextLottieImage, TasksScreenProp } from "../../../types";
import { TouchableHighlightCard } from "../touchables/TouchableHighlightCard";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useEffect, useCallback } from "react";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import deepEqual from "deep-equal";
import { getCountFilteredTasks, getTasks } from "../../../store/tasksSelectors";
import { useLazyGetTasksQuery } from "../../../api/api";
import {
  deleteDataTasksCopy,
  deleteTasksInTask,
  setCountTasks,
  setIsLikeTasks,
  setKindTasks,
  setSearchTasks,
  setTasks,
} from "../../../store/tasksSlice";
import { normalize } from "../../../utils";
import { useFileSystem } from "../../../hooks/useFileSystem";
import { getIsOffline } from "../../../store/offlineSelectors";
import { AppRoute, Color, ErrorMessage, NameFolder } from "../../../const";
import { useToastCustom } from "../../../hooks/useToastCustom";
import { removeTaskLike } from "../../../store/likesSlice";
import { Preloader } from "../animate-elements/Preloader";

type CardListTasksProps = {
  count: number;
};

export function CardListTasks(props: CardListTasksProps) {
  const { count } = props;
  const navigation = useNavigation<TasksScreenProp>();
  const tasks = useAppSelector(getTasks);
  const countFilteredTasks = useAppSelector(getCountFilteredTasks);
  const isOffline = useAppSelector(getIsOffline);
  const dispatch = useAppDispatch();
  const [getTasksQuery] = useLazyGetTasksQuery();
  const { deleteFile } = useFileSystem();
  const { onErrorToast } = useToastCustom();

  const seeAll = () => {
    dispatch(setCountTasks(tasks.length));
  };

  const loadingData = async () => {
    const { data } = await getTasksQuery();
    const dataCopy = JSON.parse(JSON.stringify(data)) as DataTextLottieImage[];

    if (data) {
      if (
        !deepEqual(
          tasks,
          dataCopy.sort((a, b) =>
            a.title && b.title ? a.title.localeCompare(b.title) : -1
          )
        )
      ) {
        try {
          const TasksForDeleting = tasks.filter(
            (oldTask) => !data.some((newTask) => oldTask._id === newTask._id)
          );
          for (const task of TasksForDeleting) {
            await deleteFile(NameFolder.Tasks + task._id);
            dispatch(deleteDataTasksCopy(task));
            dispatch(deleteTasksInTask(task));
            dispatch(removeTaskLike(task._id));
          }
          dispatch(setTasks(data));
        } catch {
          onErrorToast(ErrorMessage.DeleteFile);
        }
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(setCountTasks(count));

      return () => {
        dispatch(setSearchTasks(""));
        dispatch(setKindTasks("Все"));
        dispatch(setIsLikeTasks(false));
      };
    }, [])
  );

  useEffect(() => {
    if (!isOffline) {
      loadingData();
    }
  }, []);

  return (
    <>
      {!tasks.length && <Preloader />}
      <ViewContainer>
        {countFilteredTasks.map((task, index) => {
          if (
            index + 1 === count &&
            count % 3 === 0 &&
            countFilteredTasks.length <= count &&
            tasks.length > count
          ) {
            return (
              <TouchableHighlightCard isAll key={task._id} onPress={seeAll}>
                Смотреть все
              </TouchableHighlightCard>
            );
          }
          return (
            <TouchableHighlightCard
              color={Color.TextStandard}
              backgroundColor={Color.Task}
              underlayColor={Color.TaskPressed}
              key={task._id}
              onPress={() =>
                navigation.navigate(AppRoute.Task, { taskId: task._id })
              }
            >
              {task.title}
            </TouchableHighlightCard>
          );
        })}
      </ViewContainer>
    </>
  );
}

const ViewContainer = styled.View`
  margin-bottom: 30px;
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${normalize(10)}px;
`;
