import React, { useState, useEffect, useContext, useRef } from 'react'
import { SafeAreaView, View, Text, StatusBar, Pressable, TextInput, FlatList, Dimensions, KeyboardAvoidingView } from 'react-native'
import { InputToolBar, MessageComponent, LeftMessageComponent, Header } from '../../components'
import Context from '../../context/store'
import styles from '../../style/childStyle/ChatChildStyle'
import Icons from 'react-native-vector-icons/Ionicons'
import { socketClient } from "../../socket/socket"
import API from "../../data/api"
import Axios from 'axios'
import COLORS from '../../style/Colors'
import * as Notifications from 'expo-notifications';
import { useRoute } from "@react-navigation/native"



const Chat = (props) => {


    const { state, dispatch } = useContext(Context)
    const [messageTo, setMessageTo] = useState(props.route.params.message)
    const [userMessage, setUserMessage] = useState({ senderUniqueId: uniqueId, message: "", time: "" })
    const [uniqueId, setUniqueId] = useState(state.type === 1 ? state.user.userData[0].family.parents[0].uniqueId : state.user.parentData.uniqueId)
    const [noti,setNoti] = useState(null)
    const list = useRef()
    const isFocus = useRoute()

    
    

    useEffect(() => {
        Notifications.setNotificationHandler({
            handleNotification: async () => {
              return {
                shouldShowAlert: false
              }
            }
          })
        getMessage()
        getmessagesLimit()
        socketClient.on("new_message", newMessage => {
            console.log(newMessage , "new mesaage")
            dispatch({ type: "SET_MESSAGELIST", messageList: newMessage })
            setTimeout(() => {
                isFocus.name ===  "ParentChat" ? scrollIndex() :null
            }, 1000);


        })
        setTimeout(() => {
            isFocus.name ===  "ParentChat" ?  scrollIndex() : null
        }, 1000);
       
    }, [])

    const renderMessage = ({ item, index }) => {

        if (item.senderUniqueId === uniqueId) {
            return (
                <MessageComponent data={item} />
            )
        } else {
            return (
                <LeftMessageComponent data={item} />
            )

        }

    }


    const getTime = () => {
        const hour = new Date().getHours()
        const minute = new Date().getMinutes()
        const time = `${hour}:${minute}`
        return time
    }
    const sendMessageMethod = () => {
        const d = new Date()
        if (userMessage.message != "") {

            socketClient.emit("send_message", {
                name :state.type === 1 ? state.user.userData[0].name : state.user.userData.name ,
                receiver: props.route.params.message.id,
                sender: state.type === 1 ? state.user.userData[0].id : state.user.userData.id,
                senderRole: "parent",
                receiverRole: "child",
                message: userMessage.message,
                time: userMessage.time,
                uniqueId: props.route.params.message.uniqueId,
                senderUniqueId: uniqueId,

            })

            dispatch({ type: "SET_MESSAGELIST", messageList: userMessage })
            setTimeout(() => {
                isFocus.name ===  "ParentChat" ? scrollIndex() : null
            }, 1500);
            setUserMessage({ message: "" })
        }
    }

    const scrollIndex = () => {
        list.current !== null ?   list.current.scrollToEnd({animated : true})  : null
    }

    const getMessage = async () => {
        let response = await Axios.post(API.base_url + API.get_message, {
            senderUniqueId: uniqueId,
            receiverUniqueId: props.route.params.message.uniqueId,
            limit: 20
        })
        dispatch({ type: "SET_LIST", list: response.data.data.response })
        setTimeout(() => {
            scrollIndex()
        }, 1000);
    }

    const getmessagesLimit = async () => {
        let response = await Axios.post(API.base_url + API.getmessage_limit, {
            senderUniqueId: uniqueId,
            receiverUniqueId: props.route.params.message.uniqueId,
            limit: 2
        }).catch(err => console.log(err, "err"))
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor={COLORS.primary} />

            <View style={styles.header}>
                <Pressable onPress={() => props.navigation.goBack()}>
                    <Icons name="arrow-back" color="white" size={30} />
                </Pressable>
                <Text style={styles.title}>{messageTo.name}</Text>
            </View>
            <View style={styles.container}>
                <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "flex-end", flexDirection: "row" }}>
                    <FlatList
                        ref={list}
                        data={state.messageList.sort((a, b) => a.id - b.id)}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={renderMessage}
                        contentContainerStyle={{
                            width: Dimensions.get("window").width,

                        }}

                    />
                </View>

                <InputToolBar value={userMessage.message} onChangeText={(text) => setUserMessage({ message: text, senderUniqueId: uniqueId, time: getTime() })} onPress={sendMessageMethod} />
            </View>

        </SafeAreaView>
    )
}
export { Chat }