{/* <Svg height="100%" width="100%" style={styles.svgContainer}>
      

        <Path d="M -10 305 Q 190 500 370 330 T 840 330" 
        stroke="black" 
        strokeWidth="10" 
        fill="none" />

        <Path d="M 220 50 A 50 300 0 0 0 260 750" 
        stroke="black" 
        strokeWidth="10" 
        fill="none" />

        <Path d="M -10 95 A 400 200 0 0 0 420 95" 
        stroke="black" 
        strokeWidth="10" 
        fill="none" />

        <Path d="M -10 635 A 400 200 0 0 1 420 635" 
        stroke="black" 
        strokeWidth="10" 
        fill="none" />

      </Svg> */}

      {/* <Image 
        source={require('../assets/images/appLogo.png')} 
        style={styles.logoImage}
      /> */}

    //   svgContainer: {
    //     position: 'absolute',
    //     top: 0,
    //     left: 0,
    //     width: '100%',
    //     height: '100%',
    //     zIndex: 0,
    //   },
    //   tempButtonsContainer: {
    //     position: 'absolute',
    //     left: 20,
    //     top: height * 0.15,
    //     zIndex: 2,
    //   },
    //   tempButton: {
    //     backgroundColor: '#FFF',
    //     padding: 10,
    //     marginBottom: 10,
    //     borderRadius: 5,
    //     borderWidth: 1,
    //     borderColor: '#000',
    //   },
    //   tempButtonText: {
    //     color: '#000',
    //     fontWeight: 'bold',
    //   },
    //   logoImage: {
    //     width: 600, 
    //     height: 600, 
    //     position: 'absolute',
    //     top: 100,
    //     left: '60%',
    //     transform: [{ translateX: -300 }],
    //   },
    //   buttonContainer: { 
    //     justifyContent: 'space-evenly', 
    //     alignItems: 'center',
    //     width: '100%', 
    //     position: 'absolute',
    //     top: '60%', 
    //   },
    //   buttonWrapper: {
    //     width: 80,
    //     height: 80,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: 'transparent',
    //   },
    //   SbuttonImage: {
    //     width: '75%', 
    //     height: '75%', 
    //     backgroundColor: 'transparent',
    //     marginBottom: 0,
    //     zIndex: 1,
    //     transform: [{ translateX: '550%' }, { translateY: '-10%' }],
    //   },
    //   buttonImage: {
    //     width: 60, 
    //     height: 60, 
    //     resizeMode: 'contain'
    //   },


import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { checkCredentials } from './database';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator(); 

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
                navigation.navigate("Home");
            } else {
                Alert.alert("Incorrect email and password! Please create an account!");
            }
        } catch {
            Alert.alert("Error!", "An error occured while logging in!");
            console.error(error);
        }
    };
    return (
        <><NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Login"
                    component={Content} />
            </Stack.Navigator>
        </NavigationContainer>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
                <View style={styles.container}>
                    <Svg height="100%" width="100%" style={styles.svgContainer}>


                        <Path d="M -10 305 Q 190 500 370 330 T 840 330"
                            stroke="black"
                            strokeWidth="10"
                            fill="none" />

                        <Path d="M 220 50 A 50 300 0 0 0 260 750"
                            stroke="black"
                            strokeWidth="10"
                            fill="none" />

                        <Path d="M -10 95 A 400 200 0 0 0 420 95"
                            stroke="black"
                            strokeWidth="10"
                            fill="none" />

                        <Path d="M -10 635 A 400 200 0 0 1 420 635"
                            stroke="black"
                            strokeWidth="10"
                            fill="none" />

                    </Svg>
                    <Image
                        source={require('../assets/images/appLogo.png')}
                        style={styles.logoImage} />
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
                            onChangeText={email => setForm({ ...form, email })} />
                    </View>

                    <View style={styles.input}>
                        <Text style={styles.inputLabel}>Password</Text>

                        <TextInput
                            secureTextEntry
                            style={styles.inputControl}
                            placeholder='********'
                            placeholderTextColor='#6b7280'
                            value={form.password}
                            onChangeText={password => setForm({ ...form, password })} />
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
                        style={{ marginTop: 'auto' }}
                        onPress={() => {
                        } }>
                        <Text style={styles.formFooter}>Create an account</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView></>
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
    },
    svgContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      },
      tempButtonsContainer: {
        position: 'absolute',
        left: 20,
        top: height * 0.15,
        zIndex: 2,
      },
      tempButton: {
       backgroundColor: '#FFF',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#000',
      },
      tempButtonText: {
        color: '#000',
        fontWeight: 'bold',
      },
      logoImage: {
        width: 600, 
        height: 600, 
        position: 'absolute',
        top: 100,
        left: '60%',
        transform: [{ translateX: -300 }],
      },
      buttonContainer: { 
        justifyContent: 'space-evenly', 
        alignItems: 'center',
        width: '100%', 
        position: 'absolute',
        top: '60%', 
      },
      buttonWrapper: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
      },
      SbuttonImage: {
        width: '75%', 
        height: '75%', 
        backgroundColor: 'transparent',
        marginBottom: 0,
        zIndex: 1,
        transform: [{ translateX: '550%' }, { translateY: '-10%' }],
      },
      buttonImage: {
        width: 60, 
        height: 60, 
        resizeMode: 'contain'
      },
});

const Login = ( navigation ) => {
    return (
        <Content />
    );
};

export default Login;