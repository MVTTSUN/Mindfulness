import { GlobalScreen } from "../../components/GlobalScreen";
import { Title } from "../../components/ui/Titles/Title";
import { CenterContainer } from "../../components/CenterContainer";
import { CardListMeditation } from "../../components/ui/CardListMeditation";
import { Input } from "../../components/ui/Input";
import { styled } from "styled-components/native";
import { Select } from "../../components/ui/Select";
import { COLORS, OPTIONS_DATA } from "../../const";
import { CardListTasks } from "../../components/ui/CardListTasks";
import { LikeIcon } from "../../components/icons/LikeIcon";

export function Tasks() {
  return (
    <GlobalScreen>
      <CenterContainer>
        <Title>Задания</Title>
        <SearchView>
          <Input onChangeText={() => {}} width="70%" placeholder="Поиск" />
          <FavoritesButton
            onPress={() => {}}
            underlayColor={COLORS.backgroundColors.taskCardPressed}
          >
            <LikeIcon color={COLORS.textColors.taskCard} isActive={false} />
          </FavoritesButton>
        </SearchView>
      </CenterContainer>
      <Select optionsData={OPTIONS_DATA} />
      <CenterContainer>
        <CardListTasks count={12} />
      </CenterContainer>
    </GlobalScreen>
  );
}

const SearchView = styled.View`
  flex-direction: row;
  gap: 5px;
`;

const FavoritesButton = styled.TouchableHighlight`
  height: 30px;
  padding: 3px 10px;
  background-color: ${COLORS.backgroundColors.taskCard};
  border-radius: 20px;
  transform: translateY(7px);
`;
