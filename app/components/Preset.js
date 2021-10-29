// @flow

import React from 'react'
import { View, Text } from 'react-native'
import styles from './Styles/PresetStyle'

export default class Preset extends React.Component {

  render () {
    return (
      <View style={styles.container}>
        <Text>Preset Component</Text>
      </View>
    )
  }
}

// // Prop type warnings
// Preset.propTypes = {
//   someProperty: React.PropTypes.object,
//   someSetting: React.PropTypes.bool.isRequired
// }
//
// // Defaults for props
// Preset.defaultProps = {
//   someSetting: false
// }
