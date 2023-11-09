import { styled } from "styled-components/native";
import { Tumbler } from "./inputs/Tumbler";
import { TimePicker } from "./inputs/TimePicker";
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
  closeTrackerMeditationNotification,
  closeTrackerTaskNotification,
  openNotification,
  openTrackerMeditationNotification,
  openTrackerTaskNotification,
  setTime,
  setTimeTrackerMeditationNotification,
  setTimeTrackerTaskNotification,
  toggleNotification,
  toggleTrackerMeditationNotification,
  toggleTrackerTaskNotification,
} from "../../store/notificationsSlice";
import { TouchableHighlight } from "./touchables/TouchableHighlight";
import { useNotifee } from "../../hooks/useNotifee";
import { normalize } from "../../utils";
import { useToastCustom } from "../../hooks/useToastCustom";
import { ErrorMessage } from '../../const';

type TimeNotificationProps = {
  notification: Notification;
  typeTracker?: "meditation" | "task";
};

export const TimeNotification = memo((props: TimeNotificationProps) => {
  const { notification, typeTracker } = props;
  const { id, hours, minutes, enable, isOpen } = notification;
  const [hoursHandle, setHoursHandle] = useState(hours);
  const [minutesHandle, setMinutesHandle] = useState(minutes);
  const dispatch = useAppDispatch();
  const {
    onCreateTriggerNotification,
    cancelNotification,
    getTriggerNotificationIds,
    onCreateTriggerNotificationForTrackersMeditation,
    onCreateTriggerNotificationForTrackersTask,
  } = useNotifee();
  const { onErrorToast } = useToastCustom();
  const heightSelectTime = useSharedValue(0);
  const styleSelectTimeContainer = useAnimatedStyle(() => ({
    height: heightSelectTime.value,
  }));

  const togglePicker = () => {
    if (isOpen) {
      heightSelectTime.value = withTiming(0, { duration: 300 });
      if (typeTracker === "meditation") {
        dispatch(closeTrackerMeditationNotification());
      } else if (typeTracker === "task") {
        dispatch(closeTrackerTaskNotification());
      } else {
        dispatch(closeNotification(id));
      }
    } else {
      heightSelectTime.value = withSpring(normalize(290), { mass: 0.5 });
      if (typeTracker === "meditation") {
        dispatch(openTrackerMeditationNotification());
      } else if (typeTracker === "task") {
        dispatch(openTrackerTaskNotification());
      } else {
        dispatch(openNotification(id));
      }
    }
  };

  const setTimeNotification = () => {
    if (typeTracker === "meditation") {
      dispatch(
        setTimeTrackerMeditationNotification({
          id,
          hours: hoursHandle,
          minutes: minutesHandle,
        })
      );
    } else if (typeTracker === "task") {
      dispatch(
        setTimeTrackerTaskNotification({
          id,
          hours: hoursHandle,
          minutes: minutesHandle,
        })
      );
    } else {
      dispatch(setTime({ id, hours: hoursHandle, minutes: minutesHandle }));
    }
  };

  const createTriggerNotificationAsync = async () => {
    if (typeTracker === "meditation") {
      await onCreateTriggerNotificationForTrackersMeditation(
        hoursHandle,
        minutesHandle
      );
    } else if (typeTracker === "task") {
      await onCreateTriggerNotificationForTrackersTask(
        hoursHandle,
        minutesHandle
      );
    } else {
      const ids = await getTriggerNotificationIds();
      !ids.includes(String(id)) &&
        (await onCreateTriggerNotification(id, hoursHandle, minutesHandle));
    }
  };

  const cancelNotificationAsync = async () => {
    const ids = await getTriggerNotificationIds();
    ids.includes(String(id)) && (await cancelNotification(id));
  };

  const createOrCancelNotification = async () => {
    if (enable) {
      try {
        await createTriggerNotificationAsync();
      } catch (error) {
        onErrorToast(ErrorMessage.CreateNotification);
      }
    } else {
      try {
        await cancelNotificationAsync();
      } catch (error) {
        onErrorToast(ErrorMessage.DeleteNotification);
      }
    }
  };

  useEffect(() => {
    if (!isOpen) {
      heightSelectTime.value = withTiming(0);
    }
  }, [isOpen]);

  useEffect(() => {
    createOrCancelNotification();
  }, [enable]);

  useEffect(() => {
    return () => {
      dispatch(closeNotification(id));
      dispatch(closeTrackerMeditationNotification());
      dispatch(closeTrackerTaskNotification());
    };
  }, []);

  return (
    <Container>
      <EnableContainer onPress={togglePicker}>
        <TimeContainer>
          <TextTime>
            {hours < 10 ? `0${hours}` : hours}:
            {minutes < 10 ? `0${minutes}` : minutes}
          </TextTime>
          {!typeTracker && <TextTimeInfo>Каждый день</TextTimeInfo>}
        </TimeContainer>
        <Tumbler
          enable={enable}
          onChange={() => {
            if (typeTracker === "meditation") {
              dispatch(toggleTrackerMeditationNotification());
            } else if (typeTracker === "task") {
              dispatch(toggleTrackerTaskNotification());
            } else {
              dispatch(toggleNotification(id));
            }
          }}
        />
      </EnableContainer>
      <SelectTimeContainer style={styleSelectTimeContainer}>
        <PickerContainer>
          <TimePicker count={24} setTimeHandle={setHoursHandle} time={hours} />
          <LineBetweenPicker />
          <TimePicker
            count={60}
            setTimeHandle={setMinutesHandle}
            time={minutes}
          />
        </PickerContainer>
        <TouchableHighlight
          onPress={async () => {
            setTimeNotification();
            togglePicker();
            await createOrCancelNotification();
          }}
        >
          Сохранить
        </TouchableHighlight>
      </SelectTimeContainer>
    </Container>
  );
});

const Container = styled.View`
  padding: ${normalize(20)}px;
  background-color: ${({ theme }) => theme.backgroundColor.main};
  border-radius: ${normalize(25)}px;
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
  line-height: ${normalize(50)}px;
  font-family: "Poppins-Regular";
  font-size: ${normalize(36)}px;
  color: ${({ theme }) => theme.color.standard};
`;

const TextTimeInfo = styled.Text`
  line-height: ${normalize(14)}px;
  font-family: "Poppins-Regular";
  font-size: ${normalize(14)}px;
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
  width: ${normalize(0.3)}px;
  height: 70%;
  background-color: ${({ theme }) => theme.color.standard};
`;
