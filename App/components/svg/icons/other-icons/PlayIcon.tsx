import Svg, { Path } from "react-native-svg";
import { styled } from "styled-components/native";
import { normalize } from "../../../../utils";
import { Color } from "../../../../const";

type PlayIconProps = {
  size: number;
};

export function PlayIcon({ size }: PlayIconProps) {
  return (
    <ViewStyled $size={size}>
      <Svg viewBox="0 0 20 20" fill={Color.TextStandard}>
        <Path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
      </Svg>
    </ViewStyled>
  );
}

const ViewStyled = styled.View<{ $size: number }>`
  width: ${({ $size }) => normalize($size)}px;
  height: ${({ $size }) => normalize($size)}px;
`;
