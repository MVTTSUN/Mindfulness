import { Path, Svg } from "react-native-svg";
import styled from "styled-components/native";
import { Color } from "../../../../const";
import { normalize } from "../../../../utils";

type PauseIconProps = {
  size?: number;
};

export function PauseIcon({ size }: PauseIconProps) {
  return (
    <ViewStyled $size={size}>
      <Svg viewBox="0 0 24 24" fill="none">
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M20 5L20 19C20 20.6569 18.6569 22 17 22L16 22C14.3431 22 13 20.6569 13 19L13 5C13 3.34314 14.3431 2 16 2L17 2C18.6569 2 20 3.34315 20 5Z"
          fill={Color.TextStandard}
        />
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8 2C9.65685 2 11 3.34315 11 5L11 19C11 20.6569 9.65685 22 8 22L7 22C5.34315 22 4 20.6569 4 19L4 5C4 3.34314 5.34315 2 7 2L8 2Z"
          fill={Color.TextStandard}
        />
      </Svg>
    </ViewStyled>
  );
}

const ViewStyled = styled.View<{ $size?: number }>`
  width: ${({ $size }) => ($size ? normalize($size) : normalize(32))}px;
  height: ${({ $size }) => ($size ? normalize($size) : normalize(32))}px;
`;
