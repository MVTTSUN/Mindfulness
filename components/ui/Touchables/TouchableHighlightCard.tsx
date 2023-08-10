import { PropsWithChildren } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { styled } from "styled-components/native";

type TouchableHighlightCardProps = PropsWithChildren<{
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}>;

export function TouchableHighlightCard({
  style,
  children,
  onPress,
}: TouchableHighlightCardProps) {
  return (
    <TouchableHighlightStyled
      style={style}
      onPress={onPress}
      underlayColor="#aedcd6"
    >
      <TextWhite>{children}</TextWhite>
    </TouchableHighlightStyled>
  );
}

const TouchableHighlightStyled = styled.TouchableHighlight`
  flex: 1;
  flex-basis: 48%;
  justify-content: center;
  align-items: center;
  padding: 40px 10px 35px;
  background-color: #d4f4ef;
  border-radius: 25px;
`;

const TextWhite = styled.Text`
  font-family: "Poppins-Medium";
  font-size: 14px;
  line-height: 16px;
  color: #313131;
`;
