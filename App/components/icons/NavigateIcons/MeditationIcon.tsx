import Svg, { Path } from "react-native-svg";
import { IconNavigationContainer } from "./IconNavigationContainer";

type MeditationIconProps = {
  color: string;
};

export function MeditationIcon({ color }: MeditationIconProps) {
  return (
    <IconNavigationContainer color={color}>
      <Svg fill={color} viewBox="0 0 128 128">
        <Path d="M98.3 68.4h-.2L81.6 64l15.6-3.6 1.1-.1S115 56.8 112.6 44c-.3-1.9-1.1-3.9-2.3-6.1-10-18.1-25.3-1.1-25.3-1.1l-.5.6-11.6 11.5 5-16.5s6.9-21.1-13.4-21.5h-.4c-20.7-.4-13.5 21.3-13.5 21.3L55.1 49 43.6 36.7l-.3-.3s-8.4-9.3-17-6.6c-2.9.9-5.8 3.1-8.4 7.4C7.3 54.9 29.7 59.6 29.7 59.6h.2L46.4 64l-15.7 3.6-1.1.1S12.9 71.2 15.3 84c.3 1.8 1.1 3.9 2.3 6.1 10 18.1 25.3 1.1 25.3 1.1l.4-.6L55 78.9l-5 16.4s-6.9 21.1 13.4 21.5h.4c20.7.4 13.6-21.4 13.6-21.4L72.9 79l11.4 12.2.3.4s7.1 7.8 14.9 7.1c3.6-.3 7.3-2.4 10.5-7.9 10.7-17.7-11.7-22.4-11.7-22.4" />
      </Svg>
    </IconNavigationContainer>
  );
}
