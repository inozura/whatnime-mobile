import { AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import {Home, Search, Settings} from '../screens';
import { BottomTabParamList, Home as HomeParams, Search as SearchParams, Settings as SettingsParams } from '../types';
import WindowVal from '../constants/Layout'

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={
        { activeTintColor: Colors[colorScheme].tint, 
          showLabel: false, 
          keyboardHidesTabBar: true,
          style:{position: "absolute", borderTopLeftRadius: 13, borderTopRightRadius: 13, backgroundColor: "#252836", height: WindowVal.window.height * 0.07, borderTopWidth: 0},
        }
      }
      lazy
      >
      <BottomTab.Screen
        name="Home"
        component={TabHomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={TabSearchNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="search1" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={TabSettingsNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="setting" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof AntDesign>['name']; color: string }) {
  return <AntDesign size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<HomeParams>();

function TabHomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
}

const SearchStack = createStackNavigator<SearchParams>();

function TabSearchNavigator() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="Search"
        component={Search}
        options={{ headerShown: false }}
      />
    </SearchStack.Navigator>
  );
}

const SettingsStack = createStackNavigator<SettingsParams>();

function TabSettingsNavigator() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: false }}
      />
    </SettingsStack.Navigator>
  );
}
