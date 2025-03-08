import React from 'react';
import { useState } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import bronze from '../assets/images/bronze.png';
import gold from '../assets/images/gold.png';
import platinum from '../assets/images/platinum.png';
import diamond from '../assets/images/diamond.png';
import { getUser, initializeDatabase } from './database';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { getProfileRank } from './matchmaking';

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

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 30,
    },
    buttonWrapper: {
        flex: 1,
        minwidth: 100, 
        
    },
    text: {
        fontSize: 18,
        marginBottom: 10,
    },
    image: {
        width: 300,
        height: 300,
        marginBottom: 20,
    },
});


export const matchmakingLobbyPage = ({ navigation }) => {
    return (
        <View>
            <Text>HIIIII</Text>
        </View>
    );
}