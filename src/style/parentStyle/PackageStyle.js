import {StyleSheet,Dimensions } from "react-native"
import COLORS from "../Colors"

const {width,height } = Dimensions.get('window')


const styles = StyleSheet.create({
    container : {
        paddingTop:20,
       alignItems  :"center",
       paddingBottom : 40
    },
    header : {
        width  :width,
        height : 60,
        backgroundColor : COLORS.white,
        flexDirection : "row",
        alignItems  :"center",
        paddingLeft : 15,
        elevation : 10

    },
    title : {
        color : COLORS.settinText,
        fontSize : 17,
        fontWeight : "bold",
        letterSpacing : 1,
        marginLeft : 20
    },
    content : {
        width : width*0.9,
        alignItems : "center",
        borderWidth: 1,
        borderColor : COLORS.settinText,
        borderRadius : 15,
        paddingVertical : 20,
        
    },
    line : {
        width : width*0.8,
        borderColor : COLORS.settinText,
        borderWidth : 1,
        marginVertical : 15
    },
    contentTitle : {
        fontSize : 16,
        fontWeight : "bold",
        color : COLORS.settinText,
        marginVertical : 15
    },
    text : {
        fontSize : 14,
        letterSpacing : 0.2,
        marginTop:2,
        color : COLORS.black
    },
    packageContent  :{
        width:width*0.9,
        borderRadius : 20,
        overflow : "hidden",
        height : 230,
        flexDirection : "row",
        marginTop:20,
        paddingBottom :10
       
    },
    image  :{
        width:width*0.9,
        resizeMode : "contain",
        
    },
    button : {
        width : width*0.35,
        paddingVertical:10,
        backgroundColor : COLORS.lightGreen,
        alignItems : "center",
        justifyContent : "center",
        borderRadius : 20
    },
    packageInfo : {
        marginLeft :15,
     
       justifyContent :"space-around",
       paddingVertical:10
    },
    price : {
        fontSize : 25,
        fontWeight:"bold",
        color:COLORS.white,
        letterSpacing:1,
        marginLeft:8
    }
})
export default styles 