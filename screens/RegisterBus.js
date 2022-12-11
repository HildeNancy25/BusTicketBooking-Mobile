import {
  View,
  Text,
  Button,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import { setItemAsync } from "expo-secure-store";

export default function RegisterBus({ navigation }) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [fare, setFare] = useState();
  const [routeNumber, setRouteNumber] = useState("");
  const [routes, setRoutes] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getRoutes();
  }, []);

  const getRoutes = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "https://busticketbooking.onrender.com/api/routes/",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setRoutes(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegisterBus = () => {
    setLoading(true);
    axios({
      method: "POST",
      url: "https://busticketbooking.onrender.com/api/buses/addBus",
      data: {
        name,
        company,
        routeId: routeNumber,
        fare,
      },
    })
      .then((response) => {
        setLoading(false);
        console.log(response.data);
        alert("New bus created successfuly");
        navigation.navigate("Bus Actions");
      })
      .catch((err) => {
        setLoading(false);
        alert("Creating bus failed, Try again");
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
          Name/Plate
        </Text>
        <TextInput
          style={{
            height: 50,
            borderColor: "gray",
            borderWidth: 1,
            marginVertical: 10,
            paddingLeft: 10,
          }}
          placeholder="Enter the licence plate of the bus"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Text
          style={{
            fontSize: 17,
            fontWeight: "bold",
          }}
        >
          Company
        </Text>
        <TextInput
          style={{
            height: 50,
            borderColor: "gray",
            borderWidth: 1,
            marginVertical: 10,
            paddingLeft: 10,
          }}
          placeholder="Enter the company that owns the bus"
          value={company}
          onChangeText={(text) => setCompany(text)}
        />
        <Text
          style={{
            fontSize: 17,
            fontWeight: "bold",
          }}
        >
          Route
        </Text>
        <View
          style={{
            borderStyle: "solid",
            borderWidth: 1,
            borderColor: "gray",
            marginVertical: 10,
          }}
        >
          <Picker
            selectedValue={routeNumber}
            onValueChange={(itemValue) => setRouteNumber(itemValue)}
          >
            {routes?.map((item) => {
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
          }}
        >
          Fare/Price
        </Text>
        <TextInput
          style={{
            height: 50,
            borderColor: "gray",
            borderWidth: 1,
            marginVertical: 10,
            paddingLeft: 10,
          }}
          placeholder="Enter the price of the journey"
          value={fare}
          onChangeText={(text) => setFare(text)}
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
        <Button title="Add Bus" onPress={handleRegisterBus} />
      </View>
    </ScrollView>
  );
}
