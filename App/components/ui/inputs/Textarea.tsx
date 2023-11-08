import { styled } from "styled-components/native";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useEffect, useState } from "react";
import { GestureResponderEvent } from "react-native";
import { Color, DARK_THEME, LIGHT_THEME, Theme } from "../../../const";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { normalize } from "../../../utils";
import { getValueTheme } from "../../../store/themeSelectors";

type TextareaProps = {
  onChangeText: (text: string) => void;
  placeholder: string;
  height: number;
  borderColor: string;
  onTouchEnd: (event: GestureResponderEvent) => void;
  value: string;
};

export function Textarea(props: TextareaProps) {
  const { placeholder, onChangeText, value, height, borderColor, onTouchEnd } =
    props;
  const [isActive, setIsActive] = useState(false);
  const theme = useAppSelector(getValueTheme);
  const opacity = useSharedValue(0);
  const borderColorStyle = useAnimatedStyle(() => ({
    borderWidth: 3,
    borderStyle: "dashed",
    borderColor: interpolateColor(
      opacity.value,
      [0, 1],
      [
        "transparent",
        theme === Theme.Light
          ? LIGHT_THEME.backgroundColor.selectActive
          : DARK_THEME.backgroundColor.selectActive,
      ]
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
    <>
      <Outline style={borderColorStyle}>
        <TextInputStyled
          onFocus={() => setIsActive(true)}
          onBlur={() => setIsActive(false)}
          onTouchEnd={onTouchEnd}
          $borderColor={borderColor}
          $height={height}
          value={value}
          onChangeText={onChangeText}
          multiline
          textAlignVertical="top"
          placeholder={placeholder}
          cursorColor={
            theme === Theme.Light ? Color.TextStandard : Color.TextWhite
          }
          selectionColor={Color.PrimaryPastel}
          placeholderTextColor={
            theme === Theme.Light
              ? Color.PlaceholderLight
              : Color.PlaceholderDark
          }
        />
      </Outline>
    </>
  );
}

const Outline = styled(Animated.View)`
  padding: ${normalize(5)}px;
  border-radius: 15px;
`;

const TextInputStyled = styled.TextInput<{
  $height: number;
  $borderColor: string;
}>`
  height: ${({ $height }) => normalize($height)}px;
  color: ${({ theme }) => theme.color.standard};
  padding: ${normalize(15)}px;
  font-family: "Poppins-Regular";
  font-size: ${normalize(16)}px;
  border-radius: ${normalize(15)}px;
  border: ${normalize(7)}px dotted ${({ $borderColor }) => $borderColor};
`;
