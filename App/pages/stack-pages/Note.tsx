import { styled } from "styled-components/native";
import { CenterContainer } from "../../components/CenterContainer";
import { GlobalScreen } from "../../components/GlobalScreenWrapper";
import { HeaderWithBack } from "../../components/ui/headers/HeaderWithBack";
import { CheckIcon } from "../../components/svg/icons/other-icons/CheckIcon";
import { Textarea } from "../../components/ui/inputs/Textarea";
import { memo, useEffect, useRef, useState } from "react";
import { AppState, Dimensions, FlatList, Pressable } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  DataInput,
  DataTextLottieImage,
  MeditationPlayer,
  NoteType,
  NotesScreenProp,
} from "../../types";
import { TouchableHighlight } from "../../components/ui/touchables/TouchableHighlight";
import { MeditationsAndTasksPopup } from "../../components/ui/popups/MeditationsAndTasksPopup";
import { AppRoute, Color, DATA_INPUTS_NOTE } from "../../const";
import EmotionsPopup from "../../components/ui/popups/EmotionsPopup";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { addNote, removeNotes, updateNote } from "../../store/notesSlice";
import { normalize } from "../../utils";
import { TextIcon } from "../../components/svg/icons/other-icons/TextIcon";
import { useAppSelector } from "../../hooks/useAppSelector";
import { getTaskId } from "../../store/tasksSelectors";
import { getMeditationId } from "../../store/meditationsSelectors";

function Note() {
  const [isRenderOne, setIsRenderOne] = useState(false);
  const [id, setId] = useState<string | null>(null);
  const [createdAt, setCreatedAt] = useState<string>("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [typeEmotions, setTypeEmotions] = useState<string>("");
  const [nameNote, setNameNote] = useState("");
  const [emotionsBefore, setEmotionsBefore] = useState<string[]>([]);
  const [emotionsAfter, setEmotionsAfter] = useState<string[]>([]);
  const [isOpenMeditationAndTasksPopup, setIsOpenMeditationAndTasksPopup] =
    useState(false);
  const [isOpenEmotionsPopup, setIsOpenEmotionsPopup] = useState(false);
  const [color, setColor] = useState<string>(Color.TextStandard);
  const [backgroundColor, setBackgroundColor] = useState<string>(Color.Primary);
  const [underlayColor, setUnderlayColor] = useState<string>(
    Color.PrimaryPressed
  );
  const [texts, setTexts] = useState(["", "", "", ""]);
  const flatListRef = useRef<FlatList>(null);
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
  const prevStateAfterUnmount = useRef(dataAfterUnmount.current);
  const route = useRoute();
  const navigation = useNavigation<NotesScreenProp>();
  const taskId = useAppSelector(getTaskId(nameNote.split(": ")[1]));
  const meditationId = useAppSelector(getMeditationId(nameNote.split(": ")[1]));
  const dispatch = useAppDispatch();

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
      const { meditation } = route.params as { meditation: MeditationPlayer };
      const { task } = route.params as { task: DataTextLottieImage };
      const { note } = route.params as { note: NoteType };

      if (meditation) {
        setColor(Color.TextWhite);
        setBackgroundColor(Color.Meditation);
        setUnderlayColor(Color.MeditationPressed);
        setNameNote(`Медитация: ${meditation.title}`);
      }

      if (task) {
        setColor(Color.TextStandard);
        setBackgroundColor(Color.Task);
        setUnderlayColor(Color.TaskPressed);
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
        navigation.navigate(AppRoute.Notes);
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
          <HeaderWithBack isCustomPress onPress={back}>
            <ToolsContainer>
              <Pressable
                onPress={() => {
                  if (taskId) {
                    navigation.navigate(AppRoute.TaskNote, { taskId });
                  } else if (meditationId) {
                    navigation.navigate(AppRoute.MeditationNote, {
                      meditationId,
                    });
                  }
                }}
              >
                <TextIcon disabled={!(taskId || meditationId)} />
              </Pressable>
              <Pressable onPress={back}>
                <CheckIcon />
              </Pressable>
            </ToolsContainer>
          </HeaderWithBack>
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
                      Эмоции до медитации или задания
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
                      Эмоции после медитации или задания
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
                  <Textarea
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
                    height={300}
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

const ToolsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;

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
  font-size: ${normalize(14)}px;
  line-height: ${normalize(18)}px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.color.standard};
`;

const TitleInput = styled.Text`
  margin: 10px 0;
  font-family: "Poppins-Medium";
  font-size: ${normalize(20)}px;
  color: ${({ theme }) => theme.color.standard};
`;

const BottomSpace = styled.View`
  height: ${(Dimensions.get("window").height / 100) * 50}px;
`;

const TextStyled = styled.Text`
  text-align: center;
  font-family: "Poppins-Regular";
  font-size: ${normalize(16)}px;
  line-height: ${normalize(20)}px;
  color: ${({ theme }) => theme.color.standard};
`;
