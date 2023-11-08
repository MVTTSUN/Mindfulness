import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import styled from "styled-components/native";
import { normalize } from "../../../utils";

type RadioButtonProps = {
  color: string;
  text?: string;
  isActive: boolean;
};

export function RadioButton(props: RadioButtonProps) {
  const { color, text, isActive } = props;

  return (
    <Container>
      <RadioButtonStyled $color={color}>
        {isActive && (
          <Animated.View
            entering={FadeIn.duration(100)}
            exiting={FadeOut.duration(100)}
          >
            <RadioButtonFill $color={color} />
          </Animated.View>
        )}
      </RadioButtonStyled>
      <TextStyled>{text}</TextStyled>
    </Container>
  );
}

const RadioButtonStyled = styled.View<{ $color: string }>`
  transform: translateY(${normalize(-1)}px);
  align-items: center;
  justify-content: center;
  height: ${normalize(25)}px;
  width: ${normalize(25)}px;
  border: ${normalize(3)}px solid ${({ $color }) => $color};
  border-radius: ${normalize(40)}px;
`;

const RadioButtonFill = styled.View<{ $color: string }>`
  height: ${normalize(13)}px;
  width: ${normalize(13)}px;
  background-color: ${({ $color }) => $color};
  border-radius: ${normalize(40)}px;
`;

const Container = styled.View`
  align-items: center;
  flex-direction: row;
  gap: 15px;
`;

const TextStyled = styled.Text`
  font-family: "Poppins-Regular";
  font-size: ${normalize(18)}px;
  color: ${({ theme }) => theme.color.standard};
`;
