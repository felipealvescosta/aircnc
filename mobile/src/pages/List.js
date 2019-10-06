import React, {useState, useEffect } from 'react';
import { SafeAreaView, Alert, TouchableOpacity, ScrollView, StyleSheet, AsyncStorage ,Image , Text } from 'react-native';
import socketio  from 'socket.io-client'; 

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';

export default function List({ navigation }){

    const [techs, setTechs] = useState([]);
    const user_id = AsyncStorage.getItem('user');
    console.log(user_id);


    useEffect( ()=>{
        AsyncStorage.getItem('user').then(user_id=>{
            const socket = socketio('http://10.0.0.102:3030',{
                query: {user_id}
            })
            socket.on('booking_response', booking=>{
                Alert.alert(`Sua reverva em ${booking.spot.company} em ${booking.date} foi ${booking.approved? 'APROVADA': 'REPROVADA'}`);
            });
        });
    },[]);

    useEffect( () => {
        AsyncStorage.getItem('techs').then(  storagedTechs => {
            const techsArray = storagedTechs.split(',').map( tech => tech.trim());
            setTechs(techsArray);
        })
    },[]);


    async function handleExit(){
        await AsyncStorage.setItem('user','');
        console.log('Saindooooo');
        navigation.navigate('Login');
    }

    return ( 
    <SafeAreaView style={styles.container}>
        <Image style={styles.logo}  source={logo}></Image>
        
        <ScrollView>
            {techs.map( tech => <SpotList key={tech} tech={tech}/>)}
        </ScrollView>
        
        <TouchableOpacity onPress={handleExit} style={styles.button}>
            <Text style={styles.buttonText}> Sair </Text>
        </TouchableOpacity>

    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    }, 
    logo:{
        height:42,
        resizeMode:"contain",
        alignSelf:'center',
        marginTop:10
    },
    button:{
        height:50,
        backgroundColor: '#f05a5b',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:2,
    },
    buttonText:{
        color:'#fff',
        fontWeight:'bold',
        fontSize:16,
    },
})