import { PropsWithChildren } from "react";
import { styled } from "styled-components/native";

export function Subtitle({ children }: PropsWithChildren) {
  return <TextStyled>{children}</TextStyled>;
}

const TextStyled = styled.Text`
  margin-bottom: 15px;
  font-family: "Poppins-Medium";
  font-size: 18px;
  color: ${({ theme }) => theme.color.standard};
`;
