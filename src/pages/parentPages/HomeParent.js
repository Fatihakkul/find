import React, { useEffect, useContext, useRef, useState } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  Dimensions,
  PermissionsAndroid,
  FlatList,
  Platform,
  ActivityIndicator,
  Image,
  ScrollView,
  Alert,
  Linking
} from 'react-native'
import {
  ChildHistoryModal,
  Header,
  MyCustomMarker,
  ListenModal
} from '../../components'
import MapView, { Marker, Polyline } from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation';
import Context from '../../context/store'
import AsyncStoreage from '@react-native-async-storage/async-storage'
import styles from '../../style/parentStyle/HomeParentStyle'
import Icons from 'react-native-vector-icons/FontAwesome5'
import Icon from 'react-native-vector-icons/Ionicons'
import Colors from '../../style/Colors'
import customStyle from '../../style/MapCustomStyle'
import COLORS from '../../style/Colors';
import { socketClient } from '../../socket/socket';
import DeviceInfo from "react-native-device-info"
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
  registerGlobals,
  RTCSessionDescriptionType
} from 'react-native-webrtc';
import Axios from "axios"
import API from "../../data/api"
import Sound from "react-native-sound"
import BackgroundJob from "react-native-background-actions"
import strings from "../../strings"


import geolib from "geolib"
import { useRoute} from "@react-navigation/native"
import * as Notifications from "expo-notifications"
 





const { width, height } = Dimensions.get('window')
const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));

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

      socketClient.on('new_sos', (sos) => {
        mySound.play()
      })
      await sleep(2000);
    }
  });
};

const options = {
  taskName: 'Konum belirleme',
  taskTitle: 'Konum Belirleme Aktif',
  taskDesc: 'Ailenin seni görebilmesi için konum bilgilerin alınıyor...',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: '#ff00ff',
  linkingURI: "whatsapp://send?text=" + "asdasd" + "&phone=91" + "234234",
  parameters: {
    delay: 50000,
  },
};


function handleOpenURL(evt) {
  //Linking.openURL("whatsapp://send?text=" +"asdasd"+"&phone=91" +"234234")  
  //  console.log(evt.url, "asdasd");
  // do something with the url


}

///Linking.addEventListener('com.findmyfamily', handleOpenURL);





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



