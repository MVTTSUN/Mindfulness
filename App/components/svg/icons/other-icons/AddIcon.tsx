import Svg, { G, Path } from "react-native-svg";
import { styled } from "styled-components/native";
import { normalize } from "../../../../utils";
import { Color } from "../../../../const";
import { Shadow } from "react-native-shadow-2";

export function AddIcon() {
  return (
    <ViewStyled distance={15} startColor={`${Color.TextStandard}10`}>
      <Svg
        width={normalize(26)}
        height={normalize(26)}
        viewBox="0 0 24 24"
        fill="none"
      >
        <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
        <G
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></G>
        <G id="SVGRepo_iconCarrier">
          <Path
            d="M13 3C13 2.44772 12.5523 2 12 2C11.4477 2 11 2.44772 11 3V11H3C2.44772 11 2 11.4477 2 12C2 12.5523 2.44772 13 3 13H11V21C11 21.5523 11.4477 22 12 22C12.5523 22 13 21.5523 13 21V13H21C21.5523 13 22 12.5523 22 12C22 11.4477 21.5523 11 21 11H13V3Z"
            fill={Color.TextStandard}
          ></Path>
        </G>
      </Svg>
    </ViewStyled>
  );
}

const ViewStyled = styled(Shadow)`
  justify-content: center;
  align-items: center;
  width: ${normalize(70)}px;
  height: ${normalize(70)}px;
  border-radius: ${normalize(40)}px;
  background-color: ${Color.Primary};
`;
