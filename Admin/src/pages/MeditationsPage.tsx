import { ContainerTwoSides } from "../components/ContainerTwoSides";
import { FormMeditation } from "../components/FormMeditation";
import { Subtitle } from "../components/Subtitle";

export function MeditationsPage() {
  return (
    <>
      <Subtitle>Медитации</Subtitle>
      <ContainerTwoSides>
        <FormMeditation />
        <div></div>
      </ContainerTwoSides>
    </>
  );
}
