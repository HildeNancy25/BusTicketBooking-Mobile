import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { getItemAsync } from "expo-secure-store";
import moment from "moment";

export default function PurchaseHistory() {
  const [purchaseHistory, setPurchaseHistory] = useState();
  const [loading, setLoading] = useState(false);

  console.log(purchaseHistory);

  useEffect(() => {
    getPurchaseHistory();
  }, []);

  const getPurchaseHistory = async () => {
    await getItemAsync("userInfo")
      .then((userInfo) => {
        setLoading(true);
        axios({
          method: "GET",
          url: `https://busticketbooking.onrender.com/api/tickets/purchaseHistory/${
            JSON.parse(userInfo)._id
          }`,
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            setPurchaseHistory(response.data);
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
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
      {purchaseHistory?.map((item) => (
        <View
          style={{
            margin: 20,
            padding: 15,
            elevation: 5,
            backgroundColor: "white",
            borderRadius: 10,
          }}
          key={item._id}
        >
          <Text>Bus: {item.busId.name}</Text>
          <Text>Driver: {item.busId?.driverId?.name}</Text>
          <Text>Boarding Point: {item.boardingPoint}</Text>
          <Text>
            Purchase Time:{" "}
            {moment(item.purchaseDate).format("DD/MM/YYYY HH:mm")}
          </Text>
          <Text>Price: {item.busId.fare} RWF</Text>
        </View>
      ))}
    </ScrollView>
  );
}
