import { StyleSheet, Dimensions } from 'react-native'
import COLORS from '../Colors'

const width = Dimensions.get("window").width

const styles = StyleSheet.create({
    titleContainer: {
        width: width * 0.95,

        paddingVertical: 10

    },
    settingsTitle: {
        fontSize: 16,
        fontWeight: "bold",
        letterSpacing: 0.2,
        color: COLORS.settinText
    },
    infoContainer: {
        flexDirection: "row",
        backgroundColor: COLORS.white,
        paddingVertical: 10,
        width: width * 0.95,
        justifyContent: "space-around",
        borderRadius: 15,
        marginVertical:7
    },
    info: {
        width: width * 0.55,
        backgroundColor: COLORS.white,


    },
    suppport: {
        flexDirection: "column",
        backgroundColor: COLORS.white,
        paddingVertical: 10,
        width: width * 0.95,
        justifyContent: "space-around",
        borderRadius: 15,
        paddingLeft :20,
        
    }
    ,
    supportText : {
        fontSize : 17,
        fontWeight : "600",
        marginTop : 10,
        color  :COLORS.settinText
    },
    container: {

        alignItems: "center",

    },
    settingsItemContainer: {
        width: width,
        paddingVertical: 10,
        
        paddingLeft: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    title: {
        fontSize: 18,
        letterSpacing: 0.5,
        marginLeft: 10
    },
    userText: {
        fontSize: 15,
        letterSpacing: 0.2
    },
    userInfoContainer: {
        marginTop: 10,
        borderColor: COLORS.gray,
        paddingLeft: 10
    },
    childlist: {
        backgroundColor: "#EEEEEE",
        marginVertical: 4,
        marginHorizontal: 4,
        alignItems: "center",
        justifyContent: "center"
    },
    free : {
        fontWeight : "bold",
        marginTop : 7,
        letterSpacing : 1,
        fontSize :20,
        color : COLORS.white
    },
    price : {
        position : "absolute",
        zIndex  :2,
        right:20,
        top : 20,
        fontSize : 28,
        color : COLORS.primary,
        fontWeight : "bold",

    },
    premiumButton : {
        position : "absolute",
        zIndex : 2,
        right : 20,
        top :60,
        backgroundColor : COLORS.white,
        paddingHorizontal : 10,
        alignItems : "center",
        justifyContent  :"center",
        borderRadius : 10,
        paddingVertical :7,
        
    }
})
export default styles