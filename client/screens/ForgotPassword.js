import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { useState } from 'react'
import axios from "axios";

const ForgotPassword = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [resetCode, setResetCode] = useState("");
    const [visible, setVisible] = useState(false);

    const handleSubmit = async () => {
        if (!email) {
            alert("Email is required");
            return;
        }
        try {
            const { data } = await axios.post("http://localhost:8000/api/forgot-password", { email }); 
            if (data.error) alert(data.error) 
            else {
                setVisible(true);
                alert("Enter the password reset code");
            }
        } catch (err) { alert("Error sending email. Try again."); console.log(err); }
    };

    const handlePasswordReset = async () => {
        try {
            const { data } = await axios.post("http://localhost:8000/api/reset-password", { email, resetCode, password });
            if (data.error) alert(data.error);
            else {
                alert("Now you can login with your new password");
                navigation.navigate("Signin");
            }
        } catch (err) { console.log(err); alert("Password reset failed. Try again."); }
    };

    return (
        <KeyboardAwareScrollView contentCotainerStyle={styles.container}>
            <View style={{ marginVertical: 100 }}>
                <View style={styles.imgContainer}>
                    <Image source={require("../assets/logo.png")} style={styles.image} />
                </View>
                <Text style={styles.signupText}>Forgot Password</Text>
                <View style={{ marginHorizontal: 24,marginTop:20 }}>
                    <Text style={{ fontSize: 16, color: '#8e93a1' }}>Email</Text>
                    <TextInput style={styles.signupInput} value={email} onChangeText={text => setEmail(text)} autoCompleteType="email" keyboardType="email-address" autoCapitalize='none' />
                </View>
                {visible && (
                    <>
                        <View style={{ marginHorizontal: 24 }}>
                            <Text style={{ fontSize: 16, color: '#8e93a1' }}>New Password</Text>
                            <TextInput style={styles.signupInput} value={password} onChangeText={text => setPassword(text)} secureTextEntry={true} autoComplteType="password" />
                        </View>
                        <View style={{ marginHorizontal: 24 }}>
                            <Text style={{ fontSize: 16, color: '#8e93a1' }}>Password Reset Code</Text>
                            <TextInput style={styles.signupInput} value={resetCode} onChangeText={text => setResetCode(text)} secureTextEntry={true} />
                        </View>
                    </>
                )}
                <TouchableOpacity onPress={visible ? handlePasswordReset : handleSubmit} style={styles.btnstyle}>
                    <Text style={styles.btntext}>{visible ? "Reset Password" : "Request Reset Code"}</Text>
                </TouchableOpacity>
                <Text onPress={() => navigation.navigate("SignIn")} style={styles.forgotText}>
                    Sign In
                </Text>
            </View>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center' },
    forgotText:{
        fontSize: 12, textAlign: 'center', marginTop: 10, color: '#da1c4b', fontWeight: 'bold',textDecorationLine:'underline'
    },
    signupText: { fontSize: 30, textAlign: 'center' },
    signupInput: {
        borderBottomWidth: 0.5,
        height: 48,
        borderBottomColor: "#8e93a1",
        marginBottom: 30,
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
    buttonStyle: {
        backgroundColor: "darkmagenta",
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        marginHorizontal: 15,
        borderRadius: 15,
    },
    buttonText: {
        fontSize: 20,
        textAlign: 'center',
        color: '#fff',
        textTransform: 'uppercase',
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

export default ForgotPassword