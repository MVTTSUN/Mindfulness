import { css } from "styled-components";
import { Color } from "./const";

const FontSizeStandard = css`
  margin: 0;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.2;
`;

const FontSizeSubtitle = css`
  margin: 0;
  font-weight: 500;
  font-size: 24px;
  line-height: 1.2;
`;

const FontSizeHeading = css`
  margin: 0;
  font-weight: 600;
  font-size: 32px;
  line-height: 1.2;
`;

const ResetButton = css`
  cursor: pointer;
  padding: 0;
  border: none;
  background: none;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.7;
  }
`;

const ResetLink = css`
  text-decoration: none;
  color: ${Color.TextStandard};
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.7;
  }
`;

const ResetList = css`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export {
  FontSizeStandard,
  FontSizeSubtitle,
  FontSizeHeading,
  ResetButton,
  ResetLink,
  ResetList,
};
