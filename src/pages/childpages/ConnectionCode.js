  import React, { useEffect, useState, useContext, version } from 'react'
  import { SafeAreaView, View, Text, Pressable, ImageBackground, PermissionsAndroid, Keyboard,Linking, Dimensions, Image, TextInput, Platform, StatusBar } from 'react-native'
  import Axios from 'axios'
  import Geolocation from '@react-native-community/geolocation'
  import Context from '../../context/store'
  import { BorderBlueButton } from '../../components'
  import styles from '../../style/parentStyle/connectionCodeStyle'
  import COLORS from '../../style/Colors'
  import jwtDecode from 'jwt-decode'
  import AsyncStorage from '@react-native-async-storage/async-storage'
  import Modal from 'react-native-modal'
  import QRCodeScanner from 'react-native-qrcode-scanner';
  import * as Animatable from 'react-native-animatable';
  import Icon from "react-native-vector-icons/Ionicons"
  import { RNCamera } from 'react-native-camera';


  const width = Dimensions.get("window").width

  const ConnectionCode = props => {



    const [keyboardShown,setKeyboardShown] = useState(false)
    const [visible, setVisible] = useState(false)
    const [code, setCode] = useState("")
    const { state, dispatch } = useContext(Context)
    const sendSMS = async () => {
      Linking.openURL('smsto:' + undefined + `?body=${code}`);
    }
    const onSuccess = e => {
      console.log(e.data)
      setVisible(false)
    };

    useEffect(() => {
      getLocation()
      Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
  
      // cleanup function
      return () => {
        Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
      }
    }, [])

    const _keyboardDidShow = () => {
    //  alert("Keyboard Shown");
    setKeyboardShown(true)
    };
  
    const _keyboardDidHide = () => {
   //   alert("Keyboard Hidden");
      setKeyboardShown(false)
    };

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
        if (granted) {
          //  Geolocation.watchPosition(position => {
          //     //   const lastPosition = JSON.stringify(position);
          //     //  setPosition(lastPosition)
          //   //   console.log(lastPosition ,"last")
          //     })

          Geolocation.getCurrentPosition(info => {
            console.log(info)
            dispatch({ type: "SET_POSITION", position: info.coords })
          },(err)=>{
            console.log("error" , err)
           // alert("Lütfen konum bilgilerinizi açın")
          });
        } else {
          console.log("Camera permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
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
        setVisible(false)
        dispatch({ type: "SET_USER", user: decoded })
        dispatch({ type: "SET_TOKEN", token: response.data.data.response })
        AsyncStorage.setItem("@CHILDTOKEN", response.data.data.response)
        props.navigation.navigate("home")

      }
    }
    const connect=async()=>{
      let response = await Axios.post('https://wherismykid.herokuapp.com/api/children/childrenlogin', {
        code: parseInt(code) 
      }).catch(err => console.log(err, "err"))

      if (response.data.responseStatus === 200) {
        const decoded = jwtDecode(response.data.data.response)
        console.log(response.data.data.response ,"okeee")
        getFamily(decoded.data[0].parentId)
        setVisible(false)
        dispatch({ type: "SET_USER", user: decoded })
        dispatch({ type: "SET_TOKEN", token: response.data.data.response })
        AsyncStorage.setItem("@CHILDTOKEN", response.data.data.response)
        props.navigation.navigate("home")

      }
    }
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={COLORS.primary} />
        <View style={styles.codeContainer}>
          <Image style={{ width: 200, height: 200 }} source={require('../../assets/Childanime.png')} />
          <View style={{ backgroundColor: COLORS.white, width: 200, height: 40, marginTop: 30,marginBottom:40 }}>
            <TextInput
              placeholder="Kodu giriniz"
              value={code}
              onChangeText={(text) => setCode(text)}
              style={{ width: 200 }}
            />
          </View>
        </View>
        <View style={{marginBottom:40}}>
          <Text style={{color : COLORS.white , fontSize : 18,fontWeight:"bold",letterSpacing:1}}>VEYA</Text>
        </View>
        <Pressable onPress={() => props.navigation.navigate("QR")}>
          <View style={{ width: 180, paddingVertical: 10, borderColor: COLORS.white, borderWidth: 2, borderRadius: 15, alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
            <Icon name="qr-code-outline" size={25} color={COLORS.white} />
            <Text style={{ fontSize: 16, fontWeight: "bold", color: COLORS.white, letterSpacing: 1, marginLeft: 20 }}>QR TARA</Text>
          </View>
        </Pressable>

       
       
            
        {
          code != "" ? 
          <View style={{position:"absolute",bottom:keyboardShown ? -100 : 40,right:20}}>
            <Pressable onPress={connect}>
              <View style={{width:50,height:50,borderRadius:25,backgroundColor:COLORS.white , alignItems:"center",justifyContent:"center"}}>
                <Icon name="chevron-forward-outline" />
              </View>
            </Pressable>
          </View>
          : 
          null
        }
  
      
      </SafeAreaView>
    )
  }
  export { ConnectionCode }