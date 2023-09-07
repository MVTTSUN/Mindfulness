import { createSlice } from "@reduxjs/toolkit";
import { Like } from "../types";

const initialState = {
  likesMeditation: [] as Like[],
  likesTask: [] as Like[],
};

export const likesSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    addMeditationLike(state, action) {
      state.likesMeditation.push({ id: action.payload, isLike: true });
    },
    removeMeditationLike(state, action) {
      state.likesMeditation = state.likesMeditation.filter(
        (like) => like.id !== action.payload
      );
    },
    addTaskLike(state, action) {
      state.likesTask.push({ id: action.payload, isLike: true });
    },
    removeTaskLike(state, action) {
      state.likesTask = state.likesTask.filter(
        (like) => like.id !== action.payload
      );
    },
    setLikes(state, action) {
      state.likesMeditation = action.payload;
    },
  },
});

export const {
  addMeditationLike,
  removeMeditationLike,
  addTaskLike,
  removeTaskLike,
  setLikes,
} = likesSlice.actions;

export default likesSlice.reducer;
