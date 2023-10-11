import { Path, Svg } from "react-native-svg";
import styled from "styled-components/native";

export function LoaderIcon() {
  return (
    <ViewStyled>
      <Svg viewBox="0 0 24 24">
        <Path fill="none" d="M0 0h24v24H0z" />
        <Path fill="#313131" d="M12 3a9 9 0 019 9h-2a7 7 0 00-7-7V3z" />
      </Svg>
    </ViewStyled>
  );
}

const ViewStyled = styled.View`
  width: 32px;
  height: 32px;
`;
