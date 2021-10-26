import * as React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import LoadingScreen from "../../containers/LoadingScreen";
import LoginScreen from "../../containers/LoginScreen";
import AuthenticatedScreen from '../../containers/AuthenticatedScreen'
const Stack = createStackNavigator()

export function LogInNavigator() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="loading" component={LoadingScreen} />
        <Stack.Screen name="authentication" component={AuthenticatedScreen}/>
        <Stack.Screen name="login" component={LoginScreen}/>
      </Stack.Navigator>
    )
  }
  