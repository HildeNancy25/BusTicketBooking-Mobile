import { View, Text, TextInput, Button } from "react-native";
import axios from "axios";
import { useState } from "react";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    console.log("email", email);
    console.log("password", password);
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:8000/api/auth/login",
        data: {
          email: email,
          password: password,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("response", response.data);
    } catch (error) {
      console.log(error.message);
    }
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
