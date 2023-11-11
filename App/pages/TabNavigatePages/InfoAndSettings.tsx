import styled from "styled-components/native";
import { CenterContainer } from "../../components/CenterContainer";
import { GlobalScreen } from "../../components/GlobalScreenWrapper";
import { Title } from "../../components/ui/titles/Title";
import { Pressable } from "react-native";
import { ThemeIcon } from "../../components/svg/icons/other-icons/ThemeIcon";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { InfoAndSettingsScreenProp } from "../../types";
import { ContactsIcon } from "../../components/svg/icons/other-icons/ContactsIcon";
import { useCallback, useState } from "react";
import { ThemePopup } from "../../components/ui/popups/ThemePopup";
import { ServiceIcon } from "../../components/svg/icons/other-icons/ServiceIcon";
import { NotificationIcon } from "../../components/svg/icons/other-icons/NotificationIcon";
import { ImportAndExportIcon } from "../../components/svg/icons/other-icons/ImportAndExportIcon";
import { normalize } from "../../utils";
import { OfflineIcon } from "../../components/svg/icons/other-icons/OfflineIcon";
import { Tumbler } from "../../components/ui/inputs/Tumbler";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { getIsOffline } from "../../store/offlineSelectors";
import { setIsOffline } from "../../store/offlineSlice";
import { StorageIcon } from "../../components/svg/icons/other-icons/StorageIcon";
import { AppRoute, NICKNAME_DEVELOPER, VERSION_APP } from "../../const";

export function InfoAndSettings() {
  const [isOpenThemePopup, setIsOpenThemePopup] = useState(false);
  const navigation = useNavigation<InfoAndSettingsScreenProp>();
  const isOffline = useAppSelector(getIsOffline);
  const dispatch = useAppDispatch();

  useFocusEffect(
    useCallback(() => {
      return () => {
        setIsOpenThemePopup(false);
      };
    }, [])
  );

  return (
    <>
      <GlobalScreen>
        <CenterContainer>
          <Title>Настройки</Title>
          <ViewGap>
            <Pressable onPress={() => setIsOpenThemePopup(true)}>
              <ViewLine>
                <ThemeIcon />
                <TextLine>Тема</TextLine>
              </ViewLine>
            </Pressable>
          </ViewGap>
          <ViewGap>
            <Pressable
              onPress={() => navigation.navigate(AppRoute.Notification)}
            >
              <ViewLine>
                <NotificationIcon />
                <TextLine>Уведомления</TextLine>
              </ViewLine>
            </Pressable>
          </ViewGap>
          <ViewGap>
            <Pressable
              onPress={() => navigation.navigate(AppRoute.ImportAndExport)}
            >
              <ViewLine>
                <ImportAndExportIcon />
                <TextLine>Импорт/экспорт</TextLine>
              </ViewLine>
            </Pressable>
            <Pressable onPress={() => navigation.navigate(AppRoute.Storage)}>
              <ViewLine>
                <StorageIcon />
                <TextLine>Хранилище</TextLine>
              </ViewLine>
            </Pressable>
            <ViewLineOffline>
              <ViewIconAndText>
                <OfflineIcon />
                <TextLine>Оффлайн режим</TextLine>
              </ViewIconAndText>
              <Tumbler
                enable={isOffline}
                onChange={() => dispatch(setIsOffline(!isOffline))}
              />
            </ViewLineOffline>
          </ViewGap>
          <Title>Информация</Title>
          <ViewGap>
            <Pressable onPress={() => navigation.navigate(AppRoute.Contacts)}>
              <ViewLine>
                <ContactsIcon />
                <TextLine>Контакты психотерапевта</TextLine>
              </ViewLine>
            </Pressable>
          </ViewGap>
          <ViewGap>
            <Pressable onPress={() => navigation.navigate(AppRoute.Service)}>
              <ViewLine>
                <ServiceIcon />
                <TextLine>Поддержка</TextLine>
              </ViewLine>
            </Pressable>
          </ViewGap>
        </CenterContainer>
      </GlobalScreen>
      <ViewMade>
        <TextMade>{VERSION_APP}</TextMade>
        <TextMade>
          © {new Date().getFullYear()} Made by {NICKNAME_DEVELOPER}
        </TextMade>
      </ViewMade>
      {isOpenThemePopup && (
        <PressableBlur onPress={() => setIsOpenThemePopup(false)}>
          <Pressable>
            <ThemePopup />
          </Pressable>
        </PressableBlur>
      )}
    </>
  );
}

const PressableBlur = styled.Pressable`
  z-index: 10;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.backgroundColor.blur};
`;

const ViewGap = styled.View`
  gap: 20px;
  margin-bottom: 20px;
`;

const ViewLine = styled.View`
  align-items: center;
  flex-direction: row;
  gap: 10px;
`;

const ViewLineOffline = styled.View`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  gap: 10px;
`;

const ViewIconAndText = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const TextLine = styled.Text`
  font-family: "Poppins-Medium";
  font-size: ${normalize(18)}px;
  color: ${({ theme }) => theme.color.standard};
`;

const ViewMade = styled.View`
  z-index: 1;
  padding-top: ${normalize(10)}px;
  height: ${normalize(122)}px;
  align-items: center;
  background-color: ${({ theme }) => theme.backgroundColor.main};
`;

const TextMade = styled.Text`
  font-family: "Poppins-Regular";
  font-size: ${normalize(14)}px;
  line-height: ${normalize(18)}px;
  color: ${({ theme }) => theme.color.standard};
`;
