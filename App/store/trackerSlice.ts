import { createSlice } from "@reduxjs/toolkit";
import { Tracker } from "../types";
import { DAYS_IN_TRACKER, SliceName } from '../const';

const initialState = {
  trackersMeditation: [] as Tracker[],
  trackersTask: [] as Tracker[],
};

export const trackerSlice = createSlice({
  name: SliceName.Tracker,
  initialState,
  reducers: {
    addMeditationTracker(state, action) {
      const days = [];

      for (let i = 0; i < DAYS_IN_TRACKER; i++) {
        days.push({ value: new Date().setDate(new Date(action.payload.sinceDay).getDate() + i), isCheck: false });
      }

      state.trackersMeditation.push({ id: action.payload.id, days, title: action.payload.title });
    },
    removeMeditationTracker(state, action) {
      state.trackersMeditation = state.trackersMeditation.filter(
        (like) => like.id !== action.payload
      );
    },
    updateMeditationTracker(state, action) {
      state.trackersMeditation = state.trackersMeditation.map((tracker) => {
        if (tracker.id === action.payload.id) {
          return {
            title: tracker.title,
            id: tracker.id,
            days: tracker.days.map((day) => {
              if (day.value === action.payload.dayValue) {
                return { value: day.value, isCheck: !day.isCheck };
              }
              return day;
            })
          };
        }
        return tracker;
      });
    },
    addTaskTracker(state, action) {
      const days = [];

      for (let i = 0; i < DAYS_IN_TRACKER; i++) {
        days.push({ value: new Date().setDate(new Date(action.payload.sinceDay).getDate() + i), isCheck: false });
      }

      state.trackersTask.push({ id: action.payload.id, days, title: action.payload.title });
    },
    removeTaskTracker(state, action) {
      state.trackersTask = state.trackersTask.filter(
        (like) => like.id !== action.payload
      );
    },
    updateTaskTracker(state, action) {
      state.trackersTask = state.trackersTask.map((tracker) => {
        if (tracker.id === action.payload.id) {
          return {
            title: tracker.title,
            id: tracker.id,
            days: tracker.days.map((day) => {
              if (day.value === action.payload.dayValue) {
                return { value: day.value, isCheck: !day.isCheck };
              }
              return day;
            })
          };
        }
        return tracker;
      });
    },
    setTrackers(state, action) {
      state.trackersTask = action.payload.trackersTask;
      state.trackersMeditation = action.payload.trackersMeditation;
    },
  },
});

export const {
  addMeditationTracker,
  removeMeditationTracker,
  updateMeditationTracker,
  addTaskTracker,
  removeTaskTracker,
  updateTaskTracker,
  setTrackers,
} = trackerSlice.actions;

export default trackerSlice.reducer;