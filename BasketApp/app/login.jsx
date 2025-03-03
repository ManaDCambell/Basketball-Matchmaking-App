import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { checkCredentials } from './database';

const Content = () => {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });
 
    const handleLogin = async () => {
        const { email, password } = form;

        if (!email && !password) {
            Alert.alert("Please fill out both fields!")
            return;
        }

        try {
            const isValid = await checkCredentials(email, password);

            if (isValid) {
                Alert.alert("Login successful!");
            } else {
                Alert.alert("Incorrect email and password! Please create an account!");
            }
        } catch {
            Alert.alert("Error!", "An error occured while logging in!");
            console.error(error);
        }
    };
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#e8ecf4'}}>
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>
            </View>
            <View style={styles.form}>
                <View style={styles.input}>
                    <Text style={styles.inputLabel}>email</Text>

                    <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="default"
                    style={styles.inputControl}
                    placeholder='john.doe'
                    placeholderTextColor='#6b7280'
                        value={form.email}
                        onChangeText={email => setForm({ ...form, email })}
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
                    <TouchableOpacity
                        onPress={handleLogin}>
                        <View style={styles.btn}>
                            <Text style={styles.btnText}>Login</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                
                <TouchableOpacity 
                style ={{ marginTop: 'auto' }}
                    onPress={() => {
                }}> 
                    <Text style={styles.formFooter}>Create an account</Text>
                    </TouchableOpacity>
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
    },
    errortext: {
        color: "red",
        marginBottom: 10,
    }
});

const Login = () => {
    return (
        <Content />
    );
};

export default Login;