import { Pressable } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import styled from "styled-components/native";
import { RadioButton } from "./ui/RadioButton";
import { COLORS } from "../const";
import { useState } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { searchNotes, updateQueries } from "../store/notesSlice";
import { useAppSelector } from "../hooks/useAppSelector";

export function TypesPopup() {
  const types = ["Всё", "Медитация", "Задание", "..."];
  const queryType = useAppSelector((state) => state.notes.queries.type);
  const [selectedType, setSelectedType] = useState(queryType);
  const dispatch = useAppDispatch();

  const changeType = (type: string) => {
    setSelectedType(type);
    dispatch(updateQueries({ property: "type", value: type }));
    dispatch(searchNotes());
  };

  return (
    <Animated.View
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(200)}
    >
      <ViewPopup>
        <TextTitle>Тип</TextTitle>
        <ViewVariants>
          {types.map((type, index) => (
            <Pressable key={index} onPress={() => changeType(type)}>
              <RadioButton
                color={COLORS.mainColors.normal}
                text={type}
                isActive={selectedType === type}
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
