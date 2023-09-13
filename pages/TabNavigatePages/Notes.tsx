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
} from "react-native-reanimated";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { removeNotes } from "../../store/notesSlice";

export function Notes() {
  const navigation = useNavigation<NotesScreenProp>();
  const route = useRoute();
  const notes = useAppSelector((state) => state.notes.notes);
  const [isDelete, setIsDelete] = useState(false);
  const [notesId, setNotesId] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  const toggleCheckbox = (currentId: string) => {
    setNotesId((prevState) => {
      if (prevState.includes(currentId)) {
        return prevState.filter((id) => id !== currentId);
      } else {
        return [...prevState, currentId];
      }
    });
  };

  const deleteNotes = () => {
    dispatch(removeNotes(notesId));
    setIsDelete(false);
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        setIsDelete(false);
      };
    }, [])
  );

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
              editable={!isDelete}
              onChangeText={() => {}}
              width="100%"
              placeholder="Поиск заметок"
            />
            <CountCards>{`Всего заметок: ${notes.length}`}</CountCards>
            <NotesContainer>
              {notes.map((note) => (
                <CardAnimated key={note.id} exiting={RollOutLeft}>
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
                              backgroundColor={
                                COLORS.backgroundColors.dark
                              }
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
    </>
  );
}

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
