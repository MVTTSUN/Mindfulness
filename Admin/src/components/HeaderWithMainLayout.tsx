import styled from "styled-components";
import { Header } from "./Header";
import { Outlet } from "react-router-dom";
import { CenterContainer } from "./CenterContainer";

export function HeaderWithFooterLayout() {
  return (
    <>
      <Header />
      <Main>
        <CenterContainer>
          <Outlet />
        </CenterContainer>
      </Main>
    </>
  );
}

const Main = styled.main`
  flex: 1;
  margin-bottom: 120px;
  padding-top: 100px;
`;
