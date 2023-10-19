import { createSlice } from "@reduxjs/toolkit";
import { Slice } from "../const";

const initialState = {
  year: new Date().getFullYear() as number,
  type: null as "meditations" | "tasks" | null,
  title: "",
  month: "Все",
};

export const statisticsSlice = createSlice({
  name: Slice.Statistics,
  initialState,
  reducers: {
    setYear: (state, action) => {
      state.year = action.payload;
    },
    setType: (state, action) => {
      if (action.payload === "all") {
        state.type = null;
      } else {
        state.type = action.payload;
      }
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setMonth: (state, action) => {
      state.month = action.payload;
    },
    resetYear: (state) => {
      state.year = new Date().getFullYear();
    },
    resetType: (state) => {
      state.type = null;
    },
    resetTitle: (state) => {
      state.title = "";
    },
    resetMonth: (state) => {
      state.month = "Все";
    },
  },
});

export const {
  setYear,
  setType,
  resetYear,
  resetType,
  setTitle,
  resetTitle,
  setMonth,
  resetMonth,
} = statisticsSlice.actions;

export default statisticsSlice.reducer;
