import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Database from './database';
import UserProfile from './userProfile';
import Matchmaking from './matchmaking'; // Correct import
import Friends from './friends'; // Correct import
import UserProfileSettings from './userProfileSettings';
import Tournament from './tournament';
import Login from './login';
import Signup from './signup';

const Stack = createStackNavigator();

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
      <Stack.Screen name="Signup"component={Signup} />
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
        title="DataBase"
        color="rgb(0, 0, 0)"
        onPress={() => navigation.navigate('Database')}
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
</View>  {/* This closing tag was missing */}

<View style={styles.buttonWrapper}>
  <Button
    title="Login" 
    color="rgb(0, 0, 0)"
    onPress={() => navigation.navigate('Login')} 
  />
</View>
<View style={styles.buttonWrapper}>
  <Button
    title="Signup" 
    color="rgb(0, 0, 0)"
    onPress={() => navigation.navigate('Signup')} 
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
