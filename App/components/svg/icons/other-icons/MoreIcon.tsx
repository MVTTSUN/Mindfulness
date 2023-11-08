import { styled } from "styled-components/native";
import Svg, { Path } from "react-native-svg";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import { normalize } from "../../../../utils";
import { getValueTheme } from "../../../../store/themeSelectors";
import { Color, Theme } from "../../../../const";

export function MoreIcon() {
  const theme = useAppSelector(getValueTheme);

  return (
    <ViewStyled>
      <Svg
        viewBox="0 0 24 24"
        fill={theme === Theme.Light ? Color.TextStandard : Color.TextWhite}
      >
        <Path d="M9.71 18.293a1 1 0 001.415 0l4.887-4.892a2 2 0 000-2.828l-4.89-4.89a1 1 0 00-1.415 1.414l4.186 4.185a1 1 0 010 1.415L9.71 16.879a1 1 0 000 1.414z" />
      </Svg>
    </ViewStyled>
  );
}

const ViewStyled = styled.View`
  width: ${normalize(15)}px;
  height: ${normalize(15)}px;
`;
