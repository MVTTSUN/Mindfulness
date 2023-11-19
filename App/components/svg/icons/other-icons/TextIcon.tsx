import Svg, { Path } from "react-native-svg";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import { styled } from "styled-components/native";
import { normalize } from "../../../../utils";
import { getValueTheme } from "../../../../store/themeSelectors";
import { Color, Theme } from "../../../../const";

type TextIconProps = {
  disabled?: boolean;
};

export function TextIcon(props: TextIconProps) {
  const { disabled } = props;
  const theme = useAppSelector(getValueTheme);

  return (
    <ViewStyled>
      <Svg viewBox="0 0 24 24" fill="none">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10zM8 10V9h8v1H8zm0 4v-1h8v1H8zm7-2v-1H9v1h6zm-6 4v-1h6v1H9z"
          fill={theme === Theme.Light ? Color.TextStandard : Color.TextWhite}
          opacity={disabled ? 0.5 : 1}
        />
      </Svg>
    </ViewStyled>
  );
}

const ViewStyled = styled.View`
  width: ${normalize(32)}px;
  height: ${normalize(32)}px;
`;
