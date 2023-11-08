import Svg, { Path } from "react-native-svg";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import { styled } from "styled-components/native";
import { normalize } from "../../../../utils";
import { getValueTheme } from "../../../../store/themeSelectors";
import { Color, Theme } from "../../../../const";

type CheckIconProps = {
  size?: number;
  color?: string;
  isStroke?: boolean;
};

export function CheckIcon(props: CheckIconProps) {
  const { size, color, isStroke } = props;
  const theme = useAppSelector(getValueTheme);

  return (
    <ViewStyled $size={size}>
      <Svg viewBox="0 0 24 24" fill="none">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          strokeWidth={isStroke ? 2 : 0}
          stroke={Color.TextWhite}
          d="M20.61 5.207a1 1 0 01.183 1.403l-10 13a1 1 0 01-1.5.097l-5-5a1 1 0 011.414-1.414l4.195 4.195L19.207 5.39a1 1 0 011.403-.183z"
          fill={
            color
              ? color
              : theme === Theme.Light
              ? Color.TextStandard
              : Color.TextWhite
          }
        />
      </Svg>
    </ViewStyled>
  );
}

const ViewStyled = styled.View<{ $size?: number }>`
  width: ${({ $size }) => ($size ? normalize($size) : normalize(34))}px;
  height: ${({ $size }) => ($size ? normalize($size) : normalize(34))}px;
`;
