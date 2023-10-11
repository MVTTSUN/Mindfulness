import Svg, { Path } from "react-native-svg";
import { IconNavigationContainer } from "./IconNavigationContainer";

type InfoAndSettingsIconProps = {
  color: string;
};

export function InfoAndSettingsIcon({ color }: InfoAndSettingsIconProps) {
  return (
    <IconNavigationContainer color={color}>
      <Svg viewBox="0 0 24 24" fill="none">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10zm-10 5.75a.75.75 0 00.75-.75v-6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75zM12 7a1 1 0 110 2 1 1 0 010-2z"
          fill={color}
        />
      </Svg>
    </IconNavigationContainer>
  );
}
