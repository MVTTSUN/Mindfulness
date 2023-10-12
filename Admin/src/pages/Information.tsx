import { Helmet } from "react-helmet-async";
import { ContainerTwoSides } from "../components/ContainerTwoSides";
import { FormInformation } from "../components/FormInformation";
import { Subtitle } from "../components/Subtitle";

export function InformationPage() {
  return (
    <>
      <Helmet>
        <title>Информация - Mindfulness</title>
      </Helmet>
      <Subtitle>Информация</Subtitle>
      <ContainerTwoSides>
        <FormInformation />
        <div></div>
      </ContainerTwoSides>
    </>
  );
}
