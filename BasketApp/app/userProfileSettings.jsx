import React, { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Modal, SafeAreaView, Dimensions, TextInput, ScrollView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Footer from './footer';

const { width, height } = Dimensions.get('window');

const SettingsPage = ({ navigation }) => {
  const [activeSetting, setActiveSetting] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const closeModal = () => setActiveSetting(null);

  const settings = [
    { key: 'phone', label: 'Phone Number', icon: 'call-outline' },
    { key: 'email', label: 'Email', icon: 'mail-outline' },
    { key: 'username', label: 'Username', icon: 'person-outline' },
    { key: 'privacy', label: 'Privacy', icon: 'lock-closed-outline' },
    { key: 'location', label: 'Location', icon: 'location-outline' },
    { key: 'skill', label: 'Skill Preference', icon: 'trophy-outline' },
    { key: 'elo', label: 'Elo', icon: 'bar-chart-outline' },
  ];

  // Separate into two groups
  const firstGroup = settings.filter(setting =>
    ['phone', 'email', 'username', 'privacy'].includes(setting.key)
  );

  const secondGroup = settings.filter(setting =>
    !['phone', 'email', 'username', 'privacy'].includes(setting.key)
  );

  // Filter settings based on search query
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

      <ScrollView>
        {isSearching ? (
          // Combine all settings into one box when searching
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
        ) : (
          <>
            {/* First Box */}
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

            {/* Second Box */}
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

      {/* Modals */}
      {settings.map(setting => (
        <Modal
          key={setting.key}
          visible={activeSetting === setting.key}
          animationType="slide"
          transparent={true}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              {/* Close Button */}
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Ionicons name="close" size={28} color="rgb(255, 255, 255)" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>{setting.label}</Text>
            </View>
          </View>
        </Modal>
      ))}
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(218, 113, 5)", // Orange background
    paddingHorizontal: 20,
    paddingTop: 27,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
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
    padding: 20,
    borderRadius: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'rgb(255, 255, 255)',
    marginTop: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default SettingsPage;
