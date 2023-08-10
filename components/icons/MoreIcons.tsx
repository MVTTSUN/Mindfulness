import { styled } from "styled-components/native";
import Svg, { Path } from "react-native-svg";
import { useAppSelector } from "../../hooks/useAppSelector";

export function MoreIcons() {
  const theme = useAppSelector((state) => state.theme.value);

  return (
    <ViewStyled>
      <Svg viewBox="0 0 24 24" fill={theme === "light" ? "#313131" : "#edecf5"}>
        <Path d="M9.71 18.293a1 1 0 001.415 0l4.887-4.892a2 2 0 000-2.828l-4.89-4.89a1 1 0 00-1.415 1.414l4.186 4.185a1 1 0 010 1.415L9.71 16.879a1 1 0 000 1.414z" />
      </Svg>
    </ViewStyled>
  );
}

const ViewStyled = styled.View`
  width: 15px;
  height: 15px;
`;
