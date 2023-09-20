import styled from "styled-components/native";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { CenterContainer } from "../../components/CenterContainer";
import { GlobalScreen } from "../../components/GlobalScreen";
import { TopWithBack } from "../../components/ui/TopWithBack";
import { NotesFilter } from "../../components/ui/NotesFilter";
import { useState } from "react";
import { Dimensions, Pressable, ScrollView } from "react-native";
import { HorizontalChartBar } from "../../components/ui/HorizontalChartBar";
import { TypesPopup } from "../../components/TypesPopup";
import { MonthsPopup } from "../../components/MonthsPopup";
import { YearsPopup } from "../../components/YearsPopup";
import { useAppSelector } from "../../hooks/useAppSelector";
import { EMOTIONS } from "../../const";
import { processDataForChart } from "../../utils";
import { resetQueries, searchNotes } from "../../store/notesSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { NoteType } from "../../types";
import { useFocusEffect } from "@react-navigation/native";

export function Statistics() {
  const dispatch = useAppDispatch();
  const [isOpenTypesPopup, setIsOpenTypesPopup] = useState(false);
  const [isOpenMonthsPopup, setIsOpenMonthsPopup] = useState(false);
  const [isOpenYearsPopup, setIsOpenYearsPopup] = useState(false);
  const isFirstRendering = useRef(true);
  const notes = useAppSelector((state) => state.notes.notes);
  const notesSearched = useAppSelector((state) => state.notes.notesSearched);
  const [notesState, setNotesState] = useState<NoteType[]>(notes);
  const emotionsAfter = processDataForChart(EMOTIONS, notesState, "after");
  const emotionsBefore = processDataForChart(EMOTIONS, notesState, "before");
  const maxCount =
    emotionsAfter[0].counts.all > emotionsBefore[0].counts.all
      ? emotionsAfter[0].counts.all
      : emotionsBefore[0].counts.all;
  let maxCountBar =
    maxCount === 0
      ? 10
      : maxCount % 10 !== 0
      ? maxCount - (maxCount % 10) + 10
      : maxCount;

  useFocusEffect(
    useCallback(() => {
      return () => {
        dispatch(resetQueries());
        dispatch(searchNotes());
      };
    }, [])
  );

  useEffect(() => {
    if (isFirstRendering.current) {
      isFirstRendering.current = false;
    } else {
      setNotesState(notesSearched);
    }
  }, [notesSearched]);

  return (
    <>
      <GlobalScreen withoutScrollView>
        <CenterContainer>
          <TopWithBack>
            <TextTitle>Статистика</TextTitle>
          </TopWithBack>
          <NotesFilter
            setIsOpenTypesPopup={setIsOpenTypesPopup}
            setIsOpenMonthsPopup={setIsOpenMonthsPopup}
            setIsOpenYearsPopup={setIsOpenYearsPopup}
            isHideButtonStatistics
          />
          <TitleChart>До</TitleChart>
          <ScrollViewStyled
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled
          >
            <HorizontalChartBar
              emotions={emotionsBefore}
              maxCountBar={maxCountBar}
            />
          </ScrollViewStyled>
          <TitleChart>После</TitleChart>
          <ScrollViewStyled
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled
          >
            <HorizontalChartBar
              emotions={emotionsAfter}
              maxCountBar={maxCountBar}
            />
          </ScrollViewStyled>
        </CenterContainer>
      </GlobalScreen>
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

const TextTitle = styled.Text`
  font-family: "Poppins-Medium";
  font-size: 18px;
  color: ${({ theme }) => theme.color.standard};
`;

const ScrollViewStyled = styled.ScrollView`
  height: ${(Dimensions.get("window").height / 100) * 31};
  margin-bottom: 10px;
`;

const TitleChart = styled.Text`
  margin-bottom: 5px;
  font-family: "Poppins-Medium";
  font-size: 20px;
  line-height: 24px;
  color: ${({ theme }) => theme.color.standard};
`;
