import { View, Text, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState, useEffect } from "react";
import axios from "axios";

export default function PaymentScreen(props) {
  const [selectedBus, setSelectedBus] = useState();
  const { buses } = props.route.params;
  console.log(buses);
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
        Select a bus
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
          selectedValue={selectedBus}
          onValueChange={(itemValue) => setSelectedBus(itemValue)}
        >
          {buses.map((item) => {
            return (
              <Picker.Item
                key={item._id}
                label={`${item.name} - ${item.fare} RWF`}
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
        <Button title="Pay ticket" />
      </View>
    </View>
  );
}
