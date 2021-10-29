import React, {useState} from 'react';
import { TextField,Button, Wallpaper} from "../../components";
import { useNavigation } from "@react-navigation/native"
import { Screen,LoginWallpaper} from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color,spacing,typography } from "../../theme"
import {Header} from "../../components";
import {Alert,TextStyle, View, Image,ViewStyle,StyleSheet, Text,  
  SafeAreaView, SectionList, StatusBar,Pressable,Modal, TouchableOpacity} from "react-native";
import { MaterialIcons} from '@expo/vector-icons';
import { PresetScreen } from './preset';
import {DevelopmentScreen} from "./development-screen"
import Images from "../../components/images/images";
import { Colors } from "react-native/Libraries/NewAppScreen";

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

const SECTION_TITLE: TextStyle = {
  fontSize: 15,
  fontWeight: "bold",
  letterSpacing: 1.5,
  lineHeight: 15,
  textAlign: "left",
}


 export const DATA =
[
  {
    title: "Profile" ,
    data: ["Edit Profile","Account","Change Password"],
    icon: <MaterialIcons name='dns'  color= {color.palette.white}/>
  },
  {
    title: "Presets",
    data: ["Change FeedIt Preset"]
  },
  {
    title: "General",
    data: ["Notifications","DarkMode","Preferences"]
  },
  {
    title: "Legal",
    data: ["Privacy and Safety","About", "Terms and Conditions"]
  } 
]

// const navigateToPreset = ({navigation}) => {
//   console.log("We got it")
//     navigation.navigate("home")

// const handlePress = (e) => {
//   if(e.target.value === DATA[1].data[0]){
//     navigateToPreset
//   }  
// }

const navigateToPreset =({navigation}) => {
  navigation.navigate("home") 
}

function SettingsScreen({navigation}) {
  const Item = ({title}) => (
    <View 
    style={{
      padding: 20,
    }
    }
    >
       <TouchableOpacity
    onPress={() => {
      if(title === "Change FeedIt Preset"){
        navigateToPreset

    }}}
    >
      <Text
      style={{
        fontFamily: typography.secondary,
        fontSize: 16,
        color: color.frost,
        fontWeight: "bold"
      }} 
      >
        {title}
      </Text>
      
      </TouchableOpacity>
  
      
    </View>
  )
  const goBack = () => navigation.navigate("home")
  
  return(
    <View testID="SettingsScreen" style={FULL}>
  <LoginWallpaper />
  <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
        <Header
        headerText="Settings"
        leftIcon="back"
        onLeftPress={goBack}
        style={HEADER}
        titleStyle={HEADER_TITLE}
        
        />
        <SafeAreaView 
        style ={{
          flex: 1,
          paddingTop: StatusBar.currentHeight,
          marginHorizontal: 16
        }}
        > 
        <SectionList
      sections= {DATA}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => <Item title={item}  
      />
        
    }
      renderSectionHeader={({ section: { title} }) => (
        <View
        style= {{
          backgroundColor: color.ricePaper,
        }}
        >
          <Header
        headerText={title}
        titleStyle={SECTION_TITLE}
        />
        </View>
      )}
      />
        </SafeAreaView>
     </Screen>

    </View>
  );
}

// const PasswordShow = () => {
//   const [shouldShow, setshouldShow] = useState(true);
//   if(){
//   return(
//     <SafeAreaView style= {{flex: 1}}>
//       <View style={styles.container}>
//       {}
//       {shouldShow? (
//         <TextField
//         placeholder = "**********"
//         label = "Password"
//         />
//       ) : null}
//       <Button
//       text = "Change Password"
//       onPress={() => setshouldShow(!shouldShow)}
//       />
//       </View>
//     </SafeAreaView>
//   );
// }
// }

const PasswordModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      > 
        <Text style={styles.textStyle}>Show Modal</Text>
       </Pressable>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
export default SettingsScreen;

function componentDidMount() {
  throw new Error('Function not implemented.');
}
