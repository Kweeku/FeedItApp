import React from 'react';
import { Image, View, useWindowDimensions, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { EvilIcons, AntDesign } from '@expo/vector-icons';
import SettingsScreen from "../../screens/settings/settings-screen";
import LoginScreen from "../../screens/login/login-screen";
import LogoutScreen from "../../screens/logout/logout-screen";
import TabNavigator from "../../navigators/tabnavigator/tabnavigator-navigator"
import { MaterialIcons } from '@expo/vector-icons';
import { color, typography } from "../../theme";
import AsyncStorage from '@react-native-async-storage/async-storage'

const Drawer = createDrawerNavigator();


export default function DrawerNavigation() {
  const dimensions = useWindowDimensions();

  let isLoggedIn = '';
  let username = '';

  const getSavedUsername = async () => {
    try {
      username = await AsyncStorage.getItem('username') || '';
    } catch (error) {
      console.log("Error retrieving data" + error);
    }
  };
  const getLoginKey = React.useCallback(async () => {
    try {
      isLoggedIn = await AsyncStorage.getItem('@isLoggedIn') || '';
    } catch (error) {
      console.log("Error retrieving data" + error);
    }
  }, [AsyncStorage]);

  const BoxContainer = props => {
    return(
      <View
      style={{...styles.boxContainer,...props.style}}>
        {props.children}
      </View>
    )
  }

  React.useEffect(() => {
    getLoginKey();
    getSavedUsername();
  }, [getLoginKey, getSavedUsername]
  )
  console.log(isLoggedIn)

  return (
    <Drawer.Navigator
      drawerContent={props => customDrawerContent(props, username,BoxContainer)}
      drawerType={dimensions.width >= 768 ? 'permanent' : 'front'}
      drawerStyle={{
        backgroundColor: color.white
      }}
      initialRouteName={isLoggedIn === 'true' ?  'home' : 'login'}
    >
      <Drawer.Screen name="home" component={TabNavigator}
        options={{
          drawerIcon: () =>
          (<View >
            <Image source={require("../../components/images/DrawerLogo.jpg")}
              style={{
                resizeMode: 'cover',
                height: 120,
                width: 245,
                borderColor: color.palette.black,
                borderRadius: 0,
                alignContent: 'center',
              }}

            />
          </View>)
        }}
      />
      <Drawer.Screen name="login" component={LoginScreen} options={{
        drawerLabel: () =>
          <View>
            <Text style={styles.DrawerTextColor}>
              Login
            </Text>
          </View>,
        drawerIcon: () => <MaterialIcons name='login' size={26} color={color.palette.white} />
      }}
      />
      <Drawer.Screen name="settings" component={SettingsScreen} options={{
        drawerLabel: () =>
          <View>
            <Text style={styles.DrawerTextColor}>
              Settings
            </Text>
          </View>,
        drawerIcon: () => <MaterialIcons name='settings' size={26} color={color.palette.white} />
      }} />

      <Drawer.Screen name="logout" component={LogoutScreen} options={{
        drawerLabel: () =>
          <View>
            <Text style={styles.DrawerTextColor}>
              Logout
            </Text>
          </View>,
        drawerIcon: () => <MaterialIcons name='logout' size={26} color={color.palette.white} />
      }} />

    </Drawer.Navigator>
  )
}

const customDrawerContent = (props, username, BoxContainer) => {

  const clearLoginKey = async () => {
    try {
      AsyncStorage.clear()
      console.log('Storage successfully cleared!')
    } catch (error) {
      console.log('Failed to clear the async storage.')
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: '90%' }}>

        <DrawerContentScrollView {...props}>
          <View >
            <Image source={require("../../components/images/DrawerLogo.jpg")}
              style={{
                resizeMode: 'contain',
                height: 150,
                width: 275,
                borderColor: color.palette.black,
                borderRadius: 0,
                alignContent: 'center',
              }}

            />
          </View>

          {username !== '' &&
            <View style={styles.welcomeContainer}>
              {/* <Text style={styles.welcomeText}>Welcome</Text> */}
              <BoxContainer style={styles.container}>
              <Text style={styles.userText}>{username}</Text>
              </BoxContainer>
            </View>
          }


          <TouchableOpacity style={styles.contactUsContainer} onPress={() => props.navigation.navigate('home')}>
            <AntDesign name={'home'} size={35} color={color.green} />
            <Text style={styles.drawerText}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactUsContainer} onPress={() => props.navigation.navigate('settings')}>
            <MaterialIcons name={'settings'} size={35} color={color.green} />

            <Text style={styles.drawerText}>Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity
        style={styles.contactUsContainer}
        onPress={() => {
          // props.navigation.navigate('login');
          props.navigation.reset({
            index: 0,
            routes:[{name: 'login'}]
          })
          clearLoginKey();
        }}>
           <MaterialIcons name={'logout'} size={35} color={color.green} />
        <Text style={styles.drawerText}>Sign Out</Text>
      </TouchableOpacity>
        </DrawerContentScrollView>
      </View>


    </View>
  )
}

const styles = StyleSheet.create({
  DrawerTextColor: {
    color: color.green,
    fontWeight: 'bold',
    fontFamily: typography.secondary,
    fontSize: 16
  },
  contactUsContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    alignItems: 'center',
    paddingLeft: 15
  },
  logoutContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  welcomeContainer: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40
  },
  drawerText: {
    marginLeft: 16,
    color: color.green,
    fontSize: 18
  },
  userText:{
    marginLeft: 16,
    color: color.white,
    fontSize: 18
  },
  welcomeText: {
    marginLeft: 16,
    color: 'black',
    fontSize: 20,
    marginBottom: 10
  },
  logoutText: {
    color: color.green,
    fontSize: 18
  },
  boxContainer:{ 
    shadowColor: '#000',
    shadowOffset: {width: 0, height:2},
    shadowOpacity: 0.8,
    shadowRadius:2,
    height: 100,
    // margin: 20,
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  container:{
    backgroundColor: color.palette.lightGrey,
    height: 40,
    borderColor: color.green,
    resizeMode: 'contain',
    alignItems: 'stretch',
    alignContent: 'center',
    borderWidth: 20
  }
}
);