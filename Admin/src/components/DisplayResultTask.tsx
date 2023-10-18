import styled from "styled-components";
import { BASE_URL, Color } from "../const";
import Lottie from "react-lottie-player";
import { FontSizeStandard } from "../mixins";
import { DataTextLottieImage } from "../types/get-results";
import { useOutletContext } from "react-router-dom";

export function DisplayResultTask() {
  const data = useOutletContext<DataTextLottieImage[]>();

  return (
    <Container>
      <Text>Вид: {data && data[0]?.kind}</Text>
      {data &&
        data[0]?.data.map((item, index) => {
          if (item.type === "text") {
            return <Text key={index}>{item.payload as string}</Text>;
          } else if (item.type === "image") {
            return (
              <Image
                key={index}
                src={`${BASE_URL}/tasks/filename/${item.payload}`}
              />
            );
          } else {
            return (
              <WrapperLottie key={index}>
                <Lottie
                  loop
                  path={`${BASE_URL}/tasks/filename/${item.payload}`}
                  play
                />
              </WrapperLottie>
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

const WrapperLottie = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 250px;
  overflow: hidden;
  border-radius: 25px;
  border: 5px dashed ${Color.Primary};
`;
