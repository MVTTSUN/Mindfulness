import { Linking, ScrollView } from "react-native";
import { CenterContainer } from "../../components/CenterContainer";
import { GlobalScreen } from "../../components/GlobalScreenWrapper";
import { HeaderWithBack } from "../../components/ui/headers/HeaderWithBack";
import { styled } from "styled-components/native";
import { Subtitle } from "../../components/ui/titles/Subtitle";
import { TouchableHighlight } from "../../components/ui/touchables/TouchableHighlight";
import LottieView from "lottie-react-native";
import { useAppSelector } from "../../hooks/useAppSelector";
import { getDataInfosCopy, getInfos } from "../../store/infosSelectors";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useLazyGetInfoQuery } from "../../api/api";
import { useFileSystem } from "../../hooks/useFileSystem";
import { useEffect } from "react";
import deepEqual from "deep-equal";
import { ApiRoute, BASE_URL, ErrorMessage, NameFolder } from "../../const";
import { DataInformation } from "../../types";
import { setDataInfosCopy, setInfos } from "../../store/infosSlice";
import { normalize } from "../../utils";
import { getIsOffline } from "../../store/offlineSelectors";
import { PulseCircle } from "../../components/ui/animate-elements/PulseCircle";
import { useToastCustom } from "../../hooks/useToastCustom";
import { Preloader } from "../../components/ui/animate-elements/Preloader";

export function Service() {
  const infos = useAppSelector(getInfos);
  const dataInfosCopy = useAppSelector(getDataInfosCopy);
  const isOffline = useAppSelector(getIsOffline);
  const dispatch = useAppDispatch();
  const [getInfoQuery] = useLazyGetInfoQuery();
  const { deleteFile, download, createDirectory } = useFileSystem();
  const { onErrorToast } = useToastCustom();

  const downloadData = async () => {
    const { data } = await getInfoQuery();

    if (data) {
      if (!deepEqual(dataInfosCopy, data)) {
        try {
          await deleteFile(NameFolder.Infos);
          await createDirectory(NameFolder.Infos);
          const result = JSON.parse(JSON.stringify(data[0])) as DataInformation;
          const uriAvatarPsycho = await download(
            BASE_URL +
              ApiRoute.Info +
              ApiRoute.Filename +
              `/${result.avatarPsycho}`,
            NameFolder.Infos,
            result.avatarPsycho
          );
          const uriAvatarDevelop = await download(
            BASE_URL +
              ApiRoute.Info +
              ApiRoute.Filename +
              `/${result.avatarDevelop}`,
            NameFolder.Infos,
            result.avatarDevelop
          );
          if (uriAvatarPsycho) {
            result.avatarPsycho = uriAvatarPsycho;
          }
          if (uriAvatarDevelop) {
            result.avatarDevelop = uriAvatarDevelop;
          }
          dispatch(setInfos(result));
          dispatch(setDataInfosCopy(data));
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
    <GlobalScreen withoutScrollView>
      <CenterContainer>
        <HeaderWithBack>
          <TextTitle>Поддержка</TextTitle>
        </HeaderWithBack>
        {!Object.keys(infos).length && <Preloader />}
        {!!Object.keys(infos).length && (
          <ScrollView showsVerticalScrollIndicator={false}>
            <ViewMargin>
              <Subtitle>Разработчик приложения</Subtitle>
              <RoundedImage>
                <LottieViewStyled
                  source={require("../../assets/lottie/animaRound.json")}
                  autoPlay
                  loop
                />
                <PulseCircle />
                {infos && <ImageStyled source={{ uri: infos.avatarDevelop }} />}
              </RoundedImage>
              <TextName>{`${infos.secondNameDevelop} ${infos.firstNameDevelop} ${infos.surnameDevelop}`}</TextName>
            </ViewMargin>
            <Subtitle>Нашли баги или есть предложения по улучшению?</Subtitle>
            <TouchableHighlight
              onPress={() => Linking.openURL(`mailto:${infos.emailDevelop}`)}
            >
              {infos.emailDevelop}
            </TouchableHighlight>
          </ScrollView>
        )}
      </CenterContainer>
    </GlobalScreen>
  );
}

const TextTitle = styled.Text`
  font-family: "Poppins-Medium";
  font-size: ${normalize(18)}px;
  color: ${({ theme }) => theme.color.standard};
`;

const TextName = styled.Text`
  align-self: center;
  font-family: "Poppins-Regular";
  font-size: ${normalize(14)}px;
  color: ${({ theme }) => theme.color.standard};
`;

const ViewMargin = styled.View`
  margin-bottom: 20px;
`;

const RoundedImage = styled.View`
  margin-bottom: 15px;
  align-self: center;
  justify-content: center;
  align-items: center;
  height: ${normalize(95)}px;
  width: ${normalize(95)}px;
`;

const ImageStyled = styled.Image`
  height: ${normalize(80)}px;
  width: ${normalize(80)}px;
  border-radius: ${normalize(50)}px;
`;

const LottieViewStyled = styled(LottieView)`
  position: absolute;
  height: ${normalize(155)}px;
  width: ${normalize(155)}px;
`;
