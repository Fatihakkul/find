import {StyleSheet,Dimensions} from 'react-native'
import Colors from '../Colors'

const width = Dimensions.get("window").width

const styles = StyleSheet.create({
    container : {
      
        alignItems : "center",
        justifyContent : "center",
        flexDirection :"row",
       paddingLeft : 10
    },
    signalConatiner : {
        width : width * 0.97,
        height : 250,
       
        borderRadius : 10,
        alignItems : "center",
        backgroundColor : Colors.white,
        marginTop : 10,
        overflow : "hidden"
    },
    image : {
        width : width*0.97,
        height : 70,
        
    },
    infoContainer  : {
        flexDirection : "row",
        alignItems : "center",
        marginTop : 10,
        marginBottom  :10
    },
    infoTitle : {
        fontSize : 20,
        fontWeight  :"bold",
        marginLeft : 10,
        opacity  :0.8
    },
    infoText : {
        fontSize : 12,
        fontWeight : "500",
        opacity : 0.4,
        
    },
    deleteButton : {
        position : "absolute",
        bottom : 25,
        right : 15,
        backgroundColor : Colors.white,
        height : 40,
        width  :40,
        borderRadius  : 20,
        alignItems : "center",
        justifyContent : "center"
    },
    
})

export default styles