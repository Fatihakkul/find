import React, { useEffect, useContext, useState } from 'react'
import { SafeAreaView, View, Text, FlatList, ActivityIndicator } from 'react-native'
import Axios from 'axios'
import Context from '../../context/store'
import API from "../../data/api"
import styles from '../../style/parentStyle/ChooseChildStyle'
import { ChooseChildItem } from '../../components'
import COLORS from '../../style/Colors'
import { socketClient } from "../../socket/socket"


const ChooseChild = props => {

    const [loading, setLoading] = useState(true)
    const [childArray, setChildArray] = useState([])
    const { state, dispatch } = useContext(Context)

    // useEffect(() => {
    //     getFamily()
    //     console.log(state.user, state.type)
    //     socketClient.emit("user_connected", {
    //         role: "parent",
    //         id: state.type === 1 ? state.user.userData[0].family.parents[0].id : state.user.parentData.id,
    //         uniqueId: state.type === 1 ? state.user.userData[0].family.parents[0].uniqueId : state.user.parentData.id.uniqueId
    //     })
    //     socketClient.on("user_connected", (data) => {
    //         console.log(data, "userConnect")

    //     })
    // }, [])




    const renderChild = ({ item }) => {
        return (
            <ChooseChildItem data={item} onPress={() => goPage(item)} />
        )
    }
    const getFamily = async () => {

        let response = await Axios.post(API.base_url + API.get_family, {
            parentId: state.type === 1 ? state.user.userData[0].family.parents[0].id : state.user.parentData.id
        })
        setChildArray(response.data.data.response)
        dispatch({ type: "SET_FAMILY", family: response.data.data.response })
        props.navigation.navigate("Home", { child: response.data.data.response[0] != null || response.data.data.response[0] != undefined ? response.data.data.response[0] : null })
        setLoading(false)
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* <View style={styles.container}>
               {childArray.length != 0 ?  
                <FlatList 
                    showsVerticalScrollIndicator ={false}
                    contentContainerStyle={{paddingBottom : 10}}
                    keyExtractor={(_,index)=>index.toString()}
                    data={childArray}
                    renderItem={renderChild}
                />
            :
            loading ?

                <ActivityIndicator color={COLORS.primary} size="large" />
            :
           <View style={styles.emptyView}>
            <Text style={styles.title}>Bir çocuk ekle</Text>
               <View style={styles.textContainer}>
                    <Text style={styles.text}>Çocuğunuzun nerede olduğunu</Text>
                    <Text style={styles.text}>görebilmek için uygulamayı</Text>
                    <Text style={styles.text}>çocuğunuzun telefonuna yükleyip </Text>
                    <Text style={styles.text}>profil sayfasından alacağın kodla</Text>
                    <Text style={styles.text}>çocuğun telefonundan uygulamaya </Text>
                    <Text style={styles.text}>giriş yapabilirsin</Text>
                </View>
           </View>
            }
            </View> */}
        </SafeAreaView>
    )
}
export { ChooseChild }