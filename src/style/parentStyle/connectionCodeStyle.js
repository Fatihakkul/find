import { StyleSheet,Dimensions } from 'react-native'
import COLORS from '../Colors'
const width = Dimensions.get('window').width


const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : "center",
        justifyContent :"center",
        backgroundColor : COLORS.lightGreen,
       
    },
    codeContainer : {
        width : width*0.97,
       
        alignItems : "center",
        justifyContent : "space-around",
        borderRadius : 10,
        paddingHorizontal : 5,
       
        
    },
    title : {
        fontSize : 22,
        fontWeight : "bold",
        letterSpacing : 1,
        alignSelf :"center",
        opacity : 0.6,
        color : COLORS.white
      
    }
})
export default styles