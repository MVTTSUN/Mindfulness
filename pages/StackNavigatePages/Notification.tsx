import { GlobalScreen } from "../../components/GlobalScreen";
import { CenterContainer } from "../../components/CenterContainer";
import { TopWithBack } from "../../components/ui/TopWithBack";
import { styled } from "styled-components/native";
import { TimeNotification } from "../../components/ui/TimeNotification";
import { useAppSelector } from "../../hooks/useAppSelector";

export function Notification() {
  const notifications = useAppSelector(
    (state) => state.notifications.notifications
  );

  return (
    <GlobalScreen>
      <CenterContainer>
        <TopWithBack>
          <TextTitle>Уведомления</TextTitle>
        </TopWithBack>
        {notifications.map((notification) => (
          <TimeNotification key={notification.id} notification={notification} />
        ))}
      </CenterContainer>
    </GlobalScreen>
  );
}

const TextTitle = styled.Text`
  font-family: "Poppins-Medium";
  font-size: 18px;
  color: ${({ theme }) => theme.color.standard};
`;
