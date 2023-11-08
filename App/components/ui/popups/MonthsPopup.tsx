import { Pressable, ScrollView } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import styled from "styled-components/native";
import { RadioButton } from "../inputs/RadioButton";
import { Color, MONTHS } from "../../../const";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { updateQueries } from "../../../store/notesSlice";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { normalize } from "../../../utils";
import { getNotesQueries } from "../../../store/notesSelectors";

export function MonthsPopup() {
  const queries = useAppSelector(getNotesQueries);
  const dispatch = useAppDispatch();

  const changeMonth = (month: string) => {
    dispatch(updateQueries({ property: "month", value: month }));
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
            {MONTHS.map((month, index) => (
              <Pressable key={index} onPress={() => changeMonth(month)}>
                <RadioButton
                  color={Color.Primary}
                  text={month}
                  isActive={queries.month === month}
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
  padding: ${normalize(20)}px;
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.backgroundColor.main};
  border-radius: ${normalize(20)}px;
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
