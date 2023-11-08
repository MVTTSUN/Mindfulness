import styled from "styled-components/native";
import { normalize } from "../../utils";
import { AppRoute, Color } from "../../const";
import { CheckIcon } from "../svg/icons/other-icons/CheckIcon";
import { Dimensions, Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useEffect, useRef, useState } from "react";
import { ArrowRightIcon } from "../svg/icons/other-icons/ArrowRightIcon";
import { TouchableHighlight } from "./touchables/TouchableHighlight";
import { DataPopup } from "./popups/DataPopup";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  getTrackerMeditation,
  getTrackerTask,
} from "../../store/trackerSelectors";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
  addMeditationTracker,
  addTaskTracker,
  removeMeditationTracker,
  removeTaskTracker,
  updateMeditationTracker,
  updateTaskTracker,
} from "../../store/trackerSlice";
import { CloseIcon } from "../svg/icons/other-icons/CloseIcon";
import { CheckBox } from "./inputs/CheckBox";
import { useRoute } from "@react-navigation/native";
import {
  getTrackerMeditationNotifications,
  getTrackerTaskNotifications,
} from "../../store/notificationsSelectors";
import { useNotifee } from "../../hooks/useNotifee";

type TrackerProps = {
  id: string;
  title?: string;
};

export function Tracker(props: TrackerProps) {
  const { id, title } = props;
  const [sinceDay, setSinceDay] = useState<Date | null>(null);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const isOpenRef = useRef<boolean>(false);
  const route = useRoute();
  const trackerMeditation = useAppSelector(getTrackerMeditation(id));
  const trackerTask = useAppSelector(getTrackerTask(id));
  const trackerMeditationNotifications = useAppSelector(
    getTrackerMeditationNotifications
  );
  const trackerTaskNotifications = useAppSelector(getTrackerTaskNotifications);
  const dispatch = useAppDispatch();
  const {
    onCreateTriggerNotificationForTrackersMeditation,
    onCreateTriggerNotificationForTrackersTask,
  } = useNotifee();
  const translateXValue = useSharedValue(
    -Dimensions.get("window").width * 0.8 + normalize(35)
  );
  const styleTracker = useAnimatedStyle(() => ({
    transform: [{ translateX: translateXValue.value }],
  }));
  const rotateValue = useSharedValue(0);
  const styleArrowIcon = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotateValue.value}deg` }],
  }));
  const firstMonthDayTracker =
    route.name === AppRoute.Meditation
      ? trackerMeditation &&
        new Date(trackerMeditation.days[0].value).toLocaleString("ru", {
          month: "short",
        })
      : trackerTask &&
        new Date(trackerTask.days[0].value).toLocaleString("ru", {
          month: "short",
        });

  const lastMonthDayTracker =
    route.name === AppRoute.Meditation
      ? trackerMeditation &&
        new Date(
          trackerMeditation.days[trackerMeditation.days.length - 1].value
        ).toLocaleString("ru", {
          month: "short",
        })
      : trackerTask &&
        new Date(
          trackerTask.days[trackerTask.days.length - 1].value
        ).toLocaleString("ru", {
          month: "short",
        });

  const toggleTracker = () => {
    if (!isOpenRef.current) {
      translateXValue.value = withSpring(
        -Dimensions.get("window").width * 0.1,
        { mass: 0.5 }
      );
      rotateValue.value = withTiming(-180, { duration: 300 });
      isOpenRef.current = true;
    } else {
      translateXValue.value = withSpring(
        -Dimensions.get("window").width * 0.8 + normalize(35),
        { mass: 0.5 }
      );
      rotateValue.value = withTiming(0, { duration: 500 });
      isOpenRef.current = false;
    }
  };

  const createTracker = () => {
    if (sinceDay) {
      if (route.name === AppRoute.Meditation) {
        dispatch(
          addMeditationTracker({ id, sinceDay: sinceDay?.toISOString(), title })
        );
      } else {
        dispatch(
          addTaskTracker({ id, sinceDay: sinceDay?.toISOString(), title })
        );
      }
    }
  };

  const removeTracker = () => {
    if (route.name === AppRoute.Meditation) {
      dispatch(removeMeditationTracker(id));
    } else {
      dispatch(removeTaskTracker(id));
    }
    setSinceDay(null);
  };

  useEffect(() => {
    if (trackerMeditation && trackerMeditationNotifications.enable) {
      onCreateTriggerNotificationForTrackersMeditation(
        trackerMeditationNotifications.hours,
        trackerMeditationNotifications.minutes
      );
    }
  }, [trackerMeditation]);

  useEffect(() => {
    if (trackerTask && trackerTaskNotifications.enable) {
      onCreateTriggerNotificationForTrackersTask(
        trackerTaskNotifications.hours,
        trackerTaskNotifications.minutes
      );
    }
  }, [trackerTask]);

  useEffect(() => {
    if (sinceDay) {
      setIsOpenPopup(false);
    }
  }, [sinceDay]);

  return (
    <>
      <Container style={styleTracker}>
        <ContentContainer>
          <TitleContainer>
            <Title>Трекер</Title>
            {(trackerMeditation || trackerTask) && (
              <Months>
                {firstMonthDayTracker === lastMonthDayTracker
                  ? firstMonthDayTracker
                  : firstMonthDayTracker + " - " + lastMonthDayTracker}
              </Months>
            )}
          </TitleContainer>
          {trackerMeditation || trackerTask ? (
            <CheckBoxesContainer>
              {route.name === AppRoute.Meditation
                ? trackerMeditation.days.map((day, index) => (
                    <Pressable
                      key={index}
                      onPress={() =>
                        dispatch(
                          updateMeditationTracker({ id, dayValue: day.value })
                        )
                      }
                    >
                      <CheckBox
                        backgroundColor={Color.Primary}
                        isActive={day.isCheck}
                        text={new Date(day.value).toLocaleString("ru", {
                          day: "numeric",
                        })}
                        isInColumn
                        isSmall
                        color={Color.TextStandard}
                      />
                    </Pressable>
                  ))
                : trackerTask.days.map((day, index) => (
                    <Pressable
                      key={index}
                      onPress={() =>
                        dispatch(updateTaskTracker({ id, dayValue: day.value }))
                      }
                    >
                      <CheckBox
                        backgroundColor={Color.Primary}
                        isActive={day.isCheck}
                        text={new Date(day.value).toLocaleString("ru", {
                          day: "numeric",
                        })}
                        isInColumn
                        isSmall
                        color={Color.TextStandard}
                      />
                    </Pressable>
                  ))}
            </CheckBoxesContainer>
          ) : (
            <TouchableHighlight onPress={() => setIsOpenPopup(true)}>
              {sinceDay
                ? `${
                    sinceDay.getDate() === 2 ? "Со" : "С"
                  } ${sinceDay.toLocaleString("ru", {
                    month: "long",
                    day: "numeric",
                  })}`
                : "Дата"}
            </TouchableHighlight>
          )}
        </ContentContainer>
        <ControlContainer>
          {trackerMeditation || trackerTask ? (
            <>
              <Pressable onPress={removeTracker}>
                <CloseIcon size={24} />
              </Pressable>
            </>
          ) : (
            <>
              <Pressable onPress={createTracker}>
                <CheckIcon size={22} color={Color.TextStandard} />
              </Pressable>
            </>
          )}
          <PressableRightIcon onPress={toggleTracker}>
            <Animated.View style={styleArrowIcon}>
              <ArrowRightIcon size={36} />
            </Animated.View>
          </PressableRightIcon>
        </ControlContainer>
      </Container>
      {isOpenPopup && (
        <PressableBlur onPress={() => setIsOpenPopup(false)}>
          <Pressable>
            <DataPopup setDayHandle={(day: Date) => setSinceDay(day)} />
          </Pressable>
        </PressableBlur>
      )}
    </>
  );
}

const PressableBlur = styled.Pressable`
  z-index: 20;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.backgroundColor.blur};
