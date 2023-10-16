import { Helmet } from "react-helmet-async";
import { ContainerTwoSides } from "../components/ContainerTwoSides";
import { FormTextLottieImage } from "../components/FormTextLottieImage";
import { Subtitle } from "../components/Subtitle";
import { useGetTasksQuery } from "../services/api";
import { DisplayCardsTasksAndMeditations } from "../components/DisplayCardsTasksAndMeditations";

export function TasksPage() {
  const { data } = useGetTasksQuery();

  return (
    <>
      <Helmet>
        <title>Задания - Mindfulness</title>
      </Helmet>
      <Subtitle>Задания</Subtitle>
      <ContainerTwoSides>
        <FormTextLottieImage />
        <DisplayCardsTasksAndMeditations data={data} />
      </ContainerTwoSides>
    </>
  );
}
