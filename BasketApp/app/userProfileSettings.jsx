import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, SafeAreaView, TextInput, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getLoggedInUser } from '../FirebaseConfig';
import { getPhoneNumber, setPhoneNumber, getEmail, setEmail, getLocation, setLocation, setSkillPref, getSkillPref } from './database';
import Footer from './footer';

const { width, height } = Dimensions.get('window');

const SettingsPage = ({ navigation }) => {
  const [activeSetting, setActiveSetting] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [phoneNumber, setPhoneNumberState] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [email, setEmailState] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocationState] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [skillPreference, setSkillPreference] = useState(null);

  useEffect(() => {
    if (activeSetting === 'phone') {
      fetchPhoneNumber();
    } else if (activeSetting === 'email') {
      fetchEmail();
    } else if (activeSetting === 'location') {
      fetchLocation();
    } else if (activeSetting === 'skill') {
      fetchSkillPreference(); 
    }
  }, [activeSetting]);

  const fetchPhoneNumber = async () => {
    try {
      const userName = getLoggedInUser();
      if (userName) {
        const fetchedPhoneNumber = await getPhoneNumber(userName);
        setPhoneNumberState(fetchedPhoneNumber || '');
        setNewPhoneNumber(fetchedPhoneNumber || '');
      }
    } catch (error) {
      console.error('Error fetching phone number:', error);
    }
  };

  const fetchEmail = async () => {
    try {
      const userName = getLoggedInUser();
      if (userName) {
        const fetchedEmail = await getEmail(userName);
        setEmailState(fetchedEmail || '');
        setNewEmail(fetchedEmail || '');
      }
    } catch (error) {
      console.error('Error fetching email:', error);
    }
  };

  const fetchLocation = async () => {
    try {
      const userName = getLoggedInUser();
      if (userName) {
        const fetchedLocation = await getLocation(userName);
        setLocationState(fetchedLocation || '');
        setNewLocation(fetchedLocation || '');
      }
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

  const fetchSkillPreference = async () => {
    try {
      const userName = getLoggedInUser();
      if (userName) {
        const preference = await getSkillPref(userName);
        console.log('Fetched skill preference:', preference);
        setSkillPreference(preference);
      }
    } catch (error) {
      console.error('Error fetching skill preference:', error);
    }
  };

  const updatePhoneNumber = async () => {
    if (newPhoneNumber.trim() === '') return;
    try {
      const userName = getLoggedInUser();
      if (userName) {
        await setPhoneNumber(userName, newPhoneNumber);
        setPhoneNumberState(newPhoneNumber);
        setActiveSetting(null);
      }
    } catch (error) {
      console.error('Error updating phone number:', error);
    }
  };

  const updateEmail = async () => {
    if (newEmail.trim() === '' || password.trim() === '') {
      alert('Please fill in all fields.');
      return;
    }
    try {
      const userName = getLoggedInUser();
      if (userName) {
        const success = await setEmail(userName, newEmail, password);
        if (success) {
          setEmailState(newEmail);
          setPassword('');
          setActiveSetting(null);
          alert('Email updated successfully!');
        } else {
          alert('Failed to update email. Check your credentials or try again.');
        }
      }
    } catch (error) {
      console.error('Error updating email:', error);
      alert('Failed to update email.');
    }
  };

  const updateLocation = async () => {
    if (newLocation.trim() === '') return;
    try {
      const userName = getLoggedInUser();
      if (userName) {
        await setLocation(userName, newLocation);
        setLocationState(newLocation);
        setActiveSetting(null);
      }
    } catch (error) {
      console.error('Error updating location:', error);
    }
  };

  const updateSkillPreference = async (preference) => {
    try {
      const userName = getLoggedInUser();
      if (userName) {
        await setSkillPref(userName, preference);
        setSkillPreference(preference);
      }
    } catch (error) {
      console.error('Error updating skill preference:', error);
      alert('Failed to update skill preference.');
    }
  };

  const closeModal = () => setActiveSetting(null);

  const settings = [
    { key: 'phone', label: 'Phone Number', icon: 'call-outline' },
    { key: 'email', label: 'Email', icon: 'mail-outline' },
    { key: 'privacy', label: 'Privacy', icon: 'lock-closed-outline' },
    { key: 'location', label: 'Location', icon: 'location-outline' },
    { key: 'skill', label: 'Skill Preference', icon: 'trophy-outline' },
  ];

  const firstGroup = settings.filter(setting =>
    ['phone', 'email', 'username', 'privacy'].includes(setting.key)
  );

  const secondGroup = settings.filter(setting =>
    !['phone', 'email', 'username', 'privacy'].includes(setting.key)
  );

  const filteredSettings = settings.filter(setting =>
    setting.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isSearching = searchQuery.trim().length > 0;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={30} color="rgb(255, 255, 255)" />
        </TouchableOpacity>
        <Text style={styles.title}>SETTINGS</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="rgb(255, 255, 255)" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="rgb(255, 255, 255)"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Settings List */}
      <ScrollView>
        {isSearching && filteredSettings.length > 0 ? (
          <View style={styles.settingsBox}>
            {filteredSettings.map(setting => (
              <TouchableOpacity
                key={setting.key}
                style={styles.settingOption}
                onPress={() => setActiveSetting(setting.key)}
              >
                <Ionicons name={setting.icon} size={24} color="rgb(255, 255, 255)" />
                <Text style={styles.settingText}>{setting.label}</Text>
                <Ionicons name="chevron-forward" size={24} color="rgb(255, 255, 255)" />
              </TouchableOpacity>
            ))}
          </View>
        ) : isSearching ? null : (
          <>
            <Text style={styles.boxLabel}>Account Settings</Text>
            <View style={styles.settingsBox}>
              {firstGroup.map(setting => (
                <TouchableOpacity
                  key={setting.key}
                  style={styles.settingOption}
                  onPress={() => setActiveSetting(setting.key)}
                >
                  <Ionicons name={setting.icon} size={24} color="rgb(255, 255, 255)" />
                  <Text style={styles.settingText}>{setting.label}</Text>
                  <Ionicons name="chevron-forward" size={24} color="rgb(255, 255, 255)" />
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.boxLabel}>Matchmaking Settings</Text>
            <View style={styles.settingsBox}>
              {secondGroup.map(setting => (
                <TouchableOpacity
                  key={setting.key}
                  style={styles.settingOption}
                  onPress={() => setActiveSetting(setting.key)}
                >
                  <Ionicons name={setting.icon} size={24} color="rgb(255, 255, 255)" />
                  <Text style={styles.settingText}>{setting.label}</Text>
                  <Ionicons name="chevron-forward" size={24} color="rgb(255, 255, 255)" />
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}
      </ScrollView>

      {/* Phone Number Modal */}
      <Modal
        visible={activeSetting === 'phone'}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Ionicons name="close" size={28} color="rgb(255, 255, 255)" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Phone Number</Text>
            <TextInput
              style={styles.input}
              value={newPhoneNumber}
              onChangeText={setNewPhoneNumber}
              keyboardType="phone-pad"
              placeholder="Enter new phone number"
              placeholderTextColor="white"
            />
            <TouchableOpacity onPress={updatePhoneNumber} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Email Modal */}
      <Modal
        visible={activeSetting === 'email'}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Ionicons name="close" size={28} color="rgb(255, 255, 255)" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Email</Text>
            <TextInput
              style={styles.input}
              value={newEmail}
              onChangeText={setNewEmail}
              keyboardType="email-address"
              placeholder="Enter new email"
              placeholderTextColor="white"
            />
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
              placeholder="Enter password to confirm"
              placeholderTextColor="white"
            />
            <TouchableOpacity onPress={updateEmail} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Location Modal */}
      <Modal
        visible={activeSetting === 'location'}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Ionicons name="close" size={28} color="rgb(255, 255, 255)" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Location</Text>
            <TextInput
              style={styles.input}
              value={newLocation}
              onChangeText={setNewLocation}
              keyboardType="email-address"
              placeholder="Enter new location"
              placeholderTextColor="white"
            />
            <TouchableOpacity onPress={updateLocation} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Skill Preference Modal */}
      <Modal
        visible={activeSetting === 'skill'}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Ionicons name="close" size={28} color="rgb(255, 255, 255)" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Skill Preference</Text>

            <TouchableOpacity
              onPress={() => updateSkillPreference(0)}
              style={[
                styles.optionButton,
                skillPreference === 0 ? styles.selectedOption : null,
              ]}
            >
              <Text style={styles.optionText}>Casual</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => updateSkillPreference(1)}
              style={[
                styles.optionButton,
                skillPreference === 1 ? styles.selectedOption : null,
              ]}
            >
              <Text style={styles.optionText}>Ranked</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(218, 113, 5)",
    paddingHorizontal: 20,
    paddingTop: 27,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  boxLabel: {
    fontSize: 15,
    color: 'rgb(255, 255, 255)',
    marginBottom: 10,
    marginLeft: 10,
  },
  backButton: {
    marginRight: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgb(255, 255, 255)',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'rgb(78, 78, 78)',
    backgroundColor: 'rgba(78, 78, 78, 0.6)',
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: 'rgb(255, 255, 255)',
  },
  settingsBox: {
    backgroundColor: 'rgba(78, 78, 78, 0.6)',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  settingOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderColor: 'rgb(105, 105, 105)',
  },
  settingText: {
    flex: 1,
    fontSize: 18,
    color: 'rgb(255, 255, 255)',
    marginLeft: 15,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width * 0.9,
    backgroundColor: 'rgb(43, 43, 43)',
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'rgb(255, 255, 255)',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#555',
    color: 'white',
    padding: 12,
    borderRadius: 10,
    width: '100%',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgb(105, 105, 105)',
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: "rgb(84, 216, 91)",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    transition: 'background-color 0.3s',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
  },
  optionButton: {
    width: '100%',
    padding: 12,
    backgroundColor: '#555',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: 'rgb(218 ,113, 5)',
  },
  optionText: {
    color: 'white',
    fontSize: 18,
  },
});

export default SettingsPage;