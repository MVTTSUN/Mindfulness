import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Note from "../stackNavigatePages/Note";
import { Notes } from "../tabNavigatePages/Notes";
import { Statistics } from "../stackNavigatePages/Statistics";
import { AppRoute } from "../../const";

const Stack = createNativeStackNavigator();

export function NotesStackScreen() {
  return (
    <Stack.Navigator
      initialRouteName={AppRoute.Notes}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={AppRoute.Notes} component={Notes} />
      <Stack.Screen name={AppRoute.Note} component={Note} />
      <Stack.Screen name={AppRoute.Statistics} component={Statistics} />
    </Stack.Navigator>
  );
}
