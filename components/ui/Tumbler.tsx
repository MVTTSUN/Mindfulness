import { useState } from "react";
import { Animated, Easing, Pressable } from "react-native";
import { styled } from "styled-components/native";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { toggleNotification } from "../../store/notificationsSlice";

type TumblerProps = {
  id: number;
  enable: boolean;
};

export function Tumbler({ id, enable }: TumblerProps) {
  const dispatch = useAppDispatch();
  const tumblerValue = useState(new Animated.Value(enable ? 1 : 0))[0];
  const tumblerMove = tumblerValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 25],
  });
  const tumblerChangeColor = tumblerValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#d1d1d1", "#b5f2ea"],
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
      dispatch(toggleNotification(id));
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
  padding: 6px;
  width: 55px;
  height: 30px;
  border-radius: 15px;
`;

const Round = styled(Animated.View)`
  width: 18px;
  height: 18px;
  border-radius: 9px;
  background-color: ${({ theme }) => theme.color.selectActive};
`;
