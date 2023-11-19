import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Note from "../stack-pages/Note";
import { Notes } from "../tab-pages/Notes";
import { Statistics } from "../stack-pages/Statistics";
import { AppRoute } from "../../const";
import { TaskNote } from "../stack-pages/TaskNote";
import { MeditationNote } from "../stack-pages/MeditationNote";

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
      <Stack.Screen name={AppRoute.TaskNote} component={TaskNote} />
      <Stack.Screen name={AppRoute.MeditationNote} component={MeditationNote} />
    </Stack.Navigator>
  );
}
