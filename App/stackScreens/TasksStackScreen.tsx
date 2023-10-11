import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Tasks } from "../pages/TabNavigatePages/Tasks";
import { Task } from "../pages/StackNavigatePages/Task";

const Stack = createNativeStackNavigator();

export function TasksStackScreen() {
  return (
    <Stack.Navigator
      initialRouteName="Tasks"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Tasks" component={Tasks} />
      <Stack.Screen name="Task" component={Task} />
    </Stack.Navigator>
  );
}
