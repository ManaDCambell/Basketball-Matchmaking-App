import React, { useEffect, useRef, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, Dimensions, ScrollView, Button } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { useNavigationState } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';

import { getLoggedInUser, db } from '../FirebaseConfig';
import { getUser, getFriends, sendMatchRequest } from './database';
import { onSnapshot, query, where, collection } from 'firebase/firestore';

import UserProfile from './userProfile';
import Matchmaking from './matchmaking';
import Friends from './friends';
import UserProfileSettings from './userProfileSettings';
import Tournament from './tournament';
import Login from './login';
import Signup from './signup';
import matchmakingLobbyPage from './matchmakingLobbyPage';
import MatchmakingReport from './matchmakingReport';
import Match from './match';
import Notifications from './notifications';

import Header from './Header';
import Footer from './footer';

import logo from '../assets/images/appLogo.png';
import Icon from 'react-native-vector-icons/Ionicons';

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
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="Matchmaking" component={Matchmaking} />
      <Stack.Screen name="Friends" component={Friends} />
      <Stack.Screen name="UserProfileSettings" component={UserProfileSettings} />
      <Stack.Screen name="Tournament" component={Tournament} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="MatchmakingLobbyPage" component={matchmakingLobbyPage} />
      <Stack.Screen name="MatchmakingReport" component={MatchmakingReport} />
      <Stack.Screen name="Match" component={Match} />
      <Stack.Screen name="Notifications" component={Notifications} />
    </Stack.Navigator>
  );
}

function HomeScreen({ navigation }) {
  const isFocused = useIsFocused();

  const isOnMatchScreen = useNavigationState((state) => {
    const currentRoute = state.routes[state.index];
    return currentRoute.name === "Match";
  });

  useEffect(() => {
    if (!isFocused) return;

    const userName = getLoggedInUser();
    const q = query(collection(db, "users"), where("userName", "==", userName));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const userData = snapshot.docs[0].data();
        if (userData?.activeMatch?.confirmed) {
          navigation.navigate("Match");
        } else {
          navigation.navigate("Home");
        }
      }
    });

    return () => unsubscribe();
  }, [isFocused]);

  useEffect(() => {
    const userName = getLoggedInUser();
    const q = query(collection(db, "users"), where("userName", "==", userName));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const userData = snapshot.docs[0].data();
        if (!userData?.activeMatch?.confirmed) {
          navigation.navigate("Home");
        }
      }
    });

    return () => unsubscribe();
  }, []);

  if (getLoggedInUser() == undefined) {
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
  const [showMatchList, setShowMatchList] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [requestedMatchIndex, setRequestedMatchIndex] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const result = await getUser(getLoggedInUser());
      setUser(result);
      setLoading(false);
    }
    fetchUser();
    fetchFriends();
  }, []);

  const fetchFriends = async () => {
    try {
      const friendList = await getFriends(getLoggedInUser());
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
            <View style={styles.menuHeader}>
              <Text style={styles.menuTitle}>Select Game Type</Text>
              <TouchableOpacity onPress={toggleMatchmakingMenu}>
                <Icon name="close" size={28} color="white" />
              </TouchableOpacity>
            </View>
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
                        ? [
                            { userName: "Random (non-friend) 1" },
                            { userName: "Random (non-friend) 2" },
                          ]
                        : [{ userName: "Random (non-friend)" }]),
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
              onPress={() => setShowMatchList(true)}
              disabled={isButtonDisabled}
              color={isButtonDisabled ? "gray" : "rgb(218, 113, 5)"}
            />
          </View>
        </View>
      )}

      {showMatchList && (
        <View style={styles.overlay}>
          <View style={styles.fullMenu}>
            <View style={styles.menuHeader}>
              <TouchableOpacity onPress={() => setShowMatchList(false)}>
                <Icon name="arrow-back" size={28} color="white" />
              </TouchableOpacity>
              <Text style={styles.menuTitle}>{gameType} Matches Near You</Text>
              <View style={{ width: 28 }} />
            </View>

            {/* Match List */}
            <ScrollView
              style={styles.matchScroll}
              contentContainerStyle={{ paddingBottom: 20 }}
              showsVerticalScrollIndicator={false}
            >
              {friends.map((friend, index) => (
                <View key={index} style={styles.matchRequestBox}>
                  <Text style={styles.matchInfo}>
                    {friend.userName} – OU Rec Center
                  </Text>
                  <TouchableOpacity
                    style={[
                      styles.requestButton,
                      requestedMatchIndex === index && styles.requestedButton,
                    ]}
                    onPress={async () => {
                      const from = getLoggedInUser();
                      const to = friend.userName;
                      const success = await sendMatchRequest(from, to);
                      if (success) setRequestedMatchIndex(index);
                    }}
                  >
                    <Text style={styles.buttonText}>
                      {requestedMatchIndex === index ? "Requested" : "Request"}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
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
  matchRequestBox: {
    backgroundColor: "rgba(78, 78, 78, 0.4)",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  matchInfo: {
    color: "white",
    fontSize: 14,
    flex: 1,
    marginRight: 10,
  },
  requestButton: {
    backgroundColor: "rgb(218, 113, 5)",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
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
    height: 250,
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
  requestedButton: {
    backgroundColor: "rgb(121, 62, 20)",
  },

  fullMenu: {
    backgroundColor: "rgb(40, 50, 55)",
    borderRadius: 20,
    padding: 20,
    width: width * 0.9,
    height: height * 0.5,
  },
  menuHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  matchScroll: {
    flex: 1,
    marginBottom: 10,
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
    top: height * 0.085,
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
    top: height * 0.4,
    width: "90%",
    maxHeight: 275,
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
    color: "rgb(255, 255, 255)",
  },
  menuHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
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
