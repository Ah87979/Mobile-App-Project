import { StyleSheet, Dimensions, Text, SafeAreaView } from 'react-native';
import { React } from 'react';

const {width, height} = Dimensions.get('window');
const myFontSize = (width+height) * 0.02;

const Home = () => {
    return (
        <SafeAreaView style={styles.container}>
            
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})