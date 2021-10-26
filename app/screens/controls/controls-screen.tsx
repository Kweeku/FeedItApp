import React, { useState, useEffect } from "react"
import { LoginWallpaper, Header, Screen } from "../../components";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing, typography, } from "../../theme"
import { TextStyle, View, ViewStyle, StyleSheet, Text, Alert, FlatList } from "react-native";
import { Button } from "react-native-elements"
import { Picker } from '@react-native-picker/picker';
// import { Dropdown } from 'react-native-material-dropdown-v2';
// import { ScrollView } from "react-native-gesture-handler";
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-simple-toast';
import axios from 'axios';

const FULL: ViewStyle = {
  flex: 1,
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
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}
const HEADER: TextStyle = {
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: spacing[4],
  paddingTop: spacing[3],
}
const HEADER_TITLE: TextStyle = {
  fontSize: 20,
  fontWeight: "bold",
  letterSpacing: 1.5,
  lineHeight: 20,
  textAlign: "center",
}

let mounted = true;

function ControlsScreen({ navigation }) {
  const goDrawer = () => navigation.toggleDrawer();
  // const goBack = () => navigation.navigate("home")
  const [selectedValue, setSelectedValue] = useState("T");
  const [loading, setLoading] = useState(false);

  const [deviceId, setDeviceId] = useState(null);
  const [device, setDevice] = useState(null);


  const [actuator, setActuator] = useState(null);
  const [actuatorVal, setActuatorVal] = useState(null);

  const [sensor, setSensor] = useState(null);

  const fetchAll = () => {
    // start spinner
    setLoading(true);

    // fetch and set relevant data
    axios({
      method: 'get',
      url: `/devices`,
    })
      .then(function (response) {
        // error with fetching devices associated with account hence filtering
        const devices = response.data.filter(device => device.owner === 'joshuanti102@gmail.com')
        setDevice(devices[0])

        // stop spinner
        setLoading(false)

        console.log(devices[0], sensor)
      })
      .catch(function (error) {
        Alert.alert('Error!', 'Unable to connect to main controls.', [
          { text: 'Okay' }
        ]);
        console.log(error);
        setLoading(false)
      });
  }

  useEffect(() => {
    if (mounted) {
      fetchAll();
    }
    if (device) {
      setActuator(device.actuators[0]);
      setDeviceId(device.id);
      setActuatorVal(device.actuators[0].value);

      // fetching and setting sensor for crop reseting
      const sensor = device.sensors.filter(sensor => sensor.id === 'VT');
      setSensor(sensor[0]);
    }
    return function cleanup() {
      mounted = false
    }
  }, [device])

  const turnOffActuator = () => {
    setActuatorVal(!actuatorVal);
    axios({
      method: 'put',
      url: `devices/${deviceId}/actuators/${actuator.id}/value`,
      data: {
        value: !actuatorVal, timestamp: new Date()
      }
    })
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        Alert.alert('Error!', 'Unable to turn off controls. Please check your internet and try again', [
          { text: 'Okay' }
        ]);
        console.log(error);
      });
  }

  const resetCropVals = itemValue => {
    Alert.alert(
      "Reset Crop Values?",
      "Are you sure you want to reset this crop control values?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            console.log("OK Pressed");
            setSelectedValue(itemValue)

            axios({
              method: 'post',
              url: `devices/${deviceId}/sensors/${sensor.id}/value`,
              data: {
                value: selectedValue,
                timestamp: new Date()
              }
            })
              .then(function (response) {
                console.log(response)
                Toast.show('Success! Crop parameters reset', Toast.LONG);
              })
              .catch(function (error) {
                Toast.show('Error! Something went wrong trying to reset your crop parameters', Toast.LONG);
                console.log(error);
              });
          }
        }
      ]
    )
  }

  return (
    <View testID="ControlsScreen" style={FULL}>
      <LoginWallpaper />

      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
        <Header
          headerText="Controls"
          leftIcon="dots"
          onLeftPress={goDrawer}
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />
        <Spinner
          visible={loading} />

        {/* implement swipe down to reload next */}
        <View style={{ flexDirection: 'row' }}>
          <Button
            icon={<MaterialCommunityIcons name='reload' color={color.palette.white} size={40} />}
            type="clear"
            onPress={fetchAll}
          />
          <Text style={TITLE_WRAPPER}>Reload</Text>
        </View>

        <View style={styles.centered}>
          <Text style={[TITLE_WRAPPER, { fontSize: 24 }]}>ACTUATIONS</Text>
        </View>
        <View style={styles.hairline} />
        <Button
          icon={<MaterialIcons name='power-settings-new' color={color.palette.white} size={100} />}
          type="clear"
          style={styles.centered}
          onPress={turnOffActuator}
        />
        <Text style={TITLE_WRAPPER}>CROP</Text>
        <View style={styles.hairline} />
        <View style={styles.dropdown}>
          <Picker
            selectedValue={selectedValue}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) => resetCropVals(itemValue)}
          >
            {/* ideally, fetch list of crops from database associated with account */}
            <Picker.Item label="Tomato" value="T" />
            <Picker.Item label="Strawberry" value="S" />
          </Picker>
        </View>
      </Screen>
    </View>



  );
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
    width: '100%'
  },
});
export default ControlsScreen;