let device = new RTCPeerConnection(pc_config)
const HomeParent = props => {

  const history = [{ time: "16:30", notification: "sadasd" }, { time: "16:30", notification: "sadasd" }, { time: "16:30", notification: "sadasd" }, { time: "17:30", notification: "sadasd" }, { time: "16:30", notification: "sadasd" }, { time: "16:30", notification: "sadasd" },]
  
  const mapRef = useRef(null)
  const { state, dispatch } = useContext(Context)
  const [batteryLevel, setBatteryLevel] = useState("")
  const [uniqueId, setUniqueId] = useState(state.type === 1 ? state.user.userData[0].family.parents[0].uniqueId : state.user.parentData.uniqueId)
  const [childArray, setChildArray] = useState([])
  const [data, setData] = useState([])
  const [location, setLocation] = useState(null)
  const [visible, setVisible] = useState(false)
  const [childIndex, setChildIndex] = useState()
  const [choosed, setChoosed] = useState()
  const [listenVisible, setListenVisible] = useState(false)
  const [locationHistory, setLocationHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const route = useRoute()

  let isFront = true


  useEffect(() => { }, [locationHistory])
  useEffect(() => { }, [location])

  const parentUniqueId = state.type === 1 ? state.user.userData[0].family.parents[0].uniqueId : state.user.parentData.id.uniqueId





  useEffect(() => {
    getLocation()
    BackgroundJob.start(taskRandom, options)
    getFamily()

    socketClient.emit("user_connected", {
      role: "parent",
      id: state.type === 1 ? state.user.userData[0].family.parents[0].id : state.user.parentData.id,
      uniqueId: state.type === 1 ? state.user.userData[0].family.parents[0].uniqueId : state.user.parentData.id.uniqueId
    })
    socketClient.on("user_connected", (data) => {
      console.log(data, "userConnect")

    })


    mediaDevices.enumerateDevices().then(sourceInfos => {
      let videoSourceId;
      for (let i = 0; i < sourceInfos.length; i++) {
        const sourceInfo = sourceInfos[i];
        if (sourceInfo.kind == "videoinput" && sourceInfo.facing == (isFront ? "front" : "environment")) {
          videoSourceId = sourceInfo.deviceId;
        }
      }
    })


    mediaDevices.getUserMedia(constraints).then(stream => {

      device.addStream(stream)
      return stream
      //local stream
    })

    socketClient.on('offerOranswer', (sdp) => {
      device.setRemoteDescription(new RTCSessionDescription(sdp.payload))
    })

    socketClient.on('candidate', (candidate) => {
      device.addIceCandidate(new RTCIceCandidate(candidate.payload)).then(() => {

      })
    })

    device.onicecandidate = (e) => {
      if (e.candidate) {

        socketClient.emit('candidate', {
          socketID: socketClient.id,
          payload: e.candidate,
          type: "candidate",
          uniqueId: choosed.uniqueId
        })

      }
    }
    device.oniceconnectionstatechange = (e) => {
      console.log(e)
    }
    device.onaddstream = (e) => {
      console.log(e.stream, "streeemmmm")

    }



    state.family[0] != undefined ? setChoosed(state.family[0]) : setChoosed(null)
    state.family[0] != undefined ? setChildIndex(0) : setChildIndex(-1)
    AsyncStoreage.getItem("@TOKEN").then((data) => {
    })





    setTimeout(() => {
      if (location === null) {
        setLocation({
          location: {
            latitude: 40.995167,
            longitude: 28.8238265
          }
        })
      }
    }, 5000);



    socketClient.on("new_position", (data) => {
      dispatch({ type: "SET_LOCATION", location: data })
      setLocation(data)
      setBatteryLevel(data.level === 0.5 ? "50" : data.level.toString().substring(2, 4))
    })

    setInterval(() => {
      if (data.location != null) {
        mapRef.current.animateToRegion({ latitude: data.location.latitude, longitude: data.location.longitude, latitudeDelta: 0.002, longitudeDelta: 0.002 }, 2000)
      }
    }, 10000);

  }, [listenVisible])


  const createAnswer = () => {
    device.createAnswer(sdpConstraints).then(sdp => {
      // device.setLocalDescription(sdp)
      socketRequest("offerOranswer", sdp, "answer")

    })
  }

  const create = () => {
    setListenVisible(true)
    device.createOffer({ offerToReceiveVideo: 1 })
      .then(sdp => {
        device.setLocalDescription(sdp)
        socketClient.emit('offerOranswer', {
          socketID: socketClient.id,
          payload: sdp,
          type: "offer",
          uniqueId: choosed.uniqueId
        })

      })
  }


  const socketRequest = (type, payload, tip) => {
    socketClient.emit(type, {
      socketID: socketClient.id,
      payload,
      type: tip,
      uniqueId: choosed.uniqueId
    })
  }


  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => {
        return {
          shouldShowAlert: true
        }
      }
  })
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


  const renderEvents = ({ item, index }) => {
    return (
      <View style={{ paddingHorizontal: 20, alignItems: "center", height: 90 }}>
        <View style={index === 0 ? {
          left: 40, top: 70, position: "absolute", width: 80, height: 1,
          borderColor: childIndex % 2 === 1 && childIndex % 3 != 0 ? COLORS.red : childIndex % 3 === 0 ? COLORS.mor : COLORS.primary
          , borderWidth: 1
        } : index === history.length - 1 ? {
          right: 40, top: 70, position: "absolute", width: 80, height: 1,
          borderColor:
            childIndex % 2 === 1 && childIndex % 3 != 0 ? COLORS.red : childIndex % 3 === 0 ? COLORS.mor : COLORS.primary
          , borderWidth: 1
        } : {
              top: 70, position: "absolute", width: 90, height: 1,
              borderColor:
                childIndex % 2 === 1 && childIndex % 3 != 0 ? COLORS.red : childIndex % 3 === 0 ? COLORS.mor : COLORS.primary
              , borderWidth: 1
            }}></View>
        <Text style={{ letterSpacing: 0.5, color: COLORS.transparentBlack }}>{item.notification}</Text>
        <View style={{ padding: 5, backgroundColor: COLORS.transparentBlack, borderRadius: 20, marginTop: 5 }}>
          <Text style={{ fontSize: 10, fontWeight: "bold", color: COLORS.white }}>{choosed.name}</Text>
        </View>
        <View style={{
          width: 30, height: 30, borderRadius: 15, backgroundColor:
            childIndex % 2 === 1 && childIndex % 3 != 0 ? COLORS.red : childIndex % 3 === 0 ? COLORS.mor : COLORS.primary
          , marginTop: 8
        }}>

        </View>


      </View>

    )
  }


  const getFamily = async () => {
    let response = await Axios.post(API.base_url + API.get_family, {
      parentId: state.type === 1 ? state.user.userData[0].family.parents[0].id : state.user.parentData.id
    })
    setChildArray(response.data.data.response)
    dispatch({ type: "SET_FAMILY", family: response.data.data.response })
  }




  const showHistory = () => {

    setVisible(!visible)


  }

  async function getlocationChild(child, i) {
    console.log(child.uniqueId)
    setChildIndex(i)
    setChoosed(child)
    setTimeout(() => {
      mapRef.current.animateToRegion({
        latitude: location.uniqueId != uniqueId && choosed != null && location.uniqueId === choosed.uniqueId ? location.location.latitude : state.position.latitude
        , longitude: location.uniqueId != uniqueId && choosed != null && location.uniqueId === choosed.uniqueId ? location.location.longitude : state.position.longitude
        , latitudeDelta: 0.002, longitudeDelta: 0.002
      }, 2000)
    }, 1000);

    let response = await Axios.post(API.base_url + API.location_history, {
      childUniqueId: child.uniqueId
    })
    console.log(response.data.data.length)
    //setLocationHistory(response.data.data)
    if (response.data.data.length > 0) {
      dispatch({ type: "SET_LOCATIONHISTORY", locationHistory: response.data.data })
      setLoading(true)
    }


  }


  const goMessage = () => {
    setVisible(!visible)
    props.navigation.navigate('ParentChat', { message: choosed })
  }

  const sendSOS = () => {
    socketClient.emit("sos", {
      receiverUniqueId: choosed.uniqueId,
      senderUniqueId: state.user.userData[0].family.parents[0].uniqueId
    })
  }

  const stopConnection = () => {

    device.close()
    device = new RTCPeerConnection(pc_config)
    setListenVisible(false)
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

          //   console.log(lastPosition ,"last")
        })

        Geolocation.getCurrentPosition(info => {
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
    <SafeAreaView style={{ flex: 1 }}>
      {
        location != null ?


          <View style={styles.container}>
            <ChildHistoryModal press={goMessage} name={choosed != null ? choosed.name : null} level={batteryLevel} isVisible={visible} onBackdropPress={() => setVisible(false)} />
            <ListenModal onPress={stopConnection} isVisible={listenVisible} onBackdropPress={() => setListenVisible(!listenVisible)} />
            <MapView

              ref={mapRef}

              style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height, position: "absolute" }}
              initialRegion={{
                latitude: location.uniqueId != uniqueId && choosed != null && location.uniqueId === choosed.uniqueId ? location.location.latitude : state.position.latitude,
                longitude: location.uniqueId != uniqueId && choosed != null && location.uniqueId === choosed.uniqueId ? location.location.longitude : state.position.longitude,
                latitudeDelta: 0.0022,
                longitudeDelta: 0.0021,

              }}
            >
            
              <Polyline

                coordinates={[...state.locationHistory.map((item) => item.location), ...(state.location).filter(item => choosed != null && item.uniqueId === choosed.uniqueId).map(obj => obj.location)]}
                strokeColor={Colors.primary}
                strokeColors={[
                  '#7F0000',
                  '#00000000',
                  '#B24112',
                  '#E5845C',
                  '#238C23',
                  '#7F0000'
                ]}
                strokeWidth={3}
              />
              {
                location.uniqueId === undefined && state.locationHistory.length > 0 ?
                  <Marker
                    coordinate={{
                      latitude: state.locationHistory[state.locationHistory.length - 1].location.latitude,
                      longitude: state.locationHistory[state.locationHistory.length - 1].location.longitude
                    }}
                    tracksInfoWindowChanges={true}
                  >

                    <View style={{ width: 50, height: 40, position: "absolute", top: 0, left: 26 }}>
                      <Text style={{ color: parseInt(batteryLevel) > 20 ? COLORS.primary : COLORS.red, position: "absolute", fontSize: 7, top: 10, left: 6, fontWeight: "bold" }}>En son buradaydı</Text>
                    </View>
                    <MyCustomMarker />
                  </Marker>
                  :
                  null
              }
              {
                location.uniqueId != undefined && choosed != -1 ?
                  <Marker
                    coordinate={{
                      latitude: location.uniqueId != uniqueId && choosed != null && location.uniqueId === choosed.uniqueId ? location.location.latitude : loading ? state.position.latitude : state.position.latitude,
                      longitude: location.uniqueId != uniqueId && choosed != null && location.uniqueId === choosed.uniqueId ? location.location.longitude : loading ? state.position.longitude : state.position.longitude,
                    }}
                    tracksInfoWindowChanges={true}
                  >

                    <View style={{ width: 40, height: 40, position: "absolute", top: 0, left: 26 }}>
                      <Icon name="battery-dead-outline" size={30} color={parseInt(batteryLevel) > 20 ? COLORS.primary : COLORS.red} />
                      <Text style={{ color: parseInt(batteryLevel) > 20 ? COLORS.primary : COLORS.red, position: "absolute", fontSize: 9, top: 10, left: 6, fontWeight: "bold" }}>{`${batteryLevel}%`}</Text>
                    </View>
                    <MyCustomMarker />
                  </Marker>
                  :

                  null
              }
            </MapView>

            <ScrollView horizontal={true} contentContainerStyle={{ paddingLeft: 20, alignItems: "center" }} style={{ height: 80, borderBottomLeftRadius: 25, borderBottomRightRadius: 25, elevation: 1, width: width, backgroundColor: "rgba(255,255,255,0.85)", alignSelf: "center", position: "absolute", top: Platform.OS === "android" ? 0 : 0 }}>
              {
                (state.family).map((item, index) => {
                  return (
                    <Pressable key={index} onPress={() => getlocationChild(item, index)} >
                      <View style={[styles.listItem, childIndex === index ? { width: 60, height: 60, borderRadius: 30 } : { width: 50, height: 50, borderRadius: 25 }, { borderColor: index % 2 === 1 && index % 3 != 0 ? COLORS.red : index % 3 === 0 ? COLORS.mor : COLORS.primary }]}>
                        <Image style={{ width: 100, height: 100, resizeMode: "cover" }} source={item.picture != null ? { uri: item.picture } : require('../../assets/child.jpg')} />
                      </View>
                    </Pressable>
                  )
                })
              }
            </ScrollView>

            {childIndex === -1 ? null :
              <Pressable onPress={create} style={[styles.circleButton]} >
                <Image style={{ width: 58, height: 58, marginTop: 4 }} source={require('../../assets/Hear.png')} />
              </Pressable>}


            {childIndex === -1 ? null :
              <Pressable style={[styles.circleButton, { left: 60, backgroundColor: Colors.red }]} onPress={sendSOS}>
                <Image style={{ width: 58, height: 58, marginTop: 4 }} source={require('../../assets/SOS.png')} />
              </Pressable>}

            {childIndex === -1 ? null :
              <View style={styles.childInfo}>
                <FlatList
                  horizontal={true}
                  data={history}
                  keyExtractor={(_, index) => index.toString()}
                  renderItem={renderEvents}
                />
              </View>}


          </View>
          :
          <ActivityIndicator color={COLORS.primary} size="large" />
      }
    </SafeAreaView>
  )
}
export { HomeParent }