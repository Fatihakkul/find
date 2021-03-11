import React, { useEffect, useState, useContext, useRef } from 'react'
import { SafeAreaView, View, Dimensions, PermissionsAndroid, Text } from 'react-native'
import Axios from 'axios'
import Context from '../../context/store'
import styles from '../../style/parentStyle/connectionCodeStyle'
import jwtDecode from 'jwt-decode'
import AsyncStorage from '@react-native-async-storage/async-storage'
import QRCodeScanner from 'react-native-qrcode-scanner';
import * as Animatable from 'react-native-animatable';
import { useIsFocused } from "@react-navigation/native"

import {RNCamera } from "react-native-camera"

import COLORS from '../../style/Colors'

const { width, height } = Dimensions.get("window")

const QRCodeScannerPage = props => {



    const { state, dispatch } = useContext(Context)
    const [vis, setVis] = useState(null)
    const [focusedScreen, setfocusedScreen] = useState(null)
    const pushToken = props.route.params.puhstoken
    const isFocus = useIsFocused()
    const cameraRef = useRef()





    useEffect(() => {
        setTimeout(() => {
            setfocusedScreen(true)
        }, 2000);
        permiisons()
        getLocation()
        console.log(cameraRef.current)
    }, [])



    const permiisons = async () => {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
            title: "Cool Photo App Camera Permission",
            message: "‘Cool Photo App needs access to your camera ‘" +
                " ‘so you can take awesome pictures.’",
            buttonNeutral: "‘Ask Me Later’",
            buttonNegative: "‘Cancel’",
            buttonPositive: "‘OK’",
        },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("‘You can use the camera’");
        } else {
            console.log("‘Camera permission denied’");
        }
        const grantedCamera = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
            title: "Cool Photo App Camera Permission",
            message: "‘Cool Photo App needs access to your camera ‘" +
                " ‘so you can take awesome pictures.’",
            buttonNeutral: "‘Ask Me Later’",
            buttonNegative: "‘Cancel’",
            buttonPositive: "‘OK’",
        },
        );
        if (grantedCamera === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("‘You can use the camera’");
        } else {
            console.log("‘Camera permission denied’");
        }

    }

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
            code: parseInt(e.data),
            pushToken: pushToken
        }).catch(err => console.log(err, "err"))
        console.log(response)
        if (response.data.responseStatus === 200) {
            const decoded = jwtDecode(response.data.data.response)
            console.log(decoded.data[0].parentId)
            getFamily(decoded.data[0].parentId)
            dispatch({ type: "SET_USER", user: decoded })
            dispatch({ type: "SET_TOKEN", token: response.data.data.response })
            AsyncStorage.setItem("@CHILDTOKEN", response.data.data.response)
            props.navigation.navigate("home")

        } else {
            props.navigation.goBack()
        }
    }





    const getLocation = async () => {
        try {
            const granted = await PermissionsAndroid.request(
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
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {

                setVis(true)

            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            {isFocus ? <View
                style={{ flex: 1, backgroundColor: "white" }}

            >

                {isFocus &&
                    (<RNCamera
                        
                            style={{ flex : 1}}
                        // cameraStyle={{ height: "100%", width: "100%" }}
                        // onRead={connection}
                        ref={cameraRef}
                        onCameraReady={(r)=>console.log(r , "ee")}
                        
                    ></RNCamera>)
                    

                }



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
                :
                <Text>Selam</Text>


            }
        </SafeAreaView>

    )
}
export default (QRCodeScannerPage)

// import React,{useEffect,useRef} from 'react';
// import { AppRegistry, StyleSheet, Text, TouchableOpacity,PermissionsAndroid , View } from 'react-native';
// import { RNCamera } from 'react-native-camera';


//  const QRCodeScannerPage = ()=>{

//     const cameraRef = useRef()
//     const    perms = [PermissionsAndroid.PERMISSIONS.CAMERA, PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE];

//     useEffect(()=>{
//         permiisons()
//     },[])

//     const permiisons =async()=>{
//         const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
//             title: "Cool Photo App Camera Permission",
//             message: "‘Cool Photo App needs access to your camera ‘" +
//              " ‘so you can take awesome pictures.’",
//             buttonNeutral: "‘Ask Me Later’",
//             buttonNegative: "‘Cancel’",
//             buttonPositive: "‘OK’",
//             },
//           );
//           if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//             console.log("‘You can use the camera’");
//           } else {
//              console.log("‘Camera permission denied’");
//           }
//           const grantedCamera = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA , {
//             title: "Cool Photo App Camera Permission",
//             message: "‘Cool Photo App needs access to your camera ‘" +
//              " ‘so you can take awesome pictures.’",
//             buttonNeutral: "‘Ask Me Later’",
//             buttonNegative: "‘Cancel’",
//             buttonPositive: "‘OK’",
//             },
//           );
//           if (grantedCamera === PermissionsAndroid.RESULTS.GRANTED) {
//             console.log("‘You can use the camera’");
//           } else {
//              console.log("‘Camera permission denied’");
//           }

//     }




//     return (
//       <View style={styles.container}>
//         <RNCamera
//             ref={cameraRef}
//             useCamera2Api={true}
//           style={styles.preview}
//           type={RNCamera.Constants.Type.back}
//           flashMode={RNCamera.Constants.FlashMode.on}
//           androidCameraPermissionOptions={{
//             title: 'Permission to use camera',
//             message: 'We need your permission to use your camera',
//             buttonPositive: 'Ok',
//             buttonNegative: 'Cancel',
//           }}
//           androidRecordAudioPermissionOptions={{
//             title: 'Permission to use audio recording',
//             message: 'We need your permission to use your audio',
//             buttonPositive: 'Ok',
//             buttonNegative: 'Cancel',
//           }}
//         >

//         </RNCamera>
//         {console.log(cameraRef.current,"sss")}
//       </View>
//     );



// }
// export default QRCodeScannerPage
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     backgroundColor: 'black',
//   },
//   preview: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   capture: {
//     flex: 0,
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     padding: 15,
//     paddingHorizontal: 20,
//     alignSelf: 'center',
//     margin: 20,
//   },
// });