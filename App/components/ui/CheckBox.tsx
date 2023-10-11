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
  return (
    <Container>
      <CheckBoxStyled
        $backgroundColor={
          backgroundColor === ""
            ? COLORS.backgroundColors.meditationCard
            : backgroundColor
        }
        $isActive={isActive}
        $isRound={isRound}
      >
        {isActive && (
          <Fill
            $isRound={isRound}
            $backgroundColor={
              backgroundColor === ""
                ? COLORS.backgroundColors.meditationCard
                : backgroundColor
            }
            entering={FadeIn.duration(100)}
            exiting={FadeOut.duration(100)}
          >
            <CheckIcon color={color} size={20} isStroke={isStroke} />
          </Fill>
        )}
      </CheckBoxStyled>
      {text && <TextStyled>{text}</TextStyled>}
    </Container>
  );
}

const CheckBoxStyled = styled.View<{
  $backgroundColor: string;
  $isActive: boolean;
  $isRound?: boolean;
}>`
  align-items: center;
  justify-content: center;
  height: 25px;
  width: 25px;
  border: 3px solid ${({ $backgroundColor }) => $backgroundColor};
  border-radius: ${({ $isRound }) => ($isRound ? "20px" : "5px")};
`;

const Fill = styled(Animated.View)<{
  $backgroundColor: string;
  $isRound?: boolean;
}>`
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  border-radius: ${({ $isRound }) => ($isRound ? "20px" : "0px")};
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
