import { GlobalScreen } from "../../components/GlobalScreenWrapper";
import { CenterContainer } from "../../components/CenterContainer";
import { HeaderWithBack } from "../../components/ui/headers/HeaderWithBack";
import { styled } from "styled-components/native";
import { TimeNotification } from "../../components/ui/TimeNotification";
import { useAppSelector } from "../../hooks/useAppSelector";
import { normalize } from "../../utils";
import { Subtitle } from "../../components/ui/titles/Subtitle";
import {
  getNotifications,
  getTrackerMeditationNotifications,
  getTrackerTaskNotifications,
} from "../../store/notificationsSelectors";
import { ScrollView } from "react-native";

export function Notification() {
  const notifications = useAppSelector(getNotifications);
  const trackerMeditationNotification = useAppSelector(
    getTrackerMeditationNotifications
  );
  const trackerTaskNotification = useAppSelector(getTrackerTaskNotifications);

  return (
    <GlobalScreen withoutScrollView>
      <CenterContainer>
        <HeaderWithBack>
          <TextTitle>Уведомления</TextTitle>
        </HeaderWithBack>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Subtitle>Для трекеров медитаций</Subtitle>
          <TimeNotification
            notification={trackerMeditationNotification}
            typeTracker="meditation"
          />
          <Subtitle>Для трекеров заданий</Subtitle>
          <TimeNotification
            notification={trackerTaskNotification}
            typeTracker="task"
          />
          <Subtitle>Оповещение о медитации или задании</Subtitle>
          {notifications.map((notification) => (
            <TimeNotification
              key={notification.id}
              notification={notification}
            />
          ))}
          <BottomSpace />
        </ScrollView>
      </CenterContainer>
    </GlobalScreen>
  );
}

const TextTitle = styled.Text`
  font-family: "Poppins-Medium";
  font-size: ${normalize(18)}px;
  color: ${({ theme }) => theme.color.standard};
`;

const BottomSpace = styled.View`
  height: ${normalize(250)}px;
`;
