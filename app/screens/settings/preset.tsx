import React, {useRef, useState} from 'react';
import { TextField,Screen,Header, LoginWallpaper} from "../../components";
import { color,spacing,typography } from "../../theme"
import {Alert,Button,
  TextStyle, View, Image,
  ViewStyle,StyleSheet, Text,  
    SafeAreaView,FlatList, SectionList, 
    StatusBar,Pressable,Modal, TouchableHighlight , 
    BackHandler,ScrollView, ColorPropType} from "react-native";
  import AsyncStorage from '@react-native-async-storage/async-storage'
  import { MaterialIcons} from '@expo/vector-icons';
  import { Picker } from '@react-native-picker/picker';
  import App from '../../components/main/main';
  import { AppRegistry } from "react-native"
 import { TextInput } from 'react-native-gesture-handler';
import { placeholder } from '@babel/types';

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
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1.5,
    lineHeight: 15,
    textAlign: "center",
  }

  const POND: TextStyle ={
    fontSize: 16,
    fontFamily: typography.secondary,
    fontWeight: "bold",
    letterSpacing: 1.5,
    lineHeight: 30,
    textAlign: "auto",
    color: "#ffffff"
  }
  
  
const DATA =[
  {
    id: '01',
    title: 'Pond 1'
  },
  {
    id: '02',
    title: 'Pond 2'
  }
]


export function PresetScreen({navigation},props) {
  const [selectedValue, setSelectedValue] = useState("M");
  const [sizeInput, setSizeInput] = useState('');
  const [ageInput, setAgeInput] = useState('');
  const [pondlength, setPondLength] = useState('');
  const [pondwidth, setPondWidth] = useState('');

  const saveData =() => {
  //   let obj ={
  //     fishsize: sizeInput,
  //     fishage: ageInput,
  //     fishtype: selectedValue,
  //     pondlength: pondlength,
  //     pondwidth: pondwidth,
  // }
    AsyncStorage.setItem('fishsize',sizeInput)
    AsyncStorage.setItem('fishage',ageInput)
    AsyncStorage.setItem('fishtype',selectedValue)
    AsyncStorage.setItem('pondlength',pondlength)
    AsyncStorage.setItem('pondwidth',pondwidth)
  }

 

  const clearformData = async () => {
    try {
      AsyncStorage.clear()
      console.log('Storage successfully cleared!')
    } catch (error) {
      console.log('Failed to clear the async storage.')
    }
  }

  let getsize = ''
  let getage = ''
  let getfish = ''
  let getlength = ''
  let getwidth = ''
  
  const fetchFishData = React.useCallback(async () => {
    try{

      // let fishsize = await AsyncStorage.getItem('fishsize');
      // size = JSON.parse(fishsize)
      // Alert.alert(fishsize)
      // console.log(size)
       getsize =await AsyncStorage.getItem('fishsize');
       getage =await AsyncStorage.getItem('fishage');  
       getfish =await AsyncStorage.getItem('fishtype');
       getlength =await AsyncStorage.getItem('pondlength');
       getwidth =await AsyncStorage.getItem('pondwidth');
      Alert.alert(sizeInput)
    }
    catch(error){
      console.log("Error retrieving data" + error);
    }
  },[AsyncStorage])


  React.useEffect(() => {
    fetchFishData();
  }, [fetchFishData]

  )

  const goDrawer = () => navigation.toggleDrawer()
  const { onPress} = props;
  const Item =({title}) => (
    <View style= {styles.list}>
      <View style ={PONDLIST}>
        <Text
        style={POND}
        >{title}</Text>
      <Pressable style={styles.buttonactive} onPress={onPress}>
        <Text style={styles.text}>Active</Text>
      </Pressable>
      <Pressable style={styles.buttonitem} onPress={fetchFishData}>
        <Text style={styles.text}>Edit</Text>
      </Pressable>
      </View>
    </View>
  )
  
  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );

  const FULL: ViewStyle = {
    flex: 1,
  }
  const CONTAINER: ViewStyle = {
    backgroundColor: color.transparent,
  }

  const TEXT: TextStyle = {
    color: color.palette.white,
    fontFamily: typography.primary,
  }

  const TITLE_WRAPPER: TextStyle = {
    ...TEXT,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 20,
  }

  const PONDLIST: ViewStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'space-between',
    justifyContent: 'space-evenly'
  }

  return(
  
    <View testID="PresetScreen" style={FULL}> 
    <LoginWallpaper/>
    <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
    <Header
          headerText="Preset"
          leftIcon="back"
          onLeftPress={goDrawer}
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />
      <ScrollView>
        <SafeAreaView
        >
        <View>
          <Text style={[TITLE_WRAPPER, { fontSize: 24 }]}>Pond</Text>
          <View style={styles.hairline} />
            <FlatList
              data={DATA}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
            <View style={styles.button}>
              <Pressable style={styles.buttonactive} onPress={onPress}>
                <Text style={styles.text}>Add</Text>
              </Pressable>
              <Pressable style={styles.buttoninactive} onPress={onPress}>
                <Text style={styles.text}>Delete</Text>
              </Pressable>
            </View>
        </View>
        <View style={styles.centered}>
          <Text style={[TITLE_WRAPPER, { fontSize: 24 }]}>Settings</Text>
        </View>
        <View style={styles.hairline} />
        <View style={styles.container}>
          {/* <Form type={preset} options={options} ref={dataRef}/> */}
          <Text style={styles.header}>Fish Size</Text>
          <TextInput style={styles.textinput} 
          placeholder="Feed Size" 
          keyboardType = 'numeric' 
          placeholderTextColor="#FFFFFF" 
          onChangeText={sizeInput => setSizeInput(sizeInput)}
          value={getsize}
          />
          <Text style={styles.header}>Fish Age</Text>
          <TextInput 
          style={styles.textinput}
           placeholder="Age"
            keyboardType = 'numeric'  
            value={getage}
            onChangeText={ageInput => setAgeInput(ageInput)} 
            placeholderTextColor="#FFFFFF"/>
          <View style={styles.dropdown}>
          <Text style={styles.header}>Fish Type</Text>
          <Picker
            selectedValue={selectedValue => setSelectedValue(selectedValue)}
            style={styles.picker}
          >
            {/* ideally, fetch list of crops from database associated with account */}
            <Picker.Item label="Mud Fish" value="M" />
          <Picker.Item label="Tilapia" value="T" />
            <Picker.Item label="Cat Fish" value="S" />
          </Picker>
          <Text style={styles.header}>Pond Size</Text>
          <View style= {styles.size}>
            <TextInput 
            style={styles.textpondinput} 
            placeholder="Length" 
            keyboardType = 'numeric' 
            value={getlength}
            onChangeText={pondlength => setPondLength(pondlength)} 
            placeholderTextColor="#FFFFFF"/>
            <TextInput 
            style={styles.textpondinput} 
            placeholder="Width" 
            keyboardType = 'numeric'
            value={getwidth}
            onChangeText={pondwidth => setPondWidth(pondwidth)}  
            placeholderTextColor="#FFFFFF"/> 
          </View>
        </View> 
        </View>
        <View style= {styles.size}> 
          <TouchableHighlight style={styles.submitbutton} onPress={saveData} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.submitbutton} onPress={clearformData} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Clear Data</Text>
          </TouchableHighlight>
        </View>
        </SafeAreaView>
        </ScrollView>
    </Screen>
    </View>
    
  )
}

