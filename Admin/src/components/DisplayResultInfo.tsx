import styled from "styled-components";
import { BASE_URL, Color } from "../const";
import { useGetInfoQuery } from "../services/api";
import { FontSizeHeading, FontSizeStandard } from "../mixins";
import Lottie from "react-lottie-player";
import LottieCircle from "/public/lottie/animaRound.json";

export function DisplayResultInfo() {
  const { data } = useGetInfoQuery();

  return (
    <Container>
      <Strong>Информация о психотерапевте</Strong>
      <Text>
        <TextStrong>Фамилия:</TextStrong> {data && data[0]?.secondNamePsycho}
      </Text>
      <Text>
        <TextStrong>Имя:</TextStrong> {data && data[0]?.firstNamePsycho}
      </Text>
      <Text>
        <TextStrong>Отчество:</TextStrong> {data && data[0]?.surnamePsycho}
      </Text>
      <Text>
        <TextStrong>Краткая информация:</TextStrong> {data && data[0]?.info}
      </Text>
      <WrapperImageAndLottie>
        <Image src={`${BASE_URL}/info/${data && data[0]?.avatarPsycho}`} />
        <LottieStyled loop animationData={LottieCircle} play />
      </WrapperImageAndLottie>
      <Text>
        <TextStrong>Никнейм Instagram:</TextStrong>{" "}
        {data && data[0]?.nicknameInstagram}
      </Text>
      <Text>
        <TextStrong>Никнейм Telegram:</TextStrong>{" "}
        {data && data[0]?.nicknameTelegram}
      </Text>
      <Text>
        <TextStrong>Никнейм VK:</TextStrong> {data && data[0]?.nicknameVK}
      </Text>
      <Text>
        <TextStrong>Почта:</TextStrong> {data && data[0]?.emailPsycho}
      </Text>
      <Strong>Информация о разработчике</Strong>
      <Text>
        <TextStrong>Фамилия:</TextStrong> {data && data[0]?.secondNameDevelop}
      </Text>
      <Text>
        <TextStrong>Имя:</TextStrong> {data && data[0]?.firstNameDevelop}
      </Text>
      <Text>
        <TextStrong>Отчество:</TextStrong> {data && data[0]?.surnameDevelop}
      </Text>
      <WrapperImageAndLottie>
        <Image src={`${BASE_URL}/info/${data && data[0]?.avatarDevelop}`} />
        <LottieStyled loop animationData={LottieCircle} play />
      </WrapperImageAndLottie>
      <Text>
        <TextStrong>Почта:</TextStrong> {data && data[0]?.emailDevelop}
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
