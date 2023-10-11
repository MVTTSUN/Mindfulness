import notifee, {
  AndroidColor,
  AndroidImportance,
  AndroidVisibility,
  EventType,
  RepeatFrequency,
  TimestampTrigger,
  TriggerType,
} from "@notifee/react-native";

export function useNotifee() {
  const onCreateTriggerNotification = async (
    id: number,
    hours: number,
    minutes: number
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
    }
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);

    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(),
      repeatFrequency: RepeatFrequency.DAILY,
      alarmManager: {
        allowWhileIdle: true,
      },
    };

    await notifee.createTriggerNotification(
      {
        id: String(id),
        title: `Сегодня в ${date.getHours()}:${
          date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
        } у вас медитация`,
        android: {
          channelId,
          pressAction: {
            id: "default",
          },
          sound: "default",
          vibrationPattern: [300, 500],
          visibility: AndroidVisibility.PUBLIC,
          importance: AndroidImportance.HIGH,
        },
        ios: {
          sound: "default",
        },
      },
      trigger
    );
  };

  const cancelNotification = async (id: number) => {
    await notifee.cancelNotification(String(id));
  };

  const getTriggerNotificationIds = async () => {
    const ids = await notifee.getTriggerNotificationIds();

    return ids;
  };

  // const onBackgroundEvent = () => {
  //   notifee.onBackgroundEvent(async ({ type, detail }) => {
  //     const { notification, pressAction } = detail;

  //     // Check if the user pressed the "Mark as read" action
  //     if (
  //       type === EventType.ACTION_PRESS &&
  //       pressAction?.id === "mark-as-read"
  //     ) {
  //       // Update external API
  //       await fetch(
  //         `https://my-api.com/chat/${notification?.data?.chatId}/read`,
  //         {
  //           method: "POST",
  //         }
  //       );

  //       await notifee.cancelNotification(notification?.id);
  //     }
  //   });
  // };

  return {
    onCreateTriggerNotification,
    cancelNotification,
    getTriggerNotificationIds,
  };
}
