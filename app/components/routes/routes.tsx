import HomeScreen from "../../screens/home/home-screen"
import SettingsScreen from "../../screens/settings/settings-screen"
import ControlsScreen from '../../screens/controls/controls-screen'
import MyTabs from '../../navigators/tabnavigator/tabnavigator-navigator'

const Routes = [
  {
    name: 'HomeScreen',
    screen: HomeScreen,
    navigationOptions: {
      headershown: false,
    },
  },
  {
    name: 'SettingsScreen',
    screen: SettingsScreen,
    navigationOptions: {
      headershown: false,
    },
  },
  {
    name: 'ControlsScreen',
    screen: ControlsScreen,
    navigationOptions: {
      headershown: false,
    },
  },
  {
    name: 'Tabs',
    screen: MyTabs,
    navigationOptions: {
      headershown: false,
    },
  },
];

export default Routes;