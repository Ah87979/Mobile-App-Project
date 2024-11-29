import { StyleSheet, Dimensions, FlatList, Text, View, Button } from 'react-native';
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
        <View style={[styles.flight, {backgroundColor: item.bookedStatus ? 'cyan' : 'gray'}]}>
            <Text>{item.flightNo}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 150}}>
                <Text style={styles.largeFont}>{item.originAirportCode}</Text>
                <Text style={styles.largeFont}>{'->'}</Text>
                <Text style={styles.largeFont}>{item.destinationAirportCode}</Text>
            </View>
            <Text>{item.date}</Text>
            <Button title="View Flight Info" onPress={() => navigation.navigate("Info", {item: item})} />
        </View>
    );
    
    return (
        <View style={styles.container}>
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
        marginVertical: 5,
        padding: 10,
        borderRadius: 10,
    },
    largeFont: {
        fontSize: myFontSize * 0.8,
    },
})
