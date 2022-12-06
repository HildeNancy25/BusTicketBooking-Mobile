import { View, Button } from "react-native";
import { deleteItemAsync } from "expo-secure-store";

export default function Driver({ navigation }) {
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          marginVertical: 20,
          width: 200,
          alignSelf: "center",
          backgroundColor: "blue",
        }}
      >
        <Button
          title="Logout"
          onPress={() => {
            deleteItemAsync("token");
            deleteItemAsync("role");
            navigation.navigate("Login");
          }}
        />
      </View>
    </View>
  );
}
