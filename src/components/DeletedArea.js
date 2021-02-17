import React from 'react' 
import {View,Text,Pressable,StyleSheet,Dimensions} from 'react-native' 
import Modal from 'react-native-modal'
import Colors from '../style/Colors'
import Icons from 'react-native-vector-icons/Ionicons'


const width = Dimensions.get("window").width

const DeletedArea =(props)=>{
    return(
        <Modal
            isVisible={props.isVisibleDeleted}
            onBackdropPress={props.onBackdropPress}
            animationOutTiming ={800}
            animationInTiming={800}
            style={{alignItems : "center" , justifyContent :"center"}}
        >
            <View style={styles.conatiner}>
                <Icons name="alert" size={25} color={Colors.white} />
                <Text style={styles.warning} >Adresses deleted {props.item.name != undefined ? props.item.name : null} </Text>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    conatiner : {
        width : width * 0.9,
        height : 150,
        backgroundColor : Colors.transparentBlack,
        borderRadius : 20,
        alignItems : "center",
        paddingTop : 20
    },
    warning : {
        color : Colors.white,
        fontSize : 17,
        letterSpacing : 0.3,
        marginTop : 10
    }
})
export {DeletedArea}