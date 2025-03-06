import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Svg, { Path } from "react-native-svg";
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

const Stack = createStackNavigator();
const { width, height } = Dimensions.get('window');

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
      const friendList = await getFriends();
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

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F57C00',
  },
  svgContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
  tempButtonsContainer: {
    position: 'absolute',
    left: 20,
    top: height * 0.15,
    zIndex: 2,
  },
  tempButton: {
    backgroundColor: '#FFF',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000',
  },
  tempButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  logoImage: {
    width: 600, 
    height: 600, 
    position: 'absolute',
    top: 100,
    left: '60%',
    transform: [{ translateX: -300 }],
  },
  buttonContainer: { 
    justifyContent: 'space-evenly', 
    alignItems: 'center',
    width: '100%', 
    position: 'absolute',
    top: '60%', 
  },
  buttonWrapper: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  SbuttonImage: {
    width: '75%', 
    height: '75%', 
    backgroundColor: 'transparent',
    marginBottom: 0,
    zIndex: 1,
    transform: [{ translateX: '550%' }, { translateY: '-10%' }],
  },
  buttonImage: {
    width: 60, 
    height: 60, 
    resizeMode: 'contain'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '96%',
    marginTop: 20,
    marginRight: 50,
  },
  friendsBox: {
    width: "90%",
    height: 200,
    backgroundColor: "rgba(56, 56, 56, 0.5)", 
    borderRadius: 15,
    padding: 15,
    marginTop: 20,
  },
  friendsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  scrollContainer: {
    maxHeight: 150,
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
  },
  chatIcon: {
    padding: 5,
  },
  titleContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: -height * 0.45,
    flexDirection: "row",
    marginLeft: 50,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Index;
