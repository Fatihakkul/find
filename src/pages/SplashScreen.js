import React, { useEffect, useState, useContext } from 'react'
import { SafeAreaView, View, Text, StyleSheet, Image, Dimensions, PermissionsAndroid ,Platform} from "react-native"
import Context from '../context/store'
import Axios from "axios"
import Geolocation from '@react-native-community/geolocation'
import AsyncStoreage from '@react-native-async-storage/async-storage'
import jwt_decoded from 'jwt-decode'

const { width, height } = Dimensions.get("window")


const SplashScreen = (props) => {
    const { state, dispatch } = useContext(Context)
    const [position, setPosition] = useState([])


    useEffect(() => {
        if(Platform.OS === "ios"){
            Geolocation.getCurrentPosition(info => {
                console.log(info,"info")
                dispatch({ type: "SET_POSITION", position: info.coords })
            }, (err) => {
                console.log(err, "wwwww")

                Alert.alert(
                    'KONUM HATASI',
                    'Uygulamaya devam edebilmek için konumunuz açık ve uygulamaya izin verilmiş olmalı.',
                    [

                        {
                            text: 'Ayarlara git',
                            onPress: () => Linking.openSettings(),
                            style: 'default'
                        },
                    ]
                );
            });
        }
        AsyncStoreage.getItem("@CHILDTOKEN").then(data => {
            getLocation()
            console.log(data, "ssa")
            if (data != null) {
                console.log(data, "dataaa")
                getLocation()
                const decodeddChild = jwt_decoded(data)
                console.log(decodeddChild.data[0], "decoded")
                connection(decodeddChild.data[0].code,decodeddChild)
            } else {

                AsyncStoreage.getItem("@TYPE").then(data => {
                    dispatch({ type: "SET_TYPE", tip: data })
                })
                AsyncStoreage.getItem("@TOKEN").then(data => {
                    console.log(data, "token")
                    if (!data) {
                        getLocation()
                        console.log("data yok")
                        getLocation()
                        props.navigation.navigate("Swiper")
                    } else {
                        console.log("-else yok")
                        getLocation()
                        AsyncStoreage.getItem("@TYPE").then((type) => {
                            console.log(type, "datalogin")
                            const user = jwt_decoded(data)
                            dispatch({ type: "SET_TYPE", tip: type })
                            dispatch({ type: "SET_USER", user: user })
                            dispatch({ type: "SET_TOKEN", token: data })
                            console.log(user, "user")
                            if (user.userData[0].user_role.roleName === "user_parent") {
                                getLocation()
                                props.navigation.navigate("bottomtab")
                            }
                        })

                    }
                })
            }
        })


    }, [])


    const connection = async (e,decoded) => {
        console.log(e)
        let response = await Axios.post('https://wherismykid.herokuapp.com/api/children/childrenlogin', {
            code: parseInt(e)
        }).catch(err => console.log(err, "err"))

        if (response.data.responseStatus === 200) {
            getFamily(decoded.data[0].parentId)
            dispatch({ type: "SET_USER", user: decoded })
            props.navigation.navigate("home")

        }
    }

    const getFamily = async (id) => {
        let response = await Axios.post("https://wherismykid.herokuapp.com/api/children/getfamily", {
            parentId: id
        })
        console.log(response.data.data.response, "family")
        dispatch({ type: "SET_FAMILY", family: response.data.data.response })
    }

    const getLocation = async () => {
        try {
            const granted = Platform.OS === "android" ? await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
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
                Geolocation.watchPosition(position => {
                    const lastPosition = JSON.stringify(position);
                    setPosition(lastPosition)
                    //   console.log(lastPosition ,"last")
                })

                Geolocation.getCurrentPosition(info => {
                    console.log(info,"info")
                    dispatch({ type: "SET_POSITION", position: info.coords })
                }, (err) => {
                    console.log(err, "wwwww")

                    Alert.alert(
                        'KONUM HATASI',
                        'Uygulamaya devam edebilmek için konumunuz açık ve uygulamaya izin verilmiş olmalı.',
                        [

                            {
                                text: 'Ayarlara git',
                                onPress: () => Linking.openSettings(),
                                style: 'default'
                            },
                        ]
                    );
                });
            } else {
                console.log("Camera jnjnjnjnk denied");
            }
        } catch (err) {
            console.warn(err);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image style={{ flex: 1, zIndex: 0, position: "absolute" }} source={require('../assets/background.png')} />
            <View style={styles.imageContainer}>
                <Image style={{ width: 300, height: 300 }} source={require('../assets/logo.png')} />
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    imageContainer: {
        width: width,
        height: height,
        justifyContent: "center",
        alignItems: "center"
    }
})
export { SplashScreen }