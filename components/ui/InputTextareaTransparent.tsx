import { styled } from "styled-components/native";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useEffect, useState } from "react";
import {
  GestureResponderEvent,
  LayoutChangeEvent,
  NativeSyntheticEvent,
  NativeTouchEvent,
  TextInputFocusEventData,
} from "react-native";

type InputProps = {
  onChangeText: (text: string) => void;
  placeholder: string;
  height: number;
  borderColor: string;
  onTouchEnd: (event: GestureResponderEvent) => void;
};

export function InputTextareaTransparent({
  placeholder,
  onChangeText,
  height,
  borderColor,
  onTouchEnd,
}: InputProps) {
  const theme = useAppSelector((state) => state.theme.value);
  const [value, setValue] = useState("");

  return (
    <>
      <TextInputStyled
        onTouchEnd={onTouchEnd}
        $borderColor={borderColor}
        $height={height}
        value={value}
        onChangeText={(text: string) => setValue(text)}
        multiline
        textAlignVertical="top"
        placeholder={placeholder}
        selectionColor={theme === "light" ? "#313131" : "#edecf5"}
        placeholderTextColor={
          theme === "light"
            ? "rgba(49, 49, 49, 0.3)"
            : "rgba(237, 236, 245, 0.3)"
        }
      />
    </>
  );
}

const TextInputStyled = styled.TextInput<{
  $height: number;
  $borderColor: string;
}>`
  height: ${({ $height }) => $height}px;
  color: ${({ theme }) => theme.color.standard};
  padding: 15px;
  font-family: "Poppins-Regular";
  font-size: 16px;
  border-radius: 15px;
  border: 7px dotted ${({ $borderColor }) => $borderColor};
`;
