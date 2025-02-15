// Footer.js
import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const Footer = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={() => navigation.navigate('UserProfile')}>
        <Image source={require('../assets/images/UserProfileButton.png')} style={styles.buttonImage} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Matchmaking')}>
        <Image source={require('../assets/images/matchmakingButton.png')} style={styles.buttonImage} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Friends')}>
        <Image source={require('../assets/images/friendsButton.png')} style={styles.buttonImage} />
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
      height: 85,
      justifyContent: 'space-evenly',
      alignItems: 'center',
      zIndex: 1,
    },
    buttonImage: {
      width: 60,
      height: 60,
      resizeMode: 'contain',
    },
  });

export default Footer;
