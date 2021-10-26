import React, {useState} from 'react';
import { TextField,Button, Wallpaper} from "../../components";
import { color,spacing,typography } from "../../theme"
import {Header} from "../../components";
import {Alert,TextStyle, View, Image,ViewStyle,StyleSheet, Text,  
    SafeAreaView, SectionList, StatusBar,Pressable,Modal, TouchableOpacity} from "react-native";
  import { MaterialIcons} from '@expo/vector-icons';

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
  
export function PresetScreen({navigation}) {
  const goBack = () => navigation.navigate("settings")

  return(
    <View testID="PresetScreen" style={FULL}> 
    <Wallpaper/>
    
    </View>
  )
}


