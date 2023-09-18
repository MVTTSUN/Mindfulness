import styled from "styled-components/native";
import { COLORS } from "../../const";
import { StatisticsIcon } from "../icons/StatisticsIcon";
import { useNavigation } from "@react-navigation/native";
import { NotesScreenProp } from "../../types";
import { Dispatch, SetStateAction } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";

type NotesFilterProps = {
  setIsOpenTypesPopup: Dispatch<SetStateAction<boolean>>;
  setIsOpenYearsPopup: Dispatch<SetStateAction<boolean>>;
  setIsOpenMonthsPopup: Dispatch<SetStateAction<boolean>>;
  isHideButtonStatistics?: boolean;
};

export function NotesFilter({
  setIsOpenTypesPopup,
  setIsOpenYearsPopup,
  setIsOpenMonthsPopup,
  isHideButtonStatistics,
}: NotesFilterProps) {
  const navigation = useNavigation<NotesScreenProp>();
  const queryType = useAppSelector((state) => state.notes.queries.type);
  const queryMonth = useAppSelector((state) => state.notes.queries.month);
  const queryYear = useAppSelector((state) => state.notes.queries.year);

  return (
    <Container>
      <ButtonFilter
        onPress={() => setIsOpenTypesPopup(true)}
        underlayColor={COLORS.mainColors.normalPressed}
        $isHideButtonStatistics={isHideButtonStatistics}
      >
        <TextFilter>{queryType === "Всё" ? "Тип" : queryType}</TextFilter>
      </ButtonFilter>
      <ButtonFilter
        onPress={() => setIsOpenMonthsPopup(true)}
        underlayColor={COLORS.mainColors.normalPressed}
        $isHideButtonStatistics={isHideButtonStatistics}
      >
        <TextFilter>{queryMonth === "Всё" ? "Месяц" : queryMonth}</TextFilter>
      </ButtonFilter>
      <ButtonFilter
        onPress={() => setIsOpenYearsPopup(true)}
        underlayColor={COLORS.mainColors.normalPressed}
        $isHideButtonStatistics={isHideButtonStatistics}
      >
        <TextFilter>{queryYear === "Всё" ? "Год" : queryYear}</TextFilter>
      </ButtonFilter>
      {!isHideButtonStatistics && (
        <ButtonStatistics
          onPress={() => navigation.navigate("Statistics")}
          underlayColor={COLORS.mainColors.normalPressed}
        >
          <StatisticsIcon />
        </ButtonStatistics>
      )}
    </Container>
  );
}

const Container = styled.View`
  height: 50px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  margin-bottom: 15px;
`;

const ButtonStatistics = styled.TouchableHighlight`
  padding: 5px;
  height: 100%;
  aspect-ratio: 1 / 1;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background-color: ${COLORS.mainColors.normal};
`;

const ButtonFilter = styled.TouchableHighlight<{
  $isHideButtonStatistics?: boolean;
}>`
  padding: 5px;
  justify-content: center;
  height: 100%;
  align-items: center;
  width: ${({ $isHideButtonStatistics }) =>
    $isHideButtonStatistics ? "32%" : "27%"};
  background-color: ${COLORS.mainColors.normal};
  border-radius: 20px;
`;

const TextFilter = styled.Text`
  font-family: "Poppins-Medium";
  font-size: 14px;
  align-self: center;
  color: ${COLORS.textColors.normal};
`;
