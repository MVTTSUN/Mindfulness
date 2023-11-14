import { Pressable } from "react-native";
import { styled } from "styled-components/native";
import { BackIcon } from "../../svg/icons/other-icons/BackIcon";
import { PropsWithChildren } from "react";
import { useNavigation } from "@react-navigation/native";
import { normalize } from "../../../utils";

type HeaderWithBackProps = PropsWithChildren<{
  onPress?: () => void;
  isCustomPress?: boolean;
}>;

export function HeaderWithBack(props: HeaderWithBackProps) {
  const { children, onPress, isCustomPress } = props;
  const navigation = useNavigation();

  return (
    <TopView>
      <PressableStyled
        onPress={isCustomPress ? onPress : () => navigation.goBack()}
      >
        <BackIcon />
      </PressableStyled>
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

const PressableStyled = styled(Pressable)`
  align-items: center;
  justify-content: center;
  width: ${normalize(32)}px;
  height: ${normalize(32)}px;
`;
