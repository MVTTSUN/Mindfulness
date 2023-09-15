import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import styled from "styled-components/native";

type RadioButtonProps = {
  color: string;
  text: string;
  isActive: boolean;
};

export function RadioButton({ color, text, isActive }: RadioButtonProps) {
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
  transform: translateY(-1px);
  align-items: center;
  justify-content: center;
  height: 25px;
  width: 25px;
  border: 3px solid ${({ $color }) => $color};
  border-radius: 40px;
`;

const RadioButtonFill = styled.View<{ $color: string }>`
  height: 13px;
  width: 13px;
  background-color: ${({ $color }) => $color};
  border-radius: 40px;
`;

const Container = styled.View`
  align-items: center;
  flex-direction: row;
  gap: 15px;
`;

const TextStyled = styled.Text`
  font-family: "Poppins-Regular";
  font-size: 18px;
  color: ${({ theme }) => theme.color.standard};
`;
