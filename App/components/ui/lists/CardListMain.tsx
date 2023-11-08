import { styled } from "styled-components/native";
import { TouchableHighlightCardMain } from "../touchables/TouchableHighlightCardMain";
import {
  InfoAndSettingsScreenProp,
  MainCard,
  MeditationScreenProp,
} from "../../../types";
import { useNavigation } from "@react-navigation/native";
import { normalize } from "../../../utils";
import { AppRoute } from "../../../const";

type CardListMainProps = {
  mainCards: MainCard[];
};

export function CardListMain(props: CardListMainProps) {
  const { mainCards } = props;
  const navigation = useNavigation<
    MeditationScreenProp & InfoAndSettingsScreenProp
  >();

  return (
    <ViewStyled>
      {mainCards.map((card) => (
        <TouchableHighlightCardMain
          key={card.id}
          id={card.id}
          onPress={() =>
            navigation.navigate(
              card.screen as
                | AppRoute.InfoAndSettings
                | AppRoute.Contacts
                | AppRoute.Service
                | AppRoute.InfoAndSettingsStack
            )
          }
        >
          {card.title}
        </TouchableHighlightCardMain>
      ))}
    </ViewStyled>
  );
}

const ViewStyled = styled.View`
  margin-bottom: 25px;
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${normalize(10)}px;
`;
