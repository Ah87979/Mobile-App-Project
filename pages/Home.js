import { StyleSheet, Dimensions, SafeAreaView, Text, FlatList, View } from 'react-native';
import { React, useEffect } from 'react';
import { db } from "../config";
import { collection, doc, where, onSnapshot } from "firebase/firestore";

const {width, height} = Dimensions.get('window');
const myFontSize = (width+height) * 0.02;

const Home = () => {

    const [flights, setFlights] = useState([]);

    useEffect(() => {
        const unsubscribe = collection('flights')
        .where('status', '==', 'booked')
        .onSnapshot(querySnapshot => {
            const flightsList = [];
            querySnapshot.forEach(doc => {
            flightsList.push({ id: doc.id, ...doc.data() });
            });
            setFlights(flightsList);
        });
        return () => unsubscribe();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.header}>My Flights</Text>
            </View>
            <View>
            <FlatList
                data={flights}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                <View style={styles.itemContainer}>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text>Destination: {item.destination}</Text>
                </View>
                )}
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
    itemContainer: {
        marginBottom: 15,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
})
