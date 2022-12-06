import { View, Text, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState, useEffect } from "react";
import axios from "axios";

export default function BusPosition() {
  const [selectedPosition, setSelectedPosition] = useState();

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
        <Button title="Update position" />
      </View>
    </View>
  );
}
