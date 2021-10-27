import { color } from "../../../theme"
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
export const icons = {
  back: require("./arrow-left.png"),
  bullet: require("./bullet.png"),
  dots : require("./dots.png"),
  menu : require("./menu.png")
}

export type IconTypes = keyof typeof icons
