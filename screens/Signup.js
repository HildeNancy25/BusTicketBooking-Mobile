import { View, Text, Button, TextInput } from "react-native";

export default function Signup({ navigation }) {
  return (
    <View>
      <Text>Signup Screen</Text>
      <TextInput placeholder="Email" />
      <TextInput placeholder="Password" />
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate("HomeNavigation")}
      />
    </View>
  );
}
