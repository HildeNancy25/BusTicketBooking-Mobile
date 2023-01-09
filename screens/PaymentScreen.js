import { View, Text, Button, TextInput, ActivityIndicator } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState, useEffect } from "react";
import axios from "axios";
import { getItemAsync } from "expo-secure-store";

export default function PaymentScreen(props) {
  const [bus, setBus] = useState();
  const [busStop, setBusStop] = useState();
  const [userId, setUserId] = useState();
  const [loading, setLoading] = useState(false);
  const [buses, setBuses] = useState();
  const { routeId, destinationStationId } = props.route.params;

  useEffect(() => {
    searchForBus();
    getItemAsync("userInfo").then((userInfo) => {
      setUserId(JSON.parse(userInfo)._id);
    });
  }, []);

  const searchForBus = () => {
    axios({
      method: "POST",
      url: "https://busticketbooking.onrender.com/api/buses/activeBuses",
      data: {
        routeId: routeId,
        destinationStationId: destinationStationId,
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setBuses(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const handlePayTicket = async () => {
    setLoading(true);
    axios({
      method: "POST",
      url: "https://busticketbooking.onrender.com/api/tickets/pay",
      data: {
        userId: userId,
        busId: bus,
        boardingPoint: busStop,
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setLoading(false);
        alert(response.data.message);
        props.navigation.navigate("Home");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        alert(error.message);
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
        <Picker selectedValue={bus} onValueChange={(value) => setBus(value)}>
          {buses?.map((item) => {
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
          paddingHorizontal: 20,
          paddingTop: 10,
        }}
      >
        <Text
          style={{
            fontSize: 17,
            fontWeight: "bold",
          }}
        >
          Bus Stop
        </Text>
        <TextInput
          value={busStop}
          style={{
            height: 50,
            borderColor: "black",
            borderWidth: 1,
            marginVertical: 10,
            paddingHorizontal: 10,
          }}
          multiline={true}
          keyboardType="default"
          onChangeText={(text) => setBusStop(text)}
          placeholder="Enter the bus stop you are boarding from"
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
        <Button title="Pay ticket" onPress={handlePayTicket} />
      </View>
    </View>
  );
}
