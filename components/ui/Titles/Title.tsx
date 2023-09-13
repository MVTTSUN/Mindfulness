import { PropsWithChildren } from "react";
import { styled } from "styled-components/native";

export function Title({ children }: PropsWithChildren) {
  return <TextStyled>{children}</TextStyled>;
}

const TextStyled = styled.Text`
  line-height: 40px;
  margin: 15px 0;
  font-family: "Poppins-SemiBold";
  font-size: 28px;
  color: ${({ theme }) => theme.color.standard};
`;
