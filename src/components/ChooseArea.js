import React, { useContext, useState, useEffect, useRef } from 'react'
import { SafeAreaView, View, Text, Dimensions, StyleSheet, Pressable, FlatList, ScrollView, Alert, Platform, TouchableOpacity,Image } from 'react-native'
import Modal from 'react-native-modal'
import Context from '../context/store'
import MApView, { Marker, Circle } from 'react-native-maps'
import Icons from 'react-native-vector-icons/FontAwesome5'
import Icon from 'react-native-vector-icons/Ionicons'

import { InputAreaModal, DeletedArea, ChildItem, MyCustomMarker, Header } from './index'
import COLORS from '../style/Colors'
import customStyle from '../style/MapCustomStyle'
import Axios from 'axios'
import API from '../data/api'
import imageView from "../assets/child.jpg"


const width = Dimensions.get("window").width
const height = Dimensions.get("window").height
const ChooseArea = props => {



    const mapRef = useRef(null)
    const [visible, setVisible] = useState(false)
    const [show, setShow] = useState(false)
    const { state, dispatch } = useContext(Context)
    const [choosed, setChoosed] = useState(state.family[0] != undefined ? state.family[0].id : null)
    const [deleted, setDeleted] = useState(false)
    const [item, setItem] = useState()
    const [childIndex, setChildIndex] = useState()
    const [userPackage, setPackage] = useState(state.userPackage)
    
    useEffect(() => {
        console.log("merhaba")
    }, [state.area])

    const [coordinate, setCoordinate] = useState()
    const [change, setChange] = useState({
        latitude: 37.8025259,
        longitude: -122.4351431,
    })


    const addArea = () => {
        setVisible(!visible)
    }

    async function choosedChild(child, index) {
        
        setItem(child)
        setChoosed(child.id)
        let response = await Axios.post(API.base_url + API.getLocation, {
            childrenId: child.id,
        }, {
            headers: {
                'Authorization': `bearer ${state.token}`
            }
        })
        console.log(response.data.data)
        console.log((response.data.data.response).length)
        if ((response.data.data.response).length === 0) {
            setChildIndex(index)
            dispatch({ type: "ADD_AREA", get: [] })
        } else {
            setChildIndex(index)
            dispatch({ type: "ADD_AREA", get: response.data.data.response[0].addresses })
        }
    }

    async function updateLocation(item) {
        let response = await Axios.post(API.base_url + API.updateLocation, {
            addressId: item.id,
            name: item.name,
            lontitude: item.lontitude,
            lattitude: item.latitude
        }, {
            headers: {
                'Authorization': `bearer ${state.token}`
            }
        })
    }

    async function deleteLocation(item) {
        //  setItem(item)
        console.log("consol")
        let response = await Axios.post(API.base_url + API.deleteLocation, {
            addressId: item.id

        }, {
            headers: {
                'Authorization': `bearer ${state.token}`
            }
        })
        if (response.data.data.response[0] === 1)
            Alert.alert("Delete", "Adresses deleted")
        dispatch({ type: "DELETE_AREA", delete: item.id })
        console.log(response)
    }

    function changeRegion(item) {
        console.log("asdasd", item)
        let latitude = item.latitude;
        let longitude = item.longitude;
        mapRef.current.animateToRegion({ latitude: Number(latitude), longitude: Number(longitude), latitudeDelta: 0.002, longitudeDelta: 0.002 }, 2000)
    }

    return (
       <SafeAreaView style={{flex : 1}}>
{
        userPackage || userPackage  != null ?
       <View style={styles.container}>

            <MApView

                ref={mapRef}
                style={{ position: "absolute", width: width, height: height }}
                onRegionChange={(res) => setChange(res)}
                initialRegion={{
                    latitude: change.latitude,
                    longitude: change.longitude,
                    latitudeDelta: 0.002,
                    longitudeDelta: 0.002
                }}
            //customMapStyle={customStyle}
            >
                {(state.area).map((item) => {

                    return (
                        <Circle
                            center={{
                                latitude: Number(item.latitude),
                                longitude: Number(item.longitude)
                            }}
                            radius={10}
                            fillColor={COLORS.zone}
                            strokeColor={COLORS.zone}

                        />


                    )
                })
                }

                <Marker
                    tracksInfoWindowChanges={true}
                    coordinate={{
                        latitude: change.latitude,
                        longitude: change.longitude
                    }}

                >   
                   <MyCustomMarker item={item} />
                </Marker>
            </MApView>
            <InputAreaModal isVisible={visible} onBackdropPress={() => setVisible(!visible)} coordinate={change} childrendId={choosed} />
            <ScrollView horizontal={true} contentContainerStyle={{ paddingLeft: 20, alignItems: "center"}} style={{ height: 80, borderBottomLeftRadius: 25, borderBottomRightRadius: 25, elevation: 1, width: width, backgroundColor: "rgba(255,255,255,0.85)", alignSelf: "center", position: "absolute", top: Platform.OS === "android" ? 0 : 30 }}>
                {
                    (state.family).map((item, index) => {
                        return (
                            <Pressable key={index} onPress={() => choosedChild(item, index)}>
                                <View style={[styles.listItemChild,childIndex===index ? {width : 60,height:60,borderRadius:30 } : {width: 50,  height: 50, borderRadius: 25}, { borderColor: index % 2 === 1 && index % 3 != 0 ? COLORS.red : index % 3 === 0 ? COLORS.mor : COLORS.primary }]}>
                                    <Image style={{ width: 100, height: 100, resizeMode: "cover" }} source={item.picture != null ? {uri : item.picture}  : require('../assets/childface.png')} />
                                </View>
                            </Pressable>
                        )
                    })
                }
            </ScrollView>

            <ScrollView horizontal={true} style={[styles.areaList, { marginTop: 40 }]}>
                {
                    (state.area).map((item, index) => {
                    
                        return (
                            <View style={[styles.listItem, {marginRight: state.area.length === index+1 ? 15 : null , borderColor: childIndex % 2 === 1 && childIndex % 3 != 0 ? COLORS.red : childIndex % 3 === 0 ? COLORS.mor : COLORS.primary }]} key={index + item.name}>
                                <Pressable style={{ flexDirection: "row", alignItems: "center" }} onPress={() => changeRegion(item)} >
                                    <Icons name="map-marker-alt" color={childIndex % 2 === 1 && childIndex % 3 != 0 ? COLORS.red : childIndex % 3 === 0 ? COLORS.mor : COLORS.primary} size={20} />
                                    <Text style={styles.listTitle}>{item.name}</Text>
                                </Pressable>

                                <Icons name="times" color={COLORS.gray} size={18} style={{marginLeft : 15 }} onPress={() => deleteLocation(item)} />
                            </View>

                        )
                    })
                }
            </ScrollView>


            {choosed != null ?
                <Pressable onPress={addArea}>
                    <View style={styles.button}>
                        <Icons name="plus" color={COLORS.white} size={20} />
                    </View>
                </Pressable>
                :
                null
            }
        </View>
        :
        <View style={{ flex: 1, backgroundColor: COLORS.lightGreen, alignItems: "center", justifyContent: "center" }}>

        <View style={{ width: width * 0.9, height: height * 0.4, backgroundColor: COLORS.white, borderRadius: 20, alignItems: "center", justifyContent: "space-around" }}>
          <View style={{alignItems : "center"}}>
            <Text style={{ fontSize: 16, fontWeight: "bold", letterSpacing: 1, color: COLORS.settinText, marginTop: 5 }}>Uygulamayı kullanmaya </Text>
            <Text style={{ fontSize: 16, fontWeight: "bold", letterSpacing: 1, color: COLORS.settinText, marginTop: 5 }}>devam edebilmek için </Text>
            <Text style={{ fontSize: 16, fontWeight: "bold", letterSpacing: 1, color: COLORS.settinText, marginTop: 5 }}>lütfen paket alınız</Text>
          </View>

          <TouchableOpacity onPress={()=>props.navigation.navigate('package')}  >
            <View style={{ width: width * 0.5, height: 40, borderRadius: 20, backgroundColor: COLORS.lightGreen, alignItems: "center", justifyContent: "center", marginTop: 20 }}>
              <Text style={{ color: COLORS.white, fontSize: 16, fontWeight: "bold" }}>PAKET SATIN AL</Text>
            </View>
          </TouchableOpacity>
        </View>

      </View>

        
    }
        </SafeAreaView> 
    )
}

