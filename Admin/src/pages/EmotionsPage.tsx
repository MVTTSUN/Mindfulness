import { ContainerTwoSides } from "../components/ContainerTwoSides";
import { FormEmotion } from "../components/FormEmotion";
import { Subtitle } from "../components/Subtitle";

export function EmotionsPage() {
  return (
    <>
      <Subtitle>Эмоции</Subtitle>
      <ContainerTwoSides>
        <FormEmotion />
        <div></div>
      </ContainerTwoSides>
    </>
  );
}
