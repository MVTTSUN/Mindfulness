import styled from "styled-components";
import { ApiRoute, BASE_URL, Color } from "../const";
import { FontSizeHeading, FontSizeStandard } from "../mixins";
import Lottie from "react-lottie-player";
import LottieCircle from "/public/lottie/animaRound.json";
import { useOutletContext } from "react-router-dom";
import { DataInformation } from "../types/get-results";

export function DisplayResultInfo() {
  const data = useOutletContext<DataInformation>();

  return (
    <Container>
      <Strong>Информация о психотерапевте</Strong>
      <Text>
        <TextStrong>Фамилия:</TextStrong> {data?.secondNamePsycho}
      </Text>
      <Text>
        <TextStrong>Имя:</TextStrong> {data?.firstNamePsycho}
      </Text>
      <Text>
        <TextStrong>Отчество:</TextStrong> {data?.surnamePsycho}
      </Text>
      <Text>
        <TextStrong>Краткая информация:</TextStrong> {data?.info}
      </Text>
      <WrapperImageAndLottie>
        <Image
          src={
            data
              ? `${BASE_URL}${ApiRoute.Info + ApiRoute.Filename}/${
                  data?.avatarPsycho
                }`
              : ""
          }
        />
        <LottieStyled loop animationData={LottieCircle} play />
      </WrapperImageAndLottie>
      <Text>
        <TextStrong>Никнейм Instagram:</TextStrong> {data?.nicknameInstagram}
      </Text>
      <Text>
        <TextStrong>Никнейм Telegram:</TextStrong> {data?.nicknameTelegram}
      </Text>
      <Text>
        <TextStrong>Никнейм VK:</TextStrong> {data?.nicknameVK}
      </Text>
      <Text>
        <TextStrong>Почта:</TextStrong> {data?.emailPsycho}
      </Text>
      <Strong>Информация о разработчике</Strong>
      <Text>
        <TextStrong>Фамилия:</TextStrong> {data?.secondNameDevelop}
      </Text>
      <Text>
        <TextStrong>Имя:</TextStrong> {data?.firstNameDevelop}
      </Text>
      <Text>
        <TextStrong>Отчество:</TextStrong> {data?.surnameDevelop}
      </Text>
      <WrapperImageAndLottie>
        <Image
          src={
            data
              ? `${BASE_URL}${ApiRoute.Info + ApiRoute.Filename}/${
                  data?.avatarDevelop
                }`
              : ""
          }
        />
        <LottieStyled loop animationData={LottieCircle} play />
      </WrapperImageAndLottie>
      <Text>
        <TextStrong>Почта:</TextStrong> {data?.emailDevelop}
      </Text>
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

const Strong = styled.p`
  ${FontSizeHeading}
  text-align: center;
  padding: 5px 0;
  font-size: 20px;
  color: ${Color.TextStandard};

  @media (max-width: 550px) {
    font-size: 16px;
  }
`;

const Text = styled.p`
  ${FontSizeStandard}
  width: 100%;
  color: ${Color.TextStandard};
  text-align: justify;
`;

const TextStrong = styled.span`
  ${FontSizeHeading}
  font-size: 16px;
  width: 100%;
  color: ${Color.TextStandard};
  text-align: justify;

  @media (max-width: 550px) {
    font-size: 14px;
  }
`;

const WrapperImageAndLottie = styled.div`
  position: relative;
  overflow: hidden;
  width: 210px;
  height: 210px;
`;

const Image = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 75px;
`;

const LottieStyled = styled(Lottie)`
  position: absolute;
  width: 280px;
  height: 280px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
