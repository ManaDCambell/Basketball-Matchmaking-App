import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { getLoggedInUser } from '../FirebaseConfig';
import { getPhoneNumber, setPhoneNumber, getEmail, setEmail, getLocation, setLocation, getPlayingAgainst, getLookingForMatch, getElo } from './database';
import { View, Text, Image, Button, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import bronze from '../assets/images/bronze.png';
import gold from '../assets/images/gold.png';
import platinum from '../assets/images/platinum.png';
import diamond from '../assets/images/diamond.png';

import Header from './Header';
import Footer from './footer';

import { getUser, getFriends } from './database';
import {updateElo} from './matchmakingCalc';

import logo from '../assets/images/appLogo.png';
const { width, height } = Dimensions.get('window');


export const MatchmakingReport = () => {
    if (getLoggedInUser() == undefined){
        return <Text>Loading...</Text>;
      }

        const [user, setUser] = useState(null);
        const [loading, setLoading] = useState(true);
        const [opponentElo, setOpponentElo] = useState(null);
        const [opponentUsername, setOpponentUsername] = useState(null);
        
          useEffect(() => {
            async function getData() {
              const result = await getUser(getLoggedInUser());
              setUser(result);
              //const matchStatus = await getLookingForMatch(result.username); (checks if user is looking for a match, not used right now)
            const opponentUsername = await getPlayingAgainst(result.username);
            setOpponentUsername(opponentName);
            const opponentElo = await getElo(opponentUsername);
            setOpponentElo(fetchedOpponentElo);
              setLoading(false);
            }   
            getData();
            
          }, []);
    
          if (loading){
              return <Text>Loading...</Text>;
            }
    return (
        <View style={styles.container}> 
        <Text style={styles.text}>You are currently playing against {opponentUsername} and their elo is {opponentElo}</Text>
        <View style={styles.contentContainer}>

            <View style={styles.menuContainer}>
                <Button title="I won" onPress={() => updateElo(user.elo, opponentElo, 1 )} />
                <Button title="We tied" onPress={() => updateElo(user.elo, opponentElo, 0.5 )} />
                <Button title="I lost" onPress={() => updateElo(user.elo, opponentElo, 0 )} />
            </View>
        </View>
        <Footer />
    </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: '#f8f8f8',
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    scrollContainer: {
        width: '90%',
        maxHeight: 600,
    },
    textBox: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
    },
    text: {
        fontSize: 16,
        color: '#333',
    },
});
export default MatchmakingReport