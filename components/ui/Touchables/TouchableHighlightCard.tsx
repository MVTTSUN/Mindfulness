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
      <TextStyled>{children}</TextStyled>
    </TouchableHighlightStyled>
  );
}

const TouchableHighlightStyled = styled.TouchableHighlight`
  height: 100px;
  flex: 1;
  flex-basis: 48%;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: #d4f4ef;
  border-radius: 25px;
`;

const TextStyled = styled.Text`
  text-align: center;
  font-family: "Poppins-Medium";
  font-size: 14px;
  line-height: 20px;
  color: #313131;
`;
