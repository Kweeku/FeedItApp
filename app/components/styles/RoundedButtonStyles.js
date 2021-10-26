import { StyleSheet } from 'react-native'
import { Fonts, color, Metrics } from '../../theme'

export default StyleSheet.create({
  button: {
    height: 45,
    borderRadius: 5,
    marginHorizontal: 25,
    marginVertical: 10,
    backgroundColor: color.fire,
    justifyContent: 'center'
  },
  buttonText: {
    color: color.snow,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    marginVertical: 10
  }
})
