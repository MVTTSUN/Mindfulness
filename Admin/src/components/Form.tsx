import { FormHTMLAttributes } from "react";
import styled from "styled-components";

type FormProps = FormHTMLAttributes<HTMLFormElement>;

export function Form(props: FormProps) {
  const { children, onSubmit } = props;

  return <FormStyled onSubmit={onSubmit}>{children}</FormStyled>;
}

const FormStyled = styled.form`
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
