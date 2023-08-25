import {
  Dimensions,
  Pressable,
  ScrollView,
  useColorScheme,
} from "react-native";
import { CenterContainer } from "./CenterContainer";
import { GlobalScreen } from "./GlobalScreen";
import { TopWithBack } from "./ui/TopWithBack";
import styled from "styled-components/native";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { changeTheme, setIdRadioButton } from "../store/themeSlice";

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
    <ViewPopup>
      <TextTheme>Тема</TextTheme>
      <ViewVariants>
        {variants.map((variant, index) => (
          <Pressable
            key={index}
            onPress={() =>
              idRadioButton === index ? () => {} : changeThemeHandle(index)
            }
          >
            <ViewVariant>
              <RadioButton>
                {idRadioButton === index && <RadioButtonFill />}
              </RadioButton>
              <TextStyled>{variant}</TextStyled>
            </ViewVariant>
          </Pressable>
        ))}
      </ViewVariants>
    </ViewPopup>
  );
}

const ViewPopup = styled.View`
  padding: 25px;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.backgroundColor.main};
`;

const TextTheme = styled.Text`
  margin-bottom: 10px;
  font-family: "Poppins-Medium";
  font-size: 18px;
  color: ${({ theme }) => theme.color.standard};
`;

const ViewVariants = styled.View`
  align-items: flex-start;
  gap: 10px;
`;

const ViewVariant = styled.View`
  align-items: center;
  flex-direction: row;
  gap: 15px;
`;

const TextStyled = styled.Text`
  font-family: "Poppins-Regular";
  font-size: 18px;
  color: ${({ theme }) => theme.color.standard};
`;

const RadioButton = styled.View`
  transform: translateY(-1px);
  align-items: center;
  justify-content: center;
  height: 25px;
  width: 25px;
  border: 3px solid #b5f2ea;
  border-radius: 40px;
`;

const RadioButtonFill = styled.View`
  height: 13px;
  width: 13px;
  background-color: #b5f2ea;
  border-radius: 40px;
`;
