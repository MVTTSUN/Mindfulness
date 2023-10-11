import { Linking, ScrollView } from "react-native";
import { CenterContainer } from "../../components/CenterContainer";
import { GlobalScreen } from "../../components/GlobalScreen";
import { TopWithBack } from "../../components/ui/TopWithBack";
import { styled } from "styled-components/native";
import { Subtitle } from "../../components/ui/Titles/Subtitle";
import { TouchableHighlight } from "../../components/ui/Touchables/TouchableHighlight";
import LottieView from "lottie-react-native";

export function Service() {
  return (
    <GlobalScreen withoutScrollView>
      <CenterContainer>
        <TopWithBack>
          <TextTitle>Поддержка</TextTitle>
        </TopWithBack>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ViewMargin>
            <Subtitle>Разработчик приложения</Subtitle>
            <RoundedImage>
              <LottieViewStyled
                source={require("../../assets/lottie/animaRound.json")}
                autoPlay
                loop
              />
              <ImageStyled
                source={require("../../assets/images/avatar-developer.jpg")}
              />
            </RoundedImage>
            <TextName>Рябцун Матвей Сергеевич</TextName>
          </ViewMargin>
          <Subtitle>Нашли баги или есть предложения по улучшению?</Subtitle>
          <TouchableHighlight
            onPress={() => Linking.openURL("mailto:ryabtzun2011@yandex.ru")}
          >
            ryabtzun2011@yandex.ru
          </TouchableHighlight>
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
