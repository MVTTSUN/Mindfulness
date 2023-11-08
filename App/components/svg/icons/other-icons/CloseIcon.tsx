import { Path, Svg } from "react-native-svg";
import { normalize } from "../../../../utils";
import { Color } from "../../../../const";

type CloseIconProps = {
  size: number;
};

export function CloseIcon(props: CloseIconProps) {
  const { size } = props;

  return (
    <Svg
      width={normalize(size)}
      height={normalize(size)}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M19.207 6.207a1 1 0 0 0-1.414-1.414L12 10.586 6.207 4.793a1 1 0 0 0-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 1 0 1.414 1.414L12 13.414l5.793 5.793a1 1 0 0 0 1.414-1.414L13.414 12l5.793-5.793z"
        fill={Color.TextStandard}
      />
    </Svg>
  );
}
