import {
  View,
  Text,
  Button,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { setItemAsync } from "expo-secure-store";

export default function RegisterDriver({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [busId, setBusId] = useState("");
  const [gender, setGender] = useState("Male");
  const [buses, setBuses] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getBuses();
  }, []);

  const getBuses = () => {
    axios({
      method: "GET",
      url: "https://busticketbooking.onrender.com/api/buses/",
    })
      .then((response) => {
        setBuses(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRegisterDriver = () => {
    setLoading(true);
    axios({
      method: "POST",
      url: "https://busticketbooking.onrender.com/api/drivers/addDriver",
      data: {
        name: fullName,
        email: email.toLowerCase(),
        password: password,
        busId,
        gender,
      },
    })
      .then((response) => {
        setLoading(false);
        console.log(response.data);
        alert("Driver registered successfuly");
        navigation.navigate("Driver Actions");
      })
      .catch((err) => {
        setLoading(false);
        alert("Registering driver failed, Try again");
        console.log(err);
      });
  };

  return (
    <ScrollView>
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
          Full name
        </Text>
        <TextInput
          style={{
            height: 50,
            borderColor: "gray",
            borderWidth: 1,
            marginVertical: 10,
            paddingLeft: 10,
          }}
          placeholder="Enter driver's full name"
          value={fullName}
          onChangeText={(text) => setFullName(text)}
        />
        <Text
          style={{
            fontSize: 17,
            fontWeight: "bold",
          }}
        >
          Email
        </Text>
        <TextInput
          style={{
            height: 50,
            borderColor: "gray",
            borderWidth: 1,
            marginVertical: 10,
            paddingLeft: 10,
          }}
          placeholder="Enter driver's email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Text
          style={{
            fontSize: 17,
            fontWeight: "bold",
          }}
        >
          Gender
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
            selectedValue={gender}
            onValueChange={(itemValue) => setGender(itemValue)}
          >
            <Picker.Item key={1} label="Male" value="Male" />
            <Picker.Item key={2} label="Female" value="Female" />
          </Picker>
        </View>
        <Text
          style={{
            fontSize: 17,
            fontWeight: "bold",
          }}
        >
          Bus
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
            selectedValue={busId}
            onValueChange={(itemValue) => setBusId(itemValue)}
          >
            {buses?.map((item) => {
              return (
                <Picker.Item
                  key={item._id}
                  label={`${item.name} - ${item.company}`}
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
          Password
        </Text>
        <TextInput
          style={{
            height: 50,
            borderColor: "gray",
            borderWidth: 1,
            marginVertical: 10,
            paddingLeft: 10,
          }}
          placeholder="Enter driver's password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
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
        <Button title="Register driver" onPress={handleRegisterDriver} />
      </View>
    </ScrollView>
  );
}
