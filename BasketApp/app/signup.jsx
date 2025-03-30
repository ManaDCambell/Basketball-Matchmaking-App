import React, { useState } from 'react';
import { TouchableOpacity , StyleSheet, Alert, View, TextInput, Text, Image } from 'react-native';
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
            Alert.alert("An error occurred while signing up! Please try again later!");
        }
    }

    const renderInput = (iconName, placeholder, value, setValue, keyboardType = "default", secure = false) => (
        <View style={styles.inputContainer}>
            <Ionicons name={iconName} size={20} color="#999" style={styles.icon} />
            <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={setValue}
                style={styles.input}
                keyboardType={keyboardType}
                secureTextEntry={secure}
                autoCapitalize="none"
            />
        </View>
    );

    return (
        <View style={styles.container}>

            <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.backIcon}>
                <Ionicons name="arrow-back" size={30} color="white" />
            </TouchableOpacity>

            <Text style={styles.title}>Create an Account</Text>

            <Image
                source={require('../assets/images/appLogo.png')}
                style={styles.logo}
            />

            {renderInput("person-outline", "Full Name", fullname, setfullname)}
            {renderInput("calendar-outline", "Age", age, setage, "numeric")}
            {renderInput("location-outline", "Location", location, setlocation)}
            {renderInput("mail-outline", "Email", email, setemail, "email-address")}
            {renderInput("call-outline", "Phone Number", phonenumber, setphonenumber, "phone-pad")}
            {renderInput("person-circle-outline", "Username", username, setusername)}
            {renderInput("lock-closed-outline", "Password", password, setpassword, "default", true)}
            {renderInput("lock-closed-outline", "Confirm Password", confirmpassword, setconfirmpassword, "default", true)}

            <TouchableOpacity style={styles.btn} onPress={handleSignup}>
                <Text style={styles.btnText}>Sign Up</Text>
            </TouchableOpacity>    
        </View>
    );
};

export default Signup;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(218, 113, 5)',
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingBottom: 20,
        paddingTop: 15,
        position: 'relative',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginBottom: 20,
        marginTop: 10,
        marginLeft: 10,
    },
    backIcon: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 1,
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
        width: '85%',
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 16,
        color: '#000',
    },
    btn: {
        backgroundColor: 'rgb(7, 94, 236)',
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: '60%',
        marginTop: 10,
    },
    btnText: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
    },
});
