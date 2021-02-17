import {StyleSheet, Dimensions } from 'react-native'
import COLORS from '../Colors'
const width = Dimensions.get("window").width
const LoginStyles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : "center",
        paddingTop:40,
        backgroundColor : COLORS.lightGreen
        
    },
    facebook : {
        width  : width* 0.8,
        paddingVertical : 10,
        backgroundColor  : COLORS.primary,
        borderRadius : 10,
        marginBottom : 40,
        alignItems : "center",
        justifyContent : "center"
    },
    googleLogin : {
        width  : width* 0.7,
        paddingVertical : 10,
        alignItems : "center",
        paddingLeft : 50,
        flexDirection : "row",
        borderRadius : 15,
        marginBottom : 20,
        backgroundColor:COLORS.white
    },
    title : {
        fontSize : 16,
        color : COLORS.white,
        letterSpacing : 0.7,
        fontWeight:"bold",
       
    }
}) 
export default LoginStyles