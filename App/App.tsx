import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { memo, useCallback, useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { ThemeProvider, styled } from "styled-components/native";
import { Color, DARK_THEME, ErrorMessage, LIGHT_THEME, Theme } from "./const";
import { useAppSelector } from "./hooks/useAppSelector";
import { TabNavigator } from "./components/TabNavigator";
import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
} from "react-native-track-player";
import { getIsInitializedPlayer } from "./store/trackPlayerSelectors";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { setIsInitializedPlayer } from "./store/trackPlayerSlice";
import { ToastProvider } from "react-native-toast-notifications";
import { normalize } from "./utils";
import { getValueTheme } from "./store/themeSelectors";
import { useToastCustom } from "./hooks/useToastCustom";
import { getNotifications } from "./store/notificationsSelectors";
import { useNotifee } from "./hooks/useNotifee";
import { AppState } from "react-native";

SplashScreen.preventAutoHideAsync();

export const App = memo(() => {
  const notifications = useAppSelector(getNotifications);
  const isInitializedPlayer = useAppSelector(getIsInitializedPlayer);
  const theme = useAppSelector(getValueTheme);
  const dispatch = useAppDispatch();
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
  });
  const {
    onCreateTriggerNotification,
    getTriggerNotificationIds,
    clearAllBadgeIOS,
  } = useNotifee();
  const { onErrorToast } = useToastCustom();

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const setup = async () => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        android: {
          appKilledPlaybackBehavior:
            AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
        },
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToPrevious,
        ],
        compactCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToPrevious,
        ],
        playIcon: require("./assets/images/play-icon.png"),
        pauseIcon: require("./assets/images/pause-icon.png"),
        previousIcon: require("./assets/images/previous-icon.png"),
      });
      dispatch(setIsInitializedPlayer(true));
    } catch {
      onErrorToast(ErrorMessage.IntializePlayer);
    }
  };

  const setNotificationFirstLaunchApp = async () => {
    try {
      const ids = await getTriggerNotificationIds();
      notifications[0].enable &&
        !ids.includes(String(notifications[0].id)) &&
        (await onCreateTriggerNotification(
          notifications[0].id,
          notifications[0].hours,
          notifications[0].minutes
        ));
    } catch {
      onErrorToast(ErrorMessage.CreateNotification);
    }
  };

  useEffect(() => {
    setNotificationFirstLaunchApp();
    clearAllBadgeIOS();

    if (!isInitializedPlayer) {
      setup();
    }

    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "active") {
        clearAllBadgeIOS();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ToastProvider
      warningColor={Color.Error}
      successColor={Color.Task}
      style={{ borderRadius: 15 }}
      swipeEnabled={true}
      placement="bottom"
      duration={3000}
      animationType="zoom-in"
      offset={normalize(100)}
    >
      <ViewStyled onLayout={onLayoutRootView}>
        <ThemeProvider theme={theme === Theme.Light ? LIGHT_THEME : DARK_THEME}>
          <NavigationContainer>
            <TabNavigator />
            <StatusBar
              style={theme === Theme.Light ? Theme.Dark : Theme.Light}
            />
          </NavigationContainer>
        </ThemeProvider>
      </ViewStyled>
    </ToastProvider>
  );
});

const ViewStyled = styled.View`
  flex: 1;
`;
