import React, {useState, useEffect } from 'react';
import {withNavigation} from 'react-navigation'; 

import { View, StyleSheet, Image, Text, FlatList } from 'react-native';

import api from '../services/api';
import { TouchableOpacity } from 'react-native-gesture-handler';

function SpotList( {tech, navigation } ){

    const [spots, setSpots] = useState([]);

    useEffect( () => {
        async function loadSpots(){
            const response = await api.get('/spots',{
                params: {tech}
            })
            console.log(response.data);
            setSpots(response.data);
        }
        loadSpots();
    }, []);

    function handleNavigate(id){
        navigation.navigate('Book', {id});
    }

    return (
        <View style = {styles.container}>

            <Text style={styles.titulo}> Empresas que usam <Text style={styles.bold}>{tech}: </Text> </Text>

            <FlatList
                style={styles.list}
                data={spots}
                keyExtractor={ spot =>  spot._id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={ ({ item }) => (
                    <View style={styles.listItem}>
                        <Image style={styles.thumbnail} source={{ uri: item.thumbnail_url }}/>
                        <Text style={styles.company}> {item.company}</Text>
                        <Text style={styles.price}> {item.price ? `R$${item.price} /dia`: 'GRATUITO' }</Text>
                        <TouchableOpacity onPress={ ()=>handleNavigate(item.id) } style={styles.button}>
                            <Text style={styles.buttonText}> Solicitar Reserva</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginTop:30,
    },
    titulo:{
        fontSize:20,
        color:'#444',
        paddingHorizontal:7,
        marginBottom:15,
    }, 
    bold:{
        fontWeight:'bold',
    },
    listItem:{
        marginLeft:10,
        marginRight:20,
    },
    thumbnail:{
        width:200,
        height:120,
        resizeMode:'cover',
        borderRadius:2,
    },
    company:{
        fontSize:24,
        fontWeight:'bold',
        color:'#333',
        marginTop:10,
    },
    price:{
        fontSize:15,
        color:'#999',
        marginTop:5,
    }, 
    button:{
        height:40,
        marginTop:10,
        backgroundColor:'#f05a5b',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:3,
    }, 
    buttonText:{
        color:'#fff',
        fontWeight:'bold',
        fontSize:16,
    }

});


export default withNavigation(SpotList); 