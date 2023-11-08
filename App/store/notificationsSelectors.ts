import { SliceName } from '../const';
import { RootState } from '../types';

const getNotifications = (state: Pick<RootState, SliceName.Notifications>) =>
  state[SliceName.Notifications].notifications;
const getTrackerMeditationNotifications = (state: Pick<RootState, SliceName.Notifications>) =>
  state[SliceName.Notifications].trackerMeditationNotification;
const getTrackerTaskNotifications = (state: Pick<RootState, SliceName.Notifications>) =>
  state[SliceName.Notifications].trackerTaskNotification;

export { getNotifications, getTrackerMeditationNotifications, getTrackerTaskNotifications };