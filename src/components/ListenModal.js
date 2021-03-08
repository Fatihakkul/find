import React, { useState, useEffect } from 'react'
import { View, Text, Pressable, StyleSheet, Dimensions, Image, ActivityIndicator } from 'react-native'
import Modal from 'react-native-modal'
import Colors from '../style/Colors'
import Icon from 'react-native-vector-icons/Ionicons'
import Iconss from 'react-native-vector-icons/MaterialIcons'
import COLORS from '../style/Colors'
import QRCode from 'react-native-qrcode-svg';
import Axios from "axios"
import API from "../data/api"
import { launchImageLibrary } from "react-native-image-picker"
import LottieView from "lottie-react-native"
import InCallManager from 'react-native-incall-manager';


const { width, height } = Dimensions.get("window")

const ListenModal = (props) => {

    useEffect(() => {
        if (props.isVisible) {
            InCallManager.start({ media: 'audio' })
        } else {
            InCallManager.stop();

        }
    }, [props.isVisible])


    return (
        <Modal
            isVisible={props.isVisible}
            onBackdropPress={props.onBackdropPress}
            animationOutTiming={800}
            animationInTiming={800}
            style={{ alignItems: "center", justifyContent: "center" }}
        >
            {props.loading ?
                <View style={styles.container}>
                    <ActivityIndicator size={"large"} color={COLORS.primary} />
                </View>


                :
                <View style={styles.container}>
                    <View>
                        <Text style={styles.text}>Çocuk dinleniyor...</Text>
                    </View>
                    <LottieView
                        source={require('../lottie/listen.json')}
                        autoPlay
                        loop
                        style={{
                            width: 200,
                            height: 200,
                        }}
                    />
                    <View style={styles.buttonContainer}>
                        <Pressable onPress={props.onPress}>
                            <View style={[styles.button, { borderWidth: 2, borderColor: COLORS.lightGreen }]}>
                                <Text style={[styles.buttonText, { color: COLORS.lightGreen }]}>Dinlemeyi durdur</Text>
                            </View>
                        </Pressable>
                        <Pressable style={[styles.button, { backgroundColor: COLORS.lightGreen }]}>
                            <View>
                                <Text style={[styles.buttonText, { color: COLORS.white }]}>Mesaj Gönder</Text>
                            </View>
                        </Pressable>
                    </View>
                </View>}
        </Modal>
    )
}
const styles = StyleSheet.create({
    buttonText: {
        fontSize: 12,
        fontWeight: "bold",
        letterSpacing: 1
    },
    button: {
        width: width * 0.35,
        paddingVertical: 10,
        paddingHorizontal: 5,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15
    },
    buttonContainer: {
        width: "100%",
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10
    },
    container: {
        width: width * 0.9,
        height: height * 0.6,
        paddingVertical: 20,
        backgroundColor: "#ebebeb",
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "space-evenly",

    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        letterSpacing: 1,
        color: COLORS.settinText,

    }
})
export { ListenModal }