import { createSlice } from "@reduxjs/toolkit";
import { TaskType } from "../types";
import { TASKS } from "../const";

const initialState = {
  tasks: TASKS as TaskType[],
  tasksFiltered: TASKS as TaskType[],
  tasksSearched: TASKS as TaskType[],
  tasksLike: TASKS as TaskType[],
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    filterTasks(state, action) {
      action.payload === "Всё"
        ? (state.tasksFiltered = state.tasks)
        : (state.tasksFiltered = state.tasks.filter(
            (task) => task.kind === action.payload
          ));
    },
    searchTasks(state, action) {
      action.payload.trim() === ""
        ? (state.tasksSearched = state.tasks)
        : (state.tasksSearched = state.tasks.filter((task) =>
            task.title
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
                    `^${action.payload
                      .trim()
                      .replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")}`,
                    "i"
                  )
                )
              )
          ));
    },
    likeTasks(state, action) {
      action.payload === null
        ? (state.tasksLike = state.tasks)
        : (state.tasksLike = state.tasks.filter((task) =>
            action.payload.some(
              (like: { id: number; isLike: boolean }) => like.id === task.id
            )
          ));
    },
  },
});

export const { filterTasks, searchTasks, likeTasks } = tasksSlice.actions;

export default tasksSlice.reducer;