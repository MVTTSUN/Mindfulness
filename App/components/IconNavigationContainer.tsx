import { PropsWithChildren } from "react";
import { styled } from "styled-components/native";
import { useAppSelector } from "../hooks/useAppSelector";
import { normalize } from "../utils";
import { getValueTheme } from "../store/themeSelectors";
import { Color, Theme } from "../const";

type IconNavigationContainerProps = PropsWithChildren<{
  color: string;
}>;

export function IconNavigationContainer(props: IconNavigationContainerProps) {
  const { children, color } = props;
  const theme = useAppSelector(getValueTheme);

  return (
    <ViewContainer>
      {children}
      <ViewBorder $color={color} $theme={theme} />
    </ViewContainer>
  );
}

const ViewContainer = styled.View`
  height: ${normalize(32)}px;
  width: ${normalize(32)}px;
  align-items: center;
  gap: ${normalize(10)}px;
`;

const ViewBorder = styled.View<{ $color: string; $theme: string }>`
  height: ${normalize(1)}px;
  background-color: ${({ $color, $theme }) =>
    $color === Color.TextWhite
      ? Color.TextWhite
      : $theme === Theme.Light
      ? Color.TextStandard
      : "#101010"};
  border-radius: ${normalize(1)}px;
  width: ${normalize(8)}px;
`;
