import React from 'react' 
import { SafeAreaView,View,Text,Pressable, StyleSheet } from 'react-native'
import Icons from 'react-native-vector-icons/FontAwesome5'

const VoiceRecord =(props)=>{
    const backgrounColor=props.backgrounColor
    return(
        <Pressable style={[styles.container,{backgroundColor : backgrounColor}]} onPress={()=>console.log('merhaba')}>
            <View>
                <Icons  name={props.name} size={40} color="white"/>
            </View>
        </Pressable>
    )
}
const styles =StyleSheet.create({
    container : {
        width : 100,
        height : 100,
        borderRadius : 50,
        
        alignItems : "center",
        justifyContent : "center"
    }
})
export {VoiceRecord}