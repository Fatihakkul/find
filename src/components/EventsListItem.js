import React from 'react'
import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native'
import Icons from 'react-native-vector-icons/FontAwesome5'
import Colors from '../style/Colors'

const width = Dimensions.get('window').width

const EventListItem = (props) => {
    return (
        <Pressable onPress={props.onPress}>
            <View style={styles.container}>
                <View style={styles.stepCont}>
                    <View style={styles.line}></View>
                    <View style={styles.circle}>
                        {console.log(props.statu)}
                        <Icons name={`${props.event.statu}`} color={Colors.primary} size={20}/>
                    </View>
                    {
                     props.bool ?   <View style={styles.line}></View> :  <View style={[styles.line,{borderColor : "transparent"}]}></View>
                    }
                </View>
                <View style={styles.textCont}>
                    <Text style={styles.title} >{props.event.event}</Text>

                </View>
            </View>
        </Pressable>

    )
}
const styles = StyleSheet.create({
    container: {
        width: width,
        flexDirection: "row",
        alignItems : "center",
    },
    circle : {
        width : 40,
        height : 40,
        backgroundColor : "#e0e0e0",
        borderRadius : 20,
        alignItems : "center",
        justifyContent : "center"
    },
    line : {
        height : 20,
        width:2,
        borderWidth:1,
        borderColor:"#e0e0e0"
    },
    stepCont : {
        alignItems : "center"
    },
    textCont : {
        width : Dimensions.get("window").width,
      
        borderBottomWidth : 1,
        borderColor :"gray",
        flexDirection : "row",
        alignItems : "center",
        alignSelf: "center",
        height : 40,
        marginLeft : 15
        
    },
    title : {
        fontSize : 16,
        opacity : 0.5,
        fontWeight : "600",
        letterSpacing: 0.5
    }
})
export { EventListItem }