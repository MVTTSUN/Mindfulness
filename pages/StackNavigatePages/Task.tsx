import { GlobalScreen } from "../../components/GlobalScreen";
import { CenterContainer } from "../../components/CenterContainer";
import { TopWithBack } from "../../components/ui/TopWithBack";
import { styled } from "styled-components/native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NotesScreenProp, TaskType } from "../../types";
import AnimatedLottieView from "lottie-react-native";
import { ScrollView } from "react-native";
import { AddIcon } from "../../components/icons/AddIcon";

export function Task() {
  const route = useRoute();
  const { task } = route.params as { task: TaskType };
  const navigation = useNavigation<NotesScreenProp>();

  return (
    <>
      <GlobalScreen withoutScrollView>
        <CenterContainer>
          <TopWithBack>
            <TextTitle>{task.title}</TextTitle>
          </TopWithBack>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Container>
              {task.content.map((node, index) => {
                if (node.type === "text") {
                  return <TextNode key={index}>{node.payload}</TextNode>;
                } else if (node.type === "image") {
                  return <ImageNode key={index} source={node.payload} />;
                } else if (node.type === "lottie") {
                  return (
                    <LottieNode
                      key={index}
                      source={node.payload}
                      autoPlay
                      loop
                    />
                  );
                }
              })}
            </Container>
          </ScrollView>
        </CenterContainer>
      </GlobalScreen>
      <PressableStyled
        onPress={() =>
          navigation.navigate("NotesStack", {
            screen: "Notes",
            params: { screen: "Note", task },
          })
        }
      >
        <ViewPlus>
          <AddIcon />
        </ViewPlus>
      </PressableStyled>
    </>
  );
}

const PressableStyled = styled.Pressable`
  position: absolute;
  right: 40px;
  bottom: 100px;
`;

const ViewPlus = styled.View`
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: #313131;
`;

const TextTitle = styled.Text`
  font-family: "Poppins-Medium";
  font-size: 18px;
  color: ${({ theme }) => theme.color.standard};
`;

const Container = styled.View`
  gap: 20px;
  margin-bottom: 270px;
`;

const LottieNode = styled(AnimatedLottieView)`
  height: 250px;
  width: 100%;
  border-radius: 25px;
`;

const TextNode = styled.Text`
  text-align: justify;
  font-family: "Poppins-Regular";
  font-size: 18px;
  line-height: 24px;
  color: ${({ theme }) => theme.color.standard};
`;

const ImageNode = styled.Image`
  object-fit: cover;
  height: 250px;
  width: 100%;
  border-radius: 25px;
`;
