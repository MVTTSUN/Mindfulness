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
  UseFieldArrayReplace,
  FormProvider,
} from "react-hook-form";
import { FormTextLottieImage } from "../types/form";
import { schemaTextLottieImage } from "../utils/yup";
import { DropFileInput } from "./DropFileInput";
import { ErrorField } from "./ErrorField";
import { Textarea } from "./Textarea";
import { Button } from "./Button";
import {
  useAddTaskMutation,
  useAddTipsMutation,
  useUpdateTaskMutation,
  useValidateAddTaskMutation,
  useValidateUpdateTaskMutation,
} from "../services/api";
import {
  ApiRoute,
  BASE_URL,
  BrowserRoute,
  Image,
  OPTIONS_KIND_TASKS,
} from "../const";
import {
  DragDropContext,
  Droppable,
  Draggable,
  OnDragEndResponder,
} from "@hello-pangea/dnd";
import { useEffect, useRef } from "react";
import { Input } from "./Input";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { DataTextLottieImage, DataValidate } from "../types/server";
import { InputSelect } from "./InputSelect";

export function FormTextLottieImage() {
  const data = useOutletContext<DataTextLottieImage[]>();
  const dataRef = useRef(data && data[0]?.data);
  const sourceFileIndexRef = useRef<number | null>(null);
  const destinationFileIndexRef = useRef<number | null>(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [addTips, { isLoading: isLoadingTips }] = useAddTipsMutation();
  const [addTask, { isLoading: isLoadingTaskAdd }] = useAddTaskMutation();
  const [patchTask, { isLoading: isLoadingTaskPatch }] =
    useUpdateTaskMutation();
  const [validateAddTask, { isLoading: isLoadingTaskAddValidate }] =
    useValidateAddTaskMutation();
  const [validateUpdateTask, { isLoading: isLoadingTaskUpdateValidate }] =
    useValidateUpdateTaskMutation();
  const routeName =
    pathname === BrowserRoute.Tip + BrowserRoute.Edit
      ? ApiRoute.Tips
      : ApiRoute.Tasks;
  const dataFieldsAdapted =
    data &&
    data[0]?.data.map((item) => ({
      type: item.type,
      payload: (item.type === "text"
        ? item.payload
        : `${BASE_URL}${routeName + ApiRoute.Filename}/${
            item.payload
          }`) as string,
    }));
  const methods = useForm<FormTextLottieImage>({
    mode: "onChange",
    resolver: yupResolver(
      schemaTextLottieImage(pathname.includes(BrowserRoute.Task))
    ) as unknown as Resolver<FormTextLottieImage>,
    defaultValues: {
      title: pathname.includes(BrowserRoute.Task) ? data && data[0]?.title : "",
      kind: data && data[0]?.kind,
      fields: dataFieldsAdapted,
    },
  });
  const {
    handleSubmit,
    control,
    register,
    reset,
    setValue,
    formState: { errors },
  } = methods;
  const { fields, append, remove, move, replace } = useFieldArray({
    control,
    name: "fields",
  } as { name: string }) as {
    fields: Record<"id" | "type" | "payload", string>[];
    append: UseFieldArrayAppend<FieldValues, string>;
    remove: UseFieldArrayRemove;
    move: UseFieldArrayMove;
    replace: UseFieldArrayReplace<FieldValues, string>;
  };
  const isLoading =
    isLoadingTaskAdd ||
    isLoadingTips ||
    isLoadingTaskPatch ||
    isLoadingTaskAddValidate ||
    isLoadingTaskUpdateValidate;

  const onSubmit = handleSubmit(async (dataForm) => {
    if (pathname === BrowserRoute.Task) {
      const validateResult = (await validateAddTask(
        dataForm
      )) as unknown as DataValidate;
      if (validateResult?.data?.message) {
        await addTask(dataForm);
        reset();
        replace([]);
      }
    } else if (pathname.includes(BrowserRoute.Task)) {
      const validateResult = (await validateUpdateTask({
        id: data[0]._id,
        data: dataForm,
      })) as unknown as DataValidate;
      if (validateResult?.data?.message) {
        await patchTask({ id: data[0]._id, data: dataForm });
        navigate(-1);
      }
    } else if (pathname === BrowserRoute.Tip + BrowserRoute.Edit) {
      await addTips(dataForm);
      navigate(-1);
    }
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

  useEffect(() => {
    if (data) {
      setValue("title", data[0]?.title);
      setValue("kind", data[0]?.kind);
      replace(dataFieldsAdapted);
    }
  }, [data]);

  useEffect(() => {
    if (fields.length === 0 && !fields[0]?.type) {
      replace([]);
    }
  }, []);

  return (
    <FormProvider {...methods}>
      <Form onSubmit={onSubmit}>
        {pathname.includes(BrowserRoute.Task) && (
          <>
            <Input
              {...register("title")}
              labelText="Название"
              withLabel
              isNotArray
            />
            <ErrorField>{errors.title?.message}</ErrorField>
            <InputSelect
              options={OPTIONS_KIND_TASKS}
              name="kind"
              labelText="Вид задания"
              withLabel
            />
            <ErrorField>{errors.kind?.message}</ErrorField>
          </>
        )}
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
                                          dataRef.current[index] &&
                                          field.payload !== "" &&
                                          typeof field.payload === "string"
                                            ? `${BASE_URL}${
                                                routeName + ApiRoute.Filename
                                              }/${
                                                dataRef.current[index]?.payload
                                              }`
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
                                          dataRef.current[index] &&
                                          field.payload !== "" &&
                                          typeof field.payload === "string"
                                            ? `${BASE_URL}${
                                                routeName + ApiRoute.Filename
                                              }/${
                                                dataRef.current[index]?.payload
                                              }`
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
        <Button disabled={isLoading} isPrimary isLoading={isLoading}>
          {isLoading ? "Сохранение" : "Загрузить"}
        </Button>
      </Form>
    </FormProvider>
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
  background: url(${Image.Close}) no-repeat center;
`;

const ButtonMove = styled.div`
  ${ResetButton}
  width: 30px;
  height: 30px;
  background: url(${Image.Move}) no-repeat center;
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
