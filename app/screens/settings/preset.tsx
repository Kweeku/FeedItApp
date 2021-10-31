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
import { clockRunning } from 'react-native-reanimated';

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
]


// const feedamount(c)

export function PresetScreen({navigation},props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalconfirmVisible, setModalconfirmVisible] = useState(false);
  let [selectedValue, setSelectedValue] = useState("M");
  const [sizeInput, setSizeInput] = useState('L');
  const [ageInput, setAgeInput] = useState('');
  const [pondlength, setPondLength] = useState('');
  const [fishnumber, setFishNumber] = useState('');
  const [pondwidth, setPondWidth] = useState('');
  const [pondheight, setPondHeight] = useState('');
  const saveData =() => {
  //   let obj ={
  //     fishsize: sizeInput,
  //     fishage: ageInput,
  //     fishtype: selectedValue,
  //     pondlength: pondlength,
  //     pondwidth: pondwidth,
  // }

    if(sizeInput) {
      AsyncStorage.setItem('fishsize',sizeInput)
      setSizeInput(sizeInput)
    }
    if(ageInput) {
      AsyncStorage.setItem('fishage',ageInput)
      setAgeInput(ageInput)
    }
    if(selectedValue) { 
      AsyncStorage.setItem('fishtype',selectedValue)
      setSelectedValue(selectedValue)
    }
    if(pondlength) {
      AsyncStorage.setItem('pondlength',pondlength)
      setPondLength(pondlength)
    }
   if(pondwidth){
    AsyncStorage.setItem('pondwidth',pondwidth)
      setPondWidth(pondwidth)
   }
   if(pondheight){
    AsyncStorage.setItem('pondheight',pondheight)
      setPondHeight(pondheight)
   }
   if(fishnumber){
    AsyncStorage.setItem('fishnumber',fishnumber)
      setPondHeight(fishnumber)
   }
    
  }

 

  const clearformData = async () => {
    try {
      AsyncStorage.clear()
      setSizeInput('L')
      setAgeInput('')
      setSelectedValue('T')
      setPondLength('')
      setPondWidth('')
      setPondHeight('')
      setFishNumber('')
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
       await AsyncStorage.getItem('fishsize').then(
         (value) => setSizeInput(value)
       );
       await AsyncStorage.getItem('fishage').then(
        (value) => setAgeInput(value)
       );  
       await AsyncStorage.getItem('fishtype').then(
        (value) => setSelectedValue(value)
       );
       await AsyncStorage.getItem('pondlength').then(
        (value) => setPondLength(value)
       );
       await AsyncStorage.getItem('pondwidth').then(
        (value) => setPondLength(value)
       );
       await AsyncStorage.getItem('pondheight').then(
        (value) => setPondLength(value)
       );
    }
    catch(error){
      console.log("Error retrieving data" + error);
    }
  },[AsyncStorage])


  // React.useEffect(() => {
  //   fetchFishData();
  // }, [fetchFishData]

  // )

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
          <Text style={styles.header}>Fish Age</Text>
          <Picker
            selectedValue={selectedValue => setSelectedValue(selectedValue)}
            style={styles.picker}
          >
            {/* ideally, fetch list of crops from database associated with account */}
            <Picker.Item label="Fry" value="F" />
          <Picker.Item label="Fingerling" value="L" />
            <Picker.Item label="Adult" value="A" />
          </Picker>
          <View style={styles.dropdown}>
          <Text style={styles.header}>Fish Type</Text>
          <Picker
            selectedValue={sizeInput => setSizeInput(sizeInput)}
            style={styles.picker}
          >
            {/* ideally, fetch list of crops from database associated with account */}
            <Picker.Item label="Mud Fish" value="M" />
          <Picker.Item label="Tilapia" value="T" />
            <Picker.Item label="Cat Fish" value="S" />
          </Picker>
          <Text style={styles.header}>Average Number of Fishes</Text>
          <TextInput 
            style={styles.textpondinput} 
            placeholder="Enter Average Number in Pond" 
            keyboardType = 'numeric' 
            value={fishnumber}
            onChangeText={fishnumber => setFishNumber(fishnumber)} 
            placeholderTextColor="#FFFFFF"/>
          <Text style={styles.header}>Pond Size</Text>
          <View style= {styles.size}>
            <TextInput 
            style={styles.textpondinput} 
            placeholder="Enter Pond Length" 
            keyboardType = 'numeric' 
            value={pondlength}
            onChangeText={pondlength => setPondLength(pondlength)} 
            placeholderTextColor="#FFFFFF"/>
            <TextInput 
            style={styles.textpondinput} 
            placeholder="Enter Pond Width" 
            keyboardType = 'numeric'
            value={pondwidth}
            onChangeText={pondwidth => setPondWidth(pondwidth)}  
            placeholderTextColor="#FFFFFF"/> 
            <TextInput 
            style={styles.textpondinput} 
            placeholder="Enter Pond Height" 
            keyboardType = 'numeric'
            value={pondwidth}
            onChangeText={pondwidth => setPondWidth(pondwidth)}  
            placeholderTextColor="#FFFFFF"/> 
          </View>
        </View> 
        </View>
        <View style= {styles.confirm}> 
          <TouchableHighlight style={styles.submitbutton} onPress={() => {setModalVisible(!modalVisible); saveData;console.log("Save button Pressed")}} underlayColor='#99d9f4'>            
            <Text style={styles.buttonText}>Save</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.submitbutton} onPress={() => {clearformData;console.log("Clear data button Pressed")}} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Clear Data</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.centeredView}>
      <Modal
        animationType="slide"  
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Text style={styles.modaltext}>Number of Times To be Fed in day:</Text>
            <Text style={styles.modaldatatext}>4</Text>
            <Text style={styles.modaltext}>Amount of Feed Estimated (per feed time):</Text>
            <Text style={styles.modaldatatext}>3.75 kg</Text>
            <Text style={styles.modaltext}>Fish Feed Size:</Text>
            <Text style={styles.modaldatatext}>1.5 mm</Text>
            <Text style={styles.modaltext}>Total Expected Feed Used Till Harvest</Text>
            <Text style={styles.modaldatatext}>8160 kg</Text>

            <View style= {styles.modalbuttonsize}>
            <Pressable
              style={styles.buttonactive}
              onPress={() => {setModalconfirmVisible(!modalconfirmVisible);setModalVisible(!modalVisible)}}
              // onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.text}>Edit</Text>
            </Pressable>
            <Pressable
              style={styles.buttonactive}
              onPress={() => {navigation.navigate('home');Alert.alert("Preset Settings Updated!");setModalVisible(!modalVisible)}}
              // onPress={() => navigation.navigate('controls')}
            >
            <Text style={styles.text}>Confirm</Text>
            </Pressable>
            </View>
          </View>
        </View>
        </Modal>
      <View style={styles.centeredView}>
      <Modal
        animationType="slide"  
        transparent={true}
        visible={modalconfirmVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalconfirmVisible(!modalconfirmVisible);
          setModalVisible(!modalVisible);

        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Text style={styles.modaltext}>Enter of Feed To Use:</Text>
          <TextInput 
            style={styles.suggestinput} 
            placeholder="256kg - 365kg recommended" 
            keyboardType = 'numeric'
            placeholderTextColor={color.coal}/> 
            
            <View style= {styles.modalbuttonsize}>
            <Pressable
              style={styles.buttonactive}
              onPress={() => setModalconfirmVisible(!modalconfirmVisible)}
            >
              <Text style={styles.text}>Edit</Text>
            </Pressable>
            <Pressable
              style={styles.buttonactive}
              onPress={() => {setModalconfirmVisible(!modalconfirmVisible);navigation.navigate('home');Alert.alert("Preset Settings Updated!")}}
            >
            <Text style={styles.text}>Confirm</Text>
            </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>

    </View>
        </SafeAreaView>
        </ScrollView>
    </Screen>
    </View>
    
  )
}

const styles = StyleSheet.create({
    centeredView: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    marginTop: 22
  },
    modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    // alignItems: "center",
    justifyContent: "space-around",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
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
  modaltext: {
    color: color.facebook,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
  },
  modaldatatext: {
    color: color.coal,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    padding: 10,
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
    color: color.silver,
    paddingBottom: 5,
    marginBottom: 10,
    borderBottomColor: color.facebook,
    borderBottomWidth: 1
  },
  suggestinput: {
    alignSelf: 'stretch',
    height: 40,
    marginBottom: 30,
    color: color.coal,
    borderBottomWidth: 1,
    borderBottomColor: color.coal
  },
  size : {
    display: 'flex',
    justifyContent: "space-evenly",
    flexDirection: "column"
  },
  confirm: {
      display: 'flex',
      justifyContent: "space-evenly",
      flexDirection: "row"
  },
  modalbuttonsize: {
    display: 'flex',
    justifyContent: "space-between",
    flexDirection: "row"
  }
});

AppRegistry.registerComponent('PresetScreen', () => App)
