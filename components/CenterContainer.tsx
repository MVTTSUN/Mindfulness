import { styled } from "styled-components/native";
import { PropsWithChildren } from "react";

export function CenterContainer({ children }: PropsWithChildren) {
  return <ViewStyled>{children}</ViewStyled>;
}

const ViewStyled = styled.View`
  padding: 0 40px;
`;
