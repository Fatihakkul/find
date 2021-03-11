import React, { useState, useContext, useEffect } from 'react'
import {
    SafeAreaView,
    View,
    Text,
    Pressable,
    FlatList,
    TouchableOpacity,
    Dimensions,
    Image,
    StatusBar,
    PermissionsAndroid,
    BackHandler,
    Linking,
    Platform,
    ActivityIndicator
} from 'react-native'
import {
    RTCPeerConnection,
    RTCIceCandidate,
    RTCSessionDescription,
    RTCView,
    MediaStream,
    MediaStreamTrack,
    mediaDevices,
    registerGlobals
} from 'react-native-webrtc';
import Context from '../../context/store'
import styles from '../../style/childStyle/HomeStyle'
import Icons from 'react-native-vector-icons/Ionicons'
import Icon from "react-native-vector-icons/FontAwesome5"
import { ChildMessageModal, MyCustomMarker } from '../../components'
import MapView, { Marker } from 'react-native-maps'
import COLORS from '../../style/Colors'
import Axios from 'axios'
import Geolocation from "@react-native-community/geolocation"
import DeviceInfo from "react-native-device-info"
import { socketClient } from "../../socket/socket"
import BackgroundJob from 'react-native-background-actions';
import API from "../../data/api"
import Sound from "react-native-sound"
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from "moment";
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import {isPointWithinRadius} from "geolib"
import RNSwitchAudioOutput from "react-native-switch-audio-output"
import strings from '../../strings';



let isFront = true
let error = false
let childName = "";

let areaList = [];
const pc_config = {
    "iceServers": [
        // {
        //   urls: 'stun:[STUN_IP]:[PORT]',
        //   'credentials': '[YOR CREDENTIALS]',
        //   'username': '[USERNAME]'
        // },
        {
            urls: 'stun:stun.l.google.com:19302'
        }
    ]
}
const constraints = {
    audio: true,
    video: {
        mandatory: {
            minWidth: 500, // Provide your own width, height and frame rate here
            minHeight: 300,
            minFrameRate: 30
        }

    }
    
}
const sdpConstraints = {
    "mandatory": {
        "OfferToReceiveAudio": true,
        "OfferToReceiveVideo": true
    }
}

let childId = null
let parentId = null
const device = new RTCPeerConnection(pc_config)

mediaDevices.enumerateDevices().then(sourceInfos => {
    // console.log(sourceInfos);
    let videoSourceId;
    for (let i = 0; i < sourceInfos.length; i++) {
        const sourceInfo = sourceInfos[i];
        if (sourceInfo.kind == "videoinput" && sourceInfo.facing == (isFront ? "front" : "environment")) {
            videoSourceId = sourceInfo.deviceId;
        }
    }
})
const local = mediaDevices.getUserMedia(constraints).then(stream => {
    // console.log(stream, "background stream")


    device.addStream(stream)
    return stream
    //local stream
})

let uniqueId = null
const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));
let count = 0
const createAnswer = () => {

    device.createAnswer(sdpConstraints).then(sdp => {
        console.log(sdp, "create answer")
        device.setLocalDescription(sdp)
        socketRequest("offerOranswer", sdp, "answer")
        //senderuuid childuuid
        //receiveruuid parentuuid

    })


}
const socketRequest = (type, payload, tip) => {
    socketClient.emit(type, {
        socketID: socketClient.id,
        payload,
        type: tip,
        uniqueId: parentId,
    })
}
device.onicecandidate = (e) => {
    if (e.candidate) {
        //   console.log(e.candidate)
        socketRequest("candidate", e.candidate, "candidate")
        // canidate emit yapılacak
        // local : this.socket.id,
        // remote : socketID
    }
}
device.oniceconnectionstatechange = (e) => {
    //   console.log(e)
}
device.onaddstream = (e) => {
    //  console.log(e.stream, "streeemmmm")

}
let current = null

const setRemoteDescription = (desc) => {

    device.setRemoteDescription(new RTCSessionDescription(desc))
}
const mySound = new Sound("my_sound.mp3", Sound.MAIN_BUNDLE, (err) => {
    if (err) {
        console.log(err, "error")
        return
    } else {
        console.log("ss")
    }
})

