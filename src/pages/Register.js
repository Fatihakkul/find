import React, { useState } from 'react'
import { SafeAreaView, View, Text, StyleSheet, Dimensions, TextInput, Image, TouchableOpacity, Alert } from 'react-native'
import COLORS from '../style/Colors'
import Axios from "axios"
import API from "../data/api"

const { width, height } = Dimensions.get("window")

const Register = props => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordAgain, setPasswordAgain] = useState("")
    const [visible, setVisible] = useState(false)

    const validate = (text) => {

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {


            return false;
        }
        else {

            return true
        }
    }

    const signin =async()=>{
         // let responsePost = await Axios.post(API.base_url + API.signupsignin,
                            //   {
                            //     type: 1,
                            //     email: email,
                            //     name: password
                            //   })
                            //   console.log(responsePost, "userdata")
                            // if (responsePost.data.responseStatus === 200) {

                            // //   const decoded = jwt_decode(responsePost.data.data.response)
                            // //   dispatch({  type: "SET_TYPE" , tip : responsePost.data.data.type})
                            // //   dispatch({  type: "SET_USER", user: decoded })
                            // //   dispatch({  type: "SET_TOKEN", token: responsePost.data.data.response })
                            // //   console.log(responsePost.data.data.type)

                            // //   AsyncStoreage.setItem("@TYPE", "1")
                            // //   if(responsePost.data.data.type === 1) {
                            // //     AsyncStoreage.setItem("@TOKEN", responsePost.data.data.response)
                            // //     //AsyncStoreage.setItem("@TYPE", response.data.data.type.toString())
                            // //   }
                            // }

    }

    const signIn = async () => {
        console.log(validate(email))

        if (email.length !== 0) {
            if (validate(email)) {
                if (password.length !== 0) {
                    if(visible){
                    if (passwordAgain.length !== 0) {
                        if (password === passwordAgain) {


                            console.log("giriş")
                           signin()


                        } else alert("şifreler uyuşmuyor")
                    } else alert("şifre tekrar giriniz")
                }else {
                     signin()
                }
                } else alert("şifre giriniz")
            } else alert("geçerli bir email giriniz")
        } else alert("email giriniz")
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={{ alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                    <Image
                        source={require("../assets/Family.png")}
                        style={{ width: width, height: 300 }}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Email giriniz"
                        keyboardType="email-address"
                        onChangeText={(text) => setEmail(text)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Şifre giriniz"
                        secureTextEntry={true}
                        onChangeText={(text) => setPassword(text)}
                    />
                </View>
                {visible ?
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Şifre tekrar"
                            secureTextEntry={true}
                            onChangeText={(text) => setPasswordAgain(text)}
                        />
                    </View>
                    : null
                }

                <TouchableOpacity onPress={signIn} >
                    <View style={styles.button}>
                        <Text style={styles.title}>Giriş Yap</Text>
                    </View>
                </TouchableOpacity>
                <View style={{ width: width * 0.65, marginTop: 20 }}>
                    <TouchableOpacity onPress={() =>setVisible(!visible)}>
                        <Text>Üye değil misin ? Kayıt Ol</Text>
                    </TouchableOpacity>

                </View>
            </View>
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