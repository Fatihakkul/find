import React, { useState, useContext, useEffect } from "react"
import { View, Pressable, Text, Image, Dimensions, StyleSheet, FlatList } from "react-native"
import Context from "../context/store"
import COLORS from "../style/Colors"
const { width, height } = Dimensions.get("window")


const Header = (props) => {

    const { state, dispatch } = useContext(Context)
    const [family, setFamily] = useState([])
    const [selected,setSelected] = useState()

    useEffect(() => {
        setFamily(state.family)
    }, [])

    const selectChild=(index)=>{
        console.log("merhavba")
        setFamily(index)
    }

    const renderList = ({ item , index }) => {
       
        return (
            <Pressable onPress={props.child} style={[styles.listItem, {borderColor : index % 2 === 1 && index % 3 != 0 ? COLORS.red : index % 3 === 0 ? COLORS.mor : COLORS.primary} ]}>
                <Image style={{ width: 100, height: 100, resizeMode: "contain" }} source={item.picture != null ? {uri : item.picture} : require('../assets/child.jpg')} />
            </Pressable>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.family}>
                <Text style={styles.text}>AİLE</Text>
            </View>

            <FlatList
                keyExtractor={(_, index) => index.toString()}
                horizontal={true}
                data={family}
                renderItem={renderList}
            />
        </View>
    )

}

const styles = StyleSheet.create({
    text:  {
        fontWeight : "bold",
        color : COLORS.white,
        fontSize : 17
    },
    container: {
        width: width,
        height: 85,
        backgroundColor: COLORS.white,
        position: "absolute",
        top: 0,
        borderBottomEndRadius: 15,
        borderBottomStartRadius: 15,
        paddingLeft: 10,
        flexDirection: "row",
        paddingTop: 13,
        elevation : 10,
        zIndex:2

    },
    listItem: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        marginHorizontal: 10,
        borderWidth : 2
    },
    family: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.primary,
        overflow : "hidden"
    }
})
export { Header }