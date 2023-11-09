import { GlobalScreen } from "../../components/GlobalScreenWrapper";
import { Title } from "../../components/ui/titles/Title";
import {
  ErrorMessage,
  MAIN_CARDS,
  OPTIONS_DATA_MEDITATIONS,
} from "../../const";
import { Select } from "../../components/ui/inputs/Select";
import { CenterContainer } from "../../components/CenterContainer";
import { Subtitle } from "../../components/ui/titles/Subtitle";
import { CardListMeditation } from "../../components/ui/lists/CardListMeditation";
import { CardListMain } from "../../components/ui/lists/CardListMain";
import { useNotifee } from "../../hooks/useNotifee";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useEffect } from "react";
import { getNotifications } from "../../store/notificationsSelectors";
import { useToastCustom } from "../../hooks/useToastCustom";

export function Home() {
  const notifications = useAppSelector(getNotifications);
  const { onCreateTriggerNotification, getTriggerNotificationIds } =
    useNotifee();
  const { onErrorToast } = useToastCustom();

  const setNotificationFirstLaunchApp = async () => {
    try {
      const ids = await getTriggerNotificationIds();
      notifications[0].enable &&
        !ids.includes(String(notifications[0].id)) &&
        (await onCreateTriggerNotification(
          notifications[0].id,
          notifications[0].hours,
          notifications[0].minutes
        ));
    } catch {
      onErrorToast(ErrorMessage.CreateNotification);
    }
  };

  useEffect(() => {
    setNotificationFirstLaunchApp();
  }, []);

  return (
    <GlobalScreen>
      <CenterContainer>
        <Title>Привет!</Title>
        <CardListMain mainCards={MAIN_CARDS} />
        <Title>Выбери уровень сложности</Title>
      </CenterContainer>
      <Select optionsData={OPTIONS_DATA_MEDITATIONS} />
      <CenterContainer>
        <Subtitle>Подходящие медитации</Subtitle>
        <CardListMeditation count={6} />
      </CenterContainer>
    </GlobalScreen>
  );
}
