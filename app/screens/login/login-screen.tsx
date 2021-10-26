import React from "react"
import { LoginWallpaper, Header, Screen } from "../../components";
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { TextStyle, View, ViewStyle } from "react-native";
import Login from './Login.js'

const FULL: ViewStyle = {
  flex: 1,

}
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}
const HEADER: TextStyle = {
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: spacing[4],
  paddingTop: spacing[3],
  color: color.text
}
const HEADER_TITLE: TextStyle = {
  fontSize: 20,
  fontWeight: "bold",
  letterSpacing: 1.5,
  textAlign: "center",
}

function LoginScreen({ navigation }) {

  const resetStack = () => navigation.reset({
    index: 0,
    routes: [{ name: 'home' }],
  })

  return (
    <View testID="SettingsScreen" style={FULL}>
      <LoginWallpaper />
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
        <Header
          headerText="GreenGrow"
          // leftIcon="back"
          // onLeftPress={goBack}
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />
        <Login onPressLogin={resetStack} />
      </Screen>
    </View>
  );
}



export default LoginScreen;