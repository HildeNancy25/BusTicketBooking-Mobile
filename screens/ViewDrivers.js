import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";

const ViewDrivers = () => {
  const [drivers, setDrivers] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDrivers();
  }, []);

  const getDrivers = () => {
    setLoading(true);
    axios({
      method: "GET",
      url: "https://busticketbooking.onrender.com/api/drivers/",
    })
      .then((response) => {
        setLoading(false);
        console.log(response.data);
        setDrivers(response.data);
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
      {drivers?.map((item) => {
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
            <Text>Full Name:{item.name}</Text>
            <Text>Email: {item.email}</Text>
            <Text>Bus Id: {item.busId}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default ViewDrivers;
