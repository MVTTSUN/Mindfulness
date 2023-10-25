import { Resolver, useForm } from "react-hook-form";
import { Form } from "../components/Form";
import { Input } from "../components/Input";
import { FormAuth } from "../types/form";
import { ErrorField } from "../components/ErrorField";
import { Button } from "../components/Button";
import styled from "styled-components";
import {
  FontSizeHeading,
  FontSizeStandard,
  FontSizeSubtitle,
  ResetButton,
  ResetLink,
} from "../mixins";
import { BrowserRoute, Color, Image } from "../const";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaLogin, schemaRegister } from "../utils/yup";
import { useLoginMutation, useRegistrationMutation } from "../services/api";
import { setToken } from "../services/token";
import { DataUser } from "../types/server";
import { Helmet } from "react-helmet-async";
import { CenterContainer } from "../components/CenterContainer";
import { setUserId } from "../services/storage";

export function Auth() {
  const [isOpenActivate, setIsOpenActivate] = useState(false);
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [login, { isLoading: isLoadingLogin }] = useLoginMutation();
  const [registration, { isLoading: isLoadingRegister }] =
    useRegistrationMutation();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormAuth>({
    mode: "onChange",
    resolver: yupResolver(
      pathname === BrowserRoute.Register ? schemaRegister : schemaLogin
    ) as unknown as Resolver<FormAuth>,
  });
  const isLoading = isLoadingLogin || isLoadingRegister;

  const onSubmit = handleSubmit(async (data) => {
    if (pathname === BrowserRoute.Register) {
      const { data: dataMessage } = (await registration({
        name: data.nickname,
        email: data.email,
        password: data.password,
      })) as unknown as { data: DataUser };
      if (dataMessage) {
        setIsOpenActivate(true);
        reset();
      }
    } else {
      const response = await login({
        email: data.email,
        password: data.password,
      });
      if (response) {
        const { data: dataUser } = response as unknown as {
          data: DataUser;
        };
        if (dataUser) {
          setToken(dataUser.accessToken);
          setUserId(dataUser.user._id);
          navigate(BrowserRoute.Statistic);
        }
      }
    }
  });

  useEffect(() => {
    setIsOpenActivate(false);
  }, [pathname]);

  return (
    <Main>
      <CenterContainer>
        <Container>
          {pathname === BrowserRoute.Login ? (
            <Helmet>
              <title>Вход - Mindfulness</title>
            </Helmet>
          ) : (
            <Helmet>
              <title>Регистрация - Mindfulness</title>
            </Helmet>
          )}
          <Form onSubmit={onSubmit}>
            <Title>
              {pathname === BrowserRoute.Login ? "Вход" : "Регистрация"}
            </Title>
            {pathname === BrowserRoute.Register && (
              <>
                <Input
                  {...register("nickname")}
                  labelText="Никнейм"
                  withLabel
                  isNotArray
                  autoComplete="on"
                />
                <ErrorField>{errors.nickname?.message}</ErrorField>
              </>
            )}
            <Input
              {...register("email")}
              labelText="Почта"
              withLabel
              isNotArray
              type="email"
              autoComplete="on"
            />
            <ErrorField>{errors.email?.message}</ErrorField>
            <ContainerPassword>
              <Label htmlFor="password">Пароль</Label>
              <Input
                {...register("password")}
                isNotArray
                type={isVisiblePassword ? "text" : "password"}
                autoComplete="on"
              />
              <ButtonVisiblePassword
                type="button"
                onClick={() => setIsVisiblePassword(!isVisiblePassword)}
              >
                <img src={Image.VisiblePassword} />
              </ButtonVisiblePassword>
            </ContainerPassword>
            <ErrorField>{errors.password?.message}</ErrorField>
            <Button disabled={isLoading} isPrimary isLoading={isLoading}>
              {pathname === BrowserRoute.Login ? "Войти" : "Зарегистрироваться"}
            </Button>
          </Form>
          <Text>
            {pathname === BrowserRoute.Login
              ? "Еще не зарегистрированы?"
              : "Уже зарегистрированы?"}
            <LinkStyled
              to={
                pathname === BrowserRoute.Login
                  ? BrowserRoute.Register
                  : BrowserRoute.Login
              }
            >
              {pathname === BrowserRoute.Login ? "Зарегистрироваться" : "Войти"}
            </LinkStyled>
          </Text>
          {isOpenActivate && (
            <>
              <TextActivate>
                Вам отправлено письмо с активацией. Пожалуйста, активируйте
                аккаунт
              </TextActivate>
              <LinkStyled
                to="https://www.google.com/intl/ru/gmail/about/"
                target="_blank"
              >
                Gmail
              </LinkStyled>
              <LinkStyled to="https://360.yandex.ru/mail/" target="_blank">
                Яндекс.Почта
              </LinkStyled>
            </>
          )}
        </Container>
      </CenterContainer>
    </Main>
  );
}

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const Title = styled.h1`
  ${FontSizeHeading}
  color: ${Color.TextStandard};
  text-align: center;
  font-size: 24px;
  margin-bottom: 10px;
`;

const ContainerPassword = styled.div`
  position: relative;
`;

const Label = styled.label`
  display: inline-block;
  ${FontSizeStandard}
  cursor: pointer;
  color: ${Color.TextStandard};
  margin-bottom: 10px;
`;

const ButtonVisiblePassword = styled.button`
  ${ResetButton}
  width: 17px;
  height: 17px;
  position: absolute;
  top: 44px;
  right: 20px;
`;

const Text = styled.p`
  ${FontSizeStandard}
  color: ${Color.TextStandard};

  @media (max-width: 420px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
`;

const LinkStyled = styled(Link)`
  ${ResetLink}
  margin-left: 10px;
  background-color: ${Color.Pastel};
  padding: 5px 10px;
  border-radius: 5px;

  @media (max-width: 420px) {
    margin-left: 0;
  }
`;

const TextActivate = styled.p`
  ${FontSizeSubtitle}
  text-align: center;
  color: ${Color.TextStandard};
  font-size: 18px;

  @media (max-width: 550px) {
    font-size: 16px;
  }
`;
