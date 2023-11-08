import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { memo, useCallback, useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { ThemeProvider, styled } from "styled-components/native";
import { Color, DARK_THEME, LIGHT_THEME, Theme } from "./const";
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

SplashScreen.preventAutoHideAsync();

export const App = memo(() => {
  const isInitializedPlayer = useAppSelector(getIsInitializedPlayer);
  const theme = useAppSelector(getValueTheme);
  const dispatch = useAppDispatch();
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
  });

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
      });
      dispatch(setIsInitializedPlayer(true));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!isInitializedPlayer) {
      setup();
    }
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
