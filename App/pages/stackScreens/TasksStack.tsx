import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Tasks } from "../tabNavigatePages/Tasks";
import { Task } from "../stackNavigatePages/Task";
import { AppRoute } from "../../const";

const Stack = createNativeStackNavigator();

export function TasksStackScreen() {
  return (
    <Stack.Navigator
      initialRouteName={AppRoute.Tasks}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={AppRoute.Tasks} component={Tasks} />
      <Stack.Screen name={AppRoute.Task} component={Task} />
    </Stack.Navigator>
  );
}
