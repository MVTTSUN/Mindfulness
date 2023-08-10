import { PropsWithChildren } from "react";
import { styled } from "styled-components/native";
import { MoreIcons } from "../../icons/MoreIcons";
import { useAppSelector } from "../../../hooks/useAppSelector";

type TouchableCardMeditationProps = PropsWithChildren<{
  onPress: () => void;
  isAll?: boolean;
}>;

export function TouchableCardMeditation({
  children,
  onPress,
  isAll,
}: TouchableCardMeditationProps) {
  const theme = useAppSelector((state) => state.theme.value);

  return (
    <TouchableHighlightStyled
      $isAll={isAll}
      onPress={onPress}
      underlayColor={theme === "light" ? "#d3d3db" : "#1f1f1f"}
    >
      <TextContainer>
        <TextWhite>{children}</TextWhite>
        {isAll && <MoreIcons />}
      </TextContainer>
    </TouchableHighlightStyled>
  );
}

const TouchableHighlightStyled = styled.TouchableHighlight<{
  $isAll?: boolean;
}>`
  width: 31%;
  height: 31%;
  aspect-ratio: 1 / 1;
  justify-content: center;
  align-items: center;
  padding: 20px 10px 15px;
  background-color: ${({ $isAll, theme }) =>
    $isAll ? "transparent" : theme.backgroundColor.meditationCard};
  border-radius: 25px;
  border: ${({ $isAll, theme }) =>
    $isAll ? `1px solid ${theme.color.standard}` : "none"};
`;

const TextContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const TextWhite = styled.Text`
  text-align: center;
  font-family: "Poppins-Regular";
  font-size: 12px;
  line-height: 16px;
  color: ${({ theme }) => theme.color.standard};
`;
