import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Svg, { Line, Circle, Path } from "react-native-svg";

import UserProfile from './userProfile';
import Matchmaking from './matchmaking'; 
import Friends from './friends'; 
import UserProfileSettings from './userProfileSettings';

const Stack = createStackNavigator();

function Index() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="Matchmaking" component={Matchmaking} /> 
      <Stack.Screen name="Friends" component={Friends} /> 
      <Stack.Screen name="UserProfileSettings" component={UserProfileSettings} />
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

      <Svg height="100%" width="100%">
  
  {/* Curved Center Line */}
 <Path
   d="M -10 305 Q 190 500 370 330 T 800 330"
   stroke="black"
   strokeWidth="10"
   fill="none"
 />

 {/* Key Area (Lowered Arcs) */}

<Path
   d="M 220 50 A 50 300 0 0 0 270 750"
   stroke="black"
   strokeWidth="10"
   fill="none"
/>
<Path
   d="M -10 95 A 400 200 0 0 0 390 95"
   stroke="black"
   strokeWidth="10"
   fill="none"
/>
<Path
   d="M -10 635 A 400 200 0 0 1 390 635"
   stroke="black"
   strokeWidth="10"
   fill="none"
/>
 </Svg>

      <Image 
        source={require('../assets/images/appLogo.png')} 
        style={styles.logoImage}
      />
      <View style={styles.buttonContainer}>

        <View style={styles.footer}>
        <TouchableOpacity
          style={styles.buttonWrapper}
          onPress={() => navigation.navigate('UserProfile')}
        >
          <Image 
            source={require('../assets/images/UserProfileButton.png')} 
            style={styles.UPbuttonImage}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonWrapper}
          onPress={() => navigation.navigate('Matchmaking')}
        >
          <Image 
            source={require('../assets/images/matchmakingButton.png')} 
            style={styles.MbuttonImage}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonWrapper}
          onPress={() => navigation.navigate('Friends')}
        >
          <Image 
            source={require('../assets/images/friendsButton.png')} 
            style={styles.FbuttonImage}
          />
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
    backgroundColor:'#F57C00',
   // overflow: 'hidden',
  },
  logoImage: {
    width: 600, 
    height: 600, 
    position: 'absolute', // <-- Fix it in place
    top: 100, // <-- Move it up by adjusting this value
    left: '60%', // Center it horizontally
    transform: [{ translateX: -300 }], // Offset by half its width
  },
  buttonContainer: { 
    justifyContent: 'space-evenly', 
    alignItems: 'center',
    width: '100%', 
    position: 'absolute',
    top: '60%', 
  },
  buttonWrapper: {
    marginBottom: 10,
    width: 80, 
    height: 80, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  VerticalbuttonWrapper:{
    marginBottom: 0,
    width: 80, 
    height: 80, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    transform: [
      { translateX: 165 },
      { translateY: -500 }, 
    ],
  },
  MbuttonImage: {
    width: '160%', 
    height: '150%', 
    backgroundColor: 'transparent',
    marginBottom: 0,
    borderColor: 'white',
    borderWidth: 5,
    zIndex: 10,
    transform: [
      { translateX:'55%' },
      { translateY: '15%' }, 
    ],
  },
  SbuttonImage:{
    width: '100%', 
    height: '100%', 
    backgroundColor: 'transparent',
    marginBottom: 0,
    zIndex: 1,
    transform: [
      { translateX: '380%' },
      { translateY: '-0' }, 
    ],
  },
  FbuttonImage:{
    position: 'absolute',
    width: '160%', 
    height: '150%', 
    backgroundColor: 'transparent',
    marginBottom: 0,
    borderColor: 'white',
    borderWidth: 5,
    zIndex: 10,
    transform: [
      { translateX: '92%' },
      { translateY: '15%' }, 
    ],
  },
  UPbuttonImage:{
    width: '160%', 
    height: '150%', 
    backgroundColor: 'transparent',
    marginBottom: '-25%',
    borderColor: 'white',
    borderWidth: 5,
    zIndex: 10,
    transform: [
      { translateX: '18%' },
      { translateY: '7%' }, 
    ],
  },
  Text: {
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  header:{
      position: 'absolute',
      backgroundColor: '#283237',
      height: '8%',
      width: '100%',
      transform: [
        { translateX: 0 },
        { translateY: '-575%' }, 
      ],
      zIndex: 1,
  },
  footer: {
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: '#283237',
    height: 120,
    width: '100%',
    transform: [
      { translateX: 0 },
      { translateY: '26%' }, 
    ],
    zIndex: 1,
  }
});

export default Index;
