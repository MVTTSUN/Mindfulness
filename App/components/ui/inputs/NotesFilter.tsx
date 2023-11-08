import styled from "styled-components/native";
import { StatisticsIcon } from "../../svg/icons/other-icons/StatisticsIcon";
import { useNavigation } from "@react-navigation/native";
import { NotesScreenProp } from "../../../types";
import { Dispatch, SetStateAction } from "react";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { normalize } from "../../../utils";
import { getNotesQueries } from "../../../store/notesSelectors";
import { AppRoute, Color } from "../../../const";

type NotesFilterProps = {
  setIsOpenTypesPopup: Dispatch<SetStateAction<boolean>>;
  setIsOpenYearsPopup: Dispatch<SetStateAction<boolean>>;
  setIsOpenMonthsPopup: Dispatch<SetStateAction<boolean>>;
  isHideButtonStatistics?: boolean;
};

export function NotesFilter(props: NotesFilterProps) {
  const {
    setIsOpenTypesPopup,
    setIsOpenYearsPopup,
    setIsOpenMonthsPopup,
    isHideButtonStatistics,
  } = props;
  const navigation = useNavigation<NotesScreenProp>();
  const queries = useAppSelector(getNotesQueries);

  return (
    <Container>
      <ButtonFilter
        onPress={() => setIsOpenTypesPopup(true)}
        underlayColor={Color.PrimaryPressed}
        $isHideButtonStatistics={isHideButtonStatistics}
      >
        <TextFilter>{queries.type === "Всё" ? "Тип" : queries.type}</TextFilter>
      </ButtonFilter>
      <ButtonFilter
        onPress={() => setIsOpenMonthsPopup(true)}
        underlayColor={Color.PrimaryPressed}
        $isHideButtonStatistics={isHideButtonStatistics}
      >
        <TextFilter>
          {queries.month === "Всё" ? "Месяц" : queries.month}
        </TextFilter>
      </ButtonFilter>
      <ButtonFilter
        onPress={() => setIsOpenYearsPopup(true)}
        underlayColor={Color.PrimaryPressed}
        $isHideButtonStatistics={isHideButtonStatistics}
      >
        <TextFilter>{queries.year === "Всё" ? "Год" : queries.year}</TextFilter>
      </ButtonFilter>
      {!isHideButtonStatistics && (
        <ButtonStatistics
          onPress={() => navigation.navigate(AppRoute.Statistics)}
          underlayColor={Color.PrimaryPressed}
        >
          <StatisticsIcon />
        </ButtonStatistics>
      )}
    </Container>
  );
}

const Container = styled.View`
  height: ${normalize(50)}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: ${normalize(5)}px;
  margin-bottom: 15px;
`;

const ButtonStatistics = styled.TouchableHighlight`
  padding: ${normalize(5)}px;
  height: 100%;
  aspect-ratio: 1 / 1;
  justify-content: center;
  align-items: center;
  border-radius: ${normalize(20)}px;
  background-color: ${Color.Primary};
`;

const ButtonFilter = styled.TouchableHighlight<{
  $isHideButtonStatistics?: boolean;
}>`
  padding: ${normalize(5)}px;
  justify-content: center;
  height: 100%;
  align-items: center;
  width: ${({ $isHideButtonStatistics }) =>
    $isHideButtonStatistics ? "32%" : "27%"};
  background-color: ${Color.Primary};
  border-radius: ${normalize(20)}px;
`;

const TextFilter = styled.Text`
  font-family: "Poppins-Medium";
  font-size: ${normalize(14)}px;
  align-self: center;
  color: ${Color.TextStandard};
`;
