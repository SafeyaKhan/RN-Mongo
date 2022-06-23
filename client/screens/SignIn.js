import { StyleSheet, Text, View,TextInput, TouchableOpacity, Image} from 'react-native'
import React,{useState} from 'react'
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const SignIn = ({ navigation}) => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const handleSubmit = async () => {
        if(name === '' || email === '' || password === '' ){
            alert('Please fill all the fields');
            return;
        }
        await axios.post('http://localhost:8001/api/signin',{name,email,password});
        alert('Successfully Signed In');
    }

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
           <View style={{marginVertical:100}}>
            <View style={styles.imgContainer}>
                <Image source={require('../assets/logo.png')} style={styles.image} />
            </View>
      <Text style={styles.signupText}>SignIn</Text>
      <View style={{marginHorizontal:24}}>
            <Text style={{fontSize:16, color:'#8e93a1'}}>Name</Text>
            <TextInput style={styles.signupInput} value={name} onChangeText={text => setName(text)}
            autoCapitalize="words"/>
      </View>
      <View style={{marginHorizontal:24}}>
            <Text style={{fontSize:16, color:'#8e93a1'}}>Email</Text>
            <TextInput style={styles.signupInput} value={email} onChangeText={text => setEmail(text)}/>
      </View>
      <View style={{marginHorizontal:24}}>
            <Text style={{fontSize:16, color:'#8e93a1'}}>Password</Text>
            <TextInput style={styles.signupInput} value={password} onChangeText={text => setPassword(text)}
            secureTextEntry={true}/>
      </View>
      <TouchableOpacity onPress={handleSubmit} style={styles.btnstyle}>
        <Text style={styles.btntext}>Submit</Text>
      </TouchableOpacity>
      {/* <Text style={{marginHorizontal:24}}>{JSON.stringify({name,email,password})}</Text> */}
      <Text style={{fontSize:12, textAlign:'center'}}>
        Not yet registered? {" "}
        <Text style={{ color:'darkred',fontWeight:'bold'}} onPress={() => navigation.navigate("SignUp")}>
        Sign Up
        </Text>
        </Text>
      <Text style={{fontSize:12, textAlign:'center'}}>Forgot Password?</Text>
    </View>
    </KeyboardAwareScrollView>
 
  )
}

export default SignIn

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center'
    },
    signupText:{
        fontSize:30,
        textAlign:'center'
    },
    signupInput:{
        borderBottomWidth: 0.5,
        height:48,
        borderBottomColor: '#8e93a1',
        marginBottom:30
    },
    btnstyle:{
        backgroundColor:'#da1c4b',
        height:50,
        marginBottom: 20,
        justifyContent:'center',
        marginHorizontal:15,
        borderRadius:15
    },
    btntext:{
        fontSize:20,
        textAlign:'center',
        textTransform:'uppercase',
        color:'white',
        fontWeight: 'bold'
    },
    imgContainer:{
        justifyContent:'center',
        alignItems:'center'
    },
    image:{
        width:100,height:100, resizeMode: 'contain'
    }
})