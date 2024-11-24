import { StyleSheet, Dimensions, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { React, useState, useEffect } from 'react';
import { db } from '../config';
import { doc, setDoc, collection, onSnapshot, query } from "firebase/firestore";

const {width, height} = Dimensions.get('window');
const myFontSize = (width+height) * 0.02;

const writeThis = async() => {
    const docRef = doc(db, "flights", "atl-sea")
    await setDoc(docRef, {
        flightNo: "DL350",
        originCity: "Atlanta",
        originAirportCode: "ATL",
        destinationCity: "Seattle",
        destinationAirportCode: "SEA",
        departureTime: "14:45",
        arrivalTime: "17:50",
        ticketPrice: 280,
        seatingOptions: ["Economy", "Comfort+", "First Class"]
      })
    .then(() => { console.log('data submitted') })
    .catch((error) => { console.log(error.message) })
}

const Flights = ({ navigation }) => {

    const [flights, setFlights] = useState([]);

    useEffect(() => {
        getFlights();
    }, []);

    const getFlights = async () => {
        try {
            const q = query(collection(db, "flights"));
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
    }

    const Flight = ({item}) => (
        <View style={styles.flight}>
            <Text>{item.flightNo}</Text>
            <Text>{item.originAirportCode}</Text>
            <Text>{item.destinationAirportCode}</Text>
            <Text>{item.date}</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Info", {item: item})}><Text>View Flight Information</Text></TouchableOpacity>
        </View>
    );
    
    return (
        <View style={styles.container}>
            <Text>Available Flights</Text>
            <FlatList 
            data={flights} 
            renderItem={({item}) => <Flight item={item} />} 
            keyExtractor={item => item.id} 
            />
        </View>
    )
}

export default Flights

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flight: {
        backgroundColor: 'snow',
        marginVertical: 5,
    },
})
