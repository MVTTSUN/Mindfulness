import { styled } from "styled-components/native";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useEffect, useState } from "react";
import {
  GestureResponderEvent,
  LayoutChangeEvent,
  NativeSyntheticEvent,
  NativeTouchEvent,
  TextInputFocusEventData,
} from "react-native";
import { COLORS, DARK_THEME, LIGHT_THEME } from "../../const";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type InputProps = {
  onChangeText: (text: string) => void;
  placeholder: string;
  height: number;
  borderColor: string;
  onTouchEnd: (event: GestureResponderEvent) => void;
  value: string;
};

export function InputTextareaTransparent({
  placeholder,
  onChangeText,
  value,
  height,
  borderColor,
  onTouchEnd,
}: InputProps) {
  const [isActive, setIsActive] = useState(false);
  const theme = useAppSelector((state) => state.theme.value);
  const opacity = useSharedValue(0);
  const borderColorStyle = useAnimatedStyle(() => ({
    borderWidth: 3,
    borderStyle: "dashed",
    borderColor: interpolateColor(
      opacity.value,
      [0, 1],
      [
        "transparent",
        theme === "light"
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
          cursorColor={theme === "light" ? "#313131" : "#edecf5"}
          selectionColor={COLORS.mainColors.pastel}
          placeholderTextColor={
            theme === "light"
              ? "rgba(49, 49, 49, 0.3)"
              : "rgba(237, 236, 245, 0.3)"
          }
        />
      </Outline>
    </>
  );
}

const Outline = styled(Animated.View)`
  padding: 5px;
  border-radius: 15px;
`;

const TextInputStyled = styled.TextInput<{
  $height: number;
  $borderColor: string;
}>`
  height: ${({ $height }) => $height}px;
  color: ${({ theme }) => theme.color.standard};
  padding: 15px;
  font-family: "Poppins-Regular";
  font-size: 16px;
  border-radius: 15px;
  border: 7px dotted ${({ $borderColor }) => $borderColor};
`;
