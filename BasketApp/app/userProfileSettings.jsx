// import React, { useState } from 'react';
// import { Text, View, StyleSheet } from 'react-native';
// import { Menu, Provider, Divider } from 'react-native-paper';
// import Icon from 'react-native-vector-icons/Ionicons';

// export default function UserProfileSettings() {
//   const [visible, setVisible] = useState(false);
//   const [selectedMenu, setSelectedMenu] = useState(null);

//   const showMenu = (menuName) => {
//     setSelectedMenu(menuName);
//     setVisible(true);
//   };

//   const hideMenu = () => {
//     setVisible(false);
//     setSelectedMenu(null);
//   };

//   return (
//     <Provider>
//       <View style={styles.container}>
//         <Text style={styles.title}>Settings</Text>
//         <Divider style={styles.divider} />

//         {/* Account Section */}
//         <View style={styles.row}>
//           <Icon name="person-outline" size={30} color='rgb(218, 113, 15)' />
//           <Text style={styles.labels}>Account</Text>
//           <Icon
//             style={styles.dropdownArrow}
//             name="chevron-forward-outline"
//             size={30}
//             color="black"
//             onPress={() => showMenu('Account')}
//           />
//         </View>
//         <Divider style={styles.divider} />

//         {/* Contact Section */}
//         <View style={styles.row}>
//           <Icon name="call-outline" size={30} color='rgb(218, 113, 15)' />
//           <Text style={styles.labels}>Contact</Text>
//           <Icon
//             style={styles.dropdownArrow}
//             name="chevron-forward-outline"
//             size={30}
//             color="black"
//             onPress={() => showMenu('Contact')}
//           />
//         </View>
//         <Divider style={styles.divider} />

//         {/* Skill Preference Section */}
//         <View style={styles.row}>
//           <Icon name="trophy-outline" size={30} color='rgb(218, 113, 15)' />
//           <Text style={styles.labels}>Skill Preference</Text>
//           <Icon
//             style={styles.dropdownArrow}
//             name="chevron-forward-outline"
//             size={30}
//             color="black"
//             onPress={() => showMenu('SkillPreference')}
//           />
//         </View>
//         <Divider style={styles.divider} />

//         {/* Availability Section */}
//         <View style={styles.row}>
//           <Icon name="calendar-outline" size={30} color='rgb(218, 113, 15)' />
//           <Text style={styles.labels}>Availability</Text>
//           <Icon
//             style={styles.dropdownArrow}
//             name="chevron-forward-outline"
//             size={30}
//             color="black"
//             onPress={() => showMenu('Availability')}
//           />
//         </View>
//         <Divider style={styles.divider} />

//         {/* Stats Section */}
//         <View style={styles.row}>
//           <Icon name="bar-chart-outline" size={30} color='rgb(218, 113, 15)' />
//           <Text style={styles.labels}>Stats</Text>
//           <Icon
//             style={styles.dropdownArrow}
//             name="chevron-forward-outline"
//             size={30}
//             color="black"
//             onPress={() => showMenu('Stats')}
//           />
//         </View>
//         <Divider style={styles.divider} />

//         {/* Yelp Review Section */}
//         <View style={styles.row}>
//           <Icon name="star-half-outline" size={30} color='rgb(218, 113, 15)' />
//           <Text style={styles.labels}>Yelp Review</Text>
//           <Icon
//             style={styles.dropdownArrow}
//             name="chevron-forward-outline"
//             size={30}
//             color="black"
//             onPress={() => showMenu('YelpReview')}
//           />
//         </View>
//         <Divider style={styles.divider} />

//         {/* User Dropdown */}
//         <Menu
//           visible={visible && selectedMenu === 'Account'}
//           onDismiss={hideMenu}
//           anchor={<Text />}
//         >
//           <Menu.Item onPress={() => console.log('User Info')} title="User Information" />
//           <Menu.Item onPress={() => console.log('Change User Info')} title="Change Info" />
//         </Menu>

//         {/* Contact Dropdown */}
//         <Menu
//           visible={visible && selectedMenu === 'Contact'}
//           onDismiss={hideMenu}
//           anchor={<Text />}
//         >
//           <Menu.Item onPress={() => console.log('Contact Info')} title="Contact Information" />
//           <Menu.Item onPress={() => console.log('Change Contact Info')} title="Change Contact Info" />
//         </Menu>

//         {/* Skill Preference Dropdown */}
//         <Menu
//           visible={visible && selectedMenu === 'SkillPreference'}
//           onDismiss={hideMenu}
//           anchor={<Text />}
//         >
//           <Menu.Item onPress={() => console.log('Skill Preferences')} title="View Skill Preferences" />
//           <Menu.Item onPress={() => console.log('Change Skill Preferences')} title="Change Skill Preferences" />
//         </Menu>

