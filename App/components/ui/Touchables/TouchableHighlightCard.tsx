import { PropsWithChildren } from "react";
import { styled } from "styled-components/native";
import { MoreIcon } from "../../svg/icons/other-icons/MoreIcon";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { normalize } from "../../../utils";
import { getValueTheme } from "../../../store/themeSelectors";
import { Theme } from "../../../const";

type TouchableHighlightCardProps = PropsWithChildren<{
  onPress: () => void;
  isAll?: boolean;
  backgroundColor?: string;
  color?: string;
  underlayColor?: string;
}>;

export function TouchableHighlightCard(props: TouchableHighlightCardProps) {
  const { children, onPress, isAll, backgroundColor, color, underlayColor } =
    props;
  const theme = useAppSelector(getValueTheme);

  return (
    <TouchableHighlightStyled
      $backgroundColor={backgroundColor}
      $isAll={isAll}
      onPress={onPress}
      underlayColor={
        isAll ? (theme === Theme.Light ? "#d3d3db" : "#1f1f1f") : underlayColor
      }
    >
      <TextContainer>
        <TextStyled $color={color} $isAll={isAll}>
          {children}
        </TextStyled>
        {isAll && <MoreIcon />}
      </TextContainer>
    </TouchableHighlightStyled>
  );
}

const TouchableHighlightStyled = styled.TouchableHighlight<{
  $isAll?: boolean;
  $backgroundColor?: string;
}>`
  width: 31.3%;
  height: 31.3%;
  aspect-ratio: 1 / 1;
  justify-content: center;
  align-items: center;
  padding: 20px 10px 15px;
  background-color: ${({ $isAll, $backgroundColor }) =>
    $isAll ? "transparent" : $backgroundColor};
  border-radius: ${normalize(25)}px;
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
  font-size: ${normalize(12)}px;
  line-height: ${normalize(16)}px;
  color: ${({ $isAll, theme, $color }) =>
    $isAll ? theme.color.standard : $color};
`;
