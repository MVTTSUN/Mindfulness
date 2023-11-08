import { styled } from "styled-components/native";
import { PropsWithChildren } from "react";
import { normalize } from "../../../utils";
import { Color } from "../../../const";

type TouchableHighlightProps = PropsWithChildren<{
  onPress: () => void;
  isRound?: boolean;
  backgroundColor?: string;
  underlayColor?: string;
  color?: string;
}>;

export function TouchableHighlight(props: TouchableHighlightProps) {
  const { children, onPress, isRound, backgroundColor, underlayColor, color } =
    props;

  return (
    <TouchableHighlightStyled
      $mainColor={Color.Primary}
      $backgroundColor={backgroundColor}
      onPress={onPress}
      $isRound={isRound}
      underlayColor={underlayColor ? underlayColor : Color.PrimaryPressed}
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
  padding: ${({ $isRound }) =>
    $isRound
      ? `${normalize(5)}px`
      : `${normalize(20)}px ${normalize(40)}px ${normalize(15)}px`};
  background-color: ${({ $backgroundColor, $mainColor }) =>
    $backgroundColor ? $backgroundColor : $mainColor};
  border-radius: ${normalize(42)}px;
`;

const TextStyle = styled.Text<{ $color?: string }>`
  text-align: center;
  font-family: "Poppins-Medium";
  font-size: ${normalize(14)}px;
  line-height: ${normalize(16)}px;
  color: ${({ $color }) => ($color ? $color : Color.TextStandard)};
`;
