import {
  Button,
  View,
  Text,
  LayoutChangeEvent,
  RefreshControl,
  ViewToken,
  NativeScrollEvent,
  ScrollView,
  LogBox,
} from "react-native";
import { GlobalScreen } from "../../components/GlobalScreen";
import { CenterContainer } from "../../components/CenterContainer";
import { TopWithBack } from "../../components/ui/TopWithBack";
import { styled } from "styled-components/native";
import { Tumbler } from "../../components/ui/Tumbler";
import DatePicker from "react-native-modern-datepicker";
import { nanoid } from "@reduxjs/toolkit";
import { useCallback, useEffect, useRef, useState } from "react";
import { DataTime } from "../../types";
import { TimePicker } from "../../components/ui/TimePicker";
import { TimeNotification } from "../../components/ui/TimeNotification";
import { useAppSelector } from "../../hooks/useAppSelector";
// import { FlashList } from "@shopify/flash-list";
// import { FlatList } from "react-native-bidirectional-infinite-scroll";

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
            <TimeNotification
              key={notification.id}
              notification={notification}
            />
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
