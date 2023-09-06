import { Pressable } from "react-native";
import { styled } from "styled-components/native";
import { BackIcon } from "../icons/BackIcon";
import { PropsWithChildren } from "react";
import { useNavigation } from "@react-navigation/native";

export function TopWithBack({ children }: PropsWithChildren) {
  const navigation = useNavigation();

  return (
    <TopView>
      <Pressable onPress={() => navigation.goBack()}>
        <BackIcon />
      </Pressable>
      {children}
    </TopView>
  );
}

const TopView = styled.View`
  margin-bottom: 15px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
