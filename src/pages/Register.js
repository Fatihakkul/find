import React, { useState, useEffect, useContext } from 'react'
import { SafeAreaView, View, Text, StyleSheet, Dimensions, TextInput, Image, TouchableOpacity, Alert, ActivityIndicator, ScrollView, KeyboardAvoidingView } from 'react-native'
import COLORS from '../style/Colors'
import Axios from "axios"
import API from "../data/api"
import strings from '../strings'

import AsyncStoreage from "@react-native-async-storage/async-storage"

import jwt_decode from "jwt-decode";
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

import Context from "../context/store"

const { width, height } = Dimensions.get("window")

const Register = props => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordAgain, setPasswordAgain] = useState("")
    const [name, setName] = useState("")
    const [visible, setVisible] = useState(false)
    const [pushTokenUser, setPushTokenUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const { state, dispatch } = useContext(Context)

    useEffect(() => {
        Permissions.getAsync(Permissions.NOTIFICATIONS).then((statusObj) => {
            if (statusObj.status !== 'granted') {
                return Permissions.askAsync(Permissions.NOTIFICATIONS)
            }
            return statusObj;

        })
            .then((statusObj) => {
                if (statusObj.status !== 'granted') {
                    throw new Error('Permission not granted qsdqwd')
                }
            })
            .then(() => {
                return Notifications.getExpoPushTokenAsync(Platform.OS === "android" ? { experienceId: '@fatihakkul/finmyfamily' } : { experienceId: '@findmyfamily/finmyfamily' });
            })
            .then((data) => {
                setPushTokenUser(data.data)
                console.log('PUSHHH TOKENN', data)
            })
            .catch((err) => {
                console.log(err)
            })
        // socket.on('notification', (data) => {
        //     triggerNotificationHandler(data.title, data.message)
        // })

    }, []);

    const validate = (text) => {

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {


            return false;
        }
        else {

            return true
        }
    }

    //email login type 

    const signin = async () => {
        setLoading(true)
        let responsePost = await Axios.post(API.base_url + API.signupsignin,
            {
                type: 2,
                email: email,
                name: name,
                password: password,
                pushToken: pushTokenUser
            }).catch(err => {
                alert(strings.error)
                setLoading(false)
            })
        console.log(responsePost.data, "userdata")
        if (responsePost.data.responseStatus === 200) {

            const decoded = jwt_decode(responsePost.data.data.response)
            dispatch({ type: "SET_TYPE", tip: responsePost.data.data.type })
            dispatch({ type: "SET_USER", user: decoded })
            dispatch({ type: "SET_TOKEN", token: responsePost.data.data.response })
            console.log(responsePost.data.data.type)

            AsyncStoreage.setItem("@TYPE", "1")
            if (responsePost.data.data.type === 1) {
                AsyncStoreage.setItem("@TOKEN", responsePost.data.data.response)
                AsyncStoreage.setItem("@TYPE", response.data.data.type.toString())
            }
            setLoading(false)
            props.navigation.navigate('EmailVerification', { item: { pushTokenUser: pushTokenUser, email: email, password: password, type: 3 } })
        }

    }
    const login = async () => {

        setLoading(true)

        let responsePost = await Axios.post(API.base_url + API.signupsignin,
            {
                type: 3,
                email: email,
                password: password,
                pushToken: pushTokenUser
            }).catch(err => {
                console.log("err")
                console.log(err)
                alert(strings.noUser)
                setLoading(false)
            })

        console.log(responsePost)
        if (responsePost.data.responseStatus === 200) {
            console.log("1")
            const decoded = jwt_decode(responsePost.data.data.response)
            dispatch({ type: "SET_TYPE", tip: 1 })
            dispatch({ type: "SET_USER", user: decoded })
            dispatch({ type: "SET_TOKEN", token: responsePost.data.data.response })

            AsyncStoreage.setItem("@TYPE", "1")
            if (responsePost.data.data.type === 1) {
                console.log("2")
                AsyncStoreage.setItem("@TOKEN", responsePost.data.data.response)
                AsyncStoreage.setItem("@TYPE", responsePost.data.data.type.toString())
            }
            props.navigation.navigate('bottomTab')
        }
        setLoading(false)

    }

    const signIn = async () => {
        console.log(visible)

        if (email.length !== 0) {
            if (validate(email)) {
                if (password.length !== 0) {
                    if (visible === true) {
                        if (passwordAgain.length !== 0) {
                            if (password === passwordAgain) {


                                console.log("giriş")
                                signin()



                            } else alert(strings.notPassword)
                        } else alert(strings.passwordAgain)
                    } else {
                        login()
                        //  props.navigation.navigate('EmailVerification')
                    }
                } else alert(strings.password)
            } else alert(strings.validEmail)
        } else alert(strings.email)
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100} style={{ flex: 1, backgroundColor: COLORS.lightGreen }} >
                <View style={styles.container}>


                    <View style={{ alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                        <Image
                            source={require("../assets/Family.png")}
                            style={{ width: width, height: 300 }}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder={strings.email}
                            keyboardType="email-address"
                            onChangeText={(text) => setEmail(text)}
                        />
                    </View>
                    {visible ?
                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder="İsim giriniz"
                                secureTextEntry={false}
                                onChangeText={(text) => setName(text)}
                            />
                        </View>

                        : null
                    }
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder={strings.password}
                            secureTextEntry={true}
                            onChangeText={(text) => setPassword(text)}
                        />
                    </View>


                    {visible ?
                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder={strings.passwordAgain}
                                secureTextEntry={true}
                                onChangeText={(text) => setPasswordAgain(text)}
                            />
                        </View>

                        : null
                    }

                    {loading ?

                        <ActivityIndicator color={COLORS.white} size="large" />
                        :

                        <TouchableOpacity onPress={signIn} >
                            <View style={styles.button}>
                                <Text style={styles.title}>{visible ? strings.Signup : strings.login}</Text>
                            </View>
                        </TouchableOpacity>}
                        <View style={{ width: width * 0.65, marginTop: 20 }}>
                        {visible ?
                            <TouchableOpacity onPress={() => setVisible(!visible)}>
                                  <View style={[styles.button,{marginTop :3}]}>
                                <Text style={{fontSize : 16,fontWeight : "bold"}}> {strings.cancel}</Text>
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => setVisible(!visible)}>
                                <Text> {strings.registerText}</Text>
                            </TouchableOpacity>
                        }

                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGreen,
        alignItems: "center"
    },
    inputContainer: {
        backgroundColor: COLORS.white,
        width: width * 0.7,
        height: 38,
        marginVertical: 10,
        paddingLeft: 10
    },
    button: {
        backgroundColor: COLORS.white,
        width: width * 0.65,
        alignItems: "center",
        paddingVertical: 10,
        borderRadius: 20,
        marginTop: 20
    },
    title: {
        color: COLORS.lightGreen,
        fontSize: 17,
        fontWeight: "bold",

    }
})
export { Register }