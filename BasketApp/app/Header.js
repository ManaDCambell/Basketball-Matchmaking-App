import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Dimensions, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { logOut } from './database';
import Icon from 'react-native-vector-icons/Ionicons';

const { height, width } = Dimensions.get('window');

const Header = () => {
  const navigation = useNavigation();
  const handleSignOut = async () =>{
    logOut();
    navigation.navigate('Login');
  }
  
  return (
    <View style={styles.header}>

      <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
        <Icon name="notifications-outline" size={40} color="white" style={{ marginRight: width * 0.75 }} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('UserProfileSettings')}>
        <Icon name="cog-outline" size={40} color="white" />
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
 
  iconWrapper: {
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    backgroundColor: '#283237',
    height: 65,
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 1,
    paddingHorizontal: 10,
  },
 
  tempButton: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000',
    position: 'absolute',
    top: 12,
    right: 320,

  },
  tempButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default Header;