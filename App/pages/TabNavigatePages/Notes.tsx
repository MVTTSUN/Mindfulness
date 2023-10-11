import { styled } from "styled-components/native";
import { GlobalScreen } from "../../components/GlobalScreen";
import { CenterContainer } from "../../components/CenterContainer";
import { Title } from "../../components/ui/Titles/Title";
import { Input } from "../../components/ui/Input";
import { AddIcon } from "../../components/icons/AddIcon";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { MeditationData, NotesScreenProp, TaskType } from "../../types";
import { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { CheckBox } from "../../components/ui/CheckBox";
import { COLORS } from "../../const";
import { DeleteIcon } from "../../components/icons/DeleteIcon";
import { Pressable, ScrollView } from "react-native";
import Animated, {
  RollOutLeft,
  ZoomIn,
  ZoomInDown,
  ZoomOut,
  ZoomOutDown,
  cancelAnimation,
} from "react-native-reanimated";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
  removeNotes,
  resetQueries,
  searchNotes,
  updateQueries,
} from "../../store/notesSlice";
import { NotesFilter } from "../../components/ui/NotesFilter";
import { TypesPopup } from "../../components/TypesPopup";
import { MonthsPopup } from "../../components/MonthsPopup";
import { YearsPopup } from "../../components/YearsPopup";

