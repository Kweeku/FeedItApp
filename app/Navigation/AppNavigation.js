import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import { StackNavigator, addNavigationHelpers } from 'react-navigation'
import { createStackNavigator } from '@react-navigation/stack'
import LoadingScreen from '../containers/LoadingScreen'
import LoggedInStackNavigator from './LoggedInStackNavigator'
import NotLoggedInStackNavigator from './NotLoggedInStackNavigator'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
export const PrimaryNav = createStackNavigator({
  LoadingScreen: { screen: LoadingScreen },
  LoggedInStack: { screen: LoggedInStackNavigator },
  NotLoggedInStack: { screen: NotLoggedInStackNavigator }
}, {
  // Default config for all screens
  headerMode: 'none',
  // navigationOptions: {
  //   headerStyle: styles.header
  // }
})

const Navigation = ({ dispatch, navigation }) => {
  return (
    <PrimaryNav
      navigation={addNavigationHelpers({ dispatch, state: navigation })}
    />
  )
}

Navigation.propTypes = {
  dispatch: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    navigation: state.navigation
  }
}

// export default PrimaryNav
export default connect(mapStateToProps)(Navigation)
// const Stack = createStackNavigator()
// export function Navigation() {
//   return (
//     <Stack.Navigator
//       initialRouteName="loading"
//       screenOptions={{
//         headerShown: false
//       }}
//     >
//       <Stack.Screen name="loading" component={LoadingScreen} />

//     </Stack.Navigator>
//   )
// }