import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { InfoAndSettings } from "../tab-pages/InfoAndSettings";
import { Contacts } from "../stack-pages/Contacts";
import { Service } from "../stack-pages/Service";
import { Notification } from "../stack-pages/Notification";
import { ImportAndExport } from "../stack-pages/ImportAndExport";
import { Storage } from "../stack-pages/Storage";
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
