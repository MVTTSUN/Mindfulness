import { styled } from "styled-components/native";
import { PropsWithChildren, memo, useEffect } from "react";
import { TouchableWithoutFeedback } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { DARK_THEME, LIGHT_THEME, Theme } from "../../../const";
import { normalize } from "../../../utils";
import { getValueTheme } from "../../../store/themeSelectors";

type TouchableOptionProps = PropsWithChildren<{
  onPress: () => void;
  isActive: boolean;
}>;

function TouchableOption(props: TouchableOptionProps) {
  const { children, onPress, isActive } = props;
  const theme = useAppSelector(getValueTheme);
  const backgroundColor = useSharedValue(isActive ? 1 : 0);
  const backgroundColorStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      backgroundColor.value,
      [0, 1],
      [
        "transparent",
        theme === Theme.Light
          ? LIGHT_THEME.backgroundColor.selectActive
          : DARK_THEME.backgroundColor.selectActive,
      ]
    ),
  }));
  const borderColor = useSharedValue(isActive ? 1 : 0);
  const borderColorStyle = useAnimatedStyle(() => ({
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: interpolateColor(
      borderColor.value,
      [0, 1],
      [
        theme === Theme.Light
          ? LIGHT_THEME.color.standard
          : DARK_THEME.color.standard,
        theme === Theme.Light
          ? LIGHT_THEME.backgroundColor.selectActive
          : DARK_THEME.backgroundColor.selectActive,
      ]
    ),
  }));
  const color = useSharedValue(isActive ? 1 : 0);
  const colorStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      color.value,
      [0, 1],
      [
        theme === Theme.Light
          ? LIGHT_THEME.color.standard
          : DARK_THEME.color.standard,
        theme === Theme.Light
          ? LIGHT_THEME.color.selectActive
          : DARK_THEME.color.selectActive,
      ]
    ),
  }));

  useEffect(() => {
    if (isActive) {
      backgroundColor.value = withTiming(1, { duration: 200 });
      borderColor.value = withTiming(1, { duration: 200 });
      color.value = withTiming(1, { duration: 200 });
    } else {
      backgroundColor.value = withTiming(0, { duration: 200 });
      borderColor.value = withTiming(0, { duration: 200 });
      color.value = withTiming(0, { duration: 200 });
    }
  }, [isActive]);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <ViewStyled
        $isActive={isActive}
        style={[backgroundColorStyle, borderColorStyle]}
      >
        <TextStyled $isActive={isActive} style={colorStyle}>
          {children}
        </TextStyled>
      </ViewStyled>
    </TouchableWithoutFeedback>
  );
}

export default memo(
  TouchableOption,
  (oldProps, newProps) => oldProps.isActive === newProps.isActive
);

const ViewStyled = styled(Animated.View)<{
  $isActive: boolean;
}>`
  align-items: center;
  width: 10%;
  height: ${normalize(31)}px;
  flex: auto;
  justify-content: center;
  border-radius: ${normalize(42)}px;
`;

const TextStyled = styled(Animated.Text)<{ $isActive: boolean }>`
  font-family: "Poppins-Regular";
  font-size: ${normalize(12)}px;
  line-height: ${normalize(18)}px;
`;
