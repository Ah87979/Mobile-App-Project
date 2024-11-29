import { React, useState, useEffect } from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { db } from "../config";
import { collection, onSnapshot, where, query } from "firebase/firestore";

const { width, height } = Dimensions.get("window");
const myFontSize = (width + height) * 0.02;

const History = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    getFlights();
  }, []);

  const getFlights = async () => {
    try {
      const q = query(collection(db, "flights"), where("bookedStatus", "==", true));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const itemsArray = [];
        querySnapshot.forEach((doc) => {
          itemsArray.push({ ...doc.data(), id: doc.id });
        });
        setFlights(itemsArray);
      });
      return unsubscribe;
    } catch (error) {
      console.error(error);
    }
  };

  const Flight = ({ item }) => (
    <View style={styles.flight}>
      <Text style={{marginHorizontal: 5}}>{item.flightNo}</Text>
      <Text style={{marginHorizontal: 5}}>{item.originAirportCode}</Text>
      <Text style={{marginHorizontal: 5}}>{"->"}</Text>
      <Text style={{marginHorizontal: 5}}>{item.destinationAirportCode}</Text>
      <Text style={{marginHorizontal: 5}}>{item.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={flights}
        renderItem={({ item }) => <Flight item={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  flight: {
    flexDirection: "row",
    marginVertical: 5,
    padding: 10,
    borderBottomWidth: 1,
    borderRadius: 10,
  },
  largeFont: {
    fontSize: myFontSize * 0.8,
  },
});
