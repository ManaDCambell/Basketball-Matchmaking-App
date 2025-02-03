import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const App = () => {
  const [isMenuVisible, setIsMenuVisible] = useState({
    account: false,
    contact: false,
    skill: false,
    availability: false,
    stats: false,
    yelp: false
  });

  const closeAll = () => {
    setIsMenuVisible({
      account: false,
      contact: false,
      skill: false,
      availability: false,
      stats: false,
      yelp: false
    });
  };

  const toggleMenu = (menu) => {
    if (isMenuVisible[menu]) {
      setIsMenuVisible({
        ...isMenuVisible,
        [menu]: false,
      });
    } else {
      closeAll();
      setIsMenuVisible((prevState) => ({
        ...prevState,
        [menu]: true,
      }));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <TouchableOpacity style={styles.settingOption} onPress={() => toggleMenu('account')}>
        <Ionicons name="person-outline" size={35} color="rgb(218, 113, 15)" />
        <Text style={styles.settingText}>Account</Text>
        <Ionicons 
          name={isMenuVisible.account ? "chevron-down" : "chevron-forward"} 
          size={30} 
          color="gray" 
        />
      </TouchableOpacity>
      {isMenuVisible.account && (
        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>View Account Information</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Change Account Information</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity style={styles.settingOption} onPress={() => toggleMenu('contact')}>
        <Ionicons name="call-outline" size={35} color="rgb(218, 113, 15)" />
        <Text style={styles.settingText}>Contact</Text>
        <Ionicons 
          name={isMenuVisible.contact ? "chevron-down" : "chevron-forward"} 
          size={30} 
          color="gray" 
        />
      </TouchableOpacity>
      {isMenuVisible.contact && (
        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Edit Phone Number</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Edit Email</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity style={styles.settingOption} onPress={() => toggleMenu('skill')}>
        <Ionicons name="trophy-outline" size={35} color="rgb(218, 113, 15)" />
        <Text style={styles.settingText}>Skill Preference</Text>
        <Ionicons 
          name={isMenuVisible.skill ? "chevron-down" : "chevron-forward"} 
          size={30} 
          color="gray" 
        />
      </TouchableOpacity>
      {isMenuVisible.skill && (
        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Change Skill Class</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity style={styles.settingOption} onPress={() => toggleMenu('availability')}>
        <Ionicons name="bar-chart-outline" size={35} color="rgb(218, 113, 15)" />
        <Text style={styles.settingText}>Availability</Text>
        <Ionicons 
          name={isMenuVisible.availability ? "chevron-down" : "chevron-forward"} 
          size={30} 
          color="gray" 
        />
      </TouchableOpacity>
      {isMenuVisible.availability && (
        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>View Availability</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Change Availability</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity style={styles.settingOption} onPress={() => toggleMenu('stats')}>
        <Ionicons name="calendar-outline" size={35} color="rgb(218, 113, 15)" />
        <Text style={styles.settingText}>Stats</Text>
        <Ionicons 
          name={isMenuVisible.stats ? "chevron-down" : "chevron-forward"} 
          size={30} 
          color="gray" 
        />
      </TouchableOpacity>
      {isMenuVisible.stats && (
        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>View Stats</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity style={styles.settingOption} onPress={() => toggleMenu('yelp')}>
        <Ionicons name="star-half-outline" size={35} color="rgb(218, 113, 15)" />
        <Text style={styles.settingText}>Match Review</Text>
        <Ionicons 
          name={isMenuVisible.yelp ? "chevron-down" : "chevron-forward"} 
          size={30} 
          color="gray" 
        />
      </TouchableOpacity>
      {isMenuVisible.yelp && (
        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>View Match Reviews</Text>
          </TouchableOpacity>
        </View>
      )}

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgb(180, 173, 168)',
  },
  settingOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: 'rgb(180, 173, 168)',
  },
  settingText: {
    fontSize: 18,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  menu: {
    backgroundColor: 'rgb(218, 113, 5)',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  menuItem: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  menuText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 30,
    textAlign: 'center',
  },
});

export default App;
