import React, { useState } from 'react';
import { SafeAreaView, Pressable, View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { checkCredentials, getUser, initializeDatabase } from './database';

const Content = () => {
    const db = useSQLiteContext();
    const [form, setForm] = useState({
        username: '',
        password: '',
    });
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#e8ecf4'}}>
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>
            </View>
            <View style={styles.form}>
                <View style={styles.input}>
                    <Text style={styles.inputLabel}>Username</Text>

                    <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="username"
                    style={styles.inputControl}
                    placeholder='john.doe'
                    placeholderTextColor='#6b7280'
                        value={form.username}
                        onChangeText={username => setForm({ ...form, username })}
                    />    
                </View>

                <View style={styles.input}>
                    <Text style={styles.inputLabel}>Password</Text>

                    <TextInput
                    secureTextEntry
                    style={styles.inputControl}
                    placeholder='********'
                    placeholderTextColor='#6b7280'
                        value={form.password}
                        onChangeText={password => setForm({ ...form, password })}
                    />    
                </View>

                <View style={styles.formAction}>
                    <Pressable
                    onPress={() => {
                        const isValid = () => {
                        if (isValid) {
                            Alert.alert('Successfully logged in!');
                        } else {
                            Alert.alert("Incorrect username or password! Please try again!");
                        }
                }}}>
                        <View style={styles.btn}>
                            <Text style={styles.btnText}>Login</Text>
                        </View>
                    </Pressable>
                </View>
                
                <Pressable 
                style ={{ marginTop: 'auto' }}
                    onPress={() => {
                }}> 
                    <Text style={styles.formFooter}>Create an account</Text>
                    </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        flex: 1,
    },
    title: {
        fontSize: 27,
        fontWeight: '700',
        color: '#lelele',
        marginBottom: 6,
        textAlign: 'center',
    },
    input: {
        marginBottom: 16,
    },
    inputLabel: {
        fontSize: 17,
        fontWeight: '600',
        color: '#222',
        marginBottom: 8,
    },
    inputControl: {
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        borderRadius: 12,
        fontSize: 15,
        fontWeight: '500',
        color: '#222',
    },
    form: {
        marginBottom: 24,
        flex: 1,
    },
    formAction: {
        marginVertical: 24,
    },
    formFooter: {
        fontSize: 17,
        fontWeight: '600',
        color: '#222',
        textAlign: 'center',
        letterSpacing: 0.15,
    },
    btn: {
        backgroundColor: '#075eec',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#075eec',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    btnText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff'
    }
});

const Login = () => {
    return (
        <SQLiteProvider databaseName='example.db' onInit={initializeDatabase}>
            onPress={async () => {
            checkCredentials(db,userName,password);
            }} 
            <Content />
        </SQLiteProvider>
    );
};

export default Login;