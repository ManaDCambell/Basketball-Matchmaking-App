// Footer.js
import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const { height } = Dimensions.get('window');

const Footer = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.footer}>
      {/* <TouchableOpacity onPress={() => navigation.navigate('UserProfile')}>
        <Image source={require('../assets/images/UserProfileButton.png')} style={styles.buttonImage} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Matchmaking')}>
        <Image source={require('../assets/images/matchmakingButton.png')} style={styles.buttonImage} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Friends')}>
        <Image source={require('../assets/images/friendsButton.png')} style={styles.buttonImage} />
      </TouchableOpacity> */}
      
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Icon name="home" size={40} color="white" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Matchmaking')}>
        <Icon name="basketball" size={40} color="white" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Friends')}>
        <Icon name="people" size={40} color="white" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('UserProfile')}>
        <Icon name="person" size={40} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    footer: {
      flexDirection: 'row',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#283237',
      height: 60,
      justifyContent: 'space-evenly',
      alignItems: 'center',
      zIndex: 1,
    },
    buttonImage: {
      width: 60,
      height: 60,
      resizeMode: 'contain',
    },
    labels: {
      color: 'white',
      fontSize: 12,
    },
  });

export default Footer;
