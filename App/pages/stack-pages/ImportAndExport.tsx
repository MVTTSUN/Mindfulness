import { styled } from "styled-components/native";
import { CenterContainer } from "../../components/CenterContainer";
import { GlobalScreen } from "../../components/GlobalScreenWrapper";
import { HeaderWithBack } from "../../components/ui/headers/HeaderWithBack";
import { useAppSelector } from "../../hooks/useAppSelector";
import { TouchableHighlight } from "../../components/ui/touchables/TouchableHighlight";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { setLikes } from "../../store/likesSlice";
import { setNotes } from "../../store/notesSlice";
import { normalize } from "../../utils";
import { getNotes } from "../../store/notesSelectors";
import { getAllLikes } from "../../store/likesSelectors";
import {
  getAllTrackers,
  getTrackersMeditation,
  getTrackersTask,
} from "../../store/trackerSelectors";
import { setTrackers } from "../../store/trackerSlice";
import { useEffect } from "react";
import {
  getTrackerMeditationNotifications,
  getTrackerTaskNotifications,
} from "../../store/notificationsSelectors";
import { useNotifee } from "../../hooks/useNotifee";
import { ErrorMessage, NAME_FILE_JSON, SuccessMessage } from "../../const";
import { useFileSystem } from "../../hooks/useFileSystem";
import { useToastCustom } from "../../hooks/useToastCustom";

export function ImportAndExport() {
  const likes = useAppSelector(getAllLikes);
  const notes = useAppSelector(getNotes);
  const trackers = useAppSelector(getAllTrackers);
  const trackerMeditationNotifications = useAppSelector(
    getTrackerMeditationNotifications
  );
  const trackerTaskNotifications = useAppSelector(getTrackerTaskNotifications);
  const trackersMeditation = useAppSelector(getTrackersMeditation);
  const trackersTask = useAppSelector(getTrackersTask);
  const dispatch = useAppDispatch();
  const { exportFileJSON, importFileJSON } = useFileSystem();
  const {
    onCreateTriggerNotificationForTrackersMeditation,
    onCreateTriggerNotificationForTrackersTask,
  } = useNotifee();
  const { onErrorToast, onSuccessToast } = useToastCustom();

  const exportFile = async () => {
    try {
      const data = { likes, notes, trackers };

      const isSuccess = await exportFileJSON(data);
      isSuccess && onSuccessToast(SuccessMessage.Export);
    } catch {
      onErrorToast(ErrorMessage.Export);
    }
  };

  const importFile = async () => {
    try {
      const parsedData = await importFileJSON();

      if (
        JSON.stringify(parsedData.likes) !== JSON.stringify({}) ||
        parsedData.notes.length !== 0 ||
        JSON.stringify(parsedData.trackers) !== JSON.stringify({})
      ) {
        dispatch(setLikes(parsedData.likes));
        dispatch(setNotes(parsedData.notes));
        dispatch(setTrackers(parsedData.trackers));
        onSuccessToast(SuccessMessage.Import);
      }
    } catch {
      onErrorToast(ErrorMessage.Import);
    }
  };

  const onCreateTriggerNotificationForTrackersMeditationAsync = async () => {
    try {
      await onCreateTriggerNotificationForTrackersMeditation(
        trackerMeditationNotifications.hours,
        trackerMeditationNotifications.minutes
      );
    } catch {
      onErrorToast(ErrorMessage.CreateNotification);
    }
  };

  const onCreateTriggerNotificationForTrackersTaskAsync = async () => {
    try {
      await onCreateTriggerNotificationForTrackersTask(
        trackerTaskNotifications.hours,
        trackerTaskNotifications.minutes
      );
    } catch {
      onErrorToast(ErrorMessage.CreateNotification);
    }
  };

  useEffect(() => {
    if (trackersMeditation && trackerMeditationNotifications.enable) {
      onCreateTriggerNotificationForTrackersMeditationAsync();
    }
  }, [trackersMeditation]);

  useEffect(() => {
    if (trackersTask && trackerTaskNotifications.enable) {
      onCreateTriggerNotificationForTrackersTaskAsync();
    }
  }, [trackersTask]);

  return (
    <GlobalScreen>
      <CenterContainer>
        <HeaderWithBack>
          <TextTitle>Экспорт/импорт</TextTitle>
        </HeaderWithBack>
        <TextInfo>
          10 Экспорт и импорт нужен, если вы собираетесь удалить на какое-то
          время приложение с вашего устройства и в будущем вернуться.
        </TextInfo>
        <TextInfo>
          {`Экспорт - сохраняет медитации и задания, которые вы добавили в избранное, трекеры медитаций и заданий, которые вы создали, и все ваши заметки в ежедневнике. Всё сохраняется в файл "${NAME_FILE_JSON}" на вашем устройстве.`}
        </TextInfo>
        <TextInfo>{`Импорт - позволяет восстановить все вышеперечисленные данные из файла "${NAME_FILE_JSON}".`}</TextInfo>
        <ButtonContainer>
          <TouchableHighlight onPress={exportFile}>Экспорт</TouchableHighlight>
          <TouchableHighlight onPress={importFile}>Импорт</TouchableHighlight>
        </ButtonContainer>
      </CenterContainer>
    </GlobalScreen>
  );
}

const TextTitle = styled.Text`
  font-family: "Poppins-Medium";
  font-size: ${normalize(18)}px;
  color: ${({ theme }) => theme.color.standard};
`;

const TextInfo = styled.Text`
  margin-bottom: 20px;
  font-family: "Poppins-Regular";
  font-size: ${normalize(16)}px;
  line-height: ${normalize(20)}px;
  color: ${({ theme }) => theme.color.standard};
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  gap: ${normalize(10)}px;
  align-items: center;
  justify-content: center;
`;
