import React, { useState, useEffect, useContext } from 'react'
import { Pressable, Text, View, StyleSheet, Dimensions, Image, ActivityIndicator } from 'react-native'
import Context from "../context/store"
import COLORS from '../style/Colors'
import Colors from '../style/Colors'
import Axios from "axios"
import API from "../data/api"

const width = Dimensions.get("window").width

const ChatListItem = (props) => {

    const [index, setIndex] = useState(props.index)
    const { state, dispatch } = useContext(Context)
    const [message, setMessage] = useState([null])
    const [oneMessage, setOneMessage] = useState(props.oneMessage)
    const [loading, setLoading] = useState(loading === false ? false : true)

    useEffect(() => {

        getmessagesLimit()

    }, [])

    useEffect(() => {

        setOneMessage(props.oneMessage)
        getmessagesLimit()

    }, [props.oneMessage])

    useEffect(() => {

        setLoading(true)
        getmessagesLimit()

    }, [props.name])

    const getmessagesLimit = async () => {
        let response = await Axios.post(API.base_url + API.getmessage_limit, {
            senderUniqueId: state.type === 1 ? state.user.userData[0].family.parents[0].uniqueId : state.user.parentData.uniqueId,
            receiverUniqueId: props.item.uniqueId,
            limit: Math.floor(Math.random() * 13) + 4
        }).catch(err => console.log(err, "err"))
        console.log(response.data.data.response,"rrr")
       setMessage(response.data.data.response)
        setTimeout(() => {
            setLoading(false)
        }, 1000);

    }


    return (

        <Pressable onPress={props.onPress}>



            {props.childPage ?

                <View style={{ paddingHorizontal: 5 }}>
                    <View style={styles.container}>
                        <View style={styles.image}>
                            <Image style={{ width: 40, height: 40 }} source={props.picture != undefined ? props.picture != null ? { uri: props.picture } : require('../assets/child.jpg') : require('../assets/child.jpg')} />
                        </View>

                        <View>
                            <Text style={[styles.nameText, { color: index % 2 === 1 && index % 3 != 0 ? COLORS.red : index % 3 === 0 ? COLORS.mor : COLORS.primary }]}>{props.name}</Text>
                            {message.length > 0 ? <Text numberOfLines={1} style={styles.message}>{message != undefined ? message != null ? message[0].message : null : null}</Text> : null}
                        </View>

                        <View style={styles.clock}>
                            {message.length > 0 ? <Text style={{ color: COLORS.lightGray, fontWeight: "bold" }}>{message != undefined ? message != null && message != undefined ? message[0].time : null : null}</Text> : null}
                        </View>
                    </View>
                </View>


                :

                loading ? <ActivityIndicator color={COLORS.primary} /> :

                    oneMessage ?
                        message != undefined && message != null && message.length > 0 ?

                            message.map((item, i) => (

                                <View key={i} style={{ paddingHorizontal: 5 }}>
                                    <View style={styles.container}>
                                        <View style={styles.image}>
                                            <Image style={{ width: 40, height: 40 }} source={props.picture != undefined ? props.picture != null ? { uri: props.picture } : require('../assets/child.jpg') : require('../assets/child.jpg')} />
                                        </View>
                                        <View>
                                            <Text style={[styles.nameText, { color: index % 2 === 1 && index % 3 != 0 ? COLORS.red : index % 3 === 0 ? COLORS.mor : COLORS.primary }]}>{props.name}</Text>
                                            <Text numberOfLines={1} style={styles.message}>{item.message != undefined && message != null && message != undefined ? `${item.message}` : null}</Text>
                                        </View>
                                        <View style={styles.clock}>
                                            <Text style={{ color: COLORS.lightGray, fontWeight: "bold" }}>{message != null && message != undefined ? item.time : null}</Text>
                                        </View>
                                    </View>
                                </View>
                            ))
                            :
                            <View style={{ paddingHorizontal: 5 }}>
                                <View style={styles.container}>
                                    <View style={styles.image}>
                                        <Image style={{ width: 40, height: 40 }} source={props.picture != undefined ? props.picture != null ? { uri: props.picture } : require('../assets/child.jpg') : require('../assets/child.jpg')} />
                                    </View>
                                    <View>
                                        <Text style={[styles.nameText, { color: index % 2 === 1 && index % 3 != 0 ? COLORS.red : index % 3 === 0 ? COLORS.mor : COLORS.primary }]}>{props.name}</Text>
                                        <Text numberOfLines={1} style={styles.message}></Text>
                                    </View>
                                    <View style={styles.clock}>
                                        <Text style={{ color: COLORS.lightGray, fontWeight: "bold" }}></Text>
                                    </View>
                                </View>
                            </View>
                        :
                        <View style={{ paddingHorizontal: 5 }}>
                            <View style={styles.container}>
                                <View style={styles.image}>
                                    <Image style={{ width: 40, height: 40 }} source={props.picture != undefined ? props.picture != null ? { uri: props.picture } : require('../assets/child.jpg') : require('../assets/child.jpg')} />
                                </View>

                                <View>
                                    <Text style={[styles.nameText, { color: index % 2 === 1 && index % 3 != 0 ? COLORS.red : index % 3 === 0 ? COLORS.mor : COLORS.primary }]}>{props.name}</Text>
                                    {message.length > 0 ? <Text numberOfLines={1} style={styles.message}>{message != undefined ? message != null ? message[0].message : null : null}</Text> : null}
                                </View>

                                <View style={styles.clock}>
                                    {message.length > 0 ? <Text style={{ color: COLORS.lightGray, fontWeight: "bold" }}>{message != undefined ? message != null && message != undefined ? message[0].time : null : null}</Text> : null}
                                </View>
                            </View>
                        </View>

            }

        </Pressable>
    )
}

const styles = StyleSheet.create({
    clock: {
        position: "absolute",
        right: 15,
        top: 10
    }, container: {
        width: width * 0.95,
        height: 60,
        backgroundColor: Colors.white,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 10,
        borderRadius: 15,
        elevation: 7
    },
    image: {
        width: 40,
        height: 40,
        backgroundColor: Colors.white,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        overflow: "hidden",
    },
    nameText: {
        fontSize: 17,
        letterSpacing: 0.3,
        fontWeight: "bold"
    },
    message: {
        fontSize: 14,
        width: width * 0.2,
        opacity: 0.4,

    }
})
export { ChatListItem }