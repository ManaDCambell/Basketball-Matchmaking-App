import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
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
        <View style={styles.container}>
            <Text style={styles.text}>Current Rank: Gold</Text>
            <Image source={require('./gold.png')} style={styles.image} />
            <Button title="Join Queue" onPress={() => alert('Button Pressed')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
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
