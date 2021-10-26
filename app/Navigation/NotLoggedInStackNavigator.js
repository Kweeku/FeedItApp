import { createStackNavigator } from "@react-navigation/stack"
import LoginScreen from '../containers/LoginScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
export default createStackNavigator({
  LoginScreen: {
    screen: LoginScreen,
    Options: { title: 'Login' }
  }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LoginScreen',
  // Options: {
  //   headerStyle: styles.header
  // }
})
