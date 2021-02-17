import React, { useState, useEffect, useContext } from 'react'
import { Pressable, SafeAreaView, Text, View, FlatList, Dimensions, ActivityIndicator, TouchableOpacity, ScrollView, Image } from 'react-native'
import Context from '../../context/store'
import Axios from 'axios'
import { ChatListItem, Header } from '../../components'
import styles from '../../style/parentStyle/ChooseChildStyle'
import COLORS from '../../style/Colors'

const { width, height } = Dimensions.get('window')
const ChatHome = (props) => {

    const { state, dispatch } = useContext(Context)
    const [loading, setLoading] = useState(false)
    const [childArray, setChildArray] = useState([])
    const [childIndex, setChildIndex] = useState(null)
    const [choosed, setChoosed] = useState(-1)
    const [bol, setBol] = useState(false)


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
        setLoading(true)
        let response = await Axios.post("https://wherismykid.herokuapp.com/api/children/getfamily", {
            parentId: state.type === 1 ? state.user.userData[0].family.parents[0].id : state.user.parentData.id
        })
        setChildArray(response.data.data.response)
        dispatch({ type: "SET_FAMILY", family: response.data.data.response })
        setLoading(false)
    }

    function getlocationChild(child, i) {

        setChildIndex(i)
        setChoosed(child)
        i != -1 ? setBol(true) : setBol(false)
        i === -1 ? getFamily() : null

    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ alignItems: "center", flex: 1 }}>
                {childArray.length != 0 ?

                    <View style={{paddingBottom:40}}>

                        <FlatList
                            contentContainerStyle={{ paddingTop: 100 }}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={renderChat}
                            data={choosed === -1 ? childArray :  childArray.filter((item)=>item === choosed)}
                        />
                    </View>

                    :
                    loading ?

                        <ActivityIndicator color={COLORS.primary} size="large" />

                        :
                        <View style={[styles.emptyView, { marginTop: 20 }]}>
                            <Text style={[styles.title, { color: COLORS.white }]}>Aile üyesi ekleyerek </Text>
                            <Text style={[styles.title, { color: COLORS.white }]}>onlarla mesajlaşabilirsin</Text>
                        </View>
                }
                <ScrollView horizontal={true} contentContainerStyle={{ paddingLeft: 20, alignItems: "center" }} style={{ height: 80, borderBottomLeftRadius: 25, borderBottomRightRadius: 25, elevation: 1, width: width, backgroundColor: "rgba(255,255,255,0.85)", alignSelf: "center", position: "absolute", top: Platform.OS === "android" ? 0 : 0 }}>

                    <TouchableOpacity onPressOut={() => getlocationChild(-1, -1)} >
                        <View style={[styles.listItem, childIndex === -1 ? { width: 60, height: 60, borderRadius: 30 } : { width: 50, height: 50, borderRadius: 25 }, { borderColor: childIndex === -1 ? COLORS.mor : COLORS.primary }]}>
                            <Text style={styles.family}>AİLE</Text>
                        </View>
                    </TouchableOpacity>
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
            </View>
        </SafeAreaView>
    )
}
export { ChatHome }