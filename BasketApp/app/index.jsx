import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Svg, { Path } from "react-native-svg";

import Database from './database';
import UserProfile from './userProfile';
import Matchmaking from './matchmaking'; 
import Friends from './friends'; 
import UserProfileSettings from './userProfileSettings';
import Tournament from './tournament';
import Login from './login';
import Signup from './signup';

const Stack = createStackNavigator();
const { width, height } = Dimensions.get('window');

function Index() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="Database" component={Database} />
      <Stack.Screen name="Matchmaking" component={Matchmaking} /> 
      <Stack.Screen name="Friends" component={Friends} /> 
      <Stack.Screen name="UserProfileSettings" component={UserProfileSettings} />
      <Stack.Screen name="Tournament" component={Tournament} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
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

      <Svg height="100%" width="100%" style={styles.svgContainer}>

        <Path d="M -10 305 Q 190 500 370 330 T 840 330" 
        stroke="black" 
        strokeWidth="10" 
        fill="none" />

        <Path d="M 220 50 A 50 300 0 0 0 260 750" 
        stroke="black" 
        strokeWidth="10" 
        fill="none" />

        <Path d="M -10 95 A 400 200 0 0 0 420 95" 
        stroke="black" 
        strokeWidth="10" 
        fill="none" />

        <Path d="M -10 635 A 400 200 0 0 1 420 635" 
        stroke="black" 
        strokeWidth="10" 
        fill="none" />

      </Svg>

      {/* Temporary Buttons in front of lines */}
      <View style={styles.tempButtonsContainer}>
        <TouchableOpacity style={styles.tempButton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.tempButtonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tempButton} onPress={() => navigation.navigate('Database')}>
          <Text style={styles.tempButtonText}>Database</Text>
        </TouchableOpacity>
      </View>

      <Image 
        source={require('../assets/images/appLogo.png')} 
        style={styles.logoImage}
      />

      <View style={styles.buttonContainer}>
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F57C00',
  },
  header: {
    position: 'absolute',
    backgroundColor: '#283237',
    height: '8%',
    width: '100%',
    transform: [{ translateY: '-575%' }],
    zIndex: 1,
  },
  svgContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
  tempButtonsContainer: {
    position: 'absolute',
    left: 20,
    top: height * 0.15,
    zIndex: 2,
  },
  tempButton: {
    backgroundColor: '#FFF',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000',
  },
  tempButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  logoImage: {
    width: 600, 
    height: 600, 
    position: 'absolute',
    top: 100,
    left: '60%',
    transform: [{ translateX: -300 }],
  },
  buttonContainer: { 
    justifyContent: 'space-evenly', 
    alignItems: 'center',
    width: '100%', 
    position: 'absolute',
    top: '60%', 
  },
  buttonWrapper: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  SbuttonImage: {
    width: '75%', 
    height: '75%', 
    backgroundColor: 'transparent',
    marginBottom: 0,
    zIndex: 1,
    transform: [{ translateX: '550%' }, { translateY: '-10%' }],
  },
  footer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: -(height / 2.75),
    left: 0,
    right: 0,
    backgroundColor: '#283237',
    height: 85,
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    zIndex: 1,
  },
  buttonImage: {
    width: 60, 
    height: 60, 
    resizeMode: 'contain'
  }
});

export default Index;