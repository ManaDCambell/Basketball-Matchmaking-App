import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Dimensions, Image } from 'react-native';
import { checkCredentials } from './database';
import Svg, { Path } from 'react-native-svg';

const { height, width } = Dimensions.get('window');

const Content = ({ navigation }) => {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const handleLogin = async () => {
        const { email, password } = form;

        if (!email && !password) {
            Alert.alert("Please fill out both fields!");
            return;
        }

        try {
            const isValid = await checkCredentials(email, password);
            if (isValid) {
                // Alert.alert("Login successful!");
                navigation.navigate("Home");
            } else {
                Alert.alert("Incorrect email and password! Please create an account!");
            }
        } catch (error) {
            Alert.alert("Error!", "An error occurred while logging in!");
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Svg height={height * 0.5} width={width} style={styles.svgContainer}>
                    <Path
                        d={`M0,${height * 0.2} Q${width * 0.5},${height * 0.35} ${width},${height * 0.2}`}
                        stroke="black"
                        strokeWidth="4"
                        fill="none"
                    />
                    <Path
                        d={`M${width * 0.1},0 Q${width * 0.7},${height * 0.3} ${width * 0},${height}`}
                        stroke="black"
                        strokeWidth="4"
                        fill="none"
                    />
                    <Path
                        d={`M${width * 0.9},0 Q${width * 0.3},${height * 0.3} ${width},${height}`}
                        stroke="black"
                        strokeWidth="4"
                        fill="none"
                    />
                </Svg>

                <Image
                    source={require('../assets/images/appLogo.png')}
                    style={styles.logoImage}
                />
                <Text style={styles.title}>Login</Text>
            </View>

            <View style={styles.form}>
                <View style={styles.input}>
                    <Text style={styles.inputLabel}>Email</Text>
                    <TextInput
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="email-address"
                        style={styles.inputControl}
                        placeholder="john.doe@example.com"
                        placeholderTextColor="rgb(107, 114, 128)"
                        value={form.email}
                        onChangeText={(email) => setForm({ ...form, email })}
                    />
                </View>

                <View style={styles.input}>
                    <Text style={styles.inputLabel}>Password</Text>
                    <TextInput
                        secureTextEntry
                        style={styles.inputControl}
                        placeholder="********"
                        placeholderTextColor="rgb(107, 114, 128)"
                        value={form.password}
                        onChangeText={(password) => setForm({ ...form, password })}
                    />
                </View>

                <View style={styles.formAction}>
                    <TouchableOpacity onPress={handleLogin}>
                        <View style={styles.btn}>
                            <Text style={styles.btnText}>Login</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={{ marginTop: 'auto' }}
                onPress={() => navigation.navigate("Signup")}>
                    <Text style={styles.formFooter}>Create an account</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'rgb(218, 113, 5)',
    },
    container: {
        padding: 24,
        flex: 1,
        backgroundColor: 'rgb(218, 113, 5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    svgContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    logoImage: {
        width: width * 0.6,
        height: width * 0.6,
        resizeMode: 'contain',
        position: 'absolute',
        top: height * 0.1,
    },
    title: {
        fontSize: 30,
        fontWeight: '700',
        color: 'white',
        position: 'absolute',
        top: height * 0.44,
        textAlign: 'center',
    },
    input: {
        marginBottom: 16,
        alignItems: 'center',
        width: '100%',
    },
    inputLabel: {
        fontSize: 17,
        fontWeight: '600',
        color: 'rgb(34, 34, 34)',
        marginBottom: 8,
        textAlign: 'left',
        width: '90%',
    },
    inputControl: {
        backgroundColor: 'white',
        paddingHorizontal: 16,
        borderRadius: 12,
        fontSize: 15,
        fontWeight: '500',
        color: 'rgb(34, 34, 34)',
        width: '90%',
    },
    form: {
        marginBottom: 90,
        flex: 1,
        alignItems: 'center',
    },
    formAction: {
        marginVertical: 24,
    },
    formFooter: {
        fontSize: 17,
        fontWeight: '600',
        color: 'rgb(34, 34, 34)',
        textAlign: 'center',
        marginTop: 10,
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

export default Content;