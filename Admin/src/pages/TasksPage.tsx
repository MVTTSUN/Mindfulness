import { Helmet } from "react-helmet-async";
import { ContainerTwoSides } from "../components/ContainerTwoSides";
import { FormTextLottieImage } from "../components/FormTextLottieImage";
import { Subtitle } from "../components/Subtitle";

export function TasksPage() {
  return (
    <>
      <Helmet>
        <title>Задания - Mindfulness</title>
      </Helmet>
      <Subtitle>Задания</Subtitle>
      <ContainerTwoSides>
        <FormTextLottieImage />
        <div></div>
      </ContainerTwoSides>
    </>
  );
}
