import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import HomeNavigator from "./homeNavigation";
import PaymentScreen from "../screens/PaymentScreen";
import { useNavigation } from "@react-navigation/native";
import { getItemAsync } from "expo-secure-store";
import { useEffect } from "react";

const { Navigator, Screen } = createStackNavigator();

export default function AppNavigation() {
  const navigation = useNavigation();

  useEffect(() => {
    getItemAsync("token")
      .then((res) => {
        if (res) {
          navigation.navigate("HomeNavigation");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
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
      <Screen name="PaymentScreen" component={PaymentScreen} />
    </Navigator>
  );
}
