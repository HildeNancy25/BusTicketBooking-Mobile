import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BusPosition from "../screens/BusPosition";
import Passengers from "../screens/Passengers";
import Driver from "../screens/Driver";
import { FontAwesome } from "@expo/vector-icons";

const { Navigator, Screen } = createBottomTabNavigator();

export default function DriverNavigation() {
  return (
    <Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Position") {
            iconName = focused ? "bus" : "bus";
          } else if (route.name === "Passengers") {
            iconName = focused ? "users" : "users";
          } else if (route.name === "Driver") {
            iconName = focused ? "user" : "user";
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Screen name="Position" component={BusPosition} />
      <Screen name="Passengers" component={Passengers} />
      <Screen name="Driver" component={Driver} />
    </Navigator>
  );
}
