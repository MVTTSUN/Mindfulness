import { PropsWithChildren } from "react";
import { styled } from "styled-components/native";

export function Title({ children }: PropsWithChildren) {
  return <TextStyled>{children}</TextStyled>;
}

const TextStyled = styled.Text`
  margin-bottom: 15px;
  font-family: "Poppins-SemiBold";
  font-size: 28px;
  color: ${({ theme }) => theme.color.standard};
`;
