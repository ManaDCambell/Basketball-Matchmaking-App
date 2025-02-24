import { StyleSheet, TextInput, FlatList, TouchableOpacity, Text, SafeAreaView, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { db } from '../../FirebaseConfig';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export default function TabTwoScreen() {
  const [users, setUsers] = useState([]);
  const [usert, setUser] = useState({fullName:'', userName:'', password:'', age:0, phoneNumber:0, elo:0, location:'', email:'', friends:[]});
  const auth = getAuth();
  const user = auth.currentUser;
  const usersCollection = collection(db, 'users');
  useEffect(() => {
    fetchUsers();
  }, [user]);

  const fetchUsers = async () => {
    if (user) {
      const data = await getDocs(collection(db, "users"));
      data.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } else {
      console.log("No user logged in");
    }
  };

  const addUser = async () => {
    console.log("add Button clicked")
    if (user) {
      await addDoc(usersCollection,  {fullName : usert.fullName , userName: usert.userName, password : usert.password, age : usert.age, phoneNumber : usert.phoneNumber, elo : usert.elo, location : usert.location, email : usert.email, friends : usert.friends});
      setUser({fullName:'', userName:'', password:'', age:0, phoneNumber:0, elo:0, location:'', email:'', friends:[]});
      fetchUsers();
    } else {
      console.log("No user logged in");
    }
  };
  const deleteUser = async (id) => {
    const todoDoc = doc(db, 'users', id);
    await deleteDoc(todoDoc);
    fetchUsers();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.mainTitle}>Todo List</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="fullName"
            value={usert.fullName}
            onChangeText={(text) => setUser({...usert, fullName: text})}
          />
          <TextInput
            placeholder="userName"
            value={usert.userName}
            onChangeText={(text) => setUser({...usert, userName: text})}
          />
          <TextInput 
                placeholder='Password'
                value={usert.password}
                onChangeText={(text) => setUser({...usert, password: text})}
            />
            <TextInput 
                placeholder='Age'
                value={usert.age}
                onChangeText={(text) => setUser({...usert, age: text})}
                keyboardType='numeric'
            />
            <TextInput 
                placeholder='Phone Number'
                value={usert.phoneNumber}
                onChangeText={(Number) => setUser({...usert, phoneNumber: Number})}
                keyboardType='numeric'
            />
            <TextInput 
                placeholder='Elo'
                value={usert.elo}
                onChangeText={(text) => setUser({...usert, elo: text})}
                keyboardType='numeric'
            />
            <TextInput 
                placeholder='county'
                value={usert.location}
                onChangeText={(text) => setUser({...usert, location: text})}
            />
            <TextInput 
                placeholder='email'
                value={usert.email}
                onChangeText={(text) => setUser({...usert, email: text})}
                keyboardType='email-address'
            />
          <TouchableOpacity style={styles.addButton} onPress={addUser}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={users}
          renderItem={({ item }) => (
            <View style={styles.todoContainer}>
              <Text style={{ textDecorationLine: item.completed ? 'line-through' : 'none', flex: 1 }}>{item.userName}</Text>
              <Text style={{ textDecorationLine: item.completed ? 'line-through' : 'none', flex: 1 }}>{item.fullName}</Text>
              <TouchableOpacity style={styles.button} onPress={() => deleteUser(item.id)}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10, // Adjust spacing as needed
    color: '#333', // Choose a color that fits your app theme
  },
  inputContainer: {
    //flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    flex: 1, // Adjusted to take available space
    marginRight: 10, // Add margin to separate input and button
  },
  addButton: {
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFA726', // Use a distinct color for the add button
    shadowColor: '#FFA726',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  todoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
  },
  button: {
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5C6BC0',
    shadowColor: '#5C6BC0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
    marginLeft: 10,
  },
});