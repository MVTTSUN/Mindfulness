import { Helmet } from "react-helmet-async";
import { FormInformation } from "../components/FormInformation";
import { Subtitle } from "../components/Subtitle";
import { DisplayResultInfo } from "../components/DisplayResultInfo";
import { ContainerOneSide } from "../components/ContainerOneSide";
import { useGetInfoQuery } from "../services/api";
import { useState } from "react";
import { Button } from "../components/Button";

export function InformationPage() {
  const { data, error } = useGetInfoQuery();
  const [isEdit, setIsEdit] = useState(false);
  const textEdit = data ? "Редактировать" : "Добавить";
  const errorError = error && "error" in error ? error.error : "";

  return (
    <>
      <Helmet>
        <title>Информация - Mindfulness</title>
      </Helmet>
      <Subtitle>Информация</Subtitle>
      <ContainerOneSide>
        {!errorError && (
          <>
            <Button type="button" onClick={() => setIsEdit(!isEdit)} isPrimary>
              {data && !isEdit ? textEdit : "Назад"}
            </Button>
            {!data || isEdit ? (
              <FormInformation data={data && data[0]} />
            ) : (
              <DisplayResultInfo />
            )}
          </>
        )}
      </ContainerOneSide>
    </>
  );
}
