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

export default function RegisterRoute({ navigation }) {
  const [busStation1, setBusStation1] = useState("");
  const [busStation2, setBusStation2] = useState("");
  const [routeNumber, setRouteNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const handleAddRoute = () => {
    setLoading(true);
    axios({
      method: "POST",
      url: "https://busticketbooking.onrender.com/api/routes/addRoute",
      data: {
        busStation1,
        busStation2,
        routeNumber,
      },
    })
      .then((response) => {
        setLoading(false);
        console.log(response.data);
        alert("Route created successfuly");
        navigation.navigate("Bus Actions");
      })
      .catch((err) => {
        setLoading(false);
        alert("Creating route failed, Try again");
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
          Bus station 1
        </Text>
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            marginVertical: 10,
            paddingLeft: 10,
          }}
          placeholder="Enter the bus station 1"
          value={busStation1}
          onChangeText={(text) => setBusStation1(text)}
        />
        <Text
          style={{
            fontSize: 17,
            fontWeight: "bold",
          }}
        >
          Bus station 2
        </Text>
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            marginVertical: 10,
            paddingLeft: 10,
          }}
          placeholder="Enter the second bus station"
          value={busStation2}
          onChangeText={(text) => setBusStation2(text)}
        />
        <Text
          style={{
            fontSize: 17,
            fontWeight: "bold",
          }}
        >
          Route number
        </Text>
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            marginVertical: 10,
            paddingLeft: 10,
          }}
          placeholder="Enter the route number"
          value={routeNumber}
          onChangeText={(text) => setRouteNumber(text)}
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
        <Button title="Add Route" onPress={handleAddRoute} />
      </View>
    </ScrollView>
  );
}
