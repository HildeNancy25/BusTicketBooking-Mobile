import { View, Text, TextInput, Button } from "react-native";
import axios from "axios";
import { useState } from "react";
import { setItemAsync } from "expo-secure-store";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    console.log("email", email);
    console.log("password", password);
    axios({
      method: "post",
      url: "https://busticketbooking.onrender.com/api/auth/login",
      data: {
        email: email.toLowerCase(),
        password: password,
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setItemAsync("token", response.data.token);
        console.log("response", response.data);
      })
      .then(() => {
        navigation.navigate("HomeNavigation");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View>
      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: 50,
        }}
      >
        <Text
          style={{
            fontSize: 17,
            fontWeight: "bold",
          }}
        >
          Email
        </Text>
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            marginVertical: 10,
            paddingLeft: 10,
          }}
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)}
          placeholder="Enter your email"
        />
        <Text
          style={{
            fontSize: 17,
            fontWeight: "bold",
          }}
        >
          Password
        </Text>
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            marginVertical: 10,
            paddingLeft: 10,
          }}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          placeholder="Enter your password"
        />
      </View>
      <View
        style={{
          marginVertical: 20,
          width: 200,
          alignSelf: "center",
        }}
      >
        <Button title="Login" onPress={handleLogin} />
      </View>

      <Text
        style={{
          alignSelf: "center",
          color: "blue",
        }}
        onPress={() => navigation.navigate("Signup")}
      >
        Don't have an account? Sign up
      </Text>
    </View>
  );
}
