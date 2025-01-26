import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import UserProfile from './userProfile';

const Stack = createStackNavigator();

function Index() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
    </Stack.Navigator>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Hello World</Text>
      <Button
        title="Go to User Profile"
        onPress={() => navigation.navigate('UserProfile')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Index;