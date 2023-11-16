import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Tasks } from "../tab-pages/Tasks";
import { Task } from "../stack-pages/Task";
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
