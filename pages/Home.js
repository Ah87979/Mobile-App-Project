import { StyleSheet, Dimensions, SafeAreaView, Text, FlatList, View } from 'react-native';
import { React, useEffect } from 'react';
import { db } from "../config";
import { doc, onSnapshot } from "firebase/firestore";

const {width, height} = Dimensions.get('window');
const myFontSize = (width+height) * 0.02;

const Home = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.header}>My Flights</Text>
            </View>
            <View>
                
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
    }
})
