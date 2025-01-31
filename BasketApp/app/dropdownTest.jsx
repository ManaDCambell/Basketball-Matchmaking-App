import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For the ">" icon

const App = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0, width: 0 });
  const buttonRef = useRef(null);

  const toggleMenu = () => {
    if (buttonRef.current) {
      buttonRef.current.measure((fx, fy, width, height, px, py) => {
        setMenuPosition({ top: py + height, left: px, width });
        setIsMenuVisible(!isMenuVisible);
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Settings Option */}
      <TouchableOpacity
        ref={buttonRef}
        style={styles.settingOption}
        onPress={toggleMenu}
      >
        <Text style={styles.settingText}>Settings Option</Text>
        <Ionicons name="chevron-forward" size={20} color="gray" />
      </TouchableOpacity>

      {/* Expandable Menu - Positioned Dynamically Below the ">" */}
      {isMenuVisible && (
        <View style={[styles.menu, { top: menuPosition.top, left: menuPosition.left, width: menuPosition.width }]}>
          <TouchableOpacity style={styles.menuItem} onPress={() => setIsMenuVisible(false)}>
            <Text style={styles.menuText}>Option 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => setIsMenuVisible(false)}>
            <Text style={styles.menuText}>Option 2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => setIsMenuVisible(false)}>
            <Text style={styles.menuText}>Option 3</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  settingOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  settingText: {
    fontSize: 18,
  },
  menu: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    paddingVertical: 5,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  menuText: {
    fontSize: 16,
  },
});

export default App;
