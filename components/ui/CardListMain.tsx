import { styled } from "styled-components/native";
import { TouchableHighlightCard } from "../../components/ui/Touchables/TouchableHighlightCard";
import { MainCard } from "../../types";

type CardListMainProps = {
  mainCards: MainCard[];
};

export function CardListMain({ mainCards }: CardListMainProps) {
  return (
    <ViewStyled>
      {mainCards.map((card) => (
        <TouchableHighlightCard key={card.id} onPress={() => {}}>
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
