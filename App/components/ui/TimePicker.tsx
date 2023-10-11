import styled from "styled-components/native";
import { DataTime } from "../../types";
import { View, ViewToken, Text } from "react-native";
import { memo, useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { TouchableHighlight } from "./Touchables/TouchableHighlight";

type TimePickerProps = {
  count: number;
  setTimeHandle: React.Dispatch<React.SetStateAction<number>>;
  time: number;
};

export const TimePicker = memo(
  ({ count, setTimeHandle, time }: TimePickerProps) => {
    const [currentId, setCurrentId] = useState(time + 1);

    const getItemLayout = (
      data: ArrayLike<unknown> | null | undefined,
      index: number
    ) => ({
      length: 72,
      offset: 72 * index,
      index,
    });

    const onViewableItemsChanged = ({
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
          viewAreaCoveragePercentThreshold: 72,
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
        snapToInterval={72}
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
  }
);

const FlatListStyled = styled.FlatList`
  max-width: 90px;
  max-height: 216px;
`;

const TimeContainer = styled.View<{ $isCurrent: boolean }>`
  opacity: ${({ $isCurrent }) => ($isCurrent ? 1 : 0.5)};
  align-items: center;
  justify-content: center;
  height: 72px;
`;

const TextTime = styled.Text`
  text-align: center;
  font-family: "Poppins-Regular";
  font-size: 46px;
  line-height: 77px;
  color: ${({ theme }) => theme.color.standard};
`;
