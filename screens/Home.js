import { View, Text, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [selectedRoute, setSelectedRoute] = useState();
  const [selectedDestination, setSelectedDestination] = useState();

  const getBusRoutes = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "http://localhost:8000/api/routes/",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("response", response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBusRoutes();
  }, []);

  return (
    <View>
      <Text
        style={{
          fontSize: 17,
          fontWeight: "bold",
          marginLeft: 20,
          marginVertical: 10,
        }}
      >
        Select your route
      </Text>
      <View
        style={{
          marginHorizontal: 20,
          borderStyle: "solid",
          borderWidth: 1,
          borderColor: "gray",
        }}
      >
        <Picker
          selectedValue={selectedRoute}
          onValueChange={(itemValue, itemIndex) => setSelectedRoute(itemValue)}
        >
          <Picker.Item label="Nyanza - Downtown" value="java" />
          <Picker.Item label="Nyanza - Nyabugogo" value="js" />
        </Picker>
      </View>
      <Text
        style={{
          fontSize: 17,
          fontWeight: "bold",
          marginLeft: 20,
          marginVertical: 10,
        }}
      >
        Select your destination
      </Text>
      <View
        style={{
          marginHorizontal: 20,
          borderStyle: "solid",
          borderWidth: 1,
          borderColor: "gray",
        }}
      >
        <Picker
          selectedValue={selectedDestination}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedDestination(itemValue)
          }
        >
          <Picker.Item label="Nyanza" value="java" />
          <Picker.Item label="Downtown" value="js" />
          <Picker.Item label="Nyabugogo" value="js" />
        </Picker>
      </View>
      <View
        style={{
          marginVertical: 20,
          width: 200,
          alignSelf: "center",
          backgroundColor: "blue",
        }}
      >
        <Button title="Search for bus" />
      </View>
    </View>
  );
}
