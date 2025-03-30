import React, { useState } from 'react';
import { TouchableOpacity , StyleSheet, Alert, View, TextInput, Text, } from 'react-native';
import { createAccount } from './database';
import { Ionicons } from '@expo/vector-icons';

const Signup = ({ navigation }) => {
    const [fullname, setfullname] = useState("");
    const [age, setage] = useState("");
    const [email, setemail] = useState("");
    const [phonenumber, setphonenumber] = useState("");
    const [location, setlocation] = useState("");
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [confirmpassword, setconfirmpassword] = useState("");

    const handleSignup = async () => {
        if (!fullname || !age || !email || !phonenumber || !location || !username || !password || !confirmpassword) {
            Alert.alert("All fields required!");
            return;
        }
        if (password != confirmpassword) {
            Alert.alert("Passwords do not match!");
            return;
        }


        try {
            const isAccountValid = await createAccount(fullname, username, password, age, phonenumber, location, email);
            if (isAccountValid) {
                Alert.alert("Account created successfully!");
                navigation.navigate("Login");
            } else {
                Alert.alert("Signup failed!");
            }
        } catch (error) {
            console.log(error);
            Alert.alert("An error occurred while signing up! Please try again later!")
        }
    }

    return (
        <View style={styles.container}>
            <TextInput 
            placeholder="First Name"
            value={fullname}
            onChangeText={(text)=>setfullname(text)}
            style={styles.input}
            />

            <TextInput
            placeholder="Age"
            value={age}
            onChangeText={(text)=>setage(text)}
            style={styles.input}
            keyboardType="numeric"
            />

            <TextInput 
            placeholder="Location"
            value={location}
            onChangeText={(text)=>setlocation(text)}
            style={styles.input}
            />

            <TextInput 
            placeholder="Email"
            value={email}
            onChangeText={(text)=>setemail(text)}
            style={styles.input}
            autoCapitalize="none"
            />

            <TextInput 
            placeholder="Phone Number"
            value={phonenumber}
            onChangeText={(text)=>setphonenumber(text)}
            style={styles.input}
            keyboardType="phone-pad"
            />

            <TextInput 
            placeholder="Username"
            value={username}
            onChangeText={(text)=>setusername(text)}
            style={styles.input}
            autoCapitalize="none"
            />

            <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text)=>setpassword(text)}
            style={styles.input}
            secureTextEntry
            />

            <TextInput
            placeholder="Confirm Password"
            value={confirmpassword}
            onChangeText={(text)=>setconfirmpassword(text)}
            style={styles.input}
            secureTextEntry
            />

            <TouchableOpacity style={styles.btn} onPress={handleSignup}>
                <Text style={styles.btnText}>Sign Up</Text>
            </TouchableOpacity>    
        </View>
        
    )
}

export default Signup;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(218, 113, 5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
    },
    input: {
        width: '90%',
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: '#fff',
        fontSize: 16,
        marginBottom: 15,
    },
    btn: {
        backgroundColor: 'rgb(7, 94, 236)',
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: '90%',
    },
    btnText: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
    },
});

