import { Pressable } from "react-native";
import { GlobalScreen } from "../../components/GlobalScreen";
import { CenterContainer } from "../../components/CenterContainer";
import { BackIcon } from "../../components/icons/BackIcon";
import { styled } from "styled-components/native";
import { TextIcon } from "../../components/icons/TextIcon";
import { PlayerImages } from "../../components/icons/PlayerImage";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MeditationData } from "../../types";
import { LikeIcon } from "../../components/icons/LikeIcon";
import { AudioPlayer } from "../../components/ui/AudioPlayer";

export function Audio() {
  const navigation = useNavigation();
  const route = useRoute();
  const { meditation } = route.params as { meditation: MeditationData };

  return (
    <GlobalScreen>
      <CenterContainer>
        <TopView>
          <Pressable onPress={() => navigation.goBack()}>
            <BackIcon />
          </Pressable>
          <TextIcon />
        </TopView>
        <PlayerImages />
        <TitleAndLikeView>
          <TextAudio>{meditation.title}</TextAudio>
          <LikeIcon isActive />
        </TitleAndLikeView>
        <AudioPlayer id={meditation.id} duration={meditation.duration} />
      </CenterContainer>
    </GlobalScreen>
  );
}

const TopView = styled.View`
  margin-bottom: 40px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const TextAudio = styled.Text`
  font-family: "Poppins-Medium";
  font-size: 18px;
  color: ${({ theme }) => theme.color.standard};
`;

const TitleAndLikeView = styled.View`
  margin-bottom: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
