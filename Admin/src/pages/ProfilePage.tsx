import { Helmet } from "react-helmet-async";
import { Subtitle } from "../components/Subtitle";
import { ContainerOneSide } from "../components/ContainerOneSide";
import { Form } from "../components/Form";
import { Input } from "../components/Input";
import { Resolver, useForm } from "react-hook-form";
import { FormProfile } from "../types/form";
import { schemaUpdateUser } from "../utils/yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorField } from "../components/ErrorField";
import { BrowserRoute, Color, Image } from "../const";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { FontSizeStandard, FontSizeSubtitle, ResetButton } from "../mixins";
import { Button } from "../components/Button";
import {
  useGetUserQuery,
  useLogoutMutation,
  useUpdateUserMutation,
} from "../services/api";
import { removeToken } from "../services/token";
import { DataUpdateUser } from "../types/server";
import { useNavigate } from "react-router-dom";
import { removeUserId } from "../services/storage";

export function ProfilePage() {
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const navigate = useNavigate();
  const { data } = useGetUserQuery();
  const [logout] = useLogoutMutation();
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<FormProfile>({
    mode: "onChange",
    resolver: yupResolver(
      schemaUpdateUser(isChangePassword)
    ) as unknown as Resolver<FormProfile>,
  });

  const onSubmit = handleSubmit(async (data) => {
    const { data: dataUser } = (await updateUser({
      name: data.nickname,
      email: data.email,
      password: data.newPassword,
      oldPassword: data.password,
    })) as unknown as { data: DataUpdateUser };
    if (dataUser) {
      setValue("password", "");
      setValue("confirmPassword", "");
      setValue("newPassword", "");
      setIsChangePassword(false);
    }
  });

  useEffect(() => {
    if (data) {
      setValue("nickname", data.name);
      setValue("email", data.email);
    }
  }, [data]);

  return (
    <>
      <Helmet>
        <title>Профиль - Mindfulness</title>
      </Helmet>
      <Subtitle>Профиль</Subtitle>
      <ContainerOneSide>
        <Form onSubmit={onSubmit}>
          <Input
            {...register("nickname")}
            labelText="Никнейм"
            withLabel
            isNotArray
          />
          <ErrorField>{errors.nickname?.message}</ErrorField>
          <Input
            {...register("email")}
            labelText="Почта"
            withLabel
            isNotArray
            type="email"
          />
          <ErrorField>{errors.email?.message}</ErrorField>
          {isChangePassword && (
            <>
              <ContainerPassword>
                <Label htmlFor="password">Текущий пароль</Label>
                <Input
                  {...register("password")}
                  isNotArray
                  type={isVisiblePassword ? "text" : "password"}
                />
                <ButtonVisiblePassword
                  type="button"
                  onClick={() => setIsVisiblePassword(!isVisiblePassword)}
                >
                  <img src={Image.VisiblePassword} />
                </ButtonVisiblePassword>
              </ContainerPassword>
              <ErrorField>{errors.password?.message}</ErrorField>
              <ContainerPassword>
                <Label htmlFor="newPassword">Новый пароль</Label>
                <Input
                  {...register("newPassword")}
                  isNotArray
                  type={isVisiblePassword ? "text" : "password"}
                />
                <ButtonVisiblePassword
                  type="button"
                  onClick={() => setIsVisiblePassword(!isVisiblePassword)}
                >
                  <img src={Image.VisiblePassword} />
                </ButtonVisiblePassword>
              </ContainerPassword>
              <ErrorField>{errors.newPassword?.message}</ErrorField>
              <ContainerPassword>
                <Label htmlFor="confirmPassword">Повторите новый пароль</Label>
                <Input
                  {...register("confirmPassword")}
                  isNotArray
                  type={isVisiblePassword ? "text" : "password"}
                />
                <ButtonVisiblePassword
                  type="button"
                  onClick={() => setIsVisiblePassword(!isVisiblePassword)}
                >
                  <img src={Image.VisiblePassword} />
                </ButtonVisiblePassword>
              </ContainerPassword>
              <ErrorField>{errors.confirmPassword?.message}</ErrorField>
            </>
          )}
          <TextActivate>
            При изменении пароля или почты будет отправлено письмо для
            подтверждения действия
          </TextActivate>
          <Button disabled={isLoading} isPrimary isLoading={isLoading}>
            Обновить
          </Button>
        </Form>
        <Button
          type="button"
          onClick={() => setIsChangePassword(!isChangePassword)}
        >
          {isChangePassword ? "Не менять пароль" : "Изменить пароль"}
        </Button>
        <Button
          type="button"
          onClick={async () => {
            await logout();
            removeToken();
            removeUserId();
            navigate(BrowserRoute.Login);
          }}
        >
          Выйти
        </Button>
      </ContainerOneSide>
    </>
  );
}

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

const TextActivate = styled.p`
  ${FontSizeSubtitle}
  text-align: center;
  color: ${Color.TextStandard};
  font-size: 18px;

  @media (max-width: 550px) {
    font-size: 16px;
  }
`;
