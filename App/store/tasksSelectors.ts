import { createSelector } from '@reduxjs/toolkit';
import { SliceName } from '../const';
import { RootState } from '../types';
import { getLikesTask } from './likesSelectors';

const getTasks = (state: Pick<RootState, SliceName.Tasks>) => state[SliceName.Tasks].tasks;
const getTaskInTask = (id: string) => (state: Pick<RootState, SliceName.Tasks>) =>
  state[SliceName.Tasks].tasksInTask.filter((task) => task._id === id)[0];
const getDataTaskCopy = (id: string) => (state: Pick<RootState, SliceName.Tasks>) =>
  state[SliceName.Tasks].dataTasksCopy.filter((task) => task._id === id)[0];
const getSearchTasks = (state: Pick<RootState, SliceName.Tasks>) => state[SliceName.Tasks].searchTasks;
const getKindTasks = (state: Pick<RootState, SliceName.Tasks>) => state[SliceName.Tasks].kindTasks;
const getIsLikeTasks = (state: Pick<RootState, SliceName.Tasks>) => state[SliceName.Tasks].isLikeTasks;
const getCountTasks = (state: Pick<RootState, SliceName.Tasks>) => state[SliceName.Tasks].countTasks;
const getFilteredTasks = createSelector(
  [getTasks, getSearchTasks, getKindTasks, getIsLikeTasks, getLikesTask],
  (tasks, searchTasks, kindTasks, isLikeTasks, likesTask) => {
    return tasks.filter((task) =>
      (kindTasks === "Все"
        ? true
        : task.kind === kindTasks) &&
      (searchTasks.trim() === ""
        ? true
        : task.title && task.title
            .split(" ")
            .reverse()
            .reduce(
              (acc: string[], curr) => (
                acc.push(`${curr} ${acc}`.trim()), acc
              ),
              []
            )
            .some((el) =>
              el.match(
                RegExp(
                  `^${searchTasks
                    .trim()
                    .replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")}`,
                  "i"
                )
              )
            )) && 
      (!isLikeTasks
        ? true
        : likesTask.some(
            (like: { id: string; isLike: boolean }) => like.id === task._id
          )));
  }
);

const getCountFilteredTasks = createSelector(
  [getFilteredTasks, getCountTasks],
  (filteredTasks, countTasks) => filteredTasks.slice(0, countTasks)
);

export {
  getTasks,
  getSearchTasks,
  getIsLikeTasks,
  getKindTasks,
  getTaskInTask,
  getDataTaskCopy,
  getFilteredTasks,
  getCountFilteredTasks
};