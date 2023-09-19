import styled from "styled-components/native";
import { CenterContainer } from "../../components/CenterContainer";
import { GlobalScreen } from "../../components/GlobalScreen";
import { TopWithBack } from "../../components/ui/TopWithBack";
import { NotesFilter } from "../../components/ui/NotesFilter";
import { useState } from "react";
import { Rect, Svg } from "react-native-svg";
import { ScrollView } from "react-native";
import { EMOTIONS } from "../../const";

export function Statistics() {
  const [isOpenTypesPopup, setIsOpenTypesPopup] = useState(false);
  const [isOpenMonthsPopup, setIsOpenMonthsPopup] = useState(false);
  const [isOpenYearsPopup, setIsOpenYearsPopup] = useState(false);

  return (
    <GlobalScreen withoutScrollView>
      <CenterContainer>
        <TopWithBack>
          <TextTitle>Статистика</TextTitle>
        </TopWithBack>
        <ScrollView showsVerticalScrollIndicator={false}>
          <NotesFilter
            setIsOpenTypesPopup={setIsOpenTypesPopup}
            setIsOpenMonthsPopup={setIsOpenMonthsPopup}
            setIsOpenYearsPopup={setIsOpenYearsPopup}
            isHideButtonStatistics
          />
          <ChartContainer>
            <ChartHeaderAndFooterContainer>
              {Array.from({ length: 6 }).map((_, index) => {
                return (
                  <TitleHeaderAndFooter key={index}>
                    {index !== 0 ? index + "0" : index}
                  </TitleHeaderAndFooter>
                );
              })}
            </ChartHeaderAndFooterContainer>
            <ChartMainContainer>
              <TitleLeftContainer>
                {EMOTIONS.map((title, index) => {
                  return <TitleLeft key={index}>{title}</TitleLeft>;
                })}
              </TitleLeftContainer>
              <BarContainer>
                <HorizontalLineContainer>
                  {Array.from({ length: 35 }).map((_, index) => {
                    return <HorizontalLine $width={100 / index} key={index} />;
                  })}
                </HorizontalLineContainer>
                <VerticalLineContainer>
                  <VerticalLine>
                    <Svg>
                      <Rect
                        width="2px"
                        height="100%"
                        stroke="#313131"
                        strokeWidth={4}
                        strokeDasharray="4 10"
                        strokeOpacity={1}
                      />
                    </Svg>
                  </VerticalLine>
                  {Array.from({ length: 4 }).map((_, index) => {
                    return (
                      <VerticalLine key={index}>
                        <Svg>
                          <Rect
                            width="2px"
                            height="100%"
                            stroke="#313131"
                            strokeWidth={4}
                            strokeDasharray="4 10"
                            strokeOpacity={1}
                          />
                        </Svg>
                      </VerticalLine>
                    );
                  })}
                  <VerticalLine>
                    <Svg>
                      <Rect
                        width="2px"
                        height="100%"
                        stroke="#313131"
                        strokeWidth={4}
                        strokeDasharray="4 10"
                        strokeOpacity={1}
                      />
                    </Svg>
                  </VerticalLine>
                </VerticalLineContainer>
              </BarContainer>
            </ChartMainContainer>
            <ChartHeaderAndFooterContainer>
              {Array.from({ length: 6 }).map((_, index) => {
                return (
                  <TitleHeaderAndFooter key={index}>
                    {index !== 0 ? index + "0" : index}
                  </TitleHeaderAndFooter>
                );
              })}
            </ChartHeaderAndFooterContainer>
          </ChartContainer>
          <BottomSpace />
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

const ChartContainer = styled.View`
  width: 100%;
  height: 700px;
`;

const ChartMainContainer = styled.View`
  flex-direction: row;
  height: 92%;
`;

const ChartHeaderAndFooterContainer = styled.View`
  margin-top: 15px;
  flex-direction: row;
  justify-content: space-between;
  height: 4%;
  width: 78%;
  align-self: flex-end;
`;

const BarContainer = styled.View`
  width: 68.75%;
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

const VerticalLine = styled.View`
  opacity: 0.3;
  height: 100%;
  width: 1.2px;
`;

const TitleLeftContainer = styled.View`
  align-items: flex-end;
  width: 94px;
  justify-content: space-around;
  margin-right: 5px;
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
  justify-content: space-around;
`;

const HorizontalLine = styled.View<{ $width: number }>`
  height: 10px;
  width: ${({ $width }) => $width}%;
  border-radius: 4px;
  background-color: #aef0f6;
`;

const BottomSpace = styled.View`
  height: 250px;
`;
