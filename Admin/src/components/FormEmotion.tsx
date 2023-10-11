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

export function FormEmotion() {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<FormEmotion>({
    resolver: yupResolver(schemaEmotion) as unknown as Resolver<FormEmotion>,
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "fields",
  } as { name: string });

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
      <Button isPrimary>Загрузить</Button>
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
