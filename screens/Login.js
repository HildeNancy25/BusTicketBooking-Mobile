import { View, Text, Button } from "react-native";

export default function Login({ navigation }) {
  return (
    <View>
      <Text>Login Screen</Text>
      <Button title="Go to SignUp" onPress={() => navigation.navigate("Signup")} />
    </View>
  );
}
