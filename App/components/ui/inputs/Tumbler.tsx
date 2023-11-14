import { useState } from "react";
import { Animated, Easing, Pressable } from "react-native";
import { styled } from "styled-components/native";
import { normalize } from "../../../utils";
import { Color } from "../../../const";

type TumblerProps = {
  enable: boolean;
  onChange: () => void;
  isSmall?: boolean;
};

export function Tumbler(props: TumblerProps) {
  const { enable, onChange, isSmall } = props;
  const tumblerValue = useState(new Animated.Value(enable ? 1 : 0))[0];
  const tumblerMove = tumblerValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, isSmall ? normalize(14) : normalize(25)],
  });
  const tumblerChangeColor = tumblerValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#d1d1d1", Color.Primary],
  });
  const tumblerSizeRadio = tumblerValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.3, 1],
  });

  const move = () => {
    Animated.timing(tumblerValue, {
      toValue: enable ? 0 : 1,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start(() => {
      onChange();
    });
  };

  return (
    <Pressable onPress={move}>
      <Container
        $isSmall={isSmall}
        style={{ backgroundColor: tumblerChangeColor }}
      >
        <Round
          $isSmall={isSmall}
          style={{
            transform: [
              { translateX: tumblerMove },
              { scale: tumblerSizeRadio },
            ],
          }}
        />
      </Container>
    </Pressable>
  );
}

const Container = styled(Animated.View)<{ $isSmall?: boolean }>`
  padding: ${({ $isSmall }) => ($isSmall ? normalize(4) : normalize(6))}px;
  width: ${({ $isSmall }) => ($isSmall ? normalize(32) : normalize(55))}px;
  height: ${({ $isSmall }) => ($isSmall ? normalize(18) : normalize(30))}px;
  border-radius: ${normalize(15)}px;
`;

const Round = styled(Animated.View)<{ $isSmall?: boolean }>`
  width: ${({ $isSmall }) => ($isSmall ? normalize(10) : normalize(18))}px;
  height: ${({ $isSmall }) => ($isSmall ? normalize(10) : normalize(18))}px;
  border-radius: ${normalize(9)}px;
  background-color: ${({ theme }) => theme.color.selectActive};
`;
