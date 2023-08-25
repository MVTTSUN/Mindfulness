import styled from "styled-components/native";
import { CenterContainer } from "../../components/CenterContainer";
import { GlobalScreen } from "../../components/GlobalScreen";
import { TopWithBack } from "../../components/ui/TopWithBack";
import { ScrollView } from "react-native";

export function Tips() {
  return (
    <GlobalScreen withoutScrollView>
      <CenterContainer>
        <TopWithBack>
          <TextTitle>Как медитировать правильно?</TextTitle>
        </TopWithBack>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ViewText>
            <ParagraphTips>
              Правильный выбор техники зависит от личных предпочтений.
              Медитируют как с открытыми глазами, так и с закрытыми. Заниматься
              можно сидя, стоя, лёжа и даже при ходьбе. В классическом варианте
              сидячей медитации многие ошибочно полагают, что поза лотоса — это
              обязательное и неизменное условие. На самом деле, она не для всех
              является удобной.
            </ParagraphTips>
            <ParagraphTips>
              Самое важное правило — сохранять позвоночный столб прямым, грудную
              клетку — свободной, чтобы дыханию ничего не мешало, а тело —
              максимально расслабленным. Новички могут сесть на стул,
              облокотиться на спинку и закрыть глаза. А дальше просто дышать,
              расслаблять мышцы одну за другой и отпускать мысли. Необходимо
              сохранять привычный для вас темп дыхания: не нужно стараться
              делать вдохи дольше или глубже, если вы чувствуете от этого
              неудобство и напряжение. Ведь медитация подразумевает любовь и
              трепетное отношение к себе и телу, а не насилие.
            </ParagraphTips>
            <ParagraphTips>
              Фраза «отпустить мысли» звучит довольно просто, но это очень
              сложное умение, которое приобретается с опытом. Главное —
              запомнить, что в первые разы в голову постоянно будут приходить
              разные фантазии и воспоминания, отвлекая от процесса расслабления.
              Это абсолютно нормально. Просто каждый раз мягко переключайте
              внимание на дыхание, не ругайте себя за неумение сосредоточиться и
              не думайте, что у вас что-то получается плохо. Так и должно быть:
              мозг не может быть пустым, он заточен под постоянное размышление.
              Со временем вы сможете находиться в состоянии покоя вне
              зависимости от приходящих и уходящих мыслей.
            </ParagraphTips>
          </ViewText>
          <TopAndBottomSpace />
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

const ParagraphTips = styled.Text`
  font-family: "Poppins-Regular";
  font-size: 18px;
  color: ${({ theme }) => theme.color.standard};
`;

const ViewText = styled.View`
  gap: 20px;
`;

const TopAndBottomSpace = styled.View`
  height: 250px;
`;
