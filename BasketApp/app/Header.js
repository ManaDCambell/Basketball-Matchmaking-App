import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Dimensions, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const { height } = Dimensions.get('window');

const Header = () => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.header}>

      <TouchableOpacity style={styles.tempButton} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.tempButtonText}>Login</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.tempButton} onPress={() => navigation.navigate('Database')}>
        <Text style={styles.tempButtonText}>Database</Text>
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
    height: 60,
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
    marginRight: 50,
    borderWidth: 1,
    borderColor: '#000',
  },
  tempButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default Header;