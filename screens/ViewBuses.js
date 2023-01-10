import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Button,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";

const ViewBuses = () => {
  const [buses, setBuses] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getBuses();
  }, []);

  const deleteBus = (id) => {
    setLoading(true);
    console.log(id);
    axios({
      method: "DELETE",
      url: `https://busticketbooking.onrender.com/api/buses/${id}`,
    })
      .then(() => {
        setLoading(false);
        alert("Bus removed");
        getBuses();
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const getBuses = () => {
    setLoading(true);
    axios({
      method: "GET",
      url: "https://busticketbooking.onrender.com/api/buses/",
    })
      .then((response) => {
        setLoading(false);
        console.log(response.data);
        setBuses(response.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <ScrollView>
      {loading && (
        <ActivityIndicator
          size={30}
          color="blue"
          style={{
            marginTop: 20,
          }}
        />
      )}
      {buses?.map((item) => {
        return (
          <View
            style={{
              backgroundColor: "white",
              margin: 20,
              padding: 10,
              borderRadius: 10,
              elevation: 3,
            }}
            key={item._id}
          >
            <Text>Number Plate:{item.name}</Text>
            <Text>Company: {item.company}</Text>
            <Text>Fare price: {item.fare} RWF</Text>
            <Button title="Remove" onPress={() => deleteBus(item._id)} />
          </View>
        );
      })}
    </ScrollView>
  );
};

export default ViewBuses;
