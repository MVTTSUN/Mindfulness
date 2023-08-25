import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { InfoAndSettings } from "../pages/TabNavigatePages/InfoAndSettings";

const Stack = createNativeStackNavigator();

export function InfoAndSettingsStackScreen() {
  return (
    <Stack.Navigator
      initialRouteName="InfoAndSettings"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="InfoAndSettings" component={InfoAndSettings} />
    </Stack.Navigator>
  );
}
