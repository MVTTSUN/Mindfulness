import { useRoute } from "@react-navigation/native";
import { CenterContainer } from "../../components/CenterContainer";
import { GlobalScreen } from "../../components/GlobalScreenWrapper";
import { HeaderWithBack } from "../../components/ui/headers/HeaderWithBack";
import { styled } from "styled-components/native";
import { ScrollView } from "react-native";
import { useEffect } from "react";
import { normalize } from "../../utils";
import { useLazyGetMeditationQuery } from "../../api/api";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  getDataMeditationCopy,
  getMeditationInMeditation,
} from "../../store/meditationsSelectors";
import deepEqual from "deep-equal";
import { ApiRoute, BASE_URL, ErrorMessage, NameFolder } from "../../const";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useFileSystem } from "../../hooks/useFileSystem";
import { MeditationPlayer } from "../../types";
import { useExpoAudio } from "../../hooks/useExpoAudio";
import {
  setDataMeditationsCopy,
  setMeditationsInMeditation,
} from "../../store/meditationsSlice";
import { useToastCustom } from "../../hooks/useToastCustom";
import { getIsOffline } from "../../store/offlineSelectors";
import { Preloader } from "../../components/ui/animate-elements/Preloader";
import TrackPlayer, {
  State,
  usePlaybackState,
} from "react-native-track-player";
import { getLastMeditation } from "../../store/trackPlayerSelectors";
import { getIsDownloadAudios } from "../../store/downloadAudioSelectors";
import { setLastMeditation } from "../../store/trackPlayerSlice";

export function MeditationNote() {
  const route = useRoute();
  const { meditationId } = route.params as { meditationId: string };
  const dataMeditationCopy = useAppSelector(
    getDataMeditationCopy(meditationId)
  );
  const meditation = useAppSelector(getMeditationInMeditation(meditationId));
  const lastMeditation = useAppSelector(getLastMeditation);
  const isOffline = useAppSelector(getIsOffline);
  const isDownload = useAppSelector(getIsDownloadAudios(meditationId));
  const dispatch = useAppDispatch();
  const playbackState = usePlaybackState();
  const [getMeditationQuery] = useLazyGetMeditationQuery();
  const { deleteFile, download, createDirectory } = useFileSystem();
  const { getAudioDuration } = useExpoAudio();
  const { onErrorToast } = useToastCustom();

  const downloadData = async () => {
    const { data } = await getMeditationQuery({
      id: meditationId,
      isStatistics: false,
    });

    if (data) {
      if (!deepEqual(data, dataMeditationCopy)) {
        try {
          await deleteFile(NameFolder.Meditations + `/${meditationId}`);
          await createDirectory(NameFolder.Meditations + `/${meditationId}`);
          const result = {} as MeditationPlayer;
          result.title = data.title;
          result.kind = data.kind;
          result.artist = "Mindfulness";
          result.textLines = data.textLines;
          result.title = data.title;
          result.id = data._id;
          const duration = await getAudioDuration(
            BASE_URL +
              ApiRoute.Meditations +
              ApiRoute.Filename +
              `/${data.audio}`
          );
          if (duration) {
            result.duration = duration;
          }
          if (isDownload) {
            result.url = await download(
              BASE_URL +
                ApiRoute.Meditations +
                ApiRoute.Filename +
                `/${data.audio}`,
              NameFolder.Meditations + `/${meditationId}`,
              data.audio
            );
          } else {
            result.url =
              BASE_URL +
              ApiRoute.Meditations +
              ApiRoute.Filename +
              `/${data.audio}`;
          }
          const uriImage = await download(
            BASE_URL +
              ApiRoute.Meditations +
              ApiRoute.Filename +
              `/${data.image}`,
            NameFolder.Meditations + `/${meditationId}`,
            data.image
          );
          if (uriImage) {
            result.artwork = uriImage;
          }
          dispatch(setLastMeditation(result));
          dispatch(setMeditationsInMeditation(result));
          dispatch(setDataMeditationsCopy(data));
        } catch {
          onErrorToast(ErrorMessage.DownloadFile);
        }
      }
    }
  };

  useEffect(() => {
    if (playbackState.state === State.Playing && lastMeditation) {
      TrackPlayer.reset();
      TrackPlayer.add([lastMeditation]);
    }
  }, [lastMeditation]);

  useEffect(() => {
    if (!isOffline) {
      downloadData();
    }
  }, []);

  return (
    <GlobalScreen withoutScrollView>
      <CenterContainer>
        <HeaderWithBack>
          <TextTitle numberOfLines={2} ellipsizeMode="tail">
            {meditation && meditation.title}
          </TextTitle>
        </HeaderWithBack>
        {!meditation && <Preloader />}
        <ScrollView showsVerticalScrollIndicator={false}>
          <Container>
            {meditation &&
              meditation.textLines?.map((textLine, index) => {
                return <TextNode key={index}>{textLine.text}</TextNode>;
              })}
          </Container>
        </ScrollView>
      </CenterContainer>
    </GlobalScreen>
  );
}

const TextTitle = styled.Text`
  text-align: right;
  width: 90%;
  font-family: "Poppins-Medium";
  font-size: ${normalize(18)}px;
  color: ${({ theme }) => theme.color.standard};
`;

const Container = styled.View`
  gap: 8px;
  margin-bottom: ${normalize(390)}px;
`;

const TextNode = styled.Text`
  font-family: "Poppins-Regular";
  font-size: ${normalize(18)}px;
  line-height: ${normalize(22)}px;
  color: ${({ theme }) => theme.color.standard};
`;
