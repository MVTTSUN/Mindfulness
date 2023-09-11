import { styled } from "styled-components/native";
import { SearchIcon } from "../icons/SearchIcon";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useState } from "react";

type InputProps = {
  onChangeText: (text: string) => void;
  width: string;
  withoutIcon?: boolean;
  placeholder: string;
  height?: string;
  isTextarea?: boolean;
};

export function Input({
  width,
  withoutIcon,
  placeholder,
  onChangeText,
}: InputProps) {
  const theme = useAppSelector((state) => state.theme.value);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <ViewStyled $width={width}>
      {!withoutIcon && <SearchIcon />}
      <FocusOutline $isFocus={isFocus}>
        <TextInputStyled
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChangeText={onChangeText}
          placeholder={placeholder}
          selectionColor={theme === "light" ? "#313131" : "#edecf5"}
          placeholderTextColor={theme === "light" ? "#929292" : "#656566"}
          $withoutIcon={withoutIcon}
        />
      </FocusOutline>
    </ViewStyled>
  );
}

const ViewStyled = styled.View<{ $width: string }>`
  flex-basis: ${({ $width }) => $width};
  position: relative;
  margin-bottom: 12px;
`;

const TextInputStyled = styled.TextInput<{
  $withoutIcon?: boolean;
}>`
  height: 32px;
  color: ${({ theme }) => theme.color.standard};
  padding: 2px 10px 0 ${({ $withoutIcon }) => ($withoutIcon ? "10px" : "40px")};
  font-family: "Poppins-Regular";
  font-size: 12px;
  line-height: 16px;
  border: 1px solid ${({ theme }) => theme.color.standard};
  border-radius: 20px;
`;

const FocusOutline = styled.View<{ $isFocus: boolean }>`
  align-self: flex-start;
  width: 100%;
  padding: 3px;
  border: ${({ $isFocus, theme }) =>
    $isFocus
      ? "3px solid #b5f2ea"
      : `3px solid ${theme.borderColor.searchOutline}`};
  border-radius: 40px;
`;
