import notifee, {
  AndroidColor,
  RepeatFrequency,
  TimestampTrigger,
  TriggerType,
} from "@notifee/react-native";
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
import { LogBox } from "react-native";

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

    const onCreateTriggerNotification = async (
      id: number,
      hours: number,
      minutes: number
    ) => {
      await notifee.requestPermission();

      const channelId = await notifee.createChannel({
        id: String(id),
        name: "Медитация",
        vibration: true,
        vibrationPattern: [300, 500],
        lights: true,
        lightColor: AndroidColor.AQUA,
      });

      const date = new Date(Date.now());
      date.setHours(hours);
      date.setMinutes(minutes);
      date.setSeconds(0);

      console.log(date, hours, minutes);

      const trigger: TimestampTrigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: date.getTime(),
        repeatFrequency: RepeatFrequency.DAILY,
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
              id: String(id),
            },
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

    const togglePicker = () => {
      if (isOpen) {
        height.value = withTiming(0, { duration: 300 });
        dispatch(closeNotification(id));
      } else {
        height.value = withSpring(290, { mass: 0.5 });
        dispatch(openNotification(id));
      }
    };

    useEffect(() => {
      // LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);

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
        // console.log(id);
        onCreateTriggerNotification(id, hoursHandle, minutesHandle);
      } else {
        // console.log(1);
        cancelNotification(id);
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
