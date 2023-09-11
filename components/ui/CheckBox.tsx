import styled from "styled-components/native";
import { CheckIcon } from "../icons/CheckIcon";
import { COLORS } from "../../const";

type CheckBoxProps = {
  color: string;
  backgroundColor: string;
  text: string;
  isActive: boolean;
};

export function CheckBox({
  color,
  backgroundColor,
  text,
  isActive,
}: CheckBoxProps) {
  return (
    <Container>
      <CheckBoxStyled
        $backgroundColor={
          backgroundColor === ""
            ? COLORS.backgroundColors.meditationCard
            : backgroundColor
        }
        $isActive={isActive}
      >
        {isActive && (
          <CheckIcon
            color={color === "" ? COLORS.textColors.meditationCard : color}
            size={20}
            isStroke
          />
        )}
      </CheckBoxStyled>
      <TextStyled>{text}</TextStyled>
    </Container>
  );
}

const CheckBoxStyled = styled.View<{
  $backgroundColor: string;
  $isActive: boolean;
}>`
  align-items: center;
  justify-content: center;
  transform: translateY(-2px);
  height: 25px;
  width: 25px;
  border: 3px solid ${({ $backgroundColor }) => $backgroundColor};
  background-color: ${({ $isActive, $backgroundColor }) =>
    $isActive ? $backgroundColor : "transparent"};
  border-radius: 5px;
`;

const Container = styled.View`
  align-items: center;
  flex-direction: row;
  gap: 15px;
`;

const TextStyled = styled.Text`
  font-family: "Poppins-Regular";
  font-size: 18px;
  color: ${({ theme }) => theme.color.standard};
`;
