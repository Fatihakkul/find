import React, { useEffect, useState, useContext } from 'react'
import { SafeAreaView, View, Dimensions, PermissionsAndroid } from 'react-native'
import Axios from 'axios'
import Context from '../../context/store'
import styles from '../../style/parentStyle/connectionCodeStyle'
import jwtDecode from 'jwt-decode'
import AsyncStorage from '@react-native-async-storage/async-storage'
import QRCodeScanner from 'react-native-qrcode-scanner';
import * as Animatable from 'react-native-animatable';
import { useIsFocused } from "@react-navigation/native"
const { width, height } = Dimensions.get("window")

const QRCodeScannerPage = props => {



    const { state, dispatch } = useContext(Context)

   

    useEffect(() => {
        getLocation()
     
    }, [])

    const getFamily = async (id) => {
        let response = await Axios.post("https://wherismykid.herokuapp.com/api/children/getfamily", {
            parentId: id
        })
        console.log(response.data.data.response, "family")
        dispatch({ type: "SET_FAMILY", family: response.data.data.response })
    }


    function makeSlideOutTranslation(translationType, fromValue) {
        return {
            from: {
                [translationType]: width * -0.08
            },
            to: {
                [translationType]: fromValue
            }
        };
    }

    const connection = async (e) => {
        console.log(e)
        let response = await Axios.post('https://wherismykid.herokuapp.com/api/children/childrenlogin', {
            code: parseInt(e.data)
        }).catch(err => console.log(err, "err"))

        if (response.data.responseStatus === 200) {
            const decoded = jwtDecode(response.data.data.response)
            console.log(decoded.data[0].parentId)
            getFamily(decoded.data[0].parentId)
            dispatch({ type: "SET_USER", user: decoded })
            dispatch({ type: "SET_TOKEN", token: response.data.data.response })
            AsyncStorage.setItem("@CHILDTOKEN", response.data.data.response)
            props.navigation.navigate("home")

        }
    }





    const getLocation = async () => {
        try {
            const granted = Platform.OS === "android" ? await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "Cool Photo App Camera Permission",
                    message:
                        "Cool Photo App needs access to your camera " +
                        "so you can take awesome pictures.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            ) : true
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log(granted)
              
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <View
                style={{ flex: 1, backgroundColor: "white" }}

            >
                
                      <QRCodeScanner
                        cameraStyle={{ height: "100%", width: "100%" }}
                        onRead={connection}
                    />

                <View style={{ position: "absolute", width: 200, height: 250, top: "50%", right: "25%", alignItems: "center", justifyContent: "center" }}>
                 
                    <Animatable.View
                        style={{ width: 180, height: 1, borderWidth: 1, borderColor: "blue" }}
                        direction="alternate-reverse"
                        iterationCount="infinite"
                        duration={1700}
                        easing="linear"
                        animation={makeSlideOutTranslation(
                            "translateY",
                            width * -0.7
                        )}
                    />
                </View>
                <View style={{ width: 200, top: "30%", justifyContent: "space-between", right: "25%", height: 250, position: "absolute" }}>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}  >
                        <View style={{ width: 50, borderTopWidth: 7, borderLeftWidth: 7, borderColor: "white", borderTopStartRadius: 15, height: 50 }}></View>
                        <View style={{ width: 50, height: 50, borderTopWidth: 7, borderTopEndRadius: 15, borderRightWidth: 7, borderColor: "white" }}></View>

                    </View>


                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}  >
                        <View style={{ width: 50, height: 50, borderBottomWidth: 7, borderBottomStartRadius: 15, borderLeftWidth: 7, borderColor: "white" }}></View>
                        <View style={{ width: 50, height: 50, borderBottomWidth: 7, borderBottomEndRadius: 15, borderRightWidth: 7, borderColor: "white" }}></View>
                    </View>
                </View>
            </View>



        </SafeAreaView>
    )
}
export default QRCodeScannerPage