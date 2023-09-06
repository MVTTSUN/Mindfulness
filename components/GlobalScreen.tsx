import { styled } from "styled-components/native";
import { PropsWithChildren } from "react";
import { ScrollView } from "react-native";

type GlobalScreenProps = PropsWithChildren<{
  withoutScrollView?: boolean;
}>;

export function GlobalScreen({
  children,
  withoutScrollView,
}: GlobalScreenProps) {
  return (
    <ViewStyled>
      {withoutScrollView ? (
        <>
          <TopSpace />
          {children}
          <TopAndBottomSpace />
        </>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <>
            <TopSpace />
            {children}
            <TopAndBottomSpace />
          </>
        </ScrollView>
      )}
    </ViewStyled>
  );
}

const ViewStyled = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.backgroundColor.main};
`;

const TopSpace = styled.View`
  height: 40px;
`;

const TopAndBottomSpace = styled.View`
  height: 70px;
`;