const taskRandom = async taskData => {
    if (Platform.OS === 'ios') {
        console.warn(
            'This task will not keep your app alive in the background by itself, use other library like react-native-track-player that use audio,',
            'geolocalization, etc. to keep your app alive in the background while you excute the JS from this library.',
        );
    }
    await new Promise(async resolve => {
        // For loop with a delay

        const { delay } = taskData;
        for (let i = 0; BackgroundJob.isRunning(); i++) {
            const level = await DeviceInfo.getBatteryLevel()
            //SoundPlayer.loadUrl("http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3")
            //=====>>>>> sound player ekleyince uygulama backgroundda çalışmıyor

         //   console.log("background")
            
        
          //  console.log(current)
            Geolocation.getCurrentPosition(async success => {
             //   const konum = geolib.isPointWithinRadius({latitude : success.coords.latitude , longitude : success.coords.longitude} , sdfsdf, 10 )
                for (let i = 0; i < areaList.length; i++) {
                    console.log("merhaba")
                    const element = areaList[i];
                    if(current ===true && isPointWithinRadius({latitude : success.coords.latitude , longitude : success.coords.longitude} , {latitude : element.latitude,longitude : element.longitude}, 10) === false ){
                       // console.log(`${element.name} çıktı `)
                        
                        let response = await Axios.post(API.base_url + API.push_notification_child,{
                            parentUniqueId : parentId,
                            title : childName,
                            message : `${element.name} geldi` 
                        })
                     //   console.log(response, "post response ======")
                    }
                    if(current === false && isPointWithinRadius({latitude : success.coords.latitude , longitude : success.coords.longitude} , {latitude : element.latitude,longitude : element.longitude}, 10) === true){
                     //   console.log("alana girdi")
                        let response = await Axios.post(API.base_url + API.push_notification_child,{
                            parentUniqueId : parentId,
                            title : childName,
                            message : `${element.name} çıktı` 
                        })
                    //    console.log(response, "post response >>>>======")
                    }

                    current = isPointWithinRadius({latitude : success.coords.latitude , longitude : success.coords.longitude} , {latitude : element.latitude,longitude : element.longitude}, 10)

                   // console.log( "konummmm======>>>>",areaList.length >0 ? isPointWithinRadius({latitude : success.coords.latitude , longitude : success.coords.longitude} , {latitude : element.latitude,longitude : element.longitude}, 10) : "Area gelmedi====")
                    
                }

                socketClient.emit("live_location", {
                    location: { latitude: success.coords.latitude, longitude: success.coords.longitude },
                    uniqueId: childId,
                    parentUniqueId: parentId,
                    level: level
                })
            }, (err) => {
                console.log(err)


            }, {
                enableHighAccuracy: false,
                timeout: 2000
            })


            

            // console.log("merhaba", device)
            //   socketClient.on('connection-success', (user) => {
            //     console.log(user)
            //   })
            socketClient.on("new_sos", (data) => {
                RNSwitchAudioOutput.selectAudioOutput(RNSwitchAudioOutput.AUDIO_SPEAKER);
                console.log(data, "new sosssssss-----------------")
                mySound.play()
                //alert("errorrrrr")
            })
            socketClient.on('offerOranswer', (sdp) => {
                //  console.log(sdp.childUniqueId, "=======SDP")

                setRemoteDescription(sdp.payload)
                createAnswer()

            })



            socketClient.on('candidate', (candidate) => {
                //  console.log(candidate.childUniqueId, "Candidate______________")

                device.addIceCandidate(new RTCIceCandidate(candidate.payload)).then(() => {
                    // createAnswer()
                })

            })


            await sleep(delay);
        }
    });
};

const options = {
    taskName: strings.activeLocation,
    taskTitle: strings.activeLocation,
    taskDesc: strings.childNotificationBody,
    taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: "whatsapp://send?text=" + "asdasd" + "&phone=91" + "234234",
    parameters: {
        delay: 5000,
    },
};


function handleOpenURL(evt) {
    //Linking.openURL("whatsapp://send?text=" +"asdasd"+"&phone=91" +"234234")  
    //  console.log(evt.url, "asdasd");
    // do something with the url


}

///Linking.addEventListener('com.findmyfamily', handleOpenURL);


