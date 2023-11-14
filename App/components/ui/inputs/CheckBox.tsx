import styled from "styled-components/native";
import { CheckIcon } from "../../svg/icons/other-icons/CheckIcon";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { normalize } from "../../../utils";
import { Color } from "../../../const";

type CheckBoxProps = {
  color?: string;
  backgroundColor: string;
  text?: string;
  isActive: boolean;
  isRound?: boolean;
  isStroke?: boolean;
  isInColumn?: boolean;
  isSmall?: boolean;
  isNoAdaptiveColor?: boolean;
};

export function CheckBox(props: CheckBoxProps) {
  const {
    color,
    backgroundColor,
    text,
    isActive,
    isRound,
    isStroke,
    isInColumn,
    isSmall,
    isNoAdaptiveColor,
  } = props;

  return (
    <Container $isInColumn={isInColumn}>
      <CheckBoxStyled
        $backgroundColor={
          backgroundColor === "" ? Color.Meditation : backgroundColor
        }
        $isActive={isActive}
        $isRound={isRound}
        $isSmall={isSmall}
      >
        {isActive && (
          <Fill
            $isRound={isRound}
            $backgroundColor={
              backgroundColor === "" ? Color.Meditation : backgroundColor
            }
            $isSmall={isSmall}
            entering={FadeIn.duration(100)}
            exiting={FadeOut.duration(100)}
          >
            <CheckIcon
              color={color}
              size={isSmall ? 13 : 20}
              isStroke={isStroke}
            />
          </Fill>
        )}
      </CheckBoxStyled>
      {text && <TextStyled $isSmall={isSmall} $isNoAdaptiveColor={isNoAdaptiveColor}>{text}</TextStyled>}
    </Container>
  );
}

const CheckBoxStyled = styled.View<{
  $backgroundColor: string;
  $isActive: boolean;
  $isRound?: boolean;
  $isSmall?: boolean;
}>`
  align-items: center;
  justify-content: center;
  height: ${({ $isSmall }) => ($isSmall ? normalize(18) : normalize(25))}px;
  width: ${({ $isSmall }) => ($isSmall ? normalize(18) : normalize(25))}px;
  border: ${normalize(3)}px solid ${({ $backgroundColor }) => $backgroundColor};
  border-radius: ${({ $isRound }) =>
    $isRound ? normalize(20) : normalize(5)}px;
`;

const Fill = styled(Animated.View)<{
  $backgroundColor: string;
  $isRound?: boolean;
  $isSmall?: boolean;
}>`
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  border-radius: ${({ $isRound }) => ($isRound ? normalize(20) : 0)}px;
`;

const Container = styled.View<{ $isInColumn?: boolean }>`
  align-items: center;
  flex-direction: ${({ $isInColumn }) => ($isInColumn ? "column" : "row")};
  gap: ${({ $isInColumn }) => ($isInColumn ? 2 : 15)}px;
`;

const TextStyled = styled.Text<{ $isSmall?: boolean; $isNoAdaptiveColor?: boolean }>`
  font-family: "Poppins-Regular";
  font-size: ${({ $isSmall }) => ($isSmall ? normalize(10) : normalize(18))}px;
  color: ${({ $isNoAdaptiveColor, theme }) => $isNoAdaptiveColor ? Color.TextStandard : theme.color.standard};
`;
