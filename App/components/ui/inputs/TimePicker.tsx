import styled from "styled-components/native";
import { DataTime } from "../../../types";
import { ViewToken } from "react-native";
import { memo, useRef, useState } from "react";
import { normalize } from "../../../utils";

type TimePickerProps = {
  count: number;
  setTimeHandle: React.Dispatch<React.SetStateAction<number>>;
  time: number;
};

export const TimePicker = memo((props: TimePickerProps) => {
  const { count, setTimeHandle, time } = props;
  const [currentId, setCurrentId] = useState(time + 1);

  const getItemLayout = (
    _: ArrayLike<unknown> | null | undefined,
    index: number
  ) => ({
    length: normalize(72),
    offset: normalize(72) * index,
    index,
  });

  const onViewableItemsChanged = async ({
    viewableItems,
  }: {
    viewableItems: Array<ViewToken>;
  }) => {
    if (viewableItems[1].index) {
      setCurrentId(viewableItems[1].index);
      setTimeHandle(viewableItems[1].index - 1);
    }
  };

  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: {
        waitForInteraction: true,
        viewAreaCoveragePercentThreshold: normalize(72),
      },
      onViewableItemsChanged,
    },
  ]).current;

  return (
    <FlatListStyled
      nestedScrollEnabled
      initialScrollIndex={time}
      getItemLayout={getItemLayout}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
      viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs}
      pagingEnabled
      snapToInterval={normalize(72)}
      decelerationRate="fast"
      data={Array(count + 2)
        .fill(null)
        .map((_, index) => {
          if (index === 0 || index === count + 1) {
            return { id: index, value: "" };
          } else return { id: index, value: index - 1 };
        })}
      renderItem={({ item }) => {
        const { id, value } = item as DataTime;

        return (
          <TimeContainer $isCurrent={Number(id) === currentId}>
            <TextTime>
              {value < 10 && String(value) !== ""
                ? "0" + String(value)
                : String(value)}
            </TextTime>
          </TimeContainer>
        );
      }}
      keyExtractor={(item) => {
        const { id } = item as DataTime;

        return id;
      }}
    />
  );
});

const FlatListStyled = styled.FlatList`
  max-width: ${normalize(90)}px;
  max-height: ${normalize(216)}px;
`;

const TimeContainer = styled.View<{ $isCurrent: boolean }>`
  opacity: ${({ $isCurrent }) => ($isCurrent ? 1 : 0.5)};
  align-items: center;
  justify-content: center;
  height: ${normalize(72)}px;
`;

const TextTime = styled.Text`
  text-align: center;
  font-family: "Poppins-Regular";
  font-size: ${normalize(46)}px;
  line-height: ${normalize(77)}px;
  color: ${({ theme }) => theme.color.standard};
`;
