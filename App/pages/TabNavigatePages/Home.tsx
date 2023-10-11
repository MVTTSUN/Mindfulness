import { GlobalScreen } from "../../components/GlobalScreen";
import { Title } from "../../components/ui/Titles/Title";
import { MAIN_CARDS, OPTIONS_DATA } from "../../const";
import { Select } from "../../components/ui/Select";
import { CenterContainer } from "../../components/CenterContainer";
import { Subtitle } from "../../components/ui/Titles/Subtitle";
import { CardListMeditation } from "../../components/ui/CardListMeditation";
import { CardListMain } from "../../components/ui/CardListMain";
import { useNotifee } from "../../hooks/useNotifee";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useEffect } from "react";

export function Home() {
  const { onCreateTriggerNotification, getTriggerNotificationIds } =
    useNotifee();
  const notification = useAppSelector(
    (state) => state.notifications.notifications[0]
  );

  const setNotificationFirstLaunchApp = async () => {
    const ids = await getTriggerNotificationIds();
    notification.enable &&
      !ids.includes(String(notification.id)) &&
      onCreateTriggerNotification(
        notification.id,
        notification.hours,
        notification.minutes
      );
  };

  useEffect(() => {
    setNotificationFirstLaunchApp();
  }, []);

  return (
    <GlobalScreen>
      <CenterContainer>
        <Title>Привет!</Title>
        <CardListMain mainCards={MAIN_CARDS} />
        <Title>Как себя чувствуешь?</Title>
      </CenterContainer>
      <Select optionsData={OPTIONS_DATA} />
      <CenterContainer>
        <Subtitle>Подходящие медитации</Subtitle>
        <CardListMeditation count={6} />
      </CenterContainer>
    </GlobalScreen>
  );
}
