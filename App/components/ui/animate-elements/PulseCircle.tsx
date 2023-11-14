import { useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import styled from "styled-components/native";
import { normalize } from "../../../utils";
import { Color } from "../../../const";

export function PulseCircle() {
  const pulseScale = useSharedValue(1);
  const circleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  useEffect(() => {
    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 400 }),
        withTiming(1.1, { duration: 400 }),
        withTiming(1, { duration: 400 }),
        withTiming(1.1, { duration: 400 })
      ),
      -1,
      true
    );
  }, []);

  return (
    <Container>
      <Circle style={circleStyle} />
    </Container>
  );
}

const Container = styled.View`
  position: absolute;
  align-items: center;
  justify-content: center;
  width: ${normalize(140)}px;
  height: ${normalize(140)}px;
`;

const Circle = styled(Animated.View)`
  position: absolute;
  background-color: ${Color.Primary};
  height: ${normalize(90)}px;
  width: ${normalize(90)}px;
  border-radius: ${normalize(50)}px;
`;
