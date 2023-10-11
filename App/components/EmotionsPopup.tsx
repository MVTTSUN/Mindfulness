import styled from "styled-components/native";
import { CheckBox } from "./ui/CheckBox";
import { Pressable, ScrollView } from "react-native";
import { COLORS, EMOTIONS } from "../const";
import { memo, useState } from "react";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

type EmotionsPopupProps = {
  backgroundColor: string;
  color: string;
  emotionsBefore: string[];
  setEmotionsBefore: React.Dispatch<React.SetStateAction<string[]>>;
  emotionsAfter: string[];
  setEmotionsAfter: React.Dispatch<React.SetStateAction<string[]>>;
  typeEmotions: string;
};

function EmotionsPopup({
  backgroundColor,
  color,
  emotionsBefore,
  setEmotionsBefore,
  emotionsAfter,
  setEmotionsAfter,
  typeEmotions,
}: EmotionsPopupProps) {
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

  return (
    <Animated.View
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(200)}
    >
      <Container>
        <ScrollView showsVerticalScrollIndicator={false}>
          <EmotionsContainer>
            {EMOTIONS.map((emotion, index) => (
              <Pressable
                key={index}
                onPress={() => toggleActiveEmotion(emotion)}
              >
                <CheckBox
                  color={color}
                  backgroundColor={backgroundColor}
                  text={emotion}
                  isActive={
                    typeEmotions === "before"
                      ? emotionsBefore.includes(emotion)
                      : emotionsAfter.includes(emotion)
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
  padding: 20px;
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.backgroundColor.main};
  border-radius: 20px;
`;

const EmotionsContainer = styled.View`
  gap: 10px;
`;
