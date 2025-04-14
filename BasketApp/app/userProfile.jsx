import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';
import { Provider, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import profileImage from '../assets/images/default_profile_picture.jpg';
import { getProfileRank } from './matchmaking';
import { getUser} from './database';
import {getLoggedInUser} from '../FirebaseConfig';
import Header from './Header';
import Footer from './footer';

import WeekAvailability from './WeekAvailability';

import bronze from '../assets/images/bronze.png';
import gold from '../assets/images/gold.png';
import platinum from '../assets/images/platinum.png';
import diamond from '../assets/images/diamond.png';

const { width, height } = Dimensions.get('window');

const matchHistory = [
  { opponent: 'Player1', type: '1v1', score: '21-18', result: 'Win', eloChange: '+15' },
  { opponent: 'TeamX', type: '3v3', score: '35-40', result: 'Loss', eloChange: '-10' },
  { opponent: 'DuoTeam', type: '2v2', score: '25-22', result: 'Win', eloChange: '+12' },
  { opponent: 'Player2', type: '1v1', score: '18-15', result: 'Win', eloChange: '+20' },
  { opponent: 'TeamY', type: '3v3', score: '30-35', result: 'Loss', eloChange: '-5' }
];

export default function UserProfile({ navigation }) {
  return (
      <Provider>
        <View style={styles.container}>
          {/* Add Header */}
          {/* <Header /> */}
          <View style={styles.topHalf} />
          <View style={styles.bottomHalf} />

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>PROFILE</Text>
            <TouchableOpacity onPress={() => navigation.navigate('UserProfileSettings')}>
              <Icon name="cog-outline" size={40} color="white" />
            </TouchableOpacity>
          </View>

          <Content />
          
        </View>
      </Provider>
  );
}

const Content = () => {
  if (getLoggedInUser() == undefined){
    return <Text>Loading...</Text>;
  }
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  

  const [selectedMenu, setSelectedMenu] = useState('Availability');

  const rankImages = {
      Bronze: bronze,
      Gold: gold,
      Platinum: platinum,
      Diamond: diamond,
  };


  useEffect(() => {
    async function getData() {
      const result = await getUser(getLoggedInUser());
      setUser(result);
      setLoading(false);
    }
    getData();
  }, []);

  
  if (loading){
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.contentContainer}>
      {/* Profile Picture with Rank Icon */}
      <View style={styles.profilePictureContainer}>
        <Image source={profileImage} style={styles.profilePicture} />
        <View style={styles.rankIconContainer}>
          <Image source={rankImages[getProfileRank(user.elo)]} style={styles.rankIcon} />
        </View>
      </View>

      {/* Name and Email */}
      <View style={styles.profileInfoContainer}>
        <Text style={styles.name}>{user.value !== "fail" ? user.userName : null}</Text>
        <Text style={styles.email}>{user.value !== "fail" ? user.email : null}</Text>
        <Text style={styles.email}>{user.value !== "fail" ? user.phoneNumber : null}</Text>
        <Text style={styles.email}>Elo: {user.value !== "fail" ? user.elo : null}<Text style={styles.verticalDiv}> | </Text>{getProfileRank(user.elo)}</Text>
      </View>

      <Divider style={styles.divider} />

      {/* Menu Buttons with Underline */}
      <View style={styles.menuContainer}>
        {/* {['Availability', 'Match History'].map((label) => ( */}
        {['Availability'].map((label) => (
          <TouchableOpacity
            key={label}
            onPress={() => setSelectedMenu(label)}
            style={styles.menuButton}
          >
            <Text style={styles.menuText}>{label}</Text>
            {selectedMenu === label && <View style={styles.selectedBar} />}
          </TouchableOpacity>
        ))}
      </View>

      {/* Display different sections based on selected menu */}
      {selectedMenu === 'Availability' && <WeekAvailability />}
      {/* Add Footer */}
      {selectedMenu === 'Match History' && (
  <View style={styles.matchBox}>
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
)}

      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  topHalf: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '50%',
    backgroundColor: 'rgb(218, 113, 15)',
  },
  bottomHalf: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '50%',
    backgroundColor: 'rgb(78, 78, 78)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '96%',
    marginTop: 20,
    marginRight: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 24,
    color: 'white'
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 10,
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
    marginTop: 20,
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  email: {
    fontSize: 16,
    color: 'white',
    marginTop: 5,
  },
  divider: {
    width: '80%',
    marginVertical: 15,
    height: 1,
    color: 'white'
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: 'rgb(218, 113, 15)',
  },
  menuButton: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  menuText: {
    color: 'white',
    fontSize: 16,
  },
  selectedBar: {
    marginTop: 5,
    width: '80%',
    height: 3,
    backgroundColor: 'white',
    borderRadius: 2,
  },
  verticalDiv: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white'
  },
  matchBox: {
    width: "92%",
    backgroundColor: "rgb(168, 168, 168)",
    borderRadius: 15,
    padding: 15,
    marginTop: 20,
  },
  matchTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
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
    color: "black",
    fontWeight: "bold",
  },
  matchText: {
    fontSize: 14,
    color: "black",
  },
  winText: {
    color: "rgb(76, 175, 80)",
    fontWeight: "bold",
  },
  lossText: {
    color: "rgb(255, 61, 0)",
    fontWeight: "bold",
  },
  scrollContainer: {
    maxHeight: 300,
  },
  
});

//test

