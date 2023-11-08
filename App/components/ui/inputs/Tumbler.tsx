import { useState } from "react";
import { Animated, Easing, Pressable } from "react-native";
import { styled } from "styled-components/native";
import { normalize } from "../../../utils";
import { Color } from "../../../const";

type TumblerProps = {
  enable: boolean;
  onChange: () => void;
};

export function Tumbler({ enable, onChange }: TumblerProps) {
  const tumblerValue = useState(new Animated.Value(enable ? 1 : 0))[0];
  const tumblerMove = tumblerValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, normalize(25)],
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
      <Container style={{ backgroundColor: tumblerChangeColor }}>
        <Round
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

const Container = styled(Animated.View)`
  padding: ${normalize(6)}px;
  width: ${normalize(55)}px;
  height: ${normalize(30)}px;
  border-radius: ${normalize(15)}px;
`;

const Round = styled(Animated.View)`
  width: ${normalize(18)}px;
  height: ${normalize(18)}px;
  border-radius: ${normalize(9)}px;
  background-color: ${({ theme }) => theme.color.selectActive};
`;
