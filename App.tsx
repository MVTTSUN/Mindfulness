import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { memo, useCallback, useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { ThemeProvider, styled } from "styled-components/native";
import { DARK_THEME, LIGHT_THEME } from "./const";
import { useAppSelector } from "./hooks/useAppSelector";
import { TabNavigator } from "./components/TabNavigator";
import { useNotifee } from "./hooks/useNotifee";

SplashScreen.preventAutoHideAsync();

export const App = memo(() => {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
  });
  const theme = useAppSelector((state) => state.theme.value);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ViewStyled onLayout={onLayoutRootView}>
      <ThemeProvider theme={theme === "light" ? LIGHT_THEME : DARK_THEME}>
        <NavigationContainer>
          <TabNavigator />
          <StatusBar style={theme === "light" ? "dark" : "light"} />
        </NavigationContainer>
      </ThemeProvider>
    </ViewStyled>
  );
});

const ViewStyled = styled.View`
  flex: 1;
`;
