import { styled } from "styled-components/native";
import { CenterContainer } from "../../components/CenterContainer";
import { GlobalScreen } from "../../components/GlobalScreen";
import { TopWithBack } from "../../components/ui/TopWithBack";
import { CheckIcon } from "../../components/icons/CheckIcon";
import { InputTextareaTransparent } from "../../components/ui/InputTextareaTransparent";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { AppState, Dimensions, FlatList, Pressable } from "react-native";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import {
  DataInput,
  MeditationData,
  NoteType,
  NotesScreenProp,
  TaskType,
} from "../../types";
import { TouchableHighlight } from "../../components/ui/Touchables/TouchableHighlight";
import { MeditationsAndTasksPopup } from "../../components/MeditationsAndTasksPopup";
import { COLORS, DATA_INPUTS_NOTE } from "../../const";
import { EmotionsPopup } from "../../components/EmotionsPopup";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { addNote, removeNotes, updateNote } from "../../store/notesSlice";

function Note() {
  const [isRenderOne, setIsRenderOne] = useState(false);
  const [id, setId] = useState<string | null>(null);
  const [createdAt, setCreatedAt] = useState<string>("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [typeEmotions, setTypeEmotions] = useState("");
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
  const [texts, setTexts] = useState(["", "", "", ""]);
  const navigation = useNavigation<NotesScreenProp>();
  const dispatch = useAppDispatch();
  const dataAfterUnmount = useRef({
    id,
    emotionsAfter,
    emotionsBefore,
    title: nameNote,
    texts,
    color,
    backgroundColor,
    underlayColor,
    createdAt,
  });
  const isUpdateAfterUnmount = useRef(isUpdate);
  const isNavigated = useRef(false);
  const prevStateAfterUnmount = useRef(dataAfterUnmount.current);

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

  const back = () => {
    isNavigated.current = true;
    navigation.goBack();
  };

  const onTouchEnd = (id: number) => {
    flatListRef.current?.scrollToIndex({ animated: false, index: id });
  };

  const addNoteHandle = () => {
    const { emotionsAfter, emotionsBefore, texts, id } =
      dataAfterUnmount.current;

    if (
      ((emotionsAfter.length !== 0 ||
        emotionsBefore.length !== 0 ||
        texts.some((text) => text !== "")) &&
        !isUpdateAfterUnmount.current) ||
      (prevStateAfterUnmount.current !== dataAfterUnmount.current &&
        isUpdateAfterUnmount.current)
    ) {
      if (isUpdateAfterUnmount.current) {
        dispatch(updateNote(dataAfterUnmount.current));
      } else {
        dispatch(addNote(dataAfterUnmount.current));
      }
    }

    if (
      emotionsAfter.length === 0 &&
      emotionsBefore.length === 0 &&
      texts.every((text) => text === "")
    ) {
      dispatch(removeNotes([id]));
    }
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        if (!isNavigated.current) {
          navigation.replace("Notes");
        }
      };
    }, [])
  );

  useEffect(() => {
    isUpdateAfterUnmount.current = isUpdate;
  }, [isUpdate]);

  useEffect(() => {
    dataAfterUnmount.current = {
      id,
      emotionsAfter,
      emotionsBefore,
      title: nameNote,
      texts,
      color,
      backgroundColor,
      underlayColor,
      createdAt,
    };

    if (isUpdate && isRenderOne) {
      prevStateAfterUnmount.current = dataAfterUnmount.current;
      setIsRenderOne(false);
    }
  }, [
    emotionsAfter,
    emotionsBefore,
    nameNote,
    texts,
    color,
    backgroundColor,
    underlayColor,
    id,
    createdAt,
  ]);

  useEffect(() => {
    if (route.params) {
      const { meditation } = route.params as { meditation: MeditationData };
      const { task } = route.params as { task: TaskType };
      const { note } = route.params as { note: NoteType };

      if (meditation) {
        setColor(COLORS.textColors.meditationCard);
        setBackgroundColor(COLORS.backgroundColors.meditationCard);
        setUnderlayColor(COLORS.backgroundColors.meditationCardPressed);
        setNameNote(`Медитация: ${meditation.title}`);
      }

      if (task) {
        setColor(COLORS.textColors.taskCard);
        setBackgroundColor(COLORS.backgroundColors.taskCard);
        setUnderlayColor(COLORS.backgroundColors.taskCardPressed);
        setNameNote(`Задание: ${task.title}`);
      }

      if (note) {
        setIsUpdate(true);
        setId(note.id);
        setNameNote(note.title);
        setColor(note.color);
        setBackgroundColor(note.backgroundColor);
        setUnderlayColor(note.underlayColor);
        setTexts(note.texts);
        setEmotionsBefore(note.emotionsBefore);
        setEmotionsAfter(note.emotionsAfter);
        setCreatedAt(note.createdAt);
        setIsRenderOne(true);
      }
    }

    const appStateListener = AppState.addEventListener("change", (state) => {
      if (state !== "active") {
        navigation.navigate("Notes");
      }
    });

    return () => {
      addNoteHandle();
      appStateListener.remove();
    };
  }, []);

  return (
    <>
      <GlobalScreen withoutScrollView>
        <CenterContainer>
          <TopWithBack isCustomPress onPress={back}>
            <Pressable onPress={back}>
              <CheckIcon />
            </Pressable>
          </TopWithBack>
          <FlatList
            ref={flatListRef}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => {
              return (
                <>
                  <DateText>
                    {new Date()
                      .toLocaleString("ru", {
                        month: "long",
                        year: "numeric",
                        day: "numeric",
                      })
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
                    value={texts[id - 1]}
                    onTouchEnd={() => onTouchEnd(id - 1)}
                    placeholder="Начните ввод"
                    onChangeText={(value) =>
                      setTexts((prevState) => {
                        const prevStateCopy = [...prevState];
                        prevStateCopy[id - 1] = value;
                        return prevStateCopy;
                      })
                    }
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

export default memo(Note);

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
