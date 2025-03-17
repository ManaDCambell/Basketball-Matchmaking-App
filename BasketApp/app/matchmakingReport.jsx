import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

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

export const MatchmakingReport = ({ navigation }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    if (getLoggedInUser() == undefined){
        return <Text>Loading...</Text>;
    }
    if (getLookingForMatch() == 2){
        let opponentElo = getElo(getOpponent());
    }
    return (
        <View style={styles.container}> 
        <View style={styles.contentContainer}>
            {/* Profile Picture with Rank Icon */}
            <View style={styles.profilePictureContainer}>
              <Image source={profileImage} style={styles.profilePicture} />
              <View style={styles.rankIconContainer}>
                <Image source={rankImage} style={styles.rankIcon} />
              </View>
            </View>

            <View style={styles.profileInfoContainer}>
                <Text style={styles.text}>Current Rank: {rank}</Text>
                <Text style={styles.text}>Current Elo: {user.elo}</Text>
                <Text style={styles.text}>You're {distanceFromRankUp} points away from ranking up!</Text>
            </View>

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