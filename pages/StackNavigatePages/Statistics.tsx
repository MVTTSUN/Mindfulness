import styled from "styled-components/native";
import { CenterContainer } from "../../components/CenterContainer";
import { GlobalScreen } from "../../components/GlobalScreen";
import { TopWithBack } from "../../components/ui/TopWithBack";
import { NotesFilter } from "../../components/ui/NotesFilter";
import { useState } from "react";

export function Statistics() {
  const [isOpenTypesPopup, setIsOpenTypesPopup] = useState(false);
  const [isOpenMonthsPopup, setIsOpenMonthsPopup] = useState(false);
  const [isOpenYearsPopup, setIsOpenYearsPopup] = useState(false);

  return (
    <GlobalScreen>
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
      </CenterContainer>
    </GlobalScreen>
  );
}

const TextTitle = styled.Text`
  font-family: "Poppins-Medium";
  font-size: 18px;
  color: ${({ theme }) => theme.color.standard};
`;
