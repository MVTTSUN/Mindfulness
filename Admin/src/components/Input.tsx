import { ForwardedRef, forwardRef } from "react";
import styled from "styled-components";
import { FontSizeStandard } from "../mixins";
import { Color } from "../const";
import { ChangeHandler } from "react-hook-form";

type InputProps = {
  onChange: ChangeHandler;
  name: string;
  withLabel?: boolean;
  labelText?: string;
  isNotArray?: boolean;
  isActive?: boolean;
  type?: string;
};

export const Input = forwardRef(
  (props: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const { onChange, name, withLabel, labelText, isNotArray, isActive, type } =
      props;

    return (
      <>
        {withLabel && <Label htmlFor={name}>{labelText}</Label>}
        <InputStyled
          $isActive={isActive}
          $isNotArray={isNotArray}
          ref={ref}
          name={name}
          onChange={onChange}
          id={name}
          placeholder="Введите текст"
          type={type || "text"}
          step={0.1}
        />
      </>
    );
  }
);

const InputStyled = styled.input<{
  $isNotArray?: boolean;
  $isActive?: boolean;
}>`
  ${FontSizeStandard}
  box-sizing: border-box;
  width: ${({ $isNotArray }) => ($isNotArray ? "100%" : "90%")};
  padding: 10px;
  border: 5px dashed ${Color.Primary};
  border-radius: 25px;
  background: ${({ $isActive }) => ($isActive ? Color.Primary : "none")};
  outline-style: dashed;
  outline-width: 3px;
  outline-color: transparent;
  outline-offset: 5px;
  transition: outline-color 0.3s ease;
  color: ${Color.TextStandard};

  &:focus {
    outline-color: ${Color.Dark};
  }
`;

const Label = styled.label`
  ${FontSizeStandard}
  cursor: pointer;
  color: ${Color.TextStandard};
`;
