import { PropsWithChildren } from "react";
import { styled } from "styled-components/native";
import { normalize } from "../../../utils";

export function Title(props: PropsWithChildren) {
  const { children } = props;

  return <TextStyled>{children}</TextStyled>;
}

const TextStyled = styled.Text`
  line-height: ${normalize(30)}px;
  margin: 15px 0;
  font-family: "Poppins-SemiBold";
  font-size: ${normalize(28)}px;
  color: ${({ theme }) => theme.color.standard};
`;
