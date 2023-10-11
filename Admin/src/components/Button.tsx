import styled from "styled-components";
import { ResetButton } from "../mixins";
import { PropsWithChildren } from "react";
import { Color } from "../const";

type ButtonProps = PropsWithChildren<{
  onClick?: () => void;
  isPrimary?: boolean;
  type?: "button" | "submit" | "reset";
}>;

export function Button(props: ButtonProps) {
  const { children, isPrimary, onClick, type } = props;

  return (
    <ButtonStyled type={type} onClick={onClick} $isPrimary={isPrimary}>
      {children}
    </ButtonStyled>
  );
}

const ButtonStyled = styled.button<{ $isPrimary?: boolean }>`
  ${ResetButton}
  color: ${Color.TextStandard};
  background-color: ${({ $isPrimary }) =>
    $isPrimary ? Color.Primary : Color.Pastel};
  padding: 10px 20px;
  border-radius: 25px;
`;
