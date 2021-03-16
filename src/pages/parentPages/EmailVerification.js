import React, { useState ,useContext , useEffect} from 'react'
import { SafeAreaView, View, Text, StyleSheet, Dimensions, TextInput, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import COLORS from '../../style/Colors'
import Axios from "axios"
import Context from "../../context/store"
import API from "../../data/api"
import strings from '../../strings'
import jwt_decode from "jwt-decode"
import AsyncStoreage from "@react-native-async-storage/async-storage"


const { width, height } = Dimensions.get("window")

const EmailVerification = props => {

    
    const [code, setCode] = useState("")
    const [loading , setLoading ] = useState(false)
    const user = props.route.params.item
    const {state,dispatch}=useContext(Context)


   

    const login = async () => {

        setLoading(true)

        let responsePost = await Axios.post(API.base_url + API.signupsignin,
            {
                type: user.type,
                email: user.email,
                password: user.password,
                pushToken: user.pushToken
            }).catch(err=>{
                console.log("err")
                console.log(err)
                alert(strings.error)
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
        if(code != ""){
            const decoded = jwt_decode(state.token)
            if(code === decoded.code.toString()){
                login()
            }
        }else   
            alert(strings.error)
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={{ alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                    <Image
                        source={require("../../assets/Family.png")}
                        style={{ width: width, height: 300 }}
                    />
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Enter your code"
                            value={code}
                            onChangeText={(t)=>setCode(t)}
                        />
                    </View>
                  {loading ?
                  
                    <ActivityIndicator color={COLORS.white} size="large" />
                  :<TouchableOpacity onPress={signIn} >
                        <View style={styles.button}>
                            <Text style={styles.title}>{strings.validateCode}</Text>
                        </View>
                    </TouchableOpacity>}
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
export { EmailVerification }