const styles = StyleSheet.create({
  centered: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  dropdown: {
    alignItems: 'stretch',
    justifyContent: 'center'

  },
  hairline: {
    borderBottomColor: color.cloud,
    borderBottomWidth: 1,
    marginHorizontal: 20,
    marginTop: 5,
    // paddingBottom: 30
  },
  picker: {
    color: color.palette.white,
    height: 50,
    width: '100%',
    borderWidth: 2,
    borderColor: color.white
  },
  list: {
    display: 'flex',
    padding: 10,
    justifyContent: "space-around",
    alignContent: "space-around"
    
  },
  presetscreen: {
    display: 'flex',
    alignContent: 'space-between',
    justifyContent: 'space-between'
  },
  button: {
    paddingTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonitem: {
    backgroundColor: color.ricePaper,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
  },
  buttonactive: {
    backgroundColor: color.facebook,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
  },
  buttoninactive: {
    backgroundColor: color.drawer,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
  },
  buttonchange: {
    backgroundColor: color.clear,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  container: {
    justifyContent: 'center',
    marginTop: 10,
    padding: 20,
    backgroundColor: color.clear
  },
  buttonText: {
    fontSize: 18,
    color: color.facebook,
    alignSelf: 'center'
  },
  submitbutton: {
    height: 36,
    backgroundColor: color.silver,
    borderColor: color.frost,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 20,
    marginTop: 5
  },
  textinput: {
    alignSelf: 'stretch',
    height: 40,
    marginBottom: 30,
    color: color.white,
    borderBottomWidth: 1,
    borderBottomColor: color.white
  },
  textpondinput: {
    alignSelf: 'stretch',
    height: 40,
    marginBottom: 30,
    color: color.white,
    borderBottomWidth: 1,
    borderBottomColor: color.white
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    color: color.white,
    paddingBottom: 5,
    marginBottom: 10,
    borderBottomColor: color.frost,
    borderBottomWidth: 1
  },
  size : {
    display: 'flex',
    justifyContent: "space-evenly",
    flexDirection: "row"
  }
});

AppRegistry.registerComponent('PresetScreen', () => App)
