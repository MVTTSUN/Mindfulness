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

export function Preloader() {
  const pulseScale = useSharedValue(1);
  const circleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  useEffect(() => {
    pulseScale.value = withRepeat(
      withSequence(
        withTiming(0.4, { duration: 500 }),
        withTiming(1, { duration: 500 }),
        withTiming(0.4, { duration: 500 }),
        withTiming(1, { duration: 500 })
      ),
      -1,
      true
    );
  }, []);

  return <Circle style={circleStyle} />;
}

const Circle = styled(Animated.View)`
  margin-top: 20px;
  align-self: center;
  background-color: ${Color.Primary};
  height: ${normalize(90)}px;
  width: ${normalize(90)}px;
  border-radius: ${normalize(50)}px;
`;
