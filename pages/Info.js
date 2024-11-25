import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const {width, height} = Dimensions.get('window');
const myFontSize = (width+height) * 0.02;

const Info = ({ route }) => {

  const { item } = route.params;

  return (
    <View style={styles.container}>
      <View>
        
      </View>
      <Text>{item.arrivalTime}</Text>
      <Text>{item.date}</Text>
      <Text>{item.departureTime}</Text>
      <Text>{item.destinationAirportCode}</Text>
      <Text>{item.destinationCity}</Text>
      <Text>{item.flightNo}</Text>
      <Text>{item.originAirportCode}</Text>
      <Text>{item.originCity}</Text>
      <Text>{item.seatingOptions}</Text>
      <Text>{item.ticketPrice}</Text>
      <TouchableOpacity><Text>Book Flight</Text></TouchableOpacity>
    </View>
  )
};

export default Info;

const styles = StyleSheet.create({
  container:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  largeFont: {
      fontSize: myFontSize * 0.8,
  },
})
