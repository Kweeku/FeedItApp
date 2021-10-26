import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
// import Navigation from '../Navigation/AppNavigation'
import LogInNavigator from "../navigators/stack/LoggedInNavigator"
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import ReduxPersist from '../config/ReduxPresist'

// Styles
import styles from './styles/RootContainerStyles'

class RootContainer extends Component {
  componentDidMount () {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }
  }

  render () {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='light-content' />
        <LogInNavigator />
      </View>
    )
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup())
})

export default connect(null, mapDispatchToProps)(RootContainer)
