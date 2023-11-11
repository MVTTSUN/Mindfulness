import styled from "styled-components";
import { ApiRoute, BASE_URL, Color } from "../const";
import { useGetTipsQuery } from "../services/api";
import Lottie from "react-lottie-player";
import { FontSizeStandard } from "../mixins";

export function DisplayResultTips() {
  const { data } = useGetTipsQuery();

  return (
    <Container>
      {data &&
        data[0]?.data.map((item, index) => {
          if (item.type === "text") {
            return <Text key={index}>{item.payload as string}</Text>;
          } else if (item.type === "image") {
            return (
              <Image
                key={index}
                src={`${BASE_URL}${ApiRoute.Tips + ApiRoute.Filename}/${
                  item.payload
                }`}
              />
            );
          } else {
            return (
              <WrapperLottie key={index}>
                <Lottie
                  loop
                  path={`${BASE_URL}${ApiRoute.Tips + ApiRoute.Filename}/${
                    item.payload
                  }`}
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
  white-space: break-spaces;
`;

const Image = styled.img`
  box-sizing: border-box;
  aspect-ratio: 8 / 5;
  width: 100%;
  object-fit: cover;
  height: 250px;
  border-radius: 25px;
  border: 5px dashed ${Color.Primary};
`;

const WrapperLottie = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 250px;
  overflow: hidden;
  border-radius: 25px;
  border: 5px dashed ${Color.Primary};
`;
