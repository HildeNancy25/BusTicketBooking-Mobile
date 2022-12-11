import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BusActions from "../screens/BusActions";
import DriverActions from "../screens/DriverActions";
import BusPosition from "../screens/BusPosition";
import Passengers from "../screens/Passengers";
import Driver from "../screens/Driver";
import { FontAwesome } from "@expo/vector-icons";

const { Navigator, Screen } = createBottomTabNavigator();

export default function AdminNavigation() {
  return (
    <Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Bus Actions") {
            iconName = focused ? "bus" : "bus";
          } else if (route.name === "Driver Actions") {
            iconName = focused ? "users" : "users";
          } else if (route.name === "Admin") {
            iconName = focused ? "user" : "user";
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Screen name="Bus Actions" component={BusActions} />
      <Screen name="Driver Actions" component={DriverActions} />
      <Screen name="Admin" component={Driver} />
    </Navigator>
  );
}
