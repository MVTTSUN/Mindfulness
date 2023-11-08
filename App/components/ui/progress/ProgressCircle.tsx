import { Circle, Path, Svg } from "react-native-svg";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { getValueTheme } from "../../../store/themeSelectors";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";
import { normalize } from "../../../utils";
import styled from "styled-components/native";
import { Color, Theme } from "../../../const";

const size = normalize(24);
const strokeWidth = normalize(2);
const radius = (size - strokeWidth) / 2;
const circumference = radius * 2 * Math.PI;

type ProgressCircleProps = {
  progressDownload?: number;
  isDownload?: boolean;
  color?: string;
  isActive?: boolean;
};

export function ProgressCircle(props: ProgressCircleProps) {
  const { progressDownload, isDownload, color, isActive } = props;
  const theme = useAppSelector(getValueTheme);
  const progress = useSharedValue(0);
  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - progress.value),
  }));
  const themeColor =
    theme === Theme.Light ? Color.TextStandard : Color.TextWhite;
  const isActiveColor = isActive ? Color.Meditation : color;

  useEffect(() => {
    if (progressDownload) {
      progress.value = withTiming(progressDownload, {
        duration: 1,
      });
    }
  }, [progressDownload]);

  useEffect(() => {
    if (isDownload) {
      progress.value = 1;
    } else {
      progress.value = 0;
    }
  }, [isDownload]);

  return (
    <Container>
      <CircleContainer>
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <Circle
            stroke={color ? color : themeColor}
            strokeWidth={strokeWidth}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill={isActive ? Color.TextWhite : "none"}
          />
          {!color && (
            <AnimatedCircle
              fill={isDownload ? Color.Primary : "none"}
              stroke={Color.Primary}
              strokeWidth={strokeWidth}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeDasharray={circumference}
              animatedProps={animatedProps}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
          )}
        </Svg>
      </CircleContainer>
      <DownloadContainer>
        <Svg width={size * 0.7} height={size * 0.7} viewBox={`0 0 24 24`}>
          <Path
            d="M7.33199 16.3154C6.94146 15.9248 6.3083 15.9248 5.91777 16.3154C5.52725 16.7059 5.52725 17.339 5.91777 17.7296L10.5834 22.3952C11.3644 23.1762 12.6308 23.1762 13.4118 22.3952L18.0802 17.7267C18.4707 17.3362 18.4707 16.703 18.0802 16.3125C17.6897 15.922 17.0565 15.922 16.666 16.3125L13 19.9786V2.0001C13 1.44781 12.5523 1.0001 12 1.0001C11.4477 1.0001 11 1.44781 11 2.0001V19.9833L7.33199 16.3154Z"
            fill={
              color
                ? isActiveColor
                : isDownload
                ? Color.TextStandard
                : themeColor
            }
          />
        </Svg>
      </DownloadContainer>
    </Container>
  );
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const Container = styled.View`
  position: relative;
  height: ${size};
  width: ${size};
`;

const CircleContainer = styled.View`
  position: absolute;
`;

const DownloadContainer = styled.View`
  top: ${normalize(4)}px;
  left: ${normalize(4)}px;
`;
