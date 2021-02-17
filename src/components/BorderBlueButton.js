import React from 'react'
import { Pressable , View ,Text, StyleSheet } from 'react-native'
import COLORS from '../style/Colors'


const BorderBlueButton =props=>{
    return(
        <Pressable style={[styles.container,{backgroundColor : props.backgroundColor != undefined ? props.backgroundColor : "transparent"}]} onPress={props.onPress}>
            <Text style={[styles.title,{color : props.color != undefined ? props.color : COLORS.primary}]}>{props.title}</Text>
        </Pressable>
    )
}
const styles =StyleSheet.create({
    container : {
        borderRadius : 10,
        borderWidth : 1,
        borderColor : COLORS.primary,
        paddingHorizontal : 10,
        paddingVertical : 5
    },
    title : {
        fontSize : 17,
        fontWeight : "700",
        opacity : 0.4
       
    }
})

export { BorderBlueButton }