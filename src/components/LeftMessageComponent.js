import React from 'react' 
import { View,Text ,StyleSheet}from 'react-native'


const LeftMessageComponent =(props)=>{
    return(
    <View style={styles.container}>
        <View style={styles.textContainer}>
            <Text style={{color : "white"}}>{props.data.message}</Text>
            <Text style={styles.date}>{props.data.time}</Text>
        </View>
    </View>
    )
}
const styles = StyleSheet.create({
    container : {
       alignItems : "flex-start",
       marginVertical : 10
    },
    textContainer : {
        backgroundColor : "#b0b0b0",
        paddingVertical : 10,
        marginLeft : 5,
        borderBottomEndRadius : 10,
        borderBottomStartRadius : 10,
        borderTopEndRadius : 10,
        paddingHorizontal : 15
        
    },
    date : {
        fontSize : 10,
        alignSelf : "flex-end",
        color  : "white",
        opacity : 0.5
    }
})
export {LeftMessageComponent}