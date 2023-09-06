import Svg, { Path } from "react-native-svg";
import { useAppSelector } from "../../hooks/useAppSelector";
import { styled } from "styled-components/native";

export function CheckIcon() {
  const theme = useAppSelector((state) => state.theme.value);

  return (
    <ViewStyled>
      <Svg viewBox="0 0 24 24" fill="none">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.61 5.207a1 1 0 01.183 1.403l-10 13a1 1 0 01-1.5.097l-5-5a1 1 0 011.414-1.414l4.195 4.195L19.207 5.39a1 1 0 011.403-.183z"
          fill={theme === "light" ? "#313131" : "#edecf5"}
        />
      </Svg>
    </ViewStyled>
  );
}

const ViewStyled = styled.View`
  width: 34px;
  height: 34px;
`;
