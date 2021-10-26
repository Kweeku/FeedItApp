import { StyleSheet } from 'react-native'
import { Metrics, color, Fonts } from '../../theme'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 54,
    backgroundColor: color.background
  },
  headerText: {
    color: color.snow,
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: 'Avenir-Book',
    fontSize: 26
  }
})
