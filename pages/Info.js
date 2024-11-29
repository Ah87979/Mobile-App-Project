import { React, useState, useEffect } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { db } from '../config';
import { doc, updateDoc} from 'firebase/firestore';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const {width, height} = Dimensions.get('window');
const myFontSize = (width+height) * 0.02;

const Info = ({ route }) => {

  const [seats, setSeats] = useState([]);
  const { item } = route.params;

  useEffect(() => {
    getSeats();
  }, []);

  const getSeats = () => {
    const seatsArray = [];
    const data = item.seatingOptions;
    data.forEach((seat) => {
      seatsArray.push(seat);
    });
    setSeats(seatsArray);
  };

  const bookFlight = async () => {
    try {
      const flightDocRef = doc(db, 'flights', item.id);
      await updateDoc(flightDocRef, { bookedStatus: true });
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
        <View style={{flexDirection: 'column', alignItems: 'center'}}>
          <Text style={styles.largeFont}>{item.originAirportCode}</Text>
          <Text>{item.originCity}</Text>
        </View>
        <Text style={styles.largeFont}>{'>>>'}</Text>
        <View style={{flexDirection: 'column', alignItems: 'center'}}>
          <Text style={styles.largeFont}>{item.destinationAirportCode}</Text>
          <Text>{item.destinationCity}</Text>
        </View>
      </View>
      <View style={styles.infoView}>
        <View style={styles.info}>
          <MaterialCommunityIcons name={'airplane'} size={myFontSize * 0.6}/>
          <Text style={{fontSize: myFontSize * 0.6}}>Flight No.: {item.flightNo}</Text>
        </View>
        <View style={styles.info}>
          <MaterialCommunityIcons name={'calendar'} size={myFontSize * 0.6}/>
          <Text style={{fontSize: myFontSize * 0.6}}>Departure Date: {item.date}</Text>
        </View>
        <View style={styles.info}>
          <MaterialCommunityIcons name={'airplane-takeoff'} size={myFontSize * 0.6}/>
          <Text style={{fontSize: myFontSize * 0.6}}>Departure Time: {item.departureTime}</Text>
        </View>
        <View style={styles.info}>
          <MaterialCommunityIcons name={'airplane-landing'} size={myFontSize * 0.6}/>
          <Text style={{fontSize: myFontSize * 0.6}}>Arrival Time: {item.arrivalTime}</Text>
        </View>
        <View style={styles.info}>
          <MaterialCommunityIcons name={'cash'} size={myFontSize * 0.6}/>
          <Text style={{fontSize: myFontSize * 0.6}}>Price: US${item.ticketPrice}</Text>
        </View>
        <FlatList 
            data={seats} 
            keyExtractor={item => item.id} 
            renderItem={({item}) => <Text item={item} />} 
        />
      </View>
      <View>
        <TouchableOpacity onPress={bookFlight} style={styles.button}>
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
    backgroundColor: 'cyan',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    alignSelf: 'stretch',
  },
  infoView: {
    flex: 3,
  },
  info: {
    marginVertical: 5, 
    flexDirection: 'row', 
    alignItems: 'center'
  },
  button: {
    backgroundColor: 'cyan', 
    marginVertical: 15, 
    paddingHorizontal: 50, 
    paddingVertical: 15, 
    borderRadius: 10
  },
  largeFont: {
    fontSize: myFontSize * 1.2,
  },
})
