import { styled } from "styled-components/native";
import { useAppSelector } from "../../hooks/useAppSelector";
import Svg, { Path } from "react-native-svg";

export function SearchIcon() {
  const theme = useAppSelector((state) => state.theme.value);

  return (
    <ViewStyled>
      <Svg viewBox="0 0 24 24" fill="none">
        <Path
          d="M14.954 14.946L21 21m-4-11a7 7 0 11-14 0 7 7 0 0114 0z"
          stroke={theme === "light" ? "#313131" : "#edecf5"}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </ViewStyled>
  );
}

const ViewStyled = styled.View`
  position: absolute;
  top: 15px;
  left: 15px;
  width: 14px;
  height: 14px;
`;
