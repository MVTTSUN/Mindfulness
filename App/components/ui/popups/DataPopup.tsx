import styled from "styled-components/native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { getFirstFutureThirtyDays, normalize } from "../../../utils";
import { COUNT_DAYS_CALENDAR, Color } from "../../../const";

type DataPopupProps = {
  setDayHandle: (day: Date) => void;
};

export function DataPopup(props: DataPopupProps) {
  const { setDayHandle } = props;

  return (
    <Animated.View
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(200)}
    >
      <ViewPopup>
        <TextTitle>Дата</TextTitle>
        <Month>
          {getFirstFutureThirtyDays()[0].toLocaleString("ru", {
            month: "long",
          })}
        </Month>
        <ViewDays>
          {getFirstFutureThirtyDays().map((day, index) => (
            <PressableDay
              $isToday={day.getDate() === new Date().getDate()}
              key={index}
              onPress={() => setDayHandle(day)}
            >
              <Day>{day.getDate()}</Day>
            </PressableDay>
          ))}
        </ViewDays>
        <Month>
          {getFirstFutureThirtyDays()[COUNT_DAYS_CALENDAR - 1].toLocaleString(
            "ru",
            {
              month: "long",
            }
          )}
        </Month>
      </ViewPopup>
    </Animated.View>
  );
}

const ViewPopup = styled.View`
  width: ${normalize(215)}px;
  padding: ${normalize(25)}px;
  border-radius: ${normalize(15)}px;
  background-color: ${({ theme }) => theme.backgroundColor.main};
`;

const TextTitle = styled.Text`
  margin-bottom: 10px;
  font-family: "Poppins-Medium";
  font-size: ${normalize(18)}px;
  color: ${({ theme }) => theme.color.standard};
`;

const ViewDays = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${normalize(10)}px;
`;

const PressableDay = styled.Pressable<{ $isToday: boolean }>`
  align-items: center;
  justify-content: center;
  width: ${normalize(25)}px;
  height: ${normalize(25)}px;
  background-color: ${Color.PrimaryPastel};
  border-radius: ${normalize(20)}px;
  border: ${({ $isToday, theme }) =>
    $isToday ? `2px dashed ${theme.color.standard}` : "none"};
`;

const Day = styled.Text`
  font-family: "Poppins-Regular";
  font-size: ${normalize(12)}px;
  line-height: ${normalize(16)}px;
`;

const Month = styled.Text`
  text-align: center;
  padding: 10px 0;
  font-family: "Poppins-Regular";
  font-size: ${normalize(12)}px;
  line-height: ${normalize(16)}px;
  color: ${({ theme }) => theme.color.standard};
`;
