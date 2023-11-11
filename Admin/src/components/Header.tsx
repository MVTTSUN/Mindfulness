import { Link, NavLink, useLocation } from "react-router-dom";
import { CenterContainer } from "./CenterContainer";
import styled from "styled-components";
import { FontSizeStandard, ResetButton, ResetLink, ResetList } from "../mixins";
import { BrowserRoute, Color, Image } from "../const";
import { useState } from "react";
import { Logo } from "./Logo";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <>
      <HeaderStyled>
        <CenterContainer>
          <NavStyled>
            {pathname === BrowserRoute.Statistic ? (
              <Logo />
            ) : (
              <LinkStyled
                to={BrowserRoute.Statistic}
                onClick={() => setIsOpen(false)}
              >
                <Logo />
              </LinkStyled>
            )}
            <BurgerMenu $isOpen={isOpen}>
              <ListNav>
                <li>
                  <NavLinkStyled
                    end
                    to={BrowserRoute.Statistic}
                    onClick={() => setIsOpen(false)}
                  >
                    Статистика
                  </NavLinkStyled>
                </li>
                <li>
                  <NavLinkStyled
                    to={BrowserRoute.Meditation}
                    onClick={() => setIsOpen(false)}
                  >
                    Медитации
                  </NavLinkStyled>
                </li>
                <li>
                  <NavLinkStyled
                    to={BrowserRoute.Tip}
                    onClick={() => setIsOpen(false)}
                  >
                    Советы
                  </NavLinkStyled>
                </li>
                <li>
                  <NavLinkStyled
                    to={BrowserRoute.Task}
                    onClick={() => setIsOpen(false)}
                  >
                    Задания
                  </NavLinkStyled>
                </li>
                <li>
                  <NavLinkStyled
                    end
                    to={BrowserRoute.Emotion}
                    onClick={() => setIsOpen(false)}
                  >
                    Эмоции
                  </NavLinkStyled>
                </li>
                <li>
                  <NavLinkStyled
                    to={BrowserRoute.Information}
                    onClick={() => setIsOpen(false)}
                  >
                    Информация
                  </NavLinkStyled>
                </li>
                <li>
                  <LinkStyled
                    to={BrowserRoute.Profile}
                    onClick={() => setIsOpen(false)}
                  >
                    <ImageProfile src={Image.Profile} alt="Профиль" />
                  </LinkStyled>
                </li>
              </ListNav>
            </BurgerMenu>
            <ButtonBurger onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <ImageBurger src={Image.Close} alt="Закрыть" />
              ) : (
                <ImageBurger src={Image.Burger} alt="Меню" />
              )}
            </ButtonBurger>
          </NavStyled>
        </CenterContainer>
      </HeaderStyled>
      <Overlay onClick={() => setIsOpen(false)} $isOpen={isOpen} />
    </>
  );
}

const HeaderStyled = styled.header`
  z-index: 10;
  position: fixed;
  width: 100vw;
  box-sizing: border-box;
  background-color: ${Color.Pastel};
  padding: 5px 0;
`;

const NavStyled = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
`;

const LinkStyled = styled(Link)`
  ${ResetLink}
  ${FontSizeStandard}
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${Color.TextStandard};
`;

const NavLinkStyled = styled(NavLink)`
  ${ResetLink}
  ${FontSizeStandard}
  color: ${Color.TextStandard};

  &.active {
    font-weight: 600;
  }
`;

const ListNav = styled.ul`
  display: flex;
  align-items: center;
  gap: 20px;
  ${ResetList}

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const ButtonBurger = styled.button`
  ${ResetButton}
  display: none;

  @media (max-width: 900px) {
    display: block;
  }
`;

const ImageBurger = styled.img`
  width: 40px;
  height: 40px;

  @media (max-width: 550px) {
    width: 30px;
    height: 30px;
  }
`;

const BurgerMenu = styled.div<{ $isOpen: boolean }>`
  z-index: 8;

  @media (max-width: 900px) {
    padding: 20px 100px;
    position: fixed;
    top: 75px;
    right: 0;
    height: 100vh;
    transform: ${({ $isOpen }) =>
      $isOpen ? "translateX(0)" : "translateX(100%)"};
    transition: transform 0.3s ease;
    background-color: ${Color.Pastel};
  }

  @media (max-width: 550px) {
    padding: 20px 50px;
    top: 70px;
  }
`;

const Overlay = styled.div<{ $isOpen: boolean }>`
  z-index: 6;
  visibility: hidden;
  background-color: #31313150;

  @media (max-width: 900px) {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 100%;
    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
    visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
    transition: opacity 0.3s ease;
  }
`;

const ImageProfile = styled.img`
  width: 25px;
  height: 25px;
`;
