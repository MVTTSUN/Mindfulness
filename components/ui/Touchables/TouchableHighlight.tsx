import { styled } from "styled-components/native";
import { PropsWithChildren } from "react";
import { MAIN_COLOR } from "../../../const";

type TouchableHighlightProps = PropsWithChildren<{
  onPress: () => void;
  isRound?: boolean;
  backgroundColor?: string;
  underlayColor?: string;
  color?: string;
}>;

export function TouchableHighlight({
  children,
  onPress,
  isRound,
  backgroundColor,
  underlayColor,
  color,
}: TouchableHighlightProps) {
  return (
    <TouchableHighlightStyled
      $mainColor={MAIN_COLOR.normal}
      $backgroundColor={backgroundColor}
      onPress={onPress}
      $isRound={isRound}
      underlayColor={underlayColor ? underlayColor : MAIN_COLOR.normalPressed}
    >
      {isRound ? children : <TextStyle $color={color}>{children}</TextStyle>}
    </TouchableHighlightStyled>
  );
}

const TouchableHighlightStyled = styled.TouchableHighlight<{
  $isRound?: boolean;
  $backgroundColor?: string;
  $mainColor: string;
}>`
  align-self: center;
  align-items: center;
  padding: ${({ $isRound }) => ($isRound ? "5px" : "20px 40px 15px")};
  background-color: ${({ $backgroundColor, $mainColor }) =>
    $backgroundColor ? $backgroundColor : $mainColor};
  border-radius: 42px;
`;

const TextStyle = styled.Text<{ $color?: string }>`
  font-family: "Poppins-Medium";
  font-size: 14px;
  line-height: 16px;
  color: ${({ $color }) => ($color ? $color : "#313131")};
`;