const styles = StyleSheet.create({
    coordinateContainer: {
        width: width,
        backgroundColor: "rgba(255,255,255,0.3)",
        alignSelf: "center",
        top: 0,
        marginTop: 10,
        borderRadius: 10,
        alignItems: "center",
        position: "absolute"
    },
    button: {
        width: 40,
        height: 40,
        backgroundColor: COLORS.primary,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 90,
        marginRight: 30
    },
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "flex-end",
    },
    areaList: {
     
        position: "absolute",
        top: 45,
        paddingLeft: 10,
        alignSelf  :"flex-start"
        // marginBottom : height * 0.55
    },
    listItem: {
        flexDirection: "row",
        borderWidth: 1,
        borderRadius: 5,
        alignItems: "center",
        marginHorizontal : 5,
        paddingHorizontal: 5,
        paddingVertical: 7,
        backgroundColor: COLORS.transparentWhite,
        marginTop: 10,
        width : "auto"
    },
    listTitle: {
        color: COLORS.black,
        fontSize: 18,
        marginLeft: 5,
        letterSpacing: 0.4,
        opacity: 0.6
    },
    chooseChild: {
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "center",
        height: 30,
        borderRadius: 30,
        marginRight: 10,

    },
    listItemChild: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        marginHorizontal: 10,
        borderWidth: 2
    },
})
export { ChooseArea }