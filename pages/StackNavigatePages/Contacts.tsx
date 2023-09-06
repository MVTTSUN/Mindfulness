import { Linking, ScrollView, View } from "react-native";
import { CenterContainer } from "../../components/CenterContainer";
import { GlobalScreen } from "../../components/GlobalScreen";
import { TopWithBack } from "../../components/ui/TopWithBack";
import { styled } from "styled-components/native";
import { TouchableHighlight } from "../../components/ui/Touchables/TouchableHighlight";
import { Subtitle } from "../../components/ui/Titles/Subtitle";
import { InstagramIcon } from "../../components/icons/Socials/InstagramIcon";
import { TelegramIcon } from "../../components/icons/Socials/TelegramIcon";
import { VKIcon } from "../../components/icons/Socials/VKIcon";
import { WhatsappIcon } from "../../components/icons/Socials/WhatsappIcon";
import LottieView from "lottie-react-native";

export function Contacts() {
  return (
    <GlobalScreen withoutScrollView>
      <CenterContainer>
        <TopWithBack>
          <TextTitle>Контакты</TextTitle>
        </TopWithBack>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ViewMargin>
            <Subtitle>Психотерапевт</Subtitle>
            <RoundedImage>
              <LottieViewStyled
                source={require("../../assets/lottie/animaRound.json")}
                autoPlay
                loop
              />
              <ImageStyled source={require("../../assets/images/avatar.jpg")} />
            </RoundedImage>
            <TextName>Тумарова Дарья Сергеевна</TextName>
          </ViewMargin>
          <Subtitle>Мои соцсети</Subtitle>
          <ViewSociety>
            <TouchableHighlight
              isRound
              onPress={() =>
                Linking.openURL("instagram://user?username=tumarova_psy").catch(
                  () => {
                    Linking.openURL("https://www.instagram.com/tumarova_psy");
                  }
                )
              }
            >
              <InstagramIcon />
            </TouchableHighlight>
            <TouchableHighlight
              isRound
              onPress={() => Linking.openURL("https://t.me/MVTTSUN")}
            >
              <TelegramIcon />
            </TouchableHighlight>
            <TouchableHighlight
              isRound
              onPress={() => Linking.openURL("https://vk.com/mvtthew")}
            >
              <VKIcon />
            </TouchableHighlight>
            <TouchableHighlight
              isRound
              onPress={() =>
                Linking.openURL(
                  "whatsapp://send?text=Здравствуйте, хочу записаться на консультацию&phone=79625770212"
                ).catch(() => {
                  Linking.openURL("https://wa.me/79625770212");
                })
              }
            >
              <WhatsappIcon />
            </TouchableHighlight>
          </ViewSociety>
          <ViewMargin>
            <Subtitle>Моя почта</Subtitle>
            <TouchableHighlight
              onPress={() => Linking.openURL("mailto:ryabtzun2011@yandex.ru")}
            >
              ryabtzun2011@yandex.ru
            </TouchableHighlight>
          </ViewMargin>
        </ScrollView>
      </CenterContainer>
    </GlobalScreen>
  );
}

const TextTitle = styled.Text`
  font-family: "Poppins-Medium";
  font-size: 18px;
  color: ${({ theme }) => theme.color.standard};
`;

const TextName = styled.Text`
  align-self: center;
  font-family: "Poppins-Regular";
  font-size: 14px;
  color: ${({ theme }) => theme.color.standard};
`;

const ViewSociety = styled.View`
  margin-bottom: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  gap: 10px;
`;

const ViewMargin = styled.View`
  margin-bottom: 20px;
`;

const RoundedImage = styled.View`
  margin-bottom: 15px;
  align-self: center;
  justify-content: center;
  align-items: center;
  height: 95px;
  width: 95px;
`;

const ImageStyled = styled.Image`
  height: 80px;
  width: 80px;
  border-radius: 50px;
`;

const LottieViewStyled = styled(LottieView)`
  position: absolute;
  height: 155px;
  width: 155px;
`;
