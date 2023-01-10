import {
  View,
  Button,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { deleteItemAsync, getItemAsync } from "expo-secure-store";

export default function Driver({ navigation }) {
  const [user, setUser] = useState();
  const [selectedPosition, setSelectedPosition] = useState();
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(user);

  useEffect(() => {
    getItemAsync("userInfo").then((userInfo) => {
      setUser(JSON.parse(userInfo));
    });
    getBuses();
  }, []);

  const getBuses = () => {
    setLoading(true);
    axios({
      method: "GET",
      url: "https://busticketbooking.onrender.com/api/buses/",
    })
      .then((response) => {
        setLoading(false);
        console.log(response.data);
        setBuses(response.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

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
        {user?.bus?.name}
      </Text>
      <Text
        style={{
          fontSize: 17,
          fontWeight: "bold",
          marginVertical: 10,
        }}
      >
        Bus position
      </Text>
      <View
        style={{
          marginHorizontal: 20,
          width: "80%",
          borderStyle: "solid",
          borderWidth: 1,
          borderColor: "gray",
        }}
      >
        <Picker
          selectedValue={selectedPosition}
          onValueChange={(itemValue) => setSelectedPosition(itemValue)}
        >
          {buses.map((bus) => {
            return (
              <Picker.Item key={bus._id} label={bus.name} value={bus._id} />
            );
          })}
        </Picker>
      </View>
      <View
        style={{
          marginVertical: 20,
          width: 200,
        }}
      >
        <Button title="Update" onPress={() => {}} />
      </View>

      <View
        style={{
          marginVertical: 40,
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
