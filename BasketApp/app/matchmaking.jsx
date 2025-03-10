import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet, TouchableOpacity } from 'react-native';
import bronze from '../assets/images/bronze.png';
import gold from '../assets/images/gold.png';
import platinum from '../assets/images/platinum.png';
import diamond from '../assets/images/diamond.png';
import Header from './Header';
import Footer from './footer';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import { matchmakingLobbyPage } from './matchmakingLobbyPage';
import profileImage from '../assets/images/default_profile_picture.jpg';
import { getUser} from './database';

const { width, height } = Dimensions.get('window');


function Matchmaking () {
    const navigation = useNavigation();
    const [user, setUser] = useState(null);
      const [loading, setLoading] = useState(true);
    
      const rankImages = {
          Bronze: bronze,
          Gold: gold,
          Platinum: platinum,
          Diamond: diamond,
      };
    
    
      useEffect(() => {
        async function getData() {
          const result = await getUser("Pab");
          setUser(result);
          setLoading(false);
        }
        getData();
      }, []);
    const [rankPoints] = useState(150); //Temporary example ELO of 250
    // Change image of rank based on ELO passed thru useState()
    let rank, rankImage, distanceFromRankUp;

    if (rankPoints >= 300) {
        rank = 'Diamond';
        rankImage = diamond;
        distanceFromRankUp = 0;
    } else if (rankPoints >= 200) {
        rank = 'Platinum';
        rankImage = platinum;
        distanceFromRankUp = 300 - rankPoints;
    } else if (rankPoints >= 100) {
        rank = 'Gold';
        rankImage = gold;
        distanceFromRankUp = 200 - rankPoints;
    } else {
        rank = 'Bronze';
        rankImage = bronze;
        distanceFromRankUp = 100 - rankPoints;
    }
    return(
      <View style={styles.container}> 
        <View style={styles.contentContainer}>
            {/* Profile Picture with Rank Icon */}
            <View style={styles.profilePictureContainer}>
              <Image source={profileImage} style={styles.profilePicture} />
              <View style={styles.rankIconContainer}>
                <Image source={rankImage} style={styles.rankIcon} />
              </View>
            </View>

            <View style={styles.profileInfoContainer}>
                <Text style={styles.text}>Current Rank: {rank}</Text>
                <Text style={styles.text}>Current Elo: {rankPoints}</Text>
                <Text style={styles.text}>You're {distanceFromRankUp} points away from ranking up!</Text>
            </View>

            <View style={styles.menuContainer}>
                <Button title="1v1" onPress={() => navigation.navigate('MatchmakingLobbyPage')} />
                <Button title="2v2" onPress={() => navigation.navigate('MatchmakingLobbyPage')} />
                <Button title="3v3" onPress={() => navigation.navigate('MatchmakingLobbyPage')} />
            </View>
        </View>
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
      fontSize: 24,
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
    }
  });
  export const getProfileRank = (rankPoints) => {
    if (rankPoints >= 300) {
        return 'Diamond';
    } else if (rankPoints >= 200) {
        return 'Platinum';
    } else if (rankPoints >= 100) {
        return 'Gold';
    } else {
        return 'Bronze';
    }
  };

export default Matchmaking;
