import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Note } from "../pages/StackNavigatePages/Note";
import { Notes } from "../pages/TabNavigatePages/Notes";

const Stack = createNativeStackNavigator();

export function NotesStackScreen() {
  return (
    <Stack.Navigator
      initialRouteName="Notes"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Notes" component={Notes} />
      <Stack.Screen name="Note" component={Note} />
    </Stack.Navigator>
  );
}
