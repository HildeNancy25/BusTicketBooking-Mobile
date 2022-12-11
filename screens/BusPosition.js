import { View, Text, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState, useEffect } from "react";
import axios from "axios";
import { getItemAsync } from "expo-secure-store";

export default function BusPosition() {
  const [selectedPosition, setSelectedPosition] = useState("Station1");

  const updatePosition = () => {
    getItemAsync("userInfo").then((userInfo) => {
      axios({
        method: "PATCH",
        url: `https://busticketbooking.onrender.com/api/buses/updatePosition/${
          JSON.parse(userInfo).busId
        }`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          position: selectedPosition,
        },
      })
        .then((response) => {
          console.log(response.data);
          alert(`Bus updated to ${response.data.position}`);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

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
        Bus position
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
          selectedValue={selectedPosition}
          onValueChange={(itemValue) => setSelectedPosition(itemValue)}
        >
          <Picker.Item label="At Bus Station 1" value="Station1" />
          <Picker.Item label="At Bus Station 2" value="Station2" />
          <Picker.Item label="In Transit" value="inTransit " />
          <Picker.Item label="Out of Service" value="notInService" />
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
        <Button title="Update position" onPress={updatePosition} />
      </View>
    </View>
  );
}
