import { StatusBar } from 'expo-status-bar';
import { FlatList, Text, View, Pressable, Alert, TextInput } from 'react-native';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { useState, useEffect } from 'react';
import {AntDesign} from '@expo/vector-icons';

//Initilize the database
export async function initializeDatabase(db) {
    try {
        await db.execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS users (
                userName TEXT PRIMARY KEY,
                fullName TEXT,
                password TEXT,
                elo INTEGER,
                age INTEGER,
                phoneNumber INTEGER,
                location TEXT,
                email TEXT
            );
        `);
        console.log('Database initialised') 
    } catch (error) {
        console.log('Error while initializing database : ', error);
    }
}
//
export function getUser(db,userName) {
    try {
        const user = db.getFirstSync('SELECT * FROM Users WHERE userName = ?', userName);
        if (user == null)
            return "fail";
        else
            return user;
    } catch (error) {
        console.log('Error while initializing database : ', error);
        return "fail";
    }
}
export function getFullName(db,userName) {
    try {
        const variable = db.getFirstSync('SELECT fullName FROM Users WHERE userName = ?', userName);
        if (variable == null)
            return "fail";
        else
            return variable.fullName;
    } catch (error) {
        console.log('Error while initializing database : ', error);
        return "fail";
    }
}
export function getElo(db,userName) {
    try {
        const variable = db.getFirstSync('SELECT elo FROM Users WHERE userName = ?', userName);
        if (variable == null)
            return "fail";
        else
            return variable.elo;
    } catch (error) {
        console.log('Error while initializing database : ', error);
        return "fail";
    }
}
export function getAge(db,userName) {
    try {
        const variable = db.getFirstSync('SELECT age FROM Users WHERE userName = ?', userName);
        if (variable == null)
            return "fail";
        else
            return variable.age;
    } catch (error) {
        console.log('Error while initializing database : ', error);
        return "fail";
    }
}
//
export function getPhoneNumber(db,userName) {
    try {
        const variable = db.getFirstSync('SELECT phoneNumber FROM Users WHERE userName = ?', userName);
        if (variable == null)
            return "fail";
        else
            return variable.phoneNumber;
    } catch (error) {
        console.log('Error while initializing database : ', error);
        return "fail";
    }
}
export function getLocation(db,userName) {
    try {
        const variable = db.getFirstSync('SELECT location FROM Users WHERE userName = ?', userName);
        if (variable == null)
            return "fail";
        else
            return variable.location;
    } catch (error) {
        console.log('Error while initializing database : ', error);
        return "fail";
    }
}
export function getEmail(db,userName) {
    try {
        const variable = db.getFirstSync('SELECT email FROM Users WHERE userName = ?', userName);
        if (variable == null)
            return "fail";
        else
            return variable.email;
    } catch (error) {
        console.log('Error while initializing database : ', error);
        return "fail";
    }
}
export function setFullName(db,userName,newFullName) {
    try {
        db.getFirstSync('UPDATE users SET fullName = ? WHERE userName = ?', [newFullName, userName]);
    } catch (error) {
        console.log('Error while initializing database : ', error);
    }
}
export function setElo(db,userName,newElo) {
    try {
        db.getFirstSync('UPDATE users SET elo = ? WHERE userName = ?', [newElo, userName]);
    } catch (error) {
        console.log('Error while initializing database : ', error);
    }
}
export function setAge(db,userName,newAge) {
    try {
        db.getFirstSync('UPDATE users SET age = ? WHERE userName = ?', [newAge, userName]);
    } catch (error) {
        console.log('Error while initializing database : ', error);
    }
}
//
export function setPhoneNumber(db,userName,newPhoneNumber) {
    try {
        db.getFirstSync('UPDATE users SET phoneNumber = ? WHERE userName = ?', [newPhoneNumber, userName]);
    } catch (error) {
        console.log('Error while initializing database : ', error);
    }
}
export function setLocation(db,userName,newLocation) {
    try {
        db.getFirstSync('UPDATE users SET location = ? WHERE userName = ?', [newLocation, userName]);
    } catch (error) {
        console.log('Error while initializing database : ', error);
    }
}
export function setEmail(db,userName,newEmail) {
    try {
        db.getFirstSync('UPDATE users SET email = ? WHERE userName = ?', [newEmail, userName]);
    } catch (error) {
        console.log('Error while initializing database : ', error);
    }
}
export async function checkCredentials(db,userName,password) {
    try {
        const user = await db.getFirstAsync('SELECT password FROM Users WHERE userName = ?', userName);
        if (user)
            if (password === user.password)
                return true;
            else
                return false;
        else
            return false;
    } catch (error) {
        console.log('Error while initializing database : ', error);
        return false;
    }
}

//UserButton component
const UserButton = ({user, deleteUser, updateUser}) => {

    const [selectedUser, setSelectedUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({
        fullName: user.fullName,
        userName: user.userName,
        password: user.password,
        age: user.age,
        phoneNumber: user.phoneNumber,
        location: user.location,
        email: user.email
    })

    //function to confirm to delete a User
    const handleDelete = () => {
        Alert.alert(
            'Attention!',
            'Are you sure you want to delete the user?',
            [
                { text: 'No', onPress: () => { }, style: 'cancel'},
                { text: 'Yes', onPress: () =>  deleteUser(user.userName)},
            ],
            { cancelable: true } 
        );
    };

    const handleEdit = () => {
        updateUser(user.userName, editedUser.fullName, editedUser.userName, editedUser.password, editedUser.age, editedUser.phoneNumber, editedUser.location, editedUser.email);
        setIsEditing(false);
    }

    return (
        <View>
            <Pressable
                onPress={() => {setSelectedUser(selectedUser === user.userName ? null : user.userName)}}
            >
                <Text> {user.userName} - {user.fullName}</Text>
                {selectedUser === user.userName && (
                    <View >
                        <AntDesign 
                            name='edit'
                            size={18}
                            color='blue'
                            onPress={() => setIsEditing(true)}
                        />
                        <AntDesign 
                            name='delete'
                            size={18}
                            color='red'
                            onPress={handleDelete}
                        />
                    </View>
                )}
            </Pressable>
            {selectedUser === user.userName && !isEditing &&(
            <View>
                <Text>Full Name : {user.fullName}</Text>
                <Text>UserName : {user.userName}</Text>
                <Text>Password : {user.password}</Text>
                <Text>Age : {user.age}</Text>
                <Text>Phone Number : {user.phoneNumber}</Text>
                <Text>Location-county : {user.location}</Text>
                <Text>Email : {user.email}</Text>

            </View>
            )}
            {selectedUser === user.userName && isEditing && (
                <UserForm user={editedUser} setUser={setEditedUser} onSave={handleEdit} setShowForm={setIsEditing}/>
            )}
        </View>
    )
}

//UserForm component
const UserForm = ({user, setUser, onSave, setShowForm}) => {

    
    return (
        <View>
            <TextInput 
                placeholder='FullName'
                value={user.fullName}
                onChangeText={(text) => setUser({...user, fullName: text})}
            />
            <TextInput 
                placeholder='UserName'
                value={user.userName}
                onChangeText={(text) => setUser({...user, userName: text})}
            />
            <TextInput 
                placeholder='Password'
                value={user.password}
                onChangeText={(text) => setUser({...user, password: text})}
            />
            <TextInput 
                placeholder='Age'
                value={user.age}
                onChangeText={(text) => setUser({...user, age: text})}
                keyboardType='numeric'
            />
            <TextInput 
                placeholder='Phone Number'
                value={user.phoneNumber}
                onChangeText={(text) => setUser({...user, phoneNumber: text})}
                keyboardType='numeric'
            />
            <TextInput 
                placeholder='county'
                value={user.location}
                onChangeText={(text) => setUser({...user, location: text})}
            />
            <TextInput 
                placeholder='email'
                value={user.email}
                onChangeText={(text) => setUser({...user, email: text})}
                keyboardType='email-address'
            />

            <Pressable
                onPress={onSave}
            >
                <Text>Save</Text>
            </Pressable>
            <Pressable
                onPress={() => setShowForm(false)}
            >
                <Text>Cancel</Text>
            </Pressable>
        </View>
    )
}

export default function App() {
  return (
    <SQLiteProvider databaseName='example.db' onInit={initializeDatabase}>
        <View>
          <Text>List of users</Text>
          <Content />
          <StatusBar style="auto" />
        </View>
    </SQLiteProvider>
  );
}

const Content = () => {
    const db = useSQLiteContext();
    const [users, setUsers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [user, setUser] = useState({fullName:'', userName:'', password:'', age:0, phoneNumber:0, location:'', email:''});

    const handleSave = () => {

        if(user.fullName.length === 0 || user.userName.length === 0 || user.password.length === 0 ||user.age === 0 || user.phoneNumber === 0 || user.location === 0 || user.email.length ===0 ) {
            Alert.alert('Attention', 'Please enter all the data !')
        } else {
            addUser(user);
            setUser({fullName:'', userName:'', password:'', age:0, phoneNumber:0, location:'', email:''});
            setShowForm(false);
        }
    }
    
    //function to get all the users
    const getUsers = async () => {
        try {
            const allRows = await db.getAllAsync('SELECT * FROM users');
            setUsers(allRows);
        } catch (error) {
            console.log('Error while loading user : ', error);
        }
    };

    //function to add a user
    const addUser = async (newUser) => {
        try {
            const statement = await db.prepareAsync('INSERT INTO users (userName, fullName,  password, elo, age, phoneNumber, location, email) VALUES (?,?,?,0,?,?,?,?)');
            await statement.executeAsync([newUser.userName, newUser.fullName, newUser.password, newUser.age, newUser.phoneNumber, newUser.location, newUser.email]);
            await getUsers();
        } catch (error) {
            console.log('Error while adding user : ', error);
        }
    };

    //function to delete all users
    const deleteAllUsers = async () => {
        try {
            await db.runAsync('DELETE FROM users');
            await getUsers();
        } catch (error) {
            console.log('Error while deleting all the users : ', error);
        }
    };

    //function to confirm deleting all usera
    const confirmDeleteAll = () => {
        Alert.alert(
            'Attention!',
            'Are you sure you want to delete all the users ?',
            [
                { text: 'No', onPress: () => { }, style: 'cancel'},
                { text: 'Yes', onPress: deleteAllUsers},
            ],
            { cancelable: true}
        )
    };

    //function to update a user
    const updateUser = async (userName, newFullName, newUserName, newPassword, newAge, newPhoneNumber, newLocation, newEmail) => {
        console.log(userName);
        try {
            await db.runAsync('UPDATE users SET fullName = ?, userName = ?, password = ?, age = ?, phoneNumber = ?, location = ?, email = ? WHERE userName = ?', [newFullName, newUserName, newPassword, newAge, newPhoneNumber, newLocation ,newEmail, userName]);
            await getUsers();
        } catch (error) {
            console.log('Error while updating user');
        }
    };

    //function to delete a user
    const deleteUser = async (userName) => {
        try {
            await db.runAsync('DELETE FROM users WHERE userName = ?', [userName]);
            await getUsers();
        } catch (error) {
            console.log('Error while deleting the user : ', error);
        }
    }

    //get all the users at  the first render of the app
    useEffect(() => {
        getUsers();
    }, []);

    return (
        <View>
            {user.length === 0 ? (
              <Text>No users to load !</Text>
            ) : (
              <FlatList 
                  data = {users}
                  renderItem={({item}) => (
                      <UserButton user={item} deleteUser={deleteUser} updateUser={updateUser}/>  
                  )}
                  keyExtractor={(item) => item.userName.toString()}
              />
            )}
            {showForm && (<UserForm user={user} setUser={setUser} onSave={handleSave} setShowForm={setShowForm}/>)}
            {<View>

            <AntDesign 
                    name='pluscircleo'
                    size={24}
                    color='blue'
                    onPress={() => setShowForm(true)}
                />
                <AntDesign 
                    name='deleteusergroup'
                    size={24}
                    color='red'
                    onPress={confirmDeleteAll}
                />

            </View>}
        </View>
    )
}