import styled from "styled-components/native";
import { ProcessEmotions } from "../../types";
import { COLORS } from "../../const";
import { Dimensions } from "react-native";
import Animated, { SlideInLeft, Transition } from "react-native-reanimated";
import { BarLine } from "./BarLine";

type HorizontalChartBarProps = {
  emotions: ProcessEmotions[];
  maxCountBar: number;
};

export function HorizontalChartBar({
  emotions,
  maxCountBar,
}: HorizontalChartBarProps) {
  const oneColumnCount = maxCountBar / 5;
  const columnCounts = Array.from({ length: 5 }).reduce<number[]>(
    (acc, _, index) => (acc.push(oneColumnCount * (index + 1)), acc),
    [0]
  );

  return (
    <ChartContainer>
      <ChartHeaderAndFooterContainer>
        {columnCounts.map((columnCount, index) => {
          return (
            <TitleHeaderAndFooter key={index}>
              {columnCount}
            </TitleHeaderAndFooter>
          );
        })}
      </ChartHeaderAndFooterContainer>
      <ChartMainContainer>
        <HorizontalLineContainer>
          {emotions.map((emotion, index) => {
            return (
              <HorizontalLine key={index}>
                <TitleLeft>{emotion.title}</TitleLeft>
                {/* <Animated.View entering={SlideInLeft.duration(1500)}> */}
                <BarLine width={(100 / maxCountBar) * emotion.counts.all}>
                  <MeditationBarLine
                    $width={
                      (100 / emotion.counts.all) * emotion.counts.meditation
                    }
                  >
                    {((Dimensions.get("window").width - 73) / maxCountBar) *
                      emotion.counts.meditation >
                      21 && (
                      <BarLineTitle $isDarkBackground>
                        {emotion.counts.meditation}
                      </BarLineTitle>
                    )}
                  </MeditationBarLine>
                  <TaskBarLine
                    $width={(100 / emotion.counts.all) * emotion.counts.task}
                  >
                    {((Dimensions.get("window").width - 73) / maxCountBar) *
                      emotion.counts.task >
                      21 && <BarLineTitle>{emotion.counts.task}</BarLineTitle>}
                  </TaskBarLine>
                  <UnknownBarLine
                    $width={(100 / emotion.counts.all) * emotion.counts.unknown}
                  >
                    {((Dimensions.get("window").width - 73) / maxCountBar) *
                      emotion.counts.unknown >
                      21 && (
                      <BarLineTitle>{emotion.counts.unknown}</BarLineTitle>
                    )}
                  </UnknownBarLine>
                </BarLine>
                {/* </Animated.View> */}
              </HorizontalLine>
            );
          })}
        </HorizontalLineContainer>
        <VerticalLineContainer>
          <ThinVerticalLineContainer>
            <VerticalLine />
          </ThinVerticalLineContainer>
          {Array.from({ length: 4 }).map((_, index) => {
            return (
              <ThinVerticalLineContainer key={index}>
                <VerticalLine />
              </ThinVerticalLineContainer>
            );
          })}
          <ThinVerticalLineContainer>
            <VerticalLine />
          </ThinVerticalLineContainer>
        </VerticalLineContainer>
      </ChartMainContainer>
      <ChartHeaderAndFooterContainer>
        {columnCounts.map((columnCount, index) => {
          return (
            <TitleHeaderAndFooter key={index}>
              {columnCount}
            </TitleHeaderAndFooter>
          );
        })}
      </ChartHeaderAndFooterContainer>
    </ChartContainer>
  );
}

const ChartContainer = styled.View`
  align-items: center;
  width: 100%;
  height: 1300px;
  margin-bottom: 10px;
`;

const ChartMainContainer = styled.View`
  flex-direction: row;
  height: 97%;
  width: 91%;
`;

const ChartHeaderAndFooterContainer = styled.View`
  margin-top: 5px;
  flex-direction: row;
  justify-content: space-between;
  height: 1.5%;
  width: 100%;
`;

const VerticalLineContainer = styled.View`
  z-index: 1;
  justify-content: space-between;
  flex-direction: row;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;

const ThinVerticalLineContainer = styled.View`
  opacity: 0.3;
  width: 1px;
  overflow: hidden;
`;

const VerticalLine = styled.View`
  height: 100%;
  border: 4px dashed ${({ theme }) => theme.color.standard};
`;

const TitleLeft = styled.Text`
  font-family: "Poppins-Regular";
  font-size: 12px;
  line-height: 16px;
  color: ${({ theme }) => theme.color.standard};
`;

const TitleHeaderAndFooter = styled.Text`
  width: 35px;
  font-family: "Poppins-Regular";
  font-size: 12px;
  text-align: center;
  line-height: 16px;
  color: ${({ theme }) => theme.color.standard};
`;

const HorizontalLineContainer = styled.View`
  z-index: 5;
  height: 100%;
  width: 100%;
  justify-content: space-around;
`;

const HorizontalLine = styled.View`
  overflow: hidden;
  gap: 3px;
`;

const MeditationBarLine = styled.View<{ $width: number }>`
  justify-content: center;
  align-items: center;
  height: 100%;
  width: ${({ $width }) => $width}%;
  background-color: ${COLORS.backgroundColors.meditationCard};
`;

const TaskBarLine = styled.View<{ $width: number }>`
  justify-content: center;
  align-items: center;
  height: 100%;
  width: ${({ $width }) => $width}%;
  background-color: ${COLORS.backgroundColors.taskCard};
`;

const UnknownBarLine = styled.View<{ $width: number }>`
  justify-content: center;
  align-items: center;
  height: 100%;
  width: ${({ $width }) => $width}%;
  background-color: ${COLORS.mainColors.normal};
`;

const BarLineTitle = styled.Text<{ $isDarkBackground?: boolean }>`
  text-align: center;
  font-family: "Poppins-Regular";
  font-size: 10px;
  line-height: 14px;
  color: ${({ $isDarkBackground }) =>
    $isDarkBackground
      ? COLORS.textColors.meditationCard
      : COLORS.textColors.normal};
`;
