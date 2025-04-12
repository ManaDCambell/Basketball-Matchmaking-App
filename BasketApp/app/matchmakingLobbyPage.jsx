import React, { useState, useEffect } from 'react';
import { Alert, Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { getUserNames, getLookingForMatch, getElo, getLocation, getPhoneNumber, setPlayingAgainst, getUser, setLookingForMatch } from './database';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { getLoggedInUser } from '../FirebaseConfig';


const MatchmakingLobbyPage = () => {
  const [user, setUser] = useState(null);
  const [players, setPlayers] = useState({
    lookingForMatch: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch users and categorize based on LookingForMatch
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getUser(getLoggedInUser());
        console.log("Fetched user object:", result);
        setUser(result);
        const usernames = await getUserNames();
        console.log ('Fetched Usernames: ', usernames) //Debug statement
        // Fetch all usernames

        // Categorize users based on their LookingForMatch value
        const lookingForMatchUsers = [];

        for (const username of usernames) {
          const lookingForMatch = await getLookingForMatch(username);
          if (lookingForMatch === 1) {
            const phoneNumber = await getPhoneNumber(username);
            const opponentLocation = await getLocation(username);
            const ranking = await getElo(username);
            lookingForMatchUsers.push({
              username, 
              ranking,
              opponentLocation,
             phoneNumber});
          } 
        }

        // Update state with the categorized lists
        setPlayers({
          lookingForMatch: lookingForMatchUsers,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    fetchData();
  }, []); 

  const challengePlayer = (text) => {
    console.log('Player Challenged', `You clicked: "${text}"`);
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
//player.username refers to opponent, user.username refers to the user
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Matchmaking Lobby</Text>

      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.title}>Players Looking for a Match</Text>
        {players.lookingForMatch.map((player, index) => (
          <TouchableOpacity
            key={index}
            style={styles.textBox}
            onPress={async() => {
              await setPlayingAgainst(user.userName, player.username);
              await setLookingForMatch(user.userName, 2);
              alert(`You challenged: "${player.username}" Their phone number is ${player.phoneNumber}. you are ${user.userName}`)}
            }
          >
            <Text style={styles.text}>{player.username}</Text>
            <Text style={styles.subText}>Elo: {player.ranking} | Location: {player.opponentLocation}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

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
  subText: {
    fontSize: 14,
    color: '#666',
  },
});

export default MatchmakingLobbyPage;