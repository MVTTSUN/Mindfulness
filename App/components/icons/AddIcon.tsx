import Svg, { Path } from "react-native-svg";
import { styled } from "styled-components/native";
import { COLORS, MAIN_COLOR } from "../../const";
import { useAppSelector } from "../../hooks/useAppSelector";

export function AddIcon() {
  return (
    <ViewStyled>
      <Svg width="30px" height="30px" viewBox="0 0 24 24" fill="none">
        <Path
          d="M13 3a1 1 0 10-2 0v8H3a1 1 0 100 2h8v8a1 1 0 102 0v-8h8a1 1 0 100-2h-8V3z"
          fill="#313131"
        />
      </Svg>
    </ViewStyled>
  );
}

const ViewStyled = styled.View`
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  border-radius: 40px;
  border: 2px dashed ${({ theme }) => theme.color.standard};
  background-color: ${COLORS.mainColors.normal};
`;
