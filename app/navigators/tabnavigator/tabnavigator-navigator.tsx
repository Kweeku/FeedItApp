import {Image,View} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from "react";
import {HomeNavigator} from "../stack/stack-navigator"
import {StatisticsNavigator} from "../stack/stack-navigator"
import {ControlsNavigator} from "../stack/stack-navigator"
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { color } from "../../theme"
const Tab = createBottomTabNavigator();


const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
    tabBarOptions = {{
     activeTintColor: color.green,
     labelStyle: {
      fontSize: 12,
      fontWeight: '700'
    },

    }}
    >
      <Tab.Screen name="Home" component={HomeNavigator} 
      options={{tabBarIcon: () => <MaterialIcons name='roofing' size={26} color= {color.facebook}/>
        }} />
      <Tab.Screen name="Statistics" component = {StatisticsNavigator}
      options={{tabBarIcon: () => <MaterialIcons name='table-chart' size={26} color= {color.facebook}/>
    }}
      />
      <Tab.Screen name="Controls" component={ControlsNavigator} 
      options={{tabBarIcon: () => <MaterialIcons name='settings-remote' size={26} color= {color.facebook}/>
    }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;