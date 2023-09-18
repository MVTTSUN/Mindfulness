import Svg, { Path } from "react-native-svg";
import { styled } from "styled-components/native";
import { COLORS } from "../../const";

export function StatisticsIcon() {
  return (
    <ViewStyled>
      <Svg viewBox="0 0 1024 1024">
        <Path
          fill={COLORS.textColors.normal}
          d="M521.58 516.763V43.947c250.725 22.642 450.175 222.092 472.817 472.817H521.581zm396.649 76.328H482.793c-21.963 0-39.769-17.805-39.769-39.769V117.859C220.11 137.98 45.342 325.132 45.342 553.295c0 241.605 195.898 437.452 437.451 437.451 228.163 0 415.339-174.715 435.436-397.657z"
        />
      </Svg>
    </ViewStyled>
  );
}

const ViewStyled = styled.View`
  transform: translate(2px, -2px);
  width: 24px;
  height: 24px;
`;
