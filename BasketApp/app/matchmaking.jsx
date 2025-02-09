import React from 'react';
import { useState } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import bronze from '../assets/images/bronze.png';
import gold from '../assets/images/gold.png';
import platinum from '../assets/images/platinum.png';
import diamond from '../assets/images/diamond.png';

const Matchmaking = () => {
    const [rankPoints] = useState(150); //Temporary example ELO of 250

    // Change image of rank based on ELO passed thru useState()
    let rank, rankImage, distanceFromRankUp;

    if (rankPoints >= 300) {
        rank = 'Diamond';
        rankImage = diamond;
        distanceFromRankUp = 0;
    } else if (rankPoints >= 200) {
        rank = 'Platinum';
        rankImage = platinum;
        distanceFromRankUp = 300 - rankPoints;
    } else if (rankPoints >= 100) {
        rank = 'Gold';
        rankImage = gold;
        distanceFromRankUp = 200 - rankPoints;
    } else {
        rank = 'Bronze';
        rankImage = bronze;
        distanceFromRankUp = 100 - rankPoints;
    }
    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.text}>Current Rank: {rank}</Text>
                <Text style={styles.text}>Current Elo: {rankPoints}</Text>
                <Text style={styles.text}>You're {distanceFromRankUp} points away from ranking up!</Text>
                <Image source={rankImage} style={styles.image} />
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

export const getProfileRank = (rankPoints) => {
    if (rankPoints >= 300) {
        return 'Diamond';
    } else if (rankPoints >= 200) {
        return 'Platinum';
    } else if (rankPoints >= 100) {
        return 'Gold';
    } else {
        return 'Bronze';
    }
};

export default Matchmaking;
