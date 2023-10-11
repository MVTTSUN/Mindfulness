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
import { Color } from "../const";

export function FormInformation() {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<FormInformation>({
    resolver: yupResolver(
      schemaInformation
    ) as unknown as Resolver<FormInformation>,
  });

  const onSubmit = handleSubmit((data) => {
    // const formData = new FormData();
    // formData.append("file", data.file[0]);
    console.log(data);
    console.log(1);

    // fetch("http://localhost:3000/tips", {
    //   method: "POST",
    //   body: formData,
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //     Accept: "image/*",
    //   },
    // });
  });

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
        render={({ field: { onChange } }) => {
          return (
            <DropFileInput
              labelText="Аватар"
              withLabel
              isNotArray
              name="avatarPsycho"
              type="image"
              onChange={onChange}
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
        render={({ field: { onChange } }) => {
          return (
            <DropFileInput
              labelText="Аватар"
              withLabel
              isNotArray
              name="avatarDevelop"
              type="image"
              onChange={onChange}
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
      <Button isPrimary>Загрузить</Button>
    </Form>
  );
}

const Strong = styled.p`
  text-align: center;
  margin: 0;
  padding: 5px 0;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.2;
  color: ${Color.TextStandard};
`;
