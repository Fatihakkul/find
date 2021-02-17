import React, { useState, useContext, useEffect, useRef } from 'react'
import { View, TextInput, Text, Pressable, StyleSheet, Dimensions, Image, ActivityIndicator } from 'react-native'
import Context from '../context/store'
import API from "../data/api"
import Axios from 'axios'
import Modal from 'react-native-modal'
import Colors from '../style/Colors'
import QRCode from 'react-native-qrcode-svg';
import { launchImageLibrary } from "react-native-image-picker"
import Icon from "react-native-vector-icons/Ionicons"
import COLORS from '../style/Colors'


const width = Dimensions.get("window").width
const height = Dimensions.get("window").height


const AddChildModal = props => {

    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [code, setCode] = useState()
    const [visible, setVisible] = useState(true)
    const [err, setErr] = useState(false)
    const { state, dispatch } = useContext(Context)
    const [photo, setPhoto] = useState(null)
    const [loading, setLoading] = useState(false)
    const [loadingPhoto, setLoadingPhoto] = useState(false)
    const [addContenResponse, setAddContentResponse] = useState(null)
    const viewZero = useRef()
    const viewTwo = useRef()
    const viewOne = useRef()
    const viewFour = useRef()

    useEffect(() => {
        console.log(state, "token")
        getCode()

    }, [])

    async function uploadImage() {
        const data = new FormData()
        setLoadingPhoto(true)
        launchImageLibrary({
            mediaType: 'photo',

        }, async (responese) => {
            console.log(responese, "merhabaaa")
            if (responese.didCancel) {
                console.log("slea")
                setLoadingPhoto(false)
            } else {
                data.append("image", {
                    uri: responese.uri,
                    name: responese.fileName,
                    type: responese.type
                })
                let respone = await Axios.post(API.add_content, data)
                console.log(respone)
                setAddContentResponse(respone)
                setPhoto(responese)
                setTimeout(() => {
                    setLoadingPhoto(false)
                }, 2000);
            }

        })

    }

    const errorCode = () => {
        setCode("Bir hata oluştu")
        setErr(true)
    }

    const getCode = async () => {
        let response = await Axios.get(API.base_url + API.getCode)
        console.log()
        if (response.data.responseStatus === 200) {
            console.log("selam")
            const code = response.data.data.response
            setCode(code)
        } else {
            console.log("hata")
            errorCode()
        }
    }

    const saveData = async () => {

        setLoading(true)
        const form = new FormData()
        //dispatch({type : "SET_MESSAGE" , message : value})
        let response = await Axios.post(API.base_url + API.addChild, {
            parentId: state.type === 1 ? state.user.userData[0].family.parents[0].id : state.user.parentData.id,
            name: name,
            age: (age),
            code: parseInt(code),
            picture: addContenResponse === null ? null : `http://yatoo.demeli.org/uploads/${addContenResponse.data}`
        }, {
            headers: {
                'Authorization': `bearer ${state.token}`
            }
        })
        console.log(response)
        console.log(name, age)
        setAge("")
        setName("")
        getFamily()
        setPhoto(null)
        setVisible(!visible)
        setLoading(false)
    }

    const getFamily = async () => {
        let response = await Axios.post(API.base_url + API.get_family, {
            parentId: state.type === 1 ? state.user.userData[0].family.parents[0].id : state.user.parentData.id
        })
        // setChildArray(response.data.data.response)
        dispatch({ type: "SET_FAMILY", family: response.data.data.response })
    }

    function setChildAge(age, view) {
        setAge(age)

        switch (view) {
            case viewOne:
                viewOne.current.setNativeProps({
                    style: { backgroundColor: COLORS.primary }
                });
                viewTwo.current.setNativeProps({
                    style: { backgroundColor: COLORS.white }
                });
                viewZero.current.setNativeProps({
                    style: { backgroundColor: COLORS.white }
                });
                viewFour.current.setNativeProps({
                    style: { backgroundColor: COLORS.white }
                });
                break;
            case viewZero:
                viewZero.current.setNativeProps({
                    style: { backgroundColor: COLORS.primary }
                });
                viewTwo.current.setNativeProps({
                    style: { backgroundColor: COLORS.white }
                });
                viewOne.current.setNativeProps({
                    style: { backgroundColor: COLORS.white }
                });
                viewFour.current.setNativeProps({
                    style: { backgroundColor: COLORS.white }
                });
                break;
            case viewTwo:
                viewTwo.current.setNativeProps({
                    style: { backgroundColor: COLORS.primary }
                });
                viewOne.current.setNativeProps({
                    style: { backgroundColor: COLORS.white }
                });
                viewZero.current.setNativeProps({
                    style: { backgroundColor: COLORS.white }
                });
                viewFour.current.setNativeProps({
                    style: { backgroundColor: COLORS.white }
                });
                break;
            case viewFour:
                viewFour.current.setNativeProps({
                    style: { backgroundColor: COLORS.primary }
                });
                viewTwo.current.setNativeProps({
                    style: { backgroundColor: COLORS.white }
                });
                viewZero.current.setNativeProps({
                    style: { backgroundColor: COLORS.white }
                });
                viewOne.current.setNativeProps({
                    style: { backgroundColor: COLORS.white }
                });
                break;
            default:
                break;
        }


    }
    return (
        <Modal
            isVisible={props.isVisible === visible ? true : false}
            animationOutTiming={800}
            animationInTiming={800}
            style={{ alignItems: "center" }}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Bir çocuk ekle</Text>
                <View style={styles.textCont}>
                    <Text style={styles.text}>Aşağıdaki bilgileri doldurduktan</Text>
                    <Text style={styles.text}>sonra Kaydet butonuna tıklayıp kodu</Text>
                    <Text style={styles.text}>çocuğunuzun telefonundaki uygulama giriniz</Text>

                </View>
                <View style={{ width: 100, zIndex:2,height: 100, borderRadius: 50, marginTop: 10,alignItems: "center", justifyContent: "center" }}>
                    <View style={{position  :"absolute",zIndex:3,right:1,bottom:3}} > 
                        <Icon name="camera" color={COLORS.primary} size={30} onPress={()=>uploadImage()} />
                    </View>
                    {loadingPhoto ? <ActivityIndicator color={COLORS.primary} /> :

                        <Image style={{ width: 100, height: 100, borderRadius:50,resizeMode: "cover" }} source={photo === null ? require('../assets/childface.png') : { uri: photo.uri }} />
                    }

                </View>
                <View style={styles.inputContainer}>
                    <Text>İsim : </Text>
                    <View style={styles.input}>
                        <TextInput
                            placeholder="İsim gir"
                            onChangeText={(text) => setName(text)}
                            value={name}
                        />
                    </View>

                </View>
                <View style={styles.ageContainer}>
                    <View style={styles.ageConten}>
                        <Pressable onPress={() => setChildAge("4", viewZero)}>
                            <View ref={viewZero} style={styles.age}>
                                <Text>0 - 7</Text>
                            </View>
                        </Pressable>
                        <Pressable onPress={() => setChildAge("10", viewOne)}>
                            <View ref={viewOne} style={styles.age}>
                                <Text>7-12</Text>
                            </View>
                        </Pressable>

                    </View>
                    <View style={styles.ageConten}>
                        <Pressable onPress={() => setChildAge("16", viewTwo)}>
                            <View ref={viewTwo} style={styles.age}>
                                <Text>12 - 18</Text>
                            </View>
                        </Pressable>
                        <Pressable onPress={() => setChildAge("20", viewFour)}>
                            <View ref={viewFour} style={styles.age}>
                                <Text>18+</Text>
                            </View>
                        </Pressable>

                    </View>
                </View>

                <View style={styles.qrcodeContainer}>
                    <Text style={styles.title}>{code}</Text>
                    <Text style={[styles.title, { color: "black", opacity: 0.4 }]}>VEYA</Text>
                    <QRCode
                        value={`${code}`}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Pressable onPress={() => setVisible(!visible)} style={[styles.button, { backgroundColor: Colors.white, borderColor: Colors.primary, borderWidth: 1 }]}>
                        <Text style={{ color: Colors.primary, fontSize: 16 }}>İptal Et</Text>
                    </Pressable>
                    {err ?
                        null
                        :
                        loading ?

                            <ActivityIndicator color={COLORS.primary} />
                            :
                            <Pressable style={styles.button} onPress={saveData}>
                                <Text style={{ color: Colors.white, fontSize: 16 }}>Kaydet</Text>
                            </Pressable>

                    }

                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    age: {
        borderWidth: 1,
        borderColor: COLORS.primary,
        width: width * 0.4,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 5,
        borderRadius: 15,
        marginLeft: 5
    },
    ageContainer: {
        width: width * 0.95,
        alignItems: "center",
        height: 80,
        justifyContent: "space-between",
        marginTop: 10
    },
    ageConten: {
        flexDirection: "row"
    },
    takePhotoCont: {
        flexDirection: "row",
        alignItems: "center",
        width: width * 0.4,
        justifyContent: "space-around",
        backgroundColor: COLORS.primary,
        borderRadius: 15,
        padding: 5
    },
    qrcodeContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: width * 0.94,
        alignItems: "center",
        marginVertical: 10
    },
    container: {
        width: width * 0.95,
        paddingBottom: 10,
        backgroundColor: Colors.white,
        borderRadius: 15,
        alignItems: "center"

    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: Colors.primary,
        marginTop: 10,
        letterSpacing: 0.5
    },
    inputContainer: {
        alignItems: "center",
        flexDirection: "row",
        borderWidth: 1,
        borderRadius: 10,
        width: width * 0.5,
        height: 40,
        borderColor: COLORS.primary,
        marginTop: 10,
        paddingLeft: 10,

    },
    input: {
        alignItems: "center",
        justifyContent: "center"

    },
    button: {
        width: 100,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.green,
        borderRadius: 10
    },
    buttonContainer: {
        width: width * 0.95,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 10
    },
    textCont: {
        alignItems: "center",
        marginTop: 10
    },
    text: {
        fontSize: 14,
        opacity: 0.5
    }
})
export { AddChildModal }