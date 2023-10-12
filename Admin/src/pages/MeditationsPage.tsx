import { Helmet } from "react-helmet-async";
import { ContainerTwoSides } from "../components/ContainerTwoSides";
import { FormMeditation } from "../components/FormMeditation";
import { Subtitle } from "../components/Subtitle";

export function MeditationsPage() {
  return (
    <>
      <Helmet>
        <title>Медитации - Mindfulness</title>
      </Helmet>
      <Subtitle>Медитации</Subtitle>
      <ContainerTwoSides>
        <FormMeditation />
        <div></div>
      </ContainerTwoSides>
    </>
  );
}
