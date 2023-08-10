import { styled } from "styled-components/native";
import { PropsWithChildren } from "react";
import { ScrollView } from "react-native";

export function GlobalScreen({ children }: PropsWithChildren) {
  return (
    <ViewStyled>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TopAndBottomSpace />
        {children}
        <TopAndBottomSpace />
      </ScrollView>
    </ViewStyled>
  );
}

const ViewStyled = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.backgroundColor.main};
`;

const TopAndBottomSpace = styled.View`
  height: 70px;
`;
