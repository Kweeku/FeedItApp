import * as React from "react"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import RootContainer from "../../containers/RootContainer"
// import {DefaultTheme as NavigationDefaultTheme,DarkTheme as NavigationDarkTheme} from '@react-navigation/native';
// import  {Provider as PaperProvider, DefaultTheme as PaperDefaultTheme, DarkTheme as PaperDarkTheme} from 'react-native-paper';
import BottomTabNavigator from "../../navigators/tabnavigator/tabnavigator-navigator"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../theme"
import { Text } from "../"
import { flatten } from "ramda"
import DrawerNavigation from "../../navigators/drawer-navigation/drawer-navigation-navigator"
import { SwitchActions } from "react-navigation";

// const [isDarkTheme, setisDarkTheme] = React.useState(false);

// const CustomDefaultTheme = {
//   ...NavigationDefaultTheme,
//   ...PaperDefaultTheme,
//   colors: {
//     ...NavigationDefaultTheme.colors,
//     ...PaperDefaultTheme.colors,
//     background: '#ffffff',
//     text: '#333333'
//   }
// }

// const CustomDarkTheme = {
//   ...NavigationDarkTheme,
//   ...PaperDarkTheme,
//   colors: {
//     ...NavigationDarkTheme.colors,
//     ...PaperDarkTheme.colors,
//     background: '#333333',
//     text: '#ffffff'
//   }
// }
// const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;


 export default function App() {
  // const { style } = props
  // const styles = flatten([CONTAINER, style])

  
  return (
    <NavigationContainer>
    <DrawerNavigation/>
    </NavigationContainer>
  )
}
