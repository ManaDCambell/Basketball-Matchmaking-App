import React, { useState, useEffect } from "react";
import {getMatchByUserName} from "./matchdb";
import {
  View,
  Text,
  Switch,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Header from "./Header";
import Footer from "./footer";
import { getLoggedInUser } from "../FirebaseConfig";
import { getUser, getAllUsers, setLookingForMatch } from "./database";

const { width, height } = Dimensions.get("window");

const Matchmaking = () => {
  const [matchHistory, setMatchHistory] = useState([]);
  const [user, setUser] = useState(null);
  const [looking, setLooking] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const username = getLoggedInUser();
        if (!username) return;

        const userData = await getUser(username);
        const allUsers = await getAllUsers();
        const r2 = await getMatchByUserName(getLoggedInUser());
        setMatchHistory(r2);
        setUser(userData);
        setLooking(userData?.lookingForMatch === 1);
        setLeaderboard(allUsers.sort((a, b) => b.elo - a.elo));
      } catch (err) {
        console.error("Error loading matchmaking:", err);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const handleToggle = async (value) => {
    setLooking(value);
    if (user) {
      await setLookingForMatch(user.userName, value ? 1 : 0);
    }
  };

  function getType(num){
      if (num === 0){
        return "1v1"
      }
      else if (num === 1){
        return "2v2"
      }
      else if (num === 2){
        return "3v3"
      }
    }
  
    function getResult(match){
      if (match.team1.includes(getLoggedInUser())){
        if (match.team1Score > match.team2Score){
          return "Win"
        }
        else {
          return "Loss"
        }
      }
      else {
        if (match.team1Score < match.team2Score){
          return "Win"
        }
        else {
          return "Loss"
        }
      }
    }
  
    function getTeamP1(match) {
        const currentUser = getLoggedInUser();
        return currentUser;
      }
    
    function getTeamP2(match) {
      const currentUser = getLoggedInUser();
      const allPlayers = [...(match.team1 || []), ...(match.team2 || [])];
      const opponents = allPlayers.filter((player) => player !== currentUser);
      return opponents.join(", ");
    }

    function getMatchEloChange(match){
      if (match.team1.includes(getLoggedInUser())){
        return match.team1EloChange
      }
      else {
        return match.team2EloChange
      }
    }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading Matchmaking...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.pageContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>MATCHMAKING</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.customToggleContainer}>
            <TouchableOpacity
              style={[styles.toggleOption, !looking && styles.toggleSelected]}
              onPress={() => handleToggle(false)}
            >
              <Text
                style={[
                  styles.toggleText,
                  !looking && styles.toggleTextSelected,
                ]}
              >
                Not Looking
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.toggleOption, looking && styles.toggleSelected]}
              onPress={() => handleToggle(true)}
            >
              <Text
                style={[
                  styles.toggleText,
                  looking && styles.toggleTextSelected,
                ]}
              >
                Looking
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Leaderboard (non-scrollable) */}
        <View style={styles.matchBox}>
          <Text style={styles.matchTitle}>Leaderboard</Text>
          {leaderboard.slice(0, 4).map((player, index) => (
            <View key={index} style={styles.leaderboardRow}>
              <Text
                style={[
                  styles.leaderboardRank,
                  index === 0
                    ? styles.rank1
                    : index === 1
                    ? styles.rank2
                    : index === 2
                    ? styles.rank3
                    : styles.rankDefault,
                ]}
              >
                {index + 1}.
              </Text>
              <Text style={styles.leaderboardUsername}>{player.userName}</Text>
              <Text style={styles.leaderboardElo}>Elo: {player.elo}</Text>
            </View>
          ))}
        </View>

        {/* Scrollable Recent Matches */}
        <View style={styles.matchBox}>
          <Text style={styles.matchTitle}>Recent Matches</Text>
          <ScrollView style={styles.scrollablePanel}>
            {matchHistory.map((match, index) => (
              <View key={index} style={styles.matchItem}>
                <View style={styles.matchDetailsContainer}>
                  <Text style={styles.matchUsername}>{getTeamP1(match)}</Text>
                </View>
                <View style={styles.matchCenterContainer}>
                  <Text style={styles.matchText}>{getType(match.matchType)}</Text>
                  <Text style={styles.matchText}>Score: {match.team1Score}-{match.team2Score}</Text>
                  <Text
                    style={[
                      styles.matchText,
                      getResult(match) === "Win" ? styles.winText : styles.lossText,
                    ]}
                  >
                    {getResult(match)} ({getMatchEloChange(match)})
                  </Text>
                </View>
                <View style={styles.matchDetailsContainer}>
                  <Text style={styles.matchUsername}>{getTeamP2(match,1)}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>

      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(218, 113, 15)",
  },
  pageContent: {
    paddingTop: 80,
    paddingBottom: 100,
    paddingHorizontal: 20,
    flex: 1,
  },
  titleContainer: {
    marginBottom: 20,
    alignItems: "flex-start",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textAlign: "left",
  },
  elo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginleft: 20,
  },
  section: {
    marginBottom: 30,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  matchBox: {
    width: "100%",
    backgroundColor: "rgba(36, 36, 36, 0.55)",
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    maxHeight: 275,
  },
  matchTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  scrollablePanel: {
    maxHeight: 350,
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
    fontWeight: "bold",
    color: "white",
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
  leaderboardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.3)",
    paddingHorizontal: 10,
  },
  leaderboardRank: {
    width: 30,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
  },
  leaderboardUsername: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    color: "white",
  },
  leaderboardElo: {
    width: 80,
    fontSize: 17,
    textAlign: "right",
    color: "white",
  },
  rank1: {
    color: "gold",
    fontSize: 17,
    fontWeight: "bold",
  },
  rank2: {
    color: "silver",
    fontSize: 17,
    fontWeight: "bold",
  },
  rank3: {
    color: "#cd7f32",
    fontSize: 17,
    fontWeight: "bold",
  },
  rankDefault: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#283237",
  },
  loadingText: {
    color: "white",
    fontSize: 18,
  },
  customToggleContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 25,
    overflow: "hidden",
    width: 220,
    height: 40,
    alignSelf: "center",
    marginBottom: 10,
  },
  toggleOption: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgb(121, 62, 20)',
  },
  toggleSelected: {
    backgroundColor: "white",
  },
  toggleText: {
    fontSize: 14,
    color: "white",
    fontWeight: "600",
  },
  toggleTextSelected: {
    color: "gray",
  },
});

export default Matchmaking;

export const getProfileRank = (rankPoints) => {
  if (rankPoints >= 300) {
    return "Diamond";
  } else if (rankPoints >= 200) {
    return "Platinum";
  } else if (rankPoints >= 100) {
    return "Gold";
  } else {
    return "Bronze";
  }
};
