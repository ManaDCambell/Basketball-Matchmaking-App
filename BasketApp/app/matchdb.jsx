import { db } from '../FirebaseConfig';
import {getLoggedInUser} from '../FirebaseConfig';
import { collection, addDoc, getDocs,updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';

const matchesCollection = collection(db, 'matches');

/**
 * Creates a match
 * @param {boolean} isComp 
 * @param {number} matchType 0 for 1v1, 1 for 2v2, and 2 for 3v3 
 * @param {Array} team1 
 * @param {Array} team2 
 * @returns {boolean} returns true if match is created else return false
 */
export async function CreateGame(isComp, matchType, team1, team2) {
    try {
        await addDoc(matchesCollection,  {inProgress : true , isComp : isComp , matchType : matchType , team1 : team1 , team1Score : 0, team2 : team2 , team2Score : 0});
        return true;
    } catch(error){
        console.log(error);
        alert('game failed to start');
        return false;
    }
}

/**
 * gets the inProgress variable for the given match id
 * @param {number} id 
 * @returns {boolean} Returns true if the match is in progress
 */
export async function getInProgress(id) {
  const q = query(matchesCollection, id);
  const tempData = await getDocs(q);
  const data = tempData.docs[0].data().inProgress;
  return data;
}
/**
 * gets the isComp variable for the given match id
 * @param {number} id 
 * @returns {boolean} Returns true if the match is competive
 */
export async function getIsComp(id) {
    const q = query(matchesCollection, id);
    const tempData = await getDocs(q);
    const data = tempData.docs[0].data().inComp;
    return data;
}
/**
 * gets the matchType variable for the given match id
 * @param {number} id 
 * @returns {number} Returns 0 for 1v1, 1 for 2v2, and 2 for 3v3
 */
export async function getMatchType(id) {
    const q = query(matchesCollection, id);
    const tempData = await getDocs(q);
    const data = tempData.docs[0].data().matchType;
    return data;
}
/**
 * gets the team1 variable for the given match id
 * @param {number} id 
 * @returns {Array} Returns an array of team1
 */
export async function getTeam1(id) {
    const q = query(matchesCollection, id);
    const tempData = await getDocs(q);
    const data = tempData.docs[0].data().team1;
    return data;
}
/**
 * gets the team1Score variable for the given match id
 * @param {number} id 
 * @returns {number} Returns the score of team1
 */
export async function getTeam1Score(id) {
    const q = query(matchesCollection, id);
    const tempData = await getDocs(q);
    const data = tempData.docs[0].data().team1Score;
    return data;
}
/**
 * gets the team2 variable for the given match id
 * @param {number} id 
 * @returns {Array} Returns an array of team2
 */
export async function getTeam2(id) {
    const q = query(matchesCollection, id);
    const tempData = await getDocs(q);
    const data = tempData.docs[0].data().team2;
    return data;
}
/**
 * gets the team2Score variable for the given match id
 * @param {number} id 
 * @returns {number} Returns the score of team2
 */
export async function getTeam2Score(id) {
    const q = query(matchesCollection, id);
    const tempData = await getDocs(q);
    const data = tempData.docs[0].data().team2Score;
    return data;
}

/**
 * Sets the inProgress variable for the given match id to the newInProgress
 * @param {string} id 
 * @param {boolean} newInProgress 
 */
export async function setInProgress(id,newInProgress) {
  try {
    const docRef = doc(matchesCollection, id);
    await updateDoc(docRef, {
        inProgress: newInProgress
    });
  } catch (error) {
    console.log("Error updating document: ", error);
  }
}
/**
 * Sets the isComp variable for the given match id to the newIsComp
 * @param {string} id 
 * @param {boolean} newIsComp
 */
export async function setIsComp(id,newIsComp) {
    try {
      const docRef = doc(matchesCollection, id);
      await updateDoc(docRef, {
        isComp: newIsComp
      });
    } catch (error) {
      console.log("Error updating document: ", error);
    }
}
/**
 * Sets the matchType variable for the given match id to the newMatchType
 * @param {string} id 
 * @param {number} newMatchType 0 for 1v1, 1 for 2v2, and 2 for 3v3
 */
export async function setMatchType(id,newMatchType) {
    try {
      const docRef = doc(matchesCollection, id);
      await updateDoc(docRef, {
        matchType: newMatchType
      });
    } catch (error) {
      console.log("Error updating document: ", error);
    }
}
/**
 * Sets the team1 variable for the given match id to the team1
 * @param {string} id 
 * @param {Array} newTeam1
 */
export async function setTeam1(id,newTeam1) {
    try {
      const docRef = doc(matchesCollection, id);
      await updateDoc(docRef, {
        team1: newTeam1
      });
    } catch (error) {
      console.log("Error updating document: ", error);
    }
}
/**
 * Sets the team1Score variable for the given match id to the team1Score
 * @param {string} id 
 * @param {number} newTeam1Score
 */
export async function setTeam1Score(id,newTeam1Score) {
    try {
      const docRef = doc(matchesCollection, id);
      await updateDoc(docRef, {
        team1Score: newTeam1Score
      });
    } catch (error) {
      console.log("Error updating document: ", error);
    }
}
/**
 * Sets the team2 variable for the given match id to the team2
 * @param {string} id 
 * @param {Array} newTeam2
 */
export async function setTeam2(id,newTeam2) {
    try {
      const docRef = doc(matchesCollection, id);
      await updateDoc(docRef, {
        team2: newTeam2
      });
    } catch (error) {
      console.log("Error updating document: ", error);
    }
}
/**
 * Sets the team2Score variable for the given match id to the team2Score
 * @param {string} id 
 * @param {number} newTeam2Score
 */
export async function setTeam2Score(id,newTeam2Score) {
    try {
      const docRef = doc(matchesCollection, id);
      await updateDoc(docRef, {
        team2Score: newTeam2Score
      });
    } catch (error) {
      console.log("Error updating document: ", error);
    }
}

export default function MatchDB() {
  return <Text>Nothing Here</Text>;
}