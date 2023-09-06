import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { InfoAndSettings } from "../pages/TabNavigatePages/InfoAndSettings";
import { Contacts } from "../pages/StackNavigatePages/Contacts";
import { Service } from "../pages/StackNavigatePages/Service";
import { Notification } from "../pages/StackNavigatePages/Notification";
import { ImportAndExport } from "../pages/StackNavigatePages/ImportAndExport";

const Stack = createNativeStackNavigator();

export function InfoAndSettingsStackScreen() {
  return (
    <Stack.Navigator
      initialRouteName="InfoAndSettings"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="InfoAndSettings" component={InfoAndSettings} />
      <Stack.Screen name="Contacts" component={Contacts} />
      <Stack.Screen name="Service" component={Service} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="ImportAndExport" component={ImportAndExport} />
    </Stack.Navigator>
  );
}
