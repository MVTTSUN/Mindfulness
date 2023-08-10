import { GlobalScreen } from "../../components/GlobalScreen";
import { useNavigation, useRoute } from "@react-navigation/native";
import { HomeScreenProp, MeditationData } from "../../types";
import { CenterContainer } from "../../components/CenterContainer";
import { Title } from "../../components/ui/Titles/Title";
import { Input } from "../../components/ui/Input";
import { Select } from "../../components/ui/Select";
import { OPTIONS_DATA } from "../../const";
import { Subtitle } from "../../components/ui/Titles/Subtitle";
import { CardListMeditation } from "../../components/ui/CardListMeditation";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { searchMeditations } from "../../store/meditationsSlice";
import { useEffect } from "react";

export function Meditation() {
  const navigation = useNavigation<HomeScreenProp>();
  const dispatch = useAppDispatch();
  const route = useRoute();

  useEffect(() => {
    if (route.params) {
      const { meditation } = route.params as { meditation: MeditationData };
      navigation.navigate("Audio", { meditation });
    }
  }, [route.params]);

  return (
    <GlobalScreen>
      <CenterContainer>
        <Title>Медитации</Title>
        <Input
          onChangeText={(text) => dispatch(searchMeditations(text))}
          width="70%"
          placeholder="Поиск"
        />
      </CenterContainer>
      <Select optionsData={OPTIONS_DATA} />
      <CenterContainer>
        <CardListMeditation count={9} />
        <Subtitle>Последняя медитация</Subtitle>
        <Subtitle>Как медитировать правильно?</Subtitle>
      </CenterContainer>
    </GlobalScreen>
  );
}
