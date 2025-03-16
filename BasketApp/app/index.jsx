import React, { useState, useEffect} from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, Dimensions, ScrollView, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {getLoggedInUser} from '../FirebaseConfig';
import Database from './database';
import UserProfile from './userProfile';
import Matchmaking from './matchmaking';
import Friends from './friends';
import UserProfileSettings from './userProfileSettings';
import Tournament from './tournament';
import Login from './login';
import Signup from './signup';
import matchmakingLobbyPage from './matchmakingLobbyPage';

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
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="Database" component={Database} />
      <Stack.Screen name="Matchmaking" component={Matchmaking} />
      <Stack.Screen name="Friends" component={Friends} />
      <Stack.Screen name="UserProfileSettings" component={UserProfileSettings} />
      <Stack.Screen name="Tournament" component={Tournament} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="MatchmakingLobbyPage" component={matchmakingLobbyPage} />
    </Stack.Navigator>
  );
}

function HomeScreen({ navigation }) {
  if (getLoggedInUser() == undefined){
      return <Text>Loading...</Text>;
  }
    const [user, setUser] = useState(null);
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    const [gameType, setGameType] = useState("1v1");
    const [selectedTeammates, setSelectedTeammates] = useState({
      teammate1: "",
      teammate2: "",
    });
    const [isMatchmakingVisible, setMatchmakingVisible] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
      async function fetchUser() {
        const result = await getUser(getLoggedInUser()); // Change this to the current user
        setUser(result);
        setLoading(false);
      }
      fetchUser();
      fetchFriends();
    }, []);

    const fetchFriends = async () => {
      try {
        const friendList = await getFriends(getLoggedInUser()); // Change this to the current user
        if (!friendList || friendList.length === 0) {
          console.log("No friends found");
          setFriends([]);
          return;
        }

        const formattedFriends = friendList.map((friend) => ({
          userName: friend,
        }));
        setFriends(formattedFriends);
      } catch (error) {
        console.error("Failed to fetch friends:", error);
      }
    };

    const handleTeammateSelection = (index, teammate) => {
      const updatedSelection = { ...selectedTeammates };
      updatedSelection[`teammate${index}`] = teammate;
      setSelectedTeammates(updatedSelection);

      if (
        gameType !== "1v1" &&
        updatedSelection.teammate1 &&
        updatedSelection.teammate2
      ) {
        setIsButtonDisabled(false);
      } else {
        setIsButtonDisabled(true);
      }
    };

    const toggleMatchmakingMenu = () => {
      setMatchmakingVisible(!isMatchmakingVisible);
    };

    useEffect(() => {
      if (
        gameType === "1v1" ||
        (gameType === "2v2" && selectedTeammates.teammate1) ||
        (gameType === "3v3" &&
          selectedTeammates.teammate1 &&
          selectedTeammates.teammate2)
      ) {
        setIsButtonDisabled(false);
      } else {
        setIsButtonDisabled(true);
      }
    }, [gameType, selectedTeammates]);

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
                <Image
                  source={require("../assets/images/default_profile_picture.jpg")}
                  style={styles.profilePic}
                />
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
                  <Text
                    style={[
                      styles.matchText,
                      match.result === "Win" ? styles.winText : styles.lossText,
                    ]}
                  >
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

        {/* Matchmaking Button */}
        <View style={styles.matchButtonContainer}>
          <TouchableOpacity
            style={styles.matchButton}
            onPress={toggleMatchmakingMenu}
          >
            <View style={styles.ring}>
              <Image source={logo} style={styles.logo} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Overlay and Matchmaking Menu*/}
        {isMatchmakingVisible && (
          <View style={styles.overlay}>
            <View style={styles.menu}>
              {/* Close Button */}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={toggleMatchmakingMenu}
              >
                <Icon name="close" size={30} color="white" />
              </TouchableOpacity>
              <Text style={styles.menuTitle}>Select Game Type</Text>
              <View style={styles.buttonContainer}>
                {["1v1", "2v2", "3v3"].map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.gameButton,
                      gameType === type && styles.activeButton,
                    ]}
                    onPress={() => {
                      setGameType(type);
                      setSelectedTeammates({ teammate1: "", teammate2: "" });
                    }}
                  >
                    <Text style={styles.buttonText}>{type}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {(gameType === "2v2" || gameType === "3v3") && (
                <>
                  <Text style={styles.menuTitle}>Select Teammates</Text>
                  <View style={{ height: 200, overflow: "hidden" }}>
                    <ScrollView
                      style={{ flex: 1 }}
                      contentContainerStyle={{ paddingBottom: 10 }}
                      showsVerticalScrollIndicator={true}
                      nestedScrollEnabled={true}
                      keyboardShouldPersistTaps="handled"
                    >
                      {[
                        ...friends,
                        ...(gameType === "3v3"
                          ? [{ userName: "Random 1" }, { userName: "Random 2" }]
                          : [{ userName: "Random" }]),
                      ].map((friend, index) => (
                        <TouchableOpacity
                          key={index}
                          style={[
                            styles.teammateItem,
                            (selectedTeammates.teammate1 === friend.userName ||
                              selectedTeammates.teammate2 === friend.userName) &&
                              styles.selectedTeammate,
                          ]}
                          onPress={() => {
                            if (selectedTeammates.teammate1 === friend.userName) {
                              setSelectedTeammates((prev) => ({
                                ...prev,
                                teammate1: "",
                              }));
                            } else if (
                              selectedTeammates.teammate2 === friend.userName
                            ) {
                              setSelectedTeammates((prev) => ({
                                ...prev,
                                teammate2: "",
                              }));
                            } else if (gameType === "2v2") {
                              if (!selectedTeammates.teammate1) {
                                setSelectedTeammates((prev) => ({
                                  ...prev,
                                  teammate1: friend.userName,
                                }));
                              }
                            } else if (gameType === "3v3") {
                              if (!selectedTeammates.teammate1) {
                                setSelectedTeammates((prev) => ({
                                  ...prev,
                                  teammate1: friend.userName,
                                }));
                              } else if (!selectedTeammates.teammate2) {
                                setSelectedTeammates((prev) => ({
                                  ...prev,
                                  teammate2: friend.userName,
                                }));
                              }
                            }
                          }}
                        >
                          <Text style={styles.teammateText}>
                            {friend.userName}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                </>
              )}

              <Button
                title="Find Match"
                onPress={() => alert("Match Found!")} // Placeholder for match finding logic
                disabled={isButtonDisabled}
                color={isButtonDisabled ? "gray" : "rgb(218, 113, 5)"}
              />
            </View>
          </View>
        )}

        <Footer />
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(218, 113, 5)",
  },
  header: {
    position: "absolute",
    top: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "96%",
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
    color: "rgb(255, 255, 255)",
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
    color: "rgb(255, 255, 255)",
    position: "absolute",
    left: width * 0.08,
  },
  chatIcon: {
    padding: 5,
  },
  profilePic: {
    width: 25,
    height: 25,
    borderRadius: 20,
    marginRight: 10,
  },
  titleContainer: {
    width: "90%",
    alignItems: "center",
    position: "absolute",
    top: height * 0.075,
    flexDirection: "row",
    marginLeft: 50,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "rgb(255, 255, 255)",
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
    color: "rgb(255, 255, 255)",
    marginBottom: 10,
  },
  matchItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.3)",
  },
  matchDetailsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  matchCenterContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  matchUsername: {
    fontSize: 18,
    color: "rgb(255, 255, 255)",
    fontWeight: "bold",
  },
  matchText: {
    fontSize: 14,
    color: "rgb(255, 255, 255)",
  },
  winText: {
    color: "rgb(76, 175, 80)",
  },
  lossText: {
    color: "rgb(255, 61, 0)",
  },
  matchButtonContainer: {
    position: "absolute",
    bottom: height * 0.1,
    alignItems: "center",
    justifyContent: "center",
  },
  matchButton: {
    width: 110,
    height: 110,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 60,
    backgroundColor: "transparent",
    borderWidth: 3,
    borderColor: "rgb(255, 255, 255)",
    position: "absolute",
    bottom: -height * 0.02,
  },
  ring: {
    width: 90,
    height: 90,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "rgba(36, 36, 36, 0.55)",
    position: "absolute",
    top: 5,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  menu: {
    backgroundColor: "rgb(40, 50, 55)",
    borderRadius: 20,
    padding: 20,
    width: width * 0.85,
    maxHeight: height * 0.65,
  },
  closeButton: {
    alignSelf: "flex-end",
    marginBottom: 5,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "rgb(255, 255, 255)",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  gameButton: {
    backgroundColor: "rgb(56, 64, 71)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  activeButton: {
    backgroundColor: "rgb(218, 113, 5)",
  },
  buttonText: {
    color: "rgb(255, 255, 255)",
  },
  teammatesContainer: {
    maxHeight: 200,
  },
  teammateItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgb(58, 65, 71)",
  },
  selectedTeammate: {
    backgroundColor: "rgb(218, 113, 5)",
  },
  teammateText: {
    fontSize: 16,
    color: "rgb(255, 255, 255)",
  },
  findMatchButton: {
    backgroundColor: "rgb(56, 64, 71)",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  findMatchButtonDisabled: {
    backgroundColor: "rgb(85, 85, 85)",
  },
  findMatchButtonText: {
    color: "rgb(255, 255, 255)",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Index;