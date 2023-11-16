import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Meditations } from "../tab-pages/Meditations";
import { Meditation } from "../stack-pages/Meditation";
import { Text } from "../stack-pages/Text";
import { Tips } from "../stack-pages/Tips";
import { AppRoute } from "../../const";

const Stack = createNativeStackNavigator();

export function MeditationsStackScreen() {
  return (
    <Stack.Navigator
      initialRouteName={AppRoute.Meditations}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={AppRoute.Meditations} component={Meditations} />
      <Stack.Screen name={AppRoute.Meditation} component={Meditation} />
      <Stack.Screen name={AppRoute.Text} component={Text} />
      <Stack.Screen name={AppRoute.Tips} component={Tips} />
    </Stack.Navigator>
  );
}
