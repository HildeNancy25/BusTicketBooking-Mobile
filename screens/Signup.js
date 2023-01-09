import {
  View,
  Text,
  Button,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import axios from "axios";
import { setItemAsync } from "expo-secure-store";

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSignUp = () => {
    setLoading(true);
    axios({
      method: "POST",
      url: "https://busticketbooking.onrender.com/api/auth/register",
      data: {
        email: email.toLowerCase(),
        name: fullName,
        contact: phoneNumber,
        password: password,
      },
    })
      .then((response) => {
        setLoading(false);
        console.log(response.data);
        setItemAsync("token", response.data.token);
        setItemAsync("role", response.data.role);
        setItemAsync("userInfo", JSON.stringify(response.data.user));
        navigation.navigate("HomeNavigation");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <ScrollView>
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
          Full name
        </Text>
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            marginVertical: 10,
            paddingLeft: 10,
          }}
          placeholder="Enter your email"
          value={fullName}
          onChangeText={(text) => setFullName(text)}
        />
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
          placeholder="Enter your password"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Text
          style={{
            fontSize: 17,
            fontWeight: "bold",
          }}
        >
          Phone number
        </Text>
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            marginVertical: 10,
            paddingLeft: 10,
          }}
          placeholder="Enter your password"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
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
          placeholder="Enter your password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
      </View>
      {loading && (
        <ActivityIndicator
          size={30}
          color="blue"
          style={{
            marginTop: 20,
          }}
        />
      )}
      <View
        style={{
          marginVertical: 20,
          width: 200,
          alignSelf: "center",
          backgroundColor: "blue",
        }}
      >
        <Button title="Signup" onPress={handleSignUp} />
      </View>

      <Text
        style={{
          alignSelf: "center",
          color: "blue",
        }}
        onPress={() => navigation.navigate("Login")}
      >
        Already have an account? Login
      </Text>
    </ScrollView>
  );
}
