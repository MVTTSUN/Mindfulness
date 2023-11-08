import { Pressable, useColorScheme } from "react-native";
import styled from "styled-components/native";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { changeTheme, setIdRadioButton } from "../../../store/themeSlice";
import { RadioButton } from "../inputs/RadioButton";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { normalize } from "../../../utils";
import { getIdRadioButtonTheme } from "../../../store/themeSelectors";
import { Color, THEME_OPTIONS, Theme } from "../../../const";

export function ThemePopup() {
  const idRadioButton = useAppSelector(getIdRadioButtonTheme);
  const dispatch = useAppDispatch();
  const colorScheme = useColorScheme();

  const changeThemeHandle = (index: number) => {
    switch (index) {
      case 0:
        dispatch(changeTheme(colorScheme));
        break;
      case 1:
        dispatch(changeTheme(Theme.Dark));
        break;
      case 2:
        dispatch(changeTheme(Theme.Light));
        break;
    }
    dispatch(setIdRadioButton(index));
  };

  return (
    <Animated.View
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(200)}
    >
      <ViewPopup>
        <TextTitle>Тема</TextTitle>
        <ViewVariants>
          {THEME_OPTIONS.map((option, index) => (
            <Pressable
              key={index}
              onPress={() =>
                idRadioButton === index ? () => {} : changeThemeHandle(index)
              }
            >
              <RadioButton
                color={Color.Primary}
                text={option}
                isActive={idRadioButton === index}
              />
            </Pressable>
          ))}
        </ViewVariants>
      </ViewPopup>
    </Animated.View>
  );
}

const ViewPopup = styled.View`
  padding: ${normalize(25)}px;
  border-radius: ${normalize(15)}px;
  background-color: ${({ theme }) => theme.backgroundColor.main};
`;

const TextTitle = styled.Text`
  margin-bottom: 10px;
  font-family: "Poppins-Medium";
  font-size: ${normalize(18)}px;
  color: ${({ theme }) => theme.color.standard};
`;

const ViewVariants = styled.View`
  align-items: flex-start;
  gap: 10px;
`;
