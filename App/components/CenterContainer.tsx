import { styled } from "styled-components/native";
import { PropsWithChildren } from "react";
import { normalize } from "../utils";

export function CenterContainer(props: PropsWithChildren) {
  const { children } = props;

  return <ViewStyled>{children}</ViewStyled>;
}

const ViewStyled = styled.View`
  padding: 0 ${normalize(20)}px;
`;
