import React, { useContext, useState, useEffect } from 'react'
import {
    SafeAreaView,
    View,
    Text,
    Pressable,
    Platform,
    Image,
    FlatList,
    Dimensions,
    ScrollView,
    ImageBackground
} from 'react-native'
import Context from '../../context/store'
import styles from '../../style/parentStyle/SettingsStyle'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Icons from 'react-native-vector-icons/Ionicons'
import COLORS from '../../style/Colors'
import AsyncStoreage from '@react-native-async-storage/async-storage'
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';
import {
    AddChildModal,
    ChildInfoModal
} from '../../components'
import Geolocation from "@react-native-community/geolocation"
import Axios from 'axios'
import API from '../../data/api'
import { Picker } from '@react-native-picker/picker';
import strings from "../../strings"
const { width, height } = Dimensions.get("window")

const Settings = props => {

    const screenWidth = Dimensions.get("window").width;
    const numColumns = 3;
    const tileSize = screenWidth * 0.8 / numColumns;
    const { state, dispatch } = useContext(Context)
    const [code, setCode] = useState()
    const [visible, setVisible] = useState(false)
    const [number, setNumber] = useState()
    const [childInfo, setChildInfo] = useState(false)
    const [child, setChild] = useState(null)
    const [lang, setLang] = useState(strings.getLanguage())
    useEffect(() => {
        Geolocation.getCurrentPosition(succes => {
            console.log(succes, "coordinate")
        })
        //  console.log(state.userlight.data.response.picture,"ddd")
        state.type === 0 ? null : getUser()
        // getChild()
        // setCode(state.user.userData.family.parents.code )
    }, [])


    const logout = async () => {
        try {
            await AsyncStoreage.clear().then(() => console.log("success"))
            //  GoogleSignin.revokeAccess();
            //  GoogleSignin.signOut();

            props.navigation.navigate("Choose")

        } catch (error) {
            console.log(error)
        }
    }


    const getUser = async () => {
        let response = await Axios.post(API.base_url + API.get_user, {
            id: state.user.userData[0].family.parents[0].id,
            role: "parent"
        })
        dispatch({ type: "SET_USERLIGHT", userlight: response.data })
        console.log(response, "pranet")
    }

    const getChild = async () => {
        let response = await Axios.post(API.base_url + API.get_user, {
            role: "children",
            id: 2
        })
        console.log(response, "children")
    }

    function showInfo(i) {
        console.log("selam")
        setChild(i)
        setChildInfo(!childInfo)
    }
    const renderList = ({ item }) => {
        console.log(item)
        if (item.lastitem) {
            return (

                <Pressable onPress={() => setVisible(!visible)} style={[styles.childlist, { height: tileSize, width: tileSize }]}>
                    <Icons name="add" size={35} />
                </Pressable>

            )
        } else {
            return (
                <Pressable onPress={() => showInfo(item)}>
                    <View style={[styles.childlist, { height: tileSize, width: tileSize }]}>
                        <View style={{ width: 70, height: 70, borderRadius: 35, overflow: "hidden" }}>
                            <Image style={{ width: 70, height: 70 }} source={item.picture != null ? { uri: item.picture } : require('../../assets/child.jpg')} />
                        </View>
                        <Text style={{ color: COLORS.black, fontWeight: "bold" }}>{item.name}</Text>
                    </View>
                </Pressable>
            )
        }

    }

    function changeLanguage (v){
        strings.setLanguage(v)
        setLang(v)
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }} contentContainerStyle={[styles.container, { paddingBottom: 70 }]}>
                <AddChildModal isVisible={visible} code={code} />
                <ChildInfoModal data={child} isVisible={childInfo} onBackdropPress={() => setChildInfo(!childInfo)} />
                <View style={styles.titleContainer}>
                    <Text style={styles.settingsTitle}>{strings.account}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <View style={{ width: 76, alignItems: "center", justifyContent: "center", height: 76, borderRadius: 38, overflow: "hidden" }}>
                        <Image style={{ width: 100, height: 100, resizeMode: "stretch" }} source={state.type === 0 ? require('../../assets/child.jpg') : state.userlight != null && state.userlight.data.response.picture != null ? { uri: state.userlight.data.response.picture } : state.user.userData != undefined && state.user.userData[0].family.parents[0].picture != null ? { uri: state.user.userData[0].family.parents[0].picture } : require('../../assets/child.jpg')} />
                    </View>
                    <View style={styles.info}>
                        <View style={styles.userInfoContainer}>
                            <Text style={styles.userText}>{state.type === 1 ? state.user.userData[0].name : state.user.userData.name}</Text>
                        </View>
                        <View style={styles.userInfoContainer}>
                            <Text style={styles.userText}>{state.type === 1 ? state.user.userData[0].email : state.user.userData.email}</Text>
                        </View>

                    </View>
                    <View style={{ justifyContent: "center" }}>
                        <Icons name="chevron-forward" size={30} color={COLORS.settinText} onPress={() => props.navigation.navigate("editparent")} />
                    </View>
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.settingsTitle}>{strings.language}</Text>
                </View>
                <View style={[styles.infoContainer, { flexDirection: "column", paddingVertical: 10, alignItems: "center" }]}>
                    <Picker
                        selectedValue={lang}
                        style={{ width: width * 0.9, height: 30 }}
                        mode="dropdown"
                        itemStyle={{ width: width * 0.95 }}
                        onValueChange={(value)=>changeLanguage(value)}
                    >
                        <Picker.Item label="TÜRKÇE" value="tr" />
                        <Picker.Item label="ENGLISH" value="en" />
                        <Picker.Item label="DEUTSCHE" value="de" />
                    </Picker>


                </View>
                <View style={[styles.infoContainer, { paddingVertical: 0, overflow: "hidden", height: 126, marginTop: 10 }]}>

                    <View style={{ position: "absolute", zIndex: 2, left: 20, top: 10 }}>
                        <Text style={styles.free}>7 GÜN</Text>
                        <Text style={styles.free}>ÜCRETSİZ</Text>
                        <Text style={styles.free}>DENE</Text>
                    </View>
                    <Text style={styles.price}>29.99$</Text>
                    <View style={styles.premiumButton}>
                        <Text style={[styles.free, { color: COLORS.black, fontSize: 17, marginTop: 0 }]}>Premium</Text>
                    </View>
                    <Image style={{ width: screenWidth * 0.95, height: 130 }} source={require('../../assets/free.png')} />
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.settingsTitle}>{strings.mypack}</Text>
                </View>
                <View style={[styles.infoContainer, { paddingVertical: 20, alignItems: "center" }]}>
                    <Text style={[styles.settingsTitle, { color: COLORS.settinText }]}>FREE PLAN</Text>
                    <Pressable onPress={() => props.navigation.navigate("package")}>
                        <ImageBackground style={{ width: 200, height: 40, alignItems: "center", justifyContent: "center", borderRadius: 20, overflow: "hidden" }} source={require('../../assets/updateprice.png')}>
                            <Text style={[styles.settingsTitle, { color: COLORS.white }]}>{strings.update}</Text>
                        </ImageBackground>
                    </Pressable>

                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.settingsTitle}>{strings.familyuser}</Text>
                </View>
                <View style={[styles.infoContainer]}>

                    <FlatList
                        keyExtractor={(_, index) => index.toString()}
                        data={[...state.family, { lastitem: true }]}
                        renderItem={renderList}
                        numColumns={numColumns}
                        contentContainerStyle={{ alignSelf: "center" }}
                    />

                </View>

                <View style={styles.titleContainer}>
                    <Text style={styles.settingsTitle}>{strings.support}</Text>
                </View>
                <View style={styles.suppport}>
                    <Text style={styles.supportText}>FAQ</Text>
                    <Text style={styles.supportText}>TERMS OF SERVİCE</Text>
                    <Text style={styles.supportText}>CONTACT</Text>

                </View>
                <View style={[styles.suppport, { marginTop: 10 }]}>
                    <Pressable style={styles.settingsItemContainer} onPress={logout}>
                        <Text style={styles.supportText}>{strings.logout}</Text>
                    </Pressable>

                </View>





            </ScrollView>
        </SafeAreaView>
    )
}
export { Settings }