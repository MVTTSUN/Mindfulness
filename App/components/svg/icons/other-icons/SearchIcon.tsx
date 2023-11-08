import { styled } from "styled-components/native";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import Svg, { Path } from "react-native-svg";
import { normalize } from "../../../../utils";
import { Color, Theme } from "../../../../const";
import { getValueTheme } from "../../../../store/themeSelectors";

export function SearchIcon() {
  const theme = useAppSelector(getValueTheme);

  return (
    <ViewStyled>
      <Svg viewBox="0 0 24 24" fill="none">
        <Path
          d="M14.954 14.946L21 21m-4-11a7 7 0 11-14 0 7 7 0 0114 0z"
          stroke={theme === Theme.Light ? Color.TextStandard : Color.TextWhite}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </ViewStyled>
  );
}

const ViewStyled = styled.View`
  position: absolute;
  top: ${normalize(15)}px;
  left: ${normalize(15)}px;
  width: ${normalize(14)}px;
  height: ${normalize(14)}px;
`;
