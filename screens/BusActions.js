import { View, Text, Button, ScrollView } from "react-native";
import React from "react";

const BusActions = ({ navigation }) => {
  return (
    <ScrollView
      style={{
        display: "flex",
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        Select an action
      </Text>
      <View
        style={{
          marginBottom: 20,
        }}
      >
        <Button
          title="Add a new route"
          onPress={() => navigation.navigate("Register route")}
        />
      </View>
      <View
        style={{
          marginBottom: 20,
        }}
      >
        <Button
          title="Add a new Bus"
          onPress={() => navigation.navigate("Register bus")}
        />
      </View>
      <View
        style={{
          marginBottom: 20,
        }}
      >
        <Button
          title="Add a new bus station"
          onPress={() => navigation.navigate("Register bus station")}
        />
      </View>
    </ScrollView>
  );
};

export default BusActions;