`;

const Container = styled(Animated.View)`
  padding: ${normalize(7)}px 0 ${normalize(7)}px 16%;
  z-index: 10;
  justify-content: space-between;
  flex-direction: row;
  position: absolute;
  left: 0;
  width: 80%;
  bottom: ${normalize(90)}px;
  height: ${normalize(130)}px;
  border-top-right-radius: ${normalize(20)}px;
  border-bottom-right-radius: ${normalize(20)}px;
  background-color: ${Color.PrimaryPastel};
  border: ${normalize(2)}px dashed ${({ theme }) => theme.color.standard};
`;

const ContentContainer = styled.View`
  width: 60%;
  gap: ${normalize(5)}px;
`;

const ControlContainer = styled.View`
  width: 35%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${normalize(10)}px;
`;

const Months = styled.Text`
  font-family: "Poppins-Regular";
  font-size: ${normalize(14)}px;
  color: ${Color.TextStandard};
`;

const Title = styled.Text`
  font-family: "Poppins-Medium";
  font-size: ${normalize(18)}px;
  color: ${Color.TextStandard};
`;

const CheckBoxesContainer = styled.View`
  margin-left: 4%;
  width: 80%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  column-gap: ${normalize(10)}px;
`;

const PressableRightIcon = styled.Pressable`
  height: 100%;
  align-items: center;
  justify-content: center;
`;
