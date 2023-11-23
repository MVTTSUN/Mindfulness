import { createSlice } from "@reduxjs/toolkit";
import { DataTextLottieImage } from "../types";
import { SliceName } from "../const";

const initialState = {
  tasks: [] as DataTextLottieImage[],
  tasksInTask: [] as DataTextLottieImage[],
  dataTasksCopy: [] as DataTextLottieImage[],
  randomOrSortTasks: [] as DataTextLottieImage[],
  searchTasks: "",
  kindTasks: "Все",
  isLikeTasks: false,
  countTasks: 0,
};

export const tasksSlice = createSlice({
  name: SliceName.Tasks,
  initialState,
  reducers: {
    setTasks(state, action) {
      const tasks = JSON.parse(JSON.stringify(action.payload)) as DataTextLottieImage[];

      state.tasks = tasks.sort((a, b) => a.title && b.title ? a.title.localeCompare(b.title) : -1);
    },
    setTasksInTask(state, action) {
      if (state.tasksInTask.some((task) => task._id === action.payload._id)) {
        state.tasksInTask = state.tasksInTask.map((task) => {
          if (task._id === action.payload._id) {
            return action.payload;
          }
          return task;
        });
      } else {
        state.tasksInTask.push(action.payload);
      }
    },
    setDataTasksCopy (state, action) {
      if (state.dataTasksCopy.some((task) => task._id === action.payload._id)) {
        state.dataTasksCopy = state.dataTasksCopy.map((task) => {
          if (task._id === action.payload._id) {
            return action.payload;
          }
          return task;
        });
      } else {
        state.dataTasksCopy.push(action.payload);
      }
    },
    deleteTasksInTask(state, action) {
      state.tasksInTask = state.tasksInTask.filter((task) => task._id !== action.payload._id);
    },
    deleteDataTasksCopy(state, action) {
      state.dataTasksCopy = state.dataTasksCopy.filter((task) => task._id !== action.payload._id);
    },
    setSearchTasks(state, action) {
      state.searchTasks = action.payload;
    },
    setKindTasks(state, action) {
      state.kindTasks = action.payload;
    },
    setIsLikeTasks(state, action) {
      state.isLikeTasks = action.payload;
    },
    setCountTasks(state, action) {
      state.countTasks = action.payload;
    },
    setToggleRandomOrSortTasks(state, action) {
      const tasks = JSON.parse(JSON.stringify(state.tasks)) as DataTextLottieImage[];

      if (action.payload === "random") {
        state.randomOrSortTasks = tasks.sort(() => Math.random() - 0.5);
      } else if (action.payload === "sort") {
        state.randomOrSortTasks = tasks.sort((a, b) => a.title && b.title ? a.title.localeCompare(b.title) : -1);
      }
    }
  },
});

export const {
  setTasks,
  setTasksInTask,
  setSearchTasks,
  deleteTasksInTask,
  setKindTasks,
  setIsLikeTasks,
  setCountTasks,
  setDataTasksCopy,
  deleteDataTasksCopy,
  setToggleRandomOrSortTasks,
} = tasksSlice.actions;

export default tasksSlice.reducer;
