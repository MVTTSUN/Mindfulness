import styled from "styled-components/native";
import { useAppSelector } from "../hooks/useAppSelector";
import { Pressable, ScrollView } from "react-native";
import { COLORS } from "../const";
import { RadioButton } from "./ui/RadioButton";

type MeditationsAndTasksPopupProps = {
  nameNote: string;
  setNameNote: (
    nameNote: string,
    backgroundColors: string,
    underlayColor: string,
    colors: string
  ) => void;
};

export function MeditationsAndTasksPopup({
  nameNote,
  setNameNote,
}: MeditationsAndTasksPopupProps) {
  const meditations = useAppSelector((state) => state.meditations.meditations);

  return (
    <Container>
      <FilterContainer>
        <FilterTouchableHighlight
          onPress={() => {}}
          underlayColor={COLORS.backgroundColors.meditationCardPressed}
          $backgroundColor={COLORS.backgroundColors.meditationCard}
        >
          <TextFilter $color={COLORS.textColors.meditationCard}>
            Медитации
          </TextFilter>
        </FilterTouchableHighlight>
        <FilterTouchableHighlight
          onPress={() => {}}
          underlayColor={COLORS.backgroundColors.taskCardPressed}
          $backgroundColor={COLORS.backgroundColors.taskCard}
        >
          <TextFilter $color={COLORS.textColors.taskCard}>Задания</TextFilter>
        </FilterTouchableHighlight>
      </FilterContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MeditationsContainer>
          {meditations.map((meditation) => (
            <Pressable
              key={`meditation-${meditation.id}`}
              onPress={() =>
                nameNote.split(": ")[1] === meditation.title
                  ? () => {}
                  : setNameNote(
                      `Медитация: ${meditation.title}`,
                      COLORS.backgroundColors.meditationCard,
                      COLORS.backgroundColors.meditationCardPressed,
                      COLORS.textColors.meditationCard
                    )
              }
            >
              <RadioButton
                color={COLORS.backgroundColors.meditationCard}
                text={meditation.title}
                isActive={nameNote.split(": ")[1] === meditation.title}
              />
            </Pressable>
          ))}
        </MeditationsContainer>
      </ScrollView>
    </Container>
  );
}

const Container = styled.View`
  gap: 20px;
  padding: 20px;
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.backgroundColor.main};
  border-radius: 20px;
`;

const FilterContainer = styled.View`
  flex-direction: row;
  gap: 10px;
  flex-wrap: wrap;
`;

const MeditationsContainer = styled.View`
  gap: 10px;
`;

const FilterTouchableHighlight = styled.TouchableHighlight<{
  $backgroundColor: string;
}>`
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 47%;
  padding: 5px;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  border-radius: 20px;
`;

const TextFilter = styled.Text<{ $color: string }>`
  font-family: "Poppins-Medium";
  font-size: 14px;
  line-height: 18px;
  color: ${({ $color }) => $color};
`;
