import { styled } from "styled-components/native";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useState } from "react";

type InputProps = {
  onChangeText: (text: string) => void;
  placeholder: string;
  autoFocus?: boolean;
};

export function InputTransparent({ placeholder, onChangeText }: InputProps) {
  const theme = useAppSelector((state) => state.theme.value);
  const [value, setValue] = useState("");

  return (
    <TextInputStyled
      onChangeText={(text) => setValue(text)}
      placeholder={placeholder}
      selectionColor={theme === "light" ? "#313131" : "#edecf5"}
      placeholderTextColor={
        theme === "light" ? "rgba(49, 49, 49, 0.3)" : "rgba(237, 236, 245, 0.3)"
      }
    />
  );
}

const TextInputStyled = styled.TextInput`
  color: ${({ theme }) => theme.color.standard};
  padding: 8px 10px 0;
  font-family: "Poppins-Medium";
  font-size: 24px;
  /* border: 1px solid ${({ theme }) => theme.color.standard}; */
`;
