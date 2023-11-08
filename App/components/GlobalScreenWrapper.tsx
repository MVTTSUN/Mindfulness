import { styled } from "styled-components/native";
import { PropsWithChildren, useEffect } from "react";
import { ScrollView } from "react-native";
import { normalize } from "../utils";
import { getIsOffline } from "../store/offlineSelectors";
import { useAppSelector } from "../hooks/useAppSelector";
import { OfflineIcon } from "./svg/icons/other-icons/OfflineIcon";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type GlobalScreenProps = PropsWithChildren<{
  withoutScrollView?: boolean;
}>;

export function GlobalScreen(props: GlobalScreenProps) {
  const { children, withoutScrollView } = props;
  const isOffline = useAppSelector(getIsOffline);
  const heightOffline = useSharedValue(isOffline ? normalize(25) : 0);
  const styleOffline = useAnimatedStyle(() => ({
    height: heightOffline.value,
  }));

  useEffect(() => {
    if (isOffline) {
      heightOffline.value = withTiming(normalize(25), { duration: 200 });
    } else {
      heightOffline.value = withTiming(0, { duration: 200 });
    }
  }, [isOffline]);

  return (
    <ViewStyled>
      {withoutScrollView ? (
        <>
          <TopSpace />
          <OfflineView style={styleOffline}>
            <OfflineIcon />
          </OfflineView>
          {children}
          <TopAndBottomSpace />
        </>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <>
            <TopSpace />
            <OfflineView style={styleOffline}>
              <OfflineIcon />
            </OfflineView>
            {children}
            <TopAndBottomSpace />
          </>
        </ScrollView>
      )}
    </ViewStyled>
  );
}

const ViewStyled = styled.View`
  padding-top: 10px;
  flex: 1;
  background-color: ${({ theme }) => theme.backgroundColor.main};
`;

const TopSpace = styled.View`
  height: 40px;
`;

const TopAndBottomSpace = styled.View`
  height: ${normalize(70)}px;
`;

const OfflineView = styled(Animated.View)`
  overflow: hidden;
  margin-left: ${normalize(20)}px;
`;
