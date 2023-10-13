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
  UseFieldArrayMove,
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
import {
  DragDropContext,
  Droppable,
  Draggable,
  OnDragEndResponder,
} from "react-beautiful-dnd";
import { useRef } from "react";

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
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "fields",
  } as { name: string }) as {
    fields: Record<"id" | "type" | "payload", string>[];
    append: UseFieldArrayAppend<FieldValues, string>;
    remove: UseFieldArrayRemove;
    move: UseFieldArrayMove;
  };
  const [addTips, { isLoading }] = useAddTipsMutation();
  const dataRef = useRef(data);
  const sourceFileIndexRef = useRef<number | null>(null);
  const destinationFileIndexRef = useRef<number | null>(null);

  const onSubmit = handleSubmit((data) => {
    addTips(data);
  });

  const handleDrag: OnDragEndResponder = ({ source, destination }) => {
    if (destination) {
      move(source.index, destination.index);
      sourceFileIndexRef.current = source.index;
      destinationFileIndexRef.current = destination.index;
      const dataRefCopy = dataRef.current && [...dataRef.current];
      const deletedItem = dataRefCopy?.splice(source.index, 1);
      if (deletedItem) {
        dataRefCopy?.splice(destination.index, 0, deletedItem[0]);
      }
      dataRef.current = dataRefCopy;
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <DragDropContext onDragEnd={handleDrag}>
        <div>
          <Droppable droppableId="test-fields">
            {(provided) => (
              <FieldsContainer
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {fields.map((field, index) => {
                  return (
                    <Draggable
                      key={`test[${index}]`}
                      draggableId={`field-${index}`}
                      index={index}
                    >
                      {(provided) => (
                        <FieldContainer
                          key={field.id}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <InputContainer>
                            <ButtonMove {...provided.dragHandleProps} />
                            {field.type === "image" && (
                              <Controller
                                name={`fields.${index}.payload` as never}
                                control={control}
                                render={({ field: { onChange } }) => {
                                  return (
                                    <DropFileInput
                                      id={field.id}
                                      type="image"
                                      onChange={onChange}
                                      src={
                                        dataRef.current &&
                                        field.payload !== "" &&
                                        typeof field.payload === "string"
                                          ? `${BASE_URL}/tips/${dataRef.current[index].payload}`
                                          : field.payload
                                      }
                                    />
                                  );
                                }}
                              />
                            )}
                            {field.type === "text" && (
                              <Textarea
                                {...register(
                                  `fields.${index}.payload` as never
                                )}
                                rows={6}
                              />
                            )}
                            {field.type === "lottie" && (
                              <Controller
                                name={`fields.${index}.payload` as never}
                                control={control}
                                render={({ field: { onChange } }) => {
                                  return (
                                    <DropFileInput
                                      id={field.id}
                                      type="lottie"
                                      onChange={onChange}
                                      src={
                                        dataRef.current &&
                                        field.payload !== "" &&
                                        typeof field.payload === "string"
                                          ? `${BASE_URL}/tips/${dataRef.current[index].payload}`
                                          : field.payload
                                      }
                                    />
                                  );
                                }}
                              />
                            )}
                            <ButtonDelete
                              type="button"
                              onClick={() => remove(index)}
                            />
                          </InputContainer>
                          <ErrorField>
                            {errors.fields &&
                              errors.fields[index]?.payload?.message}
                          </ErrorField>
                        </FieldContainer>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </FieldsContainer>
            )}
          </Droppable>
        </div>
      </DragDropContext>
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

const ButtonDelete = styled.button`
  ${ResetButton}
  width: 30px;
  height: 30px;
  background: url(/images/close.svg) no-repeat center;
`;

const ButtonMove = styled.div`
  ${ResetButton}
  width: 30px;
  height: 30px;
  background: url(/images/move.svg) no-repeat center;
`;

const ContainerButtonsAdd = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 10px;
`;

const FieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
