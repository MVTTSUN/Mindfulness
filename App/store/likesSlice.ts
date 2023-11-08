import { createSlice } from "@reduxjs/toolkit";
import { Like } from "../types";
import { SliceName } from '../const';

const initialState = {
  likesMeditation: [] as Like[],
  likesTask: [] as Like[],
};

export const likesSlice = createSlice({
  name: SliceName.Likes,
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
      state.likesTask = action.payload.likesTask;
      state.likesMeditation = action.payload.likesMeditation;
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
