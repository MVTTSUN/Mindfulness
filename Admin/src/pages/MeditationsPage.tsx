import { Helmet } from "react-helmet-async";
import { ContainerTwoSides } from "../components/ContainerTwoSides";
import { FormMeditation } from "../components/FormMeditation";
import { Subtitle } from "../components/Subtitle";
import { DisplayCardsTasksAndMeditations } from "../components/DisplayCardsTasksAndMeditations";
import { useGetMeditationsQuery } from "../services/api";

export function MeditationsPage() {
  const { data } = useGetMeditationsQuery();

  return (
    <>
      <Helmet>
        <title>Медитации - Mindfulness</title>
      </Helmet>
      <Subtitle>Медитации</Subtitle>
      <ContainerTwoSides>
        <FormMeditation />
        <DisplayCardsTasksAndMeditations data={data} />
      </ContainerTwoSides>
    </>
  );
}
