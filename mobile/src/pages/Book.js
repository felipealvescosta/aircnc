import React, {useState} from 'react';
import { SafeAreaView, AsyncStorage, Alert, TouchableOpacity, TextInput ,StyleSheet , Text , Image} from 'react-native';

import api from '../services/api';
import logo from '../assets/logo.png';

export default function Book({ navigation }){

    const [date, setDate] = useState('');
    const id = navigation.getParam('id');


    async function handleSubmit(){

        const user_id = await AsyncStorage.getItem('user');
    
        await api.post(`/spots/${id}/bookings`,{
           date
        },{
            headers: { user_id } 
        })

        Alert.alert('Reserva enviada!');

        navigation.navigate('List');
    }

    function handleCancel(){
        navigation.navigate('List');
    }
    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo}/>

            <Text style={styles.label}>Seleciona uma data: </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Sua data"
                    placeholderTextColor="#999"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={date}
                    onChangeText={setDate}
                />

                <TouchableOpacity onPress={ handleSubmit } style={styles.button}>
                    <Text style={styles.buttonText}> Reservar Spot</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={ handleCancel } style={[styles.button ,styles.cancelButton]}>
                    <Text style={styles.buttonText}> Cancelar</Text>
                </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles  = StyleSheet.create({
    container:{
        flex:1,
        margin:20,
    },
    logo:{
        height:42,
        resizeMode:"contain",
        alignSelf:'center',
        marginTop:10
    },
    label:{
        fontWeight:'bold',
        color:'#444',
        marginTop:30, 
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
    cancelButton:{
        marginTop:10,
        backgroundColor: '#c5c5c5',
    },
    buttonText:{
        color:'#fff',
        fontWeight:'bold',
        fontSize:16,
    },
});