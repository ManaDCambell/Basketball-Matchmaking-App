import React, { useState } from "react";
import { View, Text, Switch, TouchableOpacity, Modal, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Picker } from "@react-native-picker/picker";

const { width, height } = Dimensions.get("window");

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const generateTimeSlots = () => {
  const times = [];
  let hour = 8;
  let minute = 0;
  while (hour < 20 || (hour === 20 && minute === 0)) {
    const time = `${hour}:${minute === 0 ? "00" : "30"} ${hour >= 12 ? "PM" : "AM"}`;
    times.push(time);
    if (minute === 0) {
      minute = 30;
    } else {
      minute = 0;
      hour++;
    }
  }
  return times;
};

const timeSlots = generateTimeSlots();

const WeeklyAvailability = () => {
  const [availability, setAvailability] = useState(
    daysOfWeek.reduce((acc, day) => ({
      ...acc,
      [day]: { enabled: false, startTime: "9:00 AM", endTime: "5:00 PM" },
    }), {})
  );

  const [selectedDay, setSelectedDay] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [tempStartTime, setTempStartTime] = useState("9:00 AM");
  const [tempEndTime, setTempEndTime] = useState("5:00 PM");

  const toggleDay = (day) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: { ...prev[day], enabled: !prev[day].enabled },
    }));
  };

  const openEditModal = (day) => {
    setSelectedDay(day);
    setTempStartTime(availability[day].startTime);
    setTempEndTime(availability[day].endTime);
    setModalVisible(true);
  };

  const saveTime = () => {
    if (tempEndTime <= tempStartTime) {
      alert("End time cannot be earlier than start time.");
      return;
    }
    setAvailability((prev) => ({
      ...prev,
      [selectedDay]: { ...prev[selectedDay], startTime: tempStartTime, endTime: tempEndTime },
    }));
    setModalVisible(false);
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        {daysOfWeek.map((day) => (
          <View key={day} style={styles.row}>
            <Switch value={availability[day].enabled} onValueChange={() => toggleDay(day)} />
            <Text style={styles.dayText}>{day}</Text>
            <Text style={styles.timeText}>
              {availability[day].enabled ? `${availability[day].startTime} - ${availability[day].endTime}` : "Not Available"}
            </Text>
            <TouchableOpacity style={styles.editButton} onPress={() => openEditModal(day)}>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* Time Picker Modal */}
        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Edit Availability</Text>

              <Text style={styles.modalLabel}>Start Time</Text>
              <Picker
                selectedValue={tempStartTime}
                onValueChange={(itemValue) => setTempStartTime(itemValue)}
                style={styles.picker}
              >
                {timeSlots.map((time) => (
                  <Picker.Item key={time} label={time} value={time} />
                ))}
              </Picker>

              <Text style={styles.modalLabel}>End Time</Text>
              <Picker
                selectedValue={tempEndTime}
                onValueChange={(itemValue) => setTempEndTime(itemValue)}
                style={styles.picker}
              >
                {timeSlots.map((time) => (
                  <Picker.Item key={time} label={time} value={time} />
                ))}
              </Picker>

              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.modalButton} onPress={saveTime}>
                  <Text style={styles.modalButtonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "rgb(78, 78, 78)",
  },
  container: {
    padding: 20,
    width: width,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgb(168, 168, 168)",
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
  },
  dayText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
  },
  timeText: {
    flex: 1.2,
    fontSize: 14,
    color: "rgb(110, 110, 110)",
  },
  editButton: {
    padding: 8,
    backgroundColor: "rgb(218, 113, 15)",
    borderRadius: 5,
  },
  editText: {
    color: "white",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "rgb(168, 168, 168)",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
    maxHeight: "auto",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 10,
  },
  picker: {
    height: 200,
    width: "100%",
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "rgb(84, 216, 91)",
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: "rgb(219, 18, 18)",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default WeeklyAvailability;
