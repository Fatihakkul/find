import { DefaultTheme } from '@react-navigation/native'
import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor  :"#fa3f34",
        alignItems : "center",
        justifyContent : "center"
    },
    cancel : {
        width : 50,
        height : 50,
        borderRadius : 10,
        backgroundColor : "white",
        alignItems : "center",
        justifyContent : "center",
        
    },
    text : {
        color : "white",
        fontSize : 16,
        letterSpacing : 0.5
    },
    sosContainer : {
        alignItems : "center",
        marginBottom : 20
    }
})
export default styles