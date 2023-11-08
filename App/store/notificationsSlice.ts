import { createSlice } from "@reduxjs/toolkit";
import { NOTIFICATIONS, NOTIFICATION_MEDITATION, NOTIFICATION_TASK, SliceName } from '../const';

const initialState = {
  notifications: NOTIFICATIONS,
  trackerMeditationNotification: NOTIFICATION_MEDITATION,
  trackerTaskNotification: NOTIFICATION_TASK,
};

export const notificationsSlice = createSlice({
  name: SliceName.Notifications,
  initialState,
  reducers: {
    toggleNotification(state, action) {
      state.notifications = state.notifications.map((notification) => {
        if (notification.id === action.payload) {
          notification.enable = !notification.enable;
        }
        return notification;
      });
    },
    toggleTrackerMeditationNotification(state) {
      state.trackerMeditationNotification.enable = !state.trackerMeditationNotification.enable;
    },
    toggleTrackerTaskNotification(state) {
      state.trackerTaskNotification.enable = !state.trackerTaskNotification.enable;
    },
    setTime(state, action) {
      state.notifications = state.notifications.map((notification) => {
        if (notification.id === action.payload.id) {
          notification.hours = action.payload.hours;
          notification.minutes = action.payload.minutes;
        }
        return notification;
      });
    },
    setTimeTrackerMeditationNotification(state, action) {
      state.trackerMeditationNotification.hours = action.payload.hours;
      state.trackerMeditationNotification.minutes = action.payload.minutes;
    },
    setTimeTrackerTaskNotification(state, action) {
      state.trackerTaskNotification.hours = action.payload.hours;
      state.trackerTaskNotification.minutes = action.payload.minutes;
    },
    openNotification(state, action) {
      state.trackerTaskNotification.isOpen = false;
      state.trackerMeditationNotification.isOpen = false;
      state.notifications = state.notifications.map((notification) => {
        if (notification.id === action.payload) {
          notification.isOpen = true;
        } else {
          notification.isOpen = false;
        }
        return notification;
      });
    },
    openTrackerMeditationNotification(state) {
      state.notifications = state.notifications.map((notification) => {
        notification.isOpen = false;

        return notification;
      });
      state.trackerTaskNotification.isOpen = false;
      state.trackerMeditationNotification.isOpen = true;
    },
    openTrackerTaskNotification(state) {
      state.notifications = state.notifications.map((notification) => {
        notification.isOpen = false;
        
        return notification;
      });
      state.trackerMeditationNotification.isOpen = false;
      state.trackerTaskNotification.isOpen = true;
    },
    closeNotification(state, action) {
      state.notifications = state.notifications.map((notification) => {
        if (notification.id === action.payload) {
          notification.isOpen = false;
        }
        return notification;
      });
    },
    closeTrackerMeditationNotification(state) {
      state.trackerMeditationNotification.isOpen = false;
    },
    closeTrackerTaskNotification(state) {
      state.trackerTaskNotification.isOpen = false;
    }
  },
});

export const {
  toggleNotification,
  toggleTrackerMeditationNotification,
  toggleTrackerTaskNotification,
  setTime,
  setTimeTrackerMeditationNotification,
  setTimeTrackerTaskNotification,
  openNotification,
  openTrackerMeditationNotification,
  openTrackerTaskNotification,
  closeTrackerMeditationNotification,
  closeTrackerTaskNotification,
  closeNotification,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
