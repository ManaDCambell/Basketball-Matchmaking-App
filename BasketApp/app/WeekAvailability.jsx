import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const WeekAvailability = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [availability, setAvailability] = useState({
    Monday: { morning: false, afternoon: false, evening: false },
    Tuesday: { morning: false, afternoon: false, evening: false },
    Wednesday: { morning: false, afternoon: false, evening: false },
    Thursday: { morning: false, afternoon: false, evening: false },
    Friday: { morning: false, afternoon: false, evening: false },
    Saturday: { morning: false, afternoon: false, evening: false },
    Sunday: { morning: false, afternoon: false, evening: false },
  });

  const toggleAvailability = (day, period) => {
    if (isEditing) {
      setAvailability((prev) => ({
        ...prev,
        [day]: { ...prev[day], [period]: !prev[day][period] },
      }));
    }
  };

  return (
    <View style={styles.container}>
      {/* Row for Edit Button */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => setIsEditing(!isEditing)} style={styles.editButton}>
          <Icon name={isEditing ? "checkmark" : "pencil"} size={18} color="white" />
        </TouchableOpacity>
      </View>

      {/* Availability Table */}
      <View style={styles.table}>
        <View style={styles.headerRow}>
          <Text style={styles.headerCell}>Day</Text>
          <Text style={styles.headerCell}>Morning</Text>
          <Text style={styles.headerCell}>Afternoon</Text>
          <Text style={styles.headerCell}>Evening</Text>
        </View>
        {Object.keys(availability).map((day) => (
          <View key={day} style={styles.row}>
            <Text style={styles.dayCell}>{day}</Text>
            {['morning', 'afternoon', 'evening'].map((period) => (
              <TouchableOpacity
                key={period}
                style={[
                  styles.cell,
                  availability[day][period] ? styles.selected : styles.unselected,
                ]}
                onPress={() => toggleAvailability(day, period)}
              >
                <Text style={styles.cellText}>{availability[day][period] ? '✓' : ''}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  editButton: {
    backgroundColor: 'rgb(218, 113, 15)',
    width: 30,
    height: 30,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute'
  },
  table: {
    backgroundColor: 'rgb(78, 78, 78)',
    padding: 1,
    borderRadius: 10,
    width: '100%',
    minHeight: 200, // Ensures table isn't too small
    justifyContent: 'center',
  },
  headerCell: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  dayCell: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    flex: 1,
    fontWeight: 'bold',
  },
  cell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    marginHorizontal: 2,
    borderRadius: 5,
  },
  selected: {
    backgroundColor: 'rgb(218, 113, 15)',
  },
  unselected: {
    backgroundColor: 'rgb(128, 128, 128)',
  },
  cellText: {
    color: 'white',
    fontSize: 16,
  },
});

export default WeekAvailability;
