import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Button,
} from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";
import { getItemAsync } from "expo-secure-store";
import moment from "moment";

export default function Passengers() {
  const [passengers, setPassengers] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPassengers();
  }, []);

  const markTicketUsed = (ticketId) => {
    setLoading(true);
    axios({
      method: "GET",
      url: `https://busticketbooking.onrender.com/api/tickets/ticketUsed/${ticketId}`,
      headers: {
        "Content-Type": "application/json",
      },

      data: {
        ticketId: passengers[0].ticketId,
      },
    })
      .then((response) => {
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const getPassengers = () => {
    setLoading(true);
    getItemAsync("userInfo")
      .then((userInfo) => {
        axios({
          method: "GET",
          url: `https://busticketbooking.onrender.com/api/tickets/getPassengers/${
            JSON.parse(userInfo).busId
          }`,
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            setLoading(false);
            setPassengers(response.data.passengers);
          })
          .catch((error) => {
            setLoading(false);
            console.log(error);
          });
      })
      .catch((error) => {
        setLoading(false);
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
      {passengers?.length === 0 && (
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
            You have no passengers
          </Text>
        </View>
      )}
      {passengers?.map((ticket) => (
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
          <Text>Passenger: {ticket.userId.name}</Text>
          <Text>Contact: {ticket.userId.contact}</Text>
          <Text>Boarding Point: {ticket.boardingPoint}</Text>
          <Text>
            Purchase Time:{" "}
            {moment(ticket.purchaseDate).format("DD/MM/YYYY HH:mm")}
          </Text>
          <Text>Price: {ticket.busId.fare} RWF</Text>
          <View
            style={{
              padding: 10,
            }}
          >
            <Button
              title="Mark Used"
              onPress={() => markTicketUsed(ticket._id)}
            />
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
