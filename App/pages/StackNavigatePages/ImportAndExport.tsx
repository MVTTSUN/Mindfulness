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
import { NAME_FILE_JSON } from "../../const";
import { useFileSystem } from "../../hooks/useFileSystem";

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

  const exportFile = async () => {
    const data = { likes, notes, trackers };

    await exportFileJSON(data);
  };

  const importFile = async () => {
    const parsedData = await importFileJSON();

    if (
      JSON.stringify(parsedData.likes) !== JSON.stringify({}) ||
      parsedData.notes.length !== 0 ||
      JSON.stringify(parsedData.trackers) !== JSON.stringify({})
    ) {
      dispatch(setLikes(parsedData.likes));
      dispatch(setNotes(parsedData.notes));
      dispatch(setTrackers(parsedData.trackers));
    }
  };

  useEffect(() => {
    if (trackersMeditation && trackerMeditationNotifications.enable) {
      onCreateTriggerNotificationForTrackersMeditation(
        trackerMeditationNotifications.hours,
        trackerMeditationNotifications.minutes
      );
    }
  }, [trackersMeditation]);

  useEffect(() => {
    if (trackersTask && trackerTaskNotifications.enable) {
      onCreateTriggerNotificationForTrackersTask(
        trackerTaskNotifications.hours,
        trackerTaskNotifications.minutes
      );
    }
  }, [trackersTask]);

  return (
    <GlobalScreen>
      <CenterContainer>
        <HeaderWithBack>
          <TextTitle>Импорт/экспорт</TextTitle>
        </HeaderWithBack>
        <TextInfo>
          {`Экспортируются только избранные медитации и задания, трекеры медитаций
          и заданий, и ежедневник. Файл будет иметь такой вид: "${NAME_FILE_JSON}"`}
        </TextInfo>
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
  text-align: justify;
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
