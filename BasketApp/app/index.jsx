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
            CREATE TABLE IF NOT EXISTS user (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                firstName TEXT,
                lastName TEXT,
                age INTEGER,
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
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age,
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
        updateUser(user.id, editedUser.firstName, editedUser.lastName, editedUser.age, editedUser.email);
        setIsEditing(false);
    }

    return (
        <View>
            <Pressable
                onPress={() => {setSelectedUser(selectedUser === user.id ? null : user.id)}}
            >
                <Text> {user.id} - {user.lastName}</Text>
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
                <Text>First name : {user.firstName}</Text>
                <Text>Last name : {user.lastName}</Text>
                <Text>Age : {user.age}</Text>
                <Text>email : {user.email}</Text>

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
                placeholder='First name'
                value={user.firstName}
                onChangeText={(text) => setUser({...user, firstName: text})}
            />
            <TextInput 
                placeholder='Last name'
                value={user.lastName}
                onChangeText={(text) => setUser({...user, lastName: text})}
            />
            <TextInput 
                placeholder='Age'
                value={user.age}
                onChangeText={(text) => setUser({...user, age: text})}
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
    const [user, setUser] = useState({id: 0, firstName:'', lastName:'', age:0, email:''});

    const handleSave = () => {

        if(user.firstName.length === 0 || user.lastName.length === 0 || user.age === 0 || user.email.length ===0 ) {
            Alert.alert('Attention', 'Please enter all the data !')
        } else {
            addUser(user);
            setUser({id: 0, firstName:'', lastName:'', age:0, email:''});
            setShowForm(false);
        }
    }
    
    //function to get all the users
    const getUsers = async () => {
        try {
            const allRows = await db.getAllAsync('SELECT * FROM user');
            setUsers(allRows);
        } catch (error) {
            console.log('Error while loading user : ', error);
        }
    };

    //function to add a user
    const addUser = async (newUser) => {
        try {
            const statement = await db.prepareAsync('INSERT INTO user (firstName, lastName, age, email) VALUES (?,?,?,?)');
            await statement.executeAsync([newUser.firstName, newUser.lastName, newUser.age, newUser.email]);
            await getUsers();
        } catch (error) {
            console.log('Error while adding user : ', error);
        }
    };

    //function to delete all users
    const deleteAllUsers = async () => {
        try {
            await db.runAsync('DELETE FROM user');
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
    const updateUser = async (userId, newFirstName, newLastName, newAge, newEmail) => {
        try {
            await db.runAsync('UPDATE user SET firstName = ?, lastName = ?, age = ?, email = ? WHERE id = ?', [newFirstName, newLastName, newAge, newEmail, userId]);
            await getUsers();
        } catch (error) {
            console.log('Error while updating user');
        }
    };

    //function to delete a user
    const deleteUser = async (id) => {
        try {
            await db.runAsync('DELETE FROM user WHERE id = ?', [id]);
            await getUsers();
        } catch (error) {
            console.log('Error while deleting the user : ', error);
        }
    }

    //get all the users at  the first render of the app
    useEffect(() => {
        //addUser({firstName:'Lucas', lastName:'Smith', age: 22, email: 'lucas.smith@ex.com'})
        //deleteAllUsers();
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