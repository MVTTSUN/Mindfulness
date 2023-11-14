import styled from "styled-components/native";
import { levelAdapter, normalize } from "../../utils";
import { Tumbler } from "./inputs/Tumbler";
import { useAppSelector } from "../../hooks/useAppSelector";
import { getIsConcentration } from "../../store/concentrationSelectors";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { setIsConcentration } from "../../store/concentrationSlice";

type LevelAndConcentrationProps = {
  kind?: string;
};

export function LevelAndConcentration(props: LevelAndConcentrationProps) {
  const { kind } = props;
  const isConcentration = useAppSelector(getIsConcentration);
  const dispatch = useAppDispatch();

  const toggleConcentration = () => {
    if (isConcentration) {
      dispatch(setIsConcentration(false));
    } else {
      dispatch(setIsConcentration(true));
    }
  };

  return (
    <LevelAndConcentrationContainer>
      <SmallText>Сложность: {levelAdapter(kind)}</SmallText>
      <ConcentrationContainer>
        <SmallText>Режим концентрации</SmallText>
        <Tumbler
          enable={isConcentration}
          onChange={toggleConcentration}
          isSmall
        />
      </ConcentrationContainer>
    </LevelAndConcentrationContainer>
  );
}

const LevelAndConcentrationContainer = styled.View`
  margin-bottom: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ConcentrationContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

const SmallText = styled.Text`
  font-family: "Poppins-Regular";
  font-size: ${normalize(12)}px;
  line-height: ${normalize(14)}px;
  color: ${({ theme }) => theme.color.standard};
`;
