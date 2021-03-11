import React, { useEffect } from 'react'
import {
    HomeChild,
    ChatChild,
    SosChild,
    SettingsChild,
    ConnectionCode,
    ChatHomeChild,
    
} from '../pages'
import QRCodeScannerPage from "../pages/childpages/QrScanerPage"
import {
    View,
    Dimensions
} from "react-native"
import COLORS from "../style/Colors"
import Provider from '../context/Provider'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Icons from 'react-native-vector-icons/Ionicons'
import Icon from "react-native-vector-icons/FontAwesome5"


const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()
const { width, height } = Dimensions.get('window')


export function ChildBottom() {
    return (
        <Tab.Navigator initialRouteName="homechild" tabBarOptions={{ tabStyle: { borderRadius: 20, paddingVertical: 5, paddingHorizontal: 10 }, style: { zIndex:3,width: width * 0.5, paddingLeft: 3, paddingRight: 3, paddingTop: 3, paddingBottom: 3, justifyContent: "center", alignItems: "center", position: "absolute", height: 45, bottom: 10, marginHorizontal: 30, borderRadius: 20, left: width * 0.15 }, showLabel: false, keyboardHidesTabBar: true }}>

            <Tab.Screen

                name="homechild"
                component={HomeChild}
                options={{
                    tabBarLabel: "Chat", tabBarIcon: ({ tintColor, focused }) => focused ?
                        <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
                            <Icon name="map-marker-alt" size={28} color={COLORS.primary} />
                        </View>
                        :
                        <Icon name="map-marker-alt" size={28} color={COLORS.black} />

                }}
            />
            <Tab.Screen

                name="chathomechild"
                component={ChatHomeChild}
                options={{
                    tabBarLabel: "Chat", tabBarIcon: ({ tintColor, focused }) => focused ?
                        <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
                            <Icons name="chatbubble-ellipses-outline" color={COLORS.primary} size={30} />
                        </View>
                        :
                        <Icons name="chatbubble-ellipses-outline" color={COLORS.black} size={30} />

                }}
            />

            <Tab.Screen

                name="settingschild"
                component={SettingsChild}
                options={{
                    tabBarLabel: "Chat", tabBarIcon: ({ tintColor, focused }) => focused ?
                        <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
                            <Icons name="person-outline" color={COLORS.primary} size={30} />
                        </View>
                        :
                        <Icons name="person-outline" color={COLORS.black} size={30} />
                }}
            />
        </Tab.Navigator>
    )
}




function Child(props) {

    useEffect(() => {
        console.log(props, "router")
    }, [])
    return (
        <Provider>
            <Stack.Navigator initialRouteName="Code" {...props} >
                <Stack.Screen name="Code" component={ConnectionCode} options={{ headerShown: false  }} />
                <Stack.Screen name="QR" component={QRCodeScannerPage} options={{ headerShown: false  } } />
                <Stack.Screen name="chatchild" component={ChatChild} options={{ headerShown: false }} />
                <Stack.Screen name="soschild" component={SosChild} options={{ headerShown: false }} />
                <Stack.Screen name="home" component={ChildBottom} options={{ headerShown: false }} />
            </Stack.Navigator>
        </Provider>
    )
}
export default Child