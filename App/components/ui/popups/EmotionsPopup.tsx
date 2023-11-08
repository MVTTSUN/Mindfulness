import styled from "styled-components/native";
import { CheckBox } from "../inputs/CheckBox";
import { Pressable, ScrollView } from "react-native";
import { memo, useEffect } from "react";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useAppSelector } from "../../../hooks/useAppSelector";
import {
  getDataEmotionsCopy,
  getEmotions,
} from "../../../store/emotionsSelectors";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useLazyGetEmotionsQuery } from "../../../api/api";
import deepEqual from "deep-equal";
import { setDataEmotionsCopy, setEmotions } from "../../../store/emotionsSlice";
import { normalize } from "../../../utils";
import { getIsOffline } from "../../../store/offlineSelectors";

type EmotionsPopupProps = {
  backgroundColor: string;
  color: string;
  emotionsBefore: string[];
  setEmotionsBefore: React.Dispatch<React.SetStateAction<string[]>>;
  emotionsAfter: string[];
  setEmotionsAfter: React.Dispatch<React.SetStateAction<string[]>>;
  typeEmotions: string;
};

function EmotionsPopup(props: EmotionsPopupProps) {
  const {
    backgroundColor,
    color,
    emotionsBefore,
    setEmotionsBefore,
    emotionsAfter,
    setEmotionsAfter,
    typeEmotions,
  } = props;
  const emotions = useAppSelector(getEmotions);
  const emotionsDataCopy = useAppSelector(getDataEmotionsCopy);
  const isOffline = useAppSelector(getIsOffline);
  const dispatch = useAppDispatch();
  const [getEmotionsQuery] = useLazyGetEmotionsQuery();

  const toggleActiveEmotion = (text: string) => {
    if (typeEmotions === "before") {
      if (emotionsBefore.includes(text)) {
        setEmotionsBefore(emotionsBefore.filter((emotion) => emotion !== text));
      } else {
        setEmotionsBefore((prev) => [...prev, text]);
      }
    } else {
      if (emotionsAfter.includes(text)) {
        setEmotionsAfter(emotionsAfter.filter((emotion) => emotion !== text));
      } else {
        setEmotionsAfter((prev) => [...prev, text]);
      }
    }
  };

  const loadingData = async () => {
    const { data } = await getEmotionsQuery();

    if (data) {
      if (!deepEqual(emotionsDataCopy, data)) {
        dispatch(setEmotions(data));
        dispatch(setDataEmotionsCopy(data));
      }
    }
  };

  useEffect(() => {
    if (!isOffline) {
      loadingData();
    }
  }, []);

  return (
    <Animated.View
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(200)}
    >
      <Container>
        <TextTitle>Эмоции</TextTitle>
        <ScrollView showsVerticalScrollIndicator={false}>
          <EmotionsContainer>
            {emotions.map((emotion) => (
              <Pressable
                key={emotion._id}
                onPress={() => toggleActiveEmotion(emotion.value)}
              >
                <CheckBox
                  color={color}
                  backgroundColor={backgroundColor}
                  text={emotion.value}
                  isActive={
                    typeEmotions === "before"
                      ? emotionsBefore.includes(emotion.value)
                      : emotionsAfter.includes(emotion.value)
                  }
                />
              </Pressable>
            ))}
          </EmotionsContainer>
        </ScrollView>
      </Container>
    </Animated.View>
  );
}

export default memo(EmotionsPopup);

const Container = styled.View`
  gap: 20px;
  padding: ${normalize(20)}px;
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.backgroundColor.main};
  border-radius: ${normalize(20)}px;
`;

const EmotionsContainer = styled.View`
  gap: 10px;
`;

const TextTitle = styled.Text`
  margin-bottom: 10px;
  font-family: "Poppins-Medium";
  font-size: ${normalize(18)}px;
  color: ${({ theme }) => theme.color.standard};
`;
