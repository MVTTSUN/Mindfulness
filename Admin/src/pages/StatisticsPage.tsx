import styled from "styled-components";
import { useGetStatisticsQuery } from "../services/api";
import ReactECharts from "echarts-for-react";
import { Color, FILTER_MONTHS, FILTER_TYPE, FILTER_YEARS } from "../const";
import { Helmet } from "react-helmet-async";
import { Subtitle } from "../components/Subtitle";
import { FontSizeSubtitle, ResetButton, ResetList } from "../mixins";
import { useAppSelector } from "../hooks/useAppSelector";
import { getFilteredStatistics } from "../store/statisticsSelectors";
import { useAppDispatch } from "../hooks/useAppDispatch";
import {
  resetTitle,
  setMonth,
  setTitle,
  setType,
  setYear,
} from "../store/statisticsSlice";
import { useState } from "react";
import { ContainerTwoSides } from "../components/ContainerTwoSides";
import { getOptionDonut, getOptionLine } from "../utils/utils";

export function StatisticsPage() {
  const [filterYearActive, setFilterYearActive] = useState<number>(
    FILTER_YEARS.indexOf(new Date().getFullYear())
  );
  const [filterMonthActive, setFilterMonthActive] = useState<string>("Все");
  const [filterTypeActive, setFilterTypeActive] = useState<number>(0);
  const [filterIsTitleActive, setIsFilterTitleActive] = useState(false);
  const filteredData = useAppSelector(getFilteredStatistics);
  const dispatch = useAppDispatch();
  useGetStatisticsQuery();

  const setYearHandle = (index: number, year: number) => {
    dispatch(setYear(year));
    setFilterYearActive(index);
  };

  const setTypeHandle = (index: number, value: string) => {
    dispatch(setType(value));
    setFilterTypeActive(index);
  };

  const setTitleHandle = (title: string) => {
    if (filterIsTitleActive) {
      dispatch(resetTitle());
      setIsFilterTitleActive(false);
    } else {
      dispatch(setTitle(title));
      setIsFilterTitleActive(true);
    }
  };

  const setMonthHandle = (month: string) => {
    dispatch(setMonth(month));
    setFilterMonthActive(month);
  };

  return (
    <>
      <Helmet>
        <title>Статистика</title>
      </Helmet>
      <Subtitle>Статистика</Subtitle>
      <ContainerTwoSides>
        <Container>
          <FilterContainer>
            {FILTER_YEARS.map((year, index) => (
              <ButtonSpace key={index}>
                <ButtonYear
                  $isActive={filterYearActive === index}
                  type="button"
                  onClick={() => setYearHandle(index, year)}
                >
                  {year}
                </ButtonYear>
              </ButtonSpace>
            ))}
          </FilterContainer>
          <FilterContainer>
            <ButtonSpace>
              <ButtonYear
                $isActive={filterMonthActive === "Все"}
                type="button"
                onClick={() => setMonthHandle("Все")}
              >
                Все
              </ButtonYear>
            </ButtonSpace>
            {FILTER_MONTHS.map((month, index) => (
              <ButtonSpace key={index}>
                <ButtonYear
                  $isActive={filterMonthActive === month}
                  type="button"
                  onClick={() => setMonthHandle(month)}
                >
                  {month}
                </ButtonYear>
              </ButtonSpace>
            ))}
          </FilterContainer>
          <FilterContainer>
            {FILTER_TYPE.map((type, index) => (
              <ButtonSpace key={index}>
                <ButtonType
                  $isActive={filterTypeActive === index}
                  type="button"
                  onClick={() => setTypeHandle(index, type.value)}
                >
                  {type.name}
                </ButtonType>
              </ButtonSpace>
            ))}
          </FilterContainer>
          <Text>
            Всего посещений: {filteredData && filteredData.statisticsCopy.count}
          </Text>
          <ReactEChartsStyled
            option={getOptionLine(
              filteredData?.months,
              filteredData?.monthsAndroid,
              filteredData?.monthsIOS
            )}
          />
          <ReactEChartsStyled
            option={getOptionDonut(
              filteredData?.monthsAndroid,
              filteredData?.monthsIOS
            )}
          />
        </Container>
        <Container>
          {filteredData?.statisticsCopy.meditations?.map(
            (meditation, index) => (
              <li key={index}>
                <Card
                  $isMeditation
                  onClick={() => setTitleHandle(meditation.title)}
                >
                  <CardCount $isMeditation>{meditation.count}</CardCount>
                  <TitleCard $isMeditation>{meditation.title}</TitleCard>
                </Card>
              </li>
            )
          )}
          {filteredData?.statisticsCopy.tasks?.map((task, index) => (
            <li key={index}>
              <Card
                $isMeditation={false}
                onClick={() => setTitleHandle(task.title)}
              >
                <CardCount $isMeditation={false}>{task.count}</CardCount>
                <TitleCard $isMeditation={false}>{task.title}</TitleCard>
              </Card>
            </li>
          ))}
        </Container>
      </ContainerTwoSides>
    </>
  );
}

const ReactEChartsStyled = styled(ReactECharts)`
  box-sizing: border-box;
  padding: 20px;
  width: 500px;
  border: 5px dashed ${Color.Primary};
  border-radius: 25px;
`;

const Text = styled.p`
  ${FontSizeSubtitle}
`;

const FilterContainer = styled.ul`
  ${ResetList}
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  max-width: 480px;
  justify-content: center;
  margin: 10px 0;
`;

const ButtonSpace = styled.li`
  border-left: 2px solid ${Color.TextStandard};

  &:nth-child(7n) {
    border-right: 2px solid ${Color.TextStandard};
  }

  &:last-child {
    border-right: 2px solid ${Color.TextStandard};
  }
`;

const ButtonYear = styled.button<{ $isActive: boolean }>`
  box-sizing: border-box;
  margin: 2px 10px;
  width: 45px;
  ${ResetButton}
  font-size: 18px;
  border-bottom: 5px solid
    ${({ $isActive }) => ($isActive ? Color.Primary : "transparent")};
  transition: border-bottom 0.3s ease;
`;

const ButtonType = styled.button<{ $isActive: boolean }>`
  box-sizing: border-box;
  margin: 2px 10px;
  width: 100px;
  ${ResetButton}
  font-size: 18px;
  border-bottom: 5px solid
    ${({ $isActive }) => ($isActive ? Color.Primary : "transparent")};
  transition: border-bottom 0.3s ease;
`;

const Container = styled.ul`
  ${ResetList}
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 500px;
  align-content: baseline;
  justify-content: center;
`;

const Card = styled.article<{ $isMeditation: boolean }>`
  cursor: pointer;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
  justify-content: center;
  padding: 10px;
  width: 100px;
  height: 100px;
  border-radius: 25px;
  background-color: ${({ $isMeditation }) =>
    $isMeditation ? Color.Meditation : Color.Task};
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.7;
  }
`;

const TitleCard = styled.h3<{ $isMeditation: boolean }>`
  ${FontSizeSubtitle}
  font-size: 12px;
  color: ${({ $isMeditation }) =>
    $isMeditation ? Color.TextWhite : Color.TextStandard};
  text-align: center;
`;

const CardCount = styled.p<{ $isMeditation: boolean }>`
  ${FontSizeSubtitle}
  font-size: 18px;
  color: ${({ $isMeditation }) =>
    $isMeditation ? Color.TextWhite : Color.TextStandard};
  text-align: center;
`;
