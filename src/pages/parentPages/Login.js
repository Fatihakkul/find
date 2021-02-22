import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, View, Text, Pressable, StatusBar, Alert, Button, ActivityIndicator,Image,Platform } from 'react-native'
import Context from '../../context/store'
import styles from '../../style/parentStyle/LoginStyle'
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import Icon from 'react-native-vector-icons/FontAwesome5'
import jwt_decode from "jwt-decode";
import AsyncStoreage from '@react-native-async-storage/async-storage'
import Axios from 'axios'
import API from "../../data/api"
import COLORS from '../../style/Colors';
import config from "../../../config"
const Login = props => {

  const { state, dispatch } = useContext(Context)
  const [email, setemail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState(null);
  const [loading, setLoading] = useState(false)

  const [code, setCode] = useState('');


  useEffect(() => {
    // initialize the Google SDK

    GoogleSignin.configure({
      webClientId: config.webClientId, // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: false,
      
    //  iosClientId : "783909948454-vce8srv251fdklj1rvp9g1pdmnukjg9s.apps.googleusercontent.com"
    });
  }, []);

  const emailSignin =()=>{
    props.navigation.navigate("Register")
  }
 
  async function onFacebookButtonPress() {
    // Attempt login with permissions
    if (Platform.OS === "android") {
      // LoginManager.setLoginBehavior("web_only")
      LoginManager.setLoginBehavior("web_only")
      }
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']).catch(err=>console.log(err,"err"))

    if (result.isCancelled) {
      
      throw 'User cancelled the login process';
    }
    console.log(result,"sre")
    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken().catch(err=>console.log(err,"errr"))

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken)

    console.log(data.accessToken, " -", facebookCredential)
    let responseUser = await Axios.get('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + data.accessToken)
    
    let responsePost = await Axios.post(API.base_url + API.signupsignin,
      {
        type: 1,
        email: responseUser.data.email,
        name: responseUser.data.name
      })
      console.log(responsePost, "userdata")
    if (responsePost.data.responseStatus === 200) {
      const decoded = jwt_decode(responsePost.data.data.response)
      dispatch({  type: "SET_TYPE" , tip : responsePost.data.data.type})
      dispatch({  type: "SET_USER", user: decoded })
      dispatch({  type: "SET_TOKEN", token: responsePost.data.data.response })
      console.log(responsePost.data.data.type)
      
      AsyncStoreage.setItem("@TYPE", "1")
      if(responsePost.data.data.type === 1) {
        AsyncStoreage.setItem("@TOKEN", responsePost.data.data.response)
        //AsyncStoreage.setItem("@TYPE", response.data.data.type.toString())
      }
      props.navigation.navigate('bottomTab')
      setLoading(false)
     
    } else {
      Alert.alert("Bir hata oluştu")
    }

    return auth().signInWithCredential(facebookCredential);
  }

  async function onGoogleButtonPress() {
    setLoading(true)
    // Get the users ID token
    const data = await GoogleSignin.signIn().catch(err=>{
      if(err){
        console.log(err,"err")
        setLoading(false)
      }
    })
    console.log(data)
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(data.idToken);
    console.log(googleCredential, "google")
    // // Sign-in the user with the credential

    let response = await Axios.post("https://wherismykid.herokuapp.com/api/auth/signupsignin",
      {
        type: 0,
        email: data.user.email,
        name: data.user.name
      })
     
    console.log("desire")
    console.log(response.data, "response")
    if (response.data.responseStatus === 200) {
      const decoded = jwt_decode(response.data.data.response)
      dispatch({  type: "SET_TYPE" , tip : response.data.data.type})
      dispatch({  type: "SET_USER", user: decoded })
      dispatch({  type: "SET_TOKEN", token: response.data.data.response })
      console.log(response.data.data.type)
      
      AsyncStoreage.setItem("@TYPE", "1")
      if(response.data.data.type === 1) {
        AsyncStoreage.setItem("@TOKEN", response.data.data.response)
        //AsyncStoreage.setItem("@TYPE", response.data.data.type.toString())
      }
      setLoading(false)
      props.navigation.navigate('bottomTab')

    } else {
      Alert.alert("Bir hata oluştu")
    }
  //  return auth().signInWithCredential(googleCredential);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={COLORS.lightGreen} />
      {loading ?

        <ActivityIndicator size="large" color={COLORS.primary} />
        :
        <View style={styles.container}>
          <View>
            <Image style={{width:400,height:300,marginBottom:20}}  source={require("../../assets/Family.png")} />
          </View>
          <Pressable onPress={onGoogleButtonPress}>
            <View style={[styles.googleLogin,{borderColor : COLORS.red,borderWidth:2}]}>
              <Icon name="google" color={COLORS.red} size={25} style={{ position: "absolute", left: 10 }} />
              <Text style={[styles.title,{color  : COLORS.red}]}>Google ile giriş yap</Text>
            </View>
          </Pressable>

          <Pressable onPress={onFacebookButtonPress}>
            <View style={[styles.googleLogin,{borderColor:COLORS.facebookBlue, borderWidth:2} ]} >
              <Icon name="facebook" color={COLORS.facebookBlue} size={25} style={{ position: "absolute", left: 10 }} />
              <Text style={[styles.title,{color : COLORS.facebookBlue}]}>Facebook ile giriş yap</Text>
            </View>
          </Pressable>

          <Pressable onPress={emailSignin}>
            <View style={[styles.googleLogin,{borderColor:COLORS.primary ,borderWidth:2}]} >
              <Icon name="sms" color={COLORS.primary} size={25} style={{ position: "absolute", left: 10 }} />
              <Text style={[styles.title,{color : COLORS.primary}]}>Email ile giriş yap</Text>
            </View>
          </Pressable>

        </View>
      }
    </SafeAreaView>
  )
}
export { Login }