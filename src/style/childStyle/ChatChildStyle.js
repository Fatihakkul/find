import { StyleSheet,Dimensions} from 'react-native'
import COLORS from "../Colors"

const styles =StyleSheet.create({
    container : {
        flex : 1,
        alignItems : "center",
        justifyContent : "flex-end",
        marginBottom : 30,
        //paddingLeft : 25,
        
        
    },
    header : {
        width : Dimensions.get("window").width,
        height : 60,
        backgroundColor : COLORS.primary,
        alignItems : "center",
        paddingLeft : 17,
        flexDirection : "row"
    },
    title : {
        fontSize : 23,
        fontWeight : "900",
        color : "white",
        marginLeft : 30
    },
    inputContainer : {
        width :Dimensions.get('window').width * 0.8,
        backgroundColor : "white",
        borderColor : COLORS.primary,
        borderWidth : 1,
        borderRadius : 40,
        paddingLeft : 20,
        height : 45,
        marginRight  : 20
    },
    chatContainer : {
        width : Dimensions.get('window').width,
        flexDirection : "row",
        alignItems : "center",
        

    }
})
export default styles