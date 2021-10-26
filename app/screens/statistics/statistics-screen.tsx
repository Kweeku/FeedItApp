import React, { useState, useEffect } from "react"
import { LoginWallpaper, Screen, Header } from "../../components";
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing, typography } from "../../theme"
import axios from 'axios'
import { TextStyle, View, ViewStyle, Alert, Text, Dimensions, Button, ScrollView,StyleSheet } from "react-native";
import moment from 'moment'
import { LineChart, YAxis, Grid, AreaChart } from 'react-native-svg-charts';

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
  marginTop: 8,
  fontSize: 18
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

let mounted = true;
let allowed = true;
function StatisticsScreen({ navigation }) {

  const goDrawer = () => navigation.toggleDrawer();
  const [device, setDevice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sensors, setSensors] = useState(null);

  const [state, setState] = useState({
    sort: 'dsc',
    limit: 10,
    humidityData: [],
    temperatureData: [],
    soilData: [],
    illuminanceData: [],
    humVals: [],
    humTime: [],
    tempVals: [],
    tempTime: [],
    soilVals: [],
    soilTime: [],
    illumVals: [],
    illumTime: [],
    updateTemp: true,
    updateHums: true,
    updateSoilHums: true,
    updateIllum: true,
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
      })
      .catch(function (error) {
        Alert.alert('Error!', 'Someething went wrong fetching your devices.', [
          { text: 'Okay' }
        ]);
        console.log(error);
        setLoading(false)
      });
  }

  const getHumidityData = () => {
    const hums = sensors.filter(sensor => sensor.name === 'humiditySensor 1')
    const humiditySensor = hums[0]
    axios({
      method: 'get',
      url: `/sensors_data?device_id=${device.id}&sensor_id=${humiditySensor.id}&sort=${state.sort}&calibrated=${true}&limit=${state.limit}`,
    })
      .then(function (response) {
        setState({ ...state, humidityData: response.data });
        setLoading(false);
      })
      .catch(function (error) {
        Alert.alert('Error!', 'Unable to fetch sensor data', [
          { text: 'Okay' }
        ]);
        console.log(error);
        setLoading(false)
      });
  }

  const getTemperatureData = () => {
    const temps = sensors.filter(sensor => sensor.name === 'temperatureSensor 1')
    const temperatureSensor = temps[0]
    axios({
      method: 'get',
      url: `/sensors_data?device_id=${device.id}&sensor_id=${temperatureSensor.id}&sort=${state.sort}&calibrated=${true}&limit=${state.limit}`,
    })
      .then(function (response) {
        setState({ ...state, temperatureData: response.data });
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false)
      });
  }

  const getSoilHumidityData = () => {
    const soilHums = sensors.filter(sensor => sensor.name === 'SoilHumidity 1')
    const soilHumiditySensor = soilHums[0]
    axios({
      method: 'get',
      url: `/sensors_data?device_id=${device.id}&sensor_id=${soilHumiditySensor.id}&sort=${state.sort}&calibrated=${true}&limit=${state.limit}`,
    })
      .then(function (response) {
        setState({ ...state, soilData: response.data });
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false)
      });
  }

  const getIlluminanceSensorData = () => {
    const illums = sensors.filter(sensor => sensor.name === 'illuminanceSensor 1')
    const illuminanceSensor = illums[0]
    axios({
      method: 'get',
      url: `/sensors_data?device_id=${device.id}&sensor_id=${illuminanceSensor.id}&sort=${state.sort}&calibrated=${true}&limit=${state.limit}`,
    })
      .then(function (response) {
        setState({ ...state, illuminanceData: response.data });
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false)
      });
  }

  useEffect(() => {
    if (mounted) {
      fetchAll();
    }
    if (device) {
      setSensors(device.sensors);
    }
    if (sensors && allowed) {
      getHumidityData();
      getIlluminanceSensorData();
      getTemperatureData();
      getSoilHumidityData();

      allowed = false;
    }
    if (state.humidityData) {
      state.humidityData.forEach(element => {
        state.humVals.push(element.value);
        state.humTime.push(moment(element.timestamp).format('h:mm'));
      })
    }
    if (state.illuminanceData) {
      state.illuminanceData.forEach(element => {
        state.illumVals.push(element.value);
        state.illumTime.push(moment(element.timestamp).format('h:mm'));
      })
    }
    if (state.temperatureData) {
      state.temperatureData.forEach(element => {
        state.tempVals.push(element.value);
        state.tempTime.push(moment(element.timestamp).format('h:mm'));
      })
      console.log(state.tempVals, state.tempTime)
    }
    if (state.soilData) {
      state.soilData.forEach(element => {
        state.soilVals.push(element.value);
        state.soilTime.push(moment(element.timestamp).format('h:mm'));
      })
    }
    return function cleanup() {
      mounted = false
    }
  }, [device, sensors, state.humidityData, state.illuminanceData, state.temperatureData, state.soilData])

  return (
    <View testID="SettingsScreen" style={FULL}>
      <LoginWallpaper />
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
        <Header
          headerText="Statistics"
          leftIcon="dots"
          onLeftPress={goDrawer}
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />
        <Text style={[TITLE_WRAPPER, { fontSize: 19 }]}>Crop Data</Text>
        <View style={styles.hairline} />

        <ScrollView>
          <Text style={TITLE_WRAPPER}>Temperature Chart</Text>
          <View style={styles.hairline} />
          <View style={{ alignItems: 'center', marginTop: 15 }}>
            {state.tempVals &&
              <View style={{ height: 200, flexDirection: 'row', width: Dimensions.get('screen').width - 35, backgroundColor: '#ffffff', borderRadius: 10, elevation: 3 }}>
                <YAxis
                  data={state.tempVals}
                  contentInset={{ top: 20, bottom: 20 }}
                  svg={{
                    fill: 'black',
                    fontSize: 14,
                  }}
                  numberOfTicks={10}
                  formatLabel={(value) => `${value}ºC`}
                  style={{ marginLeft: 5 }}
                />
                <LineChart
                  style={{ flex: 1, marginLeft: 16 }}
                  data={state.tempVals}
                  
                  svg={{ stroke: 'rgb(134, 65, 244)' }}
                  contentInset={{ top: 20, bottom: 20, right: 20 }}
                >
                  <Grid />
                </LineChart>
              </View>
            }
          </View>
          <Text style={TITLE_WRAPPER}>Humidity Chart</Text>
          <View style={styles.hairline} />
          <View style={{ alignItems: 'center', marginTop: 15 }}>
            {state.humVals &&
              <View style={{ height: 200, flexDirection: 'row', width: Dimensions.get('screen').width - 35, backgroundColor: '#ffffff', borderRadius: 10, elevation: 3 }}>
                <YAxis
                  data={state.humVals}
                  contentInset={{ top: 20, bottom: 20 }}
                  svg={{
                    fill: 'black',
                    fontSize: 14,
                  }}
                  numberOfTicks={10}
                  formatLabel={(value) => `${value}%`}
                  style={{ marginLeft: 5 }}
                />
                <AreaChart
                  style={{ flex: 1, marginLeft: 16 }}
                  data={state.humVals}
                  svg={{ stroke: 'rgb(134, 65, 244)' }}
                  contentInset={{ top: 20, bottom: 20, right: 20 }}
                >
                  <Grid />
                </AreaChart>
              </View>
            }
          </View>

          <Text style={TITLE_WRAPPER}>Illuminance Chart</Text>
          <View style={styles.hairline} />
          <View style={{ alignItems: 'center', marginTop: 15 }}>
            {state.illumVals &&
              <View style={{ height: 200, flexDirection: 'row', width: Dimensions.get('screen').width - 35, backgroundColor: '#ffffff', borderRadius: 10, elevation: 3 }}>
                <YAxis
                  data={state.illumVals}
                  contentInset={{ top: 20, bottom: 20 }}
                  svg={{
                    fill: 'black',
                    fontSize: 14,
                  }}
                  numberOfTicks={10}
                  formatLabel={(value) => `${value}ºC`}
                  style={{ marginLeft: 5 }}
                />
                <LineChart
                  style={{ flex: 1, marginLeft: 16 }}
                  data={state.illumVals}
                  svg={{ stroke: 'rgb(134, 65, 244)' }}
                  contentInset={{ top: 20, bottom: 20, right: 20 }}
                >
                  <Grid />
                </LineChart>
              </View>
            }
          </View>

          <Text style={TITLE_WRAPPER}>Soil Humidity Chart</Text>
          <View style={styles.hairline} />
          <View style={{ alignItems: 'center', marginTop: 15, marginBottom: 20 }}>
            {state.soilVals &&
              <View style={{ height: 200, flexDirection: 'row', width: Dimensions.get('screen').width - 35, backgroundColor: '#ffffff', borderRadius: 10, elevation: 3 }}>
                <YAxis
                  data={state.soilVals}
                  contentInset={{ top: 20, bottom: 20 }}
                  svg={{
                    fill: 'black',
                    fontSize: 14,
                  }}
                  numberOfTicks={10}
                  formatLabel={(value) => `${value}%`}
                  style={{ marginLeft: 5 }}
                />
                <AreaChart
                  style={{ flex: 1, marginLeft: 16 }}
                  data={state.soilVals}
                  svg={{ stroke: 'rgb(134, 65, 244)' }}
                  contentInset={{ top: 20, bottom: 20, right: 20 }}
                >
                  <Grid />
                </AreaChart>
              </View>
            }
          </View>
        </ScrollView>
      </Screen>
    </View>
  );
}
const styles = StyleSheet.create({
  hairline: {
    borderBottomColor: color.cloud,
    borderBottomWidth: 1,
    marginHorizontal: 20,
    marginTop: 5,
    // paddingBottom: 30
  }
})
export default StatisticsScreen;