//         {/* Availability Dropdown */}
//         <Menu
//           visible={visible && selectedMenu === 'Availability'}
//           onDismiss={hideMenu}
//           anchor={<Text />}
//         >
//           <Menu.Item onPress={() => console.log('View Availability')} title="View Availability" />
//           <Menu.Item onPress={() => console.log('Change Availability')} title="Change Availability" />
//         </Menu>

//         {/* Stats Dropdown */}
//         <Menu
//           visible={visible && selectedMenu === 'Stats'}
//           onDismiss={hideMenu}
//           anchor={<Text />}
//         >
//           <Menu.Item onPress={() => console.log('View Stats')} title="View Stats" />
//           <Menu.Item onPress={() => console.log('Update Stats')} title="Update Stats" />
//         </Menu>

//         {/* Yelp Review Dropdown */}
//         <Menu
//           visible={visible && selectedMenu === 'YelpReview'}
//           onDismiss={hideMenu}
//           anchor={<Text />}
//         >
//           <Menu.Item onPress={() => console.log('View Yelp Reviews')} title="View Yelp Reviews" />
//           <Menu.Item onPress={() => console.log('Add Yelp Review')} title="Add Yelp Review" />
//         </Menu>
//       </View>
//     </Provider>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'flex-start',
//     alignItems: 'left',
//     padding: 10,
//     backgroundColor: 'rgb(180, 173, 168)',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   divider: {
//     width: '100%',
//     marginVertical: 15,
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   labels: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginLeft: 10, // Adds space between the icon and label
//   },
//   dropdownArrow: {
//     marginLeft: 'auto',
//   },
// });

