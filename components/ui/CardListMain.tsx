import { styled } from "styled-components/native";
import { TouchableHighlightCard } from "../../components/ui/Touchables/TouchableHighlightCard";
import { MainCard } from "../../types";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { changeTheme } from "../../store/themeSlice";

type CardListMainProps = {
  mainCards: MainCard[];
};

export function CardListMain({ mainCards }: CardListMainProps) {
  const dispatch = useAppDispatch();

  const toggleTheme = () => {
    dispatch(changeTheme());
  };

  return (
    <ViewStyled>
      {mainCards.map((card) => (
        <TouchableHighlightCard key={card.id} onPress={toggleTheme}>
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
