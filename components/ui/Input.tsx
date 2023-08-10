import { styled } from "styled-components/native";
import { SearchIcon } from "../icons/SearchIcon";
import { useAppSelector } from "../../hooks/useAppSelector";

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
  isTextarea,
  onChangeText,
}: InputProps) {
  const theme = useAppSelector((state) => state.theme.value);

  return (
    <ViewStyled>
      {!withoutIcon && <SearchIcon />}
      <TextInputStyled
        onChangeText={onChangeText}
        multiline={isTextarea}
        numberOfLines={isTextarea ? 30 : 1}
        textAlignVertical={isTextarea ? "top" : "center"}
        placeholder={placeholder}
        selectionColor={theme === "light" ? "#313131" : "#edecf5"}
        placeholderTextColor={theme === "light" ? "#929292" : "#656566"}
        $width={width}
        $withoutIcon={withoutIcon}
        $isTextarea={isTextarea}
      />
    </ViewStyled>
  );
}

const ViewStyled = styled.View`
  position: relative;
  margin-bottom: 20px;
`;

const TextInputStyled = styled.TextInput<{
  $width: string;
  $withoutIcon?: boolean;
  $isTextarea?: boolean;
}>`
  color: ${({ theme }) => theme.color.standard};
  width: ${({ $width }) => $width};
  padding: ${({ $isTextarea }) => ($isTextarea ? "8px" : "3px")} 10px 0
    ${({ $withoutIcon }) => ($withoutIcon ? "10px" : "40px")};
  font-family: "Poppins-Regular";
  font-size: 12px;
  border: 1px solid ${({ theme }) => theme.color.standard};
  border-radius: 15px;
`;
