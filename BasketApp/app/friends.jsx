import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { getUser } from './database';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from './Header';
import Footer from './footer';

const Friends = () => {
  const db = useSQLiteContext();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    console.log('Fetching users...');
    const usernames = ["Mana", "Mana2", "Mana3", "NotMana", "Beans"]; // Add users here
    try {
      const usersData = [];
      for (const username of usernames) {
        const user = await getUser(db, username);
        if (user.value !== "fail") {
          usersData.push(user);
        }
      }
      console.log('Fetched users:', usersData);
      setUsers(usersData);
      setFilteredUsers(usersData);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const handleSearch = (text) => {
    setSearchTerm(text);
    const filtered = users.filter(user => user.userName.toLowerCase().includes(text.toLowerCase()));
    setFilteredUsers(filtered);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>FRIENDS</Text>
        <TouchableOpacity onPress={() => {/* Add friend functionality */}}>
          <Icon name="add-circle-outline" size={30} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Icon name="search-outline" size={20} color="white" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search current friends"
          value={searchTerm}
          onChangeText={handleSearch}
          placeholderTextColor="white"
        />
      </View>

      <View style={styles.userList}>
        {filteredUsers.map((user, index) => (
          <View key={index} style={styles.userItem}>
            <View style={styles.profileContainer}>
              <Image source={require('../assets/images/default_profile_picture.jpg')} style={styles.profilePic} />
              <Text style={styles.username}>{user.userName}</Text>
              <TouchableOpacity style={styles.chatButton}>
                <Icon name="chatbox-outline" size={30} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
      <Footer />
    </View>
  );
};


const FriendsWithDatabase = () => (
  <SQLiteProvider databaseName="example.db">
    <Friends />
  </SQLiteProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(218, 113, 15)',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  addIcon: {
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

export default FriendsWithDatabase;