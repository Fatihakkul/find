import {StyleSheet,Dimensions} from 'react-native'
import COLORS from '../Colors'

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

const styles = StyleSheet.create({
    headerTitle : {
        width : width,
        paddingLeft : width*0.04,
        
    },
    family : {
        fontWeight : "bold",
        color : COLORS.white,
        fontSize : 15
    },
    listItem: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        backgroundColor: COLORS.primary,
        marginHorizontal: 10,
        borderWidth: 2
    },
    container : {
        alignItems : "center",
        justifyContent : "center",
        flex : 1
    },
    emptyView : {
        width : width * 0.95,
        height : 200,
        backgroundColor : COLORS.primary,
        alignItems  :"center",
      
        borderRadius : 15
    },
    textContainer : {
        alignItems  : "center",
        justifyContent  :"center"
    },
    text : {
        color : COLORS.white,
        fontSize : 14,
        letterSpacing : 1
    },
    title : {
        fontSize : 18,
        color : COLORS.transparentBlack,
        fontWeight  :"bold",
        marginBottom : 10,
        marginTop  :20,
        letterSpacing : 1
    }
})
export default styles