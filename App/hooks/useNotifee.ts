import notifee, {
  AndroidColor,
  AndroidImportance,
  AndroidVisibility,
  RepeatFrequency,
  TimestampTrigger,
  TriggerType,
} from "@notifee/react-native";
import { useAppSelector } from './useAppSelector';
import { getDaysInShouldNotificationMeditation, getDaysInShouldNotificationTask, getTrackersMeditation, getTrackersTask } from '../store/trackerSelectors';

export const useNotifee = () => {
  const trackersMeditation = useAppSelector(getTrackersMeditation);
  const trackersTask = useAppSelector(getTrackersTask);
  const daysInShouldNotificationMeditation = useAppSelector(getDaysInShouldNotificationMeditation);
  const daysInShouldNotificationTask = useAppSelector(getDaysInShouldNotificationTask);

  const onCreateTriggerNotification = async (
    id: number,
    hours: number,
    minutes: number,
    day?: number,
    titleTracker?: string,
    bodyTracker?: string
  ) => {
    await notifee.requestPermission();

    const channelId = await notifee.createChannel({
      id: "mindfulness",
      name: "Уведомления",
      vibration: true,
      vibrationPattern: [300, 500],
      lights: true,
      lightColor: AndroidColor.AQUA,
      sound: "default",
      visibility: AndroidVisibility.PUBLIC,
      importance: AndroidImportance.HIGH,
    });

    let date = new Date();
    if (
      date.getHours() >= hours &&
      date.getMinutes() >= minutes &&
      date.getSeconds() >= 0
    ) {
      date = new Date(date.getTime() + 24 * 60 * 60 * 1000);
      if (day && new Date(day).getDate() <= new Date().getDate()) {
        return;
      }
    }
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);

    const timestamp = day && new Date().getDate() !== new Date(day).getDate()
      ? new Date(new Date(day).setHours(hours, minutes, 0, 0)).getTime()
      : date.getTime();

    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp,
      repeatFrequency: day ? undefined : RepeatFrequency.DAILY,
      alarmManager: {
        allowWhileIdle: true,
      },
    };

    const title = titleTracker ? titleTracker : `Сегодня в ${date.getHours()}:${
      date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
    } у вас медитация/задание`;
    const body = bodyTracker ? bodyTracker : '';

    await notifee.createTriggerNotification(
      {
        id: String(id),
        title,
        body,
        android: {
          channelId,
          pressAction: {
            id: "default",
          },
          sound: "default",
          vibrationPattern: [300, 500],
          visibility: AndroidVisibility.PUBLIC,
          importance: AndroidImportance.HIGH,
          smallIcon: "notification_icon",
        },
        ios: {
          sound: "default",
        },
      },
      trigger
    );
  };

  const onCreateTriggerNotificationForTrackersMeditation = async (hoursHandle: number, minutesHandle: number) => {
    const ids = await getTriggerNotificationIds();

    for (let i = 1; i < 31; i++) {
      ids.includes(String(100 + i)) && (await cancelNotification(100 + i));
    }

    for (let i = 0; i < daysInShouldNotificationMeditation.length; i++) {
      const title = 'Сегодня вы пропускаете медитации:';
      const body = trackersMeditation.reduce((acc, meditation) => {
        if (meditation.days.some((day) => new Date(day.value).getDate() === new Date(daysInShouldNotificationMeditation[i]).getDate() && !day.isCheck)) {
          return acc.concat([meditation.title])
        } else return acc;
      }, [] as string[]).join(', ');
      await onCreateTriggerNotification(
        100 + new Date(daysInShouldNotificationMeditation[i]).getDate(),
        hoursHandle,
        minutesHandle,
        daysInShouldNotificationMeditation[i],
        title,
        body
      );
    }
  };

  const onCreateTriggerNotificationForTrackersTask = async (hoursHandle: number, minutesHandle: number) => {
    const ids = await getTriggerNotificationIds();

    for (let i = 1; i < 31; i++) {
      ids.includes(String(200 + i)) && (await cancelNotification(200 + i));
    }

    for (let i = 0; i < daysInShouldNotificationTask.length; i++) {
      const title = 'Сегодня вы пропускаете задания:';
      const body = trackersTask.reduce((acc, task) => {
        if (task.days.some((day) => new Date(day.value).getDate() === new Date(daysInShouldNotificationTask[i]).getDate() && !day.isCheck)) {
          return acc.concat([task.title])
        } else return acc;
      }, [] as string[]).join(', ');
      await onCreateTriggerNotification(
        200 + new Date(daysInShouldNotificationTask[i]).getDate(),
        hoursHandle,
        minutesHandle,
        daysInShouldNotificationTask[i],
        title,
        body
      );
    }
  };

  const cancelNotification = async (id: number) => {
    await notifee.cancelNotification(String(id));
  };

  const getTriggerNotificationIds = async () => {
    const ids = await notifee.getTriggerNotificationIds();

    return ids;
  };

  return {
    onCreateTriggerNotification,
    cancelNotification,
    getTriggerNotificationIds,
    onCreateTriggerNotificationForTrackersMeditation,
    onCreateTriggerNotificationForTrackersTask
  };
}
