import React, { useState, useEffect, useContext, useRef } from 'react'
import { SafeAreaView, View, Text, StatusBar, Pressable, TextInput, FlatList, Dimensions, KeyboardAvoidingView } from 'react-native'
import { InputToolBar, MessageComponent, LeftMessageComponent } from '../../components'
import Context from "../../context/store"
import styles from '../../style/childStyle/ChatChildStyle'
import Icons from 'react-native-vector-icons/Ionicons'
import { socketClient } from "../../socket/socket"
import API from "../../data/api"
import Axios from "axios"
import COLORS from '../../style/Colors'
import {useIsFocused} from "@react-navigation/native"
import * as Notifications from "expo-notifications";
const ChatChild = (props) => {
    const { state, dispatch } = useContext(Context)
    const [userMessage, setUserMessage] = useState({ senderUniqueId: state.user.data[0].uniqueId, message: "", time: "" })
    const [sendTo, setSendTo] = useState()
    const [receiverName,setReceiverName]=useState("")
    const [child,setChild] = useState(props.route.params.child)
    const list = useRef()
    const isFocus = useIsFocused()


    useEffect(()=>{
        Notifications.setNotificationHandler({
            handleNotification: async () => {
              return {
                shouldShowAlert: false
              }
            }
          })
    },[])

    useEffect(() => {
        console.log(props.route.params.message)
        if (props.route.params.message != undefined) {
            console.log("message undifned değilllllllll" ,props.route.params.message)
            setSendTo(props.route.params.message)
            getMessage(props.route.params.message.uniqueId)
            setReceiverName(props.route.params.message.name)
            setChild(true)

        }else {
            console.log("merhaba")
            getMessage(state.family[0].parent.uniqueId)
            setSendTo(state.family[0].parent)
        }
       
        console.log(props.route.params, "params")
        socketClient.on("new_message", newMessage => {
            console.log("asdsad")
            dispatch({ type: "SET_MESSAGELIST", messageList: newMessage })
           
            scrollIndex();
        })
       
        if (props.route.params.send != undefined) {
            
            console.log("--------------", { senderUniqueId: state.user.data[0].uniqueId, message: props.route.params.send, hour: getTime() })
            setUserMessage({ senderUniqueId: state.user.data[0].uniqueId, message: props.route.params.send, hour: getTime() })
            dispatch({ type: "SET_MESSAGELIST", messageList: { senderUniqueId: state.user.data[0].uniqueId, message: props.route.params.send, hour: getTime() } })
            sendMessage()
        } else {
            null
        }
    }, [])

    const renderMessage = ({ item }) => {
        if(item.message != ""){
            if (item.senderUniqueId === state.user.data[0].uniqueId) {
                return (
                    <MessageComponent data={item} />
                )
            } else {
                return (
                    <LeftMessageComponent data={item} />
                )
    
            }
        }
       


    }

    


    const getTime = () => {
        const hour = new Date().getHours()
        const minute = new Date().getMinutes()
        const time = `${hour}:${minute}`

        return time
    }
    const sendMessage = () => {
        const d = new Date()

        if (userMessage.message != "") {
            socketClient.emit("send_message", {
                // receiver : state.family[0].parent.id,
                name :state.user.data[0].name ,
                receiver: state.family[0].parent.id,
                sender: sendTo.id ,
                senderRole: "child",
                receiverRole:child ?   "parent"  :"child"  ,
                message: userMessage.message,
                time: userMessage.time,
                uniqueId:  sendTo.uniqueId ,
                senderUniqueId: state.user.data[0].uniqueId,
                // date :d
            })
            dispatch({ type: "SET_MESSAGELIST", messageList: userMessage })
            setUserMessage({message:""})
            setTimeout(() => {
                scrollIndex()
            }, 1000);
           
        }
        else {
            null
        }

        scrollIndex()

    }

    const getMessage = async (receiverUn) => {
        console.log(receiverUn,"reciver")
        let response = await Axios.post(API.base_url + API.get_message, {
            senderUniqueId: state.user.data[0].uniqueId,
            receiverUniqueId:receiverUn
        }
        ).catch(err=>{
            console.log(err,"err")
        })
        console.log(response.data, "sqqe")
        dispatch({ type: "SET_LIST", list: response.data.data.response })
        scrollIndex()
        console.log("merhaba")
    }

    const scrollIndex = () => {
      isFocus ?  list.current.scrollToEnd({ animated: true }) : null
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor={COLORS.primary} />
            <View style={styles.header}>
                <Pressable onPress={() => props.navigation.goBack()}>
                    <Icons name="arrow-back" color="white" size={30} />
                </Pressable>
                <Text style={styles.title}>{receiverName}</Text>
            </View>
            <View style={styles.container}>
                <View style={{flex:1,justifyContent:"flex-end",alignItems:"flex-end",flexDirection:"row"}}>
                    <FlatList
                        ref={list}
                        data={state.messageList.sort((a,b)=>a.id-b.id)}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={renderMessage}
                        contentContainerStyle={{
                            width: Dimensions.get("window").width
                        }}

                    />
                </View>
                
                <InputToolBar value={userMessage.message} onChangeText={(text) => setUserMessage({ message: text, senderUniqueId: state.user.data[0].uniqueId, time: getTime() })} onPress={sendMessage} />
            </View>

        </SafeAreaView>
    )
}
export { ChatChild }