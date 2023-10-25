import styled from "styled-components";
import { ResetButton } from "../mixins";
import { ButtonHTMLAttributes, useEffect, useRef, useState } from "react";
import { Color } from "../const";
import { useFrameInterval } from "../hooks/useFrameInterval";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isPrimary?: boolean;
  isLoading?: boolean;
};

export function Button(props: ButtonProps) {
  const { children, isPrimary, isLoading, ...rest } = props;
  const [text, setText] = useState<string>(children as string);
  const cntRef = useRef(0);
  const { startAnimating, stopAnimating } = useFrameInterval(500, () => {
    setText((prevState) => {
      if (cntRef.current % 4 !== 0) {
        return prevState + ".";
      } else {
        return text.replaceAll(".", "");
      }
    });
    cntRef.current += 1;
  });

  useEffect(() => {
    if (isLoading) {
      startAnimating();
    } else {
      stopAnimating();
      setText(children as string);
    }
  }, [isLoading]);

  useEffect(() => {
    if (children) {
      setText(children as string);
    }
  }, [children]);

  return (
    <ButtonStyled
      {...rest}
      $isPrimary={isPrimary}
    >
      {text}
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

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }

  @media (max-width: 550px) {
    font-size: 14px;
  }
`;
