import { PropsWithChildren } from "react";
import styled from "styled-components";
import { FontSizeSubtitle } from "../mixins";
import { Color } from "../const";

type SubtitleProps = PropsWithChildren;

export function Subtitle(props: SubtitleProps) {
  const { children } = props;

  return <SubtitleStyled>{children}</SubtitleStyled>;
}

const SubtitleStyled = styled.h2`
  ${FontSizeSubtitle}
  color: ${Color.TextStandard};
  text-align: center;
  margin-bottom: 40px;
`;
