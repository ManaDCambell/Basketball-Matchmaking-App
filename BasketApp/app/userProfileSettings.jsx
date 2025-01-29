import React, { useState } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Menu, Provider, Divider } from 'react-native-paper';

export default function UserProfileSettings() {
  const [visible, setVisible] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);

  const showMenu = (menuName) => {
    setSelectedMenu(menuName);
    setVisible(true);
  };

  const hideMenu = () => {
    setVisible(false);
    setSelectedMenu(null);
  };

  return (
    <Provider>
      <View style={styles.container}>
        <Text style={styles.title}>Settings</Text>

        {/* User Dropdown */}
        <Menu
          visible={visible && selectedMenu === 'User'}
          onDismiss={hideMenu}
          anchor={<Button title="User" onPress={() => showMenu('User')} />}
        >
          <Menu.Item onPress={() => console.log('User Info')} title="User Information" />
          <Menu.Item onPress={() => console.log('Change User Info')} title="Change Info" />
        </Menu>

        <Divider style={styles.divider} />

        {/* Contact Dropdown */}
        <Menu
          visible={visible && selectedMenu === 'Contact'}
          onDismiss={hideMenu}
          anchor={<Button title="Contact" onPress={() => showMenu('Contact')} />}
        >
          <Menu.Item onPress={() => console.log('Contact Info')} title="Contact Information" />
          <Menu.Item onPress={() => console.log('Change Contact Info')} title="Change Contact Info" />
        </Menu>

        <Divider style={styles.divider} />

        {/* Skill Preference Dropdown */}
        <Menu
          visible={visible && selectedMenu === 'SkillPreference'}
          onDismiss={hideMenu}
          anchor={<Button title="Skill Preference" onPress={() => showMenu('SkillPreference')} />}
        >
          <Menu.Item onPress={() => console.log('Skill Preferences')} title="View Skill Preferences" />
          <Menu.Item onPress={() => console.log('Change Skill Preferences')} title="Change Skill Preferences" />
        </Menu>

        <Divider style={styles.divider} />

        {/* Availability Dropdown */}
        <Menu
          visible={visible && selectedMenu === 'Availability'}
          onDismiss={hideMenu}
          anchor={<Button title="Availability" onPress={() => showMenu('Availability')} />}
        >
          <Menu.Item onPress={() => console.log('View Availability')} title="View Availability" />
          <Menu.Item onPress={() => console.log('Change Availability')} title="Change Availability" />
        </Menu>

        <Divider style={styles.divider} />

        {/* Stats Dropdown */}
        <Menu
          visible={visible && selectedMenu === 'Stats'}
          onDismiss={hideMenu}
          anchor={<Button title="Stats" onPress={() => showMenu('Stats')} />}
        >
          <Menu.Item onPress={() => console.log('View Stats')} title="View Stats" />
          <Menu.Item onPress={() => console.log('Update Stats')} title="Update Stats" />
        </Menu>

        <Divider style={styles.divider} />

        {/* Yelp Review Dropdown */}
        <Menu
          visible={visible && selectedMenu === 'YelpReview'}
          onDismiss={hideMenu}
          anchor={<Button title="Yelp Review" onPress={() => showMenu('YelpReview')} />}
        >
          <Menu.Item onPress={() => console.log('View Yelp Reviews')} title="View Yelp Reviews" />
          <Menu.Item onPress={() => console.log('Add Yelp Review')} title="Add Yelp Review" />
        </Menu>
        
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgb(180, 173, 168)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  divider: {
    width: '80%',
    marginVertical: 10,
  },
});
