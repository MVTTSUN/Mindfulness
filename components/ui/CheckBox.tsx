import styled from "styled-components/native";
import { CheckIcon } from "../icons/CheckIcon";
import { COLORS } from "../../const";
import Animated, {
  FadeIn,
  FadeOut,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";

type CheckBoxProps = {
  color?: string;
  backgroundColor: string;
  text?: string;
  isActive: boolean;
  isRound?: boolean;
  isStroke?: boolean;
};

export function CheckBox({
  color,
  backgroundColor,
  text,
  isActive,
  isRound,
  isStroke,
}: CheckBoxProps) {
  const opacity = useSharedValue(0);
  const backgroundColorAnimation = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      opacity.value,
      [0, 1],
      ["transparent", backgroundColor]
    ),
  }));

  useEffect(() => {
    if (isActive) {
      opacity.value = withTiming(1, { duration: 200 });
    } else {
      opacity.value = withTiming(0, { duration: 200 });
    }
  }, [isActive]);

  return (
    <Container>
      <CheckBoxStyled
        style={backgroundColorAnimation}
        $borderColor={backgroundColor}
        $isActive={isActive}
        $isRound={isRound}
      >
        {isActive && (
          <Animated.View
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
          >
            <CheckIcon color={color} size={20} isStroke={isStroke} />
          </Animated.View>
        )}
      </CheckBoxStyled>
      {text && <TextStyled>{text}</TextStyled>}
    </Container>
  );
}

const CheckBoxStyled = styled(Animated.View)<{
  $borderColor: string;
  $isActive: boolean;
  $isRound?: boolean;
}>`
  align-items: center;
  justify-content: center;
  height: 25px;
  width: 25px;
  border: 3px solid ${({ $borderColor }) => $borderColor};
  border-radius: ${({ $isRound }) => ($isRound ? "20px" : "5px")};
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
