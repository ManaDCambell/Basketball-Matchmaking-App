import { db } from '../FirebaseConfig';
import {auth} from '../FirebaseConfig';
import {setLoggedInUser,getLoggedInUser} from '../FirebaseConfig';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,deleteUser} from 'firebase/auth';
import { collection, addDoc, getDocs, setDoc,updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const usersCollection = collection(db, 'users');
/**
 * This Function Allows a user to create an account when logging in
 * @param {string} fullName 
 * @param {string} userName 
 * @param {string} password 
 * @param {number} age 
 * @param {number} phoneNumber 
 * @param {string} location 
 * @param {string} email 
 * @returns {boolean} Returns true if account is created and signed in. Returns false otherwise
 */
export async function createAccount(fullName, userName, password, age, phoneNumber, location,email){
    try {
      const user = await createUserWithEmailAndPassword(auth,email,password);
      if (user) {
        await addDoc(usersCollection,  {fullName : fullName , userName: userName, password : password, age : age, phoneNumber :
           phoneNumber, elo : 100, location : location, email : email, friends : [],lookingForMatch : 0, playingAgainst : "", skillPref : false});
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
/**
 * Takes a email and password used to log the user in
 * @param {string} email 
 * @param {string} password 
 * @returns {boolean} return true if the user is able to log in otherwise retun false
 */
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
/**
 * Logs out the current user
 */
export async function logOut(){
  auth.signOut();
  setLoggedInUser(undefined);
}

/**
 * gets the age of the given username from the userdatabse
 * @param {string} userName 
 * @returns {number} Returns a number
 */
export async function getAge(userName) {
  const q = query(usersCollection, where("userName", "==", userName));
  const tempData = await getDocs(q);
  const data = tempData.docs[0].data().age;
  return data;
}
/**
 * gets the elo of the given username from the userdatabse
 * @param {string} userName 
 * @returns {number} Returns a number
 */
export async function getElo(userName) {
  const q = query(usersCollection, where("userName", "==", userName));
  const tempData = await getDocs(q);
  const data = tempData.docs[0].data().elo;
  return data;
}
/**
 * gets the email of the given username from the userdatabse
 * @param {string} userName 
 * @returns {string} Returns a string
 */
export async function getEmail(userName) {
  const q = query(usersCollection, where("userName", "==", userName));
  const tempData = await getDocs(q);
  const data = tempData.docs[0].data().email;
  return data;
}
/**
 * gets the friends array of the given username from the userdatabse
 * @param {string} userName 
 * @returns {Array} Returns an Array
 */
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
/**
 * gets the fullname of the given username from the userdatabse
 * @param {string} userName 
 * @returns {string} Returns a string
 */
export async function getFullName(userName) {
  const q = query(usersCollection, where("userName", "==", userName));
  const tempData = await getDocs(q);
  const data = tempData.docs[0].data().fullName;
  return data;
}
/**
 * gets the location of the given username from the userdatabse
 * @param {string} userName 
 * @returns {string} Returns a string
 */
export async function getLocation(userName) {
  const q = query(usersCollection, where("userName", "==", userName));
  const tempData = await getDocs(q);
  const data = tempData.docs[0].data().location;
  return data;
}
/**
 * gets the lookingForMatch Variable of the given username from the userdatabse
 * @param {string} userName 
 * @returns {number} Returns a number
 */
export async function getLookingForMatch(userName) {
  const q = query(usersCollection, where("userName", "==", userName));
  const tempData = await getDocs(q);
  const data = tempData.docs[0].data().lookingForMatch;
  return data;
}
/**
 * gets the username of who the given username is playing against from the userdatabse
 * @param {string} userName 
 * @returns {string} Returns a string
 */
export async function getPlayingAgainst(userName) {
  const q = query(usersCollection, where("userName", "==", userName));
  const tempData = await getDocs(q);
  const data = tempData.docs[0].data().playingAgainst;
  return data;
}
/**
 * gets the phoneNumber of the given username from the userdatabse
 * @param {string} userName 
 * @returns {number} Returns a number
 */
export async function getPhoneNumber(userName) {
  const q = query(usersCollection, where("userName", "==", userName));
  const tempData = await getDocs(q);
  const data = tempData.docs[0].data().phoneNumber;
  return data;
}
/**
 * gets the user object of the given username from the userdatabse
 * @param {string} userName 
 * @returns {object}Returns a userObject
 */
export async function getUser(userName) {
  const q = query(usersCollection, where("userName", "==", userName));
  const tempData = await getDocs(q);
  const data = tempData.docs[0].data();
  return data;
}
/**
 * gets all user names in the user database
 * @returns {Array}Returns an array will all the users
 */
export async function getUserNames() {
  const userNames = [];
  const users = await getDocs(usersCollection);
  for (let i = 0; i < users.size; i++) {
    userNames.push(users.docs[i].data().userName);
  }
  return userNames;
}
/**
 * gets the skillPrefance of the given username from the userdatabse
 * @param {string} userName 
 * @returns {boolean} Returns a boolean
 */
export async function getSkillPref(userName) {
  const q = query(usersCollection, where("userName", "==", userName));
  const tempData = await getDocs(q);
  const data = tempData.docs[0].data().skillPref;
  return data;
}

export async function fetchFriendsData(setFriends, userName) {
  try {
    const friendList = await getFriends(userName);
    setFriends(friendList || []);
  } catch (error) {
    console.error("Failed to fetch friends:", error);
    setFriends([]);
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

/**
 * Adds a username to friends list of a given userName in the userName database
 * @param {string} userName 
 * @param {string} FriendUserName 
 * @returns {boolean} returns true if succeeds else returns false
 */
export async function addFriend(userName, FriendUserName) {
  try {
    if (!FriendUserName || FriendUserName.trim() === "") {
      console.log("Invalid FriendUserName:", FriendUserName);
      return false;
    }
    const q = query(usersCollection, where("userName", "==", userName));
    const tempData = await getDocs(q);
    if (tempData.empty) {
      console.log('User not found.');
      return false;
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
      return false;
    }
    data.push(FriendUserName);
    const docRef = doc(usersCollection, userDoc.id);
    await updateDoc(docRef, {
      friends: data
    });
    return true
  } catch (error) {
    console.error("Error updating document: ", error);
    return false
  }
}
/**
 * Sends an email to the given email with instructions to reset password
 * @param {string} email 
 */
export async function resetPassword(email) {
  try {
    await sendPasswordResetEmail(auth, email);
    // Handle successful password reset request (e.g., display success message)
  } catch (error) {
    // Handle errors (e.g., display error message)
    throw error;
  }
}
/**
 * set the age of the given username to the newAge
 * @param {string} userName 
 * @param {number} newAge
 */
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
/**
 * set the elo of the given username to the newElo
 * @param {string} userName 
 * @param {number} newElo 
 */
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
/**
 * set the db usur and auth user email to the new email. Requires password
 * @param {string} userName 
 * @param {string} newEmail 
 * @param {string} password 
 * @returns {boolean} Returns false if an error is thrown 
 */
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
/**
 * set the fullname of the given username to the newFullName
 * @param {string} userName 
 * @param {string} newFullName 
 */
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
/**
 * set the Location of the given username to the newLocation
 * @param {string} userName 
 * @param {string} newLocation 
 */
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
/**
 * set the looking for match for the given username to the newLookingForMatch
 * @param {string} userName 
 * @param {number} newLookingForMatch 
 */
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
/**
 * set the playingAgainst username of the given username to the newPlayingAgainst
 * @param {string} userName 
 * @param {string} newPlayingAgainst 
 */
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
/**
 * set the PhoneNumber of the given username to the newPhoneNumber
 * @param {string} userName 
 * @param {number} newPhoneNumber
 */
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
/**
 * set the userName of the given userName to the newUserName
 * @param {string} userName 
 * @param {string} newUserName 
 */
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
/**
 * sets the Skill Prefrance for the given username to the newSkillPref
 * @param {string} userName 
 * @param {boolean} newSkillPref 
 */
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
