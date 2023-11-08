import { Pressable } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import styled from "styled-components/native";
import { RadioButton } from "../inputs/RadioButton";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { updateQueries } from "../../../store/notesSlice";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { normalize } from "../../../utils";
import { getNotesQueries } from "../../../store/notesSelectors";
import { Color, TYPES_OPTIONS } from "../../../const";

export function TypesPopup() {
  const queries = useAppSelector(getNotesQueries);
  const dispatch = useAppDispatch();

  const changeType = (type: string) => {
    dispatch(updateQueries({ property: "type", value: type }));
  };

  return (
    <Animated.View
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(200)}
    >
      <ViewPopup>
        <TextTitle>Тип</TextTitle>
        <ViewVariants>
          {TYPES_OPTIONS.map((type, index) => (
            <Pressable key={index} onPress={() => changeType(type)}>
              <RadioButton
                color={Color.Primary}
                text={type}
                isActive={queries.type === type}
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
