import { Link, NavLink, useLocation } from "react-router-dom";
import { CenterContainer } from "./CenterContainer";
import styled from "styled-components";
import {
  FontSizeHeading,
  FontSizeStandard,
  ResetLink,
  ResetList,
} from "../mixins";
import { BrowserRoute, Color } from "../const";

export function Header() {
  const { pathname } = useLocation();

  return (
    <HeaderStyled>
      <CenterContainer>
        <NavStyled>
          {pathname === BrowserRoute.Meditation ? (
            <Heading>Mindfulness</Heading>
          ) : (
            <LinkStyled to={BrowserRoute.Meditation}>
              <Heading>Mindfulness</Heading>
            </LinkStyled>
          )}
          <ListNav>
            <li>
              <NavLinkStyled end to={BrowserRoute.Meditation}>
                Медитации
              </NavLinkStyled>
            </li>
            <li>
              <NavLinkStyled end to={BrowserRoute.Tip}>
                Советы
              </NavLinkStyled>
            </li>
            <li>
              <NavLinkStyled end to={BrowserRoute.Task}>
                Задания
              </NavLinkStyled>
            </li>
            <li>
              <NavLinkStyled end to={BrowserRoute.Emotion}>
                Эмоции
              </NavLinkStyled>
            </li>
            <li>
              <NavLinkStyled end to={BrowserRoute.Information}>
                Информация
              </NavLinkStyled>
            </li>
          </ListNav>
        </NavStyled>
      </CenterContainer>
    </HeaderStyled>
  );
}

const HeaderStyled = styled.header`
  background-color: ${Color.Pastel};
  padding: 20px 0;
  margin-bottom: 20px;
`;

const NavStyled = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
`;

const LinkStyled = styled(Link)`
  ${ResetLink}
`;

const Heading = styled.h1`
  ${FontSizeHeading}
`;

const NavLinkStyled = styled(NavLink)`
  ${ResetLink}
  ${FontSizeStandard}

  &.active {
    cursor: auto;
    font-weight: 600;
    opacity: 1;
  }
`;

const ListNav = styled.ul`
  display: flex;
  align-items: center;
  gap: 20px;
  ${ResetList}
`;
