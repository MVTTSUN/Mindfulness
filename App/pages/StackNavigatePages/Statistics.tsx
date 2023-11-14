import styled from "styled-components/native";
import { useCallback, useEffect } from "react";
import { CenterContainer } from "../../components/CenterContainer";
import { GlobalScreen } from "../../components/GlobalScreenWrapper";
import { HeaderWithBack } from "../../components/ui/headers/HeaderWithBack";
import { NotesFilter } from "../../components/ui/inputs/NotesFilter";
import { useState } from "react";
import { Pressable } from "react-native";
import { HorizontalChartBar } from "../../components/ui/charts/HorizontalChartBar";
import { TypesPopup } from "../../components/ui/popups/TypesPopup";
import { MonthsPopup } from "../../components/ui/popups/MonthsPopup";
import { YearsPopup } from "../../components/ui/popups/YearsPopup";
import { useAppSelector } from "../../hooks/useAppSelector";
import { normalize, processDataForChart } from "../../utils";
import { resetQueries } from "../../store/notesSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useFocusEffect } from "@react-navigation/native";
import {
  getDataEmotionsCopy,
  getEmotions,
} from "../../store/emotionsSelectors";
import { useLazyGetEmotionsQuery } from "../../api/api";
import { setDataEmotionsCopy, setEmotions } from "../../store/emotionsSlice";
import deepEqual from "deep-equal";
import { getFilteredNotes } from "../../store/notesSelectors";
import { Preloader } from "../../components/ui/animate-elements/Preloader";
import { getIsOffline } from "../../store/offlineSelectors";

export function Statistics() {
  const [isOpenTypesPopup, setIsOpenTypesPopup] = useState(false);
  const [isOpenMonthsPopup, setIsOpenMonthsPopup] = useState(false);
  const [isOpenYearsPopup, setIsOpenYearsPopup] = useState(false);
  const notesFiltered = useAppSelector(getFilteredNotes);
  const emotions = useAppSelector(getEmotions);
  const emotionsDataCopy = useAppSelector(getDataEmotionsCopy);
  const isOffline = useAppSelector(getIsOffline);
  const dispatch = useAppDispatch();
  const [getEmotionsQuery] = useLazyGetEmotionsQuery();
  const emotionsAfter = processDataForChart(emotions, notesFiltered, "after");
  const emotionsBefore = processDataForChart(emotions, notesFiltered, "before");
  const maxCount =
    emotionsAfter[0]?.counts.all > emotionsBefore[0]?.counts.all
      ? emotionsAfter[0]?.counts.all
      : emotionsBefore[0]?.counts.all;
  let maxCountBar =
    maxCount === 0
      ? 10
      : maxCount % 10 !== 0
      ? maxCount - (maxCount % 10) + 10
      : maxCount;

  const loadingData = async () => {
    const { data } = await getEmotionsQuery();

    if (data) {
      if (!deepEqual(emotionsDataCopy, data)) {
        dispatch(setEmotions(data));
        dispatch(setDataEmotionsCopy(data));
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        dispatch(resetQueries());
      };
    }, [])
  );

  useEffect(() => {
    if (!isOffline) {
      loadingData();
    }
  }, []);

  return (
    <>
      <GlobalScreen withoutScrollView>
        <CenterContainer>
          <HeaderWithBack>
            <TextTitle>Статистика</TextTitle>
          </HeaderWithBack>
          {!emotions.length && <Preloader />}
          {!!emotions.length && (
            <>
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
            </>
          )}
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
  font-size: ${normalize(18)}px;
  color: ${({ theme }) => theme.color.standard};
`;

const ScrollViewStyled = styled.ScrollView`
  height: ${normalize(200)}px;
  margin-bottom: 10px;
`;

const TitleChart = styled.Text`
  margin-bottom: 5px;
  font-family: "Poppins-Medium";
  font-size: ${normalize(20)}px;
  line-height: ${normalize(24)}px;
  color: ${({ theme }) => theme.color.standard};
`;
