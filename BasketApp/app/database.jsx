import { StyleSheet, TextInput, FlatList, TouchableOpacity, Text, SafeAreaView, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { db } from '../FirebaseConfig';
import {auth} from '../FirebaseConfig';
import {setLoggedInUser,getLoggedInUser} from '../FirebaseConfig';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,deleteUser} from 'firebase/auth';
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
      if (user) {
        const q = query(usersCollection, where("email", "==", email));
        const tempData = await getDocs(q);
        setLoggedInUser(tempData.docs[0].data().userName);
        return true;
      }
      else
        return false;
    } catch(error){
      console.log(error);
      alert('signin failed');
      return false;
    }
}
export async function logOut(){
  auth.signOut();
  setLoggedInUser(undefined);
}
export async function getUserNames() {
  const userNames = [];
  const users = await getDocs(usersCollection);
  for (let i = 0; i < users.size; i++) {
    userNames.push(users.docs[i].data().userName);
  }
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
export async function getFriends(userName) {
  const q = query(usersCollection, where("userName", "==", userName));
  const tempData = await getDocs(q);
  
  if (tempData.empty) {
    console.log("No user found.");
    return [];
  }

  const data = tempData.docs[0].data().friends || [];
  
  if (!Array.isArray(data)) {
    console.log("Friends data is not an array.");
    return [];
  }

  return data;
}
export async function getLookingForMatch(userName) {
  const q = query(usersCollection, where("userName", "==", userName));
  const tempData = await getDocs(q);
  const data = tempData.docs[0].data().lookingForMatch;
  return data;
}
export async function getPlayingAgainst(userName) {
  const q = query(usersCollection, where("userName", "==", userName));
  const tempData = await getDocs(q);
  const data = tempData.docs[0].data().playingAgainst;
  return data;
}
export async function getSkillPref(userName) {
  const q = query(usersCollection, where("userName", "==", userName));
  const tempData = await getDocs(q);
  const data = tempData.docs[0].data().skillPref;
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
export async function setLookingForMatch(userName,newLookingForMatch) {
  try {
    const q = query(usersCollection, where("userName", "==", userName));
    const docId = await getDocs(q);
    const docRef = doc(usersCollection, docId.docs[0].id);
    await updateDoc(docRef, {
      lookingForMatch: newLookingForMatch
    });
  } catch (error) {
    console.log("Error updating document: ", error);
  }
}
export async function setPlayingAgainst(userName,newPlayingAgainst) {
  try {
    const q = query(usersCollection, where("userName", "==", userName));
    const docId = await getDocs(q);
    const docRef = doc(usersCollection, docId.docs[0].id);
    await updateDoc(docRef, {
      playingAgainst: newPlayingAgainst
    });
  } catch (error) {
    console.log("Error updating document: ", error);
  }
}
export async function setSkillPref(userName,newSkillPref) {
  try {
    const q = query(usersCollection, where("userName", "==", userName));
    const docId = await getDocs(q);
    const docRef = doc(usersCollection, docId.docs[0].id);
    await updateDoc(docRef, {
      skillPref: newSkillPref
    });
  } catch (error) {
    console.log("Error updating document: ", error);
  }
}
export const getUserNames2 = async () => {
  try {
    const usersRef = collection(db, 'users');
    const snapshot = await getDocs(usersRef);
    return snapshot.docs.map(doc => ({ userName: doc.data().userName }));
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};
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

export async function addFriend(userName, FriendUserName) {
  try {
    if (!FriendUserName || FriendUserName.trim() === "") {
      console.log("Invalid FriendUserName:", FriendUserName);
      return;
    }
    const q = query(usersCollection, where("userName", "==", userName));
    const tempData = await getDocs(q);
    if (tempData.empty) {
      console.log('User not found.');
      return;
    }
    const userDoc = tempData.docs[0];
    let data = userDoc.data().friends;
    console.log("Fetched Friends:", data);
    if (!Array.isArray(data)) {
      console.log('Friends array was undefined or not an array. Initializing it.');
      data = [];
    }
    if (data.includes(FriendUserName)) {
      console.log("This user is already your friend.");
      return;
    }
    data.push(FriendUserName);
    const docRef = doc(usersCollection, userDoc.id);
    console.log("Updating friends list with:", data);
    await updateDoc(docRef, {
      friends: data
    });
    console.log('Friend added successfully');
  } catch (error) {
    console.error("Error updating document: ", error);
  }
}

export async function fetchFriendsData(setFriends, userName = "Pab") {
  try {
    const friendList = await getFriends(userName);
    setFriends(friendList || []);
  } catch (error) {
    console.error("Failed to fetch friends:", error);
    setFriends([]);
  }
}

export async function setEmail(userName, newEmail, password) {
  try {
    const q = query(usersCollection, where("userName", "==", userName));
    const docId = await getDocs(q);
    const user = await signInWithEmailAndPassword(auth,docId.docs[0].data().email,password);
    if (user){
      const q = query(usersCollection, where("email", "==", newEmail));
      const tempData = await getDocs(q);
      if (tempData != undefined)
      {
        const user1 = auth.currentUser;
        deleteUser(user1);
        const newUser = await createUserWithEmailAndPassword(auth,newEmail,password);
        if (newUser){
          const docRef = doc(usersCollection, docId.docs[0].id);
          await updateDoc(docRef, {
            email: newEmail
          });
          return true
        }
        else{
          return false
        }
      }
      else{
        return false
      }
    }
    else {
      return false
    }
  } catch (error) {
    console.log("Error updating email: ", error);
    return false
  }
}

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