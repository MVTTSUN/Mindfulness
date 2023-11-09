import { Pressable } from "react-native";
import { GlobalScreen } from "../../components/GlobalScreenWrapper";
import { CenterContainer } from "../../components/CenterContainer";
import { styled } from "styled-components/native";
import { TextIcon } from "../../components/svg/icons/other-icons/TextIcon";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  MeditationPlayer,
  MeditationScreenProp,
  NotesScreenProp,
} from "../../types";
import { LikeIcon } from "../../components/svg/icons/other-icons/LikeIcon";
import { AudioPlayer } from "../../components/ui/AudioPlayer";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useEffect, useRef } from "react";
import {
  addMeditationLike,
  removeMeditationLike,
} from "../../store/likesSlice";
import { HeaderWithBack } from "../../components/ui/headers/HeaderWithBack";
import { AddIcon } from "../../components/svg/icons/other-icons/AddIcon";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from "react-native-reanimated";
import { normalize } from "../../utils";
import {
  getDataMeditationCopy,
  getMeditationInMeditation,
} from "../../store/meditationsSelectors";
import { useLazyGetMeditationQuery } from "../../api/api";
import { useFileSystem } from "../../hooks/useFileSystem";
import deepEqual from "deep-equal";
import {
  setDataMeditationsCopy,
  setMeditationsInMeditation,
} from "../../store/meditationsSlice";
import {
  ApiRoute,
  AppRoute,
  BASE_URL,
  Color,
  ErrorMessage,
  NameFolder,
  SuccessMessage,
  Theme,
} from "../../const";
import { useExpoAudio } from "../../hooks/useExpoAudio";
import { ProgressCircle } from "../../components/ui/progress/ProgressCircle";
import { getIsDownloadAudios } from "../../store/downloadAudioSelectors";
import { getIsLikeMeditation } from "../../store/likesSelectors";
import {
  addDownloadAudio,
  removeDownloadAudio,
} from "../../store/downloadAudioSlice";
import { getIsOffline } from "../../store/offlineSelectors";
import { Tracker } from "../../components/ui/Tracker";
import { getValueTheme } from "../../store/themeSelectors";
import { useToastCustom } from "../../hooks/useToastCustom";

