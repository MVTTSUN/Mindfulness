import { styled } from "styled-components/native";
import { SearchIcon } from "../icons/SearchIcon";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useEffect, useState } from "react";
import { COLORS } from "../../const";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type InputProps = {
  onChangeText: (text: string) => void;
  width: string;
  withoutIcon?: boolean;
  placeholder: string;
  height?: string;
  isTextarea?: boolean;
  editable?: boolean;
};

export function Input({
  width,
  withoutIcon,
  placeholder,
  onChangeText,
  editable,
}: InputProps) {
  const theme = useAppSelector((state) => state.theme.value);
  const [isFocus, setIsFocus] = useState(false);
  const opacity = useSharedValue(0);
  const borderColorAnimated = useAnimatedStyle(() => ({
    borderWidth: 3,
    borderStyle: "solid",
    borderColor: interpolateColor(
      opacity.value,
      [0, 1],
      ["transparent", COLORS.mainColors.normal]
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
          editable={editable}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChangeText={onChangeText}
          placeholder={placeholder}
          cursorColor={theme === "light" ? "#313131" : "#edecf5"}
          selectionColor={COLORS.mainColors.pastel}
          placeholderTextColor={theme === "light" ? "#929292" : "#656566"}
          $withoutIcon={withoutIcon}
        />
      </FocusOutline>
    </ViewStyled>
  );
}

const ViewStyled = styled.View<{ $width: string }>`
  flex-basis: ${({ $width }) => $width};
  position: relative;
  margin-bottom: 12px;
`;

const TextInputStyled = styled.TextInput<{
  $withoutIcon?: boolean;
}>`
  height: 32px;
  color: ${({ theme }) => theme.color.standard};
  padding: 2px 10px 0 ${({ $withoutIcon }) => ($withoutIcon ? "10px" : "40px")};
  font-family: "Poppins-Regular";
  font-size: 12px;
  line-height: 16px;
  border: 1px solid ${({ theme }) => theme.color.standard};
  border-radius: 20px;
`;

const FocusOutline = styled(Animated.View)`
  align-self: flex-start;
  width: 100%;
  padding: 3px;
  border-radius: 40px;
`;
