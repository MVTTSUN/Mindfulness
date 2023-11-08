import { Path, Svg } from "react-native-svg";
import { Color } from "../../../../const";
import { normalize } from "../../../../utils";

type ArrowRightIconProps = {
  size: number;
};

export function ArrowRightIcon(props: ArrowRightIconProps) {
  const { size } = props;

  return (
    <Svg width={normalize(size)} height={normalize(size)} viewBox="0 0 24 24">
      <Path
        d="M6 12H18M18 12L13 7M18 12L13 17"
        stroke={Color.TextStandard}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}
