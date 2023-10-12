import styled from "styled-components";
import { yupResolver } from "@hookform/resolvers/yup";
import { ResetButton } from "../mixins";
import { Form } from "./Form";
import {
  Controller,
  FieldValues,
  Resolver,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { FormTextLottieImage } from "../types/form";
import { schemaTextLottieImage } from "../utils/yup";
import { DropFileInput } from "./DropFileInput";
import { ErrorField } from "./ErrorField";
import { Textarea } from "./Textarea";
import { Button } from "./Button";
import { useAddTipsMutation } from "../services/api";
import { ElementTextLottieImage } from "../types/get-results";
import { BASE_URL } from "../const";

type FormTextLottieImageProps = {
  data?: ElementTextLottieImage[];
};

export function FormTextLottieImage(props: FormTextLottieImageProps) {
  const { data } = props;
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<FormTextLottieImage>({
    resolver: yupResolver(
      schemaTextLottieImage
    ) as unknown as Resolver<FormTextLottieImage>,
    defaultValues: {
      fields:
        data &&
        data.map((item) => ({
          type: item.type,
          payload: (item.type === "text"
            ? item.payload
            : `${BASE_URL}/tips/${item.payload}`) as string,
        })),
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "fields",
  } as { name: string }) as {
    fields: Record<"id" | "type" | "payload", string>[];
    append: UseFieldArrayAppend<FieldValues, string>;
    remove: UseFieldArrayRemove;
  };
  const [addTips, { isLoading }] = useAddTipsMutation();

  const onSubmit = handleSubmit((data) => {
    addTips(data);
  });

  return (
    <Form onSubmit={onSubmit}>
      {fields.map((field, index) => {
        if (field.type === "image") {
          return (
            <FieldContainer key={field.id}>
              <InputContainer>
                <Controller
                  name={`fields.${index}.payload` as never}
                  control={control}
                  render={({ field: { onChange } }) => {
                    return (
                      <DropFileInput
                        id={field.id}
                        type="image"
                        onChange={onChange}
                        src={field.payload}
                      />
                    );
                  }}
                />
                <ButtonClose onClick={() => remove(index)} />
              </InputContainer>
              <ErrorField>
                {errors.fields && errors.fields[index]?.payload?.message}
              </ErrorField>
            </FieldContainer>
          );
        } else if (field.type === "text") {
          return (
            <FieldContainer key={field.id}>
              <InputContainer>
                <Textarea
                  {...register(`fields.${index}.payload` as never)}
                  rows={6}
                />
                <ButtonClose onClick={() => remove(index)} />
              </InputContainer>
              <ErrorField>
                {errors.fields && errors.fields[index]?.payload?.message}
              </ErrorField>
            </FieldContainer>
          );
        } else {
          return (
            <FieldContainer key={field.id}>
              <InputContainer>
                <Controller
                  name={`fields.${index}.payload` as never}
                  control={control}
                  render={({ field: { onChange } }) => {
                    return (
                      <DropFileInput
                        id={field.id}
                        type="lottie"
                        onChange={onChange}
                        src={field.payload}
                      />
                    );
                  }}
                />
                <ButtonClose onClick={() => remove(index)} />
              </InputContainer>
              <ErrorField>
                {errors.fields && errors.fields[index]?.payload?.message}
              </ErrorField>
            </FieldContainer>
          );
        }
      })}
      <ErrorField>{errors.fields?.message}</ErrorField>
      <ContainerButtonsAdd>
        <Button
          type="button"
          onClick={() => append({ type: "text", payload: "" })}
        >
          + Текст
        </Button>
        <Button
          type="button"
          onClick={() => append({ type: "image", payload: "" })}
        >
          + Картинка
        </Button>
        <Button
          type="button"
          onClick={() => append({ type: "lottie", payload: "" })}
        >
          + JSON
        </Button>
      </ContainerButtonsAdd>
      <Button isDisabled={isLoading} isPrimary isLoading={isLoading}>
        {isLoading ? "Сохранение" : "Загрузить"}
      </Button>
    </Form>
  );
}

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
`;

const ButtonClose = styled.button`
  ${ResetButton}
  width: 30px;
  height: 30px;
  background: url(/images/close.svg) no-repeat center;
`;

const ContainerButtonsAdd = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 10px;
`;
