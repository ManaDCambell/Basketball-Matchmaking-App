import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Menu, Provider, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import profileImage from '../assets/images/default_profile_picture.jpg';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';

export default function UserProfile({ navigation }) {
  const [visible, setVisible] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);

  const showMenu = (menuName) => {
    setSelectedMenu(menuName);
    setVisible(true);
  };

  const hideMenu = () => {
    setVisible(false);
    setSelectedMenu(null);
  };

  return (
    <Provider>
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

        {/* Header with Settings Button */}
        <View style={styles.header}>
          <Text style={styles.title}>PROFILE</Text>
          <TouchableOpacity onPress={() => navigation.navigate('UserProfileSettings')}>
            <Icon name="settings-outline" size={30} color="black" />
          </TouchableOpacity>
        </View>

        {/* Profile Picture */}
        <View style={styles.profilePictureContainer}>
          <Image
            source={profileImage}
            style={styles.profilePicture}
          />
        </View>

        {/* Name and Email */}
        <View style={styles.profileInfoContainer}>
          <Text style={styles.name}>Name</Text>
          <Text style={styles.email}>name@example.com</Text>
          <Text style={styles.email}>248-123-1234</Text>
        </View>

        {/* Divider */}
        <Divider style={styles.divider} />
      </View>
    </Provider>
  );
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
    marginTop: 20,
    alignItems: 'center',
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: 'black',
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
