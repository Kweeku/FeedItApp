import { createStackNavigator } from "@react-navigation/stack"
import AuthenticatedScreen from '../containers/AuthenticatedScreen'
import AnotherAuthenticatedScreen from '../containers/AnotherAuthenticatedScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
export default createStackNavigator({
  AuthenticatedScreen: {
    screen: AuthenticatedScreen
  },
  AnotherAuthenticatedScreen: { screen: AnotherAuthenticatedScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  // Options: {
  //   headerStyle: styles.header
  // }
})
