import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { getUserNames2, getFriends, addFriend, sendFriendRequest, removeFriend } from './database';
import Icon from 'react-native-vector-icons/Ionicons';
import Footer from './footer';
import {getLoggedInUser} from '../FirebaseConfig';

const Friends = () => {
  if (getLoggedInUser() == undefined){
    return <Text>Loading...</Text>;
  }
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingFriends, setIsAddingFriends] = useState(false);

  useEffect(() => {
    fetchUsers();
    fetchFriends();
  }, []);

  const fetchUsers = async () => {
    try {
      const usernameObjects = await getUserNames2();
      const currentUser = getLoggedInUser();
  
      if (!usernameObjects || usernameObjects.length === 0) {
        console.log("No users found");
        return;
      }

      const usersData = usernameObjects
        .filter(obj => obj.userName !== currentUser)
        .map(obj => ({ userName: obj.userName }));
  
      setUsers(usersData);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };
  

  const fetchFriends = async () => {
    try {
      const friendList = await getFriends(getLoggedInUser());
      if (!friendList || friendList.length === 0) {
        console.log("No friends found");
        setFriends([]);
        return;
      }

      const formattedFriends = friendList.map(friend => ({ userName: friend }));
      setFriends(formattedFriends);
    } catch (error) {
      console.error('Failed to fetch friends:', error);
    }
};



  useEffect(() => {
    setFilteredUsers(isAddingFriends ? users : friends);
  }, [isAddingFriends, users, friends]);

  const handleSearch = (text) => {
    setSearchTerm(text);
    const filtered = (isAddingFriends ? users : friends).filter(user =>
      user.userName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleAddFriend = async (friendUserName) => {
    try {
      const currentUserName = getLoggedInUser();
      const success = await sendFriendRequest(currentUserName, friendUserName);
      if (success) {
        Alert.alert('Request Sent', `Friend request sent to ${friendUserName}.`);
      } else {
        Alert.alert('Error', 'Failed to send friend request.');
      }
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };
  
  const handleRemoveFriend = async (friendUserName) => {
    try {
      const currentUserName = getLoggedInUser();
      const success = await removeFriend(currentUserName, friendUserName);
      if (success) {
        fetchFriends();
      }
    } catch (error) {
      console.error('Error removing friend:', error);
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{isAddingFriends ? 'ADD FRIENDS' : 'FRIENDS'}</Text>
          <TouchableOpacity onPress={() => setIsAddingFriends(!isAddingFriends)}>
            <Icon name={isAddingFriends ? "people-outline" : "person-add-outline"} size={30} color="white" />
          </TouchableOpacity>
      </View>

    <View style={styles.searchContainer}>
      <Icon name="search-outline" size={20} color="white" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder={isAddingFriends ? "Search users" : "Search friends"}
          value={searchTerm}
          onChangeText={handleSearch}
          placeholderTextColor="white"
        />
    </View>

    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >

    <View style={styles.userList}>
      {filteredUsers.map((user, index) => (
        <View key={index} style={styles.userItem}>
          <View style={styles.profileContainer}>
            <Image source={require('../assets/images/default_profile_picture.jpg')} style={styles.profilePic} />
            <Text style={styles.username}>{user.userName}</Text>
            {isAddingFriends ? (
              !friends.some(friend => friend.userName === user.userName) && (
                <TouchableOpacity style={styles.chatButton} onPress={() => handleAddFriend(user.userName)}>
                  <Icon name="add-circle-outline" size={30} color="white" />
                </TouchableOpacity>
              )
            ) : (
              <TouchableOpacity style={styles.chatButton} onPress={() => handleRemoveFriend(user.userName)}>
                <Icon name="remove-circle-outline" size={30} color="white" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      ))}
    </View>
  </ScrollView>
  <Footer />
</View>
  );
};

export default Friends;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(218, 113, 15)',
    padding: 20,
  },
  scrollContent: {
    paddingBottom: 100,
    flexGrow: 1,
  },
  userList: {
    flexGrow: 1,
  },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    marginTop: 20,
    width: '100%',
  },
  searchIcon: {
    position: 'absolute',
    left: 10,
  },
  searchBar: {
    height: 40,
    borderColor: 'rgb(78, 78, 78)',
    backgroundColor: 'rgba(78, 78, 78, 0.6)',
    borderWidth: 1,
    paddingLeft: 40,
    borderRadius: 5,
    color: 'white',
    width: '100%',
  },
  userList: {
    marginTop: 20,
    flexGrow: 1,
  },
  userItem: {
    marginBottom: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    backgroundColor: 'rgba(78, 78, 78, 0.3)',
    borderRadius: 15,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontSize: 18,
    color: 'white',
    flex: 1,
  },
  chatButton: {
    padding: 10,
    borderRadius: 5,
  },
});
