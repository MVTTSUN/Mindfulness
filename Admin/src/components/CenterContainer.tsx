import { PropsWithChildren } from "react";
import styled from "styled-components";

type CenterContainerProps = PropsWithChildren;

export function CenterContainer(props: CenterContainerProps) {
  const { children } = props;

  return <CenterContainerStyled>{children}</CenterContainerStyled>;
}

const CenterContainerStyled = styled.div`
  padding: 0 20px;
  max-width: 1240px;
  margin: 0 auto;
`;
