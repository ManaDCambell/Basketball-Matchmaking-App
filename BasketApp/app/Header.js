import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const { height } = Dimensions.get('window');

const Header = () => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.header}>

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
});

export default Header;