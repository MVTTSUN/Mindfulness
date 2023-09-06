import { GlobalScreen } from "../../components/GlobalScreen";
import { Title } from "../../components/ui/Titles/Title";
import { CenterContainer } from "../../components/CenterContainer";
import { CardListMeditation } from "../../components/ui/CardListMeditation";
import { Input } from "../../components/ui/Input";
import { styled } from "styled-components/native";
import { Select } from "../../components/ui/Select";
import { OPTIONS_DATA } from "../../const";

export function Tasks() {
  return (
    <GlobalScreen>
      <CenterContainer>
        <Title>Задания</Title>
        <SearchView>
          <Input onChangeText={() => {}} width="70%" placeholder="Поиск" />
        </SearchView>
      </CenterContainer>
      <Select optionsData={OPTIONS_DATA} />
      <CenterContainer>
        <CardListMeditation count={15} />
      </CenterContainer>
    </GlobalScreen>
  );
}

const SearchView = styled.View`
  flex-direction: row;
`;
