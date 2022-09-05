import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Pressable } from 'react-native'
import React, { useState, useContext } from 'react'
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTogglePasswordVisibility } from './useTogglePasswordVisibility';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthContext } from '../context/auth';

const SignIn = ({ navigation }) => {
    const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [state, setState]= useContext(AuthContext);

    const handleSubmit = async () => {
        if (email === '' || password === '') {
            alert('Please fill all the fields');
            return;
        }
        const resp = await axios.post('http://localhost:8000/api/signin', { email, password });
        if (resp.data.error)
            alert(resp.data.error);
        else {
            setState(resp.data)
            await AsyncStorage.setItem('auth-rn', JSON.stringify(resp.data));
            alert("Sign In Successfully");
            navigation.navigate('Home');
        }
    }

    return (
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
            <View style={{ marginVertical: 100 }}>
                <View style={styles.imgContainer}>
                    <Image source={require('../assets/logo.png')} style={styles.image} />
                </View>
                <Text style={styles.signupText}>Sign In</Text>
                <View style={{ marginHorizontal: 24 }}>
                    <Text style={{ fontSize: 16, color: '#8e93a1' }}>Email</Text>
                    <TextInput style={styles.signupInput} value={email} onChangeText={text => setEmail(text)}
                    autoCapitalize='none' />
                </View>
                <View style={{ marginHorizontal: 24 }}>
                    <Text style={{ fontSize: 16, color: '#8e93a1' }}>Password</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TextInput style={styles.signupInput2} value={password} onChangeText={text => setPassword(text)}
                            secureTextEntry={passwordVisibility} />
                        <TouchableOpacity onPress={handlePasswordVisibility}>
                            <MaterialCommunityIcons name={rightIcon} size={22} color="#666666" />
                        </TouchableOpacity>

                    </View>
                </View>
                <TouchableOpacity onPress={handleSubmit} style={styles.btnstyle}>
                    <Text style={styles.btntext}>Submit</Text>
                </TouchableOpacity>
                {/* <Text style={{marginHorizontal:24}}>{JSON.stringify({name,email,password})}</Text> */}
                <Text style={{ fontSize: 12, textAlign: 'center' }}>
                    Not yet registered? {" "}
                    <Text style={{ color: '#da1c4b', fontWeight: 'bold' }} onPress={() => navigation.navigate("SignUp")}>
                        Sign Up
                    </Text>
                </Text>
                <Text onPress={() => navigation.navigate("ForgotPassword")}  style={styles.forgotText}>Forgot Password?</Text>
            </View>
        </KeyboardAwareScrollView>

    )
}

export default SignIn

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    forgotText:{
        fontSize: 12, textAlign: 'center', marginTop: 10, color: '#da1c4b', fontWeight: 'bold',textDecorationLine:'underline'
    },
    signupText: {
        fontSize: 30,
        textAlign: 'center'
    },
    signupInput: {
        borderBottomWidth: 0.5,
        height: 48,
        borderBottomColor: '#8e93a1',
        marginBottom: 30
    },
    signupInput2: {
        borderBottomWidth: 0.5,
        height: 48,
        borderBottomColor: '#8e93a1',
        marginBottom: 30,
        width: '90%'
    },
    btnstyle: {
        backgroundColor: '#da1c4b',
        height: 50,
        marginBottom: 20,
        justifyContent: 'center',
        marginHorizontal: 15,
        borderRadius: 15
    },
    btntext: {
        fontSize: 20,
        textAlign: 'center',
        textTransform: 'uppercase',
        color: 'white',
        fontWeight: 'bold'
    },
    imgContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 100, height: 100, resizeMode: 'contain'
    }
})