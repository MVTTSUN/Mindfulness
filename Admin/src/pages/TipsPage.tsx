import { ContainerTwoSides } from "../components/ContainerTwoSides";
import { FormTextLottieImage } from "../components/FormTextLottieImage";
import { Subtitle } from "../components/Subtitle";

export function TipsPage() {
  return (
    <>
      <Subtitle>Советы</Subtitle>
      <ContainerTwoSides>
        <FormTextLottieImage />
        <div></div>
      </ContainerTwoSides>
    </>
  );
}
