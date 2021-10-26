import {StyleSheet} from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import {Fonts, Metrics, color} from '../../theme'

export default StyleSheet.create({
  applicationView: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: color.background
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Avenir-Book',
    margin: 10
  },
  myImage: {
    width: 200,
    height: 200,
    alignSelf: 'center'
  }
})
