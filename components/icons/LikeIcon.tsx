import Svg, { Path } from "react-native-svg";
import { useAppSelector } from "../../hooks/useAppSelector";
import { styled } from "styled-components/native";

export function LikeIcon({ isActive }: { isActive: boolean }) {
  const theme = useAppSelector((state) => state.theme.value);

  return (
    <ViewStyled>
      <Svg viewBox="0 0 32 32">
        <Path
          d="M28.343 17.48L16 29 3.657 17.48A8.363 8.363 0 011 11.365v0A8.365 8.365 0 019.365 3h.17c2.219 0 4.346.881 5.915 2.45L16 6l.55-.55A8.364 8.364 0 0122.465 3h.17A8.365 8.365 0 0131 11.365v0a8.363 8.363 0 01-2.657 6.115z"
          fill={isActive ? (theme === "light" ? "#313131" : "#edecf5") : "none"}
          stroke={theme === "light" ? "#313131" : "#edecf5"}
          strokeLinejoin="round"
          strokeMiterlimit={10}
          strokeWidth={2}
        />
      </Svg>
    </ViewStyled>
  );
}

const ViewStyled = styled.View`
  transform: translateY(0);
  width: 24px;
  height: 24px;
`;
