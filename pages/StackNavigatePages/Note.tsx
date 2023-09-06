import { styled } from "styled-components/native";
import { CenterContainer } from "../../components/CenterContainer";
import { GlobalScreen } from "../../components/GlobalScreen";
import { TopWithBack } from "../../components/ui/TopWithBack";
import { UndoIcon } from "../../components/icons/UndoIcon";
import { RedoIcon } from "../../components/icons/RedoIcon";
import { CheckIcon } from "../../components/icons/CheckIcon";
import { InputTextareaTransparent } from "../../components/ui/InputTextareaTransparent";
import { InputTransparent } from "../../components/ui/InputTransparent";
import { useEffect, useState } from "react";
import { Subtitle } from "../../components/ui/Titles/Subtitle";
import { Title } from "../../components/ui/Titles/Title";
import { ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { MeditationData } from "../../types";
import { TouchableHighlight } from "../../components/ui/Touchables/TouchableHighlight";
import { TouchableHighlightCard } from "../../components/ui/Touchables/TouchableHighlightCard";

export function Note() {
  const [savePoints, setSavePoints] = useState([]);
  const [meditation, setMeditation] = useState<MeditationData | null>(null);
  const route = useRoute();
  const COLORS = ["#ff6868", "#feed30", "#12fa73", "#54f7f2"];

  useEffect(() => {
    if (route.params) {
      const { meditation } = route.params as { meditation: MeditationData };
      setMeditation(meditation);
    }
    // return () => setSavePoints([]);
  }, []);

  return (
    <GlobalScreen withoutScrollView>
      <CenterContainer>
        <TopWithBack>
          <ToolsContainer>
            <UndoIcon disabled />
            <RedoIcon disabled />
            <CheckIcon />
          </ToolsContainer>
        </TopWithBack>
        <ScrollView showsVerticalScrollIndicator={false}>
          <DateText>22 Августа</DateText>
          <ButtonContainer>
            <TouchableHighlight onPress={() => {}}>
              {meditation ? meditation.title : "kyukyu yu"}
            </TouchableHighlight>
            <TouchableHighlight backgroundColor="#feed30" onPress={() => {}}>
              Эмоция
            </TouchableHighlight>
          </ButtonContainer>
          <TitleInput>Медитация: тонпрост</TitleInput>
          <InputTextareaTransparent
            autoFocus
            placeholder="Начните ввод"
            onChangeText={() => {}}
            height={150}
            borderColor="#feed30"
          />
          <TitleInput>Медитация: тонпрост</TitleInput>
          <InputTextareaTransparent
            placeholder="Начните ввод"
            onChangeText={() => {}}
            height={150}
            borderColor="#feed30"
          />
          <TitleInput>Медитация: тонпрост</TitleInput>
          <InputTextareaTransparent
            placeholder="Начните ввод"
            onChangeText={() => {}}
            height={150}
            borderColor="#feed30"
          />
          <BottomSpace />
        </ScrollView>
      </CenterContainer>
    </GlobalScreen>
  );
}

const ButtonContainer = styled.View`
  justify-content: center;
  flex-direction: row;
  gap: 20px;
  flex-wrap: wrap;
`;

const DateText = styled.Text`
  align-self: flex-end;
  opacity: 0.6;
  font-family: "Poppins-Regular";
  font-size: 14px;
  color: ${({ theme }) => theme.color.standard};
`;

const TitleInput = styled.Text`
  margin: 20px 0;
  font-family: "Poppins-Medium";
  font-size: 24px;
  color: ${({ theme }) => theme.color.standard};
`;

const ToolsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;

const BottomSpace = styled.View`
  height: 250px;
`;
