import { StyleSheet } from 'react-native'
import { color} from '../../theme'

export default StyleSheet.create({
  container: {
    paddingTop: 70,
    backgroundColor: color.background
  },
  form: {
    backgroundColor: color.snow,
    margin: 10,
    borderRadius: 4
  },
  row: {
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  rowLabel: {
    color: color.charcoal
  },
  textInput: {
    height: 40,
    color: color.coal
  },
  textInputReadonly: {
    height: 40,
    color: color.steel
  },
  loginRow: {
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row'
  },
  loginButtonWrapper: {
    flex: 1
  },
  loginButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: color.charcoal,
    backgroundColor: color.panther,
    padding: 6
  },
  loginText: {
    textAlign: 'center',
    color: color.silver
  },
  topLogo: {
    alignSelf: 'center',
    resizeMode: 'contain'
  }
})
