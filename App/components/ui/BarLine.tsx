import { PropsWithChildren, memo, useEffect, useRef } from "react";
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import styled from "styled-components/native";

type BarLineProps = PropsWithChildren<{
  width: number;
}>;

export function BarLine({ children, width }: BarLineProps) {
  const widthAnimation = useSharedValue(0);
  const barLineAnimationStyle = useAnimatedStyle(() => ({
    width: `${widthAnimation.value}%`,
  }));
  let time: NodeJS.Timeout;
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      time = setTimeout(() => {
        widthAnimation.value = withTiming(width, { duration: 1000 });
      }, 500);
      isFirstRender.current = false;
    } else {
      widthAnimation.value = withTiming(width);
    }
  }, [width]);

  useEffect(() => {
    return () => {
      clearTimeout(time);
    };
  }, []);

  return (
    <BarLineStyled style={barLineAnimationStyle}>{children}</BarLineStyled>
  );
}

const BarLineStyled = styled(Animated.View)`
  overflow: hidden;
  flex-direction: row;
  align-items: center;
  height: 15px;
  border-radius: 6px;
`;
