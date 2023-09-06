import styled from "styled-components/native";
import { CenterContainer } from "../../components/CenterContainer";
import { GlobalScreen } from "../../components/GlobalScreen";
import { Title } from "../../components/ui/Titles/Title";
import { Dimensions, Image, Linking, Pressable } from "react-native";
import { ThemeIcon } from "../../components/icons/ThemeIcon";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { InfoAndSettingsScreenProp } from "../../types";
import { ContactsIcon } from "../../components/icons/ContactsIcon";
import { useCallback, useEffect, useState } from "react";
import { ThemePopup } from "../../components/ThemePopup";
import { Subtitle } from "../../components/ui/Titles/Subtitle";
import { TouchableHighlight } from "../../components/ui/Touchables/TouchableHighlight";
import { InstagramIcon } from "../../components/icons/Socials/InstagramIcon";
import { TelegramIcon } from "../../components/icons/Socials/TelegramIcon";
import { VKIcon } from "../../components/icons/Socials/VKIcon";
import { ServiceIcon } from "../../components/icons/ServiceIcon";
import { NotificationIcon } from "../../components/icons/NotificationIcon";
import { ImportAndExportIcon } from "../../components/icons/ImportAndExportIcon";

export function InfoAndSettings() {
  const navigation = useNavigation<InfoAndSettingsScreenProp>();
  const [isOpenThemePopup, setIsOpenThemePopup] = useState(false);

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
            <Pressable onPress={() => navigation.navigate("Notification")}>
              <ViewLine>
                <NotificationIcon />
                <TextLine>Уведомления</TextLine>
              </ViewLine>
            </Pressable>
          </ViewGap>
          <ViewGap>
            <Pressable onPress={() => navigation.navigate("ImportAndExport")}>
              <ViewLine>
                <ImportAndExportIcon />
                <TextLine>Импорт/экспорт</TextLine>
              </ViewLine>
            </Pressable>
          </ViewGap>
          <Title>Информация</Title>
          <ViewGap>
            <Pressable onPress={() => navigation.navigate("Contacts")}>
              <ViewLine>
                <ContactsIcon />
                <TextLine>Контакты психотерапевта</TextLine>
              </ViewLine>
            </Pressable>
          </ViewGap>
          <ViewGap>
            <Pressable onPress={() => navigation.navigate("Service")}>
              <ViewLine>
                <ServiceIcon />
                <TextLine>Поддержка</TextLine>
              </ViewLine>
            </Pressable>
          </ViewGap>
        </CenterContainer>
      </GlobalScreen>
      <ViewMade>
        <TextMade>© {new Date().getFullYear()} Made by MVTTSUN</TextMade>
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
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 20px;
`;

const ViewLine = styled.View`
  align-items: center;
  flex-direction: row;
  gap: 10px;
`;

const TextLine = styled.Text`
  font-family: "Poppins-Medium";
  font-size: 18px;
  color: ${({ theme }) => theme.color.standard};
`;

const ViewMade = styled.View`
  padding-top: 7px;
  height: 100px;
  align-items: center;
  background-color: ${({ theme }) => theme.backgroundColor.main};
`;

const TextMade = styled.Text`
  font-family: "Poppins-Regular";
  font-size: 14px;
`;
