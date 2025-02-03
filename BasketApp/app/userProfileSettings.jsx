import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const App = ({ navigation }) => {
  const [isMenuVisible, setIsMenuVisible] = useState({
    account: false,
    contact: false,
    skill: false,
    availability: false,
    stats: false,
    yelp: false
  });
  
  const [isSkillEnabled, setIsSkillEnabled] = useState(false);

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

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={35} color="rgb(0, 0," />
      </TouchableOpacity>

      <Text style={styles.title}>Settings</Text>

      {/* Account */}
      <TouchableOpacity style={styles.settingOptionFirst} onPress={() => toggleMenu('account')}>
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
          <TouchableOpacity style={styles.menuItem} onPress={() => alert('View account information pressed')}>
            <Text style={styles.menuText}>View Account Information</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => alert('Change account information pressed')}>
            <Text style={styles.menuText}>Change Account Information</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Contact */}
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
          <TouchableOpacity style={styles.menuItem} onPress={() => alert('Edit phone number pressed')}>
            <Text style={styles.menuText}>Edit Phone Number</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => alert('Edit email pressed')}>
            <Text style={styles.menuText}>Edit Email</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Skill Preference with Switch */}
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
          <View style={styles.switchContainer}>
            <Text style={styles.menuText}>Enable Friendly Matching</Text>
            <Switch
              value={isSkillEnabled}
              onValueChange={setIsSkillEnabled}
              trackColor={{ false: "rgb(128, 128, 128)", true: "rgb(30, 177, 38)" }}
              thumbColor={isSkillEnabled ? "rgb(256, 256, 256)" : "rgb(256, 256, 256)"}
              style={{ transform: [{ scale: 1.2}] }}
            />
          </View>
        </View>
      )}

      {/* Availability */}
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
          <TouchableOpacity style={styles.menuItem} onPress={() => alert('View availability pressed')}>
            <Text style={styles.menuText}>View Availability</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => alert('Change availability pressed')}>
            <Text style={styles.menuText}>Change Availability</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Stats */}
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
          <TouchableOpacity style={styles.menuItem} onPress={() => alert('View stats pressed')}>
            <Text style={styles.menuText}>View Stats</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Match Review */}
      <TouchableOpacity style={styles.settingOptionLast} onPress={() => toggleMenu('yelp')}>
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
          <TouchableOpacity style={styles.menuItemLast} onPress={() => alert('View match reviews pressed')}>
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
    width: '115%',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(78, 78, 78)',
    borderTopWidth: 1,
    borderTopColor: 'rgb(78, 78, 78)',
    backgroundColor: 'rgb(180, 173, 168)',
  },
  settingText: {
    fontSize: 18,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  menu: {
    backgroundColor: 'rgb(218, 113, 5)',
    width: '120%',
    borderWidth: 1,
    borderColor: 'rgb(78, 78, 78)',
  },
  menuItem: {
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  menuItemLast: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(78, 78, 78)',
  },
  menuText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    alignSelf: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  backButton: {
    position: 'absolute',
    left: 15,
    top: 25,
  },
  settingOptionFirst: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '115%',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderTopWidth: 2,
    borderTopColor: 'rgb(78, 78, 78)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(78, 78, 78)',
    backgroundColor: 'rgb(180, 173, 168)',
  },
  settingOptionLast: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '115%',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgb(78, 78, 78)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(78, 78, 78)',
    backgroundColor: 'rgb(180, 173, 168)',
  },

});

export default App;