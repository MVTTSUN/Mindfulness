import { useState } from "react";
import { Button } from "../components/Button";
import { ContainerOneSide } from "../components/ContainerOneSide";
import { DisplayResultTips } from "../components/DisplayResultTips";
import { FormTextLottieImage } from "../components/FormTextLottieImage";
import { Subtitle } from "../components/Subtitle";
import { useGetTipsQuery } from "../services/api";
import { Helmet } from "react-helmet-async";

export function TipsPage() {
  const { data, error } = useGetTipsQuery();
  const [isEdit, setIsEdit] = useState(false);
  const textEdit = data && data[0]?.data.length ? "Редактировать" : "Добавить";
  const errorError = error && "error" in error ? error.error : "";

  return (
    <>
      <Helmet>
        <title>Советы - Mindfulness</title>
      </Helmet>
      <Subtitle>Советы</Subtitle>
      <ContainerOneSide>
        {!errorError && (
          <>
            <Button type="button" onClick={() => setIsEdit(!isEdit)} isPrimary>
              {data && !isEdit ? textEdit : "Назад"}
            </Button>
            {!data || isEdit ? (
              <FormTextLottieImage data={data && data[0]?.data} />
            ) : (
              <DisplayResultTips />
            )}
          </>
        )}
      </ContainerOneSide>
    </>
  );
}
