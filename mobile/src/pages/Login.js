import React, {useState, useEffect} from 'react';
import { View, AsyncStorage, KeyboardAvoidingView, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

import api from '../services/api';

import logo from '../assets/logo.png';
import { TextInput } from 'react-native-gesture-handler';
import { Platform } from '@unimodules/core';


export default function Login({ navigation }){

    const [email, setEmail] = useState('');
    const [techs, setTechs] = useState('');

   useEffect( () => {
        AsyncStorage.getItem('user').then( user => {
            if(user){
                navigation.navigate('List');
            }else{
                navigation.navigate('Login'); 
            }
        })
    },[]);


    async function handleSubmit(){
        console.log(email, techs);
        const response = await api.post('/sessions',{
            email
        }) 
        const { _id } = response.data;

        await AsyncStorage.setItem('user', _id);
        await AsyncStorage.setItem('techs', techs);

        console.log(_id);
        navigation.navigate('List');
    }


    return (
        <KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior="padding" style={styles.container}>
            <Image source={logo} />
            <View style={styles.form}>
                <Text style={styles.label}>Seu E-mail: </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Seu e-mail"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail}
                />
                <Text style={styles.label}>Tecnologias * </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Tecnologias de interesse"
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={techs}
                    onChangeText={setTechs}
                />

                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}> Encontrar Spots</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }, 
    form:{
        alignSelf:'stretch',
        paddingHorizontal:30,
        marginTop:30,
    },  
    label:{
        fontWeight:'bold',
        color:'#444',
        marginBottom:8,
    }, 
    input:{
        borderWidth:1,
        borderColor:'#444',
        paddingHorizontal:20,
        fontSize:16,
        color:'#444',
        height:44,
        marginBottom:20,
        borderRadius:2,
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
});