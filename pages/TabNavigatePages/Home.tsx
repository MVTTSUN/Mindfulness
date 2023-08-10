import { GlobalScreen } from "../../components/GlobalScreen";
import { Title } from "../../components/ui/Titles/Title";
import { MAIN_CARDS, OPTIONS_DATA } from "../../const";
import { Select } from "../../components/ui/Select";
import { CenterContainer } from "../../components/CenterContainer";
import { Subtitle } from "../../components/ui/Titles/Subtitle";
import { CardListMeditation } from "../../components/ui/CardListMeditation";
import { CardListMain } from "../../components/ui/CardListMain";

export function Home() {
  return (
    <GlobalScreen>
      <CenterContainer>
        <Title>Привет!</Title>
        <CardListMain mainCards={MAIN_CARDS} />
        <Title>Как себя чувствуешь?</Title>
      </CenterContainer>
      <Select optionsData={OPTIONS_DATA} />
      <CenterContainer>
        <Subtitle>Подходящие медитации</Subtitle>
        <CardListMeditation count={6} />
      </CenterContainer>
    </GlobalScreen>
  );
}
