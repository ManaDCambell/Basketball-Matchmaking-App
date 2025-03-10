import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

import Header from './Header';
import Footer from './footer';

import { getUser, getFriends } from './database';

import logo from '../assets/images/appLogo.png';
const { width, height } = Dimensions.get('window');
/*const matchmakingLobbyPage  = () =>{
    const db = useSQLiteContext();
    const user = getUser(db,"Mana");
    return (
        <SQLiteProvider databaseName='example.db' onInit={initializeDatabase}>
            <View>
                <View style={styles.container}>
                    <Text style={styles.text}>Name: {user.userName}</Text>
                <Text style={styles.text}>Rank: {user.elo}</Text>
                <Text style={styles.text}>Location: {user.location}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <View style={styles.buttonWrapper}>
                    <Button title="Challenge" onPress={() => alert('Challenge')} />
                </View>
                <View style={styles.buttonWrapper}>
                </View>
                <View style={styles.buttonWrapper}>

                </View>
            </View>
        </View>
        </SQLiteProvider>
    );
};
*/

export const matchmakingLobbyPage = ({ navigation }) => {
    const textItems = [
        "Username: BallinCat43 \nELO: 2000 \nLocation: New York",
        "Username: Joe \nELO: 1400 \nLocation: Los Angeles",
        "Username: LebronJ \nELO: 200 \nLocation: Akron",
    ];

    const challengePlayer = (text) => {
        console.log("Player Challenged", `You clicked: "${text}"`);
    };
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Matches</Text>
        <ScrollView style={styles.scrollContainer}>
            {textItems.map((text, index) => (
                <TouchableOpacity 
                key={index} 
                style={styles.textBox} 
                onPress={() => challengePlayer(text)}
            >
                <Text style={styles.text}>{text}</Text>
            </TouchableOpacity>
            ))}
        </ScrollView>
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
export default matchmakingLobbyPage;