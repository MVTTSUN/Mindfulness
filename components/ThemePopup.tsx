import { Pressable, useColorScheme } from "react-native";
import styled from "styled-components/native";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { changeTheme, setIdRadioButton } from "../store/themeSlice";
import { MAIN_COLOR } from "../const";
import { RadioButton } from "./ui/RadioButton";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

export function ThemePopup() {
  const variants = ["Как на устройстве", "Темная тема", "Светлая тема"];
  const dispatch = useAppDispatch();
  const idRadioButton = useAppSelector((state) => state.theme.idRadioButton);
  const colorScheme = useColorScheme();

  const changeThemeHandle = (index: number) => {
    switch (index) {
      case 0:
        dispatch(changeTheme(colorScheme));
        break;
      case 1:
        dispatch(changeTheme("dark"));
        break;
      case 2:
        dispatch(changeTheme("light"));
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
          {variants.map((variant, index) => (
            <Pressable
              key={index}
              onPress={() =>
                idRadioButton === index ? () => {} : changeThemeHandle(index)
              }
            >
              <RadioButton
                color={MAIN_COLOR.normal}
                text={variant}
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
  padding: 25px;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.backgroundColor.main};
`;

const TextTitle = styled.Text`
  margin-bottom: 10px;
  font-family: "Poppins-Medium";
  font-size: 18px;
  color: ${({ theme }) => theme.color.standard};
`;

const ViewVariants = styled.View`
  align-items: flex-start;
  gap: 10px;
`;
