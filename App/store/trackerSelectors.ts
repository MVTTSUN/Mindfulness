import { createSelector } from '@reduxjs/toolkit';
import { SliceName } from '../const';
import { RootState } from '../types';
import { getTrackerMeditationNotifications, getTrackerTaskNotifications } from './notificationsSelectors';

const getTrackersTask = (state: Pick<RootState, SliceName.Tracker>) => state[SliceName.Tracker].trackersTask;
const getTrackerTask = (id: string) => (state: Pick<RootState, SliceName.Tracker>) =>
  state[SliceName.Tracker].trackersTask.filter((task) => task.id === id)[0];
const getTrackersMeditation = (state: Pick<RootState, SliceName.Tracker>) => state[SliceName.Tracker].trackersMeditation;
const getTrackerMeditation = (id: string) => (state: Pick<RootState, SliceName.Tracker>) =>
  state[SliceName.Tracker].trackersMeditation.filter((meditation) => meditation.id === id)[0];
const getAllTrackers = (state: Pick<RootState, SliceName.Tracker>) => state[SliceName.Tracker];
const getDaysInShouldNotificationMeditation = createSelector(
  [getTrackersMeditation, getTrackerMeditationNotifications],
  (trackersMeditation) => {
  const meditationsDays = trackersMeditation.reduce((accMeditation, meditation) => {
    const days = meditation.days.reduce((accDays, day) => {
      if (!day.isCheck && (new Date(day.value).setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0))) {
        return accDays.concat([day.value])
      } else return accDays;
    }, [] as number[]);

    return accMeditation.concat(days);
  }, [] as number[]);

  return Array.from(new Set(meditationsDays));
});
const getDaysInShouldNotificationTask = createSelector(
  [getTrackersTask, getTrackerTaskNotifications],
  (trackersTask) => {
  const tasksDays = trackersTask.reduce((accTask, task) => {
    const days = task.days.reduce((accDays, day) => {
      if (!day.isCheck && (new Date(day.value).setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0))) {
        return accDays.concat([day.value])
      } else return accDays;
    }, [] as number[]);

    return accTask.concat(days);
  }, [] as number[]);

  return Array.from(new Set(tasksDays));
});

export {
  getTrackersTask,
  getTrackerTask,
  getTrackersMeditation,
  getTrackerMeditation,
  getAllTrackers,
  getDaysInShouldNotificationMeditation,
  getDaysInShouldNotificationTask
};