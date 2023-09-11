import styled from "styled-components/native";
import { CheckBox } from "./ui/CheckBox";
import { Pressable, ScrollView } from "react-native";
import { COLORS, EMOTIONS } from "../const";
import { useState } from "react";

type EmotionsPopupProps = {
  backgroundColor: string;
  color: string;
  emotionsBefore: string[];
  setEmotionsBefore: React.Dispatch<React.SetStateAction<string[]>>;
  emotionsAfter: string[];
  setEmotionsAfter: React.Dispatch<React.SetStateAction<string[]>>;
  typeEmotions: string;
};

export function EmotionsPopup({
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
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <EmotionsContainer>
          {EMOTIONS.map((emotion) => (
            <Pressable
              key={emotion.id}
              onPress={() => toggleActiveEmotion(emotion.text)}
            >
              <CheckBox
                color={color}
                backgroundColor={backgroundColor}
                text={emotion.text}
                isActive={
                  typeEmotions === "before"
                    ? emotionsBefore.includes(emotion.text)
                    : emotionsAfter.includes(emotion.text)
                }
              />
            </Pressable>
          ))}
        </EmotionsContainer>
      </ScrollView>
    </Container>
  );
}

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
