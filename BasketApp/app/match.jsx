import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';
import { useNavigation } from '@react-navigation/native';


const Match = ({ navigation }) => {
  const [basketSide, setBasketSide] = useState(null);
  const [matchDuration, setMatchDuration] = useState(1200); // Default timer
  const [settingsConfirmed, setSettingsConfirmed] = useState(false);
  const [matchStarted, setMatchStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1200);
  const [video, setVideo] = useState(null);

  useEffect(() => {
    let interval;
    if (matchStarted && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [matchStarted, timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleConfirmSettings = () => {
    if (!basketSide) {
      Alert.alert("Please select a basket side.");
      return;
    }
    if (!matchDuration) {
      Alert.alert("Please select a match duration.");
      return;
    }
    setSettingsConfirmed(true);
    setTimeLeft(matchDuration);
    Alert.alert("Settings confirmed.");
  };

  const handleStartMatch = () => {
    setMatchStarted(true);
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
      Alert.alert('Video selected!', videoUri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {matchStarted ? "Match in Progress" : "Match Setup"}
    </Text>


      <Text style={styles.timerText}>
        {formatTime(matchStarted ? timeLeft : matchDuration)}
      </Text>

      <Text style={styles.instructions}>Select your team's basket:</Text>
      <View style={styles.basketToggle}>
        <TouchableOpacity
          style={[
            styles.basketButton,
            basketSide === "Left" && styles.selectedBasket,
            settingsConfirmed && styles.locked,
          ]}
          onPress={() => !settingsConfirmed && setBasketSide("Left")}
        >
          <Text style={styles.basketText}>Left Basket</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.basketButton,
            basketSide === "Right" && styles.selectedBasket,
            settingsConfirmed && styles.locked,
          ]}
          onPress={() => !settingsConfirmed && setBasketSide("Right")}
        >
          <Text style={styles.basketText}>Right Basket</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.instructions}>Select match time:</Text>
      <View style={styles.durationButtons}>
        <TouchableOpacity
          style={[
            styles.timeButton,
            matchDuration === 600 && styles.selectedTimeButton,
            settingsConfirmed && styles.locked,
          ]}
          onPress={() => !settingsConfirmed && setMatchDuration(600)}
        >
          <Text style={styles.timeText}>10 min</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.timeButton,
            matchDuration === 1200 && styles.selectedTimeButton,
            settingsConfirmed && styles.locked,
          ]}
          onPress={() => !settingsConfirmed && setMatchDuration(1200)}
        >
          <Text style={styles.timeText}>20 min</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.timeButton,
            matchDuration === 10 && styles.selectedTimeButton, // Dev only
            settingsConfirmed && styles.locked,
          ]}
          onPress={() => !settingsConfirmed && setMatchDuration(10)}
        >
          <Text style={styles.timeText}>30 min</Text>
        </TouchableOpacity>
      </View>

      {!settingsConfirmed && (
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirmSettings}
        >
          <Text style={styles.confirmText}>Confirm Settings</Text>
        </TouchableOpacity>
      )}

      {settingsConfirmed && !matchStarted && (
        <TouchableOpacity
          style={styles.startButton}
          onPress={handleStartMatch}
        >
          <Text style={styles.confirmText}>Start Match</Text>
        </TouchableOpacity>
      )}

{matchStarted && (
  <TouchableOpacity
    style={[
      styles.uploadButton,
      timeLeft > 0 && styles.disabledButton,
    ]}
    onPress={pickVideo}
    disabled={timeLeft > 0}
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
  onPress={() => {
    Alert.alert('Success', 'Video uploaded!', [
      {
        text: 'OK',
        onPress: () => navigation.navigate('Home'),
      },
    ]);
  }}
>
  <Text style={styles.uploadFinalText}>Upload</Text>
</TouchableOpacity>

  </>
)}
<View style={styles.footer}>
  <TouchableOpacity
    style={styles.forceQuitButton}
    onPress={() =>
      Alert.alert('Force Quit', 'Are you sure you want to quit the match?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Yes', style: 'destructive', onPress: () => navigation.navigate('Home') },
      ])
    }
  >
    <Text style={styles.forceQuitText}>Force Quit</Text>
  </TouchableOpacity>
</View>

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
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  forceQuitButton: {
    backgroundColor: 'rgba(255, 0, 0, 0.7)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  forceQuitText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 40,
    marginBottom: 10,
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
  startButton: {
    backgroundColor: 'rgb(7, 94, 236)',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginBottom: 20,
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
  video: {
    width: '100%',
    height: 300,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: 'black',
  },
});
