import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const Info = ({ route }) => {

  const { item } = route.params;

  return (
    <View>
      <Text>{item.flightNo}</Text>
      <Text>{item.originAirportCode}</Text>
      <Text>{item.destinationAirportCode}</Text>
      <Text>{item.date}</Text>
      <TouchableOpacity><Text>Book Flight</Text></TouchableOpacity>
    </View>
  )
};

export default Info;