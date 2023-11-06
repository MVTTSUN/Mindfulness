import styled from "styled-components";
import { Color, Image } from "../const";
import { FontSizeHeading } from "../mixins";

type LogoProps = {
  isColumn?: boolean;
};

export function Logo(props: LogoProps) {
  const { isColumn } = props;

  return (
    <Container $isColumn={isColumn}>
      <Gradient>
        <ImageStyled src={Image.Logo} alt="Логотип" />
      </Gradient>
      <Heading>Mindfulness</Heading>
    </Container>
  );
}

const Container = styled.div<{ $isColumn?: boolean }>`
  display: flex;
  flex-direction: ${({ $isColumn }) => ($isColumn ? "column" : "row")};
  align-items: center;
  gap: 10px;
`;

const ImageStyled = styled.img`
  width: 70%;
  height: 70%;
`;

const Gradient = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 68px;
  height: 68px;
  background: radial-gradient(
    circle at center,
    ${Color.Meditation} -30%,
    transparent 70%
  );

  @media (max-width: 550px) {
    width: 60px;
    height: 60px;
  }
`;

const Heading = styled.h1`
  ${FontSizeHeading}
  font-size: 16px;
  color: ${Color.TextStandard};

  @media (max-width: 550px) {
    font-size: 14px;
  }
`;
