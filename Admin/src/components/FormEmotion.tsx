import { Resolver, useFieldArray, useForm } from "react-hook-form";
import { Form } from "./Form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "./Input";
import { FormEmotion } from "../types/form";
import { schemaEmotion } from "../utils/yup";
import { Button } from "./Button";
import styled from "styled-components";
import { ResetButton } from "../mixins";
import { ErrorField } from "./ErrorField";
import { useAddEmotionsMutation } from "../services/api";

export function FormEmotion() {
  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors },
  } = useForm<FormEmotion>({
    resolver: yupResolver(schemaEmotion) as unknown as Resolver<FormEmotion>,
  });
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "fields",
  } as { name: string });
  const [addEmotions, { isLoading }] = useAddEmotionsMutation();

  const onSubmit = handleSubmit((data) => {
    addEmotions(data);
    replace([]);
    reset();
  });

  return (
    <Form onSubmit={onSubmit}>
      {fields.map((field, index) => (
        <FieldContainer key={field.id}>
          <InputContainer>
            <Input {...register(`fields.${index}.value` as never)} />
            <ButtonClose onClick={() => remove(index)} />
          </InputContainer>
          <ErrorField>
            {errors.fields && errors.fields[index]?.value?.message}
          </ErrorField>
        </FieldContainer>
      ))}
      <ErrorField>{errors.fields?.message}</ErrorField>
      <Button type="button" onClick={() => append({ value: "" })}>
        + Эмоция
      </Button>
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
