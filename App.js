import { NavigationContainer } from "@react-navigation/native";
import AppNavigation from "./navigation/appNavigation";

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigation />
    </NavigationContainer>
  );
}
