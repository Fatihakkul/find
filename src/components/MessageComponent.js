import React, { useEffect } from 'react' 
import {View ,Pressable,Text,StyleSheet} from 'react-native'
import COLORS from '../style/Colors'


const MessageComponent =(props)=>{
    
    return(
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={{color : "white"}}>{props.data.message}</Text>
                <Text style={styles.date}>{props.data.time} </Text>
            </View>
           
        </View>
    )
}
const styles = StyleSheet.create({
    container : {
        alignItems : "flex-end",
        marginVertical : 10,
        marginRight : 10
    },
    textContainer : {
        backgroundColor : COLORS.primary,
        paddingVertical : 10,
        paddingHorizontal : 15,
        borderBottomEndRadius : 10,
        borderBottomStartRadius : 10,
        borderTopStartRadius : 10
    } ,
    date : {
        fontSize : 10,
        color :"white",
        opacity : 0.5,
        alignSelf : "flex-start"
    }  
})
export {MessageComponent}