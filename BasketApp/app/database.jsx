import { StyleSheet, TextInput, FlatList, TouchableOpacity, Text, SafeAreaView, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { db } from '../FirebaseConfig';
import {auth} from '../FirebaseConfig';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import { collection, addDoc, getDocs, setDoc,updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const usersCollection = collection(db, 'users');
export async function createAccount(fullName, userName, password, age, phoneNumber, location,email){
    try {
      const user = await createUserWithEmailAndPassword(auth,email,password);
      if (user) {
        await addDoc(usersCollection,  {fullName : fullName , userName: userName, password : password, age : age, phoneNumber : phoneNumber, elo : 100, location : location, email : email, friends : []});
        return true;
      }
      else
        return false;
    } catch(error){
      console.log(error);
      alert('sign up failed');
      return false;
    }
}
export async function checkCredentials(email,password){
    try {
      const user = await signInWithEmailAndPassword(auth,email,password);
      if (user) 
        return true;
      else
        return false;
    } catch(error){
      console.log(error);
      alert('signin failed');
      return false;
    }
}
export async function getUserNames() {
  const [userNames, setUserNames] = useState([]);
  getDocs(usersCollection).then((querySnapshot) => {
      // Process the results here.  This code executes AFTER the query completes.
      if (!querySnapshot.empty) {
        setUserNames(querySnapshot.docs.map((doc) => ({ ...doc.data().userName, id: doc.id })));
      } else {
        console.log("No documents found.");
        setData("fail");
      }
    })
    .catch((error) => {
      console.error("Error getting documents: ", error);
      setData("fail");
    });
  return userNames;
}
export async function getUser(userName) {
  const q = query(usersCollection, where("userName", "==", userName));
  const tempData = await getDocs(q);
  const data = tempData.docs[0].data();
  return data;
}
export async function getFullName(userName) {
  const q = query(usersCollection, where("userName", "==", userName));
  const tempData = await getDocs(q);
  const data = tempData.docs[0].data().fullName;
  return data;
}
export async function getElo(userName) {
  const q = query(usersCollection, where("userName", "==", userName));
  const tempData = await getDocs(q);
  const data = tempData.docs[0].data().elo;
  return data;
}
export async function getAge(userName) {
  const q = query(usersCollection, where("userName", "==", userName));
  const tempData = await getDocs(q);
  const data = tempData.docs[0].data().age;
  return data;
}
export async function getPhoneNumber(userName) {
  const q = query(usersCollection, where("userName", "==", userName));
  const tempData = await getDocs(q);
  const data = tempData.docs[0].data().phoneNumber;
  return data;
}
export async function getLocation(userName) {
  const q = query(usersCollection, where("userName", "==", userName));
  const tempData = await getDocs(q);
  const data = tempData.docs[0].data().location;
  return data;
}
export async function getEmail(userName) {
  const q = query(usersCollection, where("userName", "==", userName));
  const tempData = await getDocs(q);
  const data = tempData.docs[0].data().email;
  return data;
}
export async function setFullName(userName,newFullName) {
  try {
    const q = query(usersCollection, where("userName", "==", userName));
    const docId = await getDocs(q);
    const docRef = doc(usersCollection, docId.docs[0].id);
    await updateDoc(docRef, {
      fullName: newFullName
    });
  } catch (error) {
    console.log("Error updating document: ", error);
  }
}
export async function setElo(userName,newElo) {
  try {
    const q = query(usersCollection, where("userName", "==", userName));
    const docId = await getDocs(q);
    const docRef = doc(usersCollection, docId.docs[0].id);
    await updateDoc(docRef, {
      elo: newElo
    });
  } catch (error) {
    console.log("Error updating document: ", error);
  }
}
export async function setAge(userName,newAge) {
  try {
    const q = query(usersCollection, where("userName", "==", userName));
    const docId = await getDocs(q);
    const docRef = doc(usersCollection, docId.docs[0].id);
    await updateDoc(docRef, {
      age: newAge
    });
  } catch (error) {
    console.log("Error updating document: ", error);
  }
}
export async function setPhoneNumber(userName,newPhoneNumber) {
  try {
    const q = query(usersCollection, where("userName", "==", userName));
    const docId = await getDocs(q);
    const docRef = doc(usersCollection, docId.docs[0].id);
    await updateDoc(docRef, {
      phoneNumber: newPhoneNumber
    });
  } catch (error) {
    console.log("Error updating document: ", error);
  }
}
export async function setLocation(userName,newLocation) {
  try {
    const q = query(usersCollection, where("userName", "==", userName));
    const docId = await getDocs(q);
    const docRef = doc(usersCollection, docId.docs[0].id);
    await updateDoc(docRef, {
      location: newLocation
    });
  } catch (error) {
    console.log("Error updating document: ", error);
  }
}
export async function setUserName(oldUserName,newUserName) {
  try {
    const q = query(usersCollection, where("userName", "==", oldUserName));
    const docId = await getDocs(q);
    const docRef = doc(usersCollection, docId.docs[0].id);
    await updateDoc(docRef, {
      userName: newUserName
    });
  } catch (error) {
    console.log("Error updating document: ", error);
  }
}
export async function resetPassword(email) {
  try {
    await sendPasswordResetEmail(auth, email);
    // Handle successful password reset request (e.g., display success message)
  } catch (error) {
    // Handle errors (e.g., display error message)
    throw error;
  }
}

export const getUserNames = async () => {
    try {
      const usersRef = collection(db, 'users');
      const snapshot = await getDocs(usersRef);
      return snapshot.docs.map(doc => ({ userName: doc.data().userName }));
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  };

  export const getFriends = async () => {
    try {
      const friendsRef = collection(db, 'friends');
      const snapshot = await getDocs(friendsRef);
      return snapshot.docs.map(doc => ({ userName: doc.data().userName }));
    } catch (error) {
      console.error('Error fetching friends:', error);
      return [];
    }
  };
  
  // Add a new friend to Firestore
  export const addFriend = async (userName) => {
    try {
      const friendsRef = collection(db, 'friends');
      await addDoc(friendsRef, { userName });
    } catch (error) {
      console.error('Error adding friend:', error);
    }
  };

export default function TabTwoScreen() {
  const [users, setUsers] = useState([]);
  const [usert, setUser] = useState({fullName:'', userName:'', password:'', age:0, phoneNumber:0, elo:0, location:'', email:'', friends:[]});
  const auth = getAuth();
  const user = auth.currentUser;
  useEffect(() => {
    fetchUsers();
  }, [user]);

  const fetchUsers = async () => {
    if (user) {
      const data = await getDocs(collection(db, "users"));
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
            placeholder="fullname"
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