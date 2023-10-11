import { Pressable, ScrollView } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import styled from "styled-components/native";
import { RadioButton } from "./ui/RadioButton";
import { COLORS } from "../const";
import { useState } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { searchNotes, updateQueries } from "../store/notesSlice";
import { useAppSelector } from "../hooks/useAppSelector";

export function YearsPopup() {
  const years = ["Всё"];
  for (let i = 2021; i <= new Date().getFullYear(); i++) {
    years.push(String(i));
  }
  const queryYear = useAppSelector((state) => state.notes.queries.year);
  const [selectedYear, setSelectedYear] = useState(queryYear);
  const dispatch = useAppDispatch();

  const changeYear = (year: string) => {
    setSelectedYear(year);
    dispatch(updateQueries({ property: "year", value: year }));
    dispatch(searchNotes());
  };

  return (
    <Animated.View
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(200)}
    >
      <ViewPopup>
        <TextTitle>Год</TextTitle>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ViewVariants>
            {years.map((year, index) => (
              <Pressable key={index} onPress={() => changeYear(year)}>
                <RadioButton
                  color={COLORS.mainColors.normal}
                  text={year}
                  isActive={selectedYear === year}
                />
              </Pressable>
            ))}
          </ViewVariants>
        </ScrollView>
      </ViewPopup>
    </Animated.View>
  );
}

const ViewPopup = styled.View`
  gap: 20px;
  padding: 20px;
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.backgroundColor.main};
  border-radius: 20px;
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
