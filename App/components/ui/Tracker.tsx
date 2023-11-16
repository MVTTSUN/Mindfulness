import styled from "styled-components/native";
import { normalize } from "../../utils";
import { AppRoute, Color, ErrorMessage } from "../../const";
import { CheckIcon } from "../svg/icons/other-icons/CheckIcon";
import { Dimensions, Pressable } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useEffect, useRef } from "react";
import { ArrowRightIcon } from "../svg/icons/other-icons/ArrowRightIcon";
import { TouchableHighlight } from "./touchables/TouchableHighlight";
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
import { useToastCustom } from "../../hooks/useToastCustom";
import { Shadow } from "react-native-shadow-2";

type TrackerProps = {
  id: string;
  title?: string;
  setIsOpenPopupDataHandle: (value: boolean) => void;
  setSinceDayHandle: (value: Date | null) => void;
  sinceDay: Date | null;
};

export function Tracker(props: TrackerProps) {
  const { id, title, setIsOpenPopupDataHandle, setSinceDayHandle, sinceDay } =
    props;
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
  const { onErrorToast } = useToastCustom();
  const translateXValue = useSharedValue(
    -Dimensions.get("window").width * 0.8 + normalize(35)
  );
  const styleTracker = useAnimatedStyle(() => ({
    transform: [{ translateX: translateXValue.value } as never],
  }));
  const rotateValue = useSharedValue(0);
  const styleArrowIcon = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotateValue.value}deg` } as never],
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
    setSinceDayHandle(null);
  };

  const onCreateTriggerNotificationForTrackersMeditationAsync = async () => {
    try {
      onCreateTriggerNotificationForTrackersMeditation(
        trackerMeditationNotifications.hours,
        trackerMeditationNotifications.minutes
      );
    } catch {
      onErrorToast(ErrorMessage.CreateNotification);
    }
  };

  const onCreateTriggerNotificationForTrackersTaskAsync = async () => {
    try {
      onCreateTriggerNotificationForTrackersTask(
        trackerTaskNotifications.hours,
        trackerTaskNotifications.minutes
      );
    } catch {
      onErrorToast(ErrorMessage.CreateNotification);
    }
  };

  useEffect(() => {
    if (trackerMeditation && trackerMeditationNotifications.enable) {
      onCreateTriggerNotificationForTrackersMeditationAsync();
    }
  }, [trackerMeditation]);

  useEffect(() => {
    if (trackerTask && trackerTaskNotifications.enable) {
      onCreateTriggerNotificationForTrackersTaskAsync();
    }
  }, [trackerTask]);

  useEffect(() => {
    if (sinceDay) {
      setIsOpenPopupDataHandle(false);
    }
  }, [sinceDay]);

  return (
    <>
      <AnimatedContainer
        entering={FadeIn.duration(100)}
        exiting={FadeOut.duration(100)}
        style={styleTracker}
      >
        <Container distance={15} startColor={`${Color.TextStandard}10`}>
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
                          isNoAdaptiveColor
                          color={Color.TextStandard}
                        />
                      </Pressable>
                    ))
                  : trackerTask.days.map((day, index) => (
                      <Pressable
                        key={index}
                        onPress={() =>
                          dispatch(
                            updateTaskTracker({ id, dayValue: day.value })
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
                          isNoAdaptiveColor
                          color={Color.TextStandard}
                        />
                      </Pressable>
                    ))}
              </CheckBoxesContainer>
            ) : (
              <TouchableHighlight
                onPress={() => setIsOpenPopupDataHandle(true)}
              >
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
      </AnimatedContainer>
    </>
  );
}

const AnimatedContainer = styled(Animated.View)`
  position: absolute;
  left: 0;
  width: 83%;
  bottom: ${normalize(90)}px;
`;

const Container = styled(Shadow)`
  padding: ${normalize(15)}px 0 ${normalize(15)}px 16%;
  height: ${normalize(130)}px;
  justify-content: space-between;
  flex-direction: row;
  border-top-right-radius: ${normalize(20)}px;
  border-bottom-right-radius: ${normalize(20)}px;
  background-color: ${Color.PrimaryPastel};
  gap: ${normalize(15)}px;
`;

const ContentContainer = styled.View`
  width: 57%;
  justify-content: space-between;
`;

const ControlContainer = styled.View`
  width: 32%;
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
