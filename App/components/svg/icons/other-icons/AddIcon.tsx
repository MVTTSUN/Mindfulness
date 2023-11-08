import Svg, { Path } from "react-native-svg";
import { styled } from "styled-components/native";
import { normalize } from "../../../../utils";
import { Color } from "../../../../const";

export function AddIcon() {
  return (
    <ViewStyled>
      <Svg
        width={normalize(30)}
        height={normalize(30)}
        viewBox="0 0 24 24"
        fill="none"
      >
        <Path
          d="M13 3a1 1 0 10-2 0v8H3a1 1 0 100 2h8v8a1 1 0 102 0v-8h8a1 1 0 100-2h-8V3z"
          fill={Color.TextStandard}
        />
      </Svg>
    </ViewStyled>
  );
}

const ViewStyled = styled.View`
  justify-content: center;
  align-items: center;
  width: ${normalize(70)}px;
  height: ${normalize(70)}px;
  border-radius: ${normalize(40)}px;
  border: ${normalize(2)}px dashed ${({ theme }) => theme.color.standard};
  background-color: ${Color.Primary};
`;
