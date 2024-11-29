import { StyleSheet, Button, Dimensions, SafeAreaView, Text, FlatList, View } from 'react-native';
import { React, useState, useEffect } from 'react';
import { db } from "../config";
import { collection, doc, onSnapshot, updateDoc, where, query } from "firebase/firestore";

const {width, height} = Dimensions.get('window');
const myFontSize = (width+height) * 0.02;

const Home = ({ navigation }) => {

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
    }

    const cancel = async (flightId) => {
        try {
            const flightDocRef = doc(db, 'flights', flightId);
            await updateDoc(flightDocRef, { bookedStatus: false });
            console.log('Document successfully updated!');
            return { success: true };
        } catch (error) {
            console.error(error);
        }
    }

    const Flight = ({item}) => (
        <View style={styles.flight}>
            <Text>{item.flightNo}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 150}}>
                <Text style={styles.largeFont}>{item.originAirportCode}</Text>
                <Text style={styles.largeFont}>{'->'}</Text>
                <Text style={styles.largeFont}>{item.destinationAirportCode}</Text>
            </View>
            <Text>{item.date}</Text>
            <Button title="Cancel Booking" onPress={() => cancel(item.id)} />
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.header}>My Flights</Text>
            </View>
            <View>
            <FlatList 
                data={flights} 
                renderItem={({item}) => <Flight item={item} />} 
                keyExtractor={item => item.id} 
            />
            </View>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    header: {
        fontSize: myFontSize * 0.7,
        marginHorizontal: 10,
        marginVertical: 5,
    },
    flight: {
        backgroundColor: 'cyan',
        margin: 5,
        padding: 10,
        borderRadius: 10,
    },
    largeFont: {
        fontSize: myFontSize * 0.8,
    },
})
