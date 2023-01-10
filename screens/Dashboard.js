import {
  View,
  Button,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import { deleteItemAsync, getItemAsync } from "expo-secure-store";

export default function Dashboard({ navigation }) {
  const [user, setUser] = useState();

  useEffect(() => {
    getItemAsync("userInfo").then((userInfo) => {
      setUser(JSON.parse(userInfo));
    });
  }, []);

  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          marginVertical: 20,
        }}
      >
        Analytics of the app
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "wrap",
          width: "100%",
        }}
      >
        <View
          style={{
            width: "45%",
            height: 200,
            backgroundColor: "#fff",
            marginVertical: 10,
            marginHorizontal: 5,
            borderRadius: 10,
            padding: 10,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Total number of users
          </Text>
          <Text
            style={{
              fontSize: 36,
              fontWeight: "bold",
              color: "blue",
              textAlign: "center",
              marginVertical: 35,
            }}
          >
            100
          </Text>
        </View>
        <View
          style={{
            width: "45%",
            height: 200,
            backgroundColor: "#fff",
            marginVertical: 10,
            marginHorizontal: 5,
            borderRadius: 10,
            padding: 10,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            New sign ups
          </Text>
          <Text
            style={{
              fontSize: 36,
              fontWeight: "bold",
              color: "blue",
              textAlign: "center",
              marginVertical: 35,
            }}
          >
            8
          </Text>
        </View>
        <View
          style={{
            width: "45%",
            height: 200,
            backgroundColor: "#fff",
            marginVertical: 10,
            marginHorizontal: 5,
            borderRadius: 10,
            padding: 10,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Buses in transit
          </Text>
          <Text
            style={{
              fontSize: 36,
              fontWeight: "bold",
              color: "blue",
              textAlign: "center",
              marginVertical: 35,
            }}
          >
            2
          </Text>
        </View>
        <View
          style={{
            width: "45%",
            height: 200,
            backgroundColor: "#fff",
            marginVertical: 10,
            marginHorizontal: 5,
            borderRadius: 10,
            padding: 10,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Payments made
          </Text>
          <Text
            style={{
              fontSize: 36,
              fontWeight: "bold",
              color: "blue",
              textAlign: "center",
              marginVertical: 35,
            }}
          >
            20
          </Text>
        </View>
      </View>
    </View>
  );
}