export function Notes() {
  const navigation = useNavigation<NotesScreenProp>();
  const route = useRoute();
  const [isDelete, setIsDelete] = useState(false);
  const [notesId, setNotesId] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const notes = useAppSelector((state) => state.notes.notesSearched);
  const [text, setText] = useState("");
  const [isOpenTypesPopup, setIsOpenTypesPopup] = useState(false);
  const [isOpenMonthsPopup, setIsOpenMonthsPopup] = useState(false);
  const [isOpenYearsPopup, setIsOpenYearsPopup] = useState(false);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setText("");
        dispatch(resetQueries());
        dispatch(searchNotes());
      };
    }, [])
  );

  const toggleCheckbox = (currentId: string) => {
    setNotesId((prevState) => {
      if (prevState.includes(currentId)) {
        return prevState.filter((id) => id !== currentId);
      } else {
        return [...prevState, currentId];
      }
    });
  };

  const onChangeText = (text: string) => {
    setText(text);
    dispatch(updateQueries({ property: "search", value: text }));
    dispatch(searchNotes());
  };

  const deleteNotes = () => {
    dispatch(removeNotes(notesId));
    setIsDelete(false);
  };

  useEffect(() => {
    if (route.params) {
      const { meditation } = route.params as { meditation: MeditationData };
      const { task } = route.params as { task: TaskType };

      if (meditation) {
        navigation.navigate("Note", { meditation });
      }

      if (task) {
        navigation.navigate("Note", { task });
      }
    }
  }, [route.params]);

  useEffect(() => {
    setNotesId([]);
  }, [isDelete]);

  return (
    <>
      <GlobalScreen withoutScrollView>
        <CenterContainer>
          <TitleContainer>
            <Title>Ежедневник</Title>
            {isDelete && (
              <AnimatedTrash entering={ZoomIn.springify()} exiting={ZoomOut}>
                <CountDeleteCards>{notesId.length}</CountDeleteCards>
                <Pressable onPress={deleteNotes}>
                  <DeleteIcon />
                </Pressable>
              </AnimatedTrash>
            )}
          </TitleContainer>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Input
              value={text}
              editable={!isDelete}
              onChangeText={onChangeText}
              width="100%"
              placeholder="Поиск заметок"
            />
            <NotesFilter
              setIsOpenTypesPopup={setIsOpenTypesPopup}
              setIsOpenYearsPopup={setIsOpenYearsPopup}
              setIsOpenMonthsPopup={setIsOpenMonthsPopup}
            />
            <CountCards>{`Всего заметок: ${notes.length}`}</CountCards>
            <NotesContainer>
              {notes.map((note) => (
                <CardAnimated key={note.id} exiting={RollOutLeft.duration(600)}>
                  <TouchableHighlightNote
                    $backgroundColor={note.backgroundColor}
                    onPress={
                      isDelete
                        ? () => toggleCheckbox(note.id)
                        : () => navigation.navigate("Note", { note })
                    }
                    onLongPress={() => setIsDelete(true)}
                    delayLongPress={500}
                    underlayColor={note.underlayColor}
                  >
                    <>
                      <NoteTitle
                        $color={note.color}
                        numberOfLines={2}
                        ellipsizeMode="tail"
                      >
                        {note.title}
                      </NoteTitle>
                      <NoteText
                        $color={note.color}
                        numberOfLines={4}
                        ellipsizeMode="tail"
                      >
                        {`До: ${note.emotionsBefore
                          .join(", ")
                          .toLowerCase()}\nПосле: ${note.emotionsAfter
                          .join(", ")
                          .toLowerCase()}`}
                      </NoteText>
                      <NoteFooterContainer>
                        {isDelete && (
                          <Animated.View
                            entering={ZoomIn.springify()}
                            exiting={ZoomOut}
                          >
                            <CheckBox
                              color={COLORS.textColors.meditationCard}
                              backgroundColor={COLORS.backgroundColors.dark}
                              isActive={notesId.includes(note.id)}
                              isStroke={false}
                              isRound
                            />
                          </Animated.View>
                        )}
                        <DateText
                          $color={note.color}
                          numberOfLines={1}
                          ellipsizeMode="tail"
                        >
                          {new Date(note.createdAt)
                            .toLocaleString("ru", {
                              month: "long",
                              year: "numeric",
                              day: "numeric",
                            })
                            .replace(" г.", "")}
                        </DateText>
                      </NoteFooterContainer>
                    </>
                  </TouchableHighlightNote>
                </CardAnimated>
              ))}
            </NotesContainer>
            <BottomSpace />
          </ScrollView>
        </CenterContainer>
      </GlobalScreen>
      {!isDelete && (
        <Animated.View entering={ZoomInDown} exiting={ZoomOutDown}>
          <PressableStyled onPress={() => navigation.navigate("Note")}>
            <ViewPlus>
              <AddIcon />
            </ViewPlus>
          </PressableStyled>
        </Animated.View>
      )}
      {isOpenTypesPopup && (
        <PressableBlur onPress={() => setIsOpenTypesPopup(false)}>
          <Pressable>
            <TypesPopup />
          </Pressable>
        </PressableBlur>
      )}
      {isOpenMonthsPopup && (
        <PressableBlur onPress={() => setIsOpenMonthsPopup(false)}>
          <NoPressableStyled>
            <MonthsPopup />
          </NoPressableStyled>
        </PressableBlur>
      )}
      {isOpenYearsPopup && (
        <PressableBlur onPress={() => setIsOpenYearsPopup(false)}>
          <NoPressableStyled>
            <YearsPopup />
          </NoPressableStyled>
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

const NoPressableStyled = styled.Pressable`
  height: 70%;
  width: 70%;
`;

const CountCards = styled.Text`
  font-family: "Poppins-Medium";
  font-size: 16px;
  line-height: 20px;
  color: ${({ theme }) => theme.color.standard};
  margin-bottom: 20px;
`;

const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const CountDeleteCards = styled.Text`
  font-family: "Poppins-Medium";
  font-size: 16px;
  height: 100%;
  vertical-align: middle;
  line-height: 22px;
  color: ${({ theme }) => theme.color.standard};
`;

const AnimatedTrash = styled(Animated.View)`
  flex-direction: row;
  align-items: center;
`;

const PressableStyled = styled.Pressable`
  position: absolute;
  right: 40px;
  bottom: 100px;
`;

const ViewPlus = styled.View`
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: #313131;
`;

const NotesContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

const CardAnimated = styled(Animated.View)`
  width: 48%;
  height: 48%;
  aspect-ratio: 1 / 1;
`;

const TouchableHighlightNote = styled.TouchableHighlight<{
  $backgroundColor: string;
}>`
  width: 100%;
  height: 100%;
  padding: 15px;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  border-radius: 25px;
`;

const NoteTitle = styled.Text<{ $color: string }>`
  font-family: "Poppins-Medium";
  font-size: 14px;
  color: ${({ $color }) => $color};
`;

const NoteText = styled.Text<{ $color: string }>`
  flex: 1;
  opacity: 0.6;
  font-family: "Poppins-Medium";
  font-size: 12px;
  color: ${({ $color }) => $color};
`;

const NoteFooterContainer = styled.View`
  align-items: center;
  flex-direction: row;
  height: 25px;
`;

const DateText = styled.Text<{ $color: string }>`
  align-self: flex-end;
  text-align: right;
  flex: 1;
  opacity: 0.6;
  font-family: "Poppins-Regular";
  font-size: 12px;
  line-height: 18px;
  color: ${({ $color }) => $color};
`;

const BottomSpace = styled.View`
  height: 170px;
`;
