import { StyleSheet,Dimensions } from 'react-native'
import COLORS from '../Colors'

const styles = StyleSheet.create({
    container : {
        flex : 1,
        paddingTop : 20
    },
    sosContainer : {
       elevation : 6,
        width : 50,
        height : 50,
        borderRadius : 25,
        backgroundColor : COLORS.red,
        alignItems : "center",
        justifyContent : "center",
    },
    sosTitle : {
        fontSize : 18,
        color : "white",
        fontWeight : "bold"
    },
    message : {
        padding : 10,
        backgroundColor : COLORS.transparentWhite,
        marginBottom : 10,
        marginLeft : 5,
        borderRadius: 10,
        borderColor : COLORS.mor,
        borderWidth : 1,
        opacity : 0.8,
        
        
    }   
})

export default styles