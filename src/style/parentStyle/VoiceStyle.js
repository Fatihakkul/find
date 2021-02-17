import {StyleSheet,Dimensions} from 'react-native'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const styles = StyleSheet.create({
    container : {
        flex : 1
    },
    button : {
        alignItems : "center",
        justifyContent : 'center'

    },
    buttonContainer :{
        width : width,
        flexDirection : "row",
        justifyContent : "space-around",
        alignItems : "center"
    },
    topContainer : {
        flex : 2,
        borderBottomWidth : 0.3,
        borderColor : "gray",
       
        alignItems : "center",
        justifyContent : "space-around"
    },
    record : {
        flex :3
    },
    title : {
        fontSize : 17,
        letterSpacing : 0.5,
        fontWeight : "800",
        opacity : 0.7
    }
})
export default styles