
import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Menu, Provider, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import profileImage from '../assets/images/default_profile_picture.jpg';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { getProfileRank } from './matchmaking';
import { getUser, initializeDatabase } from './database';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';

import bronze from '../assets/images/bronze.png';
import gold from '../assets/images/gold.png';
import platinum from '../assets/images/platinum.png';
import diamond from '../assets/images/diamond.png';


const rankPoints = 150; // Change this is update the rank
const rank = getProfileRank(rankPoints);

const rankImages = {
    Bronze: bronze,
    Gold: gold,
    Platinum: platinum,
    Diamond: diamond,
};

const rankImage = rankImages[rank];

export default function UserProfile({ navigation }) {
  return (
    <SQLiteProvider databaseName='example.db' onInit={initializeDatabase}>
    <Provider>
        {/* Gradient Background */}
        <Svg height="100%" width="100%" style={styles.background}>
          <Defs>
            <LinearGradient id="grad1" x1="50%" y1="0%" x2="50%" y2="100%">
              <Stop offset="20%" stopColor="rgb(218, 113, 15)" stopOpacity="1" />
              <Stop offset="85%" stopColor="rgb(63, 62, 61)" stopOpacity="2" />
            </LinearGradient>
          </Defs>
          <Rect width="100%" height="100%" fill="url(#grad1)" />
        </Svg>
        {/* Header with Settings Button */}
        <View style={styles.header}>
          <Text style={styles.title}>PROFILE</Text>
          <TouchableOpacity onPress={() => navigation.navigate('UserProfileSettings')}>
            <Icon name="settings-outline" size={30} color="black" />
          </TouchableOpacity>
        </View>
      <Content />
    </Provider>
    </SQLiteProvider>
  );
}
const Content = () => {
  //user = dbCode("Mana")
  const db = useSQLiteContext();
  const user = getUser(db,"Mana");
  return (
    <View style={styles.container}>
        {/* Gradient Background */}
        <Svg height="100%" width="100%" style={styles.background}>
          <Defs>
            <LinearGradient id="grad1" x1="50%" y1="0%" x2="50%" y2="100%">
              <Stop offset="20%" stopColor="rgb(218, 113, 15)" stopOpacity="1" />
              <Stop offset="85%" stopColor="rgb(63, 62, 61)" stopOpacity="2" />
            </LinearGradient>
          </Defs>
          <Rect width="100%" height="100%" fill="url(#grad1)" />
        </Svg>

        {/* Profile Picture with Rank Icon */}
        <View style={styles.profilePictureContainer}>
          <Image source={profileImage} style={styles.profilePicture} />
            <View style={styles.rankIconContainer}>
              <Image source={rankImage} style={styles.rankIcon} />
            </View>
        </View>

        {/* Name and Email */}
        <View style={styles.profileInfoContainer}>
          <Text style={styles.name}>
            {user.value != "fail"? <Text>{user.userName}</Text>: null }
          </Text>
          <Text style={styles.email}>
            {user.value != "fail"? <Text>{user.email}</Text>: null }
          </Text>
          <Text style={styles.email}>
            {user.value != "fail"? <Text>{user.phoneNumber}</Text>: null }
          </Text>
          <Text style={styles.email}>Rank: {rank}</Text>
        </View>

        {/* Divider */}
        <Divider style={styles.divider} />
      </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profilePictureContainer: {
    position: 'relative',
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: 'black',
  },
  rankIconContainer: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 50,
    height: 50, 
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(168, 168, 168)',
  },
  rankIcon: {
    width: 45,
    height: 45,
  },
  profileInfoContainer: {
    alignItems: 'center',
    marginTop: 2,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  email: {
    fontSize: 16,
    color: 'black',
    marginTop: 5,
  },
  divider: {
    width: '80%',
    marginVertical: 10,
  },
});
