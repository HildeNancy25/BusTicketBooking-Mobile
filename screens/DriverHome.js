import { View, Text, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [positions, setPositions] = useState();
  const [selectedPosition, setSelectedPosition] = useState();

  const getDestinations = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "https://busticketbooking.onrender.com/api/routes/busStations",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      setPositions(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDestinations();
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
          onValueChange={(itemValue) => setSelectedRoute(itemValue)}
        >
          {routes.map((item) => {
            return (
              <Picker.Item
                key={item._id}
                label={`${item.routeNumber} ${item.busStation1} - ${item.busStation2}`}
                value={item._id}
              />
            );
          })}
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
          {destinations.map((item) => {
            return (
              <Picker.Item
                key={item._id}
                label={`${item.name}`}
                value={item._id}
              />
            );
          })}
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
        <Button title="Search for bus" onPress={handleSearchBus} />
      </View>
    </View>
  );
}
