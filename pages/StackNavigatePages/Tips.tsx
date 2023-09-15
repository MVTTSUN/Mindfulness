import styled from "styled-components/native";
import { CenterContainer } from "../../components/CenterContainer";
import { GlobalScreen } from "../../components/GlobalScreen";
import { TopWithBack } from "../../components/ui/TopWithBack";
import { Image, ScrollView } from "react-native";
import LottieView, { AnimationObject } from "lottie-react-native";
import { COLORS, TIP } from "../../const";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

export function Tips() {
  const [LottieAnim, setLottieAnim] = useState();

  useEffect(() => {
    fetch(
      "https://lottie.host/cb7b9c59-545d-4e94-935e-9c9649b31561/swVRk5AsiQ.json",
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((responseData) => {
        setLottieAnim(responseData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <GlobalScreen withoutScrollView>
      <CenterContainer>
        <TopWithBack>
          <TextTitle>Как медитировать правильно?</TextTitle>
        </TopWithBack>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Container>
            <ImageWrapper>
              <ImageNode
                source={{
                  uri: "https://sportishka.com/uploads/posts/2022-11/1667542667_16-sportishka-com-p-sportkar-khonda-instagram-18.jpg",
                }}
              />
            </ImageWrapper>
            <LottieWrapper>
              <LottieNode
                source={LottieAnim as unknown as AnimationObject}
                autoPlay
                loop
                resizeMode="cover"
              />
            </LottieWrapper>
            {TIP.map((node, index) => {
              if (node.type === "text") {
                return <TextNode key={index}>{node.payload}</TextNode>;
              } else if (node.type === "image") {
                return (
                  <ImageWrapper key={index}>
                    <ImageNode source={node.payload} />
                  </ImageWrapper>
                );
              } else if (node.type === "lottie") {
                return (
                  <LottieWrapper key={index}>
                    <LottieNode
                      source={node.payload}
                      autoPlay
                      loop
                      resizeMode="cover"
                    />
                  </LottieWrapper>
                );
              }
            })}
          </Container>
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

const Container = styled.View`
  gap: 20px;
  margin-bottom: 270px;
`;

const LottieWrapper = styled.View`
  overflow: hidden;
  height: 250px;
  width: 100%;
  border-radius: 25px;
  border: 7px dotted ${COLORS.mainColors.normal};
`;

const LottieNode = styled(LottieView)`
  flex: 1;
`;

const TextNode = styled.Text`
  text-align: justify;
  font-family: "Poppins-Regular";
  font-size: 18px;
  line-height: 24px;
  color: ${({ theme }) => theme.color.standard};
`;

const ImageWrapper = styled.View`
  height: 250px;
  width: 100%;
  border-radius: 25px;
  border: 7px dotted ${COLORS.mainColors.normal};
  overflow: hidden;
`;

const ImageNode = styled.Image`
  object-fit: cover;
  height: 250px;
  width: 100%;
  border-radius: 25px;
`;
