import React, { useState, useEffect, useContext } from 'react'
import { Pressable, SafeAreaView, Text, View, FlatList, Dimensions, ActivityIndicator, TouchableOpacity, ScrollView, Image } from 'react-native'
import Context from '../../context/store'
import Axios from 'axios'
import { ChatListItem, Header } from '../../components'
import styles from '../../style/parentStyle/ChooseChildStyle'
import COLORS from '../../style/Colors'
import strings from '../../strings'
import * as Notifications from "expo-notifications"
import { useIsFocused } from "@react-navigation/native";

const { width, height } = Dimensions.get('window')




const ChatHome = (props) => {

    const { state, dispatch } = useContext(Context)
    const [loading, setLoading] = useState(false)
    const [childArray, setChildArray] = useState([])
    const [childIndex, setChildIndex] = useState(null)
    const [choosed, setChoosed] = useState(-1)
    const [bol, setBol] = useState(false)
    const [userPackage, setPackage] = useState(state.userPackage)
    const isFocus = useIsFocused()


    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            Notifications.setNotificationHandler({
                handleNotification: async () => {
                    return {
                        shouldShowAlert: true,
                        shouldPlaySound: true
                    }
                }
            })
        });

        return unsubscribe;
    }, [props.navigation]);


    useEffect(() => {

        getFamily()
        childIndex === null ? setChildIndex(-1) : null

    }, [])

    const renderChat = ({ item, index }) => {

        return (
            <ChatListItem picture={item.picture} oneMessage={bol} index={index} name={item.name} item={item} onPress={() => props.navigation.navigate("ParentChat", { message: item })} />
        )
    }
    const getFamily = async () => {
        console.log("err")
        setLoading(true)
        let response = await Axios.post("https://wherismykid.herokuapp.com/api/children/getfamily", {
            parentId: state.type === 1 ? state.user.userData[0].family.parents[0].id : state.user.parentData.id
        })
        setChildArray(response.data.data.response)
        dispatch({ type: "SET_FAMILY", family: response.data.data.response })
        setLoading(false)
    }

    function getlocationChild(child, i) {
        console.log("ewwe")
        setChildIndex(i)
        setChoosed(child)
        i != -1 ? setBol(true) : setBol(false)
        i === -1 ? getFamily() : null

    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {userPackage || userPackage != null ? <View style={{ alignItems: "center", flex: 1 }}>
                {childArray.length != 0 ?

                    <View style={{ paddingBottom: 40 }}>

                        <FlatList
                            contentContainerStyle={{ paddingTop: 100 }}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={renderChat}
                            data={choosed === -1 ? childArray : childArray.filter((item) => item === choosed)}
                        />
                    </View>

                    :
                    loading ?

                        <ActivityIndicator color={COLORS.primary} size="large" />

                        :
                        <View style={[styles.emptyView, { marginTop: 20 }]}>
                            <Text style={[styles.title, { color: COLORS.white }]}>{strings.addFamily}</Text>
                        </View>
                }
                <ScrollView horizontal={true} contentContainerStyle={{ paddingLeft: 20, alignItems: "center" }} style={{ height: 80, borderBottomLeftRadius: 25, borderBottomRightRadius: 25, elevation: 1, width: width, backgroundColor: "rgba(255,255,255,0.85)", alignSelf: "center", position: "absolute", top: Platform.OS === "android" ? 0 : 0 }}>

                    <TouchableOpacity onPressOut={() => getlocationChild(-1, -1)} >
                        <View style={[styles.listItem, childIndex === -1 ? { width: 60, height: 60, borderRadius: 30 } : { width: 50, height: 50, borderRadius: 25 }, { borderColor: childIndex === -1 ? COLORS.mor : COLORS.primary }]}>
                            <Text style={styles.family}>{strings.family}</Text>
                        </View>
                    </TouchableOpacity>
                    {
                        (state.family).map((item, index) => {
                            return (
                                <Pressable key={index} onPress={() => getlocationChild(item, index)} >
                                    <View style={[styles.listItem, childIndex === index ? { width: 60, height: 60, borderRadius: 30 } : { width: 50, height: 50, borderRadius: 25 }, { borderColor: index % 2 === 1 && index % 3 != 0 ? COLORS.red : index % 3 === 0 ? COLORS.mor : COLORS.primary }]}>
                                        <Image style={{ width: 100, height: 100, resizeMode: "cover" }} source={item.picture != null ? { uri: item.picture } : require('../../assets/childface.png')} />
                                    </View>
                                </Pressable>
                            )
                        })
                    }
                </ScrollView>
            </View>
                :
                <View style={{ flex: 1, backgroundColor: COLORS.lightGreen, alignItems: "center", justifyContent: "center" }}>

                    <View style={{ width: width * 0.9, height: height * 0.4, backgroundColor: COLORS.white, borderRadius: 20, alignItems: "center", justifyContent: "space-around" }}>
                        <View style={{ alignItems: "center" }}>
                            <Text style={{ fontSize: 16, fontWeight: "bold", letterSpacing: 1, color: COLORS.settinText, marginTop: 5 }}>{strings.buyPackage}</Text>
                        </View>

                        <TouchableOpacity onPress={() => props.navigation.navigate('package')}  >
                            <View style={{ width: width * 0.5, height: 40, borderRadius: 20, backgroundColor: COLORS.lightGreen, alignItems: "center", justifyContent: "center", marginTop: 20 }}>
                                <Text style={{ color: COLORS.white, fontSize: 16, fontWeight: "bold" }}>{strings.buy}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
            }
        </SafeAreaView>
    )
}
export { ChatHome }