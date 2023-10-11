import styled from "styled-components";
import { Color } from "../const";
import { FontSizeStandard } from "../mixins";
import { ForwardedRef, forwardRef } from "react";
import { ChangeHandler } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";

type TextareaProps = {
  rows: number;
  onChange: ChangeHandler;
  name: string;
  withLabel?: boolean;
  labelText?: string;
  isNotArray?: boolean;
  isAutosize?: boolean;
  isActive?: boolean;
};

export const Textarea = forwardRef(
  (props: TextareaProps, ref: ForwardedRef<HTMLTextAreaElement>) => {
    const {
      rows,
      onChange,
      name,
      withLabel,
      labelText,
      isNotArray,
      isAutosize,
      isActive,
    } = props;

    return (
      <>
        {withLabel && <Label htmlFor={name}>{labelText}</Label>}
        <TextareaAutosizeStyled
          $isActive={isActive}
          $isNotArray={isNotArray}
          ref={ref}
          name={name}
          onChange={onChange}
          id={name}
          minRows={rows}
          maxRows={isAutosize ? undefined : rows}
          placeholder="Введите текст"
        />
      </>
    );
  }
);

const TextareaAutosizeStyled = styled(TextareaAutosize)<{
  $isNotArray?: boolean;
  $isActive?: boolean;
}>`
  ${FontSizeStandard}
  box-sizing: border-box;
  width: ${({ $isNotArray }) => ($isNotArray ? "100%" : "90%")};
  padding: 10px;
  border: 5px dashed ${Color.Primary};
  border-radius: 25px;
  resize: none;
  background: ${({ $isActive }) => ($isActive ? Color.Primary : "none")};
  outline-style: dashed;
  outline-width: 3px;
  outline-color: transparent;
  outline-offset: 5px;
  transition: outline-color 0.3s ease;

  &:focus {
    outline-color: ${Color.Dark};
  }
`;

const Label = styled.label`
  ${FontSizeStandard}
  cursor: pointer;
  color: ${Color.TextStandard};
`;
