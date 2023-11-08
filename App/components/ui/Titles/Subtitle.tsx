import { PropsWithChildren } from "react";
import { styled } from "styled-components/native";
import { normalize } from "../../../utils";

export function Subtitle(props: PropsWithChildren) {
  const { children } = props;

  return <TextStyled>{children}</TextStyled>;
}

const TextStyled = styled.Text`
  margin: 5px 0 15px;
  font-family: "Poppins-Medium";
  font-size: ${normalize(18)}px;
  line-height: ${normalize(22)}px;
  color: ${({ theme }) => theme.color.standard};
`;
