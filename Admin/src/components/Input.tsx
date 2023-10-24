import { ForwardedRef, InputHTMLAttributes, forwardRef } from "react";
import styled from "styled-components";
import { FontSizeStandard } from "../mixins";
import { Color } from "../const";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  withLabel?: boolean;
  labelText?: string;
  isNotArray?: boolean;
  isActive?: boolean;
  isPassword?: boolean;
};

export const Input = forwardRef(
  (props: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const { name, withLabel, labelText, isNotArray, isActive, ...rest } = props;

    return (
      <>
        {withLabel && <Label htmlFor={name}>{labelText}</Label>}
        <InputStyled
          {...rest}
          $isActive={isActive}
          $isNotArray={isNotArray}
          ref={ref}
          name={name}
          id={name}
          placeholder="Введите текст"
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
  background: ${({ $isActive }) =>
    $isActive ? Color.Primary : Color.BackgroundMain};
  outline-style: dashed;
  outline-width: 3px;
  outline-color: transparent;
  outline-offset: 5px;
  transition: outline-color 0.3s ease;
  color: ${Color.TextStandard};

  &:focus {
    outline-color: ${Color.Dark};
  }

  &::placeholder {
    color: ${Color.TextStandard};
    opacity: 0.4;
  }
`;

const Label = styled.label`
  ${FontSizeStandard}
  cursor: pointer;
  color: ${Color.TextStandard};
`;
