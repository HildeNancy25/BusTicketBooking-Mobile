import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Tickets from "../screens/Tickets";
import Profile from "../screens/Profile";

const { Navigator, Screen } = createBottomTabNavigator();

export default function HomeNavigator() {
  return (
    <Navigator>
      <Screen name="Home" component={Home} />
      <Screen name="Tickets" component={Tickets} />
      <Screen name="Profile" component={Profile} />
    </Navigator>
  );
}
