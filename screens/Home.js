import { View, Text, Button, ActivityIndicator } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home({ navigation }) {
  const [selectedRoute, setSelectedRoute] = useState();
  const [selectedDestination, setSelectedDestination] = useState();
  const [loading, setLoading] = useState(false);
  const [routes, setRoutes] = useState([]);
  const [destinations, setDestinations] = useState([]);

  const getBusRoutes = async () => {
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

  const getDestinations = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "https://busticketbooking.onrender.com/api/routes/busStations",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setDestinations(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchBus = () => {
    setLoading(true);
    axios({
      method: "POST",
      url: "https://busticketbooking.onrender.com/api/buses/activeBuses",
      data: {
        routeId: selectedRoute,
        destinationStationId: selectedDestination,
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setLoading(false);
        navigation.navigate("PaymentScreen", {
          routeId: selectedRoute,
          destinationStationId: selectedDestination,
        });
      })
      .catch((error) => {
        setLoading(false);
        alert("No buses available for selected journey");
        console.log(error);
      });
  };

  useEffect(() => {
    getBusRoutes();
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
        <Button title="Search for bus" onPress={handleSearchBus}></Button>
      </View>
    </View>
  );
}
