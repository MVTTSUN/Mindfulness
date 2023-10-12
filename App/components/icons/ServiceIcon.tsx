import Svg, { G, Path } from "react-native-svg";
import { useAppSelector } from "../../hooks/useAppSelector";
import { styled } from "styled-components/native";

export function ServiceIcon() {
  const theme = useAppSelector((state) => state.theme.value);

  return (
    <ViewStyled>
      <Svg viewBox="0 0 24 24">
        <G fillRule="nonzero" stroke="none" strokeWidth={1} fill="none">
          <Path
            d="M24 0v24H0V0h24zM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018zm.265-.113l-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022zm-.715.002a.023.023 0 00-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01-.184-.092z"
            fillRule="nonzero"
            transform="translate(-1536 -48) translate(1536 48)"
          />
          <Path
            d="M5 9a7 7 0 0114 0v1.035c1.696.243 3 1.702 3 3.465v.25c0 1.775-1.531 3.331-3.332 3.248-.74 2.12-2.622 3.549-4.653 3.911-.47.172-1.026.091-1.515.091a1.5 1.5 0 010-3c.793 0 1.671-.115 2.207.609C16.003 17.992 17 16.689 17 15V9A5 5 0 007 9v6.25A1.75 1.75 0 015.25 17 3.25 3.25 0 012 13.75v-.25a3.5 3.5 0 013-3.465V9z"
            fill={theme === "light" ? "#313131" : "#edecf5"}
            transform="translate(-1536 -48) translate(1536 48)"
          />
        </G>
      </Svg>
    </ViewStyled>
  );
}

const ViewStyled = styled.View`
  transform: translateY(-2px);
  width: 24px;
  height: 24px;
`;