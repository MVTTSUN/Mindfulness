import { styled } from "styled-components/native";
import { TouchableHighlightCardMain } from "./Touchables/TouchableHighlightCardMain";
import {
  InfoAndSettingsScreenProp,
  MainCard,
  MeditationScreenProp,
} from "../../types";
import { useNavigation } from "@react-navigation/native";

type CardListMainProps = {
  mainCards: MainCard[];
};

export function CardListMain({ mainCards }: CardListMainProps) {
  const navigation = useNavigation<
    MeditationScreenProp & InfoAndSettingsScreenProp
  >();

  return (
    <ViewStyled>
      {mainCards.map((card) => (
        <TouchableHighlightCardMain
          key={card.id}
          onPress={() =>
            navigation.navigate(
              card.screen as
                | "InfoAndSettings"
                | "Contacts"
                | "Service"
                | "InfoAndSettingsStack"
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
  gap: 10px;
`;
