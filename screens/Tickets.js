import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { getItemAsync } from "expo-secure-store";
import moment from "moment";

export default function Tickets() {
  const [tickets, setTickets] = useState();
  const [loading, setLoading] = useState(false);

  console.log(tickets);

  useEffect(() => {
    getTickets();
  }, []);

  const getTickets = async () => {
    await getItemAsync("userInfo")
      .then((userInfo) => {
        setLoading(true);
        axios({
          method: "GET",
          url: `https://busticketbooking.onrender.com/api/tickets/user/${
            JSON.parse(userInfo)._id
          }`,
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            setTickets(response.data);
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
      {tickets?.length === 0 && (
        <View
          style={{
            margin: 20,
            padding: 15,
            elevation: 5,
            backgroundColor: "white",
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            You have no tickets
          </Text>
        </View>
      )}
      {tickets?.map((ticket) => (
        <View
          style={{
            margin: 20,
            padding: 15,
            elevation: 5,
            backgroundColor: "white",
            borderRadius: 10,
          }}
          key={ticket._id}
        >
          <Text>Bus: {ticket.busId.name}</Text>
          <Text>Driver: {ticket.busId?.driverId?.name}</Text>
          <Text>Boarding Point: {ticket.boardingPoint}</Text>
          <Text>
            Purchase Time:{" "}
            {moment(ticket.purchaseDate).format("DD/MM/YYYY HH:mm")}
          </Text>
          <Text>Price: {ticket.busId.fare} RWF</Text>
        </View>
      ))}
    </ScrollView>
  );
}
