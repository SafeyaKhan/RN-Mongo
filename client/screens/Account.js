import { StyleSheet, Text, SafeAreaView,Image,
    TouchableOpacity,TextInput, View} from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AuthContext } from '../context/auth';
import { useTogglePasswordVisibility } from './useTogglePasswordVisibility';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker"
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Account = ({navigation}) => {
    const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();
    const [email,setEmail] = useState('');
    const [name,setName] = useState('');
    const [password,setPassword] = useState('');
    const [role,setRole] = useState('');
    const [image,setImage] = useState({ url: "", public_id: ""});
    const [state,setState] = useContext(AuthContext);
    const [uploadImage, setUploadImage] = useState("");

useEffect(() => {
    if(state) {
        const { name, email, role, image } = state.user;
        setName(name);
        setEmail(email);
        setRole(role);
        setImage(image);
    }
},[state]);

const handleSubmit = async () => {
    try {
        const storedData = JSON.parse(await AsyncStorage.getItem("auth-rn"));
        const user = JSON.parse(storedData);
        console.log('stored --->')
        console.log(storedData);
        console.log(user);
        const resp = await axios.post('http://localhost:8000/api/update-password', { password, user });
        const data = resp.data;
        if(data.error) alert(data.error);
        else{
            alert("Password updated successfully");
            setPassword("");
        }
        
    } catch (error) {
        alert("Password Update Failed");
        console.log(error)
    }
   

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
    // let picker
}
const handleUpload = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if(permissionResult.granted === false){
        alert("Camera Access is required");
        return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect : [4,3],
        base64: true
    })
    if(pickerResult.cancelled === true){
        return;
    }
    let base64Image = `data:image/jpg;base64,${pickerResult.base64}`;
    setUploadImage(base64Image);

    let storedData = await AsyncStorage.getItem("auth-rn");
    const parsed = JSON.parse(storedData);

    const {data} = await axios.post("http://localhost:8000/api/upload-image",{
        image : base64Image,
        user: parsed.user
    });
    console.log("UPLOADED RESPONSE => ",data);
    const stored = JSON.parse(await AsyncStorage.getItem("auth-rn"));
    stored.user = data;
    await AsyncStorage.setItem("auth-rn", JSON.stringify(stored))
    setState({...state, user: data});
    setImage(data.image);
    alert("Profile image saved");

};
    
  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
    <View style={{ marginVertical: 100 }}>
        <View style={styles.imgContainer}>
            {image && image.url ? <Image source={{ uri: image.url}} style={styles.image} /> :
              uploadImage ? <Image source={{ uri: image.uploadImage }} style={styles.image} /> 
            : (
                <TouchableOpacity onPress={()=> handleUpload()}>
                    <FontAwesome5 name="camera" size={25} color="#da1c4b" />
                </TouchableOpacity>
            )}

        </View>
        {image && image.url ?  (
                <TouchableOpacity onPress={()=> handleUpload()}>
                    <FontAwesome5 name="camera" size={25} color="#da1c4b" style={styles.iconStyle}/>
                </TouchableOpacity>
            ): (
                <></>
            )}
        <Text style={styles.signupText}>{name}</Text>
        <Text style={styles.emailText}>{email}</Text>
        <Text style={styles.roleText}>{role}</Text>
      
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
            <Text style={styles.btntext}>Update Password</Text>
        </TouchableOpacity>
       </View>
</KeyboardAwareScrollView>
  )
}

export default Account

const styles = StyleSheet.create({
    iconStyle:{
        marginTop: -5, marginBottom: 10,alignSelf: "center"
    },
    container:{
        flex:1,
        justifyContent:'space-between'},
    signupText:{
        fontSize:30, 
        textAlign: 'center',
        paddingBottom: 10
    },
    emailText:{
        fontSize:18, 
        textAlign: 'center',
        paddingBottom: 10
    },
    roleText:{
        fontSize:16, 
        textAlign: 'center',
        paddingBottom: 10
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