// Header.js
import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.buttonWrapper}
        onPress={() => navigation.navigate('UserProfileSettings')}
      >
        <Image 
          source={require('../assets/images/settingsButton.png')} 
          style={styles.SbuttonImage}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    header: {
      backgroundColor: '#283237',
      height: 80,  // Fixed height for header
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1,
    },
    buttonWrapper: {
      width: 80,
      height: 80,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
      position: 'absolute',
      right: 20,
      top: 10,
    },
    SbuttonImage: {
      width: '75%',
      height: '75%',
    },
  });

export default Header;
