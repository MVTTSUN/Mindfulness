import TouchableOption from "./Touchables/TouchableOption";
import { OptionData } from "./../../types";
import { styled } from "styled-components/native";
import { useCallback, useState } from "react";
import { ScrollView } from "react-native";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { filterMeditations } from "../../store/meditationsSlice";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { filterTasks } from "../../store/tasksSlice";

type SelectProps = {
  optionsData: OptionData[];
};

export function Select({ optionsData }: SelectProps) {
  const route = useRoute();
  const [optionsState, setOptionsState] = useState(optionsData);
  const dispatch = useAppDispatch();

  const onActive = (id: number) => {
    setOptionsState((prevState) => {
      return prevState.map((optionData) => {
        if (optionData.id === id) {
          return { ...optionData, isActive: true };
        } else {
          return { ...optionData, isActive: false };
        }
      });
    });

    if (route.name === "Meditation" || route.name === "Home") {
      dispatch(filterMeditations(optionsState[id - 1].title));
    } else if (route.name === "Tasks") {
      dispatch(filterTasks(optionsState[id - 1].title));
    }
  };

  return (
    <ViewStyled>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <ViewStyledContainer $length={optionsState.length}>
          <ViewPadding />
          {optionsState.map((option) => (
            <TouchableOption
              key={option.id}
              onPress={() => onActive(option.id)}
              isActive={option.isActive}
            >
              {option.title}
            </TouchableOption>
          ))}
          <ViewPadding />
        </ViewStyledContainer>
      </ScrollView>
    </ViewStyled>
  );
}

const ViewStyled = styled.View`
  align-content: center;
  margin-bottom: 30px;
`;

const ViewStyledContainer = styled.View<{ $length: number }>`
  width: ${({ $length }) => `${$length * 120}px`};
  flex-direction: row;
  gap: 10px;
`;

const ViewPadding = styled.View`
  width: 10px;
`;
