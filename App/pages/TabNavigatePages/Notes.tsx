import { styled } from "styled-components/native";
import { GlobalScreen } from "../../components/GlobalScreenWrapper";
import { CenterContainer } from "../../components/CenterContainer";
import { Title } from "../../components/ui/titles/Title";
import { Input } from "../../components/ui/inputs/Input";
import { AddIcon } from "../../components/svg/icons/other-icons/AddIcon";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import {
  DataTextLottieImage,
  MeditationPlayer,
  NotesScreenProp,
} from "../../types";
import { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { CheckBox } from "../../components/ui/inputs/CheckBox";
import { DeleteIcon } from "../../components/svg/icons/other-icons/DeleteIcon";
import { Pressable, ScrollView } from "react-native";
import Animated, {
  RollOutLeft,
  ZoomIn,
  ZoomInDown,
  ZoomOut,
  ZoomOutDown,
} from "react-native-reanimated";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
  removeNotes,
  resetQueries,
  updateQueries,
} from "../../store/notesSlice";
import { NotesFilter } from "../../components/ui/inputs/NotesFilter";
import { TypesPopup } from "../../components/ui/popups/TypesPopup";
import { MonthsPopup } from "../../components/ui/popups/MonthsPopup";
import { YearsPopup } from "../../components/ui/popups/YearsPopup";
import { normalize } from "../../utils";
import { getFilteredNotes, getNotesQueries } from "../../store/notesSelectors";
import { AppRoute, Color } from "../../const";

export function Notes() {
  const [isDelete, setIsDelete] = useState(false);
  const [notesId, setNotesId] = useState<string[]>([]);
  const [isOpenTypesPopup, setIsOpenTypesPopup] = useState(false);
  const [isOpenMonthsPopup, setIsOpenMonthsPopup] = useState(false);
  const [isOpenYearsPopup, setIsOpenYearsPopup] = useState(false);
  const route = useRoute();
  const navigation = useNavigation<NotesScreenProp>();
  const filteredNotes = useAppSelector(getFilteredNotes);
  const queries = useAppSelector(getNotesQueries);
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

  const onChangeText = (text: string) => {
    dispatch(updateQueries({ property: "search", value: text }));
  };

  const deleteNotes = () => {
    dispatch(removeNotes(notesId));
    setIsDelete(false);
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        dispatch(resetQueries());
      };
    }, [])
  );

  useEffect(() => {
    if (route.params) {
      const { meditation } = route.params as { meditation: MeditationPlayer };
      const { task } = route.params as { task: DataTextLottieImage };

      if (meditation) {
        navigation.navigate(AppRoute.Note, { meditation });
      }

      if (task) {
        navigation.navigate(AppRoute.Note, { task });
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
            <SearchView>
              <Input
                value={queries.search}
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
            </SearchView>
            <CountCards>{`Всего заметок: ${filteredNotes.length}`}</CountCards>
            <NotesContainer>
              {filteredNotes.map((note) => (
                <CardAnimated key={note.id} exiting={RollOutLeft.duration(600)}>
                  <TouchableHighlightNote
                    $backgroundColor={note.backgroundColor}
                    onPress={
                      isDelete
                        ? () => toggleCheckbox(note.id)
                        : () => navigation.navigate(AppRoute.Note, { note })
                    }
                    onLongPress={() => setIsDelete(true)}
                    delayLongPress={300}
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
                              color={Color.TextWhite}
                              backgroundColor={Color.Dark}
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
          <PressableStyled onPress={() => navigation.navigate(AppRoute.Note)}>
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
  font-size: ${normalize(16)}px;
  line-height: ${normalize(20)}px;
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
  font-size: ${normalize(16)}px;
  height: 100%;
  vertical-align: middle;
  line-height: ${normalize(22)}px;
  color: ${({ theme }) => theme.color.standard};
`;

const AnimatedTrash = styled(Animated.View)`
  flex-direction: row;
  align-items: center;
`;

const PressableStyled = styled.Pressable`
  position: absolute;
  right: ${normalize(40)}px;
  bottom: ${normalize(100)}px;
`;

const ViewPlus = styled.View`
  align-items: center;
  justify-content: center;
  width: ${normalize(50)}px;
  height: ${normalize(50)}px;
  border-radius: ${normalize(25)}px;
  background-color: ${Color.TextStandard};
`;

const NotesContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${normalize(10)}px;
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
  padding: ${normalize(15)}px;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  border-radius: ${normalize(25)}px;
`;

const NoteTitle = styled.Text<{ $color: string }>`
  font-family: "Poppins-Medium";
  font-size: ${normalize(14)}px;
  color: ${({ $color }) => $color};
`;

const NoteText = styled.Text<{ $color: string }>`
  flex: 1;
  opacity: 0.6;
  font-family: "Poppins-Medium";
  font-size: ${normalize(12)}px;
  color: ${({ $color }) => $color};
`;

const NoteFooterContainer = styled.View`
  align-items: center;
  flex-direction: row;
  height: ${normalize(25)}px;
`;

const DateText = styled.Text<{ $color: string }>`
  align-self: flex-end;
  text-align: right;
  flex: 1;
  opacity: 0.6;
  font-family: "Poppins-Regular";
  font-size: ${normalize(12)}px;
  line-height: ${normalize(18)}px;
  color: ${({ $color }) => $color};
`;

const BottomSpace = styled.View`
  height: ${normalize(170)}px;
`;

const SearchView = styled.View`
  gap: 12px;
`;
