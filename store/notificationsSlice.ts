import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [
    {
      id: 1,
      hours: 19,
      minutes: 0,
      enable: true,
      isOpen: false,
    },
    {
      id: 2,
      hours: 0,
      minutes: 0,
      enable: false,
      isOpen: false,
    },
    {
      id: 3,
      hours: 0,
      minutes: 0,
      enable: false,
      isOpen: false,
    },
  ],
};

export const notificationsSlice = createSlice({
  name: "notifications",
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
    setTime(state, action) {
      state.notifications = state.notifications.map((notification) => {
        if (notification.id === action.payload.id) {
          notification.hours = action.payload.hours;
          notification.minutes = action.payload.minutes;
        }
        return notification;
      });
    },
    openNotification(state, action) {
      state.notifications = state.notifications.map((notification) => {
        if (notification.id === action.payload) {
          notification.isOpen = true;
        } else {
          notification.isOpen = false;
        }
        return notification;
      });
    },
    closeNotification(state, action) {
      state.notifications = state.notifications.map((notification) => {
        if (notification.id === action.payload) {
          notification.isOpen = false;
        }
        return notification;
      });
    },
  },
});

export const {
  toggleNotification,
  setTime,
  openNotification,
  closeNotification,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
