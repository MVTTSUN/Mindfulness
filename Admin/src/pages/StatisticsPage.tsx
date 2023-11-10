import styled from "styled-components";
import { useGetStatisticsQuery } from "../services/api";
import ReactECharts from "echarts-for-react";
import { Color, FILTER_MONTHS, FILTER_TYPE, FILTER_YEARS } from "../const";
import { Helmet } from "react-helmet-async";
import { Subtitle } from "../components/Subtitle";
import { FontSizeSubtitle, ResetButton, ResetList } from "../mixins";
import { useAppSelector } from "../hooks/useAppSelector";
import {
  getFilterMonth,
  getFilterTitle,
  getFilterType,
  getFilterYear,
  getFilteredStatistics,
} from "../store/statisticsSelectors";
import { useAppDispatch } from "../hooks/useAppDispatch";
import {
  resetTitle,
  setMonth,
  setTitle,
  setType,
  setYear,
} from "../store/statisticsSlice";
import { ContainerTwoSides } from "../components/ContainerTwoSides";
import { getOptionDonut, getOptionLine } from "../utils/utils";
import { useEffect } from "react";

export function StatisticsPage() {
  const filterYear = useAppSelector(getFilterYear);
  const filterMonth = useAppSelector(getFilterMonth);
  const filterType = useAppSelector(getFilterType);
  const filterTitle = useAppSelector(getFilterTitle);
  const filteredData = useAppSelector(getFilteredStatistics);
  const dispatch = useAppDispatch();
  useGetStatisticsQuery();

  const setYearHandle = (year: number) => {
    dispatch(setYear(year));
  };

  const setTypeHandle = (value: string) => {
    dispatch(setType(value));
  };

  const setTitleHandle = (title: string) => {
    if (filterTitle) {
      dispatch(resetTitle());
    } else {
      dispatch(setTitle(title));
    }
  };

  const setMonthHandle = (month: string) => {
    dispatch(setMonth(month));
  };

  useEffect(() => {
    return () => {
      dispatch(setYear(new Date().getFullYear()));
      dispatch(setType("all"));
      dispatch(resetTitle());
      dispatch(setMonth("Все"));
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Статистика</title>
      </Helmet>
      <Subtitle>Статистика</Subtitle>
      <ContainerTwoSides>
        <ContainerStatistics>
          <FilterContainer>
            {FILTER_YEARS.map((year, index) => (
              <ButtonSpace key={index}>
                <ButtonYear
                  $isActive={filterYear === year}
                  type="button"
                  onClick={() => setYearHandle(year)}
                >
                  {year}
                </ButtonYear>
              </ButtonSpace>
            ))}
          </FilterContainer>
          <FilterContainer>
            <ButtonSpace>
              <ButtonYear
                $isActive={filterMonth === "Все"}
                type="button"
                onClick={() => setMonthHandle("Все")}
              >
                Все
              </ButtonYear>
            </ButtonSpace>
            {FILTER_MONTHS.map((month, index) => (
              <ButtonSpace key={index}>
                <ButtonYear
                  $isActive={filterMonth === month}
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
                  $isActive={filterType === type.value}
                  type="button"
                  onClick={() => setTypeHandle(type.value)}
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
        </ContainerStatistics>
        <ContainerCards>
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
        </ContainerCards>
      </ContainerTwoSides>
    </>
  );
}

const ReactEChartsStyled = styled(ReactECharts)`
  box-sizing: border-box;
  padding: 20px;
  width: 100%;
  border: 5px dashed ${Color.Primary};
  border-radius: 25px;
`;

const Text = styled.p`
  ${FontSizeSubtitle}
  color: ${Color.TextStandard};
`;

const FilterContainer = styled.ul`
  ${ResetList}
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  max-width: 480px;
  justify-content: center;
  margin: 10px 0;

  @media (max-width: 550px) {
    margin: 0;
    max-width: 370px;
  }

  @media (max-width: 420px) {
    max-width: 280px;
  }
`;

const ButtonSpace = styled.li`
  border-left: 2px solid ${Color.TextStandard};

  &:nth-child(7n) {
    border-right: 2px solid ${Color.TextStandard};
  }

  &:last-child {
    border-right: 2px solid ${Color.TextStandard};
  }

  @media (max-width: 420px) {
    &:nth-child(7n) {
      border-right: none;
    }

    &:nth-child(5n) {
      border-right: 2px solid ${Color.TextStandard};
    }
  }
`;

const ButtonYear = styled.button<{ $isActive: boolean }>`
  box-sizing: border-box;
  margin: 2px 10px;
  width: 45px;
  ${ResetButton}
  color: ${Color.TextStandard};
  font-size: 18px;
  border-bottom: 5px solid
    ${({ $isActive }) => ($isActive ? Color.Primary : "transparent")};
  transition: border-bottom 0.3s ease;

  @media (max-width: 550px) {
    font-size: 14px;
    width: 35px;
    margin: 2px 5px;
  }
`;

const ButtonType = styled.button<{ $isActive: boolean }>`
  box-sizing: border-box;
  margin: 2px 10px;
  width: 100px;
  ${ResetButton}
  color: ${Color.TextStandard};
  font-size: 18px;
  border-bottom: 5px solid
    ${({ $isActive }) => ($isActive ? Color.Primary : "transparent")};
  transition: border-bottom 0.3s ease;

  @media (max-width: 550px) {
    font-size: 14px;
    width: 80px;
    margin: 2px 5px;
  }
`;

const ContainerStatistics = styled.ul`
  ${ResetList}
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  max-width: 500px;

  @media (max-width: 550px) {
    max-width: none;
    width: 100%;
  }
`;

const ContainerCards = styled.ul`
  ${ResetList}
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  max-width: 500px;
  justify-content: center;
  align-content: baseline;

  @media (max-width: 550px) {
    max-width: none;
    width: 100%;
  }
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
  align-content: baseline;

  &:hover {
    opacity: 0.7;
  }

  @media (max-width: 550px) {
    width: 85px;
    height: 85px;
  }
`;

const TitleCard = styled.h3<{ $isMeditation: boolean }>`
  ${FontSizeSubtitle}
  font-size: 12px;
  color: ${({ $isMeditation }) =>
    $isMeditation ? Color.TextWhite : Color.TextStandard};
  text-align: center;

  @media (max-width: 550px) {
    font-size: 10px;
  }
`;

const CardCount = styled.p<{ $isMeditation: boolean }>`
  ${FontSizeSubtitle}
  font-size: 18px;
  color: ${({ $isMeditation }) =>
    $isMeditation ? Color.TextWhite : Color.TextStandard};
  text-align: center;

  @media (max-width: 550px) {
    font-size: 14px;
  }
`;
