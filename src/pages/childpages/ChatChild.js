import React, { useState, useEffect, useContext, useRef } from 'react'
import { SafeAreaView, View, Text, StatusBar, Pressable, TextInput, FlatList, Dimensions, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
import { InputToolBar, MessageComponent, LeftMessageComponent } from '../../components'
import Context from "../../context/store"
import styles from '../../style/childStyle/ChatChildStyle'
import Icons from 'react-native-vector-icons/Ionicons'
import { socketClient } from "../../socket/socket"
import API from "../../data/api"
import Axios from "axios"
import COLORS from '../../style/Colors'
import {useIsFocused , useRoute} from "@react-navigation/native"
import * as Notifications from "expo-notifications";
const ChatChild = (props) => {
    const { state, dispatch } = useContext(Context)
    const [userMessage, setUserMessage] = useState({ senderUniqueId: state.user.data[0].uniqueId, message: "", time: "" })
    const [sendTo, setSendTo] = useState()
    const [receiverName,setReceiverName]=useState("")
    const [child,setChild] = useState(props.route.params.child)
    const [loading,setLoading] = useState(null)
    
    const list = useRef()
    const isFocus = useIsFocused()
    const route = useRoute()
   let interval=null

 


    useEffect(()=>{
        Notifications.setNotificationHandler({
            handleNotification: async () => {
              return {
                shouldShowAlert: false
              }
            }
          })
    },[])

    useEffect(()=>{
        if(loading === true){
            setTimeout(() => {
              list.current != null ?  list.current.scrollToEnd({ animated: true }) : null
            }, 2000);}
          
    },[loading])

    useEffect(() => {
       
       if (props.route.params.message != undefined) {
            console.log(props.route.params.message ,"=======")
            setSendTo(props.route.params.message)
            getMessage(props.route.params.message.uniqueId)
            setReceiverName(props.route.params.message.name)
            setChild(true)

        }else {
            getMessage(state.family[0].parent.uniqueId)
            setSendTo(state.family[0].parent)
        }
       
        socketClient.on("new_message", newMessage => {
            
            dispatch({ type: "SET_MESSAGELIST", messageList: newMessage })
           
            setTimeout(() => {
               // scrollIndex();
            }, 900);
        })
       
        if (props.route.params.send != undefined) {
            getMessage(state.family[0].parent.uniqueId )
            socketClient.emit("send_message", {
                // receiver : state.family[0].parent.id,
                name :state.user.data[0].name ,
                receiver: state.family[0].parent.id,
                sender: state.user.data[0].id ,
                senderRole: "child",
                receiverRole:  "parent"   ,
                message:props.route.params.send,
                time: getTime(),
                uniqueId: state.family[0].parent.uniqueId  ,
                senderUniqueId: state.user.data[0].uniqueId,
                // date :d
            })
             dispatch({ type: "SET_MESSAGELIST", messageList: { senderUniqueId: state.user.data[0].uniqueId, message: props.route.params.send, hour: getTime() } })
         
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
        console.log(userMessage ,">>>>>>=====<<<<<<")
        const d = new Date()

        if (userMessage.message != "") {
            socketClient.emit("send_message", {
                // receiver : state.family[0].parent.id,
                name :state.user.data[0].name ,
                receiver: sendTo.id,
                sender: state.user.data[0].id ,
                senderRole: "child",
                receiverRole:child ?   "parent"  :"child"  ,
                message: userMessage.message,
                time: userMessage.time,
                uniqueId:props.route.params.message != undefined ?  state.family[0].parent.uniqueId   :  sendTo.uniqueId ,
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
        setLoading(false)
        let response = await Axios.post(API.base_url + API.getmessage_limit, {
            senderUniqueId: state.user.data[0].uniqueId,
            receiverUniqueId:receiverUn,
            limit: 40
        }
        ).catch(err=>{
            console.log(err,"err")
        })
        console.log(response)
        dispatch({ type: "SET_LIST", list: response.data.data.response })
        setLoading(true)
        scrollIndex()
    }

    const scrollIndex = () => {
      list.current != null ?  list.current.scrollToEnd({ animated: true }) : null
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
           {loading ? <View style={styles.container}>
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
            :
            <ActivityIndicator color={COLORS.primary} size="large" />
}
        </SafeAreaView>
    )
}
export { ChatChild }