import { Controller, Resolver, useFieldArray, useForm } from "react-hook-form";
import { Form } from "./Form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "./Button";
import { schemaMeditation } from "../utils/yup";
import { FormMeditation, TextLine } from "../types/form";
import { Input } from "./Input";
import { ErrorField } from "./ErrorField";
import { DropFileInput } from "./DropFileInput";
import { Textarea } from "./Textarea";
import styled from "styled-components";
import { FontSizeStandard, ResetButton } from "../mixins";
import { Color } from "../const";
import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { getCurrentTime, getIsPause } from "../store/currentAudioSelectors";

export function FormMeditation() {
  const [textLines, setTextLines] = useState<TextLine[]>([]);
  const isPause = useAppSelector(getIsPause);
  const currentTime = useAppSelector(getCurrentTime);
  const {
    handleSubmit,
    control,
    register,
    getValues,
    formState: { errors },
  } = useForm<FormMeditation>({
    resolver: yupResolver(
      schemaMeditation
    ) as unknown as Resolver<FormMeditation>,
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "textLines",
  } as { name: string });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    console.log(1);
  });

  const getIsActiveInput = (index: number) => {
    const timeAt = textLines[index]?.timeAt;
    const timeTo = textLines[index]?.timeTo;

    if (timeAt && timeTo) {
      return timeAt <= currentTime && timeTo >= currentTime;
    }
    return false;
  };

  useEffect(() => {
    if (!isPause) {
      setTextLines(getValues("textLines"));
    }
  }, [isPause]);

  return (
    <Form onSubmit={onSubmit}>
      <Input {...register("title")} labelText="Название" withLabel isNotArray />
      <ErrorField>{errors.title?.message}</ErrorField>
      <Input
        {...register("kind")}
        labelText="Вид медитации"
        withLabel
        isNotArray
      />
      <ErrorField>{errors.kind?.message}</ErrorField>
      <Controller
        name="image"
        control={control}
        render={({ field: { onChange } }) => {
          return (
            <DropFileInput
              labelText="Изображение"
              withLabel
              isNotArray
              name="image"
              type="image"
              onChange={onChange}
            />
          );
        }}
      />
      <ErrorField>{errors.image?.message}</ErrorField>
      <Controller
        name="audio"
        control={control}
        render={({ field: { onChange } }) => {
          return (
            <DropFileInput
              labelText="Аудио"
              withLabel
              isNotArray
              name="audio"
              type="audio"
              onChange={onChange}
            />
          );
        }}
      />
      <ErrorField>{errors.audio?.message}</ErrorField>
      <Label htmlFor="textLines.0.text">Строчки аудиозаписи</Label>
      {fields.map((field, index) => (
        <FieldContainer key={field.id}>
          <InputContainer>
            <Textarea
              {...register(`textLines.${index}.text` as never)}
              rows={1}
              isAutosize
              isActive={getIsActiveInput(index)}
            />
            <ButtonClose onClick={() => remove(index)} />
          </InputContainer>
          <TimeInputsContainer>
            <TimeInputContainer>
              <Label htmlFor={`textLines.${index}.timeAt`}>Начало(с.мс)</Label>
              <Input
                isNotArray
                {...register(`textLines.${index}.timeAt` as never)}
                isActive={getIsActiveInput(index)}
                type="number"
              />
            </TimeInputContainer>
            <TimeInputContainer>
              <Label htmlFor={`textLines.${index}.timeTo`}>Конец(с.мс)</Label>
              <Input
                isNotArray
                {...register(`textLines.${index}.timeTo` as never)}
                isActive={getIsActiveInput(index)}
                type="number"
              />
            </TimeInputContainer>
          </TimeInputsContainer>
          <ErrorField>
            {errors.textLines &&
              (errors.textLines[index]?.text?.message ||
                errors.textLines[index]?.timeAt?.message ||
                errors.textLines[index]?.timeTo?.message)}
          </ErrorField>
        </FieldContainer>
      ))}
      <Button
        type="button"
        onClick={() => {
          const lastTimeTo = getValues(`textLines.${fields.length - 1}.timeTo`);

          append({
            text: "",
            timeAt: lastTimeTo ? (Number(lastTimeTo) + 0.1).toFixed(1) : null,
            timeTo: null,
          });
        }}
      >
        + Строчка аудиозаписи
      </Button>
      <Button isPrimary>Загрузить</Button>
    </Form>
  );
}

const Label = styled.label`
  ${FontSizeStandard}
  cursor: pointer;
  color: ${Color.TextStandard};
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
`;

const TimeInputsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const TimeInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ButtonClose = styled.button`
  ${ResetButton}
  width: 30px;
  height: 30px;
  background: url(/images/close.svg) no-repeat center;
`;
