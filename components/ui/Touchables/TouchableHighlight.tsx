import { styled } from "styled-components/native";
import { PropsWithChildren } from "react";

type TouchableHighlightProps = PropsWithChildren<{
  onPress: () => void;
}>;

export function TouchableHighlight({
  children,
  onPress,
}: TouchableHighlightProps) {
  return (
    <TouchableHighlightStyled onPress={onPress} underlayColor="#aedcd6">
      <TextWhite>{children}</TextWhite>
    </TouchableHighlightStyled>
  );
}

const TouchableHighlightStyled = styled.TouchableHighlight`
  padding: 12px 40px 7px;
  background-color: #b5f2ea;
  border-radius: 42px;
`;

const TextWhite = styled.Text`
  font-family: "Poppins-Medium";
  font-size: 14px;
  line-height: 16px;
  color: #313131;
`;
