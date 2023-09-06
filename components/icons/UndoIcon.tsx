import Svg, { Path } from "react-native-svg";
import { useAppSelector } from "../../hooks/useAppSelector";
import { styled } from "styled-components/native";

type UndoIconProps = {
  disabled: boolean;
};

export function UndoIcon({ disabled }: UndoIconProps) {
  const theme = useAppSelector((state) => state.theme.value);

  return (
    <ViewStyled>
      <Svg viewBox="0 0 24 24" fill="none">
        <Path
          d="M9.707 13.293a1 1 0 01-1.414 1.414l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L6.414 8H16a5 5 0 015 5v7a1 1 0 11-2 0v-7a3 3 0 00-3-3H6.414l3.293 3.293z"
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
