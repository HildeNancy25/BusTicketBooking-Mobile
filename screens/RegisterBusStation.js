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

export default function RegisterBusStation({ navigation }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddBusStation = () => {
    setLoading(true);
    axios({
      method: "POST",
      url: "https://busticketbooking.onrender.com/api/routes/addBusStation",
      data: {
        name,
      },
    })
      .then((response) => {
        setLoading(false);
        console.log(response.data);
        alert("New bus station created successfuly");
        navigation.navigate("Bus Actions");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        alert("Creating station failed, Try again");
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
          Bus station name
        </Text>
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            marginVertical: 10,
            paddingLeft: 10,
          }}
          placeholder="Enter the bus stations name"
          value={name}
          onChangeText={(text) => setName(text)}
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
        <Button title="Add station" onPress={handleAddBusStation} />
      </View>
    </ScrollView>
  );
}
