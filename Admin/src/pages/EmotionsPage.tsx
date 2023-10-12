import { Helmet } from "react-helmet-async";
import { ContainerTwoSides } from "../components/ContainerTwoSides";
import { FormEmotion } from "../components/FormEmotion";
import { Subtitle } from "../components/Subtitle";

export function EmotionsPage() {
  return (
    <>
      <Helmet>
        <title>Эмоции - Mindfulness</title>
      </Helmet>
      <Subtitle>Эмоции</Subtitle>
      <ContainerTwoSides>
        <FormEmotion />
        <div></div>
      </ContainerTwoSides>
    </>
  );
}
