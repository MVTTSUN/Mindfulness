import { styled } from "styled-components/native";
import { CenterContainer } from "../../components/CenterContainer";
import { GlobalScreen } from "../../components/GlobalScreen";
import { TopWithBack } from "../../components/ui/TopWithBack";
import { UndoIcon } from "../../components/icons/UndoIcon";
import { RedoIcon } from "../../components/icons/RedoIcon";
import { CheckIcon } from "../../components/icons/CheckIcon";
import { InputTextareaTransparent } from "../../components/ui/InputTextareaTransparent";
import { InputTransparent } from "../../components/ui/InputTransparent";
import { useEffect, useRef, useState } from "react";
import { Subtitle } from "../../components/ui/Titles/Subtitle";
import { Title } from "../../components/ui/Titles/Title";
import { Dimensions, FlatList, Keyboard, ScrollView, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import { DataInput, MeditationData } from "../../types";
import { TouchableHighlight } from "../../components/ui/Touchables/TouchableHighlight";
import { MeditationsAndTasksPopup } from "../../components/MeditationsAndTasksPopup";
import { Pressable } from "react-native";
import { COLORS, DATA_INPUTS_NOTE } from "../../const";
import { setNotes } from "../../store/notesSlice";
import { EmotionsPopup } from "../../components/EmotionsPopup";

export function Note() {
  const [typeEmotions, setTypeEmotions] = useState("");
  const [savePoints, setSavePoints] = useState([]);
  const route = useRoute();
  const flatListRef = useRef<FlatList>(null);
  const [nameNote, setNameNote] = useState("");
  const [emotionsBefore, setEmotionsBefore] = useState<string[]>([]);
  const [emotionsAfter, setEmotionsAfter] = useState<string[]>([]);
  const [isOpenMeditationAndTasksPopup, setIsOpenMeditationAndTasksPopup] =
    useState(false);
  const [isOpenEmotionsPopup, setIsOpenEmotionsPopup] = useState(false);
  const [color, setColor] = useState(COLORS.textColors.normal);
  const [backgroundColor, setBackgroundColor] = useState(
    COLORS.mainColors.normal
  );
  const [underlayColor, setUnderlayColor] = useState(
    COLORS.mainColors.normalPressed
  );
  const dateOption: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const setNameNoteHandle = (
    nameNote: string,
    backgroundColor: string,
    underlayColor: string,
    color: string
  ) => {
    setNameNote(nameNote);
    setBackgroundColor(backgroundColor);
    setColor(color);
    setUnderlayColor(underlayColor);
    setIsOpenMeditationAndTasksPopup(false);
  };

  const onTouchEnd = (id: number) => {
    flatListRef.current?.scrollToIndex({ animated: false, index: id });
  };

  useEffect(() => {
    if (route.params) {
      const { meditation } = route.params as { meditation: MeditationData };

      if (meditation) {
        setColor(COLORS.textColors.meditationCard);
        setBackgroundColor(COLORS.backgroundColors.meditationCard);
        setUnderlayColor(COLORS.backgroundColors.meditationCardPressed);
        setNameNote(`Медитация: ${meditation.title}`);
      }
    }

    // return () => setSavePoints([]);
  }, []);

  return (
    <>
      <GlobalScreen withoutScrollView>
        <CenterContainer>
          <TopWithBack>
            <ToolsContainer>
              <UndoIcon disabled />
              <RedoIcon disabled />
              <CheckIcon />
            </ToolsContainer>
          </TopWithBack>
          <FlatList
            ref={flatListRef}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => {
              return (
                <>
                  <DateText>
                    {new Intl.DateTimeFormat("ru", dateOption)
                      .format(new Date())
                      .replace(" г.", "")}
                  </DateText>
                  <ButtonContainer>
                    <TouchableHighlight
                      backgroundColor={backgroundColor}
                      underlayColor={underlayColor}
                      color={color}
                      onPress={() => setIsOpenMeditationAndTasksPopup(true)}
                    >
                      Медитация или задание
                    </TouchableHighlight>
                    {nameNote && <TextStyled>{nameNote}</TextStyled>}
                    <TouchableHighlight
                      backgroundColor={backgroundColor}
                      underlayColor={underlayColor}
                      color={color}
                      onPress={() => {
                        setIsOpenEmotionsPopup(true);
                        setTypeEmotions("before");
                      }}
                    >
                      Настроение до медитации или задания
                    </TouchableHighlight>
                    {!!emotionsBefore.length && (
                      <TextStyled>
                        {`Настроение до: ${emotionsBefore
                          .join(", ")
                          .toLowerCase()}`}
                      </TextStyled>
                    )}
                    <TouchableHighlight
                      backgroundColor={backgroundColor}
                      underlayColor={underlayColor}
                      color={color}
                      onPress={() => {
                        setIsOpenEmotionsPopup(true);
                        setTypeEmotions("after");
                      }}
                    >
                      Настроение после медитации или задания
                    </TouchableHighlight>
                    {!!emotionsAfter.length && (
                      <TextStyled>
                        {`Настроение после: ${emotionsAfter
                          .join(", ")
                          .toLowerCase()}`}
                      </TextStyled>
                    )}
                  </ButtonContainer>
                </>
              );
            }}
            data={DATA_INPUTS_NOTE}
            renderItem={({ item }) => {
              const { title, id } = item as unknown as DataInput;

              return (
                <>
                  <TitleInput>{title}</TitleInput>
                  <InputTextareaTransparent
                    onTouchEnd={() => onTouchEnd(id - 1)}
                    placeholder="Начните ввод"
                    onChangeText={() => {}}
                    height={150}
                    borderColor={backgroundColor}
                  />
                </>
              );
            }}
            keyExtractor={(item) => {
              const { id } = item as unknown as DataInput;

              return String(id);
            }}
            ListFooterComponent={() => {
              return <BottomSpace />;
            }}
          />
        </CenterContainer>
      </GlobalScreen>
      {isOpenMeditationAndTasksPopup && (
        <Blur onPress={() => setIsOpenMeditationAndTasksPopup(false)}>
          <PressableStyled>
            <MeditationsAndTasksPopup
              nameNote={nameNote}
              setNameNote={setNameNoteHandle}
            />
          </PressableStyled>
        </Blur>
      )}
      {isOpenEmotionsPopup && (
        <Blur onPress={() => setIsOpenEmotionsPopup(false)}>
          <PressableStyled>
            <EmotionsPopup
              backgroundColor={backgroundColor}
              color={color}
              typeEmotions={typeEmotions}
              emotionsBefore={emotionsBefore}
              setEmotionsBefore={setEmotionsBefore}
              emotionsAfter={emotionsAfter}
              setEmotionsAfter={setEmotionsAfter}
            />
          </PressableStyled>
        </Blur>
      )}
    </>
  );
}

const PressableStyled = styled.Pressable`
  height: 70%;
  width: 70%;
`;

const Blur = styled.Pressable`
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.backgroundColor.blur};
`;

const ButtonContainer = styled.View`
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const DateText = styled.Text`
  align-self: flex-end;
  opacity: 0.6;
  font-family: "Poppins-Regular";
  font-size: 14px;
  line-height: 18px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.color.standard};
`;

const TitleInput = styled.Text`
  margin: 10px 0;
  font-family: "Poppins-Medium";
  font-size: 20px;
  color: ${({ theme }) => theme.color.standard};
`;

const ToolsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;

const BottomSpace = styled.View`
  height: ${(Dimensions.get("window").height / 100) * 50}px;
`;

const TextStyled = styled.Text`
  text-align: center;
  font-family: "Poppins-Regular";
  font-size: 16px;
  line-height: 20px;
  color: ${({ theme }) => theme.color.standard};
`;
