import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import HomeNavigator from "./homeNavigation";
import DriverNavigation from "./driverNavigation";
import AdminNavigation from "./adminNavigation";
import PaymentScreen from "../screens/PaymentScreen";
import PurchaseHistory from "../screens/PurchaseHistory";
import RegisterRoute from "../screens/RegisterRoute";
import RegisterBus from "../screens/RegisterBus";
import RegisterBusStation from "../screens/RegisterBusStation";
import RegisterDriver from "../screens/RegisterDriver";
import ViewDrivers from "../screens/ViewDrivers";
import ViewBuses from "../screens/ViewBuses";
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
          getItemAsync("role").then((role) => {
            if (role === "driver") {
              navigation.navigate("DriverNavigation");
            }
            if (role === "user") {
              navigation.navigate("HomeNavigation");
            }
            if (role === "admin") {
              navigation.navigate("AdminNavigation");
            }
          });
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
      <Screen
        options={{
          headerShown: false,
        }}
        name="DriverNavigation"
        component={DriverNavigation}
      />
      <Screen
        options={{
          headerShown: false,
        }}
        name="AdminNavigation"
        component={AdminNavigation}
      />
      <Screen name="PaymentScreen" component={PaymentScreen} />
      <Screen name="PurchaseHistory" component={PurchaseHistory} />
      <Screen name="Register route" component={RegisterRoute} />
      <Screen name="Register bus" component={RegisterBus} />
      <Screen name="Register bus station" component={RegisterBusStation} />
      <Screen name="Register driver" component={RegisterDriver} />
      <Screen name="View drivers" component={ViewDrivers} />
      <Screen name="View buses" component={ViewBuses} />
    </Navigator>
  );
}
