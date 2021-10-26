import React from 'react'
import { View } from 'react-native'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './styles/LoadingScreenStyle'

class LoadingScreen extends React.Component {
  render () {
    return (
      <View style={styles.container} />
    )
  }
}

export default LoadingScreen
