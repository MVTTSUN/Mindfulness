import { createSlice } from "@reduxjs/toolkit";
import { Like } from "../types";

const initialState = {
  likes: [] as Like[],
};

export const likesSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    addLike: (state, action) => {
      state.likes.push({ id: action.payload, isLike: true });
    },
    removeLike: (state, action) => {
      state.likes = state.likes.filter((like) => like.id !== action.payload);
    },
  },
});

export const { addLike, removeLike } = likesSlice.actions;

export default likesSlice.reducer;
