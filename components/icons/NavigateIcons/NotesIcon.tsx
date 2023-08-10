import Svg, { Path } from "react-native-svg";
import { IconNavigationContainer } from "./IconNavigationContainer";

type NotesIconProps = {
  color: string;
};

export function NotesIcon({ color }: NotesIconProps) {
  return (
    <IconNavigationContainer color={color}>
      <Svg viewBox="0 0 24 24" fill="none">
        <Path
          d="M2.755 14.716l.517 1.932c.604 2.255.907 3.383 1.592 4.114a4 4 0 002.01 1.16c.976.228 2.104-.074 4.36-.678 2.254-.604 3.382-.906 4.113-1.591.06-.057.12-.116.176-.176a9.115 9.115 0 01-1.014-.15c-.696-.138-1.523-.36-2.501-.622l-.107-.029-.025-.006c-1.064-.286-1.953-.524-2.663-.78-.747-.27-1.425-.603-2.002-1.143a5.5 5.5 0 01-1.596-2.765c-.18-.769-.128-1.523.012-2.304.134-.749.374-1.647.662-2.722l.535-1.994.018-.07c-1.92.517-2.931.823-3.605 1.454a4 4 0 00-1.161 2.012c-.228.975.074 2.103.679 4.358z"
          fill={color}
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.83 10.715l-.518 1.932c-.605 2.255-.907 3.383-1.592 4.114a4 4 0 01-2.01 1.161c-.097.023-.195.04-.295.052-.915.113-2.032-.186-4.064-.73-2.255-.605-3.383-.907-4.114-1.592a4 4 0 01-1.161-2.011c-.228-.976.074-2.103.679-4.358l.517-1.932.244-.905c.455-1.666.761-2.583 1.348-3.21a4 4 0 012.01-1.16c.976-.228 2.104.074 4.36.679 2.254.604 3.382.906 4.113 1.59a4 4 0 011.161 2.012c.228.976-.075 2.103-.679 4.358zm-9.778-.91a.75.75 0 01.919-.53l4.83 1.295a.75.75 0 11-.389 1.448l-4.83-1.294a.75.75 0 01-.53-.918zm-.776 2.898a.75.75 0 01.918-.53l2.898.777a.75.75 0 11-.388 1.448l-2.898-.776a.75.75 0 01-.53-.919z"
          fill={color}
        />
      </Svg>
    </IconNavigationContainer>
  );
}
