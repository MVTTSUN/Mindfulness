import Svg, { Path } from "react-native-svg";
import { useAppSelector } from "../../hooks/useAppSelector";
import { styled } from "styled-components/native";

type RedoIconProps = {
  disabled: boolean;
};

export function RedoIcon({ disabled }: RedoIconProps) {
  const theme = useAppSelector((state) => state.theme.value);

  return (
    <ViewStyled>
      <Svg viewBox="0 0 24 24" fill="none">
        <Path
          d="M14.293 13.293a1 1 0 001.414 1.414l5-5a1 1 0 000-1.414l-5-5a1 1 0 10-1.414 1.414L17.586 8H8a5 5 0 00-5 5v7a1 1 0 102 0v-7a3 3 0 013-3h9.586l-3.293 3.293z"
          fill={theme === "light" ? "#313131" : "#edecf5"}
          opacity={disabled ? 0.3 : 1}
        />
      </Svg>
    </ViewStyled>
  );
}

const ViewStyled = styled.View`
  width: 34px;
  height: 34px;
`;
