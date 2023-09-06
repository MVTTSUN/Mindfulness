import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { useAppSelector } from "../hooks/useAppSelector";
import { Home } from "../pages/TabNavigatePages/Home";
import { MeditationStackScreen } from "../stackScreens/MeditationStackScreen";
import { HomeIcon } from "./icons/NavigateIcons/HomeIcon";
import { MeditationIcon } from "./icons/NavigateIcons/MeditationIcon";
import { NotesIcon } from "./icons/NavigateIcons/NotesIcon";
import { Notes } from "../pages/TabNavigatePages/Notes";
import { InfoAndSettings } from "../pages/TabNavigatePages/InfoAndSettings";
import { InfoAndSettingsIcon } from "./icons/NavigateIcons/InfoAndSettingsIcon";
import { InfoAndSettingsStackScreen } from "../stackScreens/InfoAndSettingsStackScreen";
import { NotesStackScreen } from "../stackScreens/NotesStackScreen";
import { Tasks } from "../pages/TabNavigatePages/Tasks";
import { TasksIcon } from "./icons/NavigateIcons/TasksIcon";

const Tab = createBottomTabNavigator();

export function TabNavigator() {
  const theme = useAppSelector((state) => state.theme.value);
  const tabNavigatorOptions: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarShowLabel: false,
    tabBarStyle: {
      height: 70,
      backgroundColor: theme === "light" ? "#313131" : "#101010",
      position: "absolute",
      bottom: 0,
      zIndex: 0,
      borderTopLeftRadius: 35,
      borderTopRightRadius: 35,
      borderTopWidth: 0,
      paddingHorizontal: 20,
    },
    tabBarInactiveTintColor: theme === "light" ? "#6b6b6d" : "#3e3e3f",
    tabBarActiveTintColor: "#edecf5",
    tabBarIconStyle: {
      width: 32,
      height: 32,
    },
  };

  return (
    <Tab.Navigator screenOptions={tabNavigatorOptions}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
        }}
      />
      <Tab.Screen
        name="MeditationStack"
        component={MeditationStackScreen}
        options={{
          tabBarIcon: ({ color }) => <MeditationIcon color={color} />,
        }}
      />
      <Tab.Screen
        name="Tasks"
        component={Tasks}
        options={{
          tabBarIcon: ({ color }) => <TasksIcon color={color} />,
        }}
      />
      <Tab.Screen
        name="NotesStack"
        component={NotesStackScreen}
        options={{
          tabBarIcon: ({ color }) => <NotesIcon color={color} />,
        }}
      />
      <Tab.Screen
        name="InfoAndSettingsStack"
        component={InfoAndSettingsStackScreen}
        options={{
          tabBarIcon: ({ color }) => <InfoAndSettingsIcon color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
