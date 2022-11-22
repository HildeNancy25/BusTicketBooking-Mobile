import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import HomeNavigator from "./homeNavigation";

const { Navigator, Screen } = createStackNavigator();

export default function AppNavigation() {
  return (
    <Navigator>
      <Screen name="Login" component={Login} />
      <Screen name="Signup" component={Signup} />
      <Screen
        options={{
          headerShown: false,
        }}
        name="HomeNavigation"
        component={HomeNavigator}
      />
    </Navigator>
  );
}
