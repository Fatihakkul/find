import React, { useState,useContext } from 'react'
import { View, Text, Pressable, StyleSheet, Dimensions, Image, ActivityIndicator } from 'react-native'
import Modal from 'react-native-modal'
import Context from "../context/store"
import Icon from 'react-native-vector-icons/Ionicons'
import Iconss from 'react-native-vector-icons/MaterialIcons'
import COLORS from '../style/Colors'
import QRCode from 'react-native-qrcode-svg';
import Axios from "axios"
import API from "../data/api"
import { launchImageLibrary } from "react-native-image-picker"
import strings from '../strings'


const { width, height } = Dimensions.get("window")

const ChildInfoModal = (props) => {
    console.log(props.data)

    const [visible,setVisible]=useState(true)
    const [photo, setPhoto] = useState(null)
    const [picture, setPicture] = useState(null)
    const [loading, setLoading] = useState(false)
    const {state,dispatch}=useContext(Context)
    
    
    async function uploadImage() {
        const data = new FormData()

        launchImageLibrary({
            mediaType: 'photo',

        }, async (responese) => {
            console.log(responese, "merhaba")
            data.append("image", {
                uri: responese.uri,
                name: responese.fileName,
                type: responese.type
            })
            let respone = await Axios.post(API.add_content, data)
            setPicture(respone)
            setPhoto(responese)
        })

    }

    const saveData = async () => {
        if(picture != null){
            setLoading(true)
            let upload = await Axios.post(API.base_url + "/home" + API.update_user, {
                role: "children",
                id: props.data.id,
                picture: `http://yatoo.demeli.org/uploads/${picture.data}`
            })
            let newData = await Axios.post(API.base_url + API.get_family, {
                parentId: state.type === 1 ? state.user.userData[0].family.parents[0].id : state.user.parentData.id
            })
    
            dispatch({ type: "SET_FAMILY", family: newData.data.data.response })
            console.log(newData,"newData")
            setLoading(false)
            setVisible(!visible)
        }else {
            setVisible(!visible)
            setLoading(false)
        }
       
    }

    return (
        <Modal
            isVisible={props.isVisible === visible ? true : false}
            onBackdropPress={props.onBackdropPress}
            animationOutTiming={800}
            animationInTiming={800}
            style={{ alignItems: "center", justifyContent: "center" }}
        >

            <View style={styles.container}>
                <View style={styles.imageCont}>
                    <Image style={{ borderRadius: 40, width: 80, height: 80 }} source={props.data === undefined || props.data === null ?  require('../assets/childface.png')   : props.data.picture != null && props.data.picture != "" && props.data.picture != undefined?  photo != null  ? { uri: photo.uri } : { uri :props.data.picture} : require('../assets/childface.png')} />
                    <Icon style={{ position: "absolute", top: 50, zIndex: 1, left: 50 }} name="construct" size={30} onPress={() => uploadImage()} color={COLORS.lightGreen} />
                </View>
                <View style={[styles.info, { justifyContent: "center",marginVertical:10 }]}>
                    <View style={{ flexDirection: "row", alignItems: "center" ,justifyContent:"space-evenly",width:width*0.8}}>


                        <Text style={styles.nameText}>{props.data != null ? props.data.name : ""}</Text>
                        <View style={styles.codeContainer}>
                            <Text style={{color : COLORS.white,fontWeight:"bold",letterSpacing:1}}>{`Code:${props.data != null ? props.data.code : ""}`}</Text>
                        </View>


                    </View>

                </View>
                <View style={[styles.info, { justifyContent: "center" }]}>
                    <QRCode
                        value={`${props.data != null ? props.data.code : ""}`}
                    />
                </View>
                {loading ? <ActivityIndicator color={COLORS.primary} /> :
                    <Pressable onPress={saveData}>
                        <View style={styles.button}>
                            <Text style={styles.text}>{strings.save}</Text>
                        </View>
                    </Pressable>
                }

            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    //9001
    codeContainer:{
        backgroundColor : COLORS.lightGreen,
        paddingVertical:10,
        paddingHorizontal:5,
        borderRadius:15,
        alignItems:"center",
        justifyContent:"center"
        
    },
    text: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: "bold",
        letterSpacing: 1
    },
    button: {
        width: width * 0.5,
        paddingVertical: 10,
        backgroundColor: COLORS.lightGreen,
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20
    },
    nameText: {
        fontSize: 20,
        fontWeight: "bold",
        letterSpacing: 1
    },
    info: {
        flexDirection: "row",
        marginTop: 10,
        alignItems: "center",
        width: width * 0.9
    },
    imageCont: {
        width: 80,
        height: 80,
        borderRadius: 40,
        // overflow: "hidden",

    },
    container: {
        width: width * 0.8,
        paddingVertical: 20,
        backgroundColor: COLORS.white,
        borderRadius: 25,
        alignItems: "center"
    }
})
export { ChildInfoModal }