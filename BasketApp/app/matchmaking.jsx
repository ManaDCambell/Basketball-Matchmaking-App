import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import bronze from '../assets/images/bronze.png';
import gold from '../assets/images/gold.png';
import platinum from '../assets/images/platinum.png';
import diamond from '../assets/images/diamond.png';
/*
import playerinformation from './playerinformation.json';

const Pablo = new playerinformation("Pablo", "Bronze", 0);

const getImageForRank = (rank) => {
    if (rank === 'Bronze') {
        return require('./bronze.png');
    } else if (rank === 'Gold') {
        return require('./gold.png');
    } else if (rank === 'Platinum') {
        return require('./platinum.png');
    } else if (rank === 'Diamond') {
        return require('./diamond.png');
    }
    return null;
};
*/
const Matchmaking = () => {
    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.text}>Current Rank: Gold</Text>
                <Image source={gold} style={styles.image} />
            </View>
            <View style={styles.buttonContainer}>
                <View style={styles.buttonWrapper}>
                    <Button title="1v1" onPress={() => alert('1v1 Button Pressed')} />
                </View>
                <View style={styles.buttonWrapper}>
                    <Button title="2v2" onPress={() => alert('2v2 Button Pressed')} />
                </View>
                <View style={styles.buttonWrapper}>
                    <Button title="3v3" onPress={() => alert('3v3 Button Pressed')} />
                </View>
            </View>
        </View>
    );
};

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
        width: 400, 
        height: 100,
        margin: 1, 
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

export default Matchmaking;
