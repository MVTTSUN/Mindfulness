import Svg, { Path } from "react-native-svg";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import { styled } from "styled-components/native";
import { normalize } from "../../../../utils";
import { Color, Theme } from "../../../../const";
import { getValueTheme } from "../../../../store/themeSelectors";

export function PreviousIcon() {
  const theme = useAppSelector(getValueTheme);

  return (
    <ViewStyled>
      <Svg viewBox="0 0 24 24" fill="none">
        <Path
          d="M2.75 20a1 1 0 102 0V4a1 1 0 10-2 0v16zM20.75 19.053c0 1.424-1.612 2.252-2.77 1.422L7.51 12.968a1.75 1.75 0 01.075-2.895l10.47-6.716c1.165-.748 2.695.089 2.695 1.473v14.223z"
          fill={theme === Theme.Light ? Color.TextStandard : Color.TextWhite}
        />
      </Svg>
    </ViewStyled>
  );
}

const ViewStyled = styled.View`
  width: ${normalize(20)}px;
  height: ${normalize(20)}px;
`;
