import styled from "styled-components";
import { Children, PropsWithChildren } from "react";

type ContainerTwoSidesProps = PropsWithChildren;

export function ContainerTwoSides(props: ContainerTwoSidesProps) {
  const { children } = props;

  return (
    <Container>
      {Children.map(children, (child) => (
        <Side>{child}</Side>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 1100px) {
    flex-direction: column;
  }
`;

const Side = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;

  @media (max-width: 1100px) {
    width: 100%;
  }
`;
