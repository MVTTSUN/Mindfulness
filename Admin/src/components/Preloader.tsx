import styled from "styled-components";

export function Preloader() {
  return (
    <LdsRipple>
      <Div></Div>
      <Div></Div>
    </LdsRipple>
  );
}

const LdsRipple = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
`;

const Div = styled.div`
  position: absolute;
  border: 10px solid #b5f2ea;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;

  &:nth-child(2) {
    animation-delay: -0.5s;
  }

  @keyframes lds-ripple {
    0% {
      top: 48px;
      left: 48px;
      width: 0;
      height: 0;
      opacity: 0;
    }
    4.9% {
      top: 48px;
      left: 48px;
      width: 0;
      height: 0;
      opacity: 0;
    }
    5% {
      top: 48px;
      left: 48px;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: 0px;
      left: 0px;
      width: 96px;
      height: 96px;
      opacity: 0;
    }
  }
`;