import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const App = () => {
  const [isAccountMenuVisible, setIsAccountMenuVisible] = useState(false);
  const [isContactMenuVisible, setIsContactMenuVisible] = useState(false);
  const [isSkillMenuVisible, setIsSkillMenuVisible] = useState(false);
  const [isAvailabilityMenuVisible, setIsAvailabilityMenuVisible] = useState(false);
  const [isStatsMenuVisible, setIsStatsMenuVisible] = useState(false);
  const [isYelpMenuVisible, setIsYelpMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0, width: 0 });

  const accountRef = useRef(null);
  const contactRef = useRef(null);
  const skillRef = useRef(null);
  const availabilityRef = useRef(null);
  const statsRef = useRef(null);
  const yelpRef = useRef(null);

  const closeAll = () => {
    setIsAccountMenuVisible(false);
    setIsContactMenuVisible(false);
    setIsSkillMenuVisible(false);
    setIsAvailabilityMenuVisible(false);
    setIsStatsMenuVisible(false);
    setIsYelpMenuVisible(false);
  };

  const toggleMenu = (menuType, ref) => {
    closeAll();
    if (ref.current) {
      ref.current.measure((fx, fy, width, height, px, py) => {
        setMenuPosition({ top: py + height, left: px, width });
        if (menuType === 'account') setIsAccountMenuVisible(!isAccountMenuVisible);
        if (menuType === 'contact') setIsContactMenuVisible(!isContactMenuVisible);
        if (menuType === 'skill') setIsSkillMenuVisible(!isSkillMenuVisible);
        if (menuType === 'availability') setIsAvailabilityMenuVisible(!isAvailabilityMenuVisible);
        if (menuType === 'stats') setIsStatsMenuVisible(!isStatsMenuVisible);
        if (menuType === 'yelp') setIsYelpMenuVisible(!isYelpMenuVisible);
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <TouchableOpacity
        ref={accountRef} 
        style={styles.settingOption} 
        onPress={() => toggleMenu('account', accountRef)}
      >
        <Ionicons name="person-outline" size={35} color='rgb(218, 113, 15)' />
        <Text style={styles.settingText}>Account</Text>
        <Ionicons name="chevron-forward" size={30} color="gray" />
      </TouchableOpacity>

      <TouchableOpacity
        ref={contactRef}
        style={styles.settingOption}
        onPress={() => toggleMenu('contact', contactRef)}
      >
        <Ionicons name="call-outline" size={35} color='rgb(218, 113, 15)' />
        <Text style={styles.settingText}>Contact</Text>
        <Ionicons name="chevron-forward" size={30} color="gray" />
      </TouchableOpacity>

      <TouchableOpacity
        ref={skillRef}
        style={styles.settingOption}
        onPress={() => toggleMenu('skill', skillRef)}
      >
        <Ionicons name="trophy-outline" size={35} color='rgb(218, 113, 15)' />
        <Text style={styles.settingText}>Skill Preference</Text>
        <Ionicons name="chevron-forward" size={30} color="gray" />
      </TouchableOpacity>

      <TouchableOpacity
        ref={availabilityRef}
        style={styles.settingOption}
        onPress={() => toggleMenu('availability', availabilityRef)}
      >
        <Ionicons name="bar-chart-outline" size={35} color='rgb(218, 113, 15)' />
        <Text style={styles.settingText}>Availability</Text>
        <Ionicons name="chevron-forward" size={30} color="gray" />
      </TouchableOpacity>

      <TouchableOpacity
        ref={statsRef}
        style={styles.settingOption}
        onPress={() => toggleMenu('stats', statsRef)}
      >
        <Ionicons name="calendar-outline" size={35} color='rgb(218, 113, 15)' />
        <Text style={styles.settingText}>Stats</Text>
        <Ionicons name="chevron-forward" size={30} color="gray" />
      </TouchableOpacity>

      <TouchableOpacity
        ref={yelpRef}
        style={styles.settingOption}
        onPress={() => toggleMenu('yelp', yelpRef)}
      >
        <Ionicons name="star-half-outline" size={35} color='rgb(218, 113, 15)' />
        <Text style={styles.settingText}>Yelp Review</Text>
        <Ionicons name="chevron-forward" size={30} color="gray" />
      </TouchableOpacity>

      {isAccountMenuVisible && (
        <View style={[styles.menu, { top: menuPosition.top, left: menuPosition.left, width: menuPosition.width }]}>
          <TouchableOpacity style={styles.menuItem} onPress={() => setIsAccountMenuVisible(false)}>
            <Text style={styles.menuText}>Account 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => setIsAccountMenuVisible(false)}>
            <Text style={styles.menuText}>Account 2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => setIsAccountMenuVisible(false)}>
            <Text style={styles.menuText}>Account 3</Text>
          </TouchableOpacity>
        </View>
      )}

      {isContactMenuVisible && (
        <View style={[styles.menu, { top: menuPosition.top, left: menuPosition.left, width: menuPosition.width }]}>
          <TouchableOpacity style={styles.menuItem} onPress={() => setIsContactMenuVisible(false)}>
            <Text style={styles.menuText}>Contact 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => setIsContactMenuVisible(false)}>
            <Text style={styles.menuText}>Contact 2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => setIsContactMenuVisible(false)}>
            <Text style={styles.menuText}>Contact 3</Text>
          </TouchableOpacity>
        </View>
      )}

      {isSkillMenuVisible && (
        <View style={[styles.menu, { top: menuPosition.top, left: menuPosition.left, width: menuPosition.width }]}>
          <TouchableOpacity style={styles.menuItem} onPress={() => setIsSkillMenuVisible(false)}>
            <Text style={styles.menuText}>Skill 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => setIsSkillMenuVisible(false)}>
            <Text style={styles.menuText}>Skill 2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => setIsSkillMenuVisible(false)}>
            <Text style={styles.menuText}>Skill 3</Text>
          </TouchableOpacity>
        </View>
      )}

      {isAvailabilityMenuVisible && (
        <View style={[styles.menu, { top: menuPosition.top, left: menuPosition.left, width: menuPosition.width }]}>
          <TouchableOpacity style={styles.menuItem} onPress={() => setIsAvailabilityMenuVisible(false)}>
            <Text style={styles.menuText}>Availability 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => setIsAvailabilityMenuVisible(false)}>
            <Text style={styles.menuText}>Availability 2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => setIsAvailabilityMenuVisible(false)}>
            <Text style={styles.menuText}>Availability 3</Text>
          </TouchableOpacity>
        </View>
      )}

      {isStatsMenuVisible && (
        <View style={[styles.menu, { top: menuPosition.top, left: menuPosition.left, width: menuPosition.width }]}>
          <TouchableOpacity style={styles.menuItem} onPress={() => setIsStatsMenuVisible(false)}>
            <Text style={styles.menuText}>Stats 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => setIsStatsMenuVisible(false)}>
            <Text style={styles.menuText}>Stats 2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => setIsStatsMenuVisible(false)}>
            <Text style={styles.menuText}>Stats 3</Text>
          </TouchableOpacity>
        </View>
      )}

      {isYelpMenuVisible && (
        <View style={[styles.menu, { top: menuPosition.top, left: menuPosition.left, width: menuPosition.width }]}>
          <TouchableOpacity style={styles.menuItem} onPress={() => setIsYelpMenuVisible(false)}>
            <Text style={styles.menuText}>Yelp 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => setIsYelpMenuVisible(false)}>
            <Text style={styles.menuText}>Yelp 2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => setIsYelpMenuVisible(false)}>
            <Text style={styles.menuText}>Yelp 3</Text>
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
    position: 'absolute',
    backgroundColor: 'rgb(218, 113, 5)',
    borderRadius: 15,
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
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 30,
    textAlign: 'center',
  },
});

export default App;