import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, Pressable, Alert, TextInput } from 'react-native';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { useState, useEffect } from 'react';
import {AntDesign} from '@expo/vector-icons';

//Initilize the database
async function initializeDatabase(db) {
    try {
        await db.execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER AUTOINCREMENT,
                fullName text,
                userName TEXT PRIMARY KEY,
                age INTEGER,
                phoneNumber INTEGER,
                email TEXT
            );
        `);
        console.log('Database initialised')
    } catch (error) {
        console.log('Error while initializing database : ', error);
    }
}

//UserButton component
const UserButton = ({user, deleteUser, updateUser}) => {

    const [selectedUser, setSelectedUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({
        fullName: user.fullName,
        userName: user.userName,
        age: user.age,
        phoneNumber: user.phoneNumber,
        email: user.email
    })

    //function to confirm to delete a User
    const handleDelete = () => {
        Alert.alert(
            'Attention!',
            'Are you sure you want to delete the user?',
            [
                { text: 'No', onPress: () => { }, style: 'cancel'},
                { text: 'Yes', onPress: () =>  deleteUser(user.id)},
            ],
            { cancelable: true } 
        );
    };

    const handleEdit = () => {
        updateUser(user.id, editedUser.fullName, editedUser.userName, editedUser.age, editedUser.phoneNumber, editedUser.email);
        setIsEditing(false);
    }

    return (
        <View>
            <Pressable
                onPress={() => {setSelectedUser(selectedUser === user.id ? null : user.id)}}
            >
                <Text> {user.id} - {user.userName}</Text>
                {selectedUser === user.id && (
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
            {selectedUser === user.id && !isEditing &&(
            <View>
                <Text>Full Name : {user.fullName}</Text>
                <Text>UserName : {user.userName}</Text>
                <Text>Age : {user.age}</Text>
                <Text>Phone Number : {user.phoneNumber}</Text>
                <Text>Email : {user.email}</Text>

            </View>
            )}
            {selectedUser === user.id && isEditing && (
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
                placeholder='Age'
                value={user.age}
                onChangeText={(text) => setUser({...user, age: text})}
                keyboardType='numeric'
            />
            <TextInput 
                placeholder='Phone Number'
                value={user.age}
                onChangeText={(text) => setUser({...user, phoneNumber: text})}
                keyboardType='numeric'
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
    const [user, setUser] = useState({id: 0, fullName:'', userName:'', age:0, phoneNumber:0, email:''});

    const handleSave = () => {

        if(user.fullName.length === 0 || user.userName.length === 0 || user.age === 0 || user.phoneNumber === 0 || user.email.length ===0 ) {
            Alert.alert('Attention', 'Please enter all the data !')
        } else {
            addUser(user);
            setUser({id: 0, fullName:'', userName:'', age:0, phoneNumber:0, email:''});
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
            const statement = await db.prepareAsync('INSERT INTO users (fullName, userName, age, phoneNumber, email) VALUES (?,?,?,?,?)');
            await statement.executeAsync([newUser.fullName, newUser.userName, newUser.age, newUser.phoneNumber, newUser.email]);
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
    const updateUser = async (userId, newFullName, newUserName, newAge, newPhoneNumber, newEmail) => {
        try {
            await db.runAsync('UPDATE users SET fullName = ?, userName = ?, age = ?, phoneNumber = ?, email = ? WHERE id = ?', [newFullName, newUserName, newAge, newPhoneNumber ,newEmail, userId]);
            await getUsers();
        } catch (error) {
            console.log('Error while updating user');
        }
    };

    //function to delete a user
    const deleteUser = async (id) => {
        try {
            await db.runAsync('DELETE FROM users WHERE id = ?', [id]);
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
                  keyExtractor={(item) => item.id.toString()}
              />
            )}
            {showForm && (<UserForm user={user} setUser={setUser} onSave={handleSave} setShowForm={setShowForm}/>)}
            <View>

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

            </View>
        </View>
    )
}