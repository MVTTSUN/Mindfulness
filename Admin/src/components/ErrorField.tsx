import { PropsWithChildren } from "react";
import styled from "styled-components";
import { FontSizeStandard } from "../mixins";
import { Color } from "../const";

type ErrorFieldProps = PropsWithChildren;

export function ErrorField(props: ErrorFieldProps) {
  const { children } = props;

  return <Text>{children}</Text>;
}

const Text = styled.p`
  ${FontSizeStandard}
  color: ${Color.Errors};
`;
