import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, Resolver, useForm } from "react-hook-form";
import { schemaInformation } from "../utils/yup";
import { FormInformation } from "../types/form";
import { Form } from "./Form";
import { Button } from "./Button";
import { Input } from "./Input";
import { ErrorField } from "./ErrorField";
import { Textarea } from "./Textarea";
import { DropFileInput } from "./DropFileInput";
import styled from "styled-components";
import { ApiRoute, BASE_URL, Color } from "../const";
import { useAddInfoMutation } from "../services/api";
import { DataInformation } from "../types/get-results";
import { FontSizeHeading } from "../mixins";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useEffect } from "react";

export function FormInformation() {
  const navigate = useNavigate();
  const data = useOutletContext<DataInformation>();
  const [addInfo, { isLoading }] = useAddInfoMutation();
  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormInformation>({
    mode: "onChange",
    resolver: yupResolver(
      schemaInformation
    ) as unknown as Resolver<FormInformation>,
    defaultValues: {
      secondNamePsycho: data ? data.secondNamePsycho : "",
      firstNamePsycho: data ? data.firstNamePsycho : "",
      surnamePsycho: data ? data.surnamePsycho : "",
      info: data ? data.info : "",
      avatarPsycho: data
        ? `${BASE_URL}${ApiRoute.Info + ApiRoute.Filename}/${
            data?.avatarPsycho
          }`
        : "",
      nicknameInstagram: data ? data.nicknameInstagram : "",
      nicknameTelegram: data ? data.nicknameTelegram : "",
      nicknameVK: data ? data.nicknameVK : "",
      emailPsycho: data ? data.emailPsycho : "",
      secondNameDevelop: data ? data.secondNameDevelop : "",
      firstNameDevelop: data ? data.firstNameDevelop : "",
      surnameDevelop: data ? data.surnameDevelop : "",
      avatarDevelop: data
        ? `${BASE_URL}${ApiRoute.Info + ApiRoute.Filename}/${
            data?.avatarDevelop
          }`
        : "",
      emailDevelop: data ? data.emailDevelop : "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    await addInfo(data);
    navigate(-1);
  });

  useEffect(() => {
    if (data) {
      setValue("secondNamePsycho", data.secondNamePsycho);
      setValue("firstNamePsycho", data.firstNamePsycho);
      setValue("surnamePsycho", data.surnamePsycho);
      setValue("info", data.info);
      setValue(
        "avatarPsycho",
        `${BASE_URL}${ApiRoute.Info + ApiRoute.Filename}/${data.avatarPsycho}`
      );
      setValue("nicknameInstagram", data.nicknameInstagram);
      setValue("nicknameTelegram", data.nicknameTelegram);
      setValue("nicknameVK", data.nicknameVK);
      setValue("emailPsycho", data.emailPsycho);
      setValue("secondNameDevelop", data.secondNameDevelop);
      setValue("firstNameDevelop", data.firstNameDevelop);
      setValue("surnameDevelop", data.surnameDevelop);
      setValue(
        "avatarDevelop",
        `${BASE_URL}${ApiRoute.Info + ApiRoute.Filename}/${data.avatarDevelop}`
      );
      setValue("emailDevelop", data.emailDevelop);
    }
  }, [data]);

  return (
    <Form onSubmit={onSubmit}>
      <Strong>Информация о психотерапевте</Strong>
      <Input
        {...register("secondNamePsycho")}
        labelText="Фамилия"
        withLabel
        isNotArray
      />
      <ErrorField>{errors.secondNamePsycho?.message}</ErrorField>
      <Input
        {...register("firstNamePsycho")}
        labelText="Имя"
        withLabel
        isNotArray
      />
      <ErrorField>{errors.firstNamePsycho?.message}</ErrorField>
      <Input
        {...register("surnamePsycho")}
        labelText="Отчество"
        withLabel
        isNotArray
      />
      <ErrorField>{errors.surnamePsycho?.message}</ErrorField>
      <Textarea
        rows={5}
        {...register("info")}
        labelText="Краткая информация"
        withLabel
        isNotArray
      />
      <ErrorField>{errors.secondNamePsycho?.message}</ErrorField>
      <Controller
        name="avatarPsycho"
        control={control}
        render={({ field: { onChange, value } }) => {
          return (
            <DropFileInput
              labelText="Аватар"
              withLabel
              isNotArray
              name="avatarPsycho"
              type="image"
              onChange={onChange}
              src={value}
            />
          );
        }}
      />
      <ErrorField>{errors.avatarPsycho?.message}</ErrorField>
      <Input
        {...register("nicknameInstagram")}
        labelText="Никнейм Instagram"
        withLabel
        isNotArray
      />
      <ErrorField>{errors.nicknameInstagram?.message}</ErrorField>
      <Input
        {...register("nicknameTelegram")}
        labelText="Никнейм Telegram"
        withLabel
        isNotArray
      />
      <ErrorField>{errors.nicknameTelegram?.message}</ErrorField>
      <Input
        {...register("nicknameVK")}
        labelText="Никнейм VK"
        withLabel
        isNotArray
      />
      <ErrorField>{errors.nicknameVK?.message}</ErrorField>
      <Input
        {...register("emailPsycho")}
        labelText="Почта"
        withLabel
        isNotArray
      />
      <ErrorField>{errors.emailPsycho?.message}</ErrorField>
      <Strong>Информация о разработчике</Strong>
      <Input
        {...register("secondNameDevelop")}
        labelText="Фамилия"
        withLabel
        isNotArray
      />
      <ErrorField>{errors.secondNameDevelop?.message}</ErrorField>
      <Input
        {...register("firstNameDevelop")}
        labelText="Имя"
        withLabel
        isNotArray
      />
      <ErrorField>{errors.firstNameDevelop?.message}</ErrorField>
      <Input
        {...register("surnameDevelop")}
        labelText="Отчество"
        withLabel
        isNotArray
      />
      <ErrorField>{errors.surnameDevelop?.message}</ErrorField>
      <Controller
        name="avatarDevelop"
        control={control}
        render={({ field: { onChange, value } }) => {
          return (
            <DropFileInput
              labelText="Аватар"
              withLabel
              isNotArray
              name="avatarDevelop"
              type="image"
              onChange={onChange}
              src={value}
            />
          );
        }}
      />
      <ErrorField>{errors.avatarDevelop?.message}</ErrorField>
      <Input
        {...register("emailDevelop")}
        labelText="Почта"
        withLabel
        isNotArray
      />
      <ErrorField>{errors.emailDevelop?.message}</ErrorField>
      <Button disabled={isLoading} isPrimary isLoading={isLoading}>
        {isLoading ? "Сохранение" : "Загрузить"}
      </Button>
    </Form>
  );
}

const Strong = styled.p`
  ${FontSizeHeading}
  text-align: center;
  padding: 5px 0;
  font-size: 20px;
  color: ${Color.TextStandard};
`;
