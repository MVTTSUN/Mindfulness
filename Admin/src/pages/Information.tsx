import { ContainerTwoSides } from "../components/ContainerTwoSides";
import { FormInformation } from "../components/FormInformation";
import { Subtitle } from "../components/Subtitle";

export function InformationPage() {
  return (
    <>
      <Subtitle>Информация</Subtitle>
      <ContainerTwoSides>
        <FormInformation />
        <div></div>
      </ContainerTwoSides>
    </>
  );
}
