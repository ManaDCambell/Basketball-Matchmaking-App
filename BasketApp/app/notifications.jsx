import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { getLoggedInUser } from "../FirebaseConfig";
import { getUser, getFriends } from "./database";
import {
  updateDoc,
  doc,
  getDocs,
  query,
  where,
  collection,
} from "firebase/firestore";
import { db } from "../FirebaseConfig";
import Footer from "./footer";
import Header from "./Header";
import { useNavigation } from "@react-navigation/native";

const Notifications = () => {
  const [requests, setRequests] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [requestsLoading, setRequestsLoading] = useState(true);
  const [matchRequests, setMatchRequests] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    async function load() {
      const user = getLoggedInUser();
      if (!user) return;
      const data = await getUser(user);
      setMatchRequests(data.matchRequestsReceived || []);
    }
    load();
  }, []);

  useEffect(() => {
    loadFriendRequests();
  }, [refresh]);

  const loadFriendRequests = async () => {
    const userName = getLoggedInUser();
    if (!userName) return;

    const userData = await getUser(userName);
    setRequests(userData.friendRequestsReceived || []);
  };

  const handleAccept = async (fromUser) => {
    const currentUser = getLoggedInUser();
    if (!currentUser) return;

    try {
      const usersRef = query(
        collection(db, "users"),
        where("userName", "in", [currentUser, fromUser])
      );
      const snapshot = await getDocs(usersRef);

      const userDocs = {};
      snapshot.forEach((docSnap) => {
        userDocs[docSnap.data().userName] = {
          id: docSnap.id,
          data: docSnap.data(),
        };
      });

      const myDoc = doc(db, "users", userDocs[currentUser].id);
      const fromDoc = doc(db, "users", userDocs[fromUser].id);

      const myFriends = userDocs[currentUser].data.friends || [];
      const fromFriends = userDocs[fromUser].data.friends || [];
      const myReceived =
        userDocs[currentUser].data.friendRequestsReceived || [];
      const fromSent = userDocs[fromUser].data.friendRequestsSent || [];

      await Promise.all([
        updateDoc(myDoc, {
          friends: [...myFriends, fromUser],
          friendRequestsReceived: myReceived.filter(
            (name) => name !== fromUser
          ),
        }),
        updateDoc(fromDoc, {
          friends: [...fromFriends, currentUser],
          friendRequestsSent: fromSent.filter((name) => name !== currentUser),
        }),
      ]);

      Alert.alert("Friend Added", `${fromUser} is now your friend.`);
      setRefresh(!refresh);
    } catch (err) {
      console.error("Error accepting friend request:", err);
    }
  };

  const handleDecline = async (fromUser) => {
    const currentUser = getLoggedInUser();
    if (!currentUser) return;

    try {
      const usersRef = query(
        collection(db, "users"),
        where("userName", "in", [currentUser, fromUser])
      );
      const snapshot = await getDocs(usersRef);

      const userDocs = {};
      snapshot.forEach((docSnap) => {
        userDocs[docSnap.data().userName] = {
          id: docSnap.id,
          data: docSnap.data(),
        };
      });

      const myDoc = doc(db, "users", userDocs[currentUser].id);
      const fromDoc = doc(db, "users", userDocs[fromUser].id);

      const myReceived =
        userDocs[currentUser].data.friendRequestsReceived || [];
      const fromSent = userDocs[fromUser].data.friendRequestsSent || [];

      await Promise.all([
        updateDoc(myDoc, {
          friendRequestsReceived: myReceived.filter(
            (name) => name !== fromUser
          ),
        }),
        updateDoc(fromDoc, {
          friendRequestsSent: fromSent.filter((name) => name !== currentUser),
        }),
      ]);

      setRefresh(!refresh);
    } catch (err) {
      console.error("Error declining friend request:", err);
    }
  };

  const handleAcceptMatch = async (fromUser) => {
    const currentUser = getLoggedInUser();
    if (!currentUser) return;

    try {
      const usersRef = query(
        collection(db, "users"),
        where("userName", "in", [currentUser, fromUser])
      );
      const snapshot = await getDocs(usersRef);

      const userDocs = {};
      snapshot.forEach((docSnap) => {
        userDocs[docSnap.data().userName] = {
          id: docSnap.id,
          data: docSnap.data(),
        };
      });

      const myDoc = doc(db, "users", userDocs[currentUser].id);
      const fromDoc = doc(db, "users", userDocs[fromUser].id);

      const myRequests = userDocs[currentUser].data.matchRequestsReceived || [];
      const fromRequests = userDocs[fromUser].data.matchRequestsSent || [];

      await Promise.all([
        updateDoc(myDoc, {
          matchRequestsReceived: myRequests.filter((name) => name !== fromUser),
          activeMatch: { opponent: fromUser, confirmed: true },
        }),
        updateDoc(fromDoc, {
          matchRequestsSent: fromRequests.filter(
            (name) => name !== currentUser
          ),
          activeMatch: { opponent: currentUser, confirmed: true },
        }),
      ]);

      navigation.navigate("Match");
    } catch (err) {
      console.error("Error accepting match request:", err);
    }
  };

  const handleDeclineMatch = async (fromUser) => {
    const currentUser = getLoggedInUser();
    if (!currentUser) return;

    try {
      const usersRef = query(
        collection(db, "users"),
        where("userName", "in", [currentUser, fromUser])
      );
      const snapshot = await getDocs(usersRef);

      const userDocs = {};
      snapshot.forEach((docSnap) => {
        userDocs[docSnap.data().userName] = {
          id: docSnap.id,
          data: docSnap.data(),
        };
      });

      const myDoc = doc(db, "users", userDocs[currentUser].id);
      const fromDoc = doc(db, "users", userDocs[fromUser].id);

      const myRequests = userDocs[currentUser].data.matchRequestsReceived || [];
      const fromRequests = userDocs[fromUser].data.matchRequestsSent || [];

      await Promise.all([
        updateDoc(myDoc, {
          matchRequestsReceived: myRequests.filter((name) => name !== fromUser),
        }),
        updateDoc(fromDoc, {
          matchRequestsSent: fromRequests.filter(
            (name) => name !== currentUser
          ),
        }),
      ]);

      setMatchRequests(myRequests.filter((name) => name !== fromUser));
    } catch (err) {
      console.error("Error declining match request:", err);
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Friend Requests</Text>
        {requests.length === 0 ? (
          <Text style={styles.empty}>No pending friend requests.</Text>
        ) : (
          requests.map((user, index) => (
            <View key={index} style={styles.requestBox}>
              <Text style={styles.username}>{user}</Text>
              <View style={styles.actions}>
                <TouchableOpacity
                  onPress={() => handleAccept(user)}
                  style={styles.iconButton}
                >
                  <Icon
                    name="checkmark-circle-outline"
                    size={30}
                    color="white"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDecline(user)}
                  style={styles.iconButton}
                >
                  <Icon name="close-circle-outline" size={30} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}

        <Text style={styles.title}>Match Requests</Text>
        {matchRequests.length === 0 ? (
          <Text style={styles.empty}>No pending match requests.</Text>
        ) : (
          matchRequests.map((user, index) => (
            <View key={index} style={styles.requestBox}>
              <Text style={styles.username}>{user}</Text>
              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => handleAcceptMatch(user)}
                >
                  <Icon name="play-circle-outline" size={30} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => handleDeclineMatch(user)}
                >
                  <Icon name="close-circle-outline" size={30} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
      <Footer />
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(218, 113, 15)",
    paddingTop: 80,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
    marginBottom: 15,
    paddingLeft: 20,
  },
  scroll: {
    paddingBottom: 100,
  },
  empty: {
    fontSize: 18,
    color: "white",
    paddingLeft: 20,
    paddingBottom: 30,
  },
  requestBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(78, 78, 78, 0.3)",
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    width: "92%",
    alignSelf: "center",
  },
  username: {
    color: "white",
    fontSize: 18,
    flex: 1,
  },
  actions: {
    flexDirection: "row",
    gap: 10,
  },
  iconButton: {
    marginLeft: 10,
  },
});
