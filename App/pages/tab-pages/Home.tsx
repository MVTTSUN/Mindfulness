import { GlobalScreen } from "../../components/GlobalScreenWrapper";
import { Title } from "../../components/ui/titles/Title";
import { MAIN_CARDS, OPTIONS_DATA_MEDITATIONS } from "../../const";
import { Select } from "../../components/ui/inputs/Select";
import { CenterContainer } from "../../components/CenterContainer";
import { Subtitle } from "../../components/ui/titles/Subtitle";
import { CardListMeditation } from "../../components/ui/lists/CardListMeditation";
import { CardListMain } from "../../components/ui/lists/CardListMain";
import { CardListTasks } from "../../components/ui/lists/CardListTasks";

export function Home() {
  return (
    <GlobalScreen>
      <CenterContainer>
        <Title>Привет!</Title>
        <CardListMain mainCards={MAIN_CARDS} />
        <Title>Выбери уровень сложности</Title>
      </CenterContainer>
      <Select optionsData={OPTIONS_DATA_MEDITATIONS} />
      <CenterContainer>
        <Subtitle>Подходящие медитации</Subtitle>
        <CardListMeditation count={6} />
        <Subtitle>Подходящие задания</Subtitle>
        <CardListTasks count={6} />
      </CenterContainer>
    </GlobalScreen>
  );
}
