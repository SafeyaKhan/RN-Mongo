import { StyleSheet, Text, View,TouchableOpacity} from 'react-native'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons'

const FooterItem = ({name, text, handlePress, screenName, routeName }) => {
    const activeScreenColor = screenName === routeName && "#da1c4b";

  return (
   <TouchableOpacity onPress={handlePress}>
    <>
        <FontAwesome5 name={name} size={25} style={styles.fontStyle} color={activeScreenColor}/>
        <Text style={styles.textStyle}>{text}</Text>
    </>
   </TouchableOpacity>
  )
}

export default FooterItem

const styles = StyleSheet.create({
    fontStyle:{
        marginBottom:3,alignSelf:'center'
    },
    textStyle:{
        fontSize:12, textAlign:'center', textTransform: 'uppercase'
    }
})