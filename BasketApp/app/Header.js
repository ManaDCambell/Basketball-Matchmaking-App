import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { logOut, getUser } from './database';
import { getLoggedInUser } from '../FirebaseConfig';
import Icon from 'react-native-vector-icons/Ionicons';

const { height, width } = Dimensions.get('window');

const Header = () => {
  const navigation = useNavigation();
  const [hasNotifications, setHasNotifications] = useState(false);

  useEffect(() => {
    const checkNotifications = async () => {
      const username = getLoggedInUser();
      if (!username) return;

      const user = await getUser(username);
      const hasFriendReqs = user?.friendRequestsReceived?.length > 0;
      const hasMatchReqs = user?.matchRequestsReceived?.length > 0;

      setHasNotifications(hasFriendReqs || hasMatchReqs);
    };

    checkNotifications();
  }, []);

  const handleSignOut = async () => {
    logOut();
    navigation.navigate('Login');
  };

  return (
    <View style={styles.header}>
      <View style={{ marginRight: width * 0.75 }}>
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <Icon name="notifications-outline" size={40} color="white" />
          {hasNotifications && (
            <View style={styles.notificationDot} />
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('UserProfileSettings')}>
        <Icon name="cog-outline" size={40} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    backgroundColor: '#283237',
    height: 65,
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 1,
    paddingHorizontal: 10,
  },
  notificationDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
  },
});

export default Header;
