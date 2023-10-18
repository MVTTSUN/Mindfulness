import {
  Controller,
  FormProvider,
  Resolver,
  useFieldArray,
  useForm,
} from "react-hook-form";
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
import {
  BASE_URL,
  BrowserRoute,
  Color,
  OPTIONS_KIND_MEDITATIONS,
} from "../const";
import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { getCurrentTime, getIsPause } from "../store/currentAudioSelectors";
import { InputSelect } from "./InputSelect";
import {
  useAddMeditationMutation,
  useUpdateMeditationMutation,
} from "../services/api";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { DataMeditation } from "../types/get-results";
import {
  DragDropContext,
  Draggable,
  Droppable,
  OnDragEndResponder,
} from "@hello-pangea/dnd";

export function FormMeditation() {
  const data = useOutletContext<DataMeditation>();
  const [textLines, setTextLines] = useState<TextLine[]>([]);
  const isPause = useAppSelector(getIsPause);
  const currentTime = useAppSelector(getCurrentTime);
  const methods = useForm<FormMeditation>({
    mode: "onChange",
    resolver: yupResolver(
      schemaMeditation
    ) as unknown as Resolver<FormMeditation>,
    defaultValues: {
      title: data ? data.title : "",
      kind: data ? data.kind : "",
      image: data ? `${BASE_URL}/meditations/filename/${data?.image}` : "",
      audio: data ? `${BASE_URL}/meditations/filename/${data?.audio}` : "",
      textLines: data ? data.textLines : [],
    },
  });
  const {
    register,
    handleSubmit,
    control,
    getValues,
    reset,
    setValue,
    formState: { errors },
  } = methods;
  const { fields, append, remove, replace, move } = useFieldArray({
    control,
    name: "textLines",
  } as { name: string });
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [addMeditation, { isLoading: isLoadingAdd }] =
    useAddMeditationMutation();
  const [patchMeditation, { isLoading: isLoadingPatch }] =
    useUpdateMeditationMutation();
  const isLoading = isLoadingAdd || isLoadingPatch;

  const onSubmit = handleSubmit(async (dataForm) => {
    if (pathname === BrowserRoute.Meditation) {
      await addMeditation(dataForm);
      reset();
      replace([]);
    } else if (pathname.includes(BrowserRoute.Meditation)) {
      await patchMeditation({ id: data._id, data: dataForm });
      navigate(-1);
    }
  });

  const getIsActiveInput = (index: number) => {
    const timeAt = textLines[index]?.timeAt as number;
    const timeTo = textLines[index]?.timeTo as number;

    if (timeAt && timeTo) {
      return timeAt <= currentTime && timeTo >= currentTime;
    }
    return false;
  };

  const handleDrag: OnDragEndResponder = ({ source, destination }) => {
    if (destination) {
      move(source.index, destination.index);
    }
  };

  useEffect(() => {
    if (!isPause) {
      setTextLines(getValues("textLines"));
    }
  }, [isPause]);

  useEffect(() => {
    if (data) {
      setValue("title", data?.title);
      setValue("kind", data?.kind);
      setValue("image", `${BASE_URL}/meditations/filename/${data?.image}`);
      setValue("audio", `${BASE_URL}/meditations/filename/${data?.audio}`);
      replace(data.textLines);
    }
  }, [data]);

  return (
    <FormProvider {...methods}>
      <Form onSubmit={onSubmit}>
        <Input
          {...register("title")}
          labelText="Название"
          withLabel
          isNotArray
        />
        <ErrorField>{errors.title?.message}</ErrorField>
        <InputSelect
          options={OPTIONS_KIND_MEDITATIONS}
          name="kind"
          labelText="Вид медитации"
          withLabel
        />
        <ErrorField>{errors.kind?.message}</ErrorField>
        <Controller
          name="image"
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <DropFileInput
                labelText="Изображение"
                withLabel
                isNotArray
                name="image"
                type="image"
                onChange={onChange}
                src={value}
              />
            );
          }}
        />
        <ErrorField>{errors.image?.message}</ErrorField>
        <Controller
          name="audio"
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <DropFileInput
                labelText="Аудио"
                withLabel
                isNotArray
                name="audio"
                type="audio"
                onChange={onChange}
                src={value}
              />
            );
          }}
        />
        <ErrorField>{errors.audio?.message}</ErrorField>
        <Label htmlFor="textLines.0.text">Строчки аудиозаписи</Label>
        <DragDropContext onDragEnd={handleDrag}>
          <div>
            <Droppable droppableId="test-fields">
              {(provided) => (
                <FieldsContainer
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {fields.map((_, index) => (
                    <Draggable
                      key={`test[${index}]`}
                      draggableId={`field-${index}`}
                      index={index}
                    >
                      {(provided) => (
                        <FieldContainer
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <InputContainer>
                            <ButtonMove {...provided.dragHandleProps} />
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
                              <Label htmlFor={`textLines.${index}.timeAt`}>
                                Начало(с.мс)
                              </Label>
                              <Input
                                isNotArray
                                {...register(
                                  `textLines.${index}.timeAt` as never
                                )}
                                isActive={getIsActiveInput(index)}
                                type="number"
                              />
                            </TimeInputContainer>
                            <TimeInputContainer>
                              <Label htmlFor={`textLines.${index}.timeTo`}>
                                Конец(с.мс)
                              </Label>
                              <Input
                                isNotArray
                                {...register(
                                  `textLines.${index}.timeTo` as never
                                )}
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
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </FieldsContainer>
              )}
            </Droppable>
          </div>
        </DragDropContext>
        <Button
          type="button"
          onClick={() => {
            const lastTimeTo = getValues(
              `textLines.${fields.length - 1}.timeTo`
            );

            append({
              text: "",
              timeAt: lastTimeTo ? Number(lastTimeTo) : null,
              timeTo: null,
            });
          }}
        >
          + Строчка аудиозаписи
        </Button>
        <Button isDisabled={isLoading} isPrimary isLoading={isLoading}>
          {isLoading ? "Сохранение" : "Загрузить"}
        </Button>
      </Form>
    </FormProvider>
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

const ButtonMove = styled.div`
  ${ResetButton}
  width: 30px;
  height: 30px;
  background: url(/images/move.svg) no-repeat center;
`;

const ButtonClose = styled.button`
  ${ResetButton}
  width: 30px;
  height: 30px;
  background: url(/images/close.svg) no-repeat center;
`;

const FieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
