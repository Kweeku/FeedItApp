import React from "react"
import { Wallpaper} from "../../components";
import { Screen} from "../../components"
import { color,spacing } from "../../theme"
import {Header} from "../../components";

import {TextStyle, View, ViewStyle} from "react-native";

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
}
const HEADER_TITLE: TextStyle = {
  fontSize: 14,
  fontWeight: "bold",
  letterSpacing: 1.5,
  lineHeight: 15,
  textAlign: "center",
}

function LogoutScreen({navigation}) {

  const goBack = () => navigation.navigate("home")

  return(
    <View testID="SettingsScreen" style={FULL}>
  <Wallpaper />
  <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
        <Header
        headerText="Logout"
        leftIcon="back"
        onLeftPress={goBack}
        style={HEADER}
        titleStyle={HEADER_TITLE}
        />
     </Screen>
    </View>
  );
}
export default LogoutScreen;