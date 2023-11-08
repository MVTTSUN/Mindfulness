import { Linking, ScrollView } from "react-native";
import { CenterContainer } from "../../components/CenterContainer";
import { GlobalScreen } from "../../components/GlobalScreenWrapper";
import { HeaderWithBack } from "../../components/ui/headers/HeaderWithBack";
import { styled } from "styled-components/native";
import { TouchableHighlight } from "../../components/ui/touchables/TouchableHighlight";
import { Subtitle } from "../../components/ui/titles/Subtitle";
import { InstagramIcon } from "../../components/svg/icons/socials/InstagramIcon";
import { TelegramIcon } from "../../components/svg/icons/socials/TelegramIcon";
import { VKIcon } from "../../components/svg/icons/socials/VKIcon";
import LottieView from "lottie-react-native";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useLazyGetInfoQuery } from "../../api/api";
import { getDataInfosCopy, getInfos } from "../../store/infosSelectors";
import { useFileSystem } from "../../hooks/useFileSystem";
import { useEffect } from "react";
import deepEqual from "deep-equal";
import { setDataInfosCopy, setInfos } from "../../store/infosSlice";
import { DataInformation } from "../../types";
import { ApiRoute, BASE_URL, NameFolder } from "../../const";
import { normalize } from "../../utils";
import { getIsOffline } from "../../store/offlineSelectors";
import { PulseCircle } from "../../components/ui/PulseCircle";

export function Contacts() {
  const infos = useAppSelector(getInfos);
  const dataInfosCopy = useAppSelector(getDataInfosCopy);
  const isOffline = useAppSelector(getIsOffline);
  const dispatch = useAppDispatch();
  const [getInfoQuery] = useLazyGetInfoQuery();
  const { deleteFile, download, createDirectory } = useFileSystem();

  const downloadData = async () => {
    const { data } = await getInfoQuery();

    if (data) {
      if (!deepEqual(dataInfosCopy, data)) {
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
          <TextTitle>Контакты</TextTitle>
        </HeaderWithBack>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ViewMargin>
            <Subtitle>Психотерапевт</Subtitle>
            <RoundedImage>
              <LottieViewStyled
                source={require("../../assets/lottie/animaRound.json")}
                autoPlay
                loop
              />
              <PulseCircle />
              <ImageStyled source={{ uri: infos.avatarPsycho }} />
            </RoundedImage>
            <TextName>{`${infos.secondNamePsycho} ${infos.firstNamePsycho} ${infos.surnamePsycho}`}</TextName>
          </ViewMargin>
          <Subtitle>Краткая информация</Subtitle>
          <TextInfo>{infos.info}</TextInfo>
          <Subtitle>Мои соцсети</Subtitle>
          <ViewSociety>
            <TouchableHighlight
              isRound
              onPress={() =>
                Linking.openURL(
                  `instagram://user?username=${infos.nicknameInstagram}`
                ).catch(() => {
                  Linking.openURL(
                    `https://www.instagram.com/${infos.nicknameInstagram}`
                  );
                })
              }
            >
              <InstagramIcon />
            </TouchableHighlight>
            <TouchableHighlight
              isRound
              onPress={() =>
                Linking.openURL(`https://t.me/${infos.nicknameTelegram}`)
              }
            >
              <TelegramIcon />
            </TouchableHighlight>
            <TouchableHighlight
              isRound
              onPress={() =>
                Linking.openURL(`https://vk.com/${infos.nicknameVK}`)
              }
            >
              <VKIcon />
            </TouchableHighlight>
          </ViewSociety>
          <ViewMargin>
            <Subtitle>Моя почта</Subtitle>
            <TouchableHighlight
              onPress={() => Linking.openURL(`mailto:${infos.emailPsycho}`)}
            >
              {infos.emailPsycho}
            </TouchableHighlight>
          </ViewMargin>
          <SpaceBottom />
        </ScrollView>
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

const TextInfo = styled.Text`
  font-family: "Poppins-Regular";
  font-size: ${normalize(16)}px;
  color: ${({ theme }) => theme.color.standard};
  text-align: justify;
`;

const ViewSociety = styled.View`
  margin-bottom: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  gap: ${normalize(10)}px;
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

const SpaceBottom = styled.View`
  height: ${normalize(140)}px;
`;
