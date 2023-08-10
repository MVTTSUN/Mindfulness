import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Meditation } from "../pages/TabNavigatePages/Meditation";
import { Audio } from "../pages/StackNavigatePages/Audio";

const Stack = createNativeStackNavigator();

export function MeditationStackScreen() {
  return (
    <Stack.Navigator
      initialRouteName="Meditation"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Meditation" component={Meditation} />
      <Stack.Screen name="Audio" component={Audio} />
    </Stack.Navigator>
  );
}
