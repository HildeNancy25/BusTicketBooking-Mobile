import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Tickets from "../screens/Tickets";
import Profile from "../screens/Profile";
import { FontAwesome } from "@expo/vector-icons";

const { Navigator, Screen } = createBottomTabNavigator();

export default function HomeNavigator() {
  return (
    <Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home";
          } else if (route.name === "Tickets") {
            iconName = focused ? "ticket" : "ticket";
          } else if (route.name === "Profile") {
            iconName = focused ? "user" : "user";
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Screen name="Home" component={Home} />
      <Screen name="Tickets" component={Tickets} />
      <Screen name="Profile" component={Profile} />
    </Navigator>
  );
}
