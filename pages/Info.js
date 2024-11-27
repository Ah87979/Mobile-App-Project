import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const {width, height} = Dimensions.get('window');
const myFontSize = (width+height) * 0.02;

const Info = ({ route }) => {

  const { item } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.largeFont}>{item.originAirportCode}</Text>
          <Text>{item.originCity}</Text>
        </View>
        <Text style={styles.largeFont}>{'>>>'}</Text>
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.largeFont}>{item.destinationAirportCode}</Text>
          <Text>{item.destinationCity}</Text>
        </View>
      </View>
      <View style={styles.infoView}>
        <MaterialCommunityIcons name={'calendar'} size={myFontSize * 0.6}/>
        <Text>{item.date}</Text>
        <MaterialCommunityIcons name={'airplane-takeoff'} size={myFontSize * 0.6}/>
        <Text>{item.departureTime}</Text>
        <MaterialCommunityIcons name={'airplane-landing'} size={myFontSize * 0.6}/>
        <Text>{item.arrivalTime}</Text>
        <MaterialCommunityIcons name={'airplane'} size={myFontSize * 0.6}/>
        <Text>{item.flightNo}</Text>
        <Text>{item.seatingOptions}</Text>
        <MaterialCommunityIcons name={'cash'} size={myFontSize * 0.6}/>
        <Text>US${item.ticketPrice}</Text>
      </View>
      <View>
        <TouchableOpacity><Text>Book Flight</Text></TouchableOpacity>
      </View>
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
  topView: {
    flex: 1,
    backgroundColor: 'orange',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    alignSelf: 'stretch',
  },
  infoView: {
    flex: 3,
  },
  largeFont: {
    fontSize: myFontSize * 1.2,
  },
})
