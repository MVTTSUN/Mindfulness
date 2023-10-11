import { PropsWithChildren } from "react";
import { styled } from "styled-components/native";
import { useAppSelector } from "../../../hooks/useAppSelector";

type IconNavigationContainerProps = PropsWithChildren<{
  color: string;
}>;

export function IconNavigationContainer({
  children,
  color,
}: IconNavigationContainerProps) {
  const theme = useAppSelector((state) => state.theme.value);

  return (
    <ViewContainer>
      {children}
      <ViewBorder $color={color} $theme={theme} />
    </ViewContainer>
  );
}

const ViewContainer = styled.View`
  height: 32px;
  width: 32px;
  align-items: center;
  gap: 10px;
`;

const ViewBorder = styled.View<{ $color: string; $theme: string }>`
  height: 1px;
  background-color: ${({ $color, $theme }) =>
    $color === "#edecf5"
      ? "#edecf5"
      : $theme === "light"
      ? "#313131"
      : "#101010"};
  border-radius: 0.5px;
  width: 8px;
`;
