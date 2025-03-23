import { db } from '../FirebaseConfig';
import {auth} from '../FirebaseConfig';
import {setLoggedInUser,getLoggedInUser} from '../FirebaseConfig';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,deleteUser} from 'firebase/auth';
import { collection, addDoc, getDocs, setDoc,updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const usersCollection = collection(db, 'users');