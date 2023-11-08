import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { InfoAndSettings } from "../tabNavigatePages/InfoAndSettings";
import { Contacts } from "../stackNavigatePages/Contacts";
import { Service } from "../stackNavigatePages/Service";
import { Notification } from "../stackNavigatePages/Notification";
import { ImportAndExport } from "../stackNavigatePages/ImportAndExport";
import { Storage } from "../stackNavigatePages/Storage";
import { AppRoute } from "../../const";

const Stack = createNativeStackNavigator();

export function InfoAndSettingsStackScreen() {
  return (
    <Stack.Navigator
      initialRouteName={AppRoute.InfoAndSettings}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name={AppRoute.InfoAndSettings}
        component={InfoAndSettings}
      />
      <Stack.Screen name={AppRoute.Contacts} component={Contacts} />
      <Stack.Screen name={AppRoute.Service} component={Service} />
      <Stack.Screen name={AppRoute.Notification} component={Notification} />
      <Stack.Screen
        name={AppRoute.ImportAndExport}
        component={ImportAndExport}
      />
      <Stack.Screen name={AppRoute.Storage} component={Storage} />
    </Stack.Navigator>
  );
}
