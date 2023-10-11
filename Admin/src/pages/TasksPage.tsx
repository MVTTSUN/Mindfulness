import { ContainerTwoSides } from "../components/ContainerTwoSides";
import { FormTextLottieImage } from "../components/FormTextLottieImage";
import { Subtitle } from "../components/Subtitle";

export function TasksPage() {
  return (
    <>
      <Subtitle>Задания</Subtitle>
      <ContainerTwoSides>
        <FormTextLottieImage />
        <div></div>
      </ContainerTwoSides>
    </>
  );
}
