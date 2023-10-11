import { PropsWithChildren } from "react";
import { styled } from "styled-components/native";
import { MoreIcons } from "../../icons/MoreIcons";
import { useAppSelector } from "../../../hooks/useAppSelector";

type TouchableHighlightCardProps = PropsWithChildren<{
  onPress: () => void;
  isAll?: boolean;
  backgroundColor?: string;
  color?: string;
  underlayColor?: string;
}>;

export function TouchableHighlightCard({
  children,
  onPress,
  isAll,
  backgroundColor,
  color,
  underlayColor,
}: TouchableHighlightCardProps) {
  const theme = useAppSelector((state) => state.theme.value);

  return (
    <TouchableHighlightStyled
      $backgroundColor={backgroundColor}
      $isAll={isAll}
      onPress={onPress}
      underlayColor={
        isAll ? (theme === "light" ? "#d3d3db" : "#1f1f1f") : underlayColor
      }
    >
      <TextContainer>
        <TextStyled $color={color} $isAll={isAll}>
          {children}
        </TextStyled>
        {isAll && <MoreIcons />}
      </TextContainer>
    </TouchableHighlightStyled>
  );
}

const TouchableHighlightStyled = styled.TouchableHighlight<{
  $isAll?: boolean;
  $backgroundColor?: string;
}>`
  width: 31%;
  height: 31%;
  aspect-ratio: 1 / 1;
  justify-content: center;
  align-items: center;
  padding: 20px 10px 15px;
  background-color: ${({ $isAll, $backgroundColor }) =>
    $isAll ? "transparent" : $backgroundColor};
  border-radius: 25px;
  border: ${({ $isAll, theme }) =>
    $isAll ? `1px solid ${theme.color.standard}` : "none"};
`;

const TextContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const TextStyled = styled.Text<{ $isAll?: boolean; $color?: string }>`
  text-align: center;
  font-family: "Poppins-Regular";
  font-size: 12px;
  line-height: 16px;
  color: ${({ $isAll, theme, $color }) =>
    $isAll ? theme.color.standard : $color};
`;
