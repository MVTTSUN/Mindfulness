import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { useAppSelector } from "../hooks/useAppSelector";
import { Home } from "../pages/tab-pages/Home";
import { MeditationsStackScreen } from "../pages/stacks/MeditationsStack";
import { HomeIcon } from "./svg/icons/navigate-icons/HomeIcon";
import { MeditationIcon } from "./svg/icons/navigate-icons/MeditationIcon";
import { NotesIcon } from "./svg/icons/navigate-icons/NotesIcon";
import { InfoAndSettingsIcon } from "./svg/icons/navigate-icons/InfoAndSettingsIcon";
import { InfoAndSettingsStackScreen } from "../pages/stacks/InfoAndSettingsStack";
import { NotesStackScreen } from "../pages/stacks/NotesStack";
import { TasksIcon } from "./svg/icons/navigate-icons/TasksIcon";
import { TasksStackScreen } from "../pages/stacks/TasksStack";
import { normalize } from "../utils";
import { getValueTheme } from "../store/themeSelectors";
import { AppRoute, Color, Theme } from "../const";

const Tab = createBottomTabNavigator();

export function TabNavigator() {
  const theme = useAppSelector(getValueTheme);
  const tabNavigatorOptions: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarShowLabel: false,
    tabBarStyle: {
      height: normalize(70),
      backgroundColor: theme === Theme.Light ? Color.TextStandard : "#101010",
      position: "absolute",
      bottom: 0,
      zIndex: 0,
      borderTopLeftRadius: normalize(35),
      borderTopRightRadius: normalize(35),
      borderTopWidth: 0,
      paddingHorizontal: normalize(20),
      paddingVertical: 0,
      paddingTop: normalize(19),
      paddingBottom: normalize(19),
    },
    tabBarInactiveTintColor: theme === Theme.Light ? "#6b6b6d" : "#3e3e3f",
    tabBarActiveTintColor: Color.TextWhite,
    tabBarIconStyle: {
      width: normalize(32),
      height: normalize(32),
    },
    unmountOnBlur: true,
  };

  return (
    <Tab.Navigator screenOptions={tabNavigatorOptions}>
      <Tab.Screen
        name={AppRoute.Home}
        component={Home}
        options={{
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
        }}
        listeners={({ navigation }) => ({
          blur: () => navigation.setParams({ screen: undefined }),
        })}
      />
      <Tab.Screen
        name={AppRoute.MeditationsStack}
        component={MeditationsStackScreen}
        options={{
          tabBarIcon: ({ color }) => <MeditationIcon color={color} />,
        }}
        listeners={({ navigation }) => ({
          blur: () => navigation.setParams({ screen: undefined }),
        })}
      />
      <Tab.Screen
        name={AppRoute.TasksStack}
        component={TasksStackScreen}
        options={{
          tabBarIcon: ({ color }) => <TasksIcon color={color} />,
        }}
        listeners={({ navigation }) => ({
          blur: () => navigation.setParams({ screen: undefined }),
        })}
      />
      <Tab.Screen
        name={AppRoute.NotesStack}
        component={NotesStackScreen}
        options={{
          tabBarIcon: ({ color }) => <NotesIcon color={color} />,
        }}
        listeners={({ navigation }) => ({
          blur: () => navigation.setParams({ screen: undefined }),
        })}
      />
      <Tab.Screen
        name={AppRoute.InfoAndSettingsStack}
        component={InfoAndSettingsStackScreen}
        options={{
          tabBarIcon: ({ color }) => <InfoAndSettingsIcon color={color} />,
        }}
        listeners={({ navigation }) => ({
          blur: () => navigation.setParams({ screen: undefined }),
        })}
      />
    </Tab.Navigator>
  );
}
