import { styled } from "styled-components/native";
import { SearchIcon } from "../../svg/icons/other-icons/SearchIcon";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useEffect, useState } from "react";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { normalize } from "../../../utils";
import { Color, Theme } from "../../../const";
import { getValueTheme } from "../../../store/themeSelectors";

type InputProps = {
  onChangeText: (text: string) => void;
  width: string;
  withoutIcon?: boolean;
  placeholder: string;
  height?: string;
  isTextarea?: boolean;
  editable?: boolean;
  value: string;
};

export function Input(props: InputProps) {
  const { value, width, withoutIcon, placeholder, onChangeText, editable } =
    props;
  const [isFocus, setIsFocus] = useState(false);
  const theme = useAppSelector(getValueTheme);
  const opacity = useSharedValue(0);
  const borderColorAnimated = useAnimatedStyle(() => ({
    borderWidth: 3,
    borderStyle: "solid",
    borderColor: interpolateColor(
      opacity.value,
      [0, 1],
      ["transparent", Color.Primary]
    ),
  }));

  useEffect(() => {
    if (isFocus) {
      opacity.value = withTiming(1, { duration: 200 });
    } else {
      opacity.value = withTiming(0, { duration: 200 });
    }
  }, [isFocus]);

  return (
    <ViewStyled $width={width}>
      {!withoutIcon && <SearchIcon />}
      <FocusOutline style={borderColorAnimated}>
        <TextInputStyled
          value={value}
          editable={editable}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChangeText={onChangeText}
          placeholder={placeholder}
          cursorColor={
            theme === Theme.Light
              ? `${Color.TextStandard}70`
              : `${Color.TextWhite}70`
          }
          selectionColor={
            theme === Theme.Light
              ? `${Color.TextStandard}70`
              : `${Color.TextWhite}70`
          }
          placeholderTextColor={
            theme === Theme.Light
              ? Color.PlaceholderLight
              : Color.PlaceholderDark
          }
          $withoutIcon={withoutIcon}
        />
      </FocusOutline>
    </ViewStyled>
  );
}

const ViewStyled = styled.View<{ $width: string }>`
  flex-basis: ${({ $width }) => $width};
  position: relative;
`;

const TextInputStyled = styled.TextInput<{
  $withoutIcon?: boolean;
}>`
  height: ${normalize(32)}px;
  color: ${({ theme }) => theme.color.standard};
  padding: ${normalize(2)}px ${normalize(10)}px 0
    ${({ $withoutIcon }) =>
      $withoutIcon ? `${normalize(10)}px` : `${normalize(40)}px`};
  font-family: "Poppins-Regular";
  font-size: ${normalize(12)}px;
  line-height: ${normalize(16)}px;
  border: ${normalize(1)}px solid ${({ theme }) => theme.color.standard};
  border-radius: ${normalize(20)}px;
`;

const FocusOutline = styled(Animated.View)`
  align-self: flex-start;
  width: 100%;
  padding: ${normalize(3)}px;
  border-radius: ${normalize(40)}px;
`;
