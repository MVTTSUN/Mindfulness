import { styled } from "styled-components/native";
import { Tumbler } from "./Tumbler";
import { TimePicker } from "./TimePicker";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { memo, useEffect, useState } from "react";
import { Notification } from "../../types";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
  closeNotification,
  openNotification,
  setTime,
} from "../../store/notificationsSlice";
import { TouchableHighlight } from "./Touchables/TouchableHighlight";
import { useNotifee } from "../../hooks/useNotifee";

type TimeNotificationProps = {
  notification: Notification;
};

export const TimeNotification = memo(
  ({ notification }: TimeNotificationProps) => {
    const { id, hours, minutes, enable, isOpen } = notification;
    const dispatch = useAppDispatch();
    const [hoursHandle, setHoursHandle] = useState(hours);
    const [minutesHandle, setMinutesHandle] = useState(minutes);
    const height = useSharedValue(0);
    const styleSelectTimeContainer = useAnimatedStyle(() => ({
      height: height.value,
    }));
    const {
      onCreateTriggerNotification,
      cancelNotification,
      getTriggerNotificationIds,
    } = useNotifee();

    const togglePicker = () => {
      if (isOpen) {
        height.value = withTiming(0, { duration: 300 });
        dispatch(closeNotification(id));
      } else {
        height.value = withSpring(290, { mass: 0.5 });
        dispatch(openNotification(id));
      }
    };

    const createTriggerNotificationAsync = async () => {
      const ids = await getTriggerNotificationIds();
      !ids.includes(String(id)) &&
        onCreateTriggerNotification(id, hoursHandle, minutesHandle);
    };

    const cancelNotificationAsync = async () => {
      const ids = await getTriggerNotificationIds();
      ids.includes(String(id)) && cancelNotification(id);
    };

    useEffect(() => {
      return () => {
        dispatch(closeNotification(id));
      };
    }, []);

    useEffect(() => {
      if (!isOpen) {
        height.value = withTiming(0);
      }
    }, [isOpen]);

    useEffect(() => {
      if (enable) {
        createTriggerNotificationAsync();
      } else {
        cancelNotificationAsync();
      }
    }, [enable]);

    return (
      <Container>
        <EnableContainer onPress={togglePicker}>
          <TimeContainer>
            <TextTime>
              {hours < 10 ? `0${hours}` : hours}:
              {minutes < 10 ? `0${minutes}` : minutes}
            </TextTime>
            <TextTimeInfo>Каждый день</TextTimeInfo>
          </TimeContainer>
          <Tumbler id={id} enable={enable} />
        </EnableContainer>
        <SelectTimeContainer style={styleSelectTimeContainer}>
          <PickerContainer>
            <TimePicker
              count={24}
              setTimeHandle={setHoursHandle}
              time={hours}
            />
            <LineBetweenPicker />
            <TimePicker
              count={60}
              setTimeHandle={setMinutesHandle}
              time={minutes}
            />
          </PickerContainer>
          <TouchableHighlight
            onPress={() => {
              dispatch(
                setTime({ id, hours: hoursHandle, minutes: minutesHandle })
              );
              togglePicker();
              if (enable) {
                onCreateTriggerNotification(id, hoursHandle, minutesHandle);
              }
            }}
          >
            Сохранить
          </TouchableHighlight>
        </SelectTimeContainer>
      </Container>
    );
  }
);

const Container = styled.View`
  padding: 20px;
  background-color: ${({ theme }) => theme.backgroundColor.main};
  border-radius: 25px;
`;

const EnableContainer = styled.Pressable`
  margin-bottom: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TimeContainer = styled.View`
  align-items: center;
`;

const TextTime = styled.Text`
  line-height: 50px;
  font-family: "Poppins-Regular";
  font-size: 36px;
  color: ${({ theme }) => theme.color.standard};
`;

const TextTimeInfo = styled.Text`
  line-height: 14px;
  font-family: "Poppins-Regular";
  font-size: 14px;
  color: ${({ theme }) => theme.color.standard};
`;

const SelectTimeContainer = styled(Animated.View)`
  overflow: hidden;
`;

const PickerContainer = styled.View`
  margin-bottom: 20px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const LineBetweenPicker = styled.View`
  opacity: 0.5;
  width: 0.3px;
  height: 70%;
  background-color: ${({ theme }) => theme.color.standard};
`;
