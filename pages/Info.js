import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { db } from '../config';
import { doc, updateDoc} from 'firebase/firestore';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const {width, height} = Dimensions.get('window');
const myFontSize = (width+height) * 0.02;

const Info = ({ route }) => {

  const { item } = route.params;

  const bookFlight = async () => {
    try {
      const flightDocRef = doc(db, 'flights', item.id);
      await updateDoc(flightDocRef, { status: true });
      console.log('Document successfully updated!');
      return { success: true };
    } catch (error) {
      console.error('Error updating document:', error);
      return { success: false, error };
    }
  };

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
        <View style={{marginVertical: 5, flexDirection: 'row', alignItems: 'center'}}>
          <MaterialCommunityIcons name={'airplane'} size={myFontSize * 0.6}/>
          <Text style={{fontSize: myFontSize * 0.6}}>Flight No.: {item.flightNo}</Text>
        </View>
        <View style={{marginVertical: 5, flexDirection: 'row', alignItems: 'center'}}>
          <MaterialCommunityIcons name={'calendar'} size={myFontSize * 0.6}/>
          <Text style={{fontSize: myFontSize * 0.6}}>Departure Date: {item.date}</Text>
        </View>
        <View style={{marginVertical: 5, flexDirection: 'row', alignItems: 'center'}}>
          <MaterialCommunityIcons name={'airplane-takeoff'} size={myFontSize * 0.6}/>
          <Text style={{fontSize: myFontSize * 0.6}}>Departure Time: {item.departureTime}</Text>
        </View>
        <View style={{marginVertical: 5, flexDirection: 'row', alignItems: 'center'}}>
          <MaterialCommunityIcons name={'airplane-landing'} size={myFontSize * 0.6}/>
          <Text style={{fontSize: myFontSize * 0.6}}>Arrival Time: {item.arrivalTime}</Text>
        </View>
        <View style={{marginVertical: 5, flexDirection: 'row', alignItems: 'center'}}>
          <MaterialCommunityIcons name={'cash'} size={myFontSize * 0.6}/>
          <Text style={{fontSize: myFontSize * 0.6}}>Price: US${item.ticketPrice}</Text>
        </View>
      </View>
      <View>
        <TouchableOpacity onPress={bookFlight} style={{backgroundColor: 'orange', marginVertical: 15, paddingHorizontal: 50, paddingVertical: 15, borderRadius: 10}}>
          <Text style={{fontSize: myFontSize * 0.6}}>Book Flight</Text>
        </TouchableOpacity>
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