export function Meditation() {
  const route = useRoute();
  const { meditationId } = route.params as { meditationId: string };
  const navigation = useNavigation<MeditationScreenProp & NotesScreenProp>();
  const theme = useAppSelector(getValueTheme);
  const isLike = useAppSelector(getIsLikeMeditation(meditationId));
  const dataMeditationCopy = useAppSelector(
    getDataMeditationCopy(meditationId)
  );
  const meditation = useAppSelector(getMeditationInMeditation(meditationId));
  const isOffline = useAppSelector(getIsOffline);
  const isDownload = useAppSelector(getIsDownloadAudios(meditationId));
  const dispatch = useAppDispatch();
  const statusDownloadAudio = useRef<"download" | "delete" | "inProgress">(
    isDownload ? "delete" : "download"
  );
  const [getMeditationQuery] = useLazyGetMeditationQuery();
  const { deleteFile, download, createDirectory, downloadProgress } =
    useFileSystem();
  const { getAudioDuration } = useExpoAudio();
  const { onErrorToast, onSuccessToast } = useToastCustom();
  const scaleLike = useSharedValue(1);
  const likeStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleLike.value }],
  }));

  const toggleLike = () => {
    scaleLike.value = withSequence(
      withSpring(1),
      withSpring(1.2),
      withSpring(1)
    );
    if (isLike) {
      dispatch(removeMeditationLike(meditation.id));
    } else {
      dispatch(addMeditationLike(meditation.id));
    }
  };

  const downloadOrDeleteAudio = async () => {
    if (statusDownloadAudio.current === "inProgress") {
      return;
    }

    const fileName =
      meditation.url.split("/")[meditation.url.split("/").length - 1];

    if (statusDownloadAudio.current === "download" && !isOffline) {
      try {
        statusDownloadAudio.current = "inProgress";
        const uriAudio = await download(
          meditation.url,
          NameFolder.Meditations + `/${meditationId}`,
          fileName
        );
        dispatch(setMeditationsInMeditation({ ...meditation, url: uriAudio }));
        dispatch(addDownloadAudio(meditationId));
        statusDownloadAudio.current = "delete";
        onSuccessToast(
          SuccessMessage.DownloadMeditation + ` (${meditation.title})`
        );
      } catch {
        onErrorToast(
          ErrorMessage.DownloadMeditation + ` (${meditation.title})`
        );
        statusDownloadAudio.current = "download";
      }
    } else if (statusDownloadAudio.current === "delete") {
      try {
        statusDownloadAudio.current = "inProgress";
        await deleteFile(
          NameFolder.Meditations + `/${meditationId}` + `/${fileName}`
        );
        dispatch(
          setMeditationsInMeditation({
            ...meditation,
            url:
              BASE_URL +
              ApiRoute.Meditations +
              ApiRoute.Filename +
              `/${fileName}`,
          })
        );
        dispatch(removeDownloadAudio(meditationId));
        statusDownloadAudio.current = "download";
        onSuccessToast(
          SuccessMessage.DeleteMeditation + ` (${meditation.title})`
        );
      } catch {
        onErrorToast(ErrorMessage.DeleteMeditation + ` (${meditation.title})`);
        statusDownloadAudio.current = "delete";
      }
    }
  };

  const downloadData = async () => {
    const { data } = await getMeditationQuery(meditationId);

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
          result.url =
            BASE_URL +
            ApiRoute.Meditations +
            ApiRoute.Filename +
            `/${data.audio}`;
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
          dispatch(setMeditationsInMeditation(result));
          dispatch(setDataMeditationsCopy(data));
          dispatch(removeDownloadAudio(meditationId));
        } catch {
          onErrorToast(ErrorMessage.DownloadFile);
        }
      }
    }
  };

  useEffect(() => {
    if (!isOffline) {
      downloadData();
    }
  }, []);

  return (
    <>
      <GlobalScreen>
        <CenterContainer>
          <HeaderWithBack>
            <Pressable
              onPress={() => navigation.navigate(AppRoute.Text, { meditation })}
            >
              <TextIcon />
            </Pressable>
          </HeaderWithBack>
          <PlayerImage source={{ uri: meditation?.artwork }} />
          <TitleLikeDownloadView>
            <TextAudio>{meditation?.title}</TextAudio>
            <LikeDownloadView>
              <Pressable onPress={toggleLike}>
                <Animated.View
                  style={[{ backgroundColor: "transparent" }, likeStyle]}
                >
                  <LikeIcon
                    isActive={isLike}
                    color={
                      theme === Theme.Light
                        ? Color.TextStandard
                        : Color.TextWhite
                    }
                  />
                </Animated.View>
              </Pressable>
              <Pressable onPress={downloadOrDeleteAudio}>
                <ProgressCircle
                  progressDownload={downloadProgress}
                  isDownload={isDownload}
                />
              </Pressable>
            </LikeDownloadView>
          </TitleLikeDownloadView>
          <AudioPlayer
            meditation={meditation}
            duration={meditation?.duration}
          />
          <SpaceBottom />
        </CenterContainer>
      </GlobalScreen>
      <Tracker id={meditationId} title={meditation?.title} />
      <PressableStyled
        onPress={() =>
          navigation.navigate(AppRoute.NotesStack, {
            screen: AppRoute.Notes,
            params: { screen: AppRoute.Note, meditation },
          })
        }
      >
        <ViewPlus>
          <AddIcon />
        </ViewPlus>
      </PressableStyled>
    </>
  );
}

const PressableStyled = styled.Pressable`
  z-index: 5;
  position: absolute;
  right: ${normalize(40)}px;
  bottom: ${normalize(100)}px;
`;

const ViewPlus = styled.View`
  align-items: center;
  justify-content: center;
  width: ${normalize(50)}px;
  height: ${normalize(50)}px;
  border-radius: ${normalize(25)}px;
  background-color: ${Color.TextStandard};
`;

const PlayerImage = styled.Image`
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: ${normalize(20)}px;
  margin: 25px 0 30px;
`;

const TextAudio = styled.Text`
  font-family: "Poppins-Medium";
  font-size: ${normalize(18)}px;
  line-height: ${normalize(30)}px;
  height: ${normalize(31)}px;
  color: ${({ theme }) => theme.color.standard};
`;

const TitleLikeDownloadView = styled.View`
  margin-bottom: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const LikeDownloadView = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 15px;
`;

const SpaceBottom = styled.View`
  height: ${normalize(20)}px;
`;
