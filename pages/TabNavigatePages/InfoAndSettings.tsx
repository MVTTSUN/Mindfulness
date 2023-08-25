import styled from "styled-components/native";
import { CenterContainer } from "../../components/CenterContainer";
import { GlobalScreen } from "../../components/GlobalScreen";
import { Title } from "../../components/ui/Titles/Title";
import { Pressable } from "react-native";
import { ThemeIcon } from "../../components/icons/ThemeIcon";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { InfoAndSettingsScreenProp } from "../../types";
import { ContactsIcon } from "../../components/icons/ContactsIcon";
import { useCallback, useEffect, useState } from "react";
import { ThemePopup } from "../../components/ThemePopup";

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
          <Title>Информация</Title>
          <ViewGap>
            <Pressable onPress={() => {}}>
              <ViewLine>
                <ContactsIcon />
                <TextLine>Контакты</TextLine>
              </ViewLine>
            </Pressable>
          </ViewGap>
        </CenterContainer>
      </GlobalScreen>
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
