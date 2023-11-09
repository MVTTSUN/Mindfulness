import styled from "styled-components/native";
import { CenterContainer } from "../../components/CenterContainer";
import { GlobalScreen } from "../../components/GlobalScreenWrapper";
import { HeaderWithBack } from "../../components/ui/headers/HeaderWithBack";
import { bytesFormatTo, normalize } from "../../utils";
import { useFileSystem } from "../../hooks/useFileSystem";
import { ApiRoute, BASE_URL, Color, ErrorMessage, SuccessMessage } from "../../const";
import { useEffect, useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useAppSelector } from "../../hooks/useAppSelector";
import { getDownloadMeditations } from "../../store/meditationsSelectors";
import { TouchableHighlight } from "../../components/ui/touchables/TouchableHighlight";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { clearDownloadAudio } from "../../store/downloadAudioSlice";
import { MeditationPlayer } from "../../types";
import { setMeditationsInMeditation } from "../../store/meditationsSlice";
import { useToastCustom } from "../../hooks/useToastCustom";

export function Storage() {
  const [totalCapacityState, setTotalCapacityState] = useState<
    number | undefined
  >(0);
  const [freeCapacityState, setFreeCapacityState] = useState<
    number | undefined
  >(0);
  const [meditationsCapacityState, setMeditationsCapacityState] = useState<
    number | undefined
  >(0);
  const downloadMeditations = useAppSelector(getDownloadMeditations);
  const dispatch = useAppDispatch();
  const {
    getFreeCapacity,
    getTotalCapacity,
    getDownloadCapacityMeditations,
    deleteAllMeditations,
  } = useFileSystem();
  const { onErrorToast, onSuccessToast } = useToastCustom();
  const sizeWithoutAudio = useSharedValue(0);
  const lineWithoutAudio = useAnimatedStyle(() => ({
    width: `${sizeWithoutAudio.value}%`,
  }));
  const sizeAudio = useSharedValue(0);
  const lineAudio = useAnimatedStyle(() => ({
    width: `${sizeAudio.value}%`,
  }));

  const getFreeCapacityInState = async () => {
    const freeCapacity = await getFreeCapacity();
    setFreeCapacityState(freeCapacity);

    return freeCapacity;
  };

  const getTotalCapacityInState = async () => {
    const totalCapacity = await getTotalCapacity();
    setTotalCapacityState(totalCapacity);

    return totalCapacity;
  };

  const setSizeLineBarWithoutAudio = async () => {
    try {
      const meditationsCapacity = await getDownloadCapacityMeditations(
        downloadMeditations
      );
      const totalCapacity = await getTotalCapacityInState();
      const freeCapacity = await getFreeCapacityInState();

      if (totalCapacity && freeCapacity && meditationsCapacity !== undefined) {
        sizeWithoutAudio.value = withTiming(
          (totalCapacity - freeCapacity - meditationsCapacity) /
            (totalCapacity / 100),
          { duration: 500 }
        );
      }
    } catch {
      onErrorToast(ErrorMessage.CapacityWithoutAudios);
    }
  };

  const getAudiosCapacityInState = async () => {
    try {
      const meditationsCapacity = await getDownloadCapacityMeditations(
        downloadMeditations
      );
      const totalCapacity = await getTotalCapacityInState();

      setMeditationsCapacityState(meditationsCapacity);

      if (meditationsCapacity !== undefined && totalCapacity) {
        sizeAudio.value = withTiming(
          meditationsCapacity / (totalCapacity / 100),
          { duration: 500 }
        );
      }
    } catch {
      onErrorToast(ErrorMessage.CapacityAudios);
    }
  };

  const deleteMeditations = async () => {
    try {
      const downloadMeditationsCopy = JSON.parse(
        JSON.stringify(downloadMeditations)
      ) as MeditationPlayer[];
      await deleteAllMeditations(downloadMeditations);
      for (const meditation of downloadMeditationsCopy) {
        const fileName =
          meditation.url.split("/")[meditation.url.split("/").length - 1];
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
      }
      dispatch(clearDownloadAudio());
      onSuccessToast(SuccessMessage.DeleteAllMeditations);
    } catch {
      onErrorToast(ErrorMessage.DeleteFile);
    }
  };

  useEffect(() => {
    if (downloadMeditations.length === 0) {
      setSizeLineBarWithoutAudio();
      getAudiosCapacityInState();
    }
  }, [downloadMeditations]);

  useEffect(() => {
    setSizeLineBarWithoutAudio();
    getAudiosCapacityInState();
  }, []);

  return (
    <GlobalScreen>
      <CenterContainer>
        <HeaderWithBack>
          <TextTitle>Хранилище</TextTitle>
        </HeaderWithBack>
        <Container>
          <InfoContainer>
            <RoundInfo $backgroundColor={Color.Error} />
            <TextInfo>Всего места</TextInfo>
            <CapacityInfo>{bytesFormatTo(totalCapacityState)}</CapacityInfo>
          </InfoContainer>
          <InfoContainer>
            <RoundInfo $backgroundColor={Color.Task} />
            <TextInfo>Свободно</TextInfo>
            <CapacityInfo>{bytesFormatTo(freeCapacityState)}</CapacityInfo>
          </InfoContainer>
          <InfoContainer>
            <RoundInfo $backgroundColor={Color.Primary} />
            <TextInfo>Остальные приложения</TextInfo>
            <CapacityInfo>
              {freeCapacityState &&
                (meditationsCapacityState || meditationsCapacityState === 0) &&
                totalCapacityState &&
                bytesFormatTo(
                  totalCapacityState -
                    freeCapacityState -
                    meditationsCapacityState
                )}
            </CapacityInfo>
          </InfoContainer>
          <InfoContainer>
            <RoundInfo $backgroundColor={Color.Meditation} />
            <TextInfo>Медитации</TextInfo>
            <CapacityInfo>
              {bytesFormatTo(meditationsCapacityState)}
            </CapacityInfo>
          </InfoContainer>
          <ContainerLineBar>
            <LineWithoutAudio style={lineWithoutAudio} />
            <LineAudio style={lineAudio} />
          </ContainerLineBar>
          <TouchableHighlight onPress={deleteMeditations}>
            Удалить все медитации
          </TouchableHighlight>
        </Container>
      </CenterContainer>
    </GlobalScreen>
  );
}

