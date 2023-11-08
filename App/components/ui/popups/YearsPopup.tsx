import { Pressable, ScrollView } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import styled from "styled-components/native";
import { RadioButton } from "../inputs/RadioButton";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { updateQueries } from "../../../store/notesSlice";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { getYearsFilterVariants, normalize } from "../../../utils";
import { getNotesQueries } from "../../../store/notesSelectors";
import { Color } from "../../../const";

export function YearsPopup() {
  const queries = useAppSelector(getNotesQueries);
  const dispatch = useAppDispatch();
  const YEARS = getYearsFilterVariants();

  const changeYear = (year: string) => {
    dispatch(updateQueries({ property: "year", value: year }));
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
            {YEARS.map((year, index) => (
              <Pressable key={index} onPress={() => changeYear(year)}>
                <RadioButton
                  color={Color.Primary}
                  text={year}
                  isActive={queries.year === year}
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
