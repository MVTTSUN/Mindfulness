import { createSlice } from "@reduxjs/toolkit";
import { Task } from "../types";

const initialState = {
  tasks: [] as Task[],
  tasksFiltered: [] as Task[],
  tasksSearched: [] as Task[],
  tasksLike: [] as Task[],
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
              .toLowerCase()
              .split(" ")
              .some((el) => el.match(RegExp(`^${action.payload.trim()}`, "i")))
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
