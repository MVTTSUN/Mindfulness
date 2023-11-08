import { PropsWithChildren, useEffect, useRef } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import styled from "styled-components/native";
import { normalize } from "../../../utils";

type BarLineProps = PropsWithChildren<{
  width: number;
}>;

export function BarLine(props: BarLineProps) {
  const { children, width } = props;
  const isFirstRender = useRef(true);
  const widthAnimation = useSharedValue(0);
  const barLineAnimationStyle = useAnimatedStyle(() => ({
    width: `${widthAnimation.value}%`,
  }));
  let time: NodeJS.Timeout;

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
  height: ${normalize(15)}px;
  border-radius: ${normalize(6)}px;
`;
