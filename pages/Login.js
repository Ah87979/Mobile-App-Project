import { StyleSheet, Dimensions, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { React, useState } from 'react';
import { auth } from '../config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const {width, height} = Dimensions.get('window');
const myFontSize = (width+height) * 0.02;

const Login = ({ navigation }) => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [singnedIn, setSignedIn] = useState(false)

    const handleRegister = () => {
       createUserWithEmailAndPassword(auth, email, password)
        .then(() => console.log("registered"))
        .catch((error) => console.log(error))
    }

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            console.log('Logged in')
            navigation.replace('Home')
        })
        .catch((error) => {console.log(error.message);
        setSignedIn(false)})
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <Text style={{fontSize: 24}}>Login</Text>
            <TextInput placeholder='Email' style={styles.input} onChangeText={(txt)=>setEmail(txt)}/>
            <TextInput placeholder='Password' style={styles.input} secureTextEntry={true} onChangeText={(txt)=>setPassword(txt)}/>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.txt}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleRegister}>
                <Text style={styles.txt}>Don't have an account? Register now</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Login

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input:{
        backgroundColor: 'snow',
        padding: myFontSize * 0.5,
        width: width * 0.85,
        marginTop: height * 0.02,
        borderWidth: 1,
        borderRadius: 10,
    },
    button:{
        width: width/4,
        backgroundColor: 'lightblue',
        marginVertical: height * 0.02,
        padding: myFontSize * 0.5,
        alignItems: 'center',
        borderRadius: 10,
    },
   
})