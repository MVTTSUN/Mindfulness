import { styled } from "styled-components/native";
import { TouchableHighlightCard } from "../../components/ui/Touchables/TouchableHighlightCard";
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
        <TouchableHighlightCard
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
        </TouchableHighlightCard>
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