const HomeChild = props => {

    const { state, dispatch } = useContext(Context)
    const [arr, setArr] = useState([])
    const [visible, setVisible] = useState(false)


    const consoleMethod = () => {
        setVisible(!visible)
    }


    useEffect(()=>{
        const unsubscribe = props.navigation.addListener('focus', () => {
            Notifications.setNotificationHandler({
                handleNotification: async () => {
                  return {
                    shouldShowAlert: true,
                    shouldPlaySound : true
                  }
                }
              })
        });
    },[])

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
                return Notifications.getExpoPushTokenAsync(Platform.OS === "android" ? { experienceId: '@fatihakkul/finmyfamily' } :{ experienceId: '@findmyfamily/finmyfamily' });
            })
            .then((data) => {
                console.log('PUSHHH TOKENN', data)
            })
            .catch((err) => {
                console.log(err)
            })
        // socket.on('notification', (data) => {
        //     triggerNotificationHandler(data.title, data.message)
        // })

    }, []);

    useEffect(() => {
        
        const backgroundSubscription = Notifications.addNotificationResponseReceivedListener((response) => {
            console.log(response)
        })

        const foregoundSubscription = Notifications.addNotificationReceivedListener((notif) => {
            console.log(notif)
        })

        return () => {
            backgroundSubscription.remove();
            foregoundSubscription.remove();
        }
    }, [])



    useEffect(() => {
        if (state.login) {
            childName = state.user.data[0].name
            childId = state.user.data[0].uniqueId
            parentId = state.family[0].parent.uniqueId
        }
    }, [state.login])

    useEffect(() => {

        // let response = await Axios.post(API.base_url + API.getLocation, {
        //     childrenId: child.id,
        // }, {
        //     headers: {
        //         'Authorization': `bearer ${state.token}`
        //     }
        // })
        // getFamily()


        console.log(state.token , "tokennnnn")
        getChild()
        setArr(state.message)
       BackgroundJob.start(taskRandom, options)
        // uniqueId=state.user.data[0].uniqueId
        socketClient.on("user_connected", (data) => {
            console.log(data, "userConnect")

        })
        socketClient.emit("user_connected", {
            role: "child",
            id: state.user.data[0].id,
            uniqueId: state.user.data[0].uniqueId
        })


        // setInterval(() => {
        //     //  console.log("merhs") 
        //     Geolocation.getCurrentPosition(success => {
        //         // console.log(success, state.user.data[0].uniqueId, state.family[0].parent.uniqueId, "loaction child >>>>>>>>><<<<<<<<<<")
        //         socketClient.emit("live_location", {
        //             location: { latitude: success.coords.latitude, longitude: success.coords.longitude },
        //             uniqueId: state.user.data[0].uniqueId,
        //             parentUniqueId: state.family[0].parent.uniqueId
        //         })
        //     })
        // }, 5000);

        getArea()
    }, [])


    const getArea =async()=>{
        let response = await Axios.post(API.base_url + API.getLocation, {
            childrenId: state.user.data[0].id,
        }, {
            headers: {
                'Authorization': `bearer ${state.token}`
            }
        })
        areaList = response.data.data.response[0].addresses
        console.log(response.data.data.response[0].addresses  , " <<<<<<<<<========")
        dispatch({ type: "ADD_AREA", get: response.data.data.response[0].addresses })
        

    }

    const getChild = async () => {
        let response = await Axios.post(API.base_url + API.get_user, {
            role: "children",
            id: state.user.data[0].id
        })
        console.log(response, "children")
    }

    const renderList = ({ item }) => {
        return (
            <Pressable onPress={() => props.navigation.navigate('chatchild', { send: item })}>
                <View style={styles.message}>
                    <Text style={{ color: COLORS.mor, fontSize: 18, fontWeight: "bold" }}>{item}</Text>
                </View>
            </Pressable>
        )
    }






    return (

        <SafeAreaView style={{ flex: 1 }}>
            {  state.login ?
                <View style={{ flex: 1 }}>


                    <StatusBar backgroundColor={COLORS.primary} />
                    {
                        state.position != null ?
                            <View style={{ position: "absolute" }}>


                                <MapView

                                    style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
                                    initialRegion={{
                                        latitude: state.position != null ? state.position.latitude : 47.516232,
                                        longitude: state.position != null ? state.position.longitude :14.550072,
                                        latitudeDelta: state.position != null ? 0.0022 : 100,
                                        longitudeDelta: state.position != null ? 0.0021 : 200,
                                        //buraya itemın lat ve long değerleri gelecek
                                    }}


                                >
                                    {state.position != null ?
                                        <Marker
                                            coordinate={{
                                                latitude: state.position.latitude,
                                                longitude: state.position.longitude,
                                            }}


                                        >
                                            <MyCustomMarker item={state.user.data[0]} />
                                        </Marker>
                                        :
                                        null

                                    }
                                </MapView>
                            </View>
                            : null
                    }

                    <View style={styles.container}>
                        <ChildMessageModal isVisible={visible} cancel={() => setVisible(!visible)} onBackdropPress={() => setVisible(!visible)} />

                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, marginBottom: 10 }}>
                            <Pressable onPress={consoleMethod}>
                                <View
                                    style={{
                                        backgroundColor: COLORS.transparentWhite,
                                        width: 45,
                                        height: 40,
                                        borderRadius: 10,
                                        borderWidth: 1,
                                        borderColor: COLORS.mor,
                                        left: 10,
                                        // right : 30,
                                        // top : 30,
                                        alignItems: "center",
                                        justifyContent: "center"

                                    }}>
                                    <Icons name="add" color={COLORS.mor} size={30} />

                                </View>
                            </Pressable>
                        </View>

                        <FlatList
                            data={arr}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={renderList}
                            contentContainerStyle={{
                                marginLeft: 10,
                                padding: 5
                            }}
                            numColumns={2}

                        />

                        <Pressable style={{ position: "absolute", left: 85, top: 15 }} onPress={() => props.navigation.navigate('soschild')}>
                            <View style={styles.sosContainer}>
                                <Image style={{ width: 65, height: 66 }} source={require('../../assets/SOS.png')} />
                            </View>
                        </Pressable>

                    </View>
                </View>
                :
                <ActivityIndicator color={COLORS.primary} size={25} />

            }
        </SafeAreaView>
    )
}
export { HomeChild }