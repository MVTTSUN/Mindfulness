import { Path, Rect, Svg } from "react-native-svg";
import styled from "styled-components/native";
import { normalize } from "../../../../utils";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import { getValueTheme } from "../../../../store/themeSelectors";
import { Color, Theme } from "../../../../const";

export function StorageIcon() {
  const theme = useAppSelector(getValueTheme);

  return (
    <ViewStyled>
      <Svg
        viewBox="0 0 48 48"
        fill={theme === Theme.Light ? Color.TextStandard : Color.TextWhite}
      >
        <Rect />
        <Path d="M14,41a12.4,12.4,0,0,1-8.7-3.2A11.5,11.5,0,0,1,2.2,27.6a11.8,11.8,0,0,1,5.2-8.2A12.4,12.4,0,0,1,10.6,11a11.6,11.6,0,0,1,8.8-4,12.5,12.5,0,0,1,10.2,6,9.8,9.8,0,0,1,7.5,2.3,9.1,9.1,0,0,1,3.4,6.5A10,10,0,0,1,46,31.1c-.1,4.8-3.8,9.9-11.5,9.9Z" />
      </Svg>
    </ViewStyled>
  );
}

const ViewStyled = styled.View`
  transform: translate(${normalize(1)}px, ${normalize(-1)}px);
  width: ${normalize(22)}px;
  height: ${normalize(22)}px;
`;
