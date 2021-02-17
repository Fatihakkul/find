import {StyleSheet,Dimensions} from 'react-native'
import COLORS from '../style/Colors'

const width = Dimensions.get('window').width

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems  :"center",
        justifyContent : "center",
        //flexDirection : "row"
        backgroundColor : "#41FF88"
    },
    buttons : {
        alignItems : "center",
        marginTop : 33,
        paddingVertical : 5 ,
        backgroundColor : COLORS.white,
        borderRadius : 25,
        marginHorizontal : 5,
        elevation : 5
    }
    
})
export default styles