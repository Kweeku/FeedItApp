import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import ControlsScreen from "../../screens/controls/controls-screen"
import HomeScreen from "../../screens/home/home-screen"
import StatisticsScreen from "../../screens/statistics/statistics-screen"
import { Header } from "../../components/header/header"


const Stack = createStackNavigator()

export function HomeNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="home" component={HomeScreen} />

    </Stack.Navigator>
  )
}

export function StatisticsNavigator(){
  return(
    <Stack.Navigator
    screenOptions={{
      headerShown: false
    }}
  >
      <Stack.Screen name="statistics" component={StatisticsScreen} />
    </Stack.Navigator>

  )
}

export function ControlsNavigator(){
  return(
    <Stack.Navigator
    screenOptions={{
      headerShown: false
    }}
  >
    <Stack.Screen name="controls" component={ControlsScreen} />
    </Stack.Navigator>

  )
}


// const exitRoutes = ["home"]
// export const canExit = (routeName: string) => exitRoutes.includes(routeName)