import Svg, { Path } from "react-native-svg";
import { styled } from "styled-components/native";
import { normalize } from "../../../../utils";
import { Color } from '../../../../const';

export function VKIcon() {
  return (
    <ViewStyled>
      <Svg viewBox="0 0 24 24">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.4 3.4C2 4.813 2 7.073 2 11.6v.8c0 4.52 0 6.78 1.4 8.2C4.813 22 7.073 22 11.6 22h.8c4.52 0 6.78 0 8.2-1.4 1.4-1.413 1.4-3.673 1.4-8.2v-.8c0-4.52 0-6.78-1.4-8.2C19.187 2 16.927 2 12.4 2h-.8C7.08 2 4.82 2 3.4 3.4zm1.973 4.687c.107 5.2 2.707 8.32 7.267 8.32h.267v-2.974c1.673.167 2.94 1.394 3.446 2.974h2.367a6.58 6.58 0 00-3.42-4.174 6.353 6.353 0 002.92-4.153h-2.147c-.466 1.653-1.853 3.153-3.166 3.293V8.087h-2.154v5.76C9.42 13.513 7.74 11.9 7.667 8.087H5.373z"
          fill={Color.TextStandard}
        />
      </Svg>
    </ViewStyled>
  );
}

const ViewStyled = styled.View`
  width: ${normalize(32)}px;
  height: ${normalize(32)}px;
`;
