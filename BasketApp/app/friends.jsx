import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Header from './Header';
import Footer from './footer';

const Friends = () => {
  return (
    <View style={styles.container}>
      {/* Add Header */}
      <Header />
      
      <Text>Friends Screen</Text>

      {/* Add Footer */}
      <Footer />
    </View>
  );
}

export default Friends;

const styles = StyleSheet.create({
  container: {
    flex: 1, // This ensures the screen takes up the full space available
    marginTop: '0%', // This ensures the content isn't hidden behind the fixed header
  },
});