import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import UserProfile from './userProfile';
import Matchmaking from './matchmaking'; // Correct import
import Friends from './friends'; // Correct import

const Stack = createStackNavigator();

function Index() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="Matchmaking" component={Matchmaking} /> 
      <Stack.Screen name="Friends" component={Friends} /> 
    </Stack.Navigator>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.Text}>Basketball Buddies</Text>

      <View style={styles.buttonContainer}>
      <View style={styles.buttonWrapper}>
      <Button 
        title="User Profile"
        color="rgb(0, 0, 0)"
        onPress={() => navigation.navigate('UserProfile')}
      />
      </View>

      <View style={styles.buttonWrapper}>
      <Button
        title="Matchmaking" 
        color="rgb(0, 0, 0)"
        onPress={() => navigation.navigate('Matchmaking')} 
      />
      </View>

      <View style={styles.buttonWrapper}>
      <Button
        title="Friends" 
        color="rgb(0, 0, 0)"
        onPress={() => navigation.navigate('Friends')} 
      />
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
    backgroundColor: 'rgb(204, 85, 0)',
  },
  buttonContainer:{
    position: 'absolute', 
    top: 20, 
    right: 20, 
    justifyContent: 'space-between', 
    alignItems: 'flex-start', 
  },
  buttonWrapper: {
    marginBottom: 15, // Space between buttons
    width: 200, // Set width to control button size
  },
  Text: {
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center'
  }
  
});

export default Index;