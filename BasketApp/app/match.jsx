import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import { doc, updateDoc, getDocs, query, where, collection, onSnapshot } from 'firebase/firestore';
import { db, getLoggedInUser } from '../FirebaseConfig';
import { getUser, forceQuitMatch } from './database';

const Match = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [opponent, setOpponent] = useState('');
  const [setupBy, setSetupBy] = useState('');
  const [basketSide, setBasketSide] = useState(null);
  const [matchDuration, setMatchDuration] = useState(1200);
  const [startTime, setStartTime] = useState(null);
  const [matchStarted, setMatchStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1200);
  const [video, setVideo] = useState(null);
  const [settingsConfirmed, setSettingsConfirmed] = useState(false);

  useEffect(() => {
    const init = async () => {
      const name = getLoggedInUser();
      setUserName(name);
  
      const user = await getUser(name);
      const match = user?.activeMatch;
  
      if (!match || !match.opponent) return;
  
      const opponent = match.opponent;
      const sortedNames = [name, opponent].sort(); 
      const determinedSetupBy = sortedNames[0];
  
      setOpponent(opponent);
      setSetupBy(determinedSetupBy);
      setBasketSide(match.basket || null);
      setMatchDuration(match.durationInSeconds || 1200);
      setMatchStarted(match.started || false);
      setStartTime(match.startTime || null);
      setSettingsConfirmed(match.started || false);
  
      if (!match.setupBy) {
        const docs = await getDocs(
          query(collection(db, 'users'), where('userName', 'in', [name, opponent]))
        );
  
        for (const docSnap of docs.docs) {
          await updateDoc(doc(db, 'users', docSnap.id), {
            activeMatch: {
              ...docSnap.data().activeMatch,
              setupBy: determinedSetupBy,
            },
          });
        }
      }
    };
  
    init();
  }, []);
  
  useEffect(() => {
    if (!userName) return;
    const q = query(collection(db, 'users'), where('userName', '==', userName));
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs[0]?.data()?.activeMatch;
      if (data) {
        setOpponent(data.opponent);
        setSetupBy(data.setupBy);
        setBasketSide(data.basket);
        setMatchDuration(data.durationInSeconds || 1200);
        setStartTime(data.startTime || null);
        setMatchStarted(data.started || false);
        setSettingsConfirmed(data.started || false);
      }
    });
    return () => unsub();
  }, [userName]);

  useEffect(() => {
    if (!matchStarted || !startTime || !matchDuration) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const endTime = startTime + matchDuration * 1000;
      const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
      setTimeLeft(remaining);
    }, 1000);

    return () => clearInterval(interval);
  }, [matchStarted, startTime, matchDuration]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const uploadToServer = async (uri) => {
    const formData = new FormData();
    formData.append('video', {
      uri,
      type: 'video/quicktime',
      name: 'match_video.mov',
    });
  
    try {
      const response = await fetch('http://10.0.2.2:5000/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      const json = await response.json();
  
      if (response.ok) {
        Alert.alert('Match Results', `Score: ${json.score}`);
  
        const q = query(collection(db, 'users'), where('userName', '==', userName));
        const snapshot = await getDocs(q);
        const userDoc = snapshot.docs[0];
  
        if (userDoc) {
          const currentMatch = userDoc.data().activeMatch || {};
          await updateDoc(userDoc.ref, {
            prevScore: json.score
          });
          
        }
      } else {
        Alert.alert('Upload failed', json.error || 'Unknown error');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Network error', 'Could not connect to the server.');
    }
  };
  
  

  const confirmSettings = async () => {
    if (!basketSide || !matchDuration) {
      Alert.alert("Select basket and match time first.");
      return;
    }

    const docs = await getDocs(
      query(collection(db, 'users'), where('userName', 'in', [userName, opponent]))
    );
    const userDoc = docs.docs.find(d => d.data().userName === userName);
    const oppDoc = docs.docs.find(d => d.data().userName === opponent);

    const now = Date.now();

    const hostData = {
      opponent,
      setupBy: userName,
      basket: basketSide,
      durationInSeconds: matchDuration,
      confirmed: true,
      started: true,
      startTime: now
    };

    console.log('Host Data:', hostData);

    const guestData = {
      opponent: userName,
      setupBy: userName,
      basket: basketSide === 'Left' ? 'Right' : 'Left',
      durationInSeconds: matchDuration,
      confirmed: true,
      started: true,
      startTime: now
    };

    console.log('Guest Data:', guestData);

    await updateDoc(doc(db, 'users', userDoc.id), { activeMatch: hostData });
    await updateDoc(doc(db, 'users', oppDoc.id), { activeMatch: guestData });

    setMatchStarted(true);
    setStartTime(now);
    setSettingsConfirmed(true);
  };

  const pickVideo = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.status !== 'granted') {
      Alert.alert('Permission required', 'Camera roll permission is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      const videoUri = result.assets[0].uri;
      setVideo(videoUri);
      uploadToServer(videoUri);
      
      
    }
  };

  const renderSetupControls = () => (
    <>
      <Text style={styles.instructions}>Select your team's basket:</Text>
      <View style={styles.basketToggle}>
        {["Left", "Right"].map(side => (
          <TouchableOpacity
            key={side}
            style={[
              styles.basketButton,
              basketSide === side && styles.selectedBasket,
              settingsConfirmed && styles.locked,
            ]}
            onPress={() => !settingsConfirmed && setBasketSide(side)}
          >
            <Text style={styles.basketText}>{side} Basket</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.instructions}>Select match time:</Text>
      <View style={styles.durationButtons}>
        {[0.15*60, 20*60, 30*60].map(duration => (                                              //MATCH TIME OPTIONS
          <TouchableOpacity
            key={duration}
            style={[
              styles.timeButton,
              matchDuration === duration && styles.selectedTimeButton,
              settingsConfirmed && styles.locked,
            ]}
            onPress={() => !settingsConfirmed && setMatchDuration(duration)}
          >
            <Text style={styles.timeText}>{duration / 60} min</Text>
          </TouchableOpacity>
        ))}
      </View>

      {!settingsConfirmed && (
        <TouchableOpacity style={styles.confirmButton} onPress={confirmSettings}>
          <Text style={styles.confirmText}>Confirm Settings</Text>
        </TouchableOpacity>
      )}
    </>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{matchStarted ? "Match in Progress" : "Match Setup"}</Text>
      <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>

      {userName === setupBy ? renderSetupControls() : (
        <Text style={styles.instructions}>{matchStarted ? "Match in progress" : "Please wait while " + setupBy + " sets up the match..."}</Text>
      )}

      {matchStarted && timeLeft === 0 && (
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={pickVideo}
        >
          <Text style={styles.uploadText}>
            {video ? "Change Match Video" : "Upload Match Video"}
          </Text>
        </TouchableOpacity>
      )}


      {video && matchStarted && timeLeft === 0 && (
        <>
          <Video
            source={{ uri: video }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="contain"
            shouldPlay
            useNativeControls
            style={styles.video}
          />
          <TouchableOpacity
            style={styles.uploadFinalButton}
            onPress={async () => {
              try {
                const q = query(collection(db, 'users'), where('userName', '==', userName));
                const snapshot = await getDocs(q);
                const userDoc = snapshot.docs[0];

                if (userDoc) {
                  await updateDoc(userDoc.ref, {
                    activeMatch: null,
                  });
                }

                Alert.alert('Success', 'Video uploaded!', [
                  { text: 'OK', onPress: () => navigation.navigate('Home') },
                ]);
              } catch (error) {
                Alert.alert('Error', 'Something went wrong while uploading.');
                console.error(error);
              }
            }}
          >
            <Text style={styles.uploadFinalText}>Upload</Text>
          </TouchableOpacity>

        </>
      )}

      <TouchableOpacity
        style={styles.forceQuitButton}
        onPress={() =>
          Alert.alert('Force Quit', 'Are you sure you want to quit the match?', [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Yes',
              style: 'destructive',
              onPress: async () => {
                await forceQuitMatch(userName);
                navigation.navigate('Home');
              }
            },
          ])
        }
      >
        <Text style={styles.forceQuitText}>Force Quit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Match;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(40, 50, 55)',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 40,
    marginBottom: 10,
  },
  timerText: {
    fontSize: 36,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  instructions: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  basketToggle: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 20,
  },
  basketButton: {
    backgroundColor: 'rgba(78, 78, 78, 0.5)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  selectedBasket: {
    backgroundColor: 'rgb(218, 113, 5)',
  },
  locked: {
    opacity: 0.5,
  },
  basketText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  durationButtons: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 20,
  },
  timeButton: {
    backgroundColor: 'rgba(78, 78, 78, 0.5)',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  selectedTimeButton: {
    backgroundColor: 'rgb(218, 113, 5)',
  },
  timeText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  confirmButton: {
    backgroundColor: 'rgb(7, 94, 236)',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginBottom: 10,
  },
  confirmText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  uploadButton: {
    backgroundColor: 'rgb(218, 113, 5)',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  disabledButton: {
    backgroundColor: 'gray',
  },
  uploadText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  uploadFinalButton: {
    backgroundColor: 'rgb(7, 94, 236)',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 15,
  },
  uploadFinalText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  video: {
    width: '100%',
    height: 300,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: 'black',
  },
  forceQuitButton: {
    backgroundColor: 'rgba(255, 0, 0, 0.7)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 30,
  },
  forceQuitText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
});
