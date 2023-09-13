import { styled } from "styled-components/native";
import { TasksScreenProp } from "../../types";
import { TouchableHighlightCard } from "./Touchables/TouchableHighlightCard";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useState, useEffect, useCallback } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { filterTasks, likeTasks } from "../../store/tasksSlice";
import { COLORS } from "../../const";
import deepEqual = require("deep-equal");

type CardListTasksProps = {
  count: number;
};

export function CardListTasks({ count }: CardListTasksProps) {
  const tasksFiltered = useAppSelector((state) => state.tasks.tasksFiltered);
  const tasksSearched = useAppSelector((state) => state.tasks.tasksSearched);
  const tasksLike = useAppSelector((state) => state.tasks.tasksLike);
  const [tasks, setTasks] = useState(tasksFiltered.slice(0, count));
  const navigation = useNavigation<TasksScreenProp>();
  const dispatch = useAppDispatch();

  const seeAll = () => {
    setTasks(tasksFiltered);
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        dispatch(filterTasks("Всё"));
        dispatch(likeTasks(null));
        setTasks(tasksFiltered.slice(0, count));
      };
    }, [])
  );

  useEffect(() => {
    setTasks(
      tasksFiltered
        .filter((task) =>
          tasksSearched.some((taskSearched) => deepEqual(task, taskSearched))
        )
        .filter((task) =>
          tasksLike.some((taskLike) => deepEqual(task, taskLike))
        )
        .slice(0, count)
    );
  }, [tasksFiltered, tasksSearched, tasksLike]);

  return (
    <ViewContainer>
      {tasks.map((task, index) => {
        if (index + 1 === count && count % 3 === 0 && tasks !== tasksFiltered) {
          return (
            <TouchableHighlightCard isAll key={task.id} onPress={seeAll}>
              Смотреть все
            </TouchableHighlightCard>
          );
        }
        return (
          <TouchableHighlightCard
            color={COLORS.textColors.taskCard}
            backgroundColor={COLORS.backgroundColors.taskCard}
            underlayColor={COLORS.backgroundColors.taskCardPressed}
            key={task.id}
            onPress={() => navigation.navigate("Task", { task })}
          >
            {task.title}
          </TouchableHighlightCard>
        );
      })}
    </ViewContainer>
  );
}

const ViewContainer = styled.View`
  margin-bottom: 30px;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
`;
