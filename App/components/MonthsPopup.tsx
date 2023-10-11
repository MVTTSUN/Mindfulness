import { Pressable, ScrollView } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import styled from "styled-components/native";
import { RadioButton } from "./ui/RadioButton";
import { COLORS } from "../const";
import { useState } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { searchNotes, updateQueries } from "../store/notesSlice";
import { useAppSelector } from "../hooks/useAppSelector";

export function MonthsPopup() {
  const months = [
    "Всё",
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];
  const queryMonth = useAppSelector((state) => state.notes.queries.month);
  const [selectedMonth, setSelectedMonth] = useState(queryMonth);
  const dispatch = useAppDispatch();

  const changeMonth = (month: string) => {
    setSelectedMonth(month);
    dispatch(updateQueries({ property: "month", value: month }));
    dispatch(searchNotes());
  };

  return (
    <Animated.View
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(200)}
    >
      <ViewPopup>
        <TextTitle>Месяц</TextTitle>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ViewVariants>
            {months.map((month, index) => (
              <Pressable key={index} onPress={() => changeMonth(month)}>
                <RadioButton
                  color={COLORS.mainColors.normal}
                  text={month}
                  isActive={selectedMonth === month}
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
