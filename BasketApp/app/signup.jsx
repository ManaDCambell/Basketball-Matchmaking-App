import React, { useState, UseState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Signup = () => {
    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [username, setusername] = useState("");
    const [email, setemail] = useState("");
    const [phonenumber, setphonenumber] = useState("");

    return (
        <View style={styles.container}>
            <Input 
            placeholder="First Name"
            value={firstname}
            type="firstname"
            onChangeText={(text)=>setfirstname(text)}
            />

            <Input 
            placeholder="Last Name"
            value={lastname}
            type="lastname"
            onChangeText={(text)=>setlastname(text)}
            />

            <Input 
            placeholder="Username"
            value={username}
            type="username"
            onChangeText={(text)=>setusername(text)}
            />

            <Input 
            placeholder="Email"
            value={email}
            type="email"
            onChangeText={(text)=>setemail(text)}
            />

            <Input 
            placeholder="Phone Number"
            value={phonenumber}
            type="phonenumber"
            onChangeText={(text)=>setphonenumber(text)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundcolor: '#ffa500'
    }
})