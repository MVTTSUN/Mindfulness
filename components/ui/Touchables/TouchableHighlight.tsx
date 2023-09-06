import { styled } from "styled-components/native";
import { PropsWithChildren } from "react";

type TouchableHighlightProps = PropsWithChildren<{
  onPress: () => void;
  isRound?: boolean;
  backgroundColor?: string;
  underlayColor?: string;
}>;

export function TouchableHighlight({
  children,
  onPress,
  isRound,
  backgroundColor,
  underlayColor,
}: TouchableHighlightProps) {
  return (
    <TouchableHighlightStyled
      $backgroundColor={backgroundColor}
      onPress={onPress}
      $isRound={isRound}
      underlayColor={underlayColor ? underlayColor : "#aedcd6"}
    >
      {isRound ? children : <TextWhite>{children}</TextWhite>}
    </TouchableHighlightStyled>
  );
}

const TouchableHighlightStyled = styled.TouchableHighlight<{
  $isRound?: boolean;
  $backgroundColor?: string;
}>`
  align-self: center;
  align-items: center;
  padding: ${({ $isRound }) => ($isRound ? "5px" : "20px 40px 15px")};
  background-color: ${({ $backgroundColor }) =>
    $backgroundColor ? $backgroundColor : "#b5f2ea"};
  border-radius: 42px;
`;

const TextWhite = styled.Text`
  font-family: "Poppins-Medium";
  font-size: 14px;
  line-height: 16px;
  color: #313131;
`;
