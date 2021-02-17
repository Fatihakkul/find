import React, { useRef, useState } from 'react'
import {
    HomeParent,
    Login,
    ConnectionCode,
    Chat,
    Voice,
    ChildEvents,
    Settings,
    ChatHome,
    ChooseChild,
    PackagePage
} from '../pages'

import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icons from 'react-native-vector-icons/FontAwesome5'
import Icon from 'react-native-vector-icons/Ionicons'
import COLORS from '../style/Colors'
import { ChooseArea } from '../components'
import { Pressable, Text, View } from 'react-native'
import * as Animatable from 'react-native-animatable';



const AnimatedText = Animatable.createAnimatableComponent(View);

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function settingsStack() {
    return (
        <Stack.Navigator initialRouteName="settings">
            <Stack.Screen name="settings" component={Settings} options={{ headerShown: false }} />
            <Stack.Screen name="area" component={ChooseArea} options={{ headerShown: false }} />

        </Stack.Navigator>
    ) 
}
function chatStack() {
    return (
        <Stack.Navigator initialRouteName="chathome">
            <Stack.Screen name="chathome" component={ChatHome} options={{ headerShown: false }} />

        </Stack.Navigator>
    )
}
function HomeStack() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeParent} options={{ headerShown: false }} />
            {/* //<Stack.Screen name="Choose" component={ChooseChild} options={{ headerShown: false }} /> */}
        </Stack.Navigator>
    )
}


function BottomTab() {

    return (
        <Tab.Navigator  initialRouteName="Home" tabBarOptions={{  activeBackgroundColor: COLORS.primary, tabStyle: { borderRadius: 20, paddingVertical: 5, paddingHorizontal: 10 }, style: { paddingLeft: 3, paddingRight: 3, paddingTop: 3, paddingBottom: 3, justifyContent: "center", alignItems: "center", position: "absolute", height: 45, bottom: 10, marginHorizontal: 30, borderRadius: 20 }, showLabel: false, keyboardHidesTabBar: true }}>
            <Tab.Screen

                name="Chat"
                component={chatStack}
                options={{
                     tabBarLabel: "Chat", tabBarIcon: ({ tintColor, focused }) => focused ?
                        <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
                            <Icons name="comment-dots" style={{marginRight : 5}} size={20} color={COLORS.white} />
                            <Animatable.Text animation="rubberBand" iterationCount={10000} delay={100} style={{fontSize : 12,color : COLORS.white ,fontWeight : "bold",textAlign: 'center'  , justifyContent:"center"}} direction="normal">Chat</Animatable.Text>


                        </View>
                        :
                        <Icons name="comment-dots" size={20} color={COLORS.gray} />
                }}
            />
            <Tab.Screen
                name="Home"
                component={HomeStack}
                options={{
                   tabBarLabel: "Home", tabBarIcon: ({ tintColor, focused }) => focused ?
                        <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
                            <Icons name="map-marker-alt" style={{marginRight : 5}} size={20} color={COLORS.white} />
                            <Animatable.Text animation="rubberBand" iterationCount={1000000} delay={100} style={{fontSize : 12,color : COLORS.white ,fontWeight : "bold",textAlign: 'center'  , justifyContent:"center"}} direction="normal">Home</Animatable.Text>


                        </View>
                        :
                        <Icons name="map-marker-alt" size={20} color={COLORS.gray} />
                }}
            />
            <Tab.Screen
                name="ChildEvents"
                component={ChooseArea}
                options={{
                    tabBarLabel: "Events", tabBarIcon: ({ tintColor, focused }) => focused ?
                        <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>

                            <Icon name="map-outline" style={{marginRight : 5}} size={20} color={COLORS.white} />
                            <Animatable.Text animation="rubberBand" iterationCount={10000} delay={100} style={{fontSize : 12,color : COLORS.white ,fontWeight : "bold",textAlign: 'center'  , justifyContent:"center"}} direction="normal">Area</Animatable.Text>

                        </View>
                        :
                        <Icon name="map-outline" size={20} color={COLORS.gray} />
                }}

            />
            <Tab.Screen
                name="Profile"
                component={settingsStack}
                options={{
                    tabBarLabel: "Profile", tabBarIcon: ({ tintColor, focused }) => focused ?
                        <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }} >
                            <Icons name="user" size={20} style={{marginRight : 5}} color={COLORS.white}/>
                            <Animatable.Text animation="rubberBand" iterationCount={10000} delay={100} style={{fontSize : 12,color : COLORS.white ,fontWeight : "bold",textAlign: 'center'  , justifyContent:"center"}} direction="normal">Profile</Animatable.Text>

                        </View>
                        :
                        <Icons name="user" size={20} color={COLORS.gray} />
                }}

            />


        </Tab.Navigator>
    )
}
export default BottomTab