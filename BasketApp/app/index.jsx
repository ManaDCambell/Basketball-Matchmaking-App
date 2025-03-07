import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

import Database from './database';
import UserProfile from './userProfile';
import Matchmaking from './matchmaking'; 
import Friends from './friends'; 
import UserProfileSettings from './userProfileSettings';
import Tournament from './tournament';
import Login from './login';
import Signup from './signup';

import Header from './Header';
import Footer from './footer';

import { getUser, getFriends } from './database';

import logo from '../assets/images/appLogo.png';

const Stack = createStackNavigator();
const { width, height } = Dimensions.get('window');

// Placeholder match data (to be replaced with database data later)
const matchHistory = [
  { opponent: 'Player1', type: '1v1', score: '21-18', result: 'Win', eloChange: '+15' },
  { opponent: 'TeamX', type: '3v3', score: '35-40', result: 'Loss', eloChange: '-10' },
  { opponent: 'DuoTeam', type: '2v2', score: '25-22', result: 'Win', eloChange: '+12' },
  { opponent: 'Player2', type: '1v1', score: '18-15', result: 'Win', eloChange: '+20' },
  { opponent: 'TeamY', type: '3v3', score: '30-35', result: 'Loss', eloChange: '-5' }
];

function Index() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="Database" component={Database} />
      <Stack.Screen name="Matchmaking" component={Matchmaking} /> 
      <Stack.Screen name="Friends" component={Friends} /> 
      <Stack.Screen name="UserProfileSettings" component={UserProfileSettings} />
      <Stack.Screen name="Tournament" component={Tournament} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}

function HomeScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const result = await getUser("Pab"); // Change this to the current user
      setUser(result);
      setLoading(false);
    }
    fetchUser();
    fetchFriends();
  }, []);

  const fetchFriends = async () => {
    try {
      const friendList = await getFriends("Pab");
      setFriends(friendList || []);
    } catch (error) {
      console.error("Failed to fetch friends:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          {loading ? "Loading..." : `Welcome Back, ${user?.userName}!`}
        </Text>
      </View>

      {/* Friends List Box */}
      <View style={styles.friendsBox}>
        <Text style={styles.friendsTitle}>Friends</Text>
        <ScrollView style={styles.scrollContainer}>
          {friends.map((friend, index) => (
            <View key={index} style={styles.friendItem}>
              <Image source={require('../assets/images/default_profile_picture.jpg')} style={styles.profilePic} />
              <Text style={styles.friendName}>{friend.userName}</Text>
              <TouchableOpacity 
                style={styles.chatIcon} 
                onPress={() => console.log(`Chat with ${friend.userName}`)}
              >
                <Icon name="chatbubble-outline" size={24} color="white" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Match Review Panel */}
      <View style={styles.matchBox}>
        <Text style={styles.matchTitle}>Recent Matches</Text>
        <ScrollView style={styles.scrollContainer}>
          {matchHistory.slice(0, 5).map((match, index) => (
            <View key={index} style={styles.matchItem}>
              <View style={styles.matchDetailsContainer}>
                <Text style={styles.matchUsername}>{user?.userName}</Text>
              </View>
              <View style={styles.matchCenterContainer}>
                <Text style={styles.matchText}>{match.type}</Text>
                <Text style={styles.matchText}>Score: {match.score}</Text>
                <Text style={[styles.matchText, match.result === 'Win' ? styles.winText : styles.lossText]}>
                  {match.result} ({match.eloChange})
                </Text>
              </View>
              <View style={styles.matchDetailsContainer}>
                <Text style={styles.matchUsername}>{match.opponent}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Match Button */}
      <View style={styles.matchButtonContainer}>
        <TouchableOpacity style={styles.matchButton} onPress={() => console.log("Find a match!")}>
          <View style={styles.ring}>
            <Image source={logo} style={styles.logo} />
  
          </View>
        </TouchableOpacity>
      </View>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(218, 113, 5)',
  },
  header: {
    position: 'absolute',
    top: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '96%',
    marginRight: 50,
  },
  friendsBox: {
    position: "absolute",
    top: height * 0.14,
    width: "90%",
    height: 200,
    backgroundColor: "rgba(36, 36, 36, 0.55)", 
    borderRadius: 15,
    padding: 15,
  },
  friendsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  scrollContainer: {
    maxHeight: 300,
  },
  friendItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.3)",
  },
  friendName: {
    fontSize: 16,
    color: "white",
    position: "absolute",
    left: width * 0.08,
  },
  chatIcon: {
    padding: 5,
  },
  titleContainer: {
    width: "90%",
    alignItems: "center",
    position: 'absolute',
    top: height * 0.075,
    flexDirection: "row",
    marginLeft: 50,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  matchBox: {
    position: "absolute",
    top: height * 0.34,
    width: "90%",
    maxHeight: 250,
    backgroundColor: "rgba(36, 36, 36, 0.55)",
    borderRadius: 15,
    padding: 15,
    marginTop: 40,
  },
  matchTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  matchItem: {
    flexDirection: "row",
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.3)",
  },
  matchDetailsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  matchCenterContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  matchUsername: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  matchText: {
    fontSize: 14,
    color: "white",
  },
  winText: {
    color: "rgb(76, 175, 80)",
  },
  lossText: {
    color: "rgb(255, 61, 0)",
  },
  profilePic: {
    width: 25,
    height: 25,
    borderRadius: 20,
    marginRight: 10,
  },
  matchButtonContainer: {
    position: 'absolute',
    bottom: height * 0.1, 
    alignItems: 'center',
    justifyContent: 'center',
  },

  matchButton: {
    width: 110,
    height: 110,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60, 
    backgroundColor: 'transparent',
    borderWidth: 3,
    borderColor: 'white',
    position: 'absolute',
    bottom: -height*0.02, 
  },

  ring: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: 'rgba(36, 36, 36, 0.55)', 
    position: 'relative',
  },

  logo: {
    width: 70, 
    height: 70, 
    resizeMode: 'contain',
  },

 
});

export default Index;
