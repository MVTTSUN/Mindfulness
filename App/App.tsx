import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { memo, useCallback, useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as NavigationBar from "expo-navigation-bar";
import { ThemeProvider, styled } from "styled-components/native";
import { Color, DARK_THEME, ErrorMessage, LIGHT_THEME, Theme } from "./const";
import { useAppSelector } from "./hooks/useAppSelector";
import { TabNavigator } from "./components/TabNavigator";
import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
} from "react-native-track-player";
import { ToastProvider } from "react-native-toast-notifications";
import { normalize } from "./utils";
import { getIdRadioButtonTheme, getValueTheme } from "./store/themeSelectors";
import { useToastCustom } from "./hooks/useToastCustom";
import { getNotifications } from "./store/notificationsSelectors";
import { useNotifee } from "./hooks/useNotifee";
import { AppState, useColorScheme } from "react-native";
import { changeTheme } from "./store/themeSlice";
import { useAppDispatch } from "./hooks/useAppDispatch";

SplashScreen.preventAutoHideAsync();

export const App = memo(() => {
  const colorScheme = useColorScheme();
  const idRadioButton = useAppSelector(getIdRadioButtonTheme);
  const notifications = useAppSelector(getNotifications);
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
          Capability.SeekTo,
          Capability.Play,
          Capability.Pause,
          Capability.SkipToPrevious,
        ],
        compactCapabilities: [
          Capability.SeekTo,
          Capability.Play,
          Capability.Pause,
          Capability.SkipToPrevious,
        ],
      });
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
    if (colorScheme && idRadioButton === 0) {
      dispatch(changeTheme(colorScheme));
    }
  }, [colorScheme]);

  useEffect(() => {
    if (theme) {
      if (theme === Theme.Light) {
        NavigationBar.setBackgroundColorAsync(Color.TextStandard);
        NavigationBar.setButtonStyleAsync("light");
      } else {
        NavigationBar.setBackgroundColorAsync("#101010");
        NavigationBar.setButtonStyleAsync("light");
      }
    }
  }, [theme]);

  useEffect(() => {
    setNotificationFirstLaunchApp();
    clearAllBadgeIOS();

    setup();

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
