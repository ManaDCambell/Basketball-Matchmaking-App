import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Menu, Provider, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

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
        <Divider style={styles.divider} />

        {/* Account Section */}
        <View style={styles.row}>
          <Icon name="person-outline" size={30} color='rgb(218, 113, 15)' />
          <Text style={styles.labels}>Account</Text>
          <Icon
            style={styles.dropdownArrow}
            name="chevron-forward-outline"
            size={30}
            color="black"
            onPress={() => showMenu('Account')}
          />
        </View>
        <Divider style={styles.divider} />

        {/* Contact Section */}
        <View style={styles.row}>
          <Icon name="call-outline" size={30} color='rgb(218, 113, 15)' />
          <Text style={styles.labels}>Contact</Text>
          <Icon
            style={styles.dropdownArrow}
            name="chevron-forward-outline"
            size={30}
            color="black"
            onPress={() => showMenu('Contact')}
          />
        </View>
        <Divider style={styles.divider} />

        {/* Skill Preference Section */}
        <View style={styles.row}>
          <Icon name="trophy-outline" size={30} color='rgb(218, 113, 15)' />
          <Text style={styles.labels}>Skill Preference</Text>
          <Icon
            style={styles.dropdownArrow}
            name="chevron-forward-outline"
            size={30}
            color="black"
            onPress={() => showMenu('SkillPreference')}
          />
        </View>
        <Divider style={styles.divider} />

        {/* Availability Section */}
        <View style={styles.row}>
          <Icon name="calendar-outline" size={30} color='rgb(218, 113, 15)' />
          <Text style={styles.labels}>Availability</Text>
          <Icon
            style={styles.dropdownArrow}
            name="chevron-forward-outline"
            size={30}
            color="black"
            onPress={() => showMenu('Availability')}
          />
        </View>
        <Divider style={styles.divider} />

        {/* Stats Section */}
        <View style={styles.row}>
          <Icon name="bar-chart-outline" size={30} color='rgb(218, 113, 15)' />
          <Text style={styles.labels}>Stats</Text>
          <Icon
            style={styles.dropdownArrow}
            name="chevron-forward-outline"
            size={30}
            color="black"
            onPress={() => showMenu('Stats')}
          />
        </View>
        <Divider style={styles.divider} />

        {/* Yelp Review Section */}
        <View style={styles.row}>
          <Icon name="star-half-outline" size={30} color='rgb(218, 113, 15)' />
          <Text style={styles.labels}>Yelp Review</Text>
          <Icon
            style={styles.dropdownArrow}
            name="chevron-forward-outline"
            size={30}
            color="black"
            onPress={() => showMenu('YelpReview')}
          />
        </View>
        <Divider style={styles.divider} />

        {/* User Dropdown */}
        <Menu
          visible={visible && selectedMenu === 'Account'}
          onDismiss={hideMenu}
          anchor={<Text />}
        >
          <Menu.Item onPress={() => console.log('User Info')} title="User Information" />
          <Menu.Item onPress={() => console.log('Change User Info')} title="Change Info" />
        </Menu>

        {/* Contact Dropdown */}
        <Menu
          visible={visible && selectedMenu === 'Contact'}
          onDismiss={hideMenu}
          anchor={<Text />}
        >
          <Menu.Item onPress={() => console.log('Contact Info')} title="Contact Information" />
          <Menu.Item onPress={() => console.log('Change Contact Info')} title="Change Contact Info" />
        </Menu>

        {/* Skill Preference Dropdown */}
        <Menu
          visible={visible && selectedMenu === 'SkillPreference'}
          onDismiss={hideMenu}
          anchor={<Text />}
        >
          <Menu.Item onPress={() => console.log('Skill Preferences')} title="View Skill Preferences" />
          <Menu.Item onPress={() => console.log('Change Skill Preferences')} title="Change Skill Preferences" />
        </Menu>

        {/* Availability Dropdown */}
        <Menu
          visible={visible && selectedMenu === 'Availability'}
          onDismiss={hideMenu}
          anchor={<Text />}
        >
          <Menu.Item onPress={() => console.log('View Availability')} title="View Availability" />
          <Menu.Item onPress={() => console.log('Change Availability')} title="Change Availability" />
        </Menu>

        {/* Stats Dropdown */}
        <Menu
          visible={visible && selectedMenu === 'Stats'}
          onDismiss={hideMenu}
          anchor={<Text />}
        >
          <Menu.Item onPress={() => console.log('View Stats')} title="View Stats" />
          <Menu.Item onPress={() => console.log('Update Stats')} title="Update Stats" />
        </Menu>

        {/* Yelp Review Dropdown */}
        <Menu
          visible={visible && selectedMenu === 'YelpReview'}
          onDismiss={hideMenu}
          anchor={<Text />}
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
    alignItems: 'left',
    padding: 10,
    backgroundColor: 'rgb(180, 173, 168)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  divider: {
    width: '100%',
    marginVertical: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  labels: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10, // Adds space between the icon and label
  },
  dropdownArrow: {
    marginLeft: 'auto',
  },
});
