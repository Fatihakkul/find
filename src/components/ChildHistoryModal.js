import React from 'react' 
import {View,Text,Pressable,StyleSheet,Dimensions,Image} from 'react-native' 
import Modal from 'react-native-modal'
import Colors from '../style/Colors'
import Icons from 'react-native-vector-icons/Ionicons'
import Iconss from 'react-native-vector-icons/MaterialIcons'
import COLORS from '../style/Colors'


const {width , height} = Dimensions.get("window")

const ChildHistoryModal =(props)=>{
    return(
        <Modal
            isVisible={props.isVisible}
            onBackdropPress={props.onBackdropPress}
            animationOutTiming ={300}
            animationInTiming={800}
            style={{alignItems : "center" , justifyContent :"center"}}
        >
              <View style={styles.container}>
               <View  style={styles.sosContainer}>
                    <View style={styles.imageCont}>
                        <Image style={{width:85,height:85}} source={require('../assets/childface.png')} />
                    </View>
                    <View style={styles.childInfo}>
                        <Text style={[styles.text,{fontWeight :"bold"}]}>{props.name}</Text>
                        <View style={[styles.şarj]}>
                            <Text style={styles.text}>Şarj düzeyi</Text>
                            <Icons size={40} color={COLORS.white} name="battery-dead-outline"/>
                            <Text style={{fontSize : 10,position : "absolute" , right : 13,color :COLORS.white,fontWeight : "bold"}}>{`%${props.level}`}</Text>
                        </View>
                    </View>
               </View>
             
                <View style={{alignItems : "center",justifyContent : "space-evenly",flex : 0.7}}>
                    <Text style={[styles.text,{fontWeight : "bold",fontSize : 19}]}>YÜKSEK SESLİ SİNYAL</Text>
                    <View style={styles.sosCircle}>
                        <Image style={{width : 50,height:50}}   source={require('../assets/soswhite.png')}/>
                    </View>
                   
                    <View style={[styles.sosContainer,{marginTop : 10,flexDirection :"column"}]}>
                       <Text style={styles.text}>Çocuğunuz aramaları duymuyorsa</Text>
                       <Text style={styles.text}>telefonuna yüksek sesli sinyal gönderin</Text>
                    
                   </View>
                </View>
                <Pressable onPress={props.press}>
                            <View style={styles.cancel}>
                               <Text style={[styles.text,{fontWeight : "bold"}]}>MESAJ GÖNDER</Text>
                            </View>
                </Pressable>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    sosCircle : {
        width : 120,
        height : 120,
        borderRadius : 60,
        backgroundColor  :COLORS.white,
        alignItems : "center",
        justifyContent : "center"
    },
    container : {
        width : width*0.90,
        backgroundColor  :COLORS.lightRed,
        alignItems : "center",
       justifyContent : "space-around",
        borderRadius : 25,
        height : height*0.7
    },
    cancel : {
        width : width*0.5,
        height : 50,
        borderRadius : 10,
        backgroundColor : COLORS.lightRed,
        alignItems : "center",
        justifyContent : "center",
        borderWidth : 3,
        borderColor :COLORS.white
        
    },
    text : {
        color : "white",
        fontSize : 16,
        letterSpacing : 0.5
    },
    sosContainer : {
        alignItems : "center",
        marginBottom : 20,
        flexDirection : "row",
        justifyContent : "center"
    },
    imageCont : {
        width : 85,
        height : 85,
        borderRadius : 42.5,
        overflow : "hidden"
    },
    şarj : {
        flexDirection :"row",
        justifyContent : "center",
        alignItems  :"center"
    },
    childInfo : {
        marginLeft : 20
    }
})
export {ChildHistoryModal}