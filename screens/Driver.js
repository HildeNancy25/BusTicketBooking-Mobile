import { View, Button, Text, Image, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { deleteItemAsync, getItemAsync } from "expo-secure-store";

export default function Driver({ navigation }) {
  const [user, setUser] = useState();
  console.log(user);

  useEffect(() => {
    getItemAsync("userInfo").then((userInfo) => {
      setUser(JSON.parse(userInfo));
    });
  }, []);

  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../assets/avatar.png")}
        style={{ width: 80, height: 80, borderRadius: 50, marginVertical: 20 }}
      />
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        {user?.name}
      </Text>
      <Text
        style={{
          fontSize: 17,
          marginVertical: 10,
        }}
      >
        {user?.email}
      </Text>
      <Text
        style={{
          fontSize: 17,
          marginVertical: 5,
        }}
      >
        {user?.contact}
      </Text>
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
