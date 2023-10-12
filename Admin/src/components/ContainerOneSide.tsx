import styled from "styled-components";
import { PropsWithChildren } from "react";

type ContainerOneSideProps = PropsWithChildren;

export function ContainerOneSide(props: ContainerOneSideProps) {
  const { children } = props;

  return <Container>{children}</Container>;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;
