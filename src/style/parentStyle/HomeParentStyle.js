import {StyleSheet,Dimensions} from 'react-native'
import COLORS from '../Colors'
import Colors from '../Colors'
const width = Dimensions.get("window").width
const heigth = Dimensions.get("window").height


const style = StyleSheet.create({
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
    mapContainer : {
        position : "absolute"
    },
    childInfo : {
        width  : width * 0.9,
        borderRadius : 20,
        backgroundColor : Colors.transparentWhite,
       
        paddingVertical : 15,
        marginBottom : 60
    },
    container : {
        flex : 1,
        alignItems : "center",
        justifyContent : "flex-end",
        paddingBottom : 10
    },
    historyButton :{
        width : width,
        alignItems  : "flex-end"
        
        
    },
    row : {
        flexDirection : "row",
        justifyContent : "space-between"
  },
    text : {
        fontSize : 14,
        color : COLORS.red
    },
    line : {
        width  : width * 0.9,
        borderWidth : 0.5,
        borderColor : Colors.primary,
        alignSelf : "center",
        marginTop : 2
    },
    circleButton : {
        width : 46,
        height : 46,
        borderRadius : 23,
        backgroundColor : Colors.pressButtongray,
        alignItems  :"center",
        justifyContent : "center",
        marginRight : 15,
        marginBottom : 20,
        position : "absolute",
        top : 100,
        left : 10
    },
    backContainer : {
        width  :width,
        alignItems : "flex-start",
        position : "absolute",
        top :  20,
        left : 10
    },
    subNotification : {
        width : width * 0.95,
        height : 60,
        backgroundColor : Colors.primary,
        position : "absolute",
        top : 10,
        alignItems : "center"
    },
    subText : {
        color : Colors.white,
        fontSize : 14,
        letterSpacing : 0.3
    },
    childs : {
        width : width,
        backgroundColor : COLORS.transparentWhite,
        position  :"absolute",
        top : 0
    }
})
export default style