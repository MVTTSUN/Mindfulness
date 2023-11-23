import TouchableOption from "../touchables/TouchableOption";
import { OptionData } from "../../../types";
import { styled } from "styled-components/native";
import { ScrollView } from "react-native";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useRoute } from "@react-navigation/native";
import { setKindTasks } from "../../../store/tasksSlice";
import { normalize } from "../../../utils";
import { setKindMeditations } from "../../../store/meditationsSlice";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { getKindMeditations } from "../../../store/meditationsSelectors";
import { getKindTasks } from "../../../store/tasksSelectors";
import { AppRoute } from "../../../const";

type SelectProps = {
  optionsData: OptionData[];
};

export function Select(props: SelectProps) {
  const { optionsData } = props;
  const route = useRoute();
  const kindMeditations = useAppSelector(getKindMeditations);
  const kindTasks = useAppSelector(getKindTasks);
  const dispatch = useAppDispatch();

  const changeKind = (title: string) => {
    if (route.name === AppRoute.Meditations) {
      dispatch(setKindMeditations(title));
    } else if (route.name === AppRoute.Tasks) {
      dispatch(setKindTasks(title));
    } else if (route.name === AppRoute.Home) {
      dispatch(setKindMeditations(title.slice(0, 4)));
      dispatch(setKindTasks(title.slice(0, 4)));
    }
  };

  return (
    <ViewStyled>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <ViewStyledContainer $length={optionsData.length}>
          <ViewPadding />
          {optionsData.map((option) => (
            <TouchableOption
              key={option.id}
              onPress={() => changeKind(option.title)}
              isActive={
                route.name === AppRoute.Tasks
                  ? option.title.includes(kindTasks)
                  : option.title.includes(kindMeditations)
              }
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
  width: ${({ $length }) => $length * normalize(120)}px;
  flex-direction: row;
  gap: ${normalize(10)}px;
`;

const ViewPadding = styled.View`
  width: ${normalize(10)}px;
`;
