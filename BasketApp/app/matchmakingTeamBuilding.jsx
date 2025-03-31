import React, { useState, useEffect } from 'react';
import { Alert, Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { getUserNames, getLookingForMatch, getElo, getLocation, getPhoneNumber, setPlayingAgainst, getUser, setLookingForMatch } from './database';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { getLoggedInUser } from '../FirebaseConfig';
import { CreateGame } from './matchdb';

const RegisterTeamScreen = () => {
  const [usernames, setUsernames] = useState(['', '', '', '']); // Default for max 3v3
  const [matchType, setMatchType] = useState('2v2');
  const [isComp, setIsComp] = useState(false);

  const handleRegister = async () => {
      const teamSize = matchType === '2v2' ? 2 : 3;
      const team1 = usernames.slice(0, teamSize);
      const team2 = usernames.slice(teamSize, teamSize * 2);

      if (team1.includes('') || team2.includes('')) {
          Alert.alert('Error', 'Please enter all usernames.');
          return;
      }

      const success = await CreateGame(isComp, matchType === '2v2' ? 1 : 2, team1, team2);
      if (success) {
          Alert.alert('Success', 'Match created successfully!');
      }
  };

  return (
      <View style={styles.container}>
          <Text style={styles.title}>Register Your Team</Text>
          <Text style={styles.label}>Enter Teammate Usernames:</Text>
          {[...Array(6)].map((_, index) => (
              <TextInput
                  key={index}
                  style={styles.input}
                  placeholder={`Player ${index + 1}`}
                  value={usernames[index]}
                  onChangeText={(text) => {
                      let newUsernames = [...usernames];
                      newUsernames[index] = text;
                      setUsernames(newUsernames);
                  }}
              />
          ))}
          <Text style={styles.label}>Select Game Mode:</Text>
          <Picker selectedValue={matchType} onValueChange={(value) => setMatchType(value)}>
              <Picker.Item label="2v2" value="2v2" />
              <Picker.Item label="3v3" value="3v3" />
          </Picker>
          <Text style={styles.label}>Is this Competitive?</Text>
          <Picker selectedValue={isComp} onValueChange={(value) => setIsComp(value === 'true')}>
              <Picker.Item label="Casual" value="false" />
              <Picker.Item label="Competitive" value="true" />
          </Picker>
          <Button title="Register Team" onPress={handleRegister} />
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
  label: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 10,
  },
  input: {
      width: '90%',
      backgroundColor: '#fff',
      padding: 10,
      marginBottom: 10,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#ccc',
  },
});

export default matchmakingTeamBuilding;
