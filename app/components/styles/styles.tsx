import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle,StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../theme"
import { Text } from "../"
import { flatten } from "ramda"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.primary,
}

const Sidebar = StyleSheet.create(
  {
    
  }
)
