import { useSelector } from "react-redux";
import styled from "styled-components";
import { getIsLoadingServer } from "../store/isLoadingServer";
import { useDeferredRender } from "../hooks/useDeferredRender";

export function Preloader() {
  const isLoadingServer = useSelector(getIsLoadingServer);
  const isActivePreloader = useDeferredRender(isLoadingServer, 1000);

  return (
    <>
      {isActivePreloader && (
        <Blur>
          <LdsRipple>
            <Div></Div>
            <Div></Div>
          </LdsRipple>
        </Blur>
      )}
    </>
  );
}

const Blur = styled.div`
  z-index: 100;
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #00000050;
`;

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
