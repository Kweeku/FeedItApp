import React, { useState, useEffect } from "react"
import { Screen, LoginWallpaper, Header } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { FlatList, TextStyle, View, ViewStyle, Image, ImageBackground, Alert } from "react-native"
import { color, spacing } from "../../theme"
import ItemHomeRow from './ItemHome';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Images from "../../components/images/images";
import axios from 'axios';

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
  fontSize: 20,
  fontWeight: "bold",
  letterSpacing: 1.5,
  // lineHeight: 15,
  textAlign: "center",
}
const FLAT_LIST: ViewStyle = {
  paddingHorizontal: spacing[2],
}

let mounted = true;

function HomeScreen({ navigation }) {

  const goDrawer = () => navigation.toggleDrawer()

  const [device, setDevice] = useState(null);
  const [loading, setLoading] = useState(false);

  const [state, setState] = useState({
    humSensor: null,
    tempSensor: null,
    illumSensor: null,
    soilHumSensor: null,
  })

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

        console.log(devices[0])
      })
      .catch(function (error) {
        Alert.alert('Error!', 'Someething went wrong fetching your devices.', [
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
      const humSensor = device.sensors.filter(sensor => sensor.name === 'humiditySensor 1');
      const tempSensor = device.sensors.filter(sensor => sensor.name === 'temperatureSensor 1');
      const illumSensor = device.sensors.filter(sensor => sensor.name === 'illuminanceSensor 1');
      const soilHumSensor = device.sensors.filter(sensor => sensor.name === 'SoilHumidity 1');

      setState({ ...state, humSensor: humSensor[0], tempSensor: tempSensor[0], illumSensor: illumSensor[0], soilHumSensor: soilHumSensor[0] });
    }
    return function cleanup() {
      mounted = false;
    }
  }, [device]);

  const DATA = state.tempSensor ? [
    {
      id: 'Tomato',
      image: Images.tomato,
      sensorVals: { Temperature: state.tempSensor.value.value, Humidity: state.humSensor.value.value, Water: state.soilHumSensor.value.value, Light: state.illumSensor.value.value }
    },
    {
      id: 'Strawberry',
      image: Images.strawberry,
      sensorVals: { Temperature: state.tempSensor.value.value, Humidity: state.humSensor.value.value, Water: state.soilHumSensor.value.value, Light: state.illumSensor.value.value }
    },
  ] : [];

  return (
    <View testID="HomeScreen" style={FULL}>
      <LoginWallpaper />
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
        <Header
          headerText="Home"
          leftIcon="dots"

          onLeftPress={goDrawer}
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />
        {state.tempSensor &&
          <FlatList
            contentContainerStyle={FLAT_LIST}
            data={DATA}
            extraData={DATA}
            showsVerticalScrollIndicator={false}
            // keyExtractor={(item, index) => index.toString()}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => <ItemHomeRow data={item} />}
          />}
      </Screen>
    </View>
  )
}

export default HomeScreen;