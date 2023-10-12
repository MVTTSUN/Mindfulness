import styled from "styled-components";
import { BASE_URL, Color } from "../const";
import { useGetTipsQuery } from "../services/api";
import Lottie from "react-lottie-player";
import { Preloader } from "./Preloader";
import { FontSizeStandard } from "../mixins";

export function DisplayResultTips() {
  const { data, isFetching } = useGetTipsQuery();

  return (
    <Container>
      {isFetching && <Preloader />}
      {!isFetching &&
        data &&
        data[0]?.data.map((item, index) => {
          if (item.type === "text") {
            return <Text key={index}>{item.payload as string}</Text>;
          } else if (item.type === "image") {
            return (
              <Image key={index} src={`${BASE_URL}/tips/${item.payload}`} />
            );
          } else {
            return (
              <WrapperFile key={index}>
                <Lottie loop path={`${BASE_URL}/tips/${item.payload}`} play />
              </WrapperFile>
            );
          }
        })}
    </Container>
  );
}

const Container = styled.div`
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const Text = styled.p`
  ${FontSizeStandard}
  width: 100%;
  color: ${Color.TextStandard};
  text-align: justify;
`;

const Image = styled.img`
  aspect-ratio: 8 / 5;
  width: 100%;
  object-fit: cover;
  height: 250px;
  border-radius: 25px;
  border: 5px dashed ${Color.Primary};
`;

const WrapperFile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 250px;
  overflow: hidden;
  border-radius: 25px;
  border: 5px dashed ${Color.Primary};
`;
