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
          {pathname === BrowserRoute.Statistic ? (
            <Heading>Mindfulness</Heading>
          ) : (
            <LinkStyled to={BrowserRoute.Statistic}>
              <Heading>Mindfulness</Heading>
            </LinkStyled>
          )}
          <ListNav>
            <li>
              <NavLinkStyled end to={BrowserRoute.Statistic}>
                Статистика
              </NavLinkStyled>
            </li>
            <li>
              <NavLinkStyled to={BrowserRoute.Meditation}>
                Медитации
              </NavLinkStyled>
            </li>
            <li>
              <NavLinkStyled to={BrowserRoute.Tip}>Советы</NavLinkStyled>
            </li>
            <li>
              <NavLinkStyled to={BrowserRoute.Task}>Задания</NavLinkStyled>
            </li>
            <li>
              <NavLinkStyled end to={BrowserRoute.Emotion}>
                Эмоции
              </NavLinkStyled>
            </li>
            <li>
              <NavLinkStyled to={BrowserRoute.Information}>
                Информация
              </NavLinkStyled>
            </li>
            <li>
              <LinkStyled to={BrowserRoute.Information}>Выход</LinkStyled>
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
    font-weight: 600;
  }
`;

const ListNav = styled.ul`
  display: flex;
  align-items: center;
  gap: 20px;
  ${ResetList}
`;
