import { View, Text, Button, ScrollView } from "react-native";
import axios from "axios";

const DriverActions = ({ navigation }) => {

  const getDrivers = () => {
    axios({
      method: "GET",
      url: ""
    })
  }

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
          title="Add a new driver"
          onPress={() => navigation.navigate("Register driver")}
        />
      </View>
      <View
        style={{
          marginBottom: 20,
        }}
      >
        <Button
          title="View all drivers"
          onPress={() => navigation.navigate("View drivers")}
        />
      </View>
    </ScrollView>
  );
};

export default DriverActions;