const Container = styled.View`
  gap: ${normalize(10)}px;
`;

const TextTitle = styled.Text`
  font-family: "Poppins-Medium";
  font-size: ${normalize(18)}px;
  color: ${({ theme }) => theme.color.standard};
`;

const InfoContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${normalize(5)}px;
`;

const RoundInfo = styled.View<{ $backgroundColor: string }>`
  transform: translateY(${normalize(-2)}px);
  width: ${normalize(14)}px;
  height: ${normalize(14)}px;
  border-radius: ${normalize(7)}px;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
`;

const TextInfo = styled.Text`
  width: ${normalize(170)}px;
  font-family: "Poppins-Regular";
  font-size: ${normalize(14)}px;
  color: ${({ theme }) => theme.color.standard};
`;

const CapacityInfo = styled.Text`
  font-family: "Poppins-Regular";
  font-size: ${normalize(14)}px;
  color: ${({ theme }) => theme.color.standard};
`;

const ContainerLineBar = styled.View`
  flex-direction: row;
  overflow: hidden;
  height: ${normalize(8)}px;
  border-radius: ${normalize(4)}px;
  background-color: ${({ theme }) => `${theme.color.standard}40`};
`;

const LineWithoutAudio = styled(Animated.View)`
  height: 100%;
  background-color: ${Color.Primary};
`;

const LineAudio = styled(Animated.View)`
  height: 100%;
  background-color: ${Color.Meditation};
`;
