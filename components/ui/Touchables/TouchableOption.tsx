import { styled } from "styled-components/native";
import { PropsWithChildren } from "react";
import { TouchableWithoutFeedback } from "react-native";

type TouchableOptionProps = PropsWithChildren<{
  onPress: () => void;
  isActive: boolean;
}>;

export function TouchableOption({
  children,
  onPress,
  isActive,
}: TouchableOptionProps) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <ViewStyled $isActive={isActive}>
        <TextStyled $isActive={isActive}>{children}</TextStyled>
      </ViewStyled>
    </TouchableWithoutFeedback>
  );
}

const ViewStyled = styled.View<{
  $isActive: boolean;
}>`
  align-items: center;
  width: 10%;
  height: 31px;
  flex: auto;
  padding: 9px 3px 6px;
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.backgroundColor.selectActive : "transparent"};
  border-radius: 42px;
  border: 1px solid ${({ theme }) => theme.color.standard};
`;

const TextStyled = styled.Text<{ $isActive: boolean }>`
  font-family: "Poppins-Regular";
  font-size: 12px;
  line-height: 14px;
  color: ${({ theme }) => theme.color.standard};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.color.selectActive : theme.color.standard};
`;
