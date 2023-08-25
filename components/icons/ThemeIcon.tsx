import Svg, { G, Path } from "react-native-svg";
import { useAppSelector } from "../../hooks/useAppSelector";
import { styled } from "styled-components/native";

export function ThemeIcon() {
  const theme = useAppSelector((state) => state.theme.value);

  return (
    <ViewStyled>
      <Svg viewBox="0 0 48 48">
        <Path
          d="M28 33c9 0 18-3 18-15 0-9-9-16-19-16h-.5C13 2 2 11.8 2 24s8 22 21.5 22C29 46 31 39 26 36c-.9-.6-1-3 2-3zM14 21a3 3 0 113-3 2.9 2.9 0 01-3 3zm7-5a3 3 0 113-3 2.9 2.9 0 01-3 3zm15-2a3 3 0 11-3 3 2.9 2.9 0 013-3zm-7-5a3 3 0 11-3 3 2.9 2.9 0 013-3z"
          data-name="icons Q2"
          fill={theme === "light" ? "#313131" : "#edecf5"}
        />
      </Svg>
    </ViewStyled>
  );
}

const ViewStyled = styled.View`
  transform: translateY(-2px);
  width: 18px;
  height: 18px;
